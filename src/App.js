import React, {useEffect, useRef, useState} from 'react';
import './App.css';

const padTime = (time) => {
    return time.toString().padStart(2, '0')
}

function App() {

    const [timeLeft, setTimeLeft] = useState(15 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    const startTimer = () => {
        if (intervalRef.current !== null) return
        setIsRunning(true)
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (timeLeft >= 1) return prev - 1

                resetTimer()
                return 0
            })
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current === null) return
        setIsRunning(false)
        clearInterval(intervalRef.current)
        intervalRef.current = null
    }

    const resetTimer = () => {
        setTimeLeft(15 * 60)
        clearInterval(intervalRef.current)
        setIsRunning(false)
        intervalRef.current = null
    }

    const minutes = padTime(Math.floor(timeLeft / 60))
    const seconds = padTime(timeLeft - minutes * 60)

    useEffect(() => {
        document.title = `${minutes} : ${seconds}`
    }, [minutes, seconds])

    return (
        <div className="app">
            <div className="main">
                <div className="timer">
                    <span>{minutes}</span>
                    <span>:</span>
                    <span>{seconds}</span>
                </div>

                <div className="buttons">
                    {isRunning ?
                        <button onClick={stopTimer}>Stop</button> :
                        <button onClick={startTimer}>Start</button>
                    }
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>

        </div>
    );
}

export default App;
