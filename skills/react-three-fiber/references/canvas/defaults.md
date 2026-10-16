---
source: https://r3f.docs.pmnd.rs/api/canvas#defaults
---

# Defaults

What `Canvas` (via `createRoot`) creates for you by default.

## Signature / Usage

```jsx
// Default renderer constructor args, overridable through the gl prop
<Canvas gl={{ antialias: false }} />
```

## Notes

- Canvas uses [createRoot](./create-root.md) which will create a translucent `THREE.WebGLRenderer` with the following constructor args:
  - antialias=true
  - alpha=true
  - powerPreference="high-performance"
- and with the following properties:
  - outputColorSpace = THREE.SRGBColorSpace
  - toneMapping = THREE.ACESFilmicToneMapping
- It will also create the following scene internals:
  - A `THREE.Perspective` camera
  - A `THREE.Orthographic` cam if `orthographic` is true
  - A `THREE.PCFSoftShadowMap` if `shadows` is true
  - A `THREE.Scene` (into which all the JSX is rendered) and a `THREE.Raycaster`
- In recent versions of threejs, `THREE.ColorManagement.enabled` will be set to `true` to enable automatic conversion of colors according to the renderer's configured color space. R3F will handle texture color space conversion. For more on this topic, see https://threejs.org/manual/#en/color-management.
- The three.js classes named here (`WebGLRenderer`, `ColorManagement`, tone mapping, shadow maps) are covered by the threejs skill.

## Related

- [Canvas (Properties)](./canvas.md)
- [Renderers](./renderers.md)
