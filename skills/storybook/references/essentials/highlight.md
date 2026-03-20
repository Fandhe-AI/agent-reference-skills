# Highlight

Visually highlights specific DOM nodes within a story for debugging accessibility issues or inspecting component elements.

## Overview

The highlight addon lets decorators or play functions emit channel events that draw colored overlays on selected DOM elements. Highlights are cleared automatically when navigating between stories.

## Configuration

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `disable` | boolean | Disables the feature at project, component, or story level |

## Usage

### Highlight elements via decorator

```typescript
import { useChannel } from 'storybook/preview-api';
import { HIGHLIGHT } from 'storybook/highlight';

export const Highlighted: Story = {
  decorators: [
    (storyFn) => {
      const emit = useChannel({});
      emit(HIGHLIGHT, {
        selectors: ['h2', 'a', '.storybook-button'],
      });
      return storyFn();
    },
  ],
};
```

### Channel events

| Event | Description |
|-------|-------------|
| `HIGHLIGHT` | Highlights DOM elements matching `selectors` |
| `REMOVE_HIGHLIGHT` | Removes a specific highlight by ID |
| `RESET_HIGHLIGHT` | Clears all active highlights |
| `SCROLL_INTO_VIEW` | Scrolls to an element and briefly highlights it |

### `HIGHLIGHT` event options

| Property | Description |
|----------|-------------|
| `selectors` | CSS selector strings to target |
| `styles` | Base CSS styles for the highlight overlay |
| `hoverStyles` | Styles applied on hover |
| `focusStyles` | Styles applied on focus |
| `keyframes` | Custom CSS animation keyframes |
| `menu` | Array of clickable menu items with optional `clickEvent` |

## Notes

- Use specific selectors to avoid conflicting with elements used by other addons.
- Pseudo-classes and pseudo-elements (`:hover`, `::before`, etc.) are not supported in custom styles.
- Highlights are automatically removed when the user navigates to a different story.

## Related

- [Measure & Outline](./measure-and-outline.md)
