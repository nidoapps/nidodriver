import React, { useState, useEffect, useRef } from 'react'

const useIncrementalTimer = (minutes: number) => {
  //   const [elapsedTime, setElapsedTime] = useState(0)
  //   const intervalRef = useRef<NodeJS.Timeout | null>(null) // Specify the exact type for interval ID

  //   useEffect(() => {
  //     console.log(intervalRef.current) // For debugging purposes

  //     if (!intervalRef.current) {
  //       intervalRef.current = setInterval(() => {
  //         if (elapsedTime < targetMinutes * 60) {
  //           setElapsedTime(elapsedTime + 1)
  //         } else {
  //           clearInterval(intervalRef.current)
  //           intervalRef.current = null
  //         }
  //       }, 1000)
  //     }

  //     // Cleanup function to clear interval on unmount or targetMinutes change
  //     return () => clearInterval(intervalRef.current)
  //   }, [elapsedTime, targetMinutes])

  //   const formattedTime = formatTime(elapsedTime)

  //   return formattedTime
  // }

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60)
  //   const remainingSeconds = seconds % 60
  //   return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  // }

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
