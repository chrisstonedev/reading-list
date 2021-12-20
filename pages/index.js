import Link from 'next/link';
import client from '../client';
import Image from 'next/image';

function Home(props) {
    const {books = []} = props
    return (
        <>
            <h1 className="text-3xl font-bold underline">Welcome to a list of recommended technical books!</h1>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {books.map(
                    ({_id, title = '', slug = '', subtitle = '', coverImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Question_opening-closing.svg', recommendations = ''}) =>
                        slug && (
                            <div>
                                <Link prefetch href="/book/[slug]" as={`/book/${slug.current}`}>
                                    <a>
                                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                            {/*<Image className="w-full" src={coverImageUrl} alt={title} width='2' height='5'/>*/}
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">{title}</div>
                                                <div className="mb-10">{subtitle}</div>
                                                <div className="mb-2">{title}</div>
                                            </div>
                                            <div className="px-6 pt-4 pb-2">
                                            <span
                                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Recommend ({recommendations})</span>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Wish List (0)</span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                )}
            </div>
        </>
    )
}

Home.getInitialProps = async () => ({
    books: await client.fetch(`*[_type == "book"]{
        _id,
        title,
        subtitle,
        slug,
        mainAuthors,
        withAuthors,
        "coverImageUrl": frontCover.asset->url,
        "recommendations": count(*[_type == "recommendation" && book._ref == ^._id])
    }`)
})

export default Home
