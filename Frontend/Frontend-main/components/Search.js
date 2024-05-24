import { useRouter } from 'next/router';
import styles from "../styles/SearchBar.module.css";

export default function Search() {
    const router = useRouter();

    const handleInput = (event) => {
        event.preventDefault();
        if (!event.target.elements[0].value) return;

        const value = event.target.elements[0].value.replace(/_/g, ' ').toLowerCase();
        const path = `/search/${value}`

        router.push(path);
        event.target.elements[0].value = ''; // empty the search bar
    };

    return (
        <div>
            <form onSubmit={handleInput} className={styles["search-container"]}>
                <input
                    type="search"
                    placeholder="Enter an Item name or ID"
                    className={styles["search-input"]}
                />
                <button 
                    type="submit" 
                    className={styles["search-button"]}>Submit</button>
            </form>
        </div>
    );
}
