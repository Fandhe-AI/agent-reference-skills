# ClientOnly

Renders its children exclusively on the client side, preventing server-side rendering of content that depends on browser APIs.

## Import

```tsx
import { ClientOnly } from "@chakra-ui/react"
```

## Usage

```tsx
<ClientOnly fallback={<Skeleton height="5" width="32" />}>
  <Stack gap="1">
    <Text>Current URL: <Code>{window.location.href}</Code></Text>
    <Text>Screen width: <Code>{window.innerWidth}px</Code></Text>
  </Stack>
</ClientOnly>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `any` | — | Content to render while mounting on the client side |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Notes

- The `children` prop also accepts a render function `() => ReactNode`, which is called only after hydration
- Use the render-function form to safely access `window` or other browser globals
- The `fallback` is shown during SSR and before hydration completes

## Related

- [EnvironmentProvider](./environment-provider.md)
