// Found at https://usehooks-typescript.com/react-hook/use-interval
// Modified from Dan Abramov's useInterval hook.
import { useEffect, useRef } from "react"

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void | null>()

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const tick = () => {
      // we may not have a callback to.. erm... call
      if (typeof savedCallback?.current !== "undefined") {
        savedCallback?.current()
      }
    }

    // 0 is a falsy value, but a valid delay number, so we have to check this way
    if (delay !== null) {
      const someInterval = setInterval(tick, delay)
      return () => clearInterval(someInterval)
    }
  }, [delay])
}
