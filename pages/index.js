import client from '../client';
import {useEffect, useState} from 'react';
import netlifyAuth from '../netlifyAuth';
import BookCard from '../components/bookCard'
import {useRouter} from 'next/router';

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
        console.log('About to authenticate');
        netlifyAuth.authenticate((user) => {
            console.log('Authenticate result...',user);
            setUser(user);
            if (user) {
                console.log('Can I get a reload please?');
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
            <h1 className="text-3xl font-bold underline">Recommended Technical Reading List</h1>
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
                <button onClick={login} className="text-blue-500 underline">
                    Log in to mark books as recommended or add them to a wish list
                </button>
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
