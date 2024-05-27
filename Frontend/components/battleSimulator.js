import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { addATK, addDEF } from '../lib/atom';


const BattleSimulator = () => {
  const [atkItems, plusATK] = useAtom(addATK);
  const [defItems, plusDEF] = useAtom(addDEF);

  const [battleMessage, setBattleMessage] = useState('');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const router = useRouter();
  const attack = () => {
    const playerAttack = Math.floor(Math.random() * 10) + 1 + atkItems;
    const monsterAttack = Math.floor(Math.random() * 10) + 1;
    
    

    if (playerAttack > monsterAttack) {
      const damage = playerAttack;
      if(monsterHealth - damage <= 0)
      {
        setMonsterHealth(0);
        setBattleMessage('You have defeated the monster!');
        setIsBattleOver(true);
      }
      else {
        setMonsterHealth(monsterHealth - damage);
        setBattleMessage(`You dealt ${damage} damage to the monster.`);
      }
      
    } else {
      const damage = monsterAttack
      if(playerHealth - damage <= 0)
      {
        setPlayerHealth(0)
        setBattleMessage('You have been defeated!');
        setIsBattleOver(true);
        console.log("This appears0")

      } else {
        setPlayerHealth(playerHealth - damage);
        setBattleMessage(`The monster dealt ${damage} damage to you.`);
      }
    }

    

      console.log("This ends")
  };

  const defend = () => {
    const playerDefense = Math.floor(Math.random() * 10) + 1 + defItems;
    const monsterAttack = Math.floor(Math.random() * 10) + 1;

    if (monsterAttack > playerDefense) {
      const damage = monsterAttack - playerDefense;
      const playerDamage = playerHealth - damage <= 0 ? 0 : playerHealth - damage;
      setPlayerHealth(playerDamage);
      setBattleMessage(`The monster dealt ${damage} damage to you.`);
    } else {
      setBattleMessage(`You defended against the monster's attack.`);
    }

    checkBattleStatus();
  };

  const checkBattleStatus = () => {
    if (playerHealth <= 0) {
      setBattleMessage('You have been defeated!');
      setIsBattleOver(true);
    } else if (monsterHealth <= 0) {
      setBattleMessage('You have defeated the monster!');
      setIsBattleOver(true);
    }
  };

  const restartBattle = () => {
    setBattleMessage('');
    setPlayerHealth(100);
    setMonsterHealth(100);
    setIsBattleOver(false);
  };

  const goBack = () => {
    router.push('/worldPage')
  }
  return (
    <div>
      <h1>Battle Simulator</h1>
      <div>
        <h2>Player HP: {playerHealth}</h2>
        <h2>Monster HP: {monsterHealth}</h2>
      </div>
      <button onClick={attack} disabled={isBattleOver}>Attack</button>
      <button onClick={defend} disabled={isBattleOver}>Defend</button>
      <p>{battleMessage}</p>
      {isBattleOver && <button onClick={restartBattle}>Restart Battle</button>}
      {isBattleOver && <button onClick={goBack}>Go back</button>}
    </div>
  );
};

export default BattleSimulator;
