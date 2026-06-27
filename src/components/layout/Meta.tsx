import Head from 'next/head'

interface MetaProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export default function Meta({
  title = 'YourStore - Online Shopping',
  description = 'Shop the best products at great prices',
  keywords = 'ecommerce, shop, products, online shopping',
  image = '/images/og-image.jpg',
  url = 'https://yourstore.com'
}: MetaProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  )
}