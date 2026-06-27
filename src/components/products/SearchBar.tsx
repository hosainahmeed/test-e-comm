'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push({
        pathname: '/products',
        query: { search: searchTerm.trim() }
      })
    }
  }

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          style={{
            flex: 1,
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Search
        </button>
      </div>
    </form>
  )
}