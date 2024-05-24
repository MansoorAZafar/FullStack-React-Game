import { useEffect } from 'react'; // Import useEffect
import { useRouter } from "next/router";
import useSWR from 'swr';
import Search from "../../components/Search";
import Pagnation from "@/components/Pagnation";
import Top from "../../components/Top";
import styles from "../../styles/Shop.module.css"

export default function Id() {
    const router = useRouter();
    
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, []);

    const { id } = router.query;

    const { data: loc, error } = useSWR(id ? `https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment` : null, 
        (url) => fetch(url).then(res => res.json())
    );

    if (error) return <div>Error loading data</div>;
    if (!loc) return <div>Loading...</div>;

    let filteredItems = loc.data;
    // Filter items based on the keyword 'id'
    if(!isNaN(id)) {
        filteredItems = loc.data.filter(item => item.id == id);
    }
    else if(id !== 'any') {
        filteredItems = loc.data.filter(item => item.name.toLowerCase().includes(`${id}`));
    }
    
    // Sort items based on item.id
    filteredItems.sort((a, b) => a.id - b.id);

    return (
        <>
        <div className={styles["background"]}>
            <Top/>
            <Search/>
            {filteredItems.length > 0 ? (
                <Pagnation items={filteredItems}/>
            ) : (
                <p>No Such Result Exists...</p>
            )}
        </div>
        </>
    );
}
