import { useRouter } from 'next/router';
import { useState } from "react"
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { favouritesAtom } from '../lib/atom';
import {moneyAtom} from "../lib/atom"
import {useAtom} from "jotai"
import { addATK, addDEF } from '../lib/atom';
import styles from "../styles/Shop.module.css";

export default function DisplayPro({item}) {

    const [atkItems, plusATK] = useAtom(addATK);
    const [defItems, plusDEF] = useAtom(addDEF);

    const router = useRouter();
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [fav, setFav] = useAtom(favouritesAtom)
    const [money, setMoney] = useAtom(moneyAtom)


    const ICON_URL = `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/`;
    const icon = `${ICON_URL}${item.name.replace(/ /g, '_')}/image`;
    const name = `${item.name}`;
    const itemID = `ID: ${item.id}`;
    const itemDesc = item.description;
    const atk = item.properties.attack;
    const def = item.properties.defense;
    const stats = `atk: ${atk} | def: ${def}`;
    const category = `category: ${item.category}`;
    const cost = atk == null && def == null ? 2 : (atk + def) / 2;

    const handleBuy = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/buyItem`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the JWT token in the headers
                    },
                    body: JSON.stringify({ item: item, cost: cost }),
            });
            if(res.ok) {
                plusATK(atkItems + atk);
                plusDEF(defItems + def);
                setMoney(money - cost);
                setDisabled(true);
            } else {
                alert('not enough funds to buy this')
            }
        } catch {
            alert('not enough funds to buy this')
        }
    }

    const handleWishlist = async () => {
        setChecked(!checked)
        try {
            const token = localStorage.getItem('token');
            if(!fav.includes(item.id)) {
                setFav((prevFav) => [...prevFav, item.id]);
                //we want to remove
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/addFav`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Include the JWT token in the headers
                        },
                        body: JSON.stringify({ wishlist: item }),
                    });
            } else {
                //we want to add
                setFav((prevFav) => prevFav.filter((curr) => curr !== item.id));
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/updateFavorites`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Include the JWT token in the headers
                        },
                        body: JSON.stringify({ pendingChanges: item }),
                    });
            }
        } catch (e) {
            console.log('err updating wishlist... ', e)
        }
    }

    return (
        <div className={styles["cardLone"]}>
            <img src={icon} alt="Item icon" className={styles["card-image"]} />
            <div className={styles["card-content"]}>
                <b>{name}</b><br /> <br /> 
                {itemID}
                <br />
                {itemDesc} <br />
                {stats} <br />
                <b style={{color: "red", fontSize:"20px"}}>cost: ${cost}</b> <br /> <br />
                <Button 
                variant="outline-danger" 
                onClick={() => router.back()} 
                style={{marginRight: '20px'}}
                >Back</Button>
                
                <ToggleButton 
                    id='toggle-check'
                    type='checkbox'
                    variant='outline-primary'
                    value='1'
                    checked={checked}
                    onClick={handleWishlist}
                    style={{marginRight: '20px'}}
                >   {fav.includes(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </ToggleButton>
                
                <Button 
                    variant="outline-success" 
                    onClick={handleBuy}
                    disabled={disabled}
                >Buy Item</Button>
            </div>
        </div>

    )
}