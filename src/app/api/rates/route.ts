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
      const mfiLendingRateBase = mfiInterestRates?.lendingRate.toNumber()
      const mfiBorrowingRateBase = mfiInterestRates?.borrowingRate.toNumber()
      const mfiLendingRate = aprToApy(mfiLendingRateBase)
      const mfiBorrowingRate = aprToApy(mfiBorrowingRateBase)

      const kaminoLendingRate = kaminoReserve?.totalSupplyAPY(currentSlot)
      const kaminoBorrowingRate = kaminoReserve?.totalBorrowAPY(currentSlot)

      return {
        mint: metadata.tokenAddress,
        symbol: metadata.tokenSymbol,
        rates: {
          mfi: {
            lendingRate: mfiLendingRate,
            borrowingRate: mfiBorrowingRate,
          },
          kamino: {
            lendingRate: kaminoLendingRate,
            borrowingRate: kaminoBorrowingRate,
          },
        },
      }
    })
    .filter((rate) => rate !== null)
    .sort((a, b) => b.rates.mfi.lendingRate - a.rates.mfi.lendingRate)

  return Response.json(bankRates)
}
