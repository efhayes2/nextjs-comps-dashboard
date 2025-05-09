import { RatesTable } from '@/components/rates-table'

export default async function Home() {
  const rates = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rates`)
  const data = await rates.json()

  return <RatesTable rates={data} />
}
