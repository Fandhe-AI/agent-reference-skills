# {x:Bind} markup extension

Compile-time ("compiled") data binding, an alternative to `{Binding}`. `{x:Bind}` runs in less time and less memory than `{Binding}` and supports breakpoint debugging in generated code files.

## Signature / Usage

```xaml
<object property="{x:Bind}" .../>
<object property="{x:Bind propertyPath}" .../>
<object property="{x:Bind bindingProperties}" .../>
<object property="{x:Bind propertyPath, bindingProperties}" .../>
<object property="{x:Bind pathToFunction.functionName(functionParameter1, functionParameter2, ...), bindingProperties}" .../>
```

```XAML
<Page x:Class="QuizGame.View.HostView" ... >
    <Button Content="{x:Bind Path=ViewModel.NextButtonText, Mode=OneWay}" ... />
</Page>
```

```XAML
<DataTemplate x:Key="SimpleItemTemplate" x:DataType="data:SampleDataGroup">
  <StackPanel Orientation="Vertical" Height="50">
    <TextBlock Text="{x:Bind Title}"/>
    <TextBlock Text="{x:Bind Description}"/>
  </StackPanel>
</DataTemplate>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Path | property path | The property/sub-property/field/method path to bind to; can be named explicitly (`Path=...`) or omitted. |
| Converter | object | Converter object called by the binding engine; must be a `{StaticResource}` reference. |
| ConverterLanguage | string | Culture used by the converter. |
| ConverterParameter | object | Parameter passed to converter logic. |
| FallbackValue | object | Value shown when source or path can't be resolved. |
| Mode | string | `"OneTime"` (default), `"OneWay"`, or `"TwoWay"`. Default differs from `{Binding}`, whose default is `"OneWay"`. |
| TargetNullValue | object | Value shown when the source resolves but is explicitly `null`. |
| BindBack | function | Function used for the reverse direction of a two-way binding. |
| UpdateSourceTrigger | string | When to push changes back in TwoWay bindings; default `PropertyChanged` except `TextBox.Text`, which defaults to `LostFocus`. |

## Notes

- `{x:Bind}` does not use `DataContext` as its default source — it uses the page or user control itself (the code-behind). To bind to a view model, expose it as a field/property on the code-behind.
- When binding with a `DataTemplate`, you must set `x:DataType` to indicate the bound type, since `{x:Bind}` requires compile-time type information and cannot use `DataContext` (type `Object`).
- Collections: index by position (`Teams[0].Players`, requires `IList<T>`/`IVector<T>`) or by string key (`Players['John Smith']`, requires `IDictionary<string,T>`/`IMap<string,T>`).
- Attached properties: `Text="{x:Bind Button22.(Grid.Row)}"`.
- Casting: `{x:Bind ((TextBox)obj).Text}` or `{x:Bind obj.(TextBox.Text)}`; C#-style cast syntax is recommended going forward. Pathless casting, e.g. `{x:Bind (x:String)}`, can stand in for `this` as a function parameter.
- Functions can be used as the leaf step of a binding path (Windows 10 1607+).
- Event binding is supported, e.g. `Click="{x:Bind rootFrame.GoForward}"`; the target method must not be overloaded.
- Cannot bind to `DataContext` (type `Object`, resolved at runtime — incompatible with compile-time typing).
- Use in a `ResourceDictionary` requires the dictionary to have a code-behind class.
- Generated `Bindings` property exposes `Update()`, `Initialize()`, `StopTracking()`.
- Package: `Microsoft.UI.Xaml.Markup` (WinUI 3) / `Windows.UI.Xaml.Markup` (UWP). Distinct from React/Vue-style two-way binding directives.

## Related

- [x:DataType attribute](./x-datatype-attribute.md)
- [TemplateBinding markup extension](./templatebinding-markup-extension.md)
- [RelativeSource markup extension](./relativesource-markup-extension.md)
- [Dependency properties overview](./dependency-properties-overview.md)
- [x:Load attribute](./x-load-attribute.md)
