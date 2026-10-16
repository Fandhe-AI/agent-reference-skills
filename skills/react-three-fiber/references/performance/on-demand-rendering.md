---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#on-demand-rendering
---

# On-demand rendering (frameloop demand / invalidate)

three.js apps usually run in a game-loop that executes 60 times a second, React Three Fiber is no different. If the moving parts in your scene are allowed to come to rest, you can opt into on-demand rendering, which will only render when necessary. This saves battery and keeps noisy fans in check.

## Signature / Usage

Set the canvas `frameloop` prop to `demand`. It will render frames whenever it detects prop changes throughout the component tree.

```jsx
<Canvas frameloop="demand">
```

### Triggering manual frames

If anything in the tree _mutates_ props, React cannot be aware of it and the display would be stale. For instance, camera controls just grab into the camera and mutate its values. Use `invalidate` to trigger frames manually.

```jsx
function Controls() {
  const orbitControlsRef = useRef()
  const { invalidate, camera, gl } = useThree()
  useEffect(() => {
    orbitControlsRef.current.addEventListener('change', invalidate)
    return () => orbitControlsRef.current.removeEventListener('change', invalidate)
  }, [])
  return <orbitControls ref={orbitControlsRef} args={[camera, gl.domElement]} />
```

Generally you can call invalidate whenever you need to render:

```jsx
invalidate()
```

### Sync animations with on-demand-rendering and invalidate

Since `invalidate()` is only a flag that schedules render, you might bump into syncing issues when you run animations that are synchronous (they start immediately). By the time fiber renders the first frame the animation has already progressed, which leads to a visible jump. Pre-emptively schedule a render and then start the animation in the next frame.

```jsx
<mesh
  onClick={() => {
    // Pre-emptively schedule a render
    invalidate()
    // Wait for the next frame to start the animation
    requestAnimationFrame(() => controls.dolly(1, true))
  }}
```

## Notes

- Calling `invalidate()` will not render immediately, it merely requests a new frame to be rendered out. Calling invalidate multiple times will not render multiple times. Think of it as a flag to tell the system that something has changed.
- Drei's controls call invalidate automatically. `@react-three/drei` is a separate package and is not covered by this skill.
- `OrbitControls` used in the example is a three.js addon class; its API belongs to the threejs skill.

## Related

- [reusing-geometries-materials](./reusing-geometries-materials.md)
