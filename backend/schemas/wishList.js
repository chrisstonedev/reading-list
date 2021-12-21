export default {
    name: 'wishList',
    title: 'Wish List',
    type: 'document',
    fields: [
        {
            name: 'book',
            title: 'Book',
            type: 'reference',
            to: [{type: 'book'}]
        },
        {
            name: 'userId',
            title: 'User ID',
            type: 'string',
        },
    ],

    preview: {
        select: {
            bookTitle: 'book.title',
            userId: 'userId'
        },
        prepare: ({bookTitle, userId}) => {
            return {
                title: bookTitle,
                subtitle: `is wished by ${userId}`
            }
        }
    },
}
