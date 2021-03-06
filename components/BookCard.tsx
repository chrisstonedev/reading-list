import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';

export function authorArrayToString(authors: string[]): string {
    if (authors.length === 2) {
        return authors.join(' & ');
    }
    if (authors.length > 2) {
        return `${authors.slice(0, 2).join(', ')}, & ${authors[authors.length - 1]}`;
    }
    return authors.join('');
}

type Props = {
    id: string,
    title: string,
    slug: string,
    subtitle: string,
    mains: { name: string }[],
    withs: { name: string }[],
    coverImageUrl: string,
    recommendations: number,
    allRecommenders: { userId: string }[],
    wished: number,
    allWishers: { userId: string }[],
    userId: string
};

type Counters = {
    userId: string,
    userRecommends: boolean,
    recommendCount: number,
    userWishes: boolean,
    wishCount: number,
};

export default function BookCard(props: Props) {
    const userId = props.userId;
    let author = '';
    if (props.mains?.length > 0) {
        author += 'by ' + authorArrayToString(props.mains.map(x => x.name));
        if (props.withs?.length > 0) {
            author += ' with ' + authorArrayToString(props.withs.map(x => x.name));
        }
    }

    const initialState = {
        userId: userId,
        userRecommends: props.allRecommenders.map(x => x.userId).includes(userId),
        userWishes: props.allWishers.map(x => x.userId).includes(userId),
        recommendCount: props.recommendations,
        wishCount: props.wished,
    }
    const [counters, setCounters] = useState<Counters>(initialState);
    if (counters.userId !== userId) {
        setCounters(initialState);
    }

    function createDocument(documentType: string, bookId: string, userId: string) {
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

    function deleteDocument(documentType: string, bookId: string, userId: string) {
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
        if (counters.userRecommends) {
            deleteDocument('recommendation', props.id, userId);
            setCounters(() => {
                return {
                    ...counters,
                    userRecommends: false,
                    recommendCount: counters.recommendCount - 1
                }
            });
            return;
        }
        createDocument('recommendation', props.id, userId);
        setCounters(() => {
            return {
                ...counters,
                userRecommends: true,
                recommendCount: counters.recommendCount + 1
            }
        });
    }

    function wish() {
        if (counters.userWishes) {
            deleteDocument('wishList', props.id, userId);
            setCounters(() => {
                return {
                    ...counters,
                    userWishes: false,
                    wishCount: counters.wishCount - 1,
                }
            });
            return;
        }
        createDocument('wishList', props.id, userId);
        setCounters(() => {
            return {
                ...counters,
                userWishes: true,
                wishCount: counters.wishCount + 1
            }
        });
    }

    // noinspection HtmlUnknownTarget
    return (
        <div className="bg-white rounded-lg ring-1 ring-gray-900/5 shadow-xl">
            <div className="flex gap-3">
                <Image className="rounded-tl-lg w-full"
                       src={props.coverImageUrl.length > 0 ? props.coverImageUrl : '/image-missing.png'}
                       alt={props.title}
                       width={50}
                       height={75}
                       aria-hidden="true"/>
                <div className="inline-block align-top">
                    <h2 className="text-gray-900 text-base font-medium tracking-tight" aria-label="Book title">
                        <Link href="/book/[slug]" as={`/book/${props.slug}`}><a>
                            {props.title}
                        </a></Link>
                    </h2>
                    <p className="text-gray-700 text-sm" aria-label="Book subtitle">{props.subtitle}</p>
                    <p className="text-gray-500 text-sm" aria-label="Book author">{author}</p>
                </div>
            </div>
            <div className="my-3">
                {userId ? (
                    <>
                        <button
                            className={`${counters.userRecommends ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4`}
                            onClick={recommend} aria-label="Recommend button">
                            <span>{counters.userRecommends ? 'Recommended!' : 'Recommend'}</span>
                            <span
                                className="bg-amber-300 text-gray-800 text-xs ml-3 px-2 rounded-full font-semibold">{counters.recommendCount}</span>
                        </button>
                        <button
                            className={`${counters.userWishes ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-300 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold ml-4`}
                            onClick={wish} aria-label="Wish list button">
                            <span>{counters.userWishes ? 'Wished!' : 'Wish List'}</span>
                            <span
                                className="bg-amber-300 text-gray-800 text-xs ml-3 px-2 rounded-full font-semibold">{counters.wishCount}</span>
                        </button>
                    </>
                ) : (
                    <>
                        <span
                            className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3">
                            <span>Recommended</span>
                            <span
                                className="bg-amber-200 text-gray-600 text-xs ml-3 px-2 rounded-full font-semibold">{props.recommendations}</span>
                        </span>
                        <span
                            className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-sm font-semibold ml-4 my-3">
                            <span>Wish Listed</span>
                            <span
                                className="bg-amber-200 text-gray-600 text-xs ml-3 px-2 rounded-full font-semibold">{props.wished}</span>
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}