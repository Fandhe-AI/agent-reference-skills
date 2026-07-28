# Landmarks and headings

Landmarks and headings give assistive technologies a predictable navigation model for complex UI, letting screen reader users jump between major regions (landmarks) and then drill into subsection content (headings) instead of traversing every intermediate control.

## Signature / Usage

```xaml
<!-- Mark a container as a navigational region -->
<StackPanel AutomationProperties.LandmarkType="Navigation">
    ...
</StackPanel>

<!-- Mark an element as a heading at a given level -->
<TextBlock Text="Vision" AutomationProperties.HeadingLevel="Level2" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AutomationProperties.LandmarkType` | `AutomationLandmarkType` | Identifies the landmark type of a UI container (e.g. `Main`, `Navigation`, `Search`, `Form`). The container should encapsulate the elements belonging to that navigational region. |
| `AutomationProperties.LocalizedLandmarkType` | `string` | Overrides the label announced for a landmark. Required for custom landmark types; optional for predefined types, which get built-in naming. |
| `AutomationProperties.HeadingLevel` | `AutomationHeadingLevel` (`Level1`–`Level9`, `None`) | Marks an element as a heading and assigns its nesting level. Keep levels semantically consistent so users can infer document structure. |
| `AutomationProperties.PositionInSet` | `int` | Reports an item's 1-based position within a logical set (e.g. list item 3 of 10), for virtualized or custom collections where UI Automation cannot infer set size automatically. |
| `AutomationProperties.SizeOfSet` | `int` | Reports the total number of items in the logical set that `PositionInSet` refers to. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation.AutomationProperties`).
- This model mirrors established web accessibility patterns (ARIA landmarks/headings, HTML headings) — the goal is the same: navigable structure.
- Support F6-based pane traversal for apps with multiple major regions (see Keyboard accessibility) as a keyboard-first complement to landmarks; F6 targets don't need to map 1:1 to landmarks.
- `PositionInSet`/`SizeOfSet` are typically needed for virtualized lists or custom item containers where the automation tree cannot count members directly.

## Related

- [AutomationProperties (attached properties)](./automation-properties.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
- [UI Automation overview](./ui-automation-overview.md)
