# Composition

Patterns for composing and customizing Chakra UI components.

## The `as` Prop

Change the underlying HTML element a component renders while preserving styling:

```tsx
<Heading as="h3">Hello, world!</Heading>
<Box as="section" color="fg.muted">This is a section</Box>
```

## The `asChild` Prop

Use the provided child element as the default rendered element, combining their props and behavior (similar to Radix UI's `asChild`):

```tsx
<Button asChild>
  <a href="/home">Go Home</a>
</Button>
```

## Notes

- `as` prop changes the rendered HTML tag while keeping Chakra styling
- `asChild` merges the Chakra component's props and behavior into the child element
- Both patterns maintain full accessibility support
- Use `asChild` for integrating with routing libraries (e.g., Next.js `Link`, React Router `Link`)

## Related

- [Overview](./overview.md)
- [Animation](./animation.md)
