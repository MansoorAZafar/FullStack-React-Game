import { useEffect } from 'react'; // Import useEffect
import { useRouter } from "next/router";
import useSWR from 'swr';
import Search from "../../components/Search";
import DisplayPro from "@/components/DisplayPro";
import Top from "../../components/Top";
import styles from "../../styles/Shop.module.css"

export default function Id() {
    const router = useRouter();
    
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, []);

    const id  = router.query.detailed;
    const { data: loc, error } = useSWR(id ? `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}` : null, 
        (url) => fetch(url).then(res => res.json())
    );

    if (error) return <div>Error loading data</div>;
    if (!loc) return <div>Loading...</div>;

    const data = loc.data;

    return (
        <div className={styles['background']}>
            <Top/>
            <Search/>
            {data ? (
                <DisplayPro item={data}/>
            ) : (
                <p>No Such Result Exists...</p>
            )}
        </div>
    );
}
