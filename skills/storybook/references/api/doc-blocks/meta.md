# Meta

Attaches an MDX documentation page to component stories and controls the sidebar entry location. Renders no visible output.

## Import

```ts
import { Meta } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | CSF file exports | Specifies which CSF file is attached; pass the full set of exports |
| `name` | `string` | Customizes the sidebar entry name; enables multiple MDX files per component |
| `title` | `string` | Sets the title of an unattached MDX file for sidebar placement |
| `isTemplate` | `boolean` | When `true`, marks the file as an autodocs template and prevents it from being indexed |

## Usage

```tsx
import { Meta } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />
```

```tsx
{/* Unattached docs page with custom sidebar location */}
<Meta title="Design System/Overview" />
```

## Notes

- `Meta` renders **no visible output**; it only provides metadata
- **Attached** docs (using `of`) appear in the sidebar under the component's stories
- **Unattached** docs (using `title`) appear at any position in the sidebar hierarchy
- Use `name` to attach multiple MDX files to the same component

## Related

- [title.md](./title.md)
- [primary.md](./primary.md)
