import React, { useState, useEffect } from 'react'

const useTimer = (minutes: number) => {
  const [remainingTime, setRemainingTime] = useState(minutes * 60)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1)
      } else {
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [remainingTime])

  const formattedTime = formatTime(remainingTime)

  return formattedTime
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default useTimer
