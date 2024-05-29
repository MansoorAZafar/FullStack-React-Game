import { useState, useEffect } from "react";
import DisplayLite from "../components/DisplayLite";
import styles from "../styles/Shop.module.css";

export default function Pagnation({ items }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    useEffect(() => {
        // Ensure currentPage is within valid range when items change
        if (currentPage >= Math.ceil(items.length / itemsPerPage)) {
            setCurrentPage(0);
        }
    }, [items, currentPage]);

    const getContent = (index) => {
        const MAX_CONTENT = index + itemsPerPage > items.length ? items.length : index + itemsPerPage;
        return items.slice(index, MAX_CONTENT).map((item, key) => (
            <DisplayLite key={key} item={item} />
        ));
    };

    const dividePages = () => {
        const length = Math.ceil(items.length / itemsPerPage);
        const buttons = [];
        for (let i = 0; i < length; ++i) {
            const buttonSet = [];
            for (let j = 0; j < 4 && i * 4 + j < length; j++) {
                buttonSet.push(
                    <button
                        key={i * 4 + j}
                        className={styles["pagination-button"]}
                        onClick={() => setCurrentPage(i * 4 + j)}
                    >
                        {i * 4 + j + 1}
                    </button>
                );
            }
            buttons.push(<li key={i}>{buttonSet}</li>);
        }
        return buttons;
    };

    return (
        <>
            {items && (
                <div className={styles["grid-container"]}>
                    {getContent(currentPage * itemsPerPage)}
                </div>
            )}
            <ul className={styles["pagination-container"]}>{dividePages()}</ul>
        </>
    );
}
