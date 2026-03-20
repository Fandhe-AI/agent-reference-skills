# Canvas

A wrapper around a Story block with an interactive toolbar that displays stories and automatically provides source code snippets.

## Import

```ts
import { Canvas } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `of` | Story export | — | Specifies which story's source is displayed |
| `sourceState` | `'hidden' \| 'shown' \| 'none'` | `'hidden'` | Initial visibility state of the source panel |
| `layout` | `'centered' \| 'fullscreen' \| 'padded'` | `'padded'` | How the canvas lays out the story |
| `withToolbar` | `boolean` | — | Whether to render the interaction toolbar |
| `className` | `string` | — | HTML class(es) for custom styling |
| `additionalActions` | `Array<{ title: string; onClick: () => void }>` | — | Custom buttons added to the toolbar's bottom-right corner |
| `meta` | CSF file exports | — | Associates the story with an alternate CSF file |
| `source` | Source block props | — | Configuration for code display (format, language, type) |
| `story` | Story block props | — | Configuration for inline rendering (height, autoplay) |

## Usage

```tsx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Canvas of={ButtonStories.Primary} sourceState="shown" />
```

```tsx
<Canvas
  of={ButtonStories.Primary}
  additionalActions={[
    {
      title: 'Open in GitHub',
      onClick: () => window.open('https://github.com/...', '_blank'),
    },
  ]}
/>
```

## Notes

- The source block inside Canvas always renders in **dark mode**
- Passing arbitrary components as children is deprecated; only a single story is supported
- Configure defaults via `parameters.docs.canvas`

## Related

- [story.md](./story.md)
- [source.md](./source.md)
