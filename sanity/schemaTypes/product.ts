import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Base Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'salePrice',
      title: 'Sale Price (₹)',
      type: 'number',
      description: 'Optional discount price.',
    }),
    defineField({
      name: 'carats',
      title: 'Weight (Carats)',
      type: 'number',
      description: 'For gemstones (optional).',
    }),
    defineField({
      name: 'rashi',
      title: 'Recommended Rashi / Zodiac Signs',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Aries (Mesh)', value: 'Aries' },
          { title: 'Taurus (Vrish)', value: 'Taurus' },
          { title: 'Gemini (Mithun)', value: 'Gemini' },
          { title: 'Cancer (Kark)', value: 'Cancer' },
          { title: 'Leo (Simha)', value: 'Leo' },
          { title: 'Virgo (Kanya)', value: 'Virgo' },
          { title: 'Libra (Tula)', value: 'Libra' },
          { title: 'Scorpio (Vrishchik)', value: 'Scorpio' },
          { title: 'Sagittarius (Dhanu)', value: 'Sagittarius' },
          { title: 'Capricorn (Makar)', value: 'Capricorn' },
          { title: 'Aquarius (Kumbh)', value: 'Aquarius' },
          { title: 'Pisces (Meen)', value: 'Pisces' },
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Show / Hide Product',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
