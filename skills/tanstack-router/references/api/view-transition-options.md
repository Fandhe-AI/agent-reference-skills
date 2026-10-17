---
source: https://tanstack.com/router/latest/docs/api/router/ViewTransitionOptionsType
---

# ViewTransitionOptions

Defines a view transition type (see the Chrome documentation on same-document view transition types).

## Signature / Usage

```tsx
interface ViewTransitionOptions {
  types:
    | Array<string>
    | ((locationChangeInfo: {
        fromLocation?: ParsedLocation
        toLocation: ParsedLocation
        pathChanged: boolean
        hrefChanged: boolean
        hashChanged: boolean
      }) => Array<string> | false)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `types` | `Array<string> \| ((locationChangeInfo) => Array<string> \| false)` | Required. Either an array of strings passed to the `document.startViewTransition({update, types})` call, or a function receiving `locationChangeInfo` that returns such an array, or `false` to skip the view transition |

## Related

- [ParsedLocation](./parsed-location.md)
- [NavigateOptions](./navigate-options.md)
