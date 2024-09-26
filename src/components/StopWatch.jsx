import React, { useState, useRef, useEffect } from 'react';
import alarmSound from '../assets/sounds/IncomingCall.mp3'

export default function StopWatch({ rounds }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (rounds) {
      let alarm = formatRounds(rounds);
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
  }, [isRunning, rounds]);

  useEffect(() => {
    const audio = new Audio(alarmSound);
    if (alarmTime !== null && time > alarmTime) {
      setIsRunning(false);
      audio.play();
      alert('Alarm!');
    }
  }, [time, alarmTime]);


  const onResetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  }

  const formatTime = (time) => {
    console.log('time', time)
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time * 60) % 60);
    const hours = Math.floor((time * 60 * 60) % 24);
    console.log('hours', hours, 'minutes', minutes, 'seconds', seconds);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatRounds = (roundsSet) => {
    const { hours, minutes, seconds } = roundsSet;
    let alarm = 0;
    if (hours > 0) {
      alarm += hours * 60 * 60;
    }
    if (minutes > 0) {
      alarm += minutes * 60;

    }
    alarm += seconds;
    return alarm;
  }
  return (
    <div className="stopWatchContainer">
      <div className="stopWatch">
        <h1 className="time">{formatTime(time)}</h1>
        <div className="action-container">
          <button className="action-container__btn--primary" onClick={() => setIsRunning(true)}>Start</button>
          <button className="btn" onClick={() => setIsRunning(false)}>Pause</button>
          <button className="action-container__btn--secondary" onClick={onResetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};
