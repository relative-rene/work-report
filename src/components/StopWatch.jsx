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
      if(alarm) setAlarmTime(alarm);
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
    if (alarmTime.length && time >= alarmTime[0] && isRunning) {
      alarmTime.shift();
      setAlarmTime(alarmTime);
      timer.rounds = timer.rounds === 0 ? 0 : timer.rounds - 1
      audio.play();
    }
  }, [time, alarmTime]);


  const onResetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    formatTime(0);
    formatBuzzer(0)
  }

  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60));
    const hours = Math.floor((time * 60 * 60) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatRounds = (roundsSet) => {
    let { hours, minutes, seconds, rounds } = roundsSet;
    if (hours == 0 && minutes == 0 && seconds === 0 && rounds == 0) return null;
      let interval = 0;
    if (hours > 0) interval += hours * 60 * 60;
    if (minutes > 0) interval += minutes * 60;
    interval += seconds;

    let alarms = [];
    let totalTime = 0;
    if (rounds === 0) {
      for (let count = 0; count <= 100; count++) {
        totalTime += interval;
        alarms.push(totalTime);
      }
    }
    return alarms;
  }

  const formatBuzzer = (alarm) => {
    let seconds = alarm % 60;
    let minutes = (alarm / 60) >= 60 ? Math.floor((alarm / 60)) % 60 : Math.floor(alarm / 60);
    let hourCalc = Math.floor((alarm / 60) / 60);
    let hours;
    let displayTime = '';

    if (hourCalc >= 1) {
      if (hourCalc >= 24) {
        hours = '24+';
      } else {
        hours = Math.floor((alarm / 60) / 60);
      }
      displayTime += hours > 1 || typeof hours === 'string' ? `${hours} hours ` : `${hours} hour `
    }

    if (minutes > 0) {
      displayTime += minutes > 1 ? `${minutes} minutes ` : `${minutes} minute `;
    }
    if (seconds > 0) {
      displayTime += seconds > 1 ? `${Math.floor(seconds)} seconds` : `${Math.floor(seconds)} seconds`;
    }
    return displayTime;
  }

  return (
    <div className="stopWatchContainer">
      <div className="stopWatch">
        <h1>Buzzer at {formatBuzzer(alarmTime[0])}</h1>
        <h1>{timer.rounds ? timer.rounds : ' Infinite'} Buzzes remaining</h1>
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
