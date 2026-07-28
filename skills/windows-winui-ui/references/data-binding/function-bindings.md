# Functions in x:Bind

`{x:Bind}` supports using a function as the leaf step of the binding path. Enables value conversion and bindings that depend on more than one property, without a separate `IValueConverter`.

## Signature / Usage

```xaml
<object property="{x:Bind pathToFunction.FunctionName(functionParameter1, functionParameter2, ...), bindingProperties}" ... />
```

```xaml
<DataTemplate x:DataType="local:ColorEntry">
    <Grid Background="{x:Bind local:ColorEntry.Brushify(Color), Mode=OneWay}" Width="240">
        <TextBlock Text="{x:Bind ColorName}" Foreground="{x:Bind TextColor(Color)}" Margin="10,5" />
    </Grid>
</DataTemplate>
```

```csharp
public class ColorEntry
{
    public string ColorName { get; set; }
    public Color Color { get; set; }

    public static SolidColorBrush Brushify(Color c) => new SolidColorBrush(c);

    public SolidColorBrush TextColor(Color c) =>
        new SolidColorBrush(((c.R * 0.299 + c.G * 0.587 + c.B * 0.114) > 150) ? Colors.Black : Colors.White);
}
```

Two-way function binding requires a `BindBack` function for the reverse direction:

```xaml
<TextBlock Text="{x:Bind a.MyFunc(b), BindBack=a.MyFunc2, Mode=TwoWay}" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pathToFunction | property path | Path to a static (`XMLNamespace:ClassName.MethodName`) or instance function, resolved the same way as a property path (dots, indexers, casts). |
| function arguments | binding path / literal | Comma-separated arguments: a binding path (change-tracked in OneWay/TwoWay), a quoted string constant, a numeric constant, or `x:True` / `x:False`. |
| BindBack | function path | Function for the reverse direction of a `Mode=TwoWay` function binding; takes one argument, the value to push back to the model. |

## Notes

- Function requirements: accessible to codegen (internal/private OK in C#; C++ needs public WinRT methods), overload resolution by argument count only (not type), argument types must match without narrowing conversion, and return type must match the bound property's type.
- With `Mode=OneWay`/`TwoWay`, the binding engine re-evaluates the function when any bound argument changes; raise `PropertyChanged` with the function name to force re-evaluation explicitly.
- System functions can be used directly, e.g. `{x:Bind sys:DateTime.Parse(TextBlock1.Text)}` or `{x:Bind sys:String.Format('{0} is now available in {1}', ...)}`.
- `TargetNullValue` applies to the function's return value, not to bound arguments.
- Achieves scenarios equivalent to WPF `Converter`/`MultiBinding` without a separate converter class.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [IValueConverter](./ivalueconverter.md)
