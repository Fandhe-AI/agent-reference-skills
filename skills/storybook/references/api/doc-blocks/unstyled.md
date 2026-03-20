# Unstyled

Disables Storybook's default MDX documentation styles for the content wrapped inside it.

## Import

```ts
import { Unstyled } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content to which default docs styles should not be applied |

## Usage

```tsx
import { Meta, Unstyled } from '@storybook/addon-docs/blocks';
import { Header } from './Header';

<Meta title="Example" />

> This blockquote will be styled by Storybook defaults.

<Unstyled>
  > This blockquote will NOT be styled.

  <Header />
</Unstyled>
```

## Notes

- Apply `Unstyled` at the **root level** of MDX, not nested within other elements; nesting causes CSS inheritance issues
- `Story` and `Canvas` blocks are already unstyled; wrapping them in `Unstyled` is unnecessary
- Inherited CSS properties (e.g., `color`) will still apply to child components when nested

## Related

- [markdown.md](./markdown.md)
- [canvas.md](./canvas.md)
