import { TimerContext } from '@/context/timerContext'
import { useContext, useEffect } from 'react'

export const TimerDisplay = () => {
  const { timer, setTimer, isActive, setIsActive, setActiveFunctionality } =
    useContext(TimerContext)

  useEffect(() => {
    let countdownInterval: any

    if (isActive && timer > 0) {
      countdownInterval = setInterval(() => {
        setTimer((previousTime: number) => previousTime - 1)
      }, 1000)
    }

    if (timer === 0 && isActive) {
      const timeEnd = new Audio('/sounds/notification.mp3')
      timeEnd.play()
      setIsActive(false)
      setActiveFunctionality('none')
    }

    return () => {
      clearInterval(countdownInterval)
    }
  }, [isActive, timer, setIsActive, setTimer, setActiveFunctionality])

  const minutesRemaining = Math.floor(timer / 60)
  const secondsRemaining = timer - minutesRemaining * 60

  return (
    <p className="text-display_small text-smoke md:text-display_large">
      {minutesRemaining.toString().padStart(2, '0')}:
      {secondsRemaining.toString().padStart(2, '0')}
    </p>
  )
}
