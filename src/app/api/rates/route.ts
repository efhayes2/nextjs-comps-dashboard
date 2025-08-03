import { Connection, PublicKey } from '@solana/web3.js'
import { KaminoMarket } from '@kamino-finance/klend-sdk'
import { getTokenMetadataMap } from "@/lib/utils";

export async function GET() {

  const bankData = getTokenMetadataMap();
  const connection = new Connection(process.env.RPC_URL!, 'confirmed')

  const kaminoMarket = await KaminoMarket.load(
    connection,
    new PublicKey('7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF'),
    400
  )
  await kaminoMarket?.loadReserves()

  const currentSlot = await connection.getSlot()

  const bankRates = Object.entries(bankData)
    .map(([key, metadata]) => {
//      const mfiBank = mfiClient.getBankByPk(new PublicKey(key))

      const kaminoReserve = kaminoMarket?.getReserveByMint(
        new PublicKey(metadata.tokenAddress)
      )
        if (!kaminoReserve) {
            return null
        }

      const kaminoLendingRate = kaminoReserve?.totalSupplyAPY(currentSlot)
      const kaminoBorrowingRate = kaminoReserve?.totalBorrowAPY(currentSlot)

      return {
        mint: metadata.tokenAddress,
        symbol: metadata.tokenSymbol,
        rates: {
          kamino: {
            lendingRate: kaminoLendingRate,
            borrowingRate: kaminoBorrowingRate,
          },
        },
      }
    })
    .filter((rate) => rate !== null)
    .sort((a, b) => b.rates.kamino.lendingRate - a.rates.kamino.lendingRate)

  return Response.json(bankRates)
}
