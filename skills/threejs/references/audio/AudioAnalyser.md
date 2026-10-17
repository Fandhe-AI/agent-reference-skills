# AudioAnalyser

Can be used to analyse audio data.

## Signature / Usage

```js
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create an Audio source
const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(0.5);
	sound.play();
});
// create an AudioAnalyser, passing in the sound and desired fftSize
const analyser = new THREE.AudioAnalyser( sound, 32 );
// get the average frequency of the sound
const data = analyser.getAverageFrequency();

// constructor signature
// new AudioAnalyser( audio : Audio, fftSize : number )
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `audio` | Audio | The audio to analyze |
| `fftSize` | number | Window size in samples used when performing a Fast Fourier Transform (FFT) to get frequency domain data. Default `2048` |

Constructor parameters above; instance properties below.

Properties:

| Name | Type | Description |
|------|------|-------------|
| `.analyser` | AnalyserNode | The analyser node (documented upstream as "The global audio listener.") |
| `.data` | Uint8Array | Holds the analyzed data |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getAverageFrequency()` | number | Average of the frequencies returned by `getFrequencyData` |
| `getFrequencyData()` | Uint8Array | Frequency data; each item is the decibel value for a specific frequency, spread linearly from 0 to 1/2 of the sample rate (for 48000 sample rate, the last item represents 24000 Hz) |

## Notes

- Source: https://threejs.org/docs/pages/AudioAnalyser.html (three.js r186, `src/audio/AudioAnalyser.js`)

## Related

- [Audio](./Audio.md)
- [AudioListener](./AudioListener.md)
