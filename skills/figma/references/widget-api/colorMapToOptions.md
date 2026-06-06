# colorMapToOptions

Converts a color palette (a map of color names to hex values) into an array of `WidgetPropertyMenuColorSelectorOption` items ready for use in `usePropertyMenu`. **FigJam only.**

## Signature / Usage

```typescript
colorMapToOptions(
  colorPalette: { [key: string]: string }
): WidgetPropertyMenuColorSelectorOption[]
```

```tsx
usePropertyMenu(
  [
    {
      itemType: "color-selector",
      propertyName: "color",
      tooltip: "Color",
      selectedOption: color,
      options: [
        ...colorMapToOptions(figma.constants.colors.figJamBase),
        { option: "#f5427b", tooltip: "Hot Pink" },
      ],
    },
  ],
  ({ propertyName, propertyValue }) => {
    if (propertyName === "color") setColor(propertyValue)
  }
)
```

## Notes

- Only available in **FigJam** widgets.
- Designed to work with `figma.constants.colors.*` palettes (e.g., `figJamBase`, `figJamBaseAlternate`).
- Custom colors can be added alongside the converted options.

## Related

- [usePropertyMenu](./usePropertyMenu.md)
- [figma-figjam-widgets](./figma-figjam-widgets.md)
