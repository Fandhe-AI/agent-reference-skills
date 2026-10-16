# Highlight

Visually highlights specific DOM nodes within a story for debugging accessibility issues or inspecting component elements.

## Overview

The highlight addon lets decorators or play functions emit channel events that draw colored overlays on selected DOM elements. Highlights are cleared automatically when navigating between stories.

## Configuration

### Parameters

| Name | Type | Description |
|------|------|-------------|
| `disable` | boolean | Disables the feature at project, component, or story level |

## Signature / Usage

### Highlight elements via decorator

```typescript
import { useChannel } from 'storybook/preview-api';
import { HIGHLIGHT } from 'storybook/highlight';

export const Highlighted: Story = {
  decorators: [
    (storyFn) => {
      const emit = useChannel({});
      emit(HIGHLIGHT, {
        id: 'my-highlight',
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
| `HIGHLIGHT` | Highlights DOM elements matching `selectors`. Payload must contain `id` (payloads without an `id` are ignored) |
| `HIGHLIGHT_MENU_CLICK` | Emitted when a `clickable` menu item is clicked; listeners receive `(highlightId, itemId, details: ClickEventDetails)` |
| `REMOVE_HIGHLIGHT` | Removes a specific highlight by ID (`channel.emit(REMOVE_HIGHLIGHT, id)`) |
| `RESET_HIGHLIGHT` | Clears all active highlights, including those created by other addons (`channel.emit(RESET_HIGHLIGHT)`) |
| `SCROLL_INTO_VIEW` | Scrolls to an element and briefly highlights it (`channel.emit(SCROLL_INTO_VIEW, selector, options)`; `options` follows the MDN `scrollIntoViewOptions`) |

Exports: `import { HIGHLIGHT, HIGHLIGHT_MENU_CLICK, REMOVE_HIGHLIGHT, RESET_HIGHLIGHT, SCROLL_INTO_VIEW } from 'storybook/highlight';`

### `HIGHLIGHT` event options

```ts
interface HighlightOptions {
  /** Unique identifier for the highlight, used to remove it later and to attribute menu clicks */
  id: string;
  /** HTML selectors of the elements */
  selectors: string[];
  /** Priority of the highlight, higher takes precedence, defaults to 0 */
  priority?: number;
  /** CSS styles to apply to the highlight */
  styles?: Record<string, string>;
  /** CSS styles to apply to the highlight when it is hovered */
  hoverStyles?: Record<string, string>;
  /** CSS styles to apply to the highlight when it is focused or selected */
  focusStyles?: Record<string, string>;
  /** Keyframes required for animations */
  keyframes?: string;
  /** Groups of menu items to show when the highlight is selected */
  menu?: HighlightMenuItem[][];
}

interface HighlightMenuItem {
  id: string;
  title: string;
  description?: string;
  iconLeft?: 'chevronLeft' | 'chevronRight' | 'info' | 'shareAlt';
  iconRight?: 'chevronLeft' | 'chevronRight' | 'info' | 'shareAlt';
  /** Render the item as a button which emits `HIGHLIGHT_MENU_CLICK` when clicked */
  clickable?: boolean;
  /** Subset of HighlightOptions['selectors'] for which this menu item shows */
  selectors?: HighlightOptions['selectors'];
}
```

### Highlight menu

Add a `menu` property to the payload to let users select highlighted elements by clicking them. Each item must include an `id` and a `title`; `selectors` optionally limits the item to specific highlighted elements. Omit the items or set `menu` to an empty array to show the default menu. `hoverStyles` and `focusStyles` are recommended with `menu`.

### `HIGHLIGHT_MENU_CLICK`

```ts
interface ClickEventDetails {
  // Position and dimensions of the element on the page
  top: number;
  left: number;
  width: number;
  height: number;
  // Selector(s) which matched the element
  selectors: string[];
  // Element name, without its attributes or content
  element: {
    localName: string;
    tagName: string;
  };
}

channel.on(HIGHLIGHT_MENU_CLICK, (highlightId: string, itemId: string, details: ClickEventDetails) => {});
```

The highlight `id` and menu item `id` are not a security boundary: any addon, and any page that can post messages to the preview, can emit a `HIGHLIGHT` payload reusing your `id` with any menu item `id`.

## Notes

- Use specific selectors to avoid conflicting with elements used by other addons.
- Pseudo-classes and pseudo-elements (`:hover`, `::before`, etc.) are not supported in custom styles.
- Highlights are automatically removed when the user navigates to a different story.

## Related

- [Measure & Outline](./measure-and-outline.md)
