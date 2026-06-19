import { defineField, defineType } from 'sanity'

export const consultationType = defineType({
  name: 'consultation',
  title: 'Consultations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Service Icon/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'assignedAstrologers',
      title: 'Assigned Astrologers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'astrologer' }],
        },
      ],
      description: 'Astrologers who are qualified to handle this specific service.',
    }),
    defineField({
      name: 'isActive',
      title: 'Show / Hide Consultation Service',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
