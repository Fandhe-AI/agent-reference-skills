# For

A declarative utility component for iterating over an array and rendering a component for each item.

## Import

```tsx
import { For } from "@chakra-ui/react"
```

## Usage

```tsx
<For each={["One", "Two", "Three"]}>
  {(item, index) => <div key={index}>{item}</div>}
</For>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `each` | `T[] \| readonly T[] \| undefined` | — | The array to iterate over |
| `children` | `(item: T, index: number) => ReactNode` | — (required) | Render function receiving each item and its index |
| `fallback` | `ReactNode` | — | Content to display when the array is empty or undefined |

## Variants / Sizes

```tsx
{/* With fallback for empty arrays */}
<For
  each={[]}
  fallback={
    <VStack textAlign="center" fontWeight="medium">
      No items to show
    </VStack>
  }
>
  {(item, index) => <Box key={index}>{item}</Box>}
</For>

{/* Iterating over objects */}
<For each={[{ name: "Alice" }, { name: "Bob" }]}>
  {(item, index) => <Text key={index}>{item.name}</Text>}
</For>
```

## Notes

- The render function receives both the current item and its zero-based index
- When `each` is `undefined`, the `fallback` is rendered (same as an empty array)

## Related

- [Show](./show.md)
