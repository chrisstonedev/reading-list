export default {
    name: 'recommendation',
    title: 'Recommendation',
    type: 'document',
    fields: [
        {
            name: 'book',
            title: 'Book',
            type: 'reference',
            to: [{type: 'book'}]
        },
    ],

    preview: {
        select: {
            bookTitle: 'book.title'
        },
        prepare: ({bookTitle}) => {
            return {
                title: 'Some user',
                subtitle: `has recommended ${bookTitle}`
            }
        }
    },
}
