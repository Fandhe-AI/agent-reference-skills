# Template settings classes

`*TemplateSettings` classes (e.g. `ComboBoxTemplateSettings`, `ToggleSwitchTemplateSettings`) expose read-only, control-calculated values — sizes, offsets, animation from/to pairs — for use inside a custom `ControlTemplate` via `{TemplateBinding}`-style relative-source bindings, so re-templated parts stay consistent with the control's internal logic.

## Signature / Usage

```xaml
<Ellipse x:Name="E1"
         Width="{Binding RelativeSource={RelativeSource TemplatedParent}, Path=TemplateSettings.EllipseDiameter}"
         Height="{Binding RelativeSource={RelativeSource TemplatedParent}, Path=TemplateSettings.EllipseDiameter}"
         Fill="{TemplateBinding Foreground}"/>
```

## Notes

- Older `*TemplateSettings` classes (e.g. `ComboBoxTemplateSettings`, `GridViewItemTemplateSettings`, `ListViewItemTemplateSettings`, `ToggleSwitchTemplateSettings`, `ToolTipTemplateSettings`) live in `Microsoft.UI.Xaml.Controls.Primitives`, but the namespace split isn't universal — several newer controls' `*TemplateSettings` classes (e.g. `ProgressRingTemplateSettings`, `ProgressBarTemplateSettings`, `NavigationViewTemplateSettings`, `ExpanderTemplateSettings`) live in `Microsoft.UI.Xaml.Controls` instead. All of them derive from `DependencyObject`; a control exposes its instance via a read-only `TemplateSettings` property (e.g. `ComboBox.TemplateSettings`, `ProgressRing.TemplateSettings`).
- The properties are read-only and intended for XAML-only consumption (bindings/animations inside a `ControlTemplate`), not for code to set — the dependency-property identifiers backing them aren't public API.
- Some properties come in **From**/**To** pairs used as storyboard animation bounds (e.g. `ComboBoxTemplateSettings.DropDownOpenedHeight`/`DropDownClosedHeight`), so re-templated parts referencing them animate in sync with the control's built-in transitions.
- When binding a `TemplateSettings` value to a property of a different type, add an `IValueConverter` — there's no implicit conversion.

## Related

- [TemplateBinding markup extension](./templatebinding-markup-extension.md)
- [RelativeSource markup extension](./relativesource-markup-extension.md)
