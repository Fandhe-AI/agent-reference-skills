# InfoBadge

A small piece of UI (dot, icon, or number) that draws non-intrusive attention to an area of the app, such as a `NavigationViewItem` or any standalone control.

## Signature / Usage

```xaml
<!-- Dot -->
<InfoBadge />

<!-- Icon -->
<InfoBadge>
    <InfoBadge.IconSource>
        <SymbolIconSource Symbol="Sync"/>
    </InfoBadge.IconSource>
</InfoBadge>

<!-- Numeric -->
<InfoBadge x:Name="EmailInfoBadge" Value="{x:Bind numUnreadMail}"/>

<!-- On a NavigationViewItem -->
<NavigationViewItem Content="Inbox" Icon="Mail">
    <NavigationViewItem.InfoBadge>
        <InfoBadge Value="{x:Bind mailBox.NewMailCount, Mode=OneWay}"/>
    </NavigationViewItem.InfoBadge>
</NavigationViewItem>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Value | int | Number displayed; must be a whole integer ≥ 0. Default `-1` (no value = dot/icon type). If set, takes precedence over `IconSource` |
| IconSource | IconSource | Icon shown inside the badge (16px diameter badge); ignored if `Value` is set |
| Style | Style | Preset styles: `{Attention,Informational,Success,Caution,Critical}{Dot,Icon,Value}InfoBadgeStyle` |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` Badge components.
- Three visual types determined by which property is set: dot (neither `Value` nor `IconSource`), icon (`IconSource` set), numeric (`Value` set, takes precedence over `IconSource`).
- `InfoBadge` is a `UIElement` (inherits `Control`) and cannot be used as a shared resource; declare a separate instance per usage site.
- Not meant for critical/urgent messages requiring immediate action — use `ContentDialog` for that, or `InfoBar` for a persistent, dismissible alert.
- Has no built-in screen-reader/UIA support since it isn't focusable; when used outside `NavigationView`, apps must expose accessibility info on the parent element and raise UIA notifications on appearance/change/dismissal manually.

## Related

- [InfoBar](./info-bar.md)
