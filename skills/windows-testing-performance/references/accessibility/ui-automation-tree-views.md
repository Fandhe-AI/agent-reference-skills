# UI Automation tree views (raw, control, content)

UI Automation exposes an app's UI to assistive technologies and inspection tools through three overlapping tree views built from the same underlying automation elements. Each view trades completeness against usability, and `AutomationProperties.AccessibilityView` is the property that moves an individual element between them.

## Signature / Usage

```xaml
<!-- Exclude a low-value composed-UI element (e.g. a template part) from
     the control/content views that assistive technology mostly relies on -->
<Border AutomationProperties.AccessibilityView="Raw">
    <TextBlock Text="Decorative structural wrapper" />
</Border>
```

## Options / Props

| View | Contents | Typical consumer |
|------|----------|-------------------|
| Raw | Nearly every automation element in the UI, including structural/template elements with no user-facing meaning. | Diagnostic tools, low-level tree traversal. |
| Control | Interactive controls and structural navigation points; excludes most raw-only noise. Most `Control`-derived elements appear here by default. | The view most assistive technologies (Narrator) and inspection tools (Accessibility Insights, Inspect.exe) rely on by default — the most useful balance between completeness and usability. |
| Content | Elements that communicate user-facing content (text, images, values) rather than pure structure. | Tools/AT that read or summarize on-screen information. |

## Notes

- Set per element via `AutomationProperties.AccessibilityView`, whose value is the `AccessibilityView` enum with exactly three members — `Raw` (0), `Control` (1), `Content` (2, documented as the default behavior when the property is left unset; there is no separate `Default` member) — see AutomationProperties (attached properties). Placing a composed-UI element in `Raw` keeps it available for diagnostic and traversal scenarios while excluding it from the control/content views most assistive technologies use; inspect `generic.xaml` control templates for real-world examples.
- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation.*`). WPF's unrelated `System.Windows.Automation` namespace models the same raw/control/content distinction through `TreeWalker.RawViewWalker` / `ControlViewWalker` / `ContentViewWalker`, not through this attached property.
- **AccScope** visualizes the UI Automation tree (as a list or visual overlay) to inspect these views directly during early design and control-template validation — see Accessibility testing for the full inspection-tool comparison.

## Related

- [AutomationProperties (attached properties)](./automation-properties.md)
- [UI Automation overview](./ui-automation-overview.md)
- [Accessibility testing](./accessibility-testing.md)
