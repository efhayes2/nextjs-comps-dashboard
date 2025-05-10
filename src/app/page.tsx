import { RatesTable } from '@/components/rates-table'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  try {
    const rates = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rates`)

    if (!rates.ok) {
      throw new Error('Failed to fetch rates')
    }

    const data = await rates.json()
    return <RatesTable rates={data} />
  } catch (error) {
    console.error('Error fetching rates:', error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Failed to load rates. Please try again later.
        </p>
      </div>
    )
  }
}
