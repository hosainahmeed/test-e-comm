import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchCategories, Category } from "@/lib/categoriesServerApi";

interface CategoriesPageProps {
  categories: Category[];
}

export default function CategoriesPage({ categories }: CategoriesPageProps) {
  // Group categories by first letter for better organization
  const groupedCategories = categories.reduce(
    (acc, category) => {
      const firstLetter = category.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(category);
      return acc;
    },
    {} as Record<string, Category[]>,
  );

  // Sort the groups alphabetically
  const sortedGroups = Object.keys(groupedCategories).sort();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Categories Grid */}
      <section>
        <div className="grid grid-cols-4 md:grid-cols-10 gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div>
                {/* Category Icon - using emoji based on category name */}
                <div className="w-full bg-gray-100 h-auto aspect-square text-3xl flex flex-col items-center justify-center">
                  <span className="text-3xl">
                    {getCategoryIcon(category.slug)}
                  </span>
                  <h3 className="line-clamp-1 text-xs">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// Helper function to get emoji icon based on category
function getCategoryIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    beauty: "💄",
    fragrances: "🌸",
    furniture: "🪑",
    groceries: "🛒",
    "home-decoration": "🏠",
    "kitchen-accessories": "🍳",
    laptops: "💻",
    "mens-shirts": "👔",
    "mens-shoes": "👞",
    "mens-watches": "⌚",
    "mobile-accessories": "📱",
    motorcycle: "🏍️",
    "skin-care": "🧴",
    smartphones: "📱",
    "sports-accessories": "⚽",
    sunglasses: "🕶️",
    tablets: "📱",
    tops: "👚",
    vehicle: "🚗",
    "womens-bags": "👜",
    "womens-dresses": "👗",
    "womens-jewellery": "💍",
    "womens-shoes": "👠",
    "womens-watches": "⌚",
  };

  return iconMap[slug] || "📦";
}

export const getServerSideProps: GetServerSideProps<
  CategoriesPageProps
> = async () => {
  const categories = await fetchCategories();

  return {
    props: {
      categories,
    },
  };
};
