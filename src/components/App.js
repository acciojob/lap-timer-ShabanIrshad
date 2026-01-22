import React, { useState, useEffect, useRef } from "react";

function App() {
  // time in centiseconds
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const timerRef = useRef(null);

  // START TIMER
  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 10);
  };

  // STOP TIMER
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  // LAP TIMER
  const lapTimer = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  // RESET TIMER
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // CLEANUP (important for memory leak)
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // FORMAT TIME
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  const pad = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Lap Timer</h1>

      <h2>{formatTime(time)}</h2>

      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={lapTimer}>Lap</button>
      <button onClick={resetTimer}>Reset</button>

      <h3>Laps</h3>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
