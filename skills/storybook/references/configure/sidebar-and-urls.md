# Sidebar and URLs

Organize Storybook's sidebar hierarchy and manage story permalinks.

## Overview

The sidebar organizes stories hierarchically using forward slashes (`/`) in story titles. Story IDs are derived from titles and used in URLs; they can be manually set to preserve permalinks when renaming.

## Configuration

### Sidebar Roots

By default, top-level nodes appear as "sections" (roots). To display them as folders instead:

```javascript
// .storybook/manager.js
import { addons } from 'storybook/manager-api';

addons.setConfig({
  sidebar: {
    showRoots: false,
  },
});
```

### Collapse Roots by Default

```javascript
addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other', 'experimental'],
  },
});
```

### Custom Sidebar Labels

```javascript
addons.setConfig({
  sidebar: {
    renderLabel: (item) => <span>{item.name}</span>,
  },
});
```

## Story Permalinks

Storybook generates unique IDs from title + name for use in URLs. Preserve a permalink when renaming by setting `id` manually:

```typescript
// components/modals/Alert.stories.ts
const meta = {
  title: 'Components/Modals/AlertRenamed',
  component: Alert,
  id: 'Components/Modals/Alert', // preserves old permalink
} satisfies Meta<typeof Alert>;
```

## Auto-Title (CSF 3.0)

CSF 3.0 generates titles automatically from file paths. Features:

- Preserves filename casing (as of Storybook 6.5)
- Removes redundant names (e.g., `MyComponent/MyComponent` → `MyComponent`)
- Supports `titlePrefix` in story configuration objects

```typescript
// stories config with titlePrefix
stories: [
  {
    directory: '../packages/components',
    files: '*.stories.*',
    titlePrefix: 'MyComponents',
  },
]
```

## Notes

- Recommended pattern: match title to file path — if file is `components/modals/Alert.stories.js`, use title `Components/Modals/Alert`
- Story titles use forward slashes to create sidebar nesting
- Custom Story Indexers allow adjusting automatic title generation beyond simple prefixes

## Related

- [Features and Behavior](./features-and-behavior.md)
- [Theming](./theming.md)
