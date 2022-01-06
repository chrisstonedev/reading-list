import ContactForm from "../components/ContactForm";
import Link from "next/link";
import Head from "next/head";

export default function Request() {
    return (
        <>
            <Head>
                <title>Request Book - reading.engineering</title>
            </Head>
            <div className="flex flex-col items-center py-10 bg-gray-200">
                <Link href="/">
                    <a className="mb-4 text-blue-500 underline">
                        Return to reading.engineering
                    </a>
                </Link>
                <p>Is there a book that is not on this list that should be added?</p>
                <p className="mb-4">Let me know, and I will add it soon!</p>
                <ContactForm/>
            </div>
        </>
    )
}