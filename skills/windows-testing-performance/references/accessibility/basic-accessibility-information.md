# Expose basic accessibility information (name, role, value)

Accessibility fundamentals map to name, role, and value: this is the guide-level workflow for making sure every meaningful element exposes them, on top of the `AutomationProperties` attached-property surface itself. It covers where an accessible name comes from by default, when to override it, and how to keep it correct through localization and data binding.

## Signature / Usage

```xaml
<!-- Name from inner text: TextBlock/RichTextBlock/TextBox/ContentControl need no
     explicit AutomationProperties.Name — the visible text is promoted automatically -->
<TextBlock Text="Mount Snoqualmie Skiing" />

<!-- Image with no usable inner text: caption + LabeledBy instead of duplicating strings -->
<StackPanel Spacing="8">
    <Image
        x:Name="heroImage"
        Source="Assets/snoqualmie-NF.jpg"
        AutomationProperties.LabeledBy="{Binding ElementName=heroCaption}" />
    <TextBlock x:Name="heroCaption" Text="Mount Snoqualmie Skiing" />
</StackPanel>
```

## Options / Props

| Element / scenario | Accessible-name behavior |
| --- | --- |
| `TextBlock`, `RichTextBlock`, `TextBox` | Default name comes from the visible text content (name from inner text) — no `AutomationProperties.Name` needed for the common case. |
| `ContentControl` subclasses | Default name is derived by evaluating `Content` with an iterative `ToString` strategy, so bound/composed content still produces a name automatically. |
| Buttons and links | Default name follows the same inner-text rule as above; for icon-only buttons (no visible text), set `AutomationProperties.Name` to a text equivalent of the action. |
| Images / non-text content | No inner text exists to derive from — set `AutomationProperties.Name` directly, or associate a visible caption via `AutomationProperties.LabeledBy` so the spoken label stays in sync with on-screen text. Purely decorative/structural visuals are the exception and generally should not be named. |
| Dynamically/data-bound content (list/item templates) | Names are often resolved from runtime data rather than static XAML — verify each generated item has a meaningful name *after* binding completes, and set/update accessibility properties programmatically if the template composition needs it. |
| Long or auto-generated names | UI Automation enforces a 2048-character maximum for the accessible name; automatic name generation (inner text / `ToString`) is truncated if it would exceed that limit. |

## Notes

- **Role and value** come from each control's built-in `AutomationPeer`, not from a name-like attached property you set yourself: roles map to `AutomationControlType` and are surfaced through the peer; only controls with value semantics expose a UI Automation value (e.g. `TextBox` implements `IValueProvider` via `TextBoxAutomationPeer`). Inspect these with UI Automation tools or the control's `AutomationPeer` documentation rather than authoring them the way you author `Name`.
- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation`). Distinct in scope from AutomationProperties (attached properties): that page is the attached-property API surface (`Name`, `HelpText`, `LabeledBy`, etc.); this page is the guide-level workflow for deciding when the default (automatic) name is enough and when to override it.
- Localize accessible names with the same rigor as visible UI text: drive `AutomationProperties.Name` from localization resources via the `x:Uid` directive rather than hard-coded strings. Attached properties use a qualified resource-key syntax to target them per element — e.g. for an element named `MediumButton`, the resource key is `MediumButton.[using:Microsoft.UI.Xaml.Automation]AutomationProperties.Name`.
- If `AutomationProperties.Name` is set explicitly, don't repeat role/type words (e.g. "button") in it — role/type comes from `LocalizedControlType`, and many assistive technologies append it automatically, producing output like "button button" if duplicated.
- **AccScope** visualizes the UI Automation tree (as a list or overlay) and is Narrator-focused, making it useful throughout the lifecycle — including early design and control-template validation — to verify how names are sourced and how elements are grouped/ordered for spoken output, before issues surface in later manual testing.
- Test with a screen reader early and often rather than only near release: repeated passes surface missing/misleading accessible names, incorrect control exposure, and navigation issues while the UI is still cheap to change. See Accessibility testing for the full manual/automated workflow.

## Related

- [AutomationProperties (attached properties)](./automation-properties.md)
- [UI Automation overview](./ui-automation-overview.md)
- [Accessibility testing](./accessibility-testing.md)
- [Landmarks and headings](./landmarks-and-headings.md)
