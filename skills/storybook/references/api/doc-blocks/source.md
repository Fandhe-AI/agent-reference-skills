# Source

Renders code snippets directly in Storybook documentation.

## Import

```ts
import { Source } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | Story export | References which story's source to render |
| `code` | `string` | Provides raw source code to display |
| `language` | `'jsx' \| 'tsx' \| 'ts' \| 'json' \| 'yml' \| 'md' \| 'bash' \| 'css' \| 'html' \| 'graphql'` | Syntax highlighting language |
| `dark` | `boolean` | Displays the snippet in dark mode |
| `excludeDecorators` | `boolean` | Controls whether decorators appear in the code snippet |
| `transform` | `(code: string, storyContext: StoryContext) => string \| Promise<string>` | Async function to modify source before display |
| `type` | `'auto' \| 'code' \| 'dynamic'` | Controls rendering approach |

## Usage

```tsx
import { Meta, Source } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Source of={ButtonStories.Primary} />
```

```tsx
{/* Render arbitrary code */}
<Source language="tsx" code={`const x = <Button label="Hello" />;`} />
```

## Notes

- When rendered inside a `Canvas` block, Source always uses **dark mode** regardless of the `dark` prop
- Dynamic snippets require stories that use `args` and have the `Story` block rendered alongside
- Configure defaults via `parameters.docs.source` at story, component, or project level

## Related

- [canvas.md](./canvas.md)
- [story.md](./story.md)
