# WebGL Compatibility Check

Detect WebGL 2 support before rendering and show a graceful error message on unsupported browsers.

## Signature / Usage

```js
import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available()) {
  animate(); // start your render loop
} else {
  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('container').appendChild(warning);
}
```

## Options / Props

| Method | Returns | Description |
|--------|---------|-------------|
| `WebGL.isWebGL2Available()` | boolean | `true` if the browser supports WebGL 2 |
| `WebGL.getWebGL2ErrorMessage()` | HTMLElement | A pre-built DOM element explaining WebGL 2 is unavailable |

## Notes

- Import the helper from `three/addons/capabilities/WebGL.js`; it is not part of the main `three` bundle.
- Perform this check before any rendering code to avoid uncaught errors on unsupported devices.

## Related

- [Installation](./installation.md)
- [Creating a scene](./creating-a-scene.md)
