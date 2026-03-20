# Description

Displays component, story, or meta descriptions sourced from JSDoc comments or parameters as rendered markdown.

## Import

```ts
import { Description } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | Story export or CSF file exports | Specifies the source for pulling descriptions (story or meta) |

## Usage

```tsx
import { Meta, Description } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

{/* Shows meta/component description */}
<Description of={ButtonStories} />

{/* Shows a specific story's description */}
<Description of={ButtonStories.Primary} />
```

## Notes

**Description lookup order for stories:**
1. `parameters.docs.description.story` on the story
2. JSDoc comment above the story export

**Description lookup order for component/meta:**
1. `parameters.docs.description.component` in the meta
2. JSDoc comment above the meta
3. JSDoc comment above the component

- Markdown is rendered in descriptions
- Parameter-based descriptions override JSDoc comments when both exist

## Related

- [subtitle.md](./subtitle.md)
- [title.md](./title.md)
