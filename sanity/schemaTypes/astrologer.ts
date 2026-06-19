import { defineField, defineType } from 'sanity'

export const astrologerType = defineType({
  name: 'astrologer',
  title: 'Astrologer Profiles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Astrologer Name',
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
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography / Profile Intro',
      type: 'text',
    }),
    defineField({
      name: 'baseFee',
      title: 'Consultation Fee (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'consultationCategory',
      title: 'Consultation Category Expertise',
      description: 'Select the primary consultation category expertise (optional)',
      type: 'reference',
      to: [{ type: 'consultation' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Show / Hide Astrologer',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
