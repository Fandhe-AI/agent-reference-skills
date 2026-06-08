# Audio Sync

Synchronize sequence playback with audio using sequence.attachAudio().

```javascript
import { getProject } from '@theatre/core'

const project = getProject('Audio Project', { state: projectState })
const sheet = project.sheet('Scene')

// Basic: attach audio from a URL, then play
sheet.sequence.attachAudio({ source: '/music.mp3' }).then(() => {
  sheet.sequence.play()
})

// Advanced: control volume via a custom Web Audio graph
sheet.sequence.attachAudio({ source: '/music.mp3' }).then((audioGraph) => {
  const { audioContext, gainNode } = audioGraph

  // Disconnect the built-in gain node and wire in a lower-volume node
  gainNode.disconnect()

  const loweredGain = audioContext.createGain()
  loweredGain.gain.setValueAtTime(0.1, audioContext.currentTime)

  gainNode.connect(loweredGain)
  loweredGain.connect(audioContext.destination)

  sheet.sequence.play()
})

// Alternative: provide a pre-decoded AudioBuffer
const audioContext = new AudioContext()
const response = await fetch('/music.mp3')
const arrayBuffer = await response.arrayBuffer()
const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

sheet.sequence.attachAudio({
  source: audioBuffer,
  audioContext,
  destinationNode: audioContext.destination,
}).then(() => {
  sheet.sequence.play()
})
```

## Notes

- `attachAudio` fetches (or decodes) the audio, sets up a Web Audio API graph, and locks playback to the sequence position
- The returned `audioGraph` object exposes `audioContext`, `gainNode`, and `destinationNode` for custom routing
- Audio playback is subject to browser autoplay policies; calling `play()` inside a user gesture avoids blocking
- Providing a pre-created `AudioContext` allows reuse of an existing audio graph (e.g., for effects chains)
