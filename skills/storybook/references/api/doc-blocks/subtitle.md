# Subtitle

A secondary heading block for documentation entries in Storybook.

## Import

```ts
import { Subtitle } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element \| string` | `parameters.docs.subtitle` | Content displayed as the subtitle |
| `of` | CSF file exports | — | Specifies which meta's subtitle to display |

## Usage

```tsx
import { Subtitle } from '@storybook/addon-docs/blocks';

<Subtitle>This is the subtitle</Subtitle>
```

## Notes

- Pairs with `Title` for hierarchical documentation structure
- Falls back to `parameters.docs.subtitle` when no children are provided

## Related

- [title.md](./title.md)
- [description.md](./description.md)
