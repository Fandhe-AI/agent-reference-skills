# Using Audio

Synchronize audio playback with a Sheet's animation timeline using `sequence.attachAudio()`. Theatre.js handles fetching, decoding, and Web Audio API context management automatically.

## Signature / Usage

```javascript
// Load audio from URL, then play in sync
sheet.sequence.attachAudio({ source: '/music.mp3' }).then(() => {
  sheet.sequence.play()
})

// Custom audio graph (pre-existing AudioContext)
const audioContext = new AudioContext()
sheet.sequence.attachAudio({
  source: audioBuffer,     // AudioBuffer
  audioContext,
  destinationNode: audioContext.destination,
})

// Modify Theatre.js's built-in gain node
sheet.sequence.attachAudio({ source: '/music.mp3' }).then(({ gainNode, audioContext }) => {
  gainNode.disconnect()
  const custom = audioContext.createGain()
  custom.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.connect(custom)
  custom.connect(audioContext.destination)
})
```

## Options / Props

`sequence.attachAudio(opts)`:

| Name | Type | Description |
|------|------|-------------|
| `source` | `string \| AudioBuffer` | Audio file URL or a pre-decoded `AudioBuffer` |
| `audioContext` | `AudioContext` | Optional existing Web Audio context |
| `destinationNode` | `AudioNode` | Optional output node (defaults to `audioContext.destination`) |

Returns `Promise` resolving to `{ audioContext, gainNode, ... }`.

## Notes

- Browsers block audio autoplay until a user gesture occurs; Theatre.js waits for the gesture automatically when using a URL source
- Best practice: show a "Play" button and call `sequence.play()` on click to ensure audio starts properly
- `gainNode` in the resolved object is Theatre.js's internal volume node — disconnect and replace it to insert custom processing

## Related

- [Sequences](./sequences.md)
- [Advanced Uses](./advanced.md)
