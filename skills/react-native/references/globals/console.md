---
source: https://reactnative.dev/docs/0.87/global-console
---

# console

The global `console` object, as defined in Web specifications.

## Signature / Usage

```tsx
console.timeStamp(
  label: string,
  start?: string | number,
  end?: string | number,
  trackName?: string,
  trackGroup?: string,
  color?: DevToolsColor
): void;
```

The `console.timeStamp` API allows you to add custom timing entries in the Performance panel timeline.

```tsx
type DevToolsColor =
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'warning'
  | 'error';
```

## Options / Props

Parameters of `console.timeStamp()`:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| label | `string` | Yes | The label for the timing entry. |
| start | `string \| number` | No | If string, the name of a previously recorded timestamp with `console.timeStamp`. If number, the DOMHighResTimeStamp (for example, from `performance.now()`). If undefined, the current time is used. |
| end | `string \| number` | No | If string, the name of a previously recorded timestamp with `console.timeStamp`. If number, the DOMHighResTimeStamp (for example, from `performance.now()`). If undefined, the current time is used. |
| trackName | `string` | No | The name of the custom track. |
| trackGroup | `string` | No | The name of the track group. |
| color | `DevToolsColor` | No | The color of the entry. |

## Notes

- The official page is marked "This page is work in progress, so please refer to the MDN documentation for more information" (`https://developer.mozilla.org/en-US/docs/Web/API/console`).
- `DOMHighResTimeStamp` is documented at `https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp`.

## Related

- [performance / Performance* globals](./performance.md)
- [Runtime globals](./runtime-globals.md)
