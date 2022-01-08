import client from '../client';
import netlifyAuth from '../netlifyAuth';
import BookCard from '../components/BookCard';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Link from 'next/link';

type Props = {
    books: {
        _id: string,
        title: string,
        slug: { current: string },
        subtitle: string,
        mains: { name: string }[],
        withs: { name: string }[],
        coverImageUrl: string,
        recommendations: number,
        allRecommenders: { userId: string }[],
        wished: number,
        allWishers: { userId: string }[]
    }[]
};

type User = {
    id: string,
    user_metadata: {
        full_name: string
    }
};

export default function Home(props: Props) {
    const {books = []} = props;
    let [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        netlifyAuth.initialize((user: User) => {
            setUser(user);
        })
    }, []);

    function login() {
        netlifyAuth.authenticate((user: User) => {
            setUser(user);
            if (user) {
                router.reload();
            }
        })
    }

    function logout() {
        netlifyAuth.signout(() => {
            setUser(null);
        })
    }

    // noinspection HtmlUnknownTarget
    return (
        <>
            <Head>
                <title>reading.engineering</title>
            </Head>
            <header className="m-10 grid grid-cols-1">
                <h1 className="text-3xl font-bold underline">reading.engineering</h1>
                <p className="mb-4">Help create the definitive list of the most recommended technical books for software
                    engineering professionals.</p>
                <div>
                    <button onClick={user ? logout : login}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold text-xl py-2 px-4 rounded mr-6">
                        <span>{user ? 'Log out' : 'Log in'}</span>
                    </button>
                    <Link href="/request">
                        <a className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-4">
                            <span>Request missing book</span>
                        </a>
                    </Link>
                    <a className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                       href="https://github.com/chrisstonedev/reading-list"
                       target="_blank" rel="noreferrer">View source code</a>
                </div>
                {user ? (
                    <p>
                        You are logged in!{' '}
                        {user && <>Welcome {user?.user_metadata.full_name}!</>}
                    </p>
                ) : (
                    <p className="text-sm">Note: After logging in, you may need to refresh to update the state.</p>
                )}
            </header>
            <main className="m-10 grid grid-cols-1 gap-5">
                {
                    books.map(book => (
                        <BookCard key={book._id} id={book._id} title={book.title} slug={book.slug.current}
                                  subtitle={book.subtitle} mains={book.mains} withs={book.withs}
                                  coverImageUrl={book.coverImageUrl} recommendations={book.recommendations}
                                  allRecommenders={book.allRecommenders} wished={book.wished}
                                  allWishers={book.allWishers} userId={user?.id ?? ''}/>
                    ))
                }
            </main>
        </>
    )
}

Home.getInitialProps = async () => {
    return ({
        books: await client.fetch(`*[_type == "book"]{
        _id,
        title,
        subtitle,
        slug,
        "mains": mainAuthors[]->{name},
        "withs": withAuthors[]->{name},
        "coverImageUrl": frontCover.asset->url,
        "recommendations": count(*[_type == "recommendation" && book._ref == ^._id]),
        "allRecommenders": *[_type == "recommendation" && book._ref == ^._id]{userId},
        "wished": count(*[_type == "wishList" && book._ref == ^._id]),
        "allWishers": *[_type == "wishList" && book._ref == ^._id]{userId}
    }|order(title asc)|order(wished desc)|order(recommendations desc)`)
    });
}