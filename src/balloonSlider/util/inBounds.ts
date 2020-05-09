import Animated from "react-native-reanimated";

const { proc, cond, lessThan, greaterThan } = Animated

const inBounds = proc((x: any, minX: any, maxX: any) =>
  cond(lessThan(x, minX),
    minX,
    cond(greaterThan(x, maxX),
      maxX,
      x
    )
)
)
export default inBounds