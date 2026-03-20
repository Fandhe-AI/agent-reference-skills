# Stories

Renders the complete collection of stories from a CSF file in documentation.

## Import

```ts
import { Stories } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `includePrimary` | `boolean` | `true` | Determines if the collection includes the primary (first) story |
| `title` | `string` | `'Stories'` | Sets the heading content preceding the story collection |

## Usage

```tsx
import { Meta, Stories } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Stories />
```

## Notes

- If a stories file contains **only one story** and `includePrimary={true}`, `Stories` renders nothing to avoid a confusing duplicate
- Requires `Meta` to be configured with the `of` prop pointing to the stories file
- Use `title` to customize the section heading above the story list

## Related

- [story.md](./story.md)
- [primary.md](./primary.md)
