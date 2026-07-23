import { useMemo, useState, useCallback } from "react";
import { productData, type Variant } from "@/data/product";

export function useProductDetails() {
  const data = productData;
  const {
    product,
    media,
    attributes,
    variants,
    reviewSummary,
    marketing,
    analytics,
    shipping,
    returnPolicy,
  } = data;

  // Compute initial variant selection
  const initialSelection = useMemo(() => {
    const sel: Record<string, string> = {};
    for (const attr of attributes) {
      const first =
        attr.values.find((v) =>
          variants.some(
            (vr) =>
              vr.inventory.available &&
              vr.attributes[attr.slug] === (v.slug ?? v.label.toLowerCase()),
          ),
        ) ?? attr.values[0];
      sel[attr.slug] = first.slug ?? first.label.toLowerCase();
    }
    return sel;
  }, [attributes, variants]);

  const [selection, setSelection] = useState<Record<string, string>>(initialSelection);
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Active selected variant
  const selectedVariant: Variant | undefined = useMemo(
    () =>
      variants.find((v) =>
        Object.entries(selection).every(([k, val]) => v.attributes[k] === val),
      ),
    [variants, selection],
  );

  // Active image group derived from selected color or fallback
  const activeGroupId =
    selectedVariant?.imageGroup ?? selection.color ?? media.imageGroups[0]?.id;
  const activeGroup =
    media.imageGroups.find((g) => g.id === activeGroupId) ??
    media.imageGroups[0];

  // Pricing & inventory math
  const price = selectedVariant?.price ?? variants[0].price;
  const discount =
    price.mrp > price.selling
      ? Math.round(((price.mrp - price.selling) / price.mrp) * 100)
      : 0;
  const stock = selectedVariant?.inventory.stock ?? 0;
  const available = !!selectedVariant?.inventory.available;
  const lowStock = available && stock > 0 && stock <= 5;

  // Combinatorial availability check for attribute value
  const isValueAvailable = useCallback(
    (attrSlug: string, valueSlug: string) => {
      return variants.some(
        (v) =>
          v.attributes[attrSlug] === valueSlug &&
          v.inventory.available &&
          Object.entries(selection).every(
            ([k, val]) => k === attrSlug || v.attributes[k] === val,
          ),
      );
    },
    [variants, selection],
  );

  // Action handlers
  const updateAttr = useCallback((slug: string, value: string) => {
    setSelection((prev) => ({ ...prev, [slug]: value }));
    setQty(1);
  }, []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }, []);

  const addToCart = useCallback(() => {
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1400);
  }, []);

  const toggleWishlist = useCallback(() => {
    setWish((v) => !v);
  }, []);

  const increaseQty = useCallback(() => {
    setQty((q) => Math.min(Math.max(1, stock || 99), q + 1));
  }, [stock]);

  const decreaseQty = useCallback(() => {
    setQty((q) => Math.max(1, q - 1));
  }, []);

  return {
    data,
    state: {
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
    },
    handlers: {
      updateAttr,
      copyLink,
      addToCart,
      toggleWishlist,
      increaseQty,
      decreaseQty,
      setFullscreen,
      isValueAvailable,
    },
  };
}
