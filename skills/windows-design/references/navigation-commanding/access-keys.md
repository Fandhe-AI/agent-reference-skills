# Access keys

Alt + alphanumeric mnemonics (typically pressed sequentially) that let users quickly navigate and interact with an app's visible UI from the keyboard instead of a pointer. Pressing Alt shows *keytips* — badges next to controls that support access keys.

## Signature / Usage

```xaml
<Button Content="Accept" AccessKey="A" Click="AcceptButtonClick" />
```

```xaml
<!-- Scoping: "R" opens Refresh's own scope, "A"-"D" only apply within it -->
<AppBarButton AccessKey="R" Icon="Refresh" Label="Refresh" IsAccessKeyScope="True">
    <AppBarButton.Flyout>
        <MenuFlyout>
            <MenuFlyoutItem AccessKey="A" Text="Refresh A" />
            <MenuFlyoutItem AccessKey="B" Text="Refresh B" />
        </MenuFlyout>
    </AppBarButton.Flyout>
</AppBarButton>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AccessKey | string | The access key sequence for the control; also the keyboard shortcut and keytip content when a single character |
| IsAccessKeyScope | bool | Marks the element as the owner of an access key scope, reducing the number of visible keytips at once |
| KeyTipPlacementMode | enum | `Top`, `Bottom`, `Right`, `Left`, `Hidden`, `Center`, or `Auto` |
| KeyTipHorizontalOffset / KeyTipVerticalOffset | double | Fine-grained keytip position offsets (not usable with `Auto` placement) |
| AutomationProperties.AccessKey | attached property | Read by Narrator/accessibility clients |

### Notation and display convention

- Displayed to users as floating **keytip** badges next to the owning control, shown only while Alt is held/pressed.
- Single-character access keys double as an automatic Alt+key shortcut (e.g. Alt+F opens File without needing keytips shown first).
- Choose access keys using: a single character where possible, well-known precedents (F for File, H for Home), the first letter of the command name (or a close/distinctive consonant/vowel if taken), and avoid ambiguous characters like "I"/"1" or "O"/"0".

## Notes

- Package: `Microsoft.UI.Xaml.UIElement.AccessKey` / `IsAccessKeyScope` (WinUI 3).
- Distinguished from **keyboard accelerators** (simultaneous Ctrl/Shift shortcuts that invoke actions from anywhere) — see [Keyboard accelerators](./keyboard-accelerators.md). Access keys are sequential Alt-mnemonics scoped to visible on-screen UI.
- Scope access keys (via `IsAccessKeyScope`) when many elements are on screen at once, to reduce cognitive load; duplicate access keys are resolved by processing only the first element added to the visual tree.

## Related

- [Keyboard accelerators](./keyboard-accelerators.md)
- [Commanding](./commanding.md)
