import Animated, { Value} from "react-native-reanimated";

const { block, cond, spring, clockRunning, startClock, Clock } = Animated

export default function follow(value: any): any {
  const config = {
    damping: 28,
    mass: 0.3,
    stiffness: 188.296,
    overshootClamping: false,
    toValue: value,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  const clock = new Clock();

  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  return block([
    cond(clockRunning(clock), 0, startClock(clock)),
    spring(clock, state, config),
    state.position,
  ]);
}