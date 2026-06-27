import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { fetchAllProducts, Product } from '@/lib/productServerApi'
import { Category, fetchCategories } from '@/lib/categoriesServerApi'


interface HomeProps {
  featuredProducts: Product[]
  categories: Category[]
}

export default function Home({ categories }: HomeProps) {
  return (
    <div className='container mx-auto! px-4 py-8'>

      <div className="flex flex-nowrap gap-2 overflow-x-auto">
        {categories.slice(0, 8).map(category => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="cursor-pointer shadow-sm rounded-full pr-2! flex flex-nowrap items-center justify-start gap-2 border border-gray-300 hide-scrollbar">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Fetch both products and categories in parallel
  const [productsData, categories] = await Promise.all([
    fetchAllProducts({ limit: 30 }),
    fetchCategories()
  ])

  return {
    props: {
      featuredProducts: productsData.products,
      categories
    }
  }
}