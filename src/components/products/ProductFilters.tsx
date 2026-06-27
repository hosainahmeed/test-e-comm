'use client'

import { useRouter } from 'next/router'

interface ProductFiltersProps {
  categories: string[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const currentCategory = router.query.category as string

  const handleCategoryChange = (category: string) => {
    if (category === currentCategory) {
      // Remove filter
      const { category, ...rest } = router.query
      router.push({ pathname: '/products', query: rest }, undefined, { shallow: true })
    } else {
      router.push({ 
        pathname: '/products', 
        query: { ...router.query, category } 
      }, undefined, { shallow: true })
    }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Categories</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => handleCategoryChange('')}
          style={{
            padding: '8px 12px',
            border: 'none',
            backgroundColor: !currentCategory ? '#3b82f6' : 'transparent',
            color: !currentCategory ? 'white' : '#374151',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s'
          }}
        >
          All Products
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            style={{
              padding: '8px 12px',
              border: 'none',
              backgroundColor: currentCategory === category ? '#3b82f6' : 'transparent',
              color: currentCategory === category ? 'white' : '#374151',
              borderRadius: '6px',
              cursor: 'pointer',
              textAlign: 'left',
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Price Range</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="number" 
            placeholder="Min" 
            style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            onChange={(e) => {
              if (e.target.value) {
                router.push({
                  pathname: '/products',
                  query: { ...router.query, minPrice: e.target.value }
                }, undefined, { shallow: true })
              }
            }}
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            onChange={(e) => {
              if (e.target.value) {
                router.push({
                  pathname: '/products',
                  query: { ...router.query, maxPrice: e.target.value }
                }, undefined, { shallow: true })
              }
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Sort By</h3>
        <select
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
          onChange={(e) => {
            router.push({
              pathname: '/products',
              query: { ...router.query, sortBy: e.target.value }
            }, undefined, { shallow: true })
          }}
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="title">Name</option>
        </select>
      </div>
    </div>
  )
}