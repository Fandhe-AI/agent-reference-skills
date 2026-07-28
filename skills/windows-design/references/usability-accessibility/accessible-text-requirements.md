# Accessible text requirements

Best practices for accessible text: contrast, UI Automation text roles, auto-suggest accessibility, text in graphics, and text scaling.

## Signature / Usage

Use the correct text element for the correct role: static text in `TextBlock`/`RichTextBlock` (role **Text**, not keyboard-focusable, not normally a tab stop but readable by screen readers via reading modes), editable text in `TextBox`/`RichEditBox` (role **Edit**).

```xaml
<TextBlock Text="Default text scaling (IsTextScaleFactorEnabled = true)."
    Style="{StaticResource BodyTextBlockStyle}"/>

<TextBlock Text="Text scaling disabled."
    Style="{StaticResource BodyTextBlockStyle}" IsTextScaleFactorEnabled="False"/>
```

React to system text-size changes for non-WinUI-text-control scenarios:

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
        // Apply updates for UI that depends on text scale.
    });
}
```

## Options / Props

| Property | Type | Description |
|------|-------------|------|
| `IsTextScaleFactorEnabled` | bool | Defaults to `true`; when enabled, text scales with the system **Make text bigger** setting (smaller `FontSize` values are affected more). Available on `ContentPresenter`, `Control`, `FontIcon`, `RichTextBlock`, `TextBlock`, `TextElement`, and derived types |
| `AutomationProperties.Name` | string | Required on text rendered as an `Image`, `Path`, or `Glyphs` since embedded/vector text is not automatically readable by assistive technology |
| `AutomationProperties.ControlledPeers` | UIElement collection | Associates a `TextBox` with a custom suggestion list in the UIA tree for accessible auto-suggest |

## Notes

- Minimum contrast ratio for visible text against its background: **4.5:1**, per W3C WCAG 2.0 technique G18. Excludes logos, incidental text (e.g. in inactive UI), and purely decorative text.
- Do not treat high-contrast mode as the primary mitigation for low readability — base default-theme text on sufficient contrast.
- Contrast evaluation does not account for hue perception; red-on-green can be unreadable for color-vision-deficient users even at equal luminance.
- `AutosuggestBox` already wires the required UIA association; custom `TextBox` + list implementations must set `ControlledPeers` and raise `SelectionItemPatternOnElementSelected` (default selection) or `LayoutInvalidated` (no default selection) on list updates.
- `Magnifier`, **Settings > System > Display > Scale and layout**, and **Settings > Ease of access > Display > Make text bigger** are the three system mechanisms text should remain legible under.
- `TextBlock`, `TextBox`, `RichTextBlock`, `RichEditBox`, `AutosuggestBox`, `Image`, `Path`, `Glyphs` referenced here are `Microsoft.UI.Xaml.Controls` (WinUI 3) types, distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.

## Related

- [Accessibility overview](./accessibility-overview.md)
- [Contrast themes](./high-contrast-themes.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
