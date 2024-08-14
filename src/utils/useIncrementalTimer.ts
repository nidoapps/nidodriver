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

// export default useIncrementalTimer

const getIncrementalTimer = (minutes) => {
  const totalSeconds = minutes * 60
  let seconds = 0
  let intervalId = null

  // Función para formatear el tiempo en formato MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Iniciar el temporizador
  const start = () => {
    if (intervalId) return // Evita iniciar si ya está corriendo
    intervalId = setInterval(() => {
      seconds += 1
      if (seconds >= totalSeconds) {
        seconds = totalSeconds // Asegura que no sobrepase el tiempo total
        clearInterval(intervalId)
        intervalId = null
      }
    }, 1000)
  }

  // Detener el temporizador
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  // Obtener el tiempo transcurrido formateado
  const getElapsedTime = () => formatTime(seconds)

  return {
    start,
    stop,
    getElapsedTime,
  }
}

export default getIncrementalTimer
