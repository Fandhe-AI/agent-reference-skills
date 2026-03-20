# Chakra Factory

A utility that creates supercharged JSX components from any HTML element, enabling them to receive JSX style props.

## Overview

The Chakra Factory supports two usage patterns: JSX element syntax (`chakra.<element>`) and factory function (`chakra()`). Both approaches produce components that accept style props. You can also attach base styles and recipes at creation time.

## Usage

```tsx
// JSX element syntax
<chakra.button bg="blue.500" color="white" py="2" px="4" rounded="md">
  Click me
</chakra.button>

// Factory function
const Link = chakra("a")
function Example() {
  return <Link bg="red.200" href="https://chakra-ui.com" />
}

// With attached base styles
const StyledLink = chakra("a", {
  base: {
    bg: "papayawhip",
    color: "red.500",
  },
})
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `base` | `SystemStyleObject` | Base styles applied to every instance |
| `variants` | `Record<string, SystemStyleObject>` | Named style variants |
| `shouldForwardProp` | `(prop: string) => boolean` | Controls which props pass through to the DOM |

## Notes

- Custom components **must accept `className` as a prop** to work with the factory
- By default, Chakra style props are filtered before passing to the DOM
- Use `@emotion/is-prop-valid` with `isValidProperty` for custom prop forwarding logic

## Related

- [Overview](./overview.md)
- [Conditional Styles](./conditional-styles.md)
