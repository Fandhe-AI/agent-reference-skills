# VisualState

Represents the visual appearance of a UI element in a specific state, using `Setters` or a `Storyboard` to change property values within a `ControlTemplate` or page.

## Signature / Usage

```xaml
<VisualStateGroup x:Name="CommonStates">
   <VisualState x:Name="Normal"/>
   <VisualState x:Name="PointerOver">
     <Storyboard>
       <ColorAnimation Storyboard.TargetName="BorderBrush"
                       Storyboard.TargetProperty="Color" To="Red" />
     </Storyboard>
   </VisualState>
</VisualStateGroup>
```

```xaml
<!-- StateTriggers: automatically applied, no GoToState call needed -->
<VisualStateGroup>
    <VisualState>
        <VisualState.StateTriggers>
            <AdaptiveTrigger MinWindowWidth="720"/>
        </VisualState.StateTriggers>
        <VisualState.Setters>
            <Setter Target="myPanel.Orientation" Value="Horizontal"/>
        </VisualState.Setters>
    </VisualState>
</VisualStateGroup>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Name (x:Name) | `string` | Identifies the state; required if the state is requested via `GoToState`, and must be unique across the whole template (not just within its group). |
| Setters | `IVector<Setter>` | Discrete property values applied while this state is active. |
| Storyboard | `Storyboard` | Animation defining state-specific property values. |
| StateTriggers | `IVector<StateTriggerBase>` | Conditions (e.g. `AdaptiveTrigger`) under which this state is applied automatically without a `GoToState` call. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `VisualState`). Distinct from `System.Windows.VisualState` (WPF).
- Must be declared inside a parent `VisualStateGroup`; `States` is `VisualStateGroup`'s XAML content property, so `VisualState` elements can appear as its direct children.
- An empty `VisualState` (name only, no `Storyboard`/`Setters`) is a common "reset to default template values" state within a group.
- With `StateTriggers`, no empty reset state is needed — property modifications are automatically removed once the trigger condition is no longer met.
- Use `x:Name`, not the unprefixed `Name` attribute, to name a state — `Name` is a read-only property for run-time introspection only.

## Related

- [VisualStateGroup](./visual-state-group.md)
- [VisualStateManager](./visual-state-manager.md)
- [VisualTransition](./visual-transition.md)
