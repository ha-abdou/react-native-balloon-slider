import { useState } from "react"
import Animated, { Value, neq, useCode, multiply, divide } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import inBounds from "../util/inBounds"
import follow from "../util/folow";

const { add, cond, eq, set } = Animated;

const useAnimatedX = (
  dragX: Value<number>,
  gestureState: Value<State>,
  sliderWidth: number,
  startX: number,
) => {
  const [ offsetX ] = useState(new Value(startX))
  const [ _startX ] = useState(new Value(startX))
  const [ f ] = useState(new Value(0))
  const [ transX ] = useState(new Value(0))
  const [ oldWidth ] = useState(new Value(sliderWidth))
  
  useCode(() => {
    return ([
      cond(
        eq(sliderWidth, 0),
        set(transX, 0),
        cond(
          neq(oldWidth, 0),
          cond(
            neq(oldWidth, sliderWidth),
            [
              set(transX, multiply(transX, divide(sliderWidth, oldWidth))),
              set(offsetX, transX),
            ]
          )
        )
      ),
      set(offsetX, inBounds(offsetX, 0, sliderWidth)),
      set(oldWidth, sliderWidth)
    ])
  }, [ sliderWidth ])

  useCode(() => [
    set(transX,
      cond(
        neq(_startX, startX),
        [
          set(_startX, follow(startX)),
          set(offsetX, _startX),
        ],
        cond(
          eq(gestureState, State.ACTIVE),
          [
            set(f, 0),
            inBounds(add(offsetX, dragX), 0, sliderWidth),
          ],
          cond(eq(f, 0),
            [
              set(f, 1),
              set(offsetX, inBounds(add(offsetX, dragX), 0, sliderWidth)),
            ],
            offsetX
          ),
        )
      )
    )
  ], [ sliderWidth, startX ])

  return ({
    transX
  })
}

export default useAnimatedX