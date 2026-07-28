# Access keys (AccessKeyManager)

Alt + alphanumeric shortcuts ("mnemonics") that move keyboard focus to specific UI, shown as "keytip" badges when Alt is pressed.

## Signature / Usage

```xaml
<Button Content="Accept" AccessKey="A" Click="AcceptButtonClick" />

<CommandBar x:Name="MainCommandBar" AccessKey="M">
    <AppBarButton AccessKey="R" Icon="Refresh" Label="Refresh" IsAccessKeyScope="True">
        <AppBarButton.Flyout>
            <MenuFlyout>
                <MenuFlyoutItem AccessKey="A" Text="Refresh A" />
            </MenuFlyout>
        </AppBarButton.Flyout>
    </AppBarButton>
</CommandBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AccessKey` | `string` (attached, `UIElement`/`TextElement`) | The access key sequence (1-2 alphanumeric characters, pressed sequentially after Alt). |
| `IsAccessKeyScope` | `bool` | Marks the element as a new access key scope (children get a fresh set of key combinations). |
| `KeyTipPlacementMode` | `KeyTipPlacementMode` | `Top`/`Bottom`/`Right`/`Left`/`Hidden`/`Center`/`Auto` — keytip badge position. |
| `KeyTipHorizontalOffset` / `KeyTipVerticalOffset` | `double` | Fine-grained keytip position offset (not usable with `Auto` placement). |
| `AutomationProperties.AccessKey` | attached property | Exposes the `AccessKey` value to Narrator/UIA clients. |

## Notes

- Namespace: The access key infrastructure is implemented by `AccessKeyManager` in `Microsoft.UI.Xaml.Input`; most usage is declarative via the `AccessKey` attached property, not the manager class directly.
- Access keys are primarily for accessibility and are documented in-UI via keytips; distinct from keyboard accelerators (Ctrl + key, memorized/undocumented in UI) — see [Keyboard accelerators](./keyboard-accelerators.md).
- Single-character access keys are automatically usable with Alt+key without displaying keytips first.
- Duplicate access keys within a scope: the first element added to the visual tree wins; collisions with a shared prefix (e.g. "A", "A1") resolve to the single-character one.
- Access keys should be localized like any other UI string (via `x:Uid` resources).

## Related

- [Keyboard accelerators](./keyboard-accelerators.md)
- [Keyboard input](./keyboard-input.md)
- [Focus manager](./focus-manager.md)
