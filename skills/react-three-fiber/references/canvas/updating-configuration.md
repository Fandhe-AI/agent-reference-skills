---
source: https://r3f.docs.pmnd.rs/api/canvas#updating-configuration
---

# Updating configuration

How `Canvas` (and repeated `root.configure()` calls) apply changed props after the first render.

## Signature / Usage

```tsx
// Re-rendering with the same values preserves runtime changes made through
// setters such as setDpr / setFrameloop (see useThree).
<Canvas dpr={[1, 2]} frameloop="demand" shadows />
```

## Notes

- Canvas initializes settings from its props and defaults. Subsequent changes to `dpr`, `frameloop`, `performance`, and `shadows` apply the new prop value. Rerendering with the same values preserves runtime changes made through setters such as `setDpr` and `setFrameloop`, or directly to `gl.shadowMap`. Equivalent inline DPR arrays and shadow or performance option objects count as unchanged.
- Removing `dpr`, `frameloop`, or `shadows` applies its default if that differs from the previous prop value. Performance options merge into the current settings; removing `performance` leaves those settings intact, and supplying it again applies it again.
- Size changes update the renderer and camera without reapplying unrelated settings. These rules also apply to repeated `root.configure()` calls. Changing a DPR range recalculates its pixel ratio; an unchanged range does not overwrite a runtime DPR override.

## Related

- [Canvas (Properties)](./canvas.md)
- [createRoot](./create-root.md)
