import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'xw35o1hi',
    dataset: 'production',
    apiVersion: '2021-12-18',
    token: process.env.SANITY_TOKEN,
    useCdn: true
})