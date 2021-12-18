import Link from 'next/link'
import client from '../client'

function Home(props) {
    const {books = []} = props
    return (
        <div>
            <h1>Welcome to a list of recommended technical books!</h1>
            {books.map(
                ({_id, title = '', slug = '', subtitle = '', recommendations = ''}) =>
                    slug && (
                        <li key={_id}>
                            <Link prefetch href="/book/[slug]" as={`/book/${slug.current}`}>
                                <a>{subtitle ? `${title}: ${subtitle}` : title}</a>
                            </Link>{' '}
                            <button>{recommendations}</button>
                        </li>
                    )

            )}
        </div>
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
        "recommendations": count(*[_type == "recommendation" && book._ref == ^._id])
    }`)
})

export default Home
