# Title

The primary heading block for documentation entries, typically displaying the component or page name.

## Import

```ts
import { Title } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `JSX.Element \| string` | Explicit title content; falls back to the attached CSF `title` trimmed to the last path segment (e.g., `'path/to/Button'` → `'Button'`) |
| `of` | CSF file exports | Specifies which meta's title to display |

## Usage

```tsx
import { Title } from '@storybook/addon-docs/blocks';

<Title>My Component</Title>
```

## Notes

- Typically appears at the top of documentation pages
- When used with an attached CSF file, automatically derives content from story metadata
- Auto-titling trims the hierarchical path to the last segment per CSF 3.0 conventions

## Related

- [subtitle.md](./subtitle.md)
- [meta.md](./meta.md)
