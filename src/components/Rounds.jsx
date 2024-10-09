import React, { useState } from 'react';
const INITIAL_TIMER = { hours: 0, minutes: 0, seconds: 0, rounds: 0 };
export default function Rounds({ getRounds }) {
    const [time, setTime] = useState(INITIAL_TIMER);

    const handleInputChange = (e, valueType) => {
        let value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setTime({ ...time, [valueType]: value });
        } else {
            setTime({ ...time, [valueType]: 0 });
        }
    }

    return (
        <div className="RoundsContainer">
            <h1>Intervals</h1>
            <form className="Rounds">
                <div className="NumberInputContainer">
                    <h3>Hours</h3>
                    <div className="action">
                        <button className="btn" onClick={(e) => setTime({ ...time, 'hours': time.hours > 0 ? time.hours - 1 : 0 })}>-</button>
                        <input className="NumberInput" onChange={(e) => handleInputChange(e, 'hours')} value={time.hours} />
                        <button className="btn" onClick={(e) => setTime({ ...time, 'hours': time.hours + 1 })}>+</button>
                    </div>
                </div>
                <div className="NumberInputContainer">
                    <h3>Minutes</h3>
                    <div className="action-container">
                        <button className="btn" onClick={(e) => setTime({ ...time, 'minutes': time.minutes > 0 ? time.minutes - 1 : 0 })}>-</button>
                        <input className="NumberInput" value={Number(time.minutes)} onChange={(e) => handleInputChange(e, 'minutes')} />
                        <button className="btn" onClick={(e) => setTime({ ...time, 'minutes': time.minutes < 60 ? time.minutes + 1 : 60 })}>+</button>
                    </div>
                </div>

                <div className="NumberInputContainer">
                    <h3>Seconds</h3>
                    <div className="action-container">
                        <button className="btn" onClick={(e) => setTime({ ...time, 'seconds': time.seconds > 0 ? time.seconds - 1 : 0 })}>-</button>
                        <input className="NumberInput" onChange={(e) => handleInputChange(e, 'seconds')} value={time.seconds} />
                        <button className="btn" onClick={(e) => setTime({ ...time, 'seconds': time.seconds < 60 ? time.seconds + 1 : 60 })}>+</button>
                    </div>
                </div>

                <div className="NumberInputContainer">
                    <h3>Rounds</h3>
                    <div className="action-container">
                        <button className="btn" onClick={(e) => setTime({ ...time, 'rounds': time.rounds > 0 ? time.rounds - 1 : 0 })}>-</button>
                        <input className="NumberInput" onChange={(e) => handleInputChange(e, 'rounds')} value={time.rounds} />
                        <button className="btn" onClick={(e) => setTime({ ...time, 'rounds': time.rounds + 1 })}>+</button>
                    </div>
                </div>

                <div className="action-container">
                    <button onClick={() => setTime(INITIAL_TIMER)} className="action-container__btn--secondary">Reset</button>
                    <button onClick={() => getRounds(time)} className="action-container__btn--primary">Save</button>
                </div>
            </form>
        </div >
    )
}