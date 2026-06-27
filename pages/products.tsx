import { GetServerSideProps } from "next";
import { ProductDataProvider } from "@/contexts/product-data-context";
import ProductList from "@/components/products/ProductList";
import { fetchAllProducts, ProductsResponse } from "@/lib/productServerApi";
import ProductTopFilter from "@/components/products/ProductTopFilter";
// import ProductTopFilter from '@/components/products/ProductTopFilter'

interface ProductsPageProps {
  initialData: ProductsResponse;
}

export default function ProductsPage({ initialData }: ProductsPageProps) {
  return (
    <ProductDataProvider initialData={initialData}>
      <div className="container mx-auto! px-2! py-8">
        <ProductTopFilter />
        <ProductList />
      </div>
    </ProductDataProvider>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (
  context,
) => {
  // Get query params from URL for filtering
  const { search, category, sortBy, limit } = context.query;

  const data = await fetchAllProducts({
    search: search as string,
    category: category as string,
    sortBy: sortBy as "price" | "rating" | "title",
    limit: limit ? Number(limit) : 30,
  });

  // Get unique categories from all products
  const categories = [...new Set(data.products.map((p) => p.category))];

  return {
    props: {
      initialData: data,
      categories,
    },
  };
};
