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

    await sanity.delete({query: `*[_type == "${values.documentType}" && userId == "${values.userId}" && book._ref == "${values.bookId}"]`});
    return {
        statusCode: 200,
        body: 'ok',
    }
}