# AudioListener

Represents a virtual listener of all positional and non-positional audio effects in the scene. Inherits EventDispatcher → Object3D.

## Signature / Usage

```js
const listener = new THREE.AudioListener();
camera.add( listener );
```

Constructor: `new AudioListener()`

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.context` | AudioContext (readonly) | The native audio context |
| `.filter` | AudioNode (readonly) | Optional filter, defined via `setFilter`. Default `null` |
| `.gain` | GainNode (readonly) | Gain node used for volume control |
| `.timeDelta` | number (readonly) | Time delta values required for `linearRampToValueAtTime()` usage. Default `0` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getFilter()` | AudioNode | Current set filter |
| `getInput()` | GainNode | Listener's input node; used by other audio nodes to connect to this listener |
| `getMasterVolume()` | number | The application's master volume |
| `removeFilter()` | AudioListener | Removes the current filter |
| `setFilter( value : AudioNode )` | AudioListener | Sets the given filter |
| `setMasterVolume( value : number )` | AudioListener | Sets the master volume; affects all audio nodes in the scene |

## Notes

- A three.js application usually creates a single listener. It is a mandatory constructor parameter for `Audio` and `PositionalAudio`.
- In most cases the listener is a child of the camera, so the camera's 3D transformation represents the listener's.
- Source: https://threejs.org/docs/pages/AudioListener.html (three.js r186, `src/audio/AudioListener.js`)

## Related

- [Audio](./Audio.md)
- [PositionalAudio](./PositionalAudio.md)
- [AudioContext](./AudioContext.md)
