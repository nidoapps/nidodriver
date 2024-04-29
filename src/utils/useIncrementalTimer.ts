import React, { useState, useEffect, useRef } from 'react'

const useIncrementalTimer = (minutes: number) => {
  const [seconds, setSeconds] = useState(0)
  const totalSeconds = minutes * 60

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds >= totalSeconds - 1) {
          clearInterval(interval)
          return totalSeconds
        }
        return prevSeconds + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [totalSeconds])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return formatTime(seconds)
}

export default useIncrementalTimer
