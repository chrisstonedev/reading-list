import {useRouter} from 'next/router';

function Slug() {
    const router = useRouter();

    return (
        <article>
            <h1>{router.query.slug}</h1>
        </article>
    )
}

export default Slug