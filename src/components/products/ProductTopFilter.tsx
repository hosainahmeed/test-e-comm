import React from 'react'

function ProductTopFilter() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating</option>
          <option>Popularity</option>
        </select>
      </div>
    </div>
  )
}

export default ProductTopFilter