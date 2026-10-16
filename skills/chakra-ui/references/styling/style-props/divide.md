# Divide Style Props

JSX style props to add dividers between sibling elements.

## Usage

```jsx
<Box divideY="2px">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

## Options / Props

### Divide X

Use the `divideX` prop to add a divider between elements horizontally.

```jsx
<Box divideX="2px">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `divideX` | `border-inline-start-width` | — |

### Divide Y

Use the `divideY` prop to add a divider between elements vertically.

```jsx
<Box divideY="2px">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `divideY` | `border-top-width` | — |

### Divide Color

Use the `divideColor` prop to add a divider color.

```jsx
<Box divideY="2px" divideColor="red.200">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `divideColor` | `border-top-color` | — |

### Divide Style

Use the `divideStyle` prop to add a divider style.

```jsx
<Box divideY="2px" divideStyle="dashed">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Box>
```

| Prop | CSS Property | Token Category |
|------|-------------|----------------|
| `divideStyle` | `border-style` | — |

## Notes

- Source: https://chakra-ui.com/docs/styling/style-props/divide (docs source: https://github.com/chakra-ui/chakra-ui/blob/2e7517745cff2fcde0b8012f136cf99611ff262a/apps/www/content/docs/styling/style-props/divide.mdx, tag @chakra-ui/react@3.37.0)

## Related

- [Border Style Props](./border.md)
