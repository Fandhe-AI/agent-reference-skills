---
source: https://reactnative.dev/docs/0.87/timers
---

# Timers

Timers are an important part of an application and React Native implements the [browser timers](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals).

## Signature / Usage

The timer functions available (original list):

```text
setTimeout and clearTimeout
setInterval and clearInterval
setImmediate and clearImmediate
requestAnimationFrame and cancelAnimationFrame
```

`requestAnimationFrame(fn)` is not the same as `setTimeout(fn, 0)` - the former will fire after all the frames have flushed, whereas the latter will fire as quickly as possible (over 1000x per second on an iPhone 5S).

`setImmediate` is executed at the end of the current JavaScript execution block, right before sending the batched response back to native. Note that if you call `setImmediate` within a `setImmediate` callback, it will be executed right away, it won't yield back to native in between.

The `Promise` implementation uses `setImmediate` as its asynchronicity implementation.

## Notes

- When debugging on Android, if the times between the debugger and device have drifted; things such as animation, event behavior, etc., might not work properly or the results may not be accurate. Please correct this by running the following on your debugger machine. Root access is required for the use in real device.

```text
adb shell "date `date +%m%d%H%M%Y.%S%3N`"
```

## Related

- [javascript-environment.md](./javascript-environment.md)
