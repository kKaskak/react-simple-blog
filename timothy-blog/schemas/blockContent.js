import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            title: 'Anchor Link',
            name: 'anchorLink',
            type: 'object',
            fields: [
              {
                title: 'ID',
                name: 'id',
                type: 'string',
                description: 'Anchor ID (without the # symbol)',
                validation: Rule => Rule.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      title: 'Anchor Heading',
      name: 'anchorHeading',
      type: 'object',
      fields: [
        {
          title: 'Heading Text',
          name: 'text',
          type: 'string',
        },
        {
          title: 'Heading Level',
          name: 'level',
          type: 'number',
          options: {
            list: [
              {title: 'H1', value: 1},
              {title: 'H2', value: 2},
              {title: 'H3', value: 3},
              {title: 'H4', value: 4},
            ],
          },
          initialValue: 2,
        },
        {
          title: 'Anchor ID',
          name: 'anchorId',
          type: 'string',
          description: 'ID for anchor links (without the # symbol)',
        },
      ],
      preview: {
        select: {
          title: 'text',
          level: 'level',
          anchorId: 'anchorId',
        },
        prepare({title, level, anchorId}) {
          return {
            title: `H${level}: ${title}`,
            subtitle: anchorId ? `#${anchorId}` : 'No anchor ID',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
    defineArrayMember({
      title: 'Custom Image',
      name: 'customImage',
      type: 'object',
      fields: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {hotspot: true},
        },
        {
          title: 'Alt Text',
          name: 'alt',
          type: 'string',
          description: 'Alternative text for screen readers',
        },
      ],
    }),
  ],
})