---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr.md#create-fireevent
---

# fireEvent() / MockSyntheticEvent

Fires an event on a part of the rendered tree.

## Signature / Usage

```tsx
renderer.fireEvent(testInstance, eventName, mockEventData)
```

Native method to fire events on the specific part of the rendered tree through passing an element within the tree and an event name. The third argument is appended to the `MockSyntheticEvent` passed to the event handler.

Event names follow camelCase convention (e.g. `pointerUp`), or you can pass event handler name instead (e.g. `onPointerUp`).

## Options / Props

`MockSyntheticEvent` members:

| Name | Type | Description |
| --- | --- | --- |
| camera | Camera | The default camera of the rendered scene |
| stopPropagation | () => void | Stops propagation |
| target | ReactThreeTestInstance | Event target |
| currentTarget | ReactThreeTestInstance | Current event target |
| sourceEvent | MockEventData | Source event data |
| ...mockEventData | — | The third argument of `fireEvent` is spread into the event |

## Related

- [create()](./test-renderer-create.md)
- [ReactThreeTestInstance](./test-instance.md)
- [Testing overview](./testing-overview.md)
