// pages/battle.js

import BattleSimulator from '../components/battleSimulator';
import {useEffect} from "react"
import styles from "../styles/Style.module.css"
const BattlePage = () => {

  useEffect(() => {
    if(!localStorage.getItem('token')) {
        router.push('/login')
    }
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.cardContainerRegister}>
          <div className={styles.card}>
            
            <BattleSimulator />
            </div>
        </div>
    </div>
  );
};

export default BattlePage;
