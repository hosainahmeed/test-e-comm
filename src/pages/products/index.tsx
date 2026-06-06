import { ProductCard } from "@/components/ProductCard";
import { ProductData } from "@/types/product.type";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const productsData = await res.json();
  return { props: { productsData } };
};

export default function ProductsPage({ productsData }: any) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {productsData?.products?.map((prod: ProductData) => (
        <ProductCard key={prod?.id} product={prod} />
      ))}
    </div>
  );
}
