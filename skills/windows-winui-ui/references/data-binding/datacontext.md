# DataContext

`FrameworkElement.DataContext` property: the default binding source object for `{Binding}` expressions, inherited down the visual tree unless overridden.

## Signature / Usage

```csharp
public object DataContext { get; set; }
```

```xaml
<Window xmlns:viewmodel="using:DataBindingInDepth" ... >
    <Window.DataContext>
        <viewmodel:HostViewModel x:Name="viewModelInDataContext"/>
    </Window.DataContext>
    <Button Content="{Binding Path=NextButtonText}" ... />
</Window>
```

```csharp
var textcolor = new MyColors();
textcolor.Brush1 = new SolidColorBrush(Colors.Red);
MyTextBox.DataContext = textcolor;
```

## Notes

- `{Binding}`'s implicit `Source` defaults to the element's `DataContext`; override with `Source`, `RelativeSource`, or `ElementName` on the individual binding.
- The default `DataContext` value for an element is inherited from its parent; setting it explicitly is inherited by children in turn, useful for sharing one source across multiple sibling bindings.
- Inside a `DataTemplate`, `DataContext` is automatically set to the data object being templated.
- `{x:Bind}` does **not** use `DataContext` — it resolves paths against the page/user control's code-behind instead, because `DataContext` is typed `object` and not known at compile time. Use `{Binding}` when you need `DataContext`-based binding.
- WinUI 3's `Window` class has no `Resources`/`DataContext`-hosting shortcut of its own for content; set `DataContext` on the root `Grid`/`Page`/`StackPanel` instead.
- In C++/WinRT, using `DataContext` with `{Binding}` requires the bound type to carry the `[Bindable]` (`BindableAttribute`) attribute, or implement `ICustomPropertyProvider`/`ICustomProperty`.

## Related

- [{Binding} markup extension](./binding-markup-extension.md)
- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
