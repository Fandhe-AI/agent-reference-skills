# Measure & Outline

Two complementary toolbar tools for visually inspecting CSS layout, spacing, and alignment inside Storybook stories.

## Overview

**Measure** — hover over elements to see their dimensions, margin, padding, and border sizes rendered as an overlay (similar to browser DevTools box-model view).

**Outline** — toggles CSS outlines on all UI elements to reveal alignment and spacing issues at a glance.

## Configuration

### Parameters

Both features accept a `disable` parameter under their own namespace. The parameter can be set at project, component, or story level.

```typescript
// Disable at story level
export const MyStory: Story = {
  parameters: {
    measure: { disable: true },
    outline: { disable: true },
  },
};
```

| Namespace | Parameter | Type | Description |
|-----------|-----------|------|-------------|
| `measure` | `disable` | boolean | Disables the measure overlay |
| `outline` | `disable` | boolean | Disables the outline overlay |

## Usage

| Feature | Toolbar action | Keyboard shortcut |
|---------|---------------|-------------------|
| Measure | Click the measure icon | `m` |
| Outline | Click the outline icon | — |

- **Measure**: After enabling, hover over any element to inspect its box model.
- **Outline**: Toggle to draw outlines around every element; toggle again to remove.

## Notes

- Both features are enabled by default as part of Storybook Essentials.
- Particularly useful when debugging composite components and page layouts without opening browser DevTools.
- Disabling globally (in `main.ts` essentials config) removes the toolbar buttons entirely.

## Related

- [Highlight](./highlight.md)
- [Viewport](./viewport.md)
