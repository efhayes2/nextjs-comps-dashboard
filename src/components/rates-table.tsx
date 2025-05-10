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
import { AddressActions } from '@/components/ui/address-action'

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
          <TableHead>
            <div className="flex items-center gap-1.5">
              <Image
                src="/marginfi.png"
                alt="Marginfi"
                width={20}
                height={20}
                className="rounded-full"
              />
              Marginfi
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1.5">
              <Image
                src="/kamino.png"
                alt="Kamino"
                width={20}
                height={20}
                className="rounded-full"
              />
              Kamino
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rates.map((rate) => (
          <TableRow key={rate.mint} className="even:bg-muted/50">
            <TableCell>
              <AddressActions
                address={rate.mint}
                shortAddress={shortenAddress(rate.mint)}
              />
            </TableCell>
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
              <p className="text-green-600">
                {percentFormatter.format(rate.rates.mfi.lendingRate)}
              </p>
              <p className="text-yellow-600">
                {percentFormatter.format(rate.rates.mfi.borrowingRate)}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-green-600">
                {percentFormatter.format(rate.rates.kamino.lendingRate)}
              </p>
              <p className="text-yellow-600">
                {percentFormatter.format(rate.rates.kamino.borrowingRate)}
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
