# usePropertyMenu

Declares the property menu shown when a user selects the widget. Supports actions, dropdowns, color selectors, separators, and links.

## Signature / Usage

```typescript
usePropertyMenu(
  items: WidgetPropertyMenuItem[],
  onChange: (event: WidgetPropertyEvent) => void | Promise<void>
): void
```

```tsx
const [color, setColor] = useSyncedState("color", "#ff0000")

usePropertyMenu(
  [
    { itemType: "action", propertyName: "reset", tooltip: "Reset" },
    { itemType: "separator" },
    {
      itemType: "color-selector",
      propertyName: "color",
      tooltip: "Color",
      selectedOption: color,
      options: [{ option: "#ff0000", tooltip: "Red" }, { option: "#0000ff", tooltip: "Blue" }],
    },
    {
      itemType: "dropdown",
      propertyName: "size",
      tooltip: "Size",
      selectedOption: "M",
      options: [{ option: "S", label: "Small" }, { option: "M", label: "Medium" }],
    },
    { itemType: "link", propertyName: "docs", tooltip: "Docs", href: "https://example.com" },
  ],
  ({ propertyName, propertyValue }) => {
    if (propertyName === "color") setColor(propertyValue!)
    if (propertyName === "reset") setColor("#ff0000")
  }
)
```

## Options / Props

| `itemType` | Key fields | Description |
|------------|-----------|-------------|
| `"action"` | `propertyName`, `tooltip`, `icon?` | Simple clickable button |
| `"separator"` | — | Visual divider |
| `"color-selector"` | `propertyName`, `tooltip`, `selectedOption`, `options` | Color picker with presets |
| `"dropdown"` | `propertyName`, `tooltip`, `selectedOption`, `options` | Selection list |
| `"link"` | `propertyName`, `tooltip`, `href` | External URL link |

`WidgetPropertyEvent` fields:

| Field | Type | Description |
|-------|------|-------------|
| `propertyName` | `string` | The `propertyName` of the triggered item |
| `propertyValue` | `string \| undefined` | Selected value (for `color-selector`, `dropdown`) |

## Notes

- The property menu is best for **secondary actions** (settings, formatting) that cannot be done directly on the widget surface.
- `onChange` may return a `Promise`; the widget stays alive until it resolves.
- Use `colorMapToOptions` (FigJam only) to populate `color-selector` options from official FigJam palettes.

## Related

- [colorMapToOptions](./colorMapToOptions.md)
- [useSyncedState](./useSyncedState.md)
- [handling-user-events](./handling-user-events.md)
