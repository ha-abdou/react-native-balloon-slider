import { useState } from "react"
import {
  Node,
  call,
  Value,
  round,
  divide,
  multiply,
  eq,
  cond,
  set,
  neq,
  sub,
  useCode,
  add,
  and
} from "react-native-reanimated"
import { State } from "react-native-gesture-handler"

const useValueHandler = (
  transX: Node<number>,
  sliderWidth: number,
  range: [ number, number ],
  gestureState: Value<State>,
  onChange?: (v: number) => void,
  onSelect?: (v: number) => void,
) => {
  const [ value, setValue ] = useState(0)
  const [ newValue ] = useState(new Value(0))
  const [ oldValue ] = useState(new Value(0))
  const [ calledBack ] = useState(new Value(0))

  useCode(() => [
    set(newValue,
      cond(
        eq(sliderWidth, 0),
        0,
        round(
          // ((range[1] - range[0]) / sliderWidth) * transX + range[0]
          add(
            multiply(
              divide(
                sub(range[1], range[0]),
                sliderWidth
              ),
              transX,
            ),
            range[0]
          )
        )
      )
    ),
    cond(
      neq(newValue, oldValue),
      [
        set(oldValue, newValue),
        set(calledBack, 0),
        call([ newValue ], ([ v ]) => {
          setValue(v)
          if (onChange) {
            onChange(v)
          }
        })
      ]
    ),
    cond(
      and(
        eq(gestureState, State.END),
        eq(calledBack, 0),
      ),
      [
        set(calledBack, 1),
        call([ newValue ], ([ v ]) => {
          if (onSelect) {
            onSelect(v)
          }
        })
      ]
    )   
  ], [ sliderWidth, range ])

  return ({
    value,
  })
}

export default useValueHandler