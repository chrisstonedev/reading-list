import Link from 'next/link';
import client from '../client';
import Image from 'next/image';

const authorArrayToString = (authors) => {
    let author;
    if (authors.length === 2) {
        author = authors.join(' & ');
    } else if (authors.length > 2) {
        author = `${authors.slice(0, 2).join(', ')}, & ${authors[authors.length - 1]}`;
    } else {
        author = authors.join('');
    }
    return author;
}

function Home(props) {
    const {books = []} = props
    return (
        <>
            <h1 className="text-3xl font-bold underline">Welcome to a list of recommended technical books!</h1>
            <div className="p-10 grid grid-cols-1 gap-5">
                {books.map(({
                                _id,
                                title = '',
                                slug = '',
                                subtitle = '',
                                mains = [],
                                withs = [],
                                coverImageUrl = '',
                                recommendations = 0,
                                myRecommendations = 0,
                    wished = 0,
                    myWished = 0
                            }) => {
                        let author = 'by ' + authorArrayToString(mains.map(x => x.name));
                        if (withs?.length > 0) {
                            author += ' with ' + authorArrayToString(withs.map(x => x.name));
                        }
                        return slug && (
                            <div className="bg-white rounded-lg ring-1 ring-gray-900/5 shadow-xl">
                                <div className="flex gap-3">
                                    <Image className="rounded-tl-lg w-full" src={coverImageUrl} alt={title}
                                           width={50}
                                           height={75}
                                           aria-hidden="true"/>
                                    <div className="inline-block align-top">
                                        <h2 className="text-gray-900 text-base font-medium tracking-tight">
                                            <Link prefetch href="/book/[slug]" as={`/book/${slug.current}`}><a>
                                                {title}
                                            </a></Link>
                                        </h2>
                                        <p className="text-gray-700 text-sm">{subtitle}</p>
                                        <p className="text-gray-500 text-sm">{author}</p>
                                    </div>
                                </div>
                                <button className={`${myRecommendations > 0 ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3`}>
                                    <span>{myRecommendations > 0 ? 'Recommended!' : 'Recommend'}</span>
                                    <span className="bg-amber-300 text-teal-800 text-xs ml-3 px-2 rounded-full font-semibold">{recommendations}</span>
                                </button>
                                <button className={`${myWished > 0 ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3`}>
                                    <span>{myWished > 0 ? 'Wished!' : 'Wish List'}</span>
                                    <span className="bg-amber-300 text-teal-800 text-xs ml-3 px-2 rounded-full font-semibold">{wished}</span>
                                </button>
                            </div>
                        );
                    }
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
        "mains": mainAuthors[]->{name},
        "withs": withAuthors[]->{name},
        "coverImageUrl": frontCover.asset->url,
        "recommendations": count(*[_type == "recommendation" && book._ref == ^._id]),
        "myRecommendations": count(*[_type == "recommendation" && book._ref == ^._id]),
        "wished": count(*[_type == "recommendation" && book._ref == ^._id]),
        "myWished": count(*[_type == "recommendation" && book._ref == ^._id])
    }`)
})

export default Home
