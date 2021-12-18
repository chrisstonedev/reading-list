import client from '../../client';

function Book(props) {
    const {title = 'Missing title', mainAuthors = ['Missing name']} = props.book || {};
    let author;
    if (mainAuthors.length === 2) {
        author = mainAuthors.join(' & ');
    } else if (mainAuthors.length > 2) {
        author = `${mainAuthors.slice(0, 2).join(', ')}, & ${mainAuthors[mainAuthors.length - 1]}`;
    } else {
        author = mainAuthors.join('');
    }
    return (
        <article>
            <h1>{title}</h1>
            <span>By {author}</span>
        </article>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch('*[_type == "book" && defined(slug.current)][].slug.current');

    return {
        paths: paths.map((slug) => ({params: {slug}})),
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const {slug = ""} = context.params;
    const book = await client.fetch(`*[_type == "book" && slug.current == $slug][0]{
        title,
        "mainAuthors": mainAuthors[]->name
        }`, {slug}
    );
    return {
        props: {
            book
        }
    }
}

export default Book