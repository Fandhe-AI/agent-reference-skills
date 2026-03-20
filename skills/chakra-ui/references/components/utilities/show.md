# Show

Conditionally renders part of the view based on a boolean condition, with optional fallback content.

## Import

```tsx
import { Show } from "@chakra-ui/react"
```

## Usage

```tsx
<Show when={count > 3} fallback={<Text>Not there yet...</Text>}>
  <div>Congrats! I am here</div>
</Show>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `when` | `T \| null \| undefined` | — | If truthy, renders `children`; otherwise renders `fallback` |
| `fallback` | `ReactNode` | — | Content to render when `when` is falsy |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Render prop — receives the non-null value */}
const value: number | undefined = 10
<Show when={value}>
  {(value) => <div>Value: {value}</div>}
</Show>
```

## Notes

- When `children` is a function, it is called with the resolved (non-null/non-undefined) value of `when`, useful for narrowing types

## Related

- [For](./for.md)
- [ClientOnly](./client-only.md)
