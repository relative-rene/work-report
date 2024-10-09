import React, { useState } from 'react';
import StopWatch from '../components/StopWatch';
import Rounds from '../components/Rounds';

const Sidebar = () => {
    const [isOpen, setVisibility] = useState(false);
    const [roundsTimer, setRounds] = useState(0);
    const onSetRounds = (timer)=>{
        setRounds(timer);
    }
    return (
        <section className={isOpen ? "Sidebar" : "Sidebar--closed"}>
            {isOpen ?
                <>
                    <i onClick={() => setVisibility(false)} className="fa-solid fa-x" />
                    <h2 className="Title">Kaizen</h2>
                    <Rounds getRounds={onSetRounds}/>
                    <StopWatch rounds={roundsTimer}/>
                </> :
                <i onClick={() => setVisibility(true)} className="fa-solid fa-stopwatch" />
            }

        </section>
    )
}

export default Sidebar;