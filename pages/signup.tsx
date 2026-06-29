export default function Signup() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center relative">
      <div className="w-full flex justify-center mt-6 md:mt-12 md:mb-[-0.5%] absolute -z-1">
        <h1 className="text-center opacity-10 font-extrabold tracking-tighter leading-[0.90] text-zinc-900 text-[clamp(4.5rem,8.5vw,25rem)] pointer-events-none select-none">
          DIVAN DIONE
        </h1>
      </div>
      <div className="text-gray-500 max-w-96 mx-4 backdrop-blur-xs md:p-6 p-4 text-left text-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Registration
        </h2>
        <p className="text-center mb-2">
          Please before register you must have 21 years old
        </p>

        <form>
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="text-right py-4">
            By creating and/or using your account, you agree to our Terms of Use
            and Privacy Policy.
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white"
          >
            Sign up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Sign in
          </a>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Sign up with Google
        </button>
        <p className="text-center mt-4">
          Visit without an account?{" "}
          <a href="/" className="text-blue-500! underline!">
            Continue Shopping
          </a>
        </p>
      </div>
    </div>
  );
}


/*

{
  "id": "prd_01JX9F3K8YH7A2M4P6Q",
  "slug": "premium-oversized-cotton-tshirt-black",
  "title": "Premium Oversized Cotton T-Shirt",
  "shortDescription": "Premium heavyweight oversized t-shirt made from 100% combed cotton.",
  "description": "<p>Designed for everyday comfort with a modern oversized fit. Made from breathable premium cotton that stays soft after multiple washes.</p>",

  "category": {
    "id": "cat_men",
    "name": "Men"
  },

  "subcategory": {
    "id": "sub_tshirt",
    "name": "T-Shirts"
  },

  "brand": {
    "id": "brand_001",
    "name": "Urban Wear"
  },

  "gender": "MEN",

  "tags": [
    "Oversized",
    "Cotton",
    "Streetwear",
    "Summer"
  ],

  "material": "100% Combed Cotton",

  "fit": "Oversized",

  "countryOfOrigin": "Bangladesh",

  "isFeatured": true,

  "rating": {
    "average": 4.8,
    "count": 248
  },

  "salesCount": 1542,

  "wishlistCount": 892,

  "shareUrl": "https://yourdomain.com/product/premium-oversized-cotton-tshirt-black",

  "seo": {
    "title": "Premium Oversized Cotton T-Shirt",
    "description": "Premium oversized cotton t-shirt with multiple color and size options."
  },

  "images": [
    {
      "id": "img1",
      "url": "https://cdn.yourdomain.com/products/black/front.jpg",
      "alt": "Front View",
      "isThumbnail": true,
      "sortOrder": 1
    },
    {
      "id": "img2",
      "url": "https://cdn.yourdomain.com/products/black/back.jpg",
      "alt": "Back View",
      "sortOrder": 2
    },
    {
      "id": "img3",
      "url": "https://cdn.yourdomain.com/products/black/model.jpg",
      "alt": "Model Wearing",
      "sortOrder": 3
    }
  ],

  "variants": [
    {
      "id": "var_001",
      "sku": "TS-BLK-S",

      "price": 850,
      "comparePrice": 1050,

      "stock": 18,

      "isInStock": true,

      "attributes": {
        "color": "Black",
        "size": "S"
      }
    },
    {
      "id": "var_002",
      "sku": "TS-BLK-M",

      "price": 850,
      "comparePrice": 1050,

      "stock": 10,

      "isInStock": true,

      "attributes": {
        "color": "Black",
        "size": "M"
      }
    },
    {
      "id": "var_003",
      "sku": "TS-WHT-M",

      "price": 900,
      "comparePrice": 1100,

      "stock": 7,

      "isInStock": true,

      "attributes": {
        "color": "White",
        "size": "M"
      }
    }
  ],

  "availableOptions": {
    "colors": [
      {
        "name": "Black",
        "hex": "#000000",
        "image": "https://cdn.yourdomain.com/colors/black.jpg"
      },
      {
        "name": "White",
        "hex": "#FFFFFF",
        "image": "https://cdn.yourdomain.com/colors/white.jpg"
      }
    ],

    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },

  "shipping": {
    "deliveryTime": "2-4 Days",
    "cashOnDelivery": true,
    "freeShipping": true,
    "freeShippingMinimum": 1500
  },

  "returnPolicy": {
    "returnDays": 7,
    "exchangeAvailable": true
  },

  "specifications": [
    {
      "name": "Material",
      "value": "100% Cotton"
    },
    {
      "name": "Fit",
      "value": "Oversized"
    },
    {
      "name": "Sleeve",
      "value": "Half Sleeve"
    },
    {
      "name": "Neck",
      "value": "Round Neck"
    }
  ],

  "reviews": {
    "summary": {
      "average": 4.8,
      "total": 248,
      "fiveStar": 180,
      "fourStar": 48,
      "threeStar": 15,
      "twoStar": 3,
      "oneStar": 2
    },

    "latest": [
      {
        "id": "rev001",
        "user": {
          "name": "Rahim"
        },
        "rating": 5,
        "comment": "Excellent quality. Fits perfectly.",
        "createdAt": "2026-06-20T12:20:00Z"
      }
    ]
  },

  "relatedProducts": [
    {
      "id": "prd02",
      "title": "Oversized White T-Shirt",
      "slug": "oversized-white-tshirt",
      "thumbnail": "https://cdn.yourdomain.com/products/white/front.jpg",
      "price": 850
    },
    {
      "id": "prd03",
      "title": "Classic Black Polo",
      "slug": "classic-black-polo",
      "thumbnail": "https://cdn.yourdomain.com/products/polo/front.jpg",
      "price": 990
    }
  ],

  "createdAt": "2026-05-15T10:00:00Z",
  "updatedAt": "2026-06-29T08:30:00Z"
}

*/ 