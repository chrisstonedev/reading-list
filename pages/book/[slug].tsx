import client from '../../client';
import Link from 'next/link';
import {authorArrayToString} from '../../components/BookCard';

type Props = {
    book: {
        title: string,
        subtitle: string,
        mainAuthors: string[],
        withAuthors: string[],
        publishYear: string
    }
};

// noinspection JSUnusedGlobalSymbols
export default function Book(props: Props) {
    const {
        title = 'Missing title',
        subtitle = '',
        mainAuthors = ['Missing name'],
        withAuthors = ['Missing name'],
        publishYear = '?'
    } = props.book || {};
    const author = authorArrayToString(mainAuthors);
    const withs = withAuthors ? authorArrayToString(withAuthors) : '';
    return (
        <article>
            <h1 className="text-3xl font-bold">{title}</h1>
            <h2 className="text-2xl font-semibold">{subtitle}</h2>
            <h3 className="text-xl font-light">
                <span>by {author}</span>
                {withs && (<span> with {withs}</span>)}
            </h3>
            <p>Published: {publishYear}</p>
            <Link href="/"><a className="text-blue-500 underline">Go back</a></Link>
        </article>
    )
}

// noinspection JSUnusedGlobalSymbols
export async function getStaticPaths() {
    const paths: string[] = await client.fetch('*[_type == "book" && defined(slug.current)][].slug.current');

    return {
        paths: paths.map(slug => ({params: {slug}})),
        fallback: true,
    }
}

// noinspection JSUnusedGlobalSymbols
export async function getStaticProps(context: {params: {slug: string}}) {
    const {slug = ""} = context.params;
    const book = await client.fetch(`*[_type == "book" && slug.current == $slug][0]{
        title,
        subtitle,
        "mainAuthors": mainAuthors[]->name,
        "withAuthors": withAuthors[]->name,
        publishYear
        }`, {slug}
    );
    return {
        props: {
            book
        }
    }
}