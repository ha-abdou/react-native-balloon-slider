import React, { useState, memo } from "react"
import { StyleSheet } from "react-native"
import Svg, { Path, Text } from 'react-native-svg';
import Animated, {
  Extrapolate,
  concat,
  set,
  lessThan,
  Value,
  cond,
  interpolate,
  add,
  eq,
  or,
  useCode,
} from "react-native-reanimated";
import follow from "./util/folow";
import { MAIN_COLOR, BACKGROUND_COLOR } from "./constants";

interface IProps {
  text: string | number,
  sliderWidth: number,
  active: Value<number>,
  transX: Value<number>,
  velocityX: Value<number>,
  color?: string,
  textColor?: string,
}

const Balloon = ({
  text,
  color,
  textColor,
  active,
  transX,
  velocityX,
  sliderWidth
}: IProps) => {
  const [ x ] = useState(follow(add(-7.5, transX)))
  const [ transY ] = useState((interpolate(active, {
    inputRange: [0, 0.1, 0.3, 0.5, 1],
    outputRange: [1000, 400, 100, 50, 0],
    extrapolateLeft: Extrapolate.CLAMP,
  })))
  const [ scale ] = useState(interpolate(active, {
    inputRange: [0, 1],
    outputRange: [0.01, 1],
    extrapolateLeft: Extrapolate.CLAMP,
  }))
  const [ rotate ] = useState(new Value(0))

  useCode(() => [
    set(
      rotate,
      cond(
        or(
          eq(transX, 0),
          eq(transX, sliderWidth),
        ),
        0,
        cond(
          lessThan(active, 0.2),
          [
            set(velocityX, 0),
            0
          ],
          follow(
            interpolate(velocityX, {
              inputRange: [-500, 500],
              outputRange: [30, -30],
              extrapolate: Extrapolate.CLAMP,
            })
          )
        )
      )
    ),
  ], [ sliderWidth ])

  return (<Animated.View style={[ styles.container , {
    transform: [
      {
        translateX: x,
        scale,
        translateY: transY,
        rotate: concat(rotate, "deg")
      }
    ],
    }]}
  >
    <Svg height={75} width={45} viewBox="173 11 240 290">
      <Path
        fillRule="evenodd"
        fill={color}
        transform="translate(15,1)"
        d="m265.75946,270.099976c1.608337,5.053345 -0.203583,10.424377 -2.653503,14.883118c-0.934448,2.080109 -2.501831,3.742493 -3.756104,5.611816c-0.936432,1.366974 -1.465454,3.757477 0.449432,4.563751c1.39151,0.506866 2.939453,0.41922 4.410797,0.411621c3.905914,-0.251343 7.878052,-2.07431 11.762817,-0.73587c3.055084,1.349976 6.041046,3.38324 9.532654,3.142822c2.283325,-0.025696 3.590515,-2.728638 2.15213,-4.528412c-1.290039,-2.134033 -3.230743,-3.904663 -3.854401,-6.404663c-2.152405,-5.636139 -1.59729,-11.871338 -0.177216,-17.610382c0.213409,-2.315796 -2.598999,-3.593262 -4.536407,-2.819794c-3.999359,1.0401 -7.367767,4.381897 -11.732361,3.914093c-0.549103,-0.066772 -1.089966,-0.208008 -1.597839,-0.428101z" />
      <Path
        fillRule="evenodd"
        fill={color}
        d="m405.79361,145.878708c0.021576,-72.885864 -50.798187,-131.984848 -113.495056,-131.984848c-62.696899,0 -113.516708,59.099007 -113.495056,131.984863c-0.021637,72.885864 50.798157,131.984863 113.495056,131.984863c62.696869,0 113.516663,-59.09903 113.495056,-131.984909l0,0.000031z"
      />
      <Text
        fill={textColor}
        fontSize="100"
        fontWeight="bold"
        x="292"
        y="160"
        textAnchor="middle"
      >
        {text}
      </Text>
    </Svg>
  </Animated.View>)
}

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 75,
  }
})

Balloon.defaultProps = {
  color: MAIN_COLOR,
  textColor: BACKGROUND_COLOR,
}

const MemoBalloon = memo(Balloon)
export default MemoBalloon