# Sequence

The timeline attached to every Sheet. It stores all keyframes for all objects in the sheet and controls playback position.

## Signature / Usage

```javascript
// Play from current position
sheet.sequence.play()

// Play from the beginning, looping indefinitely
sheet.sequence.play({ iterationCount: Infinity, range: [0, 3] })

// Attach audio to sync playback
sheet.sequence.attachAudio({ source: audioBuffer })

// Programmatically scrub to a specific time (seconds)
sheet.sequence.position = 1.5
```

## Options / Props

`sheet.sequence.play(config?)`:

| Name | Type | Description |
|------|------|-------------|
| `iterationCount` | `number` | Number of times to repeat; `Infinity` for looping |
| `range` | `[number, number]` | Start and end time in seconds |
| `rate` | `number` | Playback speed multiplier (default `1`) |
| `direction` | `'normal' \| 'reverse' \| 'alternate' \| 'alternateReverse'` | Playback direction |

## Notes

- `sheet.sequence.play()` returns a `Promise` that resolves when playback ends
- `sheet.sequence.pause()` pauses at the current position
- `sheet.sequence.position` is a readable/writable number (seconds)
- Keyframes are edited visually in Studio's Sequence Editor (Dope Sheet view)
- The **Focus Range** (`Shift`+drag in Studio) isolates a section of the timeline for editing
- Prop values between keyframes are interpolated via the **Tween Editor** (CSS-style easing curves)

## Related

- [Sheet](./sheet.md)
- [Sheet Object](./sheet-object.md)
- [Studio](./studio.md)
