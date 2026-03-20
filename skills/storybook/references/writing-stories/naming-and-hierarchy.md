# Naming and Hierarchy

Controls how stories are organized and sorted in the Storybook sidebar using implicit (file-system) or explicit (`title`) structuring.

## Overview / Signature

Story hierarchy is built from: **Category / Folder / Component / Docs / Story**.

Titles can be set explicitly via the `title` field in the CSF meta object, or derived implicitly from the file path.

## Usage

### Explicit title with grouping

Use `/` as a separator to create nested groups:

```typescript
const meta = {
  title: 'Design System/Atoms/Button',
  component: Button,
} satisfies Meta<typeof Button>;
```

### Flat (ungrouped) title

```typescript
const meta = {
  title: 'Button',
  component: Button,
} satisfies Meta<typeof Button>;
```

### Sorting stories (`.storybook/preview.ts`)

```typescript
const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};
```

### `storySort` configuration object

```typescript
storySort: {
  method: 'alphabetical',    // 'alphabetical' or default import order
  order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
  includeNames: false,       // include story name in sort (default: false)
  locales: 'en-US',          // locale for string comparison
}
```

### Wildcard `*` for unmatched categories

```typescript
storySort: {
  order: ['Intro', 'Pages', 'Components', '*', 'WIP'],
}
```

## Notes

- **Single-story hoisting**: if a component has only one story whose display name matches the component name, the story is promoted to replace the parent node in the sidebar.
- Story export names are auto "start cased" (`myStory` → `"My Story"`).
- The `order` array and `method` are independent; stories sort first by `order`, then by `method`.
- Nested arrays in `order` define sub-ordering within a group.

## Related

- [Tags](./tags.md)
- [Parameters](./parameters.md)
