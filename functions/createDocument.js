const sanityClient = require('@sanity/client');

const sanity = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    apiVersion: '2021-12-21',
    useCdn: false,
})

exports.handler = async (request) => {
    let values = JSON.parse(request.body);
    const doc = {
        _type: values.documentType,
        book: {
            _type: 'reference',
            _ref: values.bookId
        },
        userId: values.userId,
    };

    await sanity.create(doc);
    return {
        statusCode: 200,
        body: JSON.stringify('ok'),
    }
}