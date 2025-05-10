import { RatesTable } from '@/components/rates-table'
import { IconAlertCircle } from '@tabler/icons-react'

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
      <div className="flex items-center justify-center">
        <p className="flex items-center gap-1.5 text-destructive">
          <IconAlertCircle size={20} />
          Failed to load rates. Please try again later.
        </p>
      </div>
    )
  }
}
