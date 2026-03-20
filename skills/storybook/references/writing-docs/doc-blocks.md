# Doc Blocks

Reusable React components provided by Storybook for structuring MDX documentation pages and customizing auto-generated docs templates.

## Overview

Doc blocks are imported from `@storybook/addon-docs/blocks` and used inside `.mdx` files or custom autodocs page templates. They cover common documentation needs — rendering stories, displaying arg tables, showing source code, and more.

## Usage

### Basic MDX usage

```mdx
import { Meta, Primary, Controls, Story } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

<Primary />
<Controls />
```

### Customize via parameters

```typescript
// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    docs: {
      controls: { exclude: ['style'] },
    },
  },
};
```

## Available Doc Blocks

| Block | Description |
|-------|-------------|
| `ArgTypes` | Static table of argument types for a component |
| `Canvas` | Wraps a Story with an interactive toolbar and source snippet toggle |
| `ColorPalette` | Documents color swatches |
| `Controls` | Dynamic arg table for live interaction |
| `Description` | Displays component/story description from JSDoc comments |
| `IconGallery` | Grid display of project icons |
| `Markdown` | Imports and renders plain Markdown content |
| `Meta` | Attaches the MDX page to a stories file (no visual output) |
| `Primary` | Renders the first story from the attached stories file |
| `Source` | Renders a code snippet directly |
| `Stories` | Renders the full collection of stories from the attached file |
| `Story` | Renders a single story with all its annotations applied |
| `Subtitle` | Secondary heading for the docs entry |
| `TableOfContents` | Fixed sidebar navigation for page sections |
| `Title` | Primary heading for the docs entry |
| `Typeset` | Documents project fonts |
| `Unstyled` | Disables default Storybook styling for wrapped content |

## Options

Parameters can be set at global, component, or story level.

| Block | Parameter key |
|-------|--------------|
| `ArgTypes` | `parameters.docs.argTypes` |
| `Canvas` | `parameters.docs.canvas` |
| `Controls` | `parameters.docs.controls` |
| `Source` | `parameters.docs.source` |
| `Story` | `parameters.docs.story` |
| `TableOfContents` | `parameters.docs.toc` |

## Notes

- Do not use doc blocks inside story `render` functions — they will cause cryptic errors. Use them only in `.mdx` files or custom autodocs templates.
- Custom blocks can be built using the `useOf` hook exported by `@storybook/addon-docs/blocks`.

## Related

- [MDX](./mdx.md)
- [Autodocs](./autodocs.md)
