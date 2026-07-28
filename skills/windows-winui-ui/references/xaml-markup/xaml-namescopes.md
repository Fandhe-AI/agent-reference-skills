# XAML namescopes

A XAML namescope stores relationships between the XAML-defined names of objects (`x:Name`) and their runtime instance equivalents.

## Signature / Usage

```xaml
<Page.Resources>
  <ControlTemplate x:Key="MyTemplate">
    ...
    <TextBlock x:Name="MyTextBlock" />
  </ControlTemplate>
</Page.Resources>
<StackPanel>
  <SomeControl Template="{StaticResource MyTemplate}" />
  <SomeControl Template="{StaticResource MyTemplate}" />
</StackPanel>
```

## Notes

- Each object element with a `Name`/`x:Name` generates an internal field, populated via `FindName` inside the generated `InitializeComponent` method (visible in the `.g` generated files under `/obj`).
- C++/CX apps don't get a backing field for the root element of a XAML file; use `FindName` + `Parent` traversal instead.
- **Templates define their own discrete namescope**, independent of the page. Applying the same `ControlTemplate`/`DataTemplate` multiple times does not cause name collisions, because each instantiation gets its own namescope — but the root page namescope never contains template-internal names. Use `GetTemplateChild` (protected, control-author only) instead of `FindName` to reach named template parts.
- `XamlReader.Load` creates a new, disconnected object tree with its own discrete namescope. It does not merge with the main app namescope even after being attached to the main object tree. `FindName` calls only search within the namescope of the calling object.
- To bridge discrete namescopes: walk the tree with `Parent`/collection properties, get the visual root via `Window.Current.Content` and call `FindName` from there, retain a reference to the object returned by `XamlReader.Load`, or use `VisualTreeHelper` to traverse purely by position.
- Package: `Microsoft.UI.Xaml.FrameworkElement.FindName` / `Microsoft.UI.Xaml.Controls.Control.GetTemplateChild` (WinUI 3), `Windows.UI.Xaml.*` (UWP).

## Related

- [x:Name attribute](./x-name-attribute.md)
- [XamlReader.Load](./xamlreader-load.md)
