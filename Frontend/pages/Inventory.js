import { useEffect } from 'react'; // Import useEffect
import useSWR from 'swr';
import { useRouter } from "next/router";
import Pagnation from "../components/Pagnation";
import Top from "../components/Top";
import styles from "../styles/Shop.module.css"

export default function Items() {
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, []);


    const fetcher = (url) => fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then((res) => res.json());
    const { data: Inventory, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/getInventory`, 
    fetcher);

    if (error) return <div>Error loading data</div>;
    if (!Inventory) return <div>Loading...</div>;

    return (
        <div className={styles['background']} style={{height: "100%"}}>
            <Top/>
            {Inventory.length > 0 ? (
                <Pagnation items={Inventory}/>
            ) : (
                <div style={{height: "92vh"}}>
                    <b style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>Nothing here...</b>
                </div>
            )}
        </div>
    )


}