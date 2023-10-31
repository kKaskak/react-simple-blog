import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title for <meta> and blog page',
      type: 'string',
    }),
    defineField({
      name: 'titleColor',
      title: 'Article Title Color',
      type: 'string',
    }),
    defineField({
      name: 'titleFilter',
      title: 'Title Filter',
      type: 'string',
    }),
    defineField({
      name: 'titleColorCard',
      title: 'Card Title Color',
      type: 'string',
    }),
    defineField({
      name: 'titleColorFeatured',
      title: 'Featured Card Title Color',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description for <meta> and blog page',
      type: 'string',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords for <meta>',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'headerImageLink',
      title: 'Header Image link for <meta>',
      type: 'string',
    }),
    defineField({
      name: 'headerImageAlt',
      title: 'Header Image Alt',
      type: 'string',
    }),
    defineField({
      name: 'headerDataColor',
      title: 'Header Data Color',
      type: 'string',
    }),
    defineField({
      name: 'arrowColor',
      title: 'Arrow Back Color',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'categoriesPreviewColor',
      title: 'Categories Preview Color',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'string',
    }),
    defineField({
      name: 'publishedAtPreviewColor',
      title: 'Published at Color',
      type: 'string',
    }),
    defineField({
      name: 'publishedAtExact',
      title: 'Published at Exact',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'ffTitle',
      title: '1st Featured article title',
      type: 'string',
    }),
    defineField({
      name: 'ffImage',
      title: '1st Featured article img',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ffImageAlt',
      title: '1st Featured article img alt',
      type: 'string',
    }),
    defineField({
      name: 'ffParagraph',
      title: '1st Featured article paragraph',
      type: 'string',
    }),
    defineField({
      name: 'ffLink',
      title: '1st Featured article btn link',
      type: 'string',
    }),
    defineField({
      name: 'fsTitle',
      title: '2nd Featured article title',
      type: 'string',
    }),
    defineField({
      name: 'fsImage',
      title: '2nd Featured article img',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'fsImageAlt',
      title: '2nd Featured article img alt',
      type: 'string',
    }),
    defineField({
      name: 'fsParagraph',
      title: '2nd Featured article paragraph',
      type: 'string',
    }),
    defineField({
      name: 'fsLink',
      title: '2nd Featured article btn link',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'previewImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
