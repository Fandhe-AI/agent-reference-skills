---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr.md#create
---

# create() / CreateOptions

Creates a ReactThreeTestRenderer instance from a `three` element such as `<mesh />`.

## Signature / Usage

```tsx
const renderer = ReactThreeTestRenderer.create(element, options)
```

By default, it won't create an actual `THREE.WebGLRenderer` and there will be no loop. But it will still render the complete scene graph. Returns the properties below.

## Options / Props

`CreateOptions extends RenderProps<HTMLCanvasElement>` (`RenderProps` is from react-three-fiber):

| Name | Type | Description |
| --- | --- | --- |
| width | number (optional) | Width of canvas |
| height | number (optional) | Height of canvas |

## Notes

- Returned members: `scene`, `getInstance()`, `toTree()`, `toGraph()`, `fireEvent()`, `advanceFrames()`, `update()`, `unmount()`.
- Test runner / browser tooling is out of scope here (see the vitest and playwright skills).

## Related

- [scene / getInstance / toTree / toGraph](./test-renderer-scene-graph.md)
- [fireEvent](./test-renderer-fire-event.md)
- [advanceFrames / update / unmount](./test-renderer-lifecycle.md)
