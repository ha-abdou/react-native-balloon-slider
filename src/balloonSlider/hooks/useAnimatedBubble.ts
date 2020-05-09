import Animated, { Value, Node, useCode, set } from "react-native-reanimated";
import { State } from "react-native-gesture-handler";
import { useState } from "react"
import follow from "../util/folow";
import { IConfigs } from "../index"

const { cond, eq, or, interpolate } = Animated;

const useAnimatedBubble = (gestureState: Value<State>, config: IConfigs) => {
  const [ active ] = useState(
    follow(
      cond(
        or(
          eq(gestureState, State.ACTIVE),
          eq(gestureState, State.BEGAN),
        ),
        1,
        0
      )
    )
  )
  const [ bubbleScale ] = useState(new Value(config.inactiveScale))
  const [ bubbleBorderRadius ] = useState(new Value(config.inactiveBorderRadius))
  const [ bubbleBorderWidth ] = useState(new Value(config.inactiveBorderWidth))

  useCode(() => [
    set(bubbleScale, interpolate(active, {
      inputRange: [ 0, 1 ],
      outputRange: [ config.inactiveScale, config.activeScale],
    })),
    set(bubbleBorderRadius, interpolate(active, {
      inputRange: [0, 1],
      outputRange: [config.inactiveBorderRadius, config.activeBorderRadius],
    })),
    set(bubbleBorderWidth, interpolate(active, {
      inputRange: [0, 1],
      outputRange: [config.inactiveBorderWidth, config.activeBorderWidth],
    }))
  ], [ config ])

  return ({
    bubbleScale,
    bubbleBorderRadius,
    bubbleBorderWidth,
    active
  })
}

export default useAnimatedBubble