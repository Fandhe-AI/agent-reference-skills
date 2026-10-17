---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/OnChangeFn
---

# OnChangeFn / Updater

Callback and value types used by every `onXxxChange` table option: a value, or a function from the old value to the new one.

## Signature / Usage

```ts
type Updater<T> = T | ((old) => T);

type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `T` | `T` | Type parameter of both aliases (the state slice type) |
| `updaterOrValue` | `Updater<T>` | Parameter of `OnChangeFn`; returns `void` |

## Notes

- Defined in `types/type-utils.ts` (`table-core`).

## Related

- [TableOptions](./table-options.md)
- [TableState](./table-state.md)
