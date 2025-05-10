type Rates = {
  lendingRate: number
  borrowingRate: number
}

export type BankRate = {
  mint: string
  symbol: string
  rates: {
    mfi: Rates
    kamino: Rates
  }
}
