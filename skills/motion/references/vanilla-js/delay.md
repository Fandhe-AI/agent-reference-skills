# delay

`delay()` is a `setTimeout` alternative locked to Motion's animation frame loop.

## Signature / Usage

```
import { delay } from "motion"

delay(() => console.log("one second!"), 1)

const cancel = delay(callback, 0.25)

cancel() // callback will never fire
```

- First argument: callback.
- Second argument: duration in seconds. The callback fires on the next animation frame after this duration.
- Returns a function that cancels the delay.

Batching with the loop:

```
import { delay, frame } from "motion"

delay(() => {
  const { left } = element.getBoundingClientRect()

  // Will render later during this animation frame
  frame.render(() => {
    element.style.left = `${left * 2}px`
  })
}, 1)
```

## Notes

- Helps synchronise callbacks with other animations and avoids the overhead of many `setTimeout`s.
- The callback fires on the first (`read`) step of the animation loop.

## Related

- [frame](./frame.md)
- [animate](./animate.md)
