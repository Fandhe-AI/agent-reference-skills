---
source: https://r3f.docs.pmnd.rs/api/canvas#renderers
---

# Renderers / Custom renderers / Ownership

Canvas creates a `THREE.WebGLRenderer` by default. Use the `gl` prop to configure it or supply your own renderer. These options also apply to [createRoot](./create-root.md) through `root.configure({ gl })`.

## Signature / Usage

To configure the default renderer, pass an object with renderer constructor options or properties:

```jsx
<Canvas gl={{ antialias: false }} />
```

### Custom renderers

Pass a factory function to create a custom renderer. R3F passes it the default constructor options, including the canvas:

```jsx
<Canvas gl={(defaults) => new WebGLRenderer({ ...defaults, antialias: false })} />
```

You can also pass an existing renderer instance directly:

```jsx
<Canvas gl={renderer} />
```

A factory can return a promise. R3F waits for that promise before rendering the scene. A renderer created with a factory function is owned by R3F and will automatically be disposed while an existing renderer instance is owned by the user and R3F will not control its lifecycle.

## Options / Props

Ownership: how you supply the renderer determines who is responsible for disposing it.

| `gl` value | Ownership |
| --- | --- |
| Omitted or a props object | R3F owns the renderer it creates and disposes it on unmount. |
| A sync or async factory | R3F owns the returned renderer and disposes it on unmount. |
| A renderer instance | You own the renderer and are responsible for calling `dispose()`. |

## Notes

- Return a renderer dedicated to that root from a factory, including when using `WebGPURenderer`. Passing an instance directly keeps disposal under your control. In v9, unmounting still releases its WebGL context when supported, even though R3F does not call its `dispose()` method.
- Migration (v8 → v9): the `gl` callback receives the default constructor props (`(props) => new WebGLRenderer(props)`) rather than the canvas, and may return a promise.
- `WebGLRenderer` / `WebGPURenderer` class APIs are covered by the threejs skill (renderers).

## Related

- [Canvas (Properties)](./canvas.md)
- [WebGPU](./webgpu.md)
- [createRoot](./create-root.md)
