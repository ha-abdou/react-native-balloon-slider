import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import useAnimatedY from "./hooks/useAnimatedY"
import useAnimatedX from "./hooks/useAnimatedX"
import useAnimatedBubble from "./hooks/useAnimatedBubble"
import Balloon from "./balloon"
import useValueHandler from "./hooks/useValueHandler"
import useStartX from "./hooks/useStartX"
import useSettings from "./hooks/useSettings"
import {
  MAIN_COLOR,
  BACKGROUND_COLOR,
  SECONDARY_COLOR,
  INACTIVE_BUBBLE_SIZE
} from "./constants"

export interface IConfigs {
  activeScale: number,
  inactiveScale: number,
  activeBorderRadius: number,
  inactiveBorderRadius: number,
  activeBorderWidth: number,
  inactiveBorderWidth: number,
}
export interface IProps {
  mainColor?: string,
  secondaryColor?: string,
  backgroundColor?: string, 
  valueRange?: [ number, number ],
  startValue?: number,
  onChange?: (value: number) => void,
  onSelect?: (value: number) => void,
  configs?: IConfigs,
}

const BalloonSlider = ({
  valueRange,
  startValue,
  onChange,
  onSelect,
  configs,
  secondaryColor,
  mainColor,
  backgroundColor,
}: IProps) => {
  const {
    velocityX,
    dragX,
    dragY,
    gestureState,
    dY,
    onGestureEvent,
    sliderWidth,
    setSliderWidth,
    range,
    _startValue,
    _configs
  } = useSettings(startValue, valueRange, configs)
  const { startX } = useStartX(sliderWidth, _startValue, range)
  const { transY } = useAnimatedY(dragY, gestureState, dY)
  const { transX } = useAnimatedX(dragX, gestureState, sliderWidth, startX)
  const {
    active,
    bubbleScale,
    bubbleBorderWidth,
    bubbleBorderRadius
  } = useAnimatedBubble(gestureState, _configs)
  const { value } = useValueHandler(
    transX,
    sliderWidth,
    range,
    gestureState,
    onChange,
    onSelect
  )

  return (<View style={[ styles.container, {
    backgroundColor: backgroundColor,
  }]}>
    <View
      style={[ styles.holder, {
        backgroundColor: backgroundColor,
      }]}
      onLayout={(event) => {
        var { width } = event.nativeEvent.layout
        setSliderWidth(width - INACTIVE_BUBBLE_SIZE)
      }}
    >  
      <PanGestureHandler
        maxPointers={1}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View>
          <Balloon
            velocityX={velocityX}
            transX={transX}
            active={active}
            text={value}
            sliderWidth={sliderWidth}
            textColor={backgroundColor}
            color={mainColor}
          />
          <Animated.View style={styles.sliderBar}>
            <Animated.View
              style={{
                height: 2,
                backgroundColor: mainColor,
                width: transX,
              }}
            />
            <Animated.View
              style={{
                height: 2,
                backgroundColor: secondaryColor,
                flex: 1,
              }}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.bubble,
              {
                backgroundColor: backgroundColor,
                borderColor: mainColor,
              },
              {
                transform: [
                  {
                    translateY: transY,
                    translateX: transX,
                    scale: bubbleScale,
                  },
                ],
                borderRadius: bubbleBorderRadius,
                borderWidth: bubbleBorderWidth,
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    padding: 10,
  },
  holder: {
    height: "100%",
    width: "100%",
  },
  bubble: {
    width: INACTIVE_BUBBLE_SIZE,
    height: INACTIVE_BUBBLE_SIZE,
  },
  sliderBar: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 15,
    transform: [{
      translateY: 15
    }]
  }
})

BalloonSlider.defaultProps = {
  mainColor: MAIN_COLOR,
  secondaryColor: SECONDARY_COLOR,
  backgroundColor: BACKGROUND_COLOR, 
}

export default BalloonSlider