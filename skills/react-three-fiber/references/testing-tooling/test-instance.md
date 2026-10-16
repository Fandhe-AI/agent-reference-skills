---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr-instance.md
---

# ReactThreeTestInstance

Internal class that wraps the elements returned from `ReactThreeTestRenderer.create`. It closely mirrors the API of `react-test-renderer`.

## Signature / Usage

```ts
testInstance.instance
testInstance.findByProps({ [prop]: /^match/i }) // also accepts RegExp matchers
```

## Options / Props

Properties:

| Name | Description |
|------|-------------|
| `instance` | Returns the instance object of the specific testInstance. This will be the `THREE` initialized class. |
| `type` | Returns the `THREE` type of the test instance, e.g `Scene` or `Mesh`. |
| `props` | Returns an object of the props that are currently being passed to the element. This will include hidden ones such as `attach="geometry"` which are automatically applied in the reconciler. |
| `parent` | Returns the parent testInstance of this testInstance. If no parent is available, it will return `null`. |
| `children` | Returns the children test instances according to the property `children`; this will not include Geometries, Materials etc. |
| `allChildren` | Returns all the children testInstances, as thorough as `testRenderer.toTree()` capturing all react components in the tree. |

Methods:

| Name | Description |
|------|-------------|
| `find(test)` | Find a single test instance for which `test(testInstance)` returns `true`. If it does not return `true` for exactly one test instance it will throw an error. |
| `findAll(test)` | Finds all test instances for which `test(testInstance)` returns `true`. If none are found, returns an empty array. |
| `findByType(type)` | Find a single test instance with the provided type. If there is not exactly one, it will throw an error. |
| `findAllByType(type)` | Finds all test instances with the provided type. If none are found, returns an empty array. |
| `findByProps(props)` | Find a single test instance with the provided props (accepts RegExp matchers). If there is not exactly one, it will throw an error. |
| `findAllByProps(props)` | Finds all test instances with the provided props (accepts RegExp matchers). If none are found, returns an empty array. |

## Related

- [scene / toTree / toGraph](./test-renderer-scene-graph.md)
- [fireEvent](./test-renderer-fire-event.md)
