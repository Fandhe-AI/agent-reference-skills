# Accessible text requirements

Text-related accessibility covers three core requirements: correct text-element role, sufficient color contrast, and support for system text-scaling settings.

## Signature / Usage

```xaml
<!-- Respect the default (enabled) text-scale behavior -->
<TextBlock Text="Scales with the system Make text bigger setting."
    Style="{StaticResource BodyTextBlockStyle}"/>

<!-- Opt out of text scaling only when necessary -->
<TextBlock Text="Fixed size regardless of system text-scale setting."
    Style="{StaticResource BodyTextBlockStyle}" IsTextScaleFactorEnabled="False"/>
```

```csharp
private readonly Windows.UI.ViewManagement.UISettings _uiSettings = new();

public MainWindow()
{
    InitializeComponent();
    _uiSettings.TextScaleFactorChanged += UISettings_TextScaleFactorChanged;
}

private void UISettings_TextScaleFactorChanged(Windows.UI.ViewManagement.UISettings sender, object args)
{
    DispatcherQueue.TryEnqueue(() =>
    {
        var scale = sender.TextScaleFactor; // double in [1, 2.25]
        // Apply updates to UI that depends on text scale.
    });
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Minimum contrast ratio | — | Visible text must meet **4.5:1** luminance contrast against its background (WCAG 2.0 G18). Exceptions: logos, inactive/disabled UI, and purely decorative text that conveys no information. |
| `TextBlock` role | `AutomationControlType.Text` | Static, non-editable text. |
| `TextBox` role | `AutomationControlType.Edit` | Editable text; putting static text in a `TextBox` misreports both role and interaction model to assistive technology. |
| `RichTextBlock` / `RichTextBlockOverflow` role | `AutomationControlType.Text` | Static rich text. |
| `RichEditBox` role | `AutomationControlType.Edit` | Editable rich text. |
| `TextBlock.IsTextScaleFactorEnabled` (also on `Control`, `ContentPresenter`, `FontIcon`, `RichTextBlock`, `TextElement` and derived classes) | `bool` | Default `true`. When enabled, text scales automatically with the system **Make text bigger** setting (smaller `FontSize` values scale more than larger ones). Disable only when necessary. |
| `Windows.UI.ViewManagement.UISettings.TextScaleFactor` | `double` (`[1, 2.25]`) | Current system text-scale factor; read this and handle `TextScaleFactorChanged` to coordinate non-text UI (e.g. related graphics) with text scale. |
| `AutomationProperties.ControlledPeers` | attached property | Associates an input (e.g. a custom auto-suggest `TextBox`) with the suggestion list it controls in the UIA tree, so Narrator can announce list presence/count/selection. |

## Notes

- Applies to WinUI 3 / Windows App SDK text controls (`Microsoft.UI.Xaml.Controls.TextBlock`/`TextBox`/`RichTextBlock`/`RichEditBox`).
- Contrast evaluation is deterministic and ignores hue perception — red text on green can fail for color-vision-deficient users even where luminance contrast looks adequate; don't rely on high-contrast mode alone as your text-contrast mitigation.
- Avoid embedding meaningful text inside an `Image`/`Path`/`Glyphs` graphic; if unavoidable, set `AutomationProperties.Name` to equivalent content.
- For custom auto-suggest implementations (not the built-in `AutosuggestBox`, which already wires this), fire `AutomationEvents.SelectionItemPatternOnElementSelected` when there's a default list selection, or `AutomationEvents.LayoutInvalidated` when the list updates without one.
- `Settings > Ease of access > Display > Make text bigger` scales supporting controls app/screen-wide; `Settings > System > Display > Scale and layout` is separate device-level DPI scaling; validate both.

## Related

- [Contrast themes](./high-contrast-themes.md)
- [AutomationProperties (attached properties)](./automation-properties.md)
- [Accessibility checklist](./accessibility-checklist.md)
