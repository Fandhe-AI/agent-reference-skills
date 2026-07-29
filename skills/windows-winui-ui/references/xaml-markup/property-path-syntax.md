# Property-path syntax

A string mini-language for identifying a nested property, used as `Binding.Path`/the `PropertyPath` class for data binding, and as `Storyboard.TargetProperty` for animation targeting. A dot (`.`) steps from an object to a property of that object; parentheses wrap attached-property and sub-property names so the embedded dot isn't parsed as a step; square brackets index a collection.

## Signature / Usage

```syntax
"{Binding Path=Customer.Address.StreetAddress1}"
```

```xaml
<!-- Indexer: ordered list by integer, dictionary by unquoted string key -->
"Teams[1].Players[Smith]"

<!-- Attached property: parenthesize because the name already contains a dot -->
"(Canvas.ZIndex)"

<!-- Animation targeting: sub-property of an attached property, then a nested property on its value -->
<DoubleAnimation Storyboard.TargetName="rect"
                 Storyboard.TargetProperty="(UIElement.RenderTransform).(CompositeTransform.TranslateX)"
                 To="200" Duration="0:0:1"/>
```

## Notes

- Data binding: all properties on the path must be public; the end (last) property must be public and mutable, and read/write if used as the `Path` of a `TwoWay` binding.
- Animation targeting: the path is evaluated relative to the object named by `Storyboard.TargetName`; the end property must be public, read-write, a dependency property, and of an animatable type (`Color`, `Double`, `Point`, or via `ObjectAnimationUsingKeyFrames`).
- Indexers can appear mid-path (e.g. `(Control.Background).(GradientBrush.GradientStops)[0].(GradientStop.Color)`). For **animation targeting** an indexer can never be the end step, since a collection isn't a value that can be animated. For **data binding** an indexer can be the end step — e.g. `"Teams[1].Players[Smith]"` is a valid binding path.
- `PropertyPath` (`Microsoft.UI.Xaml.PropertyPath`) has no default constructor — construct it with `new PropertyPath(string)` using this same string syntax when building a binding in code.
- A failed path resolution in data binding silently falls back to a blank/default value rather than throwing; use Visual Studio's binding debug output to isolate which step failed.

## Related

- [x:Bind markup extension](./x-bind-markup-extension.md)
- [Attached properties overview](./attached-properties-overview.md)
