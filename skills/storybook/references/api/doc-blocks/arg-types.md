# ArgTypes

A static table that displays argument type definitions for a component's interface in documentation.

## Import

```ts
import { ArgTypes } from '@storybook/addon-docs/blocks';
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `of` | Story export or CSF file exports | Specifies which story to retrieve arg types from; uses primary story if CSF file is provided |
| `exclude` | `string[] \| RegExp` | Filters out arg types matching the array values or regex pattern |
| `include` | `string[] \| RegExp` | Shows only arg types matching the array values or regex pattern |
| `sort` | `'none' \| 'alpha' \| 'requiredFirst'` | Controls sort order: unsorted (default), alphabetical, or required args first |

## Usage

```tsx
import { Meta, ArgTypes } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />
<ArgTypes of={ButtonStories} exclude={['style']} />
```

## Notes

- Unlike `Controls`, `ArgTypes` renders a **static** table without interactive value editing
- Defaults can be configured via `parameters.docs.argTypes` at project, component, or story level
- Props and parameters configurations are interchangeable

## Related

- [controls.md](./controls.md)
- [stories.md](./stories.md)
