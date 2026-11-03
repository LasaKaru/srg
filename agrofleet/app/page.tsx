import dynamic from 'next/dynamic'

// Dynamically import the App to disable SSR (uses localStorage, geolocation APIs)
const AgroFleetApp = dynamic(() => import('@/components/AgroFleetApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center">
      <div className="text-center text-white space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-300 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-emerald-200 font-semibold">Loading AgroFleet Lanka...</p>
      </div>
    </div>
  ),
})

export default function Home() {
  return <AgroFleetApp />
}
