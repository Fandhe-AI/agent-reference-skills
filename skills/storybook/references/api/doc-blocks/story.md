# Story

Renders a single story from a CSF file within MDX documentation with all annotations applied.

## Import

```ts
import { Story } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `of` | Story export | — | **(Required)** Specifies which story is rendered |
| `autoplay` | `boolean` | `parameters.docs.story.autoplay` | Whether the story's play function runs automatically |
| `inline` | `boolean` | `true` (framework-dependent) | Renders inline in the docs frame vs. in an iframe |
| `height` | `string` | `parameters.docs.story.height` | Sets the minimum height when rendering in iframe or inline |
| `meta` | CSF file exports | — | Specifies the CSF file for non-attached stories |

## Usage

```tsx
import { Meta, Story } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Story of={ButtonStories.Primary} />
```

## Notes

- All stories in a docs entry render simultaneously; play functions may interact with each other
- Stories using `mount` inside their play function require `autoplay={true}` to render in docs
- Setting `inline={false}` prevents controls from updating the story within the documentation page
- For a story with a border and source snippet, prefer `Canvas` over `Story`

## Related

- [canvas.md](./canvas.md)
- [stories.md](./stories.md)
- [primary.md](./primary.md)
