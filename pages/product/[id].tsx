import React from "react";
import { cn } from "@/lib/utils";
import { ProductGallery } from "@/components/pdp/product-gallery";
import { ProductRail } from "@/components/pdp/product-rail";
import { useProductDetails } from "@/components/pdp/useProductDetails";
import { PdpBreadcrumb } from "@/components/pdp/PdpBreadcrumb";
import { PdpHeaderInfo } from "@/components/pdp/PdpHeaderInfo";
import { PdpSocialProof } from "@/components/pdp/PdpSocialProof";
import { PdpPriceBlock } from "@/components/pdp/PdpPriceBlock";
import { PdpVariantSelector } from "@/components/pdp/PdpVariantSelector";
import { PdpActionButtons } from "@/components/pdp/PdpActionButtons";
import { PdpInfoTiles } from "@/components/pdp/PdpInfoTiles";
import { PdpHighlights } from "@/components/pdp/PdpHighlights";
import { PdpDescription } from "@/components/pdp/PdpDescription";
import { PdpReviews } from "@/components/pdp/PdpReviews";
import { PdpFaq } from "@/components/pdp/PdpFaq";
import styles from "@/components/pdp/ProductDetails.module.css";

export default function ProductDetailsPage() {
  const { data, state, handlers } = useProductDetails();
  const {
    product,
    attributes,
    reviewSummary,
    marketing,
    analytics,
    shipping,
    returnPolicy,
    relatedProducts,
    recommendations,
    recentlyViewed,
  } = data;

  const {
    selection,
    qty,
    wish,
    copied,
    addedFlash,
    fullscreen,
    selectedVariant,
    activeGroup,
    price,
    discount,
    stock,
    available,
    lowStock,
  } = state;

  return (
    <div className={styles.pdpContainer}>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <PdpBreadcrumb
          categoryName={product.category.name}
          subCategoryName={product.subCategory.name}
          title={product.title}
        />

        {/* Hero Section: Gallery + Product Specs */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Left: Product Gallery */}
          <div
            className={cn(
              "lg:sticky lg:top-24 lg:self-start",
              fullscreen ? "z-9999999999" : "",
            )}
          >
            <ProductGallery
              images={activeGroup.images}
              title={product.title}
              fullscreen={fullscreen}
              setFullscreen={handlers.setFullscreen}
            />
          </div>

          {/* Right: Product Purchase Info */}
          <div className="flex flex-col">
            {/* Header Info & Badges */}
            <PdpHeaderInfo
              badges={marketing.badges}
              brandName={product.brand.name}
              subCategoryName={product.subCategory.name}
              title={product.title}
              shortDescription={product.shortDescription}
              wish={wish}
              copied={copied}
              onToggleWishlist={handlers.toggleWishlist}
              onCopyLink={handlers.copyLink}
            />

            {/* Social Proof Stats */}
            <PdpSocialProof
              averageRating={reviewSummary.average}
              totalReviews={reviewSummary.totalReviews}
              soldCount={analytics.sold}
              wishlistCount={analytics.wishlist}
            />

            {/* Price Block & Flash Sale */}
            <PdpPriceBlock
              sellingPrice={price.selling}
              mrp={price.mrp}
              currency={price.currency}
              discount={discount}
              available={available}
              lowStock={lowStock}
              stock={stock}
              sku={selectedVariant?.sku}
              flashSale={marketing.flashSale}
            />

            {/* Variant Selector & Quantity */}
            <PdpVariantSelector
              attributes={attributes}
              selection={selection}
              qty={qty}
              stock={stock}
              available={available}
              onUpdateAttr={handlers.updateAttr}
              onIncreaseQty={handlers.increaseQty}
              onDecreaseQty={handlers.decreaseQty}
              isValueAvailable={handlers.isValueAvailable}
            />

            {/* Main Action Buttons + Mobile Sticky Action Bar */}
            <PdpActionButtons
              available={available}
              addedFlash={addedFlash}
              sellingPrice={price.selling}
              onAddToCart={handlers.addToCart}
            />

            {/* Delivery & Trust Info Tiles */}
            <PdpInfoTiles shipping={shipping} returnPolicy={returnPolicy} />
          </div>
        </div>

        {/* Highlights Section */}
        <PdpHighlights highlights={product.highlights} />

        {/* Description & Specifications Section */}
        <PdpDescription product={product} />

        {/* Customer Reviews Section */}
        <PdpReviews reviewSummary={reviewSummary} />

        {/* Product Carousel Rails */}
        <ProductRail title="You may also like" items={relatedProducts} />
        <ProductRail title="Recommended for you" items={recommendations} />
        <ProductRail title="Recently viewed" items={recentlyViewed} />

        {/* Frequently Asked Questions */}
        <PdpFaq faq={product.faq} />
      </main>
    </div>
  );
}
