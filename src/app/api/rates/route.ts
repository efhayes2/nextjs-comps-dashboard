import { Connection, PublicKey } from '@solana/web3.js'
import { loadBankMetadatas, NodeWallet, aprToApy } from '@mrgnlabs/mrgn-common'
import { MarginfiClient, getConfig } from '@mrgnlabs/marginfi-client-v2'
import { KaminoMarket } from '@kamino-finance/klend-sdk'

export async function GET() {
  const bankMetadatas = await loadBankMetadatas()

  const connection = new Connection(process.env.RPC_URL!, 'confirmed')

  const mfiClient = await MarginfiClient.fetch(
    getConfig('production'),
    NodeWallet.local(),
    connection,
    {
      preloadedBankAddresses: Object.keys(bankMetadatas).map(
        (key) => new PublicKey(key)
      ),
    }
  )

  const kaminoMarket = await KaminoMarket.load(
    connection,
    new PublicKey('7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF'),
    400
  )
  await kaminoMarket?.loadReserves()

  const currentSlot = await connection.getSlot()

  const bankRates = Object.entries(bankMetadatas)
    .map(([key, metadata]) => {
      const mfiBank = mfiClient.getBankByPk(new PublicKey(key))

      const kaminoReserve = kaminoMarket?.getReserveByMint(
        new PublicKey(metadata.tokenAddress)
      )

      if (!mfiBank || !kaminoReserve) {
        return null
      }

      const mfiInterestRates = mfiBank.computeInterestRates()
      const mfiLendingRate = mfiInterestRates?.lendingRate.toNumber()
      const mfiBorrowingRate = mfiInterestRates?.borrowingRate.toNumber()
      const mfiLendingApy = aprToApy(mfiLendingRate)
      const mfiBorrowingApy = aprToApy(mfiBorrowingRate)

      const kaminoLendingRate = kaminoReserve?.totalSupplyAPY(currentSlot)
      const kaminoBorrowingRate = kaminoReserve?.totalBorrowAPY(currentSlot)
      const kaminoLendingApy = aprToApy(kaminoLendingRate)
      const kaminoBorrowingApy = aprToApy(kaminoBorrowingRate)

      return {
        mint: metadata.tokenAddress,
        symbol: metadata.tokenSymbol,
        rates: {
          mfi: {
            lendingRate: mfiLendingRate,
            borrowingRate: mfiBorrowingRate,
            lendingApy: mfiLendingApy,
            borrowingApy: mfiBorrowingApy,
          },
          kamino: {
            lendingRate: kaminoLendingRate,
            borrowingRate: kaminoBorrowingRate,
            lendingApy: kaminoLendingApy,
            borrowingApy: kaminoBorrowingApy,
          },
        },
      }
    })
    .filter((rate) => rate !== null)
    .sort((a, b) => b.rates.mfi.lendingRate - a.rates.mfi.lendingRate)

  return Response.json(bankRates)
}
