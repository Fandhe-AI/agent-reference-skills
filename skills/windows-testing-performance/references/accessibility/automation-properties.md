# AutomationProperties (attached properties)

`Microsoft.UI.Xaml.Automation.AutomationProperties` exposes a set of attached properties you set on any XAML element to provide the name, description, and structural metadata that UI Automation clients (screen readers, test tools) read.

## Signature / Usage

```xaml
<!-- Accessible name for a non-text element -->
<Image
    Source="Assets/product.png"
    AutomationProperties.Name="Customer using the product" />

<!-- Label association instead of duplicating text -->
<StackPanel Orientation="Horizontal" Spacing="8">
    <TextBlock x:Name="firstNameLabel" Text="First name" />
    <TextBox
        x:Name="firstNameTextBox"
        AutomationProperties.LabeledBy="{Binding ElementName=firstNameLabel}" />
</StackPanel>

<!-- Supplemental info beyond the name -->
<Button AutomationProperties.Name="Special"
        AutomationProperties.HelpText="This is a special button." />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Name` | `string` | The accessible name announced by a screen reader. Required for images, icon-only buttons, and other elements without inner text. Don't repeat role words (e.g. "button") — role comes from `LocalizedControlType` and many AT tools append it automatically. Max 2048 characters. |
| `HelpText` | `string` | Supplemental accessible description shown on demand (in Narrator, via Caps Lock+F) rather than as part of the default announcement. Keep `Name` concise and put extra explanation here. |
| `LabeledBy` | `DependencyObject` | Associates an element (typically an input) with a visible label element, so the label's `Name` becomes the input's accessible name. Preferred over duplicating label text. |
| `AutomationId` | `string` | A UI-language-independent identifier for automated test scripts. Must be unique among sibling elements (not necessarily desktop-wide), stable within one app version, but not guaranteed stable across releases. Not mandatory, but recommended for testability. |
| `LiveSetting` | `AutomationLiveSetting` (`Off` \| `Polite` \| `Assertive`) | Marks a region as a live region so assistive technology announces content changes without requiring focus to move there. Default peer behavior returns `Off`; override `GetLiveSettingCore` in a custom peer to change it. |
| `AccessibilityView` | `AccessibilityView` (`Raw` \| `Control` \| `Content` \| `Default`) | Controls how an element is exposed across the UI Automation raw/control/content tree views. Set to `Raw` to exclude low-value composed-UI nodes (e.g. template parts) from the primary views most assistive technologies use. |
| `IsDialog` | `bool` | Indicates the automation element represents a dialog window. |
| `AccessKey` | `string` | Exposes mnemonic-shortcut metadata (e.g. `"Alt+P"`) to UI Automation so assistive technologies can announce it. Does not implement the keyboard behavior itself. |
| `AcceleratorKey` | `string` | Exposes command-shortcut metadata (e.g. `"Ctrl+P"`) to UI Automation. Does not implement the keyboard behavior itself — pair with a `KeyboardAccelerator` or key handler. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation.AutomationProperties`). Not to be confused with WPF's `System.Windows.Automation.AutomationProperties`, which is API-compatible in concept but a distinct assembly/namespace.
- Many controls derive a default accessible name from inner text automatically (`TextBlock`, `RichTextBlock`, `TextBox`, and `ContentControl` subclasses via a `ToString` strategy on `Content`) — you only need to set `Name` explicitly when there is no usable inner text (images, icon-only buttons).
- Attached-property localization uses a qualified resource key, e.g. `MediumButton.[using:Microsoft.UI.Xaml.Automation]AutomationProperties.Name`.
- For heading/landmark structural properties (`HeadingLevel`, `PositionInSet`, `SizeOfSet`, `LandmarkType`), see the dedicated landmarks/headings page.

## Related

- [UI Automation overview](./ui-automation-overview.md)
- [Landmarks and headings](./landmarks-and-headings.md)
- [Custom automation peers](./automation-peers.md)
- [Keyboard accessibility](./keyboard-accessibility.md)
