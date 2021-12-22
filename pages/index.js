import client from '../client';
import netlifyAuth from '../netlifyAuth';
import BookCard from '../components/bookCard'
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

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
            console.log('Signout');
            setUser(null);
        })
    }

    return (
        <>
            <Head>
                <title>Reading List</title>
            </Head>
            <h1 className="text-3xl font-bold underline">Recommended Technical Reading List</h1>
            <a className="block mb-4 text-green-700 underline" href="https://github.com/chrisstonedev/reading-list"
               target="_blank" rel="noreferrer">Check out the source code on GitHub!</a>
            {user ? (
                <div>
                    You are logged in!{' '}
                    {user && <>Welcome {user?.user_metadata.full_name}!</>}
                    <br/>
                    <button onClick={logout} className="text-blue-500 underline">
                        Log out here
                    </button>
                </div>
            ) : (
                <>
                    <button onClick={login} className="text-blue-500 underline">
                        Log in to help mark books as recommended or add them to a wish list
                    </button>
                    <p className="text-sm">Note: After logging in, you may need to refresh to update the state.</p>
                </>
            )}
            <div className="p-10 grid grid-cols-1 gap-5">
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
            </div>
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
