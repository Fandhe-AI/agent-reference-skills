# Audio

Represents a non-positional ( global ) audio object. Inherits EventDispatcher → Object3D. Uses the Web Audio API.

## Signature / Usage

```js
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create a global audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});
```

Constructor: `new Audio( listener : AudioListener )` — the global audio listener.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `.autoplay` | boolean | Whether to start playback automatically. Default `false` |
| `.buffer` | AudioBuffer (readonly) | Reference to the audio buffer, defined via `setBuffer`. Default `null` |
| `.context` | AudioContext (readonly) | The audio context |
| `.detune` | number (readonly) | Pitch modification in cents (+/- 100 is a semitone, +/- 1200 an octave); defined via `setDetune`. Default `0` |
| `.duration` | undefined \| number | Overrides the default duration of the audio. Default `undefined` |
| `.filters` | Array.\<AudioNode\> (readonly) | Low-order filters (e.g. `BiquadFilterNode`); set by `setFilters` |
| `.gain` | GainNode (readonly) | Gain node used for volume control |
| `.hasPlaybackControl` | boolean (readonly) | Whether playback can be controlled with `play` / `pause`; set automatically when sources are defined. Default `true` |
| `.isPlaying` | boolean (readonly) | Set when using `play` / `pause` / `stop`. Default `false` |
| `.listener` | AudioListener (readonly) | The global audio listener |
| `.loop` | boolean (readonly) | Whether the audio loops; defined via `setLoop`. Default `false` |
| `.loopEnd` | number | Where in the buffer replay should stop, in seconds. Default `0` |
| `.loopStart` | number | Where in the buffer replay should start, in seconds. Default `0` |
| `.offset` | number | Offset into the buffer where playback begins, in seconds. Default `0` |
| `.playbackRate` | number (readonly) | Playback speed; defined via `setPlaybackRate`. Default `1` |
| `.source` | AudioNode (readonly) | Current audio source, set by the `set*()` source methods. Default `null` |
| `.sourceType` | 'empty' \| 'audioNode' \| 'mediaNode' \| 'mediaStreamNode' \| 'buffer' (readonly) | Source type, set by the `set*()` source methods. Default `'empty'` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `connect()` | Audio | Connects to the audio source. Used internally on initialisation and when setting / removing filters |
| `disconnect()` | Audio \| undefined | Disconnects from the audio source. Used internally |
| `getDetune()` | number | Detuning of oscillation in cents |
| `getFilter()` | AudioNode \| undefined | First filter in the list of filters |
| `getFilters()` | Array.\<AudioNode\> | Current set filters |
| `getLoop()` | boolean | Loop flag. Only with sources that allow playback control |
| `getOutput()` | GainNode | Output audio node |
| `getPlaybackRate()` | number | Current playback rate |
| `getVolume()` | number | Volume |
| `onEnded()` | — | Automatically called when playback finished |
| `pause()` | Audio \| undefined | Pauses playback. Only with sources that allow playback control |
| `play( delay : number )` | Audio \| undefined | Starts playback; `delay` in seconds (default `0`). Only with sources that allow playback control |
| `setBuffer( audioBuffer : AudioBuffer )` | Audio | Sets the buffer as source; `sourceType` becomes `buffer`, `hasPlaybackControl` becomes `true` |
| `setDetune( value : number )` | Audio | Detuning in cents |
| `setFilter( filter : AudioNode )` | Audio | Applies a single filter node |
| `setFilters( value : Array.<AudioNode> )` | Audio | Sets an array of filters and connects them with the source |
| `setLoop( value : boolean )` | Audio \| undefined | Sets the loop flag. Only with sources that allow playback control |
| `setLoopEnd( value : number )` | Audio | Loop end in seconds |
| `setLoopStart( value : number )` | Audio | Loop start in seconds |
| `setMediaElementSource( mediaElement : HTMLMediaElement )` | Audio | `sourceType` becomes `mediaNode`, `hasPlaybackControl` becomes `false` |
| `setMediaStreamSource( mediaStream : MediaStream )` | Audio | `sourceType` becomes `mediaStreamNode`, `hasPlaybackControl` becomes `false` |
| `setNodeSource( audioNode : AudioNode )` | Audio | e.g. an `OscillatorNode`; `sourceType` becomes `audioNode`, `hasPlaybackControl` becomes `false` |
| `setPlaybackRate( value : number )` | Audio \| undefined | Sets the playback rate. Only with sources that allow playback control |
| `setVolume( value : number )` | Audio | Sets the volume |
| `stop( delay : number )` | Audio \| undefined | Stops playback; `delay` in seconds (default `0`). Only with sources that allow playback control |

## Notes

- `play`, `pause`, `stop`, `setLoop`, `setPlaybackRate` and `getLoop` only work with sources that allow playback control (`hasPlaybackControl`); media element, media stream and audio node sources set it to `false`.
- Source: https://threejs.org/docs/pages/Audio.html (three.js r186, `src/audio/Audio.js`)

## Related

- [AudioListener](./AudioListener.md)
- [PositionalAudio](./PositionalAudio.md)
- [AudioAnalyser](./AudioAnalyser.md)
- [AudioContext](./AudioContext.md)
- [AudioLoader](../loaders/AudioLoader.md)
