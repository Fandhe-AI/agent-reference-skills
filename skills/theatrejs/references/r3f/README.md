# r3f

`@theatre/r3f` and `@theatre/react` API reference for React Three Fiber integration.

| Name | Description | Path |
|------|-------------|------|
| SheetProvider | Container component that binds a Theatre.js sheet to descendant editable elements | [SheetProvider.md](./SheetProvider.md) |
| editable (e) | Creates animatable r3f elements or wraps custom components for Theatre.js | [editable.md](./editable.md) |
| PerspectiveCamera | Editable perspective camera with `theatreKey`, `makeDefault`, and `lookAt` support | [PerspectiveCamera.md](./PerspectiveCamera.md) |
| OrthographicCamera | Editable orthographic camera with `theatreKey`, `makeDefault`, and `lookAt` support | [OrthographicCamera.md](./OrthographicCamera.md) |
| useCurrentSheet | Hook returning the nearest SheetProvider's `ISheet` instance (`@theatre/r3f`) | [useCurrentSheet.md](./useCurrentSheet.md) |
| refreshSnapshot / RefreshSnapshot | Refresh the snapshot editor after dynamic scene changes | [refreshSnapshot.md](./refreshSnapshot.md) |
| extension | r3f extension object; pass to `studio.extend()` to enable Studio tooling | [extension.md](./extension.md) |
| useVal | Subscribe a React component to a Theatre.js pointer or Dataverse prism (`@theatre/react`) | [useVal.md](./useVal.md) |
| usePrism | Derive a reactive value from a function and subscribe to it (`@theatre/react`) | [usePrism.md](./usePrism.md) |
| useAtom | Create a Dataverse Atom for shared reactive state (`@theatre/react`) | [useAtom.md](./useAtom.md) |
