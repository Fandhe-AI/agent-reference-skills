# Tutorial: Basic data binding (Data binding overview)

Tutorial for binding WinUI 3 controls to a single item or a collection, rendering items with a data template, building a details view, and formatting values with a value converter.

## Signature / Usage

Binding target is typically a control property; binding source is a property of a data model or view model. Expose the view model on the window and bind with `{x:Bind}`:

```csharp
public sealed partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
    }
    public RecordingViewModel ViewModel{ get; } = new RecordingViewModel();
}
```

```xaml
<Window x:Class="Quickstart.MainWindow" ... >
    <Grid>
        <TextBlock Text="{x:Bind ViewModel.DefaultRecording.OneLineSummary}"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"/>
    </Grid>
</Window>
```

Collection with a data template (`x:DataType` is required for `{x:Bind}` inside the template):

```xaml
<ListView ItemsSource="{x:Bind ViewModel.Recordings}"
HorizontalAlignment="Center" VerticalAlignment="Center">
    <ListView.ItemTemplate>
        <DataTemplate x:DataType="local:Recording">
            <TextBlock Text="{x:Bind OneLineSummary}"/>
        </DataTemplate>
    </ListView.ItemTemplate>
</ListView>
```

Details view via `SelectedItem` (requires `{Binding}`):

```xaml
<StackPanel DataContext="{Binding SelectedItem, ElementName=recordingsListView}"
Margin="0,24,0,0">
    <TextBlock Text="{Binding ArtistName}"/>
    <TextBlock Text="{Binding CompositionName}"/>
    <TextBlock Text="{Binding ReleaseDateTime}"/>
</StackPanel>
```

Details view via `CollectionViewSource` (also `{Binding}`):

```xaml
<Grid.Resources>
    <CollectionViewSource x:Name="RecordingsCollection" Source="{x:Bind ViewModel.Recordings}"/>
</Grid.Resources>
...
<ListView ItemsSource="{Binding Source={StaticResource RecordingsCollection}}">
...
<StackPanel DataContext="{Binding Source={StaticResource RecordingsCollection}}" ...>
```

Value converter with a format string passed via `ConverterParameter`:

```csharp
public class StringFormatter : Microsoft.UI.Xaml.Data.IValueConverter
{
    public object Convert(object value, Type targetType,
        object parameter, string language)
    {
        string formatString = parameter as string;
        if (!string.IsNullOrEmpty(formatString))
        {
            return string.Format(formatString, value);
        }
        return value.ToString();
    }

    public object ConvertBack(object value, Type targetType,
        object parameter, string language)
    {
        throw new NotImplementedException();
    }
}
```

```xaml
<TextBlock Text="{Binding ReleaseDateTime,
    Converter={StaticResource StringFormatterValueConverter},
    ConverterParameter=Released: \{0:d\}}"/>
```

## Notes

- Package: `Microsoft.UI.Xaml.Data` (WinUI 3, Windows App SDK). Distinct from WPF `System.Windows.Data.Binding`.
- Tutorial project: WinUI Blank App (Packaged) C#, named "Quickstart".
- Collections: `ObservableCollection<T>` implements `INotifyCollectionChanged` and notifies bindings on add/remove. Due to a known WinUI Release-mode bug with .NET 8 and later, `List<T>` may be needed in some scenarios, especially for static collections; with `List<T>` you may not get collection change notifications. Use `ObservableCollection<T>` when the UI must update at runtime. Items must implement `INotifyPropertyChanged` for property-change updates.
- Without an item template, the framework calls `ToString` on each item (default returns the type name). Fix by overriding `ToString` or providing a data template (`ContentTemplate` of a content control, `ItemTemplate` of an items control).
- Both details-view techniques (`SelectedItem` and `CollectionViewSource`) require `{Binding}`, not `{x:Bind}`. Binding the details view directly to a `CollectionViewSource` binds to the current item; specifying `CurrentItem` is optional unless ambiguous.
- The WinUI `Window` class has no `Resources` property; put the `CollectionViewSource` on the top-level `Grid` (or another parent element), or on `Page.Resources` within a `Page`.
- `x:Bind` offers compile-time checking, better performance, and strong typing. `Binding` offers runtime evaluation and is more flexible for dynamic scenarios.
- Scenarios not supported by `x:Bind`: dynamic data structures unknown at compile time; element-to-element binding; automatically inheriting a parent `DataContext`; `x:Bind` requires an explicit `INotifyPropertyChanged` implementation for UI updates in both one-way and two-way bindings (two-way also flows UI changes back to the source).
- The Data binding in depth page shows `{x:Bind}` binding to a named element via a field path (`{x:Bind slider1.Value}`, `{x:Bind myTextBox.Text, Mode=OneWay}`); the overview's "element-to-element binding" statement refers to the `ElementName`-style binding of `{Binding}`. See [Windows data binding in depth](./data-binding-in-depth.md).

## Related

- [Windows data binding in depth](./data-binding-in-depth.md)
- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [CollectionViewSource](./collectionviewsource.md)
- [IValueConverter](./ivalueconverter.md)
