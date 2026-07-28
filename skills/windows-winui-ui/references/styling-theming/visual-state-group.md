# VisualStateGroup

Contains a set of mutually exclusive `VisualState` objects and the `VisualTransition` objects used to animate between them. Declared under the `VisualStateManager.VisualStateGroups` attached property at the root of a `ControlTemplate`.

## Signature / Usage

```xaml
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
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Name (x:Name) | `string` | Group identifier, unique within the template (e.g. conventional group name `"CommonStates"`). Not used with `GoToState` — only individual `VisualState` names are. |
| States | `IVector<VisualState>` | The group's mutually exclusive states; XAML content property, so `VisualState` children can be declared directly inside the group. |
| Transitions | `IVector<VisualTransition>` | Animated transitions between named states, set via the `VisualStateGroup.Transitions` property element. |

## Notes

- Package: `Microsoft.UI.Xaml` (WinUI 3, `VisualStateGroup`). Distinct from `System.Windows.VisualStateGroup` (WPF).
- States within one group are mutually exclusive — a control is in exactly one state per group at a time. Independent, simultaneously-active concerns (e.g. focus vs. drop-down-open) should be modeled as separate groups (`"FocusStates"`, `"DropDownStates"`), not combined in one.
- With `StateTriggers`, place the `VisualStateGroup` as the first child of the template root for triggers to activate automatically.
- Trigger precedence when multiple `StateTriggerBase` are active: custom `StateTriggerBase` > `AdaptiveTrigger` (`MinWindowWidth`) > `AdaptiveTrigger` (`MinWindowHeight`); ties go to the first declared in markup.

## Related

- [VisualState](./visual-state.md)
- [VisualStateManager](./visual-state-manager.md)
- [VisualTransition](./visual-transition.md)
