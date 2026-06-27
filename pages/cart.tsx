"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Package,
  Truck,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Store,
  Receipt,
  Percent,
  Tag,
} from "lucide-react";

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

function CartScreen() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/carts");
        const data = await response.json();

        if (data.carts && data.carts.length > 0) {
          setCart(data.carts[0]);

          // Initialize quantities
          const initialQuantities: { [key: number]: number } = {};
          data.carts[0].products.forEach((product: CartProduct) => {
            initialQuantities[product.id] = product.quantity;
          });
          setQuantities(initialQuantities);
        }
      } catch (err) {
        setError("Failed to load cart. Please try again.");
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }));
  };

  // Calculate totals
  const calculateSubtotal = () => {
    if (!cart) return 0;
    return cart.products.reduce((acc, product) => {
      const qty = quantities[product.id] || product.quantity;
      return acc + product.price * qty;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!cart) return 0;
    const originalTotal = cart.products.reduce((acc, product) => {
      const qty = quantities[product.id] || product.quantity;
      return acc + product.price * qty;
    }, 0);
    const discountedTotal = cart.products.reduce((acc, product) => {
      const qty = quantities[product.id] || product.quantity;
      const discount = product.price * (product.discountPercentage / 100);
      return acc + (product.price - discount) * qty;
    }, 0);
    return originalTotal - discountedTotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount + 5.99; // Adding shipping
  };

  // Handle remove product
  const handleRemoveProduct = (productId: number) => {
    if (!cart) return;
    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    setCart({
      ...cart,
      products: updatedProducts,
      totalProducts: updatedProducts.length,
      totalQuantity: updatedProducts.reduce(
        (acc, p) => acc + (quantities[p.id] || p.quantity),
        0,
      ),
    });

    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
  };

  // Handle promo code
  const handleApplyPromo = () => {
    if (
      promoCode.toUpperCase() === "SAVE10" ||
      promoCode.toUpperCase() === "HOOKAH20"
    ) {
      setPromoApplied(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#B8965C] text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <ShoppingCart className="w-20 h-20 text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-8 text-center">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="bg-[#B8965C] text-white! px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Store className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Shopping Cart</h1>
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-5 h-5 text-[#B8965C]" />
              <span className="text-sm font-semibold text-gray-700">
                {cart.totalProducts} items
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Free Shipping Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#B8965C]" />
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Free shipping</span> on orders
              over $50
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {cart.products.map((product) => {
            const currentQty = quantities[product.id] || product.quantity;
            const discountedPrice =
              product.price -
              (product.price * product.discountPercentage) / 100;
            const itemTotal = discountedPrice * currentQty;

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-product.png";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {product.title}
                        </h3>
                        {product.discountPercentage > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-xs bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-medium">
                              -{product.discountPercentage}%
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-gray-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={currentQty <= 1}
                          className="p-1.5 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-gray-900 min-w-[2rem] text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-1.5 text-gray-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ${itemTotal.toFixed(2)}
                        </p>
                        {currentQty > 1 && (
                          <p className="text-xs text-gray-500">
                            ${discountedPrice.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Code */}
        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Promo Code</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g., SAVE10)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              disabled={promoApplied}
            />
            <button
              onClick={handleApplyPromo}
              disabled={!promoCode || promoApplied}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                promoApplied
                  ? "bg-green-500 text-white"
                  : "bg-[#B8965C] text-white"
              }`}
            >
              {promoApplied ? "Applied ✓" : "Apply"}
            </button>
          </div>
          {promoApplied && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Promo code applied successfully!
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setPromoCode("SAVE10");
                setPromoApplied(false);
              }}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200"
            >
              SAVE10
            </button>
            <button
              onClick={() => {
                setPromoCode("HOOKAH20");
                setPromoApplied(false);
              }}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200"
            >
              HOOKAH20
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({cart.totalQuantity} items)
              </span>
              <span className="font-semibold text-gray-900">
                ${calculateSubtotal().toFixed(2)}
              </span>
            </div>

            {calculateDiscount() > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  Discount
                </span>
                <span className="font-semibold text-green-600">
                  -${calculateDiscount().toFixed(2)}
                </span>
              </div>
            )}

            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Promo ({promoCode})
                </span>
                <span className="font-semibold text-green-600">-$10.00</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Shipping
              </span>
              <span className="font-semibold text-gray-900">$5.99</span>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-base font-bold text-gray-900">
                  ${(calculateTotal() - (promoApplied ? 10 : 0)).toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Including VAT</p>
            </div>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-6 h-6 text-[#B8965C]" />
              <span className="text-xs text-gray-600">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-6 h-6 text-[#B8965C]" />
              <span className="text-xs text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Package className="w-6 h-6 text-[#B8965C]" />
              <span className="text-xs text-gray-600">Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <Link
          href="/products"
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 mb-4"
        >
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Continue Shopping
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        {/* Recommended Products */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-gray-900 mb-3">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2  md:grid-cols-6 gap-3">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="w-full h-24 bg-gray-100 rounded-lg mb-2"></div>
              <p className="text-xs font-semibold text-gray-900 truncate">
                Hookah Charcoal
              </p>
              <p className="text-sm font-bold text-gray-900">$12.99</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="w-full h-24 bg-gray-100 rounded-lg mb-2"></div>
              <p className="text-xs font-semibold text-gray-900 truncate">
                Silicone Bowl
              </p>
              <p className="text-sm font-bold text-gray-900">$8.99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-gray-500">Total Price</p>
              <p className="text-lg font-bold text-gray-900">
                ${(calculateTotal() - (promoApplied ? 10 : 0)).toFixed(2)}
              </p>
            </div>
            <button className="bg-[#B8965C] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
