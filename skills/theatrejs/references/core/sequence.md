# Sequence

The animation timeline of a Sheet. Controls playback and exposes the current playhead position.

## Signature / Usage

```ts
const sequence = sheet.sequence

// Play the full sequence
await sequence.play()

// Play a sub-range at half speed
await sequence.play({ range: [0, 2], rate: 0.5, iterationCount: Infinity })

// Seek to a position
sequence.position = 1.5

// Pause
sequence.pause()
```

## Options / Props

### `sequence.play(opts?)`

Returns `Promise<void>` that resolves when playback ends (or is paused).

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `opts.range` | `[number, number]` | full length | Start and end time in seconds |
| `opts.rate` | `number` | `1` | Playback rate multiplier |
| `opts.iterationCount` | `number` | `1` | Number of times to repeat; `Infinity` for looping |
| `opts.direction` | `'normal' \| 'reverse' \| 'alternate' \| 'alternateReverse'` | `'normal'` | Playback direction |

### `sequence` properties

| Name | Type | Description |
| --- | --- | --- |
| `sequence.pause()` | `() => void` | Stops playback at current position |
| `sequence.position` | `number` | Current playhead position in seconds (readable and writable) |
| `sequence.pointer` | `Pointer<SequenceState>` | Reactive pointer to sequence state (position, playing, length) |
| `sequence.attachAudio(opts)` | `(AttachAudioOpts) => Promise<AudioGraph>` | Attaches an audio source synced to the sequence |

### `sequence.attachAudio(opts)` options

| Name | Type | Description |
| --- | --- | --- |
| `opts.source` | `string \| AudioBuffer` | Audio URL or decoded `AudioBuffer` |
| `opts.audioContext` | `AudioContext` | Optional custom Web Audio `AudioContext` |
| `opts.destinationNode` | `AudioNode` | Optional destination node for audio routing |

`attachAudio()` returns `Promise<{ audioContext, gainNode, destinationNode }>`.

## Notes

- Setting `sequence.position` directly seeks the playhead without triggering playback
- `attachAudio()` automatically handles browser autoplay restrictions by waiting for a user gesture
- `sequence.__experimental_getKeyframes(pointer)` returns the keyframe array for a given prop pointer (v0.6.1+, unstable API)

## Related

- [Sheet](./sheet.md)
- [Object](./object.md)
