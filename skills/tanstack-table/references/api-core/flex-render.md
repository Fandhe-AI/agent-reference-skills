---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/functions/flexRender, https://tanstack.com/table/latest/docs/framework/react/reference/index/functions/FlexRender-1
---

# flexRender / FlexRender

Adapter-provided utility (function `flexRender`, and a simplified wrapper component `FlexRender`) for rendering header/cell/footer templates that use JSX. Use it instead of `cell.getValue()` / `cell.renderValue()` when the column definition's `cell`/`header`/`footer` returns markup.

## Signature / Usage

```tsx
import { flexRender, FlexRender } from '@tanstack/react-table'

// function form
flexRender(cell.column.columnDef.cell, cell.getContext())

// component form (only one of cell/header/footer may be passed)
<FlexRender cell={cell} />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Comp` (flexRender) | `Renderable<TProps>` | Component/function/value to render |
| `props` (flexRender) | `TProps` | Props/context passed to `Comp` (typically `cell.getContext()`) |
| `props` (FlexRender) | `FlexRenderProps<TFeatures, TData, TValue>` | Exactly one of `cell` / `header` / `footer` |

## Notes

- `flexRender` returns `ReactNode | Element`; `FlexRender` returns the same kind of renderable union.
- Unchanged in spirit from v8's `flexRender` (see `legacy-v8/flexRender.md`) — same calling convention `flexRender(Comp, props)`; `FlexRender` (capitalized, JSX component form) is new in v9.

## Related

- [use-table.md](./use-table.md)
- [Cell](./cell.md)
- [CellContext](./cell-context.md)
