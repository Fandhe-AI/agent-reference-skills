# Controls

A dynamic table displaying component arguments with functioning UI controls for interactive documentation and argument modification.

## Import

```ts
import { Controls } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | Story export or CSF file exports | Specifies which story to retrieve controls from; uses primary story if CSF file is provided |
| `exclude` | `string[] \| RegExp` | Omits controls matching the regex or array values |
| `include` | `string[] \| RegExp` | Shows only controls matching the regex or array values |
| `sort` | `'none' \| 'alpha' \| 'requiredFirst'` | Sort order: unsorted, alphabetical, or required args first |

## Usage

```tsx
import { Meta, Canvas, Controls } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />
<Canvas of={ButtonStories.Primary} />
<Controls of={ButtonStories.Primary} />
```

```ts
// Configure defaults via parameters
const meta = {
  component: Button,
  parameters: {
    docs: {
      controls: { exclude: ['style'] },
    },
  },
};
```

## Notes

- Controls only work when inline stories are **not** turned off
- For static (non-interactive) arg documentation, use `ArgTypes` instead
- Configuration available at project, component, or story levels via `parameters.docs.controls`

## Related

- [arg-types.md](./arg-types.md)
- [canvas.md](./canvas.md)
