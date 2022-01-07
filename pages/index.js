import client from '../client';
import netlifyAuth from '../netlifyAuth';
import BookCard from '../components/BookCard';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Link from "next/link";

function Home(props) {
    const {books = []} = props;
    let [user, setUser] = useState(null);
    const router = useRouter();
    useEffect(() => {
        netlifyAuth.initialize((user) => {
            setUser(user);
        })
    }, []);

    let login = () => {
        netlifyAuth.authenticate((user) => {
            setUser(user);
            if (user) {
                router.reload();
            }
        })
    }
    let logout = () => {
        netlifyAuth.signout(() => {
            setUser(null);
        })
    }

    return (
        <>
            <Head>
                <title>reading.engineering</title>
            </Head>
            <header className="m-10 grid grid-cols-1">
                <h1 className="text-3xl font-bold underline">reading.engineering</h1>
                <p className="mb-4">Help create the definitive list of the most recommended technical books for software engineering professionals.</p>
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
                    <a className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" href="https://github.com/chrisstonedev/reading-list"
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
                    books.map(({
                                   _id,
                                   title = '',
                                   slug = '',
                                   subtitle = '',
                                   mains = [],
                                   withs = [],
                                   coverImageUrl = '',
                                   recommendations = 0,
                                   allRecommenders = [],
                                   wished = 0,
                                   allWishers = []
                               }) => {

                            return (
                                <BookCard key={_id} id={_id} title={title} slug={slug.current} subtitle={subtitle}
                                          mains={mains} withs={withs} coverImageUrl={coverImageUrl}
                                          recommendations={recommendations} allRecommenders={allRecommenders}
                                          wished={wished} allWishers={allWishers} userId={user?.id}/>
                            );
                        }
                    )}
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

export default Home
