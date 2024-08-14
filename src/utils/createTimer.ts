function createTimer(minutosTotales) {
  let segundosTranscurridos = 0
  const intervalo = setInterval(() => {
    segundosTranscurridos++

    const minutos = Math.floor(segundosTranscurridos / 60)
    const segundos = segundosTranscurridos % 60

    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
    console.log(tiempoFormateado) // Imprime el tiempo en la consola

    // Puedes hacer algo con el tiempo formateado aquí, como actualizar un elemento HTML
  }, 1000)

  // Para detener el temporizador:
  // clearInterval(intervalo);
}

export default createTimer
