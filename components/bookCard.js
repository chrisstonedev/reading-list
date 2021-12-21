import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

const authorArrayToString = (authors) => {
    if (authors.length === 2) {
        return authors.join(' & ');
    }
    if (authors.length > 2) {
        return `${authors.slice(0, 2).join(', ')}, & ${authors[authors.length - 1]}`;
    }
    return authors.join('');
}

const BookCard = (props) => {
    let author = 'by ' + authorArrayToString(props.mains.map(x => x.name));
    if (props.withs?.length > 0) {
        author += ' with ' + authorArrayToString(props.withs.map(x => x.name));
    }

    console.log('my userId', typeof props.userId, 'all', props.allRecommenders.map(x => typeof x.userId), 'wish', props.allWishers.map(x => x.userId));

    const [userRecommended, setUserRecommended] = useState(props.allRecommenders.map(x => x.userId).includes(props.userId));
    const [userWished, setUserWished] = useState(props.allWishers.map(x => x.userId).includes(props.userId));
    const [recommendationCount, setRecommendationCount] = useState(props.recommendations);
    const [wishedCount, setWishedCount] = useState(props.wished);

    function createDocument(documentType, bookId, userId) {
        fetch('/.netlify/functions/createDocument', {
            method: 'POST',
            body: JSON.stringify({
                documentType,
                bookId,
                userId,
            })
        })
            .then(() => console.log('Document successfully created.'))
            .catch(err => console.error('Document failed to be created: ', err));
    }

    function deleteDocument(documentType, bookId, userId) {
        fetch('/.netlify/functions/deleteDocument', {
            method: 'POST',
            body: JSON.stringify({
                documentType,
                bookId,
                userId,
            })
        })
            .then(() => console.log('Document successfully deleted.'))
            .catch(err => console.error('Document failed to be deleted: ', err));
    }

    function recommend() {
        if (userRecommended) {
            deleteDocument('recommendation', props.id, props.userId);
            setRecommendationCount(recommendationCount - 1);
            setUserRecommended(false);
            return;
        }
        createDocument('recommendation', props.id, props.userId);
        setRecommendationCount(recommendationCount + 1);
        setUserRecommended(true);
    }

    function wish() {
        if (userWished) {
            deleteDocument('wishList', props.id, props.userId);
            setWishedCount(wishedCount - 1);
            setUserWished(false);
            return;
        }
        createDocument('wishList', props.id, props.userId);
        setWishedCount(wishedCount + 1);
        setUserWished(true);
    }

    return (
        <div className="bg-white rounded-lg ring-1 ring-gray-900/5 shadow-xl">
            <div className="flex gap-3">
                <Image className="rounded-tl-lg w-full" src={props.coverImageUrl} alt={props.title}
                       width={50}
                       height={75}
                       aria-hidden="true"/>
                <div className="inline-block align-top">
                    <h2 className="text-gray-900 text-base font-medium tracking-tight">
                        <Link href="/book/[slug]" as={`/book/${props.slug}`}><a>
                            {props.title}
                        </a></Link>
                    </h2>
                    <p className="text-gray-700 text-sm">{props.subtitle}</p>
                    <p className="text-gray-500 text-sm">{author}</p>
                </div>
            </div>
            <div className="my-3">
                {props.userId ? (
                    <>
                        <button className={`${userRecommended ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4`}
                                onClick={recommend}>
                            <span>{userRecommended ? 'Recommended!' : 'Recommend'}</span>
                            <span
                                className="bg-amber-300 text-gray-800 text-xs ml-3 px-2 rounded-full font-semibold">{recommendationCount}</span>
                        </button>
                        <button className={`${userWished ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4`}
                                onClick={wish}>
                            <span>{userWished ? 'Wished!' : 'Wish List'}</span>
                            <span className="bg-amber-300 text-gray-800 text-xs ml-3 px-2 rounded-full font-semibold">{wishedCount}</span>
                        </button>
                    </>
                ) : (
                    <>
                        <span className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3">
                            <span>Recommended</span>
                            <span className="bg-amber-200 text-gray-600 text-xs ml-3 px-2 rounded-full font-semibold">{props.recommendations}</span>
                        </span>
                        <span className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3">
                            <span>Wish Listed</span>
                            <span className="bg-amber-200 text-gray-600 text-xs ml-3 px-2 rounded-full font-semibold">{props.wished}</span>
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default BookCard;