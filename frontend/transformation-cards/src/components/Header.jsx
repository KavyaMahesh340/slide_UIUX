import { useState } from 'react'

export default function Header() {
  const [activeTab, setActiveTab] = useState('professionals')

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          R
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('professionals')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'professionals'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Financial Professionals
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'clients'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Clients
        </button>
      </div>
    </header>
  )
}