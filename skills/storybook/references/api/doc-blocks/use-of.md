# useOf

A React hook that resolves story, meta, or component exports into their annotated forms for building custom doc blocks.

## Import

```ts
import { useOf } from '@storybook/addon-docs/blocks';
```

## Signature

```ts
function useOf(
  moduleExportOrType: ModuleExport | 'story' | 'meta' | 'component',
  validTypes?: Array<'story' | 'meta' | 'component'>
): ResolvedOf
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `moduleExportOrType` | `ModuleExport \| 'story' \| 'meta' \| 'component'` | The export to resolve; pass a string (`'story'`, `'meta'`, `'component'`) in attached doc mode to reference the primary item |
| `validTypes` | `Array<'story' \| 'meta' \| 'component'>` | Optional allowlist of accepted types; throws an error if an invalid type is passed |

## Return Value

| Type resolved | Shape |
|---------------|-------|
| Story | `{ type: 'story', story: PreparedStory }` |
| Meta | `{ type: 'meta', csfFile: CSFFile, preparedMeta: PreparedMeta }` |
| Component | `{ type: 'component', component: Component, projectAnnotations: NormalizedProjectAnnotations }` |

## Usage

```tsx
import { useOf } from '@storybook/addon-docs/blocks';

export const StoryName = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);

  switch (resolvedOf.type) {
    case 'story':
      return <h1>{resolvedOf.story.name}</h1>;
    case 'meta':
      return <h1>{resolvedOf.preparedMeta.title}</h1>;
  }
  return null;
};
```

## Notes

- Most built-in doc blocks (`Description`, `Canvas`, etc.) use `useOf` internally
- String references (`'story'`, `'meta'`, `'component'`) only work in **attached doc mode**
- Use `validTypes` to guard against receiving an unexpected export type

## Related

- [meta.md](./meta.md)
- [story.md](./story.md)
