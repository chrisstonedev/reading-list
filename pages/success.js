import Head from "next/head";
import Link from "next/link";

export default function Success() {
    return (
        <>
            <Head>
                <title>Request Book Submitted - reading.engineering</title>
            </Head>
            <div className="flex flex-col items-center py-10 bg-gray-200">
                <div className="mb-4">Form successfully submitted!</div>
                <Link href="/">
                    <a className="mb-4 text-blue-500 underline">
                        Return to reading.engineering
                    </a>
                </Link>
            </div>
        </>
    )
}