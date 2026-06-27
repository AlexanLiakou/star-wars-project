import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Delay time for the debounce
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear/restart the timer
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}