# TableOfContents

Renders an interactive table of contents for documentation pages, displayed as a fixed sidebar on the right side of larger screens.

## Import

```ts
import { TableOfContents } from '@storybook/blocks';
```

## Configuration

`TableOfContents` is configured via `parameters.docs.toc`, not direct JSX props.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `disable` | `boolean` | `false` | Hides the TOC while preserving layout space |
| `headingSelector` | `string` | `'h3'` | CSS selector for heading levels to include |
| `contentsSelector` | `string` | `'.sbdocs-content'` | Container element to search for headings |
| `ignoreSelector` | `string` | `'.docs-story *, .skip-toc'` | Selector for headings to exclude |
| `title` | `string \| null \| ReactElement` | `'Table of contents'` | Title text or element above the TOC |
| `unsafeTocbotOptions` | `object` | — | Additional options passed directly to the Tocbot library |

## Usage

```ts
// .storybook/preview.ts — enable globally
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
    },
  },
};

export default preview;
```

```ts
// Disable for a specific component
const meta = {
  component: MyComponent,
  parameters: {
    docs: {
      toc: { disable: true },
    },
  },
};
```

## Notes

- Hidden on screens narrower than **768px**
- Add the `skip-toc` CSS class to individual headings to exclude them from the TOC
- The block is automatically rendered by Storybook's docs container; it does not need to be added manually to MDX

## Related

- [meta.md](./meta.md)
- [title.md](./title.md)
