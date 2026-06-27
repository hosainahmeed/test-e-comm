import { GetServerSideProps } from "next";
import BrandProductsPage from "@/components/brands/BrandProductsPage";
import { Brand, getBrandBySlug } from "@/lib/brandCatalog";
import { fetchProductsByBrandSlug, Product } from "@/lib/productServerApi";

interface BrandPageProps {
  brand: Brand;
  products: Product[];
  total: number;
}

export default function BrandPage(props: BrandPageProps) {
  return <BrandProductsPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<BrandPageProps> = async (
  context,
) => {
  const { slug } = context.params as { slug: string };
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return { notFound: true };
  }

  const data = await fetchProductsByBrandSlug(slug);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      brand,
      products: data.products,
      total: data.total,
    },
  };
};
