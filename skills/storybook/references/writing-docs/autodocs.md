# Autodocs

Automatically generates documentation pages from stories by inferring component metadata (args, argTypes, parameters) and placing them at the component level in the sidebar.

## Overview

Autodocs transforms stories into living documentation. Enable it globally or per component via the `autodocs` tag. The generated page is named `Docs` by default and can be fully customized with React components or MDX templates.

## Usage

### Enable globally

```typescript
// .storybook/preview.ts
const preview: Preview = {
  tags: ['autodocs'],
};
export default preview;
```

### Enable per component

```typescript
const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
```

### Disable for a specific component (when enabled globally)

```typescript
const meta = {
  component: Page,
  tags: ['!autodocs'],
} satisfies Meta<typeof Page>;
```

### Custom docs template

```typescript
// .storybook/preview.ts
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';

const preview: Preview = {
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};
```

### Table of contents

```typescript
const preview: Preview = {
  parameters: {
    docs: {
      toc: true,
    },
  },
};
```

### Main config options

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  docs: {
    defaultName: 'Documentation', // default: 'Docs'
    docsMode: true,               // show only docs pages in sidebar
  },
};
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `defaultName` | `string` | Rename the auto-generated docs page (default: `'Docs'`) |
| `docsMode` | `boolean` | Show only documentation pages in the sidebar |
| `docs.page` | `() => JSX` | Replace the default template with a custom React component |
| `docs.container` | component | Wrap documentation with custom styling via `DocsContainer` |
| `docs.theme` | theme object | Apply a custom Storybook theme to docs pages |
| `docs.toc` | `boolean \| object` | Enable table of contents |

### TOC options

| Property | Description |
|----------|-------------|
| `contentsSelector` | CSS selector for the heading container |
| `headingSelector` | Define heading levels to include |
| `ignoreSelector` | Exclude specific headings |
| `title` | Custom caption text |
| `disable` | Hide TOC completely |
| `unsafeTocbotOptions` | Additional TocBot settings |

## Notes

- Use `subcomponents` in meta to group related components; they appear as tabs in the ArgTypes block.
- TOC is hidden automatically when viewport width is less than 1200px.
- In monorepo setups, import components directly from their source file rather than package roots.
- For TypeScript monorepos, set `reactDocgen: 'react-docgen'` in main config if docgen fails.
- Inline rendering must be enabled for Controls to update stories live.
- MDX unattached documentation pages cannot customize TOC due to parameter limitations.

## Related

- [Doc Blocks](./doc-blocks.md)
- [MDX](./mdx.md)
- [Build Documentation](./build-documentation.md)
