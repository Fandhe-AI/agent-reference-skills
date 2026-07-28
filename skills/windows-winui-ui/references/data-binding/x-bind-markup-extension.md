# {x:Bind} markup extension

Compile-time (compiled) data binding markup extension. Faster and less memory than `{Binding}`, supports compile-time validation and debugging via generated code.

## Signature / Usage

```xaml
<object property="{x:Bind}" .../>
<object property="{x:Bind propertyPath}" .../>
<object property="{x:Bind propertyPath, bindingProperties}" .../>
<object property="{x:Bind pathToFunction.functionName(functionParameter1, ...), bindingProperties}" .../>
```

```xaml
<Page x:Class="QuizGame.View.HostView" ... >
    <Button Content="{x:Bind Path=ViewModel.NextButtonText, Mode=OneWay}" ... />
</Page>
```

```xaml
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
| Path | property path string | Property/sub-property/field/method path to bind. Resolved against the page/user control itself (code-behind), not `DataContext`. Steps delimited by `.`; supports indexers (`Teams[0]`, `Players['John Smith']`), attached properties (`Button22.(Grid.Row)`), and casts (`((TextBox)obj).Text`). Can be set explicitly (`Path=...`) or omitted as the first positional argument. |
| Mode | `OneTime` \| `OneWay` \| `TwoWay` | Binding mode. Default is `OneTime` (differs from `{Binding}`'s default of `OneWay`). Change the default per-subtree with `x:DefaultBindMode`. |
| Converter | `IValueConverter` instance | Converter called by the binding engine; must reference an object via `{StaticResource}`. |
| ConverterLanguage | string | Culture identifier used by the converter. |
| ConverterParameter | object | Parameter passed to converter logic. |
| FallbackValue | object | Value shown when the source/path cannot be resolved. |
| TargetNullValue | object | Value shown when the source resolves but is explicitly `null`. |
| BindBack | function path | Function used for the reverse direction of a two-way binding. |
| UpdateSourceTrigger | `PropertyChanged` \| `LostFocus` | When TwoWay changes push back to the source. Default is `PropertyChanged` except `TextBox.Text`, which defaults to `LostFocus`. |

## Notes

- Package: `Microsoft.UI.Xaml.Data` (WinUI 3, Windows App SDK). Distinct from WPF's `System.Windows.Data.Binding`, the JS `@ark-ui/react` / `@chakra-ui/react` state binding, and Jetpack Compose state.
- Does not use `DataContext` as a default source; resolves against the page/user control's code-behind. Cannot bind to `DataContext` (its type is `object`, unknown at compile time).
- Requires `x:DataType` on a `DataTemplate` to enable compile-time validated bindings inside item/content/header templates.
- Supports function bindings as the leaf step of the path (see Functions in x:Bind) and phased rendering via `x:Phase`.
- Event binding: `Click="{x:Bind rootFrame.GoForward}"` — target method must not be overloaded, and its parameters must match or be assignable from the event's parameters.
- Not suited to late-bound/duck-typed scenarios (e.g., dynamic JSON navigation) — use `{Binding}` instead.
- Markup-extension only; there is no way to create `{x:Bind}` bindings imperatively in code.

## Related

- [{Binding} markup extension](./binding-markup-extension.md)
- [Functions in x:Bind](./function-bindings.md)
- [x:Phase attribute](./x-phase-attribute.md)
- [DataContext](./datacontext.md)
- [Data binding and MVVM](./data-binding-and-mvvm.md)
