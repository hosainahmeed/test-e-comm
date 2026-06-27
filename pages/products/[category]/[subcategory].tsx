import { GetServerSideProps } from "next";
import ProductCatalogPage from "@/components/products/ProductCatalogPage";
import {
  CatalogCategory,
  CatalogSubcategory,
  getCatalogCategory,
  getCatalogSubcategory,
} from "@/lib/productCatalog";
import {
  fetchProductsByCatalogRoute,
  Product,
} from "@/lib/productServerApi";

interface SubcategoryProductsPageProps {
  products: Product[];
  total: number;
  category: CatalogCategory;
  subcategory: CatalogSubcategory;
}

export default function SubcategoryProductsPage(
  props: SubcategoryProductsPageProps,
) {
  return <ProductCatalogPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<
  SubcategoryProductsPageProps
> = async (context) => {
  const { category: categorySlug, subcategory: subcategorySlug } =
    context.params as {
      category: string;
      subcategory: string;
    };

  const category = getCatalogCategory(categorySlug);
  const subcategory = getCatalogSubcategory(categorySlug, subcategorySlug);

  if (!category || !subcategory) {
    return { notFound: true };
  }

  const data = await fetchProductsByCatalogRoute(categorySlug, subcategorySlug);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
      total: data.total,
      category,
      subcategory,
    },
  };
};
