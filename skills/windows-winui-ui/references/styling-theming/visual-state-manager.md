# VisualStateManager

Manages visual states and transitions between them for controls. Hosts the `VisualStateManager.VisualStateGroups` attached property (how visual states are defined in a `ControlTemplate`) and the static `GoToState` method used to request a state change.

## Signature / Usage

```xaml
<ControlTemplate TargetType="Button">
  <Grid>
    <VisualStateManager.VisualStateGroups>
      <VisualStateGroup x:Name="CommonStates">
        <VisualStateGroup.Transitions>
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
    </VisualStateManager.VisualStateGroups>
    <Grid.Background>
      <SolidColorBrush x:Name="ButtonBrush" Color="Green"/>
    </Grid.Background>
  </Grid>
</ControlTemplate>
```

```csharp
// Control code requests a state transition by name
string state = (Window.Current.Bounds.Width > 768) ? "DefaultLayout" : "Below768Layout";
VisualStateManager.GoToState(this, state, false);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| VisualStateManager.VisualStateGroups | attached property, `IVector<VisualStateGroup>` | Collection of `VisualStateGroup` elements defined at the root of a `ControlTemplate` (or other `FrameworkElement`). |
| GoToState(Control, string, bool) | static method | Transitions `control` to the named `VisualState`. Third argument enables/disables the `VisualTransition` animation. |
| CustomVisualStateManager | attached property | Advanced: assigns a custom `VisualStateManager` subclass overriding `GoToStateCore` for custom transition logic. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `VisualStateManager`). Distinct from `System.Windows.VisualStateManager` (WPF).
- Most developers only need `VisualStateManager.VisualStateGroups` (declared in a `ControlTemplate`) and `GoToState` (called from control logic, not usually app code).
- When replacing a built-in control's `ControlTemplate`, you must reproduce every named `VisualState` the control's code calls via `GoToState` (e.g. `"Checked"` for `CheckBox`) — a missing state doesn't throw but silently drops visual feedback.
- Applies only to `Control` subclasses; to drive visual states on non-`Control` UI, wrap it in a `UserControl` (which is a `Control`) and call `GoToState` on that.

## Related

- [VisualState](./visual-state.md)
- [VisualStateGroup](./visual-state-group.md)
- [VisualTransition](./visual-transition.md)
- [ControlTemplate](./control-template.md)
