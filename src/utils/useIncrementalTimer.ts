import React, { useState, useEffect, useRef } from 'react'

const useIncrementalTimer = (minutes: number) => {
  const [seconds, setSeconds] = useState(0)
  const totalSeconds = minutes * 60

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
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

// const getIncrementalTimer = (minutes) => {
//   const totalSeconds = minutes * 60
//   let seconds = 0
//   let intervalId

//   const startTimer = () => {
//     intervalId = setInterval(() => {
//       seconds++
//     }, 1000)
//   }

//   const stopTimer = () => {
//     clearInterval(intervalId)
//   }

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60)
//     const remainingSeconds = seconds % 60
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
//   }

//   // Iniciar el timer cuando se llame a la función
//   startTimer()

//   return formatTime(seconds)
// }

// export default getIncrementalTimer
