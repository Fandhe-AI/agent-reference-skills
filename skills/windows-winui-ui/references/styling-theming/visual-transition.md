# VisualTransition

Defines the animated transition, controlled by a `Storyboard`, that plays between two named `VisualState`s within the same `VisualStateGroup`. Without an explicit `VisualTransition`, state changes happen instantaneously.

## Signature / Usage

```xaml
<VisualStateGroup x:Name="CommonStates">
  <VisualStateGroup.Transitions>
    <!-- Half a second to transition into PointerOver from any state -->
    <VisualTransition To="PointerOver" GeneratedDuration="0:0:0.5"/>
  </VisualStateGroup.Transitions>

  <VisualState x:Name="Normal" />
  <VisualState x:Name="PointerOver">
    <Storyboard>
      <ColorAnimation Storyboard.TargetName="ButtonBrush"
                      Storyboard.TargetProperty="Color" To="Red" />
    </Storyboard>
  </VisualState>
</VisualStateGroup>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| From | `string` | Name of the originating `VisualState` this transition applies to; omit to match any origin state. |
| To | `string` | Name of the destination `VisualState` this transition applies to; omit to match any destination state. |
| GeneratedDuration | `Duration` | Length of the generated interpolation between the states when no explicit `Storyboard` is set on the transition. |
| Storyboard | `Storyboard` | Optional explicit animation to play during the transition, instead of the auto-generated one. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `VisualTransition`). Distinct from `System.Windows.VisualTransition` (WPF).
- Set via the `VisualStateGroup.Transitions` property element — `VisualTransition` is not a direct content-property child of `VisualStateGroup` like `VisualState` is.
- Most default WinUI control templates don't define transitions, so state changes there apply instantly (zero duration).
- A transition can be scoped to a specific `From`/`To` combination, or left open on either end to apply more broadly within the group.

## Related

- [VisualState](./visual-state.md)
- [VisualStateGroup](./visual-state-group.md)
- [VisualStateManager](./visual-state-manager.md)
