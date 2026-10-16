# Controls

Abstract base class for controls. Extends `EventDispatcher`.

## Signature / Usage

```js
new Controls( object : Object3D, domElement : HTMLElement ) // (abstract)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `domElement` | HTMLElement | `null` | The HTML element used for event listeners |
| `enabled` | boolean | `true` | Whether the controls respond to user input |
| `keys` | Object | — | Defines the keyboard input of the controls |
| `mouseButtons` | Object | — | Defines which actions are assigned to the mouse buttons; supported buttons/actions depend on the implementation |
| `object` | Object3D | — | The object managed by the controls |
| `state` | number | `-1` | The internal state of the controls |
| `touches` | Object | — | Defines which actions are assigned to which touch interactions; depends on the implementation |

## Methods

- `connect(element)`: connects the controls to the DOM; has side effects since it adds the module's event listeners to the DOM.
- `disconnect()`: disconnects the controls from the DOM.
- `dispose()`: frees all internal resources and removes all event listeners.
- `update(delta)`: implemented by controls that update internal state per simulation step; `delta` is the time delta in seconds.

## Notes

- Abstract class; instantiate a concrete controls implementation instead.
- Source: https://threejs.org/docs/pages/Controls.html (three.js r186, `src/extras/Controls.js`)

## Related

- [OrbitControls](../controls/OrbitControls.md)
- [TrackballControls](../controls/TrackballControls.md)
