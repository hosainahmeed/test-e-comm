import { GetServerSideProps } from "next";
import ProductCatalogPage from "@/components/products/ProductCatalogPage";
import {
  CatalogCategory,
  getCatalogCategory,
} from "@/lib/productCatalog";
import {
  fetchProductsByCatalogRoute,
  Product,
} from "@/lib/productServerApi";

interface CategoryProductsPageProps {
  products: Product[];
  total: number;
  category: CatalogCategory;
}

export default function CategoryProductsPage(props: CategoryProductsPageProps) {
  return <ProductCatalogPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<
  CategoryProductsPageProps
> = async (context) => {
  const { category: categorySlug } = context.params as { category: string };
  const category = getCatalogCategory(categorySlug);

  if (!category) {
    return { notFound: true };
  }

  const data = await fetchProductsByCatalogRoute(categorySlug);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
      total: data.total,
      category,
    },
  };
};
