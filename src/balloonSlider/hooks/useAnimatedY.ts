import { useState } from "react"
import Animated, { Value, Clock } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import runSpring from "../util/runSpring"
import inBounds from "../util/inBounds"

const { cond, eq, stopClock, set, divide } = Animated;

const useAnimatedY = (dragY: Value<number>, gestureState: Value<State>, dY: number) => {
  const [ y ] = useState(new Value(0))
  const [ clock ] = useState(new Clock())
  const [ transY ] = useState(
    cond(
      eq(gestureState, State.ACTIVE),
      [
        stopClock(clock),
        set(y, inBounds(divide(dragY, 8), -dY, dY)),
        y
      ],
      [
        set(
          y,
          runSpring(clock, y, 0, 0)
        )
      ]
    )
  )

  return ({
    transY
  })
}

export default useAnimatedY