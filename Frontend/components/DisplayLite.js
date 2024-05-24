import { useAtom } from 'jotai';
import { historyAtom } from '../lib/atom';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import styles from "../styles/Shop.module.css";

export default function DisplayLite({ item }) {
    const [history, addHistory] = useAtom(historyAtom);
    const router = useRouter();

    const ICON_URL = `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/`;
    const icon = `${ICON_URL}${item.name.replace(/ /g, '_')}/image`;
    const name = `${item.name}`;
    const itemID = `ID: ${item.id}`;
    const itemDesc = item.description;
    const atk = item.properties.attack;
    const def = item.properties.defense;
    const stats = `atk: ${atk} | def: ${def}`;
    const category = `category: ${item.category}`;

    const handleClick = () => {
        if (history && history.length >= 5) {
            history.shift();
        } else if (history && !history.includes(item.name)) {
            addHistory([...history, item.name]);
        }
        router.push(`/details/${item.name}`);
    };

    return (
        <div className={styles["card"]} onClick={handleClick}>
            <img src={icon} alt="Item icon" className={styles["card-image"]} />
            <div className={styles["card-content"]}>
                <b>{name}</b>
                <p>{itemID}</p>
                <p>{itemDesc}</p>
                <p><b>{category}</b></p>
                <p>{stats}</p>
                <Button variant="outline-success">Details</Button>
            </div>
        </div>
    );
}
