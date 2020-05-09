import { useState, useLayoutEffect } from "react"
import { Value, event } from "react-native-reanimated"
import { IConfigs } from "../index"

const defaultConfig = {
  activeScale: 1.33334,
  inactiveScale: 1,
  activeBorderRadius: 20,
  inactiveBorderRadius: 10,
  activeBorderWidth: 1,
  inactiveBorderWidth: 9,
}

const useSettings = (
  startValue?: number,
  valueRange?: [ number, number ],
  configs?: IConfigs
) => {
  const [ velocityX ] = useState(new Value(0))
  const [ dragY ] = useState(new Value(0))
  const [ dragX ] = useState(new Value(0))
  const [ gestureState ] = useState(new Value(0))
  const [ sliderWidth, setSliderWidth ] = useState(0)
  // tofix remove any
  const [ onGestureEvent ] = useState<any>(event([
    {
      nativeEvent: {
        translationY: dragY,
        translationX: dragX,
        velocityX: velocityX,
        state: gestureState,
      },
    },
  ]))
  const [ _startValue, setStartValue ] = useState(startValue || 0)
  const [ range, setRange ] =
    useState<[ number, number ]>(valueRange || [ 0, sliderWidth ])

  useLayoutEffect(() => {
    setStartValue(startValue || 0)
    setRange(valueRange || [ 0, sliderWidth ])
  }, [ startValue, valueRange, sliderWidth ])

  return ({
    velocityX,
    dragX,
    dragY,
    gestureState,
    dY: 10,
    sliderWidth,
    setSliderWidth,
    onGestureEvent,
    _startValue,
    range,
    _configs: {
      ...defaultConfig,
      ...configs
    }
  })
}

export default useSettings