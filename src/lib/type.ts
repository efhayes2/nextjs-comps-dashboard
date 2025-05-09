type Rates = {
  lendingRate: number
  borrowingRate: number
  lendingApy: number
  borrowingApy: number
}

export type BankRate = {
  mint: string
  symbol: string
  rates: {
    mfi: Rates
    kamino: Rates
  }
}
