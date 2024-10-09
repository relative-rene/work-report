import React, { useState, useRef, useEffect } from 'react';
import alarmSound from '../assets/sounds/Tada.mp3'

export default function StopWatch({ timer }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmTime, setAlarmTime] = useState([]);
  const timerRef = useRef(null);
  const audio = new Audio(alarmSound);


  useEffect(() => {
    if (timer) {
      let alarm = formatRounds(timer);
      setAlarmTime(alarm);
    }
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timer]);

  useEffect(() => {
      if (alarmTime.length && time > alarmTime[0]) {
        alarmTime.shift();
        setAlarmTime(alarmTime);
        timer.rounds--;
        audio.play();
    }
  }, [time, alarmTime]);


  const onResetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  }

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time/ 60));
    const hours = Math.floor((time * 60 * 60) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatRounds = (roundsSet) => {
    let { hours, minutes, seconds, rounds } = roundsSet;
    let interval = 0;
    if (hours > 0) interval += hours * 60 * 60;
    if (minutes > 0) interval += minutes * 60;
    interval += seconds;

    let alarms = [];
    let totalTime = 0;
    while (rounds) {
      rounds--;
      totalTime += interval;
      alarms.push(totalTime);
    }
    return alarms;
  }

  return (
    <div className="stopWatchContainer">
      <div className="stopWatch">
        <h1>Buzzer at {alarmTime.length?alarmTime[0]: 0} seconds</h1>
        <h1>{timer.rounds ? timer.rounds : 0} Buzzes remaining</h1>
        <h1 className="time">{formatTime(time)}</h1>
        <div className="action-container">
          <button className="action-container__btn--secondary" onClick={onResetTimer}>Reset</button>
          <button className="btn" onClick={() => setIsRunning(false)}>Pause</button>
          <button className="action-container__btn--primary" onClick={() => setIsRunning(true)}>Start</button>
        </div>
      </div>
    </div>
  );
};
