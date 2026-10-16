---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# applyProps

`applyProps(element, props)` sets element properties.

## Signature / Usage

Declaration from `packages/fiber/src/core/utils.tsx` (tag v9.8.2):

```ts
export function applyProps<T = any>(object: Instance<T>['object'], props: Instance<T>['props']): Instance<T>['object']
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| object | `Instance<T>['object']` | Target object |
| props | `Instance<T>['props']` | Props to apply |

## Notes

- Source behavior: reserved keys are skipped; `undefined` values are ignored; `on(Pointer|Click|DoubleClick|ContextMenu|Wheel)*` props register or remove event handlers on the instance when it has an `__r3f` handle.
- Source behavior: setting a pierced prop whose root is not an object throws `R3F: Cannot set "<prop>". Ensure it is an object before setting "<key>".`
- Object internals and pierced props (`position-x`) are described in the objects category; three.js property semantics belong to the threejs skill.

## Related

- [build-graph](./build-graph.md)
- [other-exports](./other-exports.md)
