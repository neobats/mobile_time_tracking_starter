import { useState } from "react"

export const useTextInput = (
  initialState: string = ""
): [string, (text: string) => void] => {
  const [value, setValue] = useState(initialState)

  return [value, text => setValue(text)]
}
