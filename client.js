import sanityClient from '@sanity/cli';

export default sanityClient({
    projectId: 'reading-list',
    dataset: 'production',
    useCdn: true
})