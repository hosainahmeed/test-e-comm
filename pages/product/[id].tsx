import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import ProductDetail from "@/components/products/ProductDetail";
import ProductReviews from "@/components/products/ProductReviews";
import { fetchProductById, Product } from "@/lib/productServerApi";

interface ProductPageProps {
  product: Product | null;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Loading...</h2>
          <p>Fetching product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Link
        href="/products"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#3b82f6",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        ← Back to Products
      </Link>
      <ProductDetail product={product} />
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  context,
) => {
  const { id } = context.params as { id: string };

  try {
    const product = await fetchProductById(Number(id));

    if (!product) {
      return { notFound: true };
    }

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};
