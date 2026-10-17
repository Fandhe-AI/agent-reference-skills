---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr.md#create-scene
---

# scene / getInstance() / toTree() / toGraph()

Members of the object returned by `create()` for inspecting the rendered tree.

## Signature / Usage

```tsx
renderer.scene
renderer.getInstance()
renderer.toTree()
renderer.toGraph()
```

- `scene`: Returns the root "react three test instance" object that is useful for making assertions. You can use it to find other "test instances" deeper below.
- `getInstance()`: Return the instance corresponding to the root three element, if available. This will not work if the root element is a function component because they don't have instances.
- `toTree()`: Returns an object representing the rendered tree similar to `react-test-renderer`. This will include all elements written as react components.
- `toGraph()`: Returns an object representing the `scene graph`. This will not include all elements such as ones that use `attach`.

## Notes

- `scene` yields `ReactThreeTestInstance` objects. The scene graph itself is a three.js concept (see the threejs skill).

## Related

- [create()](./test-renderer-create.md)
- [ReactThreeTestInstance](./test-instance.md)
