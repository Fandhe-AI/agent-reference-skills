# MDX

Blend Markdown with JSX to create rich, interactive documentation pages in Storybook, optionally linked to CSF story files.

## Overview

MDX is a format that combines Markdown prose with JavaScript/JSX. Storybook renders MDX documentation with React regardless of the framework used for stories. MDX pages can be attached to a component's stories (via the `Meta` block's `of` prop) or exist as standalone documentation pages.

## Usage

### Minimal MDX file attached to a stories file

```mdx
import { Canvas, Meta } from '@storybook/addon-docs/blocks';
import * as CheckboxStories from './Checkbox.stories';

<Meta of={CheckboxStories} />

# Checkbox

A checkbox is a square box that can be activated or deactivated when ticked.

<Canvas of={CheckboxStories.Unchecked} />
```

### Standalone documentation page (no story attachment)

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Introduction" />

# Welcome

This is a standalone docs page.
```

### Register MDX in main config

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
};
```

### Import external Markdown

```mdx
import Readme from '../../CHANGELOG.md?raw';
import { Markdown } from '@storybook/addon-docs/blocks';

<Markdown>{Readme}</Markdown>
```

### Reference stories from multiple files

```mdx
import * as ListStories from './List.stories';
import * as ItemStories from './ListItem.stories';

<Canvas of={ListStories.Filled} />
<Story of={ItemStories.Starter} meta={ItemStories} />
```

### Cross-reference navigation links

```mdx
[Go to Button docs](?path=/docs/button--docs)
[Anchor link](?path=/docs/button--docs#overview)
```

## Notes

- MDX documentation always renders with React; stories themselves render in your chosen framework.
- Import the full stories module (`import * as Foo from './Foo.stories'`), not individual named exports.
- Separate JSX blocks from Markdown prose with blank lines to avoid parse errors.
- GitHub-flavored Markdown tables require installing and configuring the `remark-gfm` plugin.
- Controls not updating in MDX is a known limitation when inline rendering is disabled.
- Comments use JSX syntax: `{/* comment */}`.

## Related

- [Doc Blocks](./doc-blocks.md)
- [Autodocs](./autodocs.md)
