import Link from 'next/link'
import client from '../client'

function Home(props) {
    const {books = []} = props
    return (
        <div>
            <h1>Welcome to a list of books!</h1>
            {books.map(
                ({_id, title = '', slug = '', _updatedAt = ''}) =>
                    slug && (
                        <li key={_id}>
                            <Link prefetch href="/book/[slug]" as={`/book/${slug.current}`}>
                                <a>{title}</a>
                            </Link>{' '}
                            ({new Date(_updatedAt).toDateString()})
                        </li>
                    )
            )}
        </div>
    )
}

Home.getInitialProps = async () => ({
    books: await client.fetch('*[_type == "book"]')
})

export default Home
