import { useState, useLayoutEffect } from "react"

const useStartX = (
  sliderWidth: number,
  startValue: number,
  range: [ number, number ]
): { startX: number } => {
  const [ startX, setStartX ] = useState(0)

  useLayoutEffect(() => {
    if (sliderWidth === 0 || range[1] === 0) {
      return startX !== 0 ? setStartX(0) : undefined
    }
    if (startValue > range[1] || startValue < range[0]) {
      return startX !== range[1] ? setStartX(range[1]) : setStartX(range[0])
    }
    setStartX(Math.abs((sliderWidth / (range[1] - range[0])) * (startValue - range[0])))
  }, [ startValue, range, sliderWidth ])

  return ({
    startX,
  })
}

export default useStartX