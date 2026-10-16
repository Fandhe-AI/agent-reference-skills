---
source: https://r3f.docs.pmnd.rs/api/hooks#useframe
---

# useFrame

This hook allows you to execute code on every rendered frame, like running effects, updating controls, and so on. You receive the state (same as `useThree`) and a clock delta (in seconds). Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the render-loop.

## Signature / Usage

```jsx
import { useFrame } from '@react-three/fiber'

function Foo() {
  useFrame((state, delta, xrFrame) => {
    // This function runs at the native refresh rate inside of a shared render-loop
  })
```

Signature (from `packages/fiber/src/core/hooks.tsx`, tag v9.8.2):

```ts
export function useFrame(callback: RenderCallback, renderPriority: number = 0): null
```

### Taking over the render-loop

If you need more control you may pass a numerical `renderPriority` value. This will cause React Three Fiber to disable automatic rendering altogether. It will now be your responsibility to render, which is useful when you're working with effect composers, heads-up displays, etc.

```jsx
function Render() {
  // Takes over the render-loop, the user has the responsibility to render
  useFrame(({ gl, scene, camera }) => {
    gl.render(scene, camera)
  }, 1)

function RenderOnTop() {
  // This will execute *after* Render's useframe
  useFrame(({ gl, ... }) => {
    gl.render(...)
  }, 2)
```

### Negative indices

Using negative indices will **not take over the render loop**, but it can be useful if you really must order the sequence of useFrames across the component tree.

```jsx
function A() {
  // This will execute first
  useFrame(() => ..., -2)

function B() {
  // This useFrame will execute *after* A's
  useFrame(() => ..., -1)
```

## Notes

- Hooks can only be used inside the Canvas element because they rely on context.
- Be careful about what you do inside useFrame! You should never setState in there! Your calculations should be slim and you should mind all the commonly known pitfalls when dealing with loops in general, like re-use of variables, etc.
- Callbacks will be executed in order of ascending priority values (lowest first, highest last.), similar to the DOM's z-order.
- Source: the callback is `RenderCallback = (state: RootState, delta: number, frame?: XRFrame) => void`; the hook returns `null`.
- 9.8.1: hiding an ancestor `<Activity>` (React 19.2+) disconnects `useFrame` subscriptions; revealing it reconnects them without resetting scene state (CHANGELOG).

## Related

- [useThree](./use-three.md)
- [RootState](./root-state.md)
