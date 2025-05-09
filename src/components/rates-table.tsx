import Image from 'next/image'

import { percentFormatter, shortenAddress } from '@mrgnlabs/mrgn-common'

import { BankRate } from '@/lib/type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type RatesTableProps = {
  rates: BankRate[]
}

export const RatesTable = ({ rates }: RatesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mint</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Lending Rate</TableHead>
          <TableHead>Borrowing Rate</TableHead>
          <TableHead>Lending APY</TableHead>
          <TableHead>Borrowing APY</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rates.map((rate) => (
          <TableRow key={rate.mint} className="even:bg-muted/50">
            <TableCell>{shortenAddress(rate.mint)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  src={`https://storage.googleapis.com/mrgn-public/mrgn-token-icons/${rate.mint}.png`}
                  alt={rate.symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                {rate.symbol}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-2 text-green-600">
                <div className="flex items-center gap-2">
                  <Image
                    src="/marginfi.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.mfi.lendingRate)}
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/kamino.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.kamino.lendingRate)}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-2 text-yellow-600">
                <div className="flex items-center gap-2">
                  <Image
                    src="/marginfi.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.mfi.borrowingRate)}
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/kamino.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.kamino.borrowingRate)}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-2 text-green-600">
                <div className="flex items-center gap-2">
                  <Image
                    src="/marginfi.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.mfi.lendingApy)}
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/kamino.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.kamino.lendingApy)}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-2 text-yellow-600">
                <div className="flex items-center gap-2">
                  <Image
                    src="/marginfi.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.mfi.borrowingApy)}
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/kamino.png"
                    alt={rate.symbol}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {percentFormatter.format(rate.rates.kamino.borrowingApy)}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
