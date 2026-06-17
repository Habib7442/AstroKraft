import { type SchemaTypeDefinition } from 'sanity'
import { bannerType } from './banner'
import { categoryType } from './category'
import { productType } from './product'
import { astrologerType } from './astrologer'
import { consultationType } from './consultation'
import { blogType } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerType, categoryType, productType, astrologerType, consultationType, blogType],
}

