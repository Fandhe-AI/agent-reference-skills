# Sequences

Timeline-based animation controller attached to each Sheet. Controls playback, keyframe management, and real-time value observation.

## Signature / Usage

```javascript
// Basic playback
sheet.sequence.play()

// Play with options
sheet.sequence.play({
  rate: 2,
  range: [1, 4],
  iterationCount: Infinity,
  direction: 'alternate',
})

// Pause
sheet.sequence.pause()

// Read / set playhead position (seconds)
console.log(sheet.sequence.position)
sheet.sequence.position = 1

// Watch playback state via pointer
import { onChange } from '@theatre/core'
onChange(sheet.sequence.pointer.playing, (isPlaying) => {
  console.log(isPlaying ? 'playing' : 'paused')
})
```

## API

### `sequence.play(opts?)`

| Option | Type | Description |
|--------|------|-------------|
| `rate` | `number` | Playback speed multiplier (default `1`) |
| `range` | `[number, number]` | Start and end positions in seconds |
| `iterationCount` | `number` | Repeat count; use `Infinity` for looping |
| `direction` | `'normal' \| 'reverse' \| 'alternateReverse'` | Playback direction |
| `rafDriver` | `RafDriver` | Custom animation frame driver (v0.6.0+) |

Returns `Promise<boolean>` — resolves `true` on natural completion, `false` if interrupted.

### `sequence.pause()`

Halts playback without resetting position.

### `sequence.position`

Read/write `number`. Current playhead position in seconds.

### `sequence.pointer`

Provides reactive access to sequence state. Useful sub-paths:

| Path | Type | Description |
|------|------|-------------|
| `sequence.pointer.position` | `number` | Current position |
| `sequence.pointer.playing` | `boolean` | Whether sequence is playing |
| `sequence.pointer.length` | `number` | Total sequence duration |

Use with `onChange()` or `val()` from `@theatre/core`.

## Notes

- Keyframes are added/managed via the Studio Sequence Editor UI (right-click a prop → "Sequence")
- Aggregate keyframes on compound props move all child keyframes together
- `sequence.play()` returns a Promise; chain `.then()` to trigger actions after animation completes
- Use `rafDriver` option to synchronize with other libraries (e.g., `@react-three/fiber`)

## Related

- [Sheets](./sheets.md)
- [Using Audio](./audio.md)
- [Advanced Uses](./advanced.md)
