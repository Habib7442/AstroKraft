import { defineQuery } from 'next-sanity'

// 1. Fetch active banners ordered by sequence
export const bannersQuery = defineQuery(`
  *[_type == "banner" && isActive != false] | order(sequence asc) {
    _id,
    title,
    image,
    link,
    sequence
  }
`)

// 2. Fetch active categories
export const categoriesQuery = defineQuery(`
  *[_type == "category" && isActive != false] {
    _id,
    name,
    slug,
    image,
    description
  }
`)

// 3. Fetch active products
export const productsQuery = defineQuery(`
  *[_type == "product" && isActive != false] {
    _id,
    name,
    slug,
    category->{
      _id,
      name,
      slug
    },
    image,
    description,
    price,
    salePrice,
    priceBasic,
    salePriceBasic,
    priceSemiPremium,
    salePriceSemiPremium,
    pricePremium,
    salePricePremium,
    isBestSelling,
    carats,
    rashi
  }
`)

// 4. Fetch products within a specific category slug
export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && isActive != false && category->slug.current == $categorySlug] {
    _id,
    name,
    slug,
    category->{
      _id,
      name,
      slug
    },
    image,
    description,
    price,
    salePrice,
    priceBasic,
    salePriceBasic,
    priceSemiPremium,
    salePriceSemiPremium,
    pricePremium,
    salePricePremium,
    isBestSelling,
    carats,
    rashi
  }
`)

// 5. Fetch active consultations and their assigned astrologers
export const consultationsQuery = defineQuery(`
  *[_type == "consultation" && isActive != false] {
    _id,
    title,
    slug,
    image,
    description,
    assignedAstrologers[]-> {
      _id,
      name,
      slug,
      photo,
      specializations,
      languages,
      baseFee
    }
  }
`)

// 6. Fetch active astrologers
export const astrologersQuery = defineQuery(`
  *[_type == "astrologer" && isActive != false] {
    _id,
    name,
    slug,
    photo,
    specializations,
    languages,
    bio,
    baseFee,
    consultationCategory-> {
      _id,
      title,
      slug
    }
  }
`)

// 7. Fetch active blog posts ordered by publication date
export const blogsQuery = defineQuery(`
  *[_type == "blog" && isActive != false] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }
`)

// 8. Fetch a single blog post by its slug
export const blogBySlugQuery = defineQuery(`
  *[_type == "blog" && slug.current == $slug && isActive != false][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt
  }
`)

// --- Admin Dashboard Queries (Fetches all, includes isActive) ---

export const adminBannersQuery = defineQuery(`
  *[_type == "banner"] | order(sequence asc) {
    _id,
    title,
    image,
    link,
    sequence,
    isActive
  }
`)

export const adminCategoriesQuery = defineQuery(`
  *[_type == "category"] {
    _id,
    name,
    slug,
    image,
    description,
    isActive
  }
`)

export const adminProductsQuery = defineQuery(`
  *[_type == "product"] {
    _id,
    name,
    slug,
    category->{
      _id,
      name,
      slug
    },
    image,
    description,
    price,
    salePrice,
    priceBasic,
    salePriceBasic,
    priceSemiPremium,
    salePriceSemiPremium,
    pricePremium,
    salePricePremium,
    isBestSelling,
    carats,
    rashi,
    isActive
  }
`)


export const adminConsultationsQuery = defineQuery(`
  *[_type == "consultation"] {
    _id,
    title,
    slug,
    image,
    description,
    isActive,
    assignedAstrologers[]-> {
      _id,
      name,
      slug,
      photo,
      specializations,
      languages,
      baseFee
    }
  }
`)

export const adminAstrologersQuery = defineQuery(`
  *[_type == "astrologer"] {
    _id,
    name,
    slug,
    photo,
    specializations,
    languages,
    bio,
    isActive,
    baseFee,
    consultationCategory-> {
      _id,
      title,
      slug
    }
  }
`)

