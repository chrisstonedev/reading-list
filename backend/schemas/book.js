export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'mainAuthors',
            title: 'Main authors',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'author'}]}],
        },
        {
            name: 'withAuthors',
            title: 'With authors',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'author'}]}],
        },
        {
            name: 'frontCover',
            title: 'Front cover',
            type: 'image',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        },
        {
            name: 'publishYear',
            title: 'Published in',
            type: 'number',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
    ],

    preview: {
        select: {
            title: 'title',
            author0: 'mainAuthors.0.name',
            author1: 'mainAuthors.1.name',
            author2: 'mainAuthors.2.name'
        },
        prepare: ({title, author0, author1, author2}) => {
            const authors = [author0, author1].filter(Boolean)
            const hasMoreAuthors = Boolean(author2)
            const subtitle = authors.length > 0
                ? (hasMoreAuthors ? `by ${authors.join(', ')}…`: `by ${authors.join(' & ')}`)
                : ''

            return {
                title,
                subtitle
            }
        }
    },
}
