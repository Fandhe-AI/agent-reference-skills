# timeline (animation sequences)

Sequence multiple animations by passing an array of segments to `animate()`.

## Signature / Usage

```javascript
import { animate } from "motion"

const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", { x: [-100, 0] }, { at: 1 }],
  ["nav", { rotate: 180 }, { at: "<" }],
]

animate(sequence)
```

- Each segment is a tuple `[subject, targetValues, transitionOptions]`.
- Segments run sequentially by default; `at` reschedules timing without changing order.
- A second `options` object applies global settings (e.g. `defaultTransition`, `duration`, `repeat`, `autoplay`).
- Segment subjects can be elements, motion values, objects, Three.js and vgpu targets (register effects with `animate.addEffect(threeEffect)`); a function in place of a subject runs every frame with progress `0` to `1`.
- The result is a timeline: pause, scrub and reverse it like any animation, and change it after it starts.

```javascript
const timeline = animate([
  ["ul", { opacity: 1 }]
])

timeline
  .add("list-in")
  .add(["li", { x: [-100, 0] }])
  .call(() => console.log("Done"))
```

```javascript
const highlight = [".card", { scale: 1.1 }]

timeline.add(highlight, "end")
timeline.move(highlight, "end-0.5")
timeline.remove(highlight)
```

Labels and relative label offsets:

```javascript
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  "my-label",

  // 0.5 seconds after my-label (1.5 seconds)
  ["li", { opacity: 1 }, { at: "my-label+0.5" }],

  // 0.2 seconds before my-label (0.8 seconds)
  ["a", { scale: 1.2 }, { at: "my-label-0.2" }]
]
```

Pause and play to labels:

```javascript
const timeline = animate([
  ["#step-1", { opacity: 1 }],
  "step-1",
  ["#step-2", { opacity: 1 }],
  "step-2"
], { autoplay: false })

next.addEventListener("click", () => timeline.playTo("step-2"))
back.addEventListener("click", () => timeline.playTo("step-1"))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `at` | number | Absolute start time (seconds), e.g. `{ at: 1 }` |
| `at` | string label | Start at a named label, e.g. `{ at: "my-label" }` |
| `at` | `"<"` | Start at the same time as the previous segment |
| `at` | `"+0.5"` / `"-0.2"` | Relative to the end of the previous segment |
| `at` | `"<+0.5"` / `"<-0.2"` | Relative to the start of the previous segment |
| `at` | `"my-label+0.5"` / `"my-label-0.2"` | Relative to a label |
| `duration` | number | Segment length in seconds |
| `delay` | number | Initial delay before the segment |
| `defaultTransition` | object | Shared transition for all segments (global options) |
| `autoplay` | boolean | `false` builds the timeline without playing it, for `add()` / `seek()` / `playTo()` |
| `onUpdate` / `onRepeat` / `onComplete` / `onReverseComplete` | function | Timeline events. `onUpdate` receives the time in seconds within the current repeat; `onComplete` also runs when finishing backwards unless `onReverseComplete` is set |

Timeline methods (each method that changes the timeline returns it, so calls chain):

| Name | Description |
|------|-------------|
| `add(item, at?)` | Add a segment, label or timeline. `at` replaces any `at` on the segment |
| `call(callback, at?)` | Run `callback` when the playhead crosses `at`, in either direction. Receives the direction (`1` forwards, `-1` backwards). Doesn't run when setting `time` or calling `seek()`. A callback after the end extends the duration |
| `addPause(at?, callback?)` | Pause when the playhead reaches `at`; `callback` runs when it pauses |
| `move(item, at)` | Change when a segment, label, callback or timeline starts |
| `remove(item)` | Remove an item. Values it animated go back to where they were before it |
| `clear()` | Remove everything |
| `getLabelTime(name)` | Time of a label in seconds, or `undefined` |
| `seek(position)` | Jump to a time in seconds, a label or a label offset |
| `playTo(position)` | Play forwards or backwards to a time, label or label offset, then pause |
| `reverse()` | Reverse the playback direction and play |
| `progress` | Get / set the playhead as `0` to `1` |

## Notes

- Each segment accepts all `animate()` options except `repeatDelay` and `repeatType`; both `type: "keyframes"` and `type: "spring"` work. Setting `duration` on the whole sequence stretches every segment, label and callback to fit.
- A label can be an object with its own time (`{ name: "reveal", at: 2 }`), and a nested sequence is placed with `{ sequence: intro, at: "<" }` (times inside it are relative to its start).
- Every `animate()` call returns a timeline, so segments can be added to a single animation. Timelines work with `scroll()`, and `scopeMotion()` collects the timelines created inside it (see `scope-motion.md`).
- Mutable timelines (`add` / `move` / `remove` / `call` / `addPause` / `seek` / `playTo`) and relative label offsets were added in motion 14.7.0; 14.10.1 fixed a timeline made only of nested sequences not being recognised as a timeline (CHANGELOG: https://github.com/motiondivision/motion/blob/v14.14.0/CHANGELOG.md).
- Source: https://motion.dev/docs/timeline-sequences (fetched 2026-11-14).

## Related

- [animate](./animate.md)
- [stagger](./stagger.md)
- [scopeMotion](./scope-motion.md)
