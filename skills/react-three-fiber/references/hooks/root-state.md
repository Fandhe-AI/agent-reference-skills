---
source: https://r3f.docs.pmnd.rs/api/hooks#state-properties
---

# RootState (state properties)

The state model returned by `useThree()` and passed to `useFrame` callbacks.

## Signature / Usage

```jsx
import { useThree } from '@react-three/fiber'

function Foo() {
  const state = useThree()
```

## Options / Props

| Prop | Description | Type |
| --- | --- | --- |
| `gl` | Renderer | `THREE.WebGLRenderer` |
| `scene` | Scene | `THREE.Scene` |
| `camera` | Camera | `THREE.PerspectiveCamera` |
| `raycaster` | Default raycaster | `THREE.Raycaster` |
| `pointer` | Contains updated, normalized, centric pointer coordinates | `THREE.Vector2` |
| `mouse` | Note: this is deprecated, use `pointer` instead! Normalized event coordinates | `THREE.Vector2` |
| `clock` | Running system clock | `THREE.Clock` |
| `linear` | True when the colorspace is linear | `boolean` |
| `flat` | True when no tonemapping is used | `boolean` |
| `legacy` | Disables global color management via `THREE.ColorManagement` | `boolean` |
| `frameloop` | Render mode: always, demand, never | `always`, `demand`, `never` |
| `performance` | System regression | `{ current: number, min: number, max: number, debounce: number, regress: () => void }` |
| `size` | Canvas size in pixels | `{ width: number, height: number, top: number, left: number }` |
| `viewport` | Canvas viewport size in three.js units. Note: This is different from `gl.getViewport` which returns the drawbuffer size | `{ width: number, height: number, initialDpr: number, dpr: number, factor: number, distance: number, aspect: number, getCurrentViewport: (camera?: Camera, target?: THREE.Vector3, size?: Size) => Viewport }` |
| `xr` | XR interface, manages WebXR rendering | `{ connect: () => void, disconnect: () => void }` |
| `set` | Allows you to set any state property | `(state: SetState<RootState>) => void` |
| `get` | Allows you to retrieve any state property non-reactively | `() => GetState<RootState>` |
| `invalidate` | Request a new render, given that `frameloop === 'demand'` | `() => void` |
| `advance` | Advance one tick, given that `frameloop === 'never'` | `(timestamp: number, runGlobalEffects?: boolean) => void` |
| `setSize` | Resize the canvas | `(width: number, height: number, top?: number, left?: number) => void` |
| `setDpr` | Set the pixel-ratio | `(dpr: number) => void` |
| `setFrameloop` | Shortcut to set the current render mode | `(frameloop?: 'always', 'demand', 'never') => void` |
| `setEvents` | Shortcut to setting the event layer | `(events: Partial<EventManager<any>>) => void` |
| `onPointerMissed` | Response for pointer clicks that have missed a target | `() => void` |
| `events` | Pointer-event handling | `{ connected: TargetNode, handlers: Events, connect: (target: TargetNode) => void, disconnect: () => void }` |

## Notes

- The types above are the docs table verbatim. The source (`packages/fiber/src/core/store.ts`, tag v9.8.2) declares, among others: `invalidate: (frames?: number) => void`, `setDpr: (dpr: Dpr) => void` where `Dpr = number | [min: number, max: number]`, `setFrameloop: (frameloop: Frameloop) => void` where `Frameloop = 'always' | 'demand' | 'never'`, `onPointerMissed?: (event: MouseEvent) => void`, `controls: THREE.EventDispatcher | null`, `previousRoot?: RootStore` (set when the state is layered via `createPortal`), and `internal: InternalState`.
- Source declares `RenderCallback = (state: RootState, delta: number, frame?: XRFrame) => void`.
- `setDpr` is overwritten by the `dpr` prop whenever the `Canvas` rerenders. If you want to use `setDpr` then don't use the `dpr` prop. This behavior will change in v10 (v9.8.2 release notes). Pixel ratio also updates automatically when moving between displays or zooming (v9.8.2).
- `mouse` is deprecated; use `pointer`.
- The three.js classes named in the table (`WebGLRenderer`, `Scene`, `PerspectiveCamera`, `Raycaster`, `Vector2`, `Clock`, `ColorManagement`) are documented in the threejs skill.

## Related

- [useThree](./use-three.md)
- [useFrame](./use-frame.md)
