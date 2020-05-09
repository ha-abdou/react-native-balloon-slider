import Animated, { Value, Easing } from "react-native-reanimated";

const { block, stopClock, cond, clockRunning, set, startClock, timing } = Animated;

export default function runTiming(clock: any, value: any, dest: any) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 200,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.back(3)),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position,
  ]);
}