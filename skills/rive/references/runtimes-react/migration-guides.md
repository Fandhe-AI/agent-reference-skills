# Migration Guides

Migration paths for Rive's React runtime across major package versions.

## Notes

- Upgrade to `@rive-app/react-webgl2`; the previous `@rive-app/react-webgl` package is deprecated and no longer receives updates after v4.27.3.
- v3.x → v4.x: no breaking API changes; bundle size increased due to Rive Text runtime support being added to the core web dependency.
- v1.x → v3.x: the `rive-react` package was replaced by scoped packages, `@rive-app/react-canvas` (recommended) or `@rive-app/react-webgl`. Prop-spreading behavior changed — styling props (`className`, `style`) apply to the wrapper `<div>`, while other attributes attach to the `<canvas>` element.
- v0.x → v1.x: the rendering context switched from Canvas2D to WebGL to support features like Mesh Deformations; the public API remained unchanged.
- Most upgrades require minimal code changes, except for the v2 prop-spreading behavior change.

## Related

- [Overview](./overview.md)
- [Best Practices](./best-practices.md)
