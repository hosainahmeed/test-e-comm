import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { fetchCategories, Category } from '@/lib/categoriesServerApi'

interface CategoriesPageProps {
  categories: Category[]
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  // Group categories by first letter for better organization
  const groupedCategories = categories.reduce((acc, category) => {
    const firstLetter = category.name[0].toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(category)
    return acc
  }, {} as Record<string, Category[]>)

  // Sort the groups alphabetically
  const sortedGroups = Object.keys(groupedCategories).sort()

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>
          Shop by Category
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Browse our extensive collection of {categories.length} categories
        </p>
      </section>

      {/* Categories Grid */}
      <section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '30px 20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '2px solid transparent',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)'
                e.currentTarget.style.borderColor = '#667eea'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'
                e.currentTarget.style.borderColor = 'transparent'
              }}
              >
                {/* Category Icon - using emoji based on category name */}
                <div style={{
                  fontSize: '40px',
                  marginBottom: '15px'
                }}>
                  {getCategoryIcon(category.slug)}
                </div>
                
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a1a2e',
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  textTransform: 'capitalize'
                }}>
                  {category.slug.replace(/-/g, ' ')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Alphabetical Navigation */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          marginBottom: '30px',
          textAlign: 'center',
          color: '#1a1a2e'
        }}>
          Browse Alphabetically
        </h2>
        
        {sortedGroups.map(letter => (
          <div key={letter} style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '24px',
              color: '#667eea',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '10px',
              marginBottom: '15px'
            }}>
              {letter}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '10px'
            }}>
              {groupedCategories[letter].map(category => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    padding: '12px 20px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    color: '#374151',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e0e7ff'
                    e.currentTarget.style.color = '#3730a3'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                    e.currentTarget.style.color = '#374151'
                  }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      {getCategoryIcon(category.slug)}
                    </span>
                    <span>{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

// Helper function to get emoji icon based on category
function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    'beauty': '💄',
    'fragrances': '🌸',
    'furniture': '🪑',
    'groceries': '🛒',
    'home-decoration': '🏠',
    'kitchen-accessories': '🍳',
    'laptops': '💻',
    'mens-shirts': '👔',
    'mens-shoes': '👞',
    'mens-watches': '⌚',
    'mobile-accessories': '📱',
    'motorcycle': '🏍️',
    'skin-care': '🧴',
    'smartphones': '📱',
    'sports-accessories': '⚽',
    'sunglasses': '🕶️',
    'tablets': '📱',
    'tops': '👚',
    'vehicle': '🚗',
    'womens-bags': '👜',
    'womens-dresses': '👗',
    'womens-jewellery': '💍',
    'womens-shoes': '👠',
    'womens-watches': '⌚'
  }
  
  return iconMap[slug] || '📦'
}

export const getServerSideProps: GetServerSideProps<CategoriesPageProps> = async () => {
  const categories = await fetchCategories()

  return {
    props: {
      categories
    }
  }
}