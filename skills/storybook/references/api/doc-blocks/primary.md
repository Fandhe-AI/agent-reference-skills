# Primary

Renders the first story defined in a CSF file, typically positioned beneath the title in documentation.

## Import

```ts
import { Primary } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | CSF file exports | Specifies which CSF file to use; pass the full set of exports (not the default export) |

## Usage

```tsx
import { Meta, Primary } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Primary />
```

## Notes

- Renders the **first story** defined in the stories file, wrapped in a `Story` block
- Pass the complete CSF file exports to `of`, not the `default` export
- Typically placed immediately under the documentation title
- When `Meta` is attached via `of`, `Primary` can be used without the `of` prop

## Related

- [story.md](./story.md)
- [canvas.md](./canvas.md)
- [meta.md](./meta.md)
