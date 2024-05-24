// Shop.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Shop() {
    const router = useRouter();

    useEffect(() => {
        // Only push the route if the current path is not the search path
        if (router.pathname !== '/search') {
            router.push("/search/any");
        }
    }, []); // Ensure this effect runs only once when the component mounts

    return <></>;
}
