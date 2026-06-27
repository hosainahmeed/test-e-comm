'use client'

import { Product } from '@/lib/productServerApi'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.discountPercentage > 0

  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className='cursor-pointer h-full w-full'
      >
        <div style={{
          position: 'relative',
          paddingTop: '100%',
        }}
          className='rounded-xl md:rounded-3xl'
        >
          <Image
            width={300}
            height={300}
            src={product.thumbnail}
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            className='border border-gray-200 rounded-xl md:rounded-3xl overflow-hidden duration-300 '
          />
          {discount && (
            <span style={{
              color: 'white',
              fontWeight: 'bold',
            }}
              className='absolute top-2 right-2 bg-red-500 px-1! py-0.5! text-[8px] md:text-[10px] rounded-full!'
            >
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        <div style={{ padding: '4px' }}>
          <h3
            className='text-xs md:text-sm line-clamp-1'
          >
            {product.title}
          </h3>

          <p className='text-xs line-clamp-1 opacity-55 md:text-sm'>
            {product.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2c5282' }}>
              ${product.price}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#f59e0b' }}>★</span>
              <span style={{ fontSize: '12px' }}>{product.rating}</span>
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <span style={{
              backgroundColor: '#e0e7ff',
              color: '#3730a3',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '10px'
            }}>
              {product.category}
            </span>
            <span style={{
              marginLeft: '5px',
              color: product.stock > 10 ? '#059669' : '#dc2626',
              fontSize: '10px'
            }}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}