---
source: https://r3f.docs.pmnd.rs/api/canvas#updating-configuration
---

# Updating configuration

How `Canvas` (and repeated `root.configure()` calls) apply changed props after the first render.

## Signature / Usage

```tsx
// Re-rendering with the same values preserves runtime changes made through
// setFrameloop or directly to gl.shadowMap (see useThree).
<Canvas dpr={[1, 2]} frameloop="demand" shadows />
```

## Notes

- Canvas initializes settings from its props and defaults. Subsequent changes to `dpr`, `frameloop`, `performance`, and `shadows` apply the new prop value. Rerendering with the same values preserves runtime changes made through `setFrameloop`, or directly to `gl.shadowMap`. Equivalent inline DPR arrays and shadow or performance option objects count as unchanged.
- DPR (v9.8.2): when the `dpr` prop is given, a runtime `setDpr` value is overwritten every time the `Canvas` rerenders. If you want to use `setDpr`, do not pass the `dpr` prop. The docs page describes `setDpr` being preserved on rerender with the same value; per the v9.8.2 release notes that applies from v10 ([v9.8.2 release notes](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.8.2)).
- Removing `dpr`, `frameloop`, or `shadows` applies its default if that differs from the previous prop value. Performance options merge into the current settings; removing `performance` leaves those settings intact, and supplying it again applies it again.
- Size changes update the renderer and camera without reapplying unrelated settings. These rules also apply to repeated `root.configure()` calls. Changing a DPR range recalculates its pixel ratio; per the docs, an unchanged range does not overwrite a runtime DPR override (v10 behavior; not the case at v9.8.2, see above).
- At v9.8.2, `configuration.ts` calls `setDpr(dpr)` whenever `viewport.dpr !== calculateDpr(dpr)` regardless of whether `dpr` changed, so a runtime `setDpr` is overwritten by the `dpr` prop on rerender (v9.8.2 release notes: "If you want to use `setDpr` then don't use the `dpr` prop. This behavior will change in v10"). Source: https://github.com/pmndrs/react-three-fiber/releases/tag/v9.8.2. The docs sentences above hold for `frameloop` / `shadows` / `performance`.

## Related

- [Canvas (Properties)](./canvas.md)
- [createRoot](./create-root.md)
