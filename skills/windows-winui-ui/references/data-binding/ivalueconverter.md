# IValueConverter

Interface for converting a source value to a display-compatible target value (and back) as data passes through the binding engine.

## Signature / Usage

```csharp
public interface IValueConverter
{
    object Convert(object value, Type targetType, object parameter, string language);
    object ConvertBack(object value, Type targetType, object parameter, string language);
}
```

```csharp
public class DateToStringConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, string language)
    {
        DateTime thisDate = (DateTime)value;
        return thisDate.ToString("MMMM");
    }

    // ConvertBack is not implemented for a OneWay binding.
    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

```xaml
<UserControl.Resources>
  <local:DateToStringConverter x:Key="Converter1"/>
</UserControl.Resources>
...
<TextBlock Text="{x:Bind ViewModel.Month, Converter={StaticResource Converter1}}"/>
<TextBlock Text="{Binding Month, Converter={StaticResource Converter1}}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Convert(value, targetType, parameter, language) | method | Called when data flows source → target. Modifies the source value for display. |
| ConvertBack(value, targetType, parameter, language) | method | Called only for `TwoWay` bindings, when data flows target → source. |
| parameter | object | Bound via `ConverterParameter` on the `{Binding}`/`{x:Bind}` markup extension. |
| language | string | Bound via `ConverterLanguage`. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Data.IValueConverter` (WinUI 3). WinRT signature uses string `language` parameters, unlike WPF's `IValueConverter` which uses `CultureInfo`.
- Always implement `Convert` functionally; it's common for `ConvertBack` to throw `NotImplementedException` when only used in `OneTime`/`OneWay` bindings.
- On conversion failure, return `DependencyProperty.UnsetValue` instead of throwing — this stops the data transfer cleanly; throwing surfaces as an unhandled runtime exception.
- For `{x:Bind}`, a function binding can often replace a converter (see Functions in x:Bind) and avoids the extra class + `{StaticResource}` indirection.
- The Windows Community Toolkit ships a ready-made `BoolToVisibilityConverter` (`CommunityToolkit.WinUI.Converters` NuGet package); WinUI 3 also has a built-in bool→`Visibility` conversion for `Visibility`-typed bindings without an explicit converter.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [Functions in x:Bind](./function-bindings.md)
