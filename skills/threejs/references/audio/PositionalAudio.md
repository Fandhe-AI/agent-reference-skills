# PositionalAudio

Represents a positional audio object. Inherits EventDispatcher → Object3D → Audio.

## Signature / Usage

```js
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );
// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/song.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
});
// create an object for the sound to play from
const sphere = new THREE.SphereGeometry( 20, 32, 16 );
const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
const mesh = new THREE.Mesh( sphere, material );
scene.add( mesh );
// finally add the sound to the mesh
mesh.add( sound );
```

Constructor: `new PositionalAudio( listener : AudioListener )` — the global audio listener.

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.panner` | PannerNode (readonly) | Represents the location, direction, and behavior of an audio source in 3D space |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getDistanceModel()` | 'linear' \| 'inverse' \| 'exponential' | Current distance model |
| `getMaxDistance()` | number | Current max distance |
| `getRefDistance()` | number | Current reference distance |
| `getRolloffFactor()` | number | Current rolloff factor |
| `setDirectionalCone( coneInnerAngle, coneOuterAngle, coneOuterGain )` | PositionalAudio | Sets the directional cone in which the audio can be listened. `coneInnerAngle`: angle in degrees of a cone inside of which there is no volume reduction. `coneOuterAngle`: angle in degrees of a cone outside of which volume is reduced by a constant value defined by `coneOuterGain`. `coneOuterGain`: volume reduction outside the outer cone; `0` means no sound can be heard |
| `setDistanceModel( value )` | PositionalAudio | Algorithm used to reduce volume with distance: `'linear'`, `'inverse'` or `'exponential'` |
| `setMaxDistance( value : number )` | PositionalAudio | Maximum distance after which volume is not reduced any further |
| `setRefDistance( value : number )` | PositionalAudio | Distance at which volume reduction starts taking effect |
| `setRolloffFactor( value : number )` | PositionalAudio | How quickly the volume is reduced as the source moves away from the listener |

## Notes

- `setMaxDistance` is used only by the `linear` distance model.
- Inherits all `Audio` properties and methods.
- Distance model details: https://www.w3.org/TR/webaudio-1.1/#enumdef-distancemodeltype
- Source: `src/audio/PositionalAudio.js`.

## Related

- [Audio](./Audio.md)
- [AudioListener](./AudioListener.md)
- [AudioLoader](../loaders/AudioLoader.md)
