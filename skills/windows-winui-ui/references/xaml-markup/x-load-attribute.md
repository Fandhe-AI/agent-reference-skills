# x:Load attribute

Optimizes startup time, visual tree creation, and memory usage by deferring element creation until needed. Similar to `Visibility`, but the memory of a not-loaded element is released and a small placeholder marks its position in the visual tree.

## Signature / Usage

```xaml
<object x:Load="True" .../>
<object x:Load="False" .../>
<object x:Load="{x:Bind Path.to.a.boolean, Mode=OneWay}" .../>
```

```xaml
<Grid x:Name="DeferredGrid" x:Load="False">
    ...
</Grid>
```

```csharp
this.FindName("DeferredGrid"); // loads
this.UnloadObject(DeferredGrid); // unloads
```

## Notes

- Loading is controlled via `{x:Bind}` expressions, `FindName`, `GetTemplateChild`, a `VisualState` `Setter`/`Storyboard` targeting the element, or any `Storyboard` targeting an unloaded element.
- Unloading: use an `x:Bind` expression returning `false`, or call `UnloadObject` (on `Page`/`UserControl`, or `Microsoft.UI.Xaml.Markup.XamlMarkupHelper.UnloadObject`).
- When using `x:Load` on a container (`Grid`, `StackPanel`), the container and all children load/unload as a group; overhead is paid only once for the container.
- Tracking a deferred element adds ~600 bytes of memory overhead — avoid overusing on many small elements.
- **Restrictions**: requires `x:Name` on the element; only usable on types deriving from `UIElement` or `FlyoutBase`; cannot be used on root elements of `Window`, `Page`, `UserControl`, or `DataTemplate`; cannot be used on elements in a `ResourceDictionary`; cannot be used on loose XAML loaded with `XamlReader.Load`.
- If `x:Bind` is used in `x:Load`, don't set `x:Name` to the same identifier as the binding path (XAML compiler error).
- WinUI 3: `Window` does not derive from `FrameworkElement`, so it has no `FindName`; use an `x:Bind` expression to control load state when the XAML root is a `Window`.
- `OneTime` `{x:Bind}` bindings are calculated at their normal time (root element load) even for deferred elements; the value is saved and applied when the element loads.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace.

## Related

- [x:Bind markup extension](./x-bind-markup-extension.md)
- [x:Name attribute](./x-name-attribute.md)
