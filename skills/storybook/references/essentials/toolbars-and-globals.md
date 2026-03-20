# Toolbars & Globals

Adds custom toolbar controls that manipulate shared "global" rendering state, re-rendering all stories and decorators when changed.

## Overview

Globals are non-story-specific values (e.g. theme, locale) accessible via `context.globals` inside decorators and story render functions. Toolbar items in the UI modify globals, triggering a re-render of the active story.

## Configuration

### Define global types (`.storybook/preview.ts`)

```typescript
import type { Preview } from '@storybook/react';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
};
```

### Toolbar item properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `value` | string | Yes | The global value this item sets |
| `title` | string | Yes | Display label in the menu |
| `right` | string | No | Right-aligned text (e.g. flag emoji) |
| `icon` | string | No | Icon shown when this item is selected |

Icons are sourced from `@storybook/icons`.

## Usage

### Consuming globals in a decorator

```typescript
decorators: [
  (Story, context) => {
    const theme = MyThemes[context.globals.theme];
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    );
  },
];
```

### Consuming globals in a story render function

```typescript
export const WithLocale: Story = {
  render: (args, { globals: { locale } }) => {
    const caption = getCaptionForLocale(locale);
    return <p>{caption}</p>;
  },
};
```

### Locking a global for a specific story

```typescript
export const OnDark: Story = {
  globals: {
    backgrounds: { value: 'dark' },
  },
};
```

Setting `globals` at story level disables that toolbar control, preventing users from changing the value while viewing that story.

### Updating globals from an addon

```typescript
const [globals, updateGlobals] = useGlobals();
updateGlobals({ 'my-param-key': !isActive });
addons.getChannel().emit(FORCE_RE_RENDER);
```

## Notes

- `globalTypes` can only be defined in preview configuration files, not in individual story files.
- Globals persist across story navigation until explicitly changed by the user or a story override.
- Setting a global at the story level disables the corresponding toolbar control for that story.

## Related

- [Backgrounds](./backgrounds.md)
- [Viewport](./viewport.md)
