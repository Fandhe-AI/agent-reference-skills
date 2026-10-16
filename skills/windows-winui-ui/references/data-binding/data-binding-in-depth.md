# Windows data binding in depth

Detailed description of WinUI 3 data binding: binding source, target and binding object, `{x:Bind}` vs `{Binding}`, observable sources, converters, event binding, grouped data, and code-created bindings.

## Signature / Usage

Every binding has a source (any class instance), a target, and a binding object. For `{Binding}`, the target is a `DependencyProperty` of a `FrameworkElement` and the binding object is created at XAML load time. `{x:Bind}` instead generates the binding code at compile time (`<view name>.g.cs` in `obj`), and its target can also be an event (event binding, see below).

```csharp
// Observable source: implement INotifyPropertyChanged
public class HostViewModel : INotifyPropertyChanged
{
    private string nextButtonText;

    public event PropertyChangedEventHandler PropertyChanged = delegate { };

    public HostViewModel()
    {
        NextButtonText = "Next";
    }

    public string NextButtonText
    {
        get { return nextButtonText; }
        set
        {
            nextButtonText = value;
            OnPropertyChanged();
        }
    }

    public void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

```xaml
<!-- {x:Bind}: Path is rooted at the Window; Mode overrides the OneTime default -->
<Button Content="{x:Bind Path=ViewModel.NextButtonText, Mode=OneWay}" ... />

<!-- {Binding}: Path is resolved against DataContext (set on the root element; WinUI 3 Window has no DataContext); default Mode is OneWay -->
<Window xmlns:viewmodel="using:DataBindingInDepth" ... >
    <Grid>
        <Grid.DataContext>
            <viewmodel:HostViewModel x:Name="viewModelInDataContext"/>
        </Grid.DataContext>
        <Button Content="{Binding Path=NextButtonText}" ... />
    </Grid>
</Window>
```

Binding in code (`{Binding}` only):

```csharp
var binding = new Binding { Path = new PropertyPath("Brush1") };
MyTextBox.SetBinding(TextBox.ForegroundProperty, binding);
```

Event binding and element-to-element binding with `{x:Bind}`:

```xaml
<ListView DoubleTapped="{x:Bind ListViewDoubleTapped}" />

<TextBox x:Name="myTextBox" />
<TextBlock Text="{x:Bind myTextBox.Text, Mode=OneWay}" />
```

Grouped data through `CollectionViewSource` ("has-a-group" pattern):

```xaml
<CollectionViewSource
    x:Name="AuthorHasACollectionOfBookSku"
    Source="{x:Bind ViewModel.Authors}"
    IsSourceGrouped="true"
    ItemsPath="BookSkus"/>
<GridView ItemsSource="{x:Bind AuthorHasACollectionOfBookSku}" ...>
```

## Options / Props

`{x:Bind}` vs `{Binding}` feature comparison:

| Feature | {x:Bind} | {Binding} | Notes |
|---------|----------|-----------|-------|
| Path default property | `{x:Bind a.b.c}` | `{Binding a.b.c}` | |
| Path | `{x:Bind Path=a.b.c}` | `{Binding Path=a.b.c}` | In `x:Bind`, `Path` is rooted at the Window by default, not the DataContext. |
| Indexer | `{x:Bind Groups[2].Title}` | `{Binding Groups[2].Title}` | Binds to the specified item in the collection. Path supports both integer (`Groups[2]`) and string (`Players['John Smith']`) indexers; the official comparison table says integer-only, but the same page's Path description lists integer and string indexers. |
| Attached properties | `{x:Bind Button22.(Grid.Row)}` | `{Binding Button22.(Grid.Row)}` | Specified using parentheses; prefix with an XML namespace if not in a XAML namespace. |
| Casting | `{x:Bind groups[0].(data:SampleDataGroup.Title)}` | Not needed | Casts use parentheses. |
| Converter | `{x:Bind IsShown, Converter={StaticResource BoolToVisibility}}` | same form | Declare converters at the root of the Window, Control, ResourceDictionary, or in App.xaml. |
| ConverterParameter, ConverterLanguage | `..., ConverterParameter=One, ConverterLanguage=fr-fr` | same form | |
| TargetNullValue | `{x:Bind Name, TargetNullValue=0}` | `{Binding Name, TargetNullValue=0}` | Used when the leaf of the expression is null. Single quotes for a string value. |
| FallbackValue | `{x:Bind Name, FallbackValue='empty'}` | `{Binding Name, FallbackValue='empty'}` | Used when any part of the path (except the leaf) is null. |
| ElementName | `{x:Bind slider1.Value}` | `{Binding Value, ElementName=slider1}` | With `x:Bind` you bind to a field; any named element is accessible. |
| RelativeSource: Self | `Height="{x:Bind rect1.Width}"` (name the element) | `{Binding Width, RelativeSource={RelativeSource Self}}` | |
| RelativeSource: TemplatedParent | Not needed | `{Binding <path>, RelativeSource={RelativeSource TemplatedParent}}` | With `x:Bind`, `TargetType` on `ControlTemplate` indicates the template parent. For `{Binding}`, use `TemplatedParent` when a converter or two-way binding is needed. |
| Source | Not needed | `{Binding Orders, Source={StaticResource MyData}}` | For `x:Bind` use the named element, a property, or a static path. |
| Mode | `{x:Bind Name, Mode=OneWay}` | `{Binding Name, Mode=TwoWay}` | `OneTime`, `OneWay`, `TwoWay`. `x:Bind` defaults to `OneTime`; `Binding` defaults to `OneWay`. |
| UpdateSourceTrigger | `{x:Bind Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}` | `{Binding UpdateSourceTrigger=PropertyChanged}` | `Default`, `LostFocus`, `PropertyChanged`. `x:Bind` doesn't support `Explicit`; it uses `PropertyChanged` behavior except `TextBox.Text` (`LostFocus`). |

### Collection / notification guidance (C# CLR vs C++/WinRT)

| Scenario | C# (CLR) | C++/WinRT |
|----------|----------|-----------|
| Bind to an object | Any object | Any object |
| Property change notifications | `INotifyPropertyChanged` | `Microsoft.UI.Xaml.Data.INotifyPropertyChanged` |
| Bind to a collection | `List<T>` | `IVector` of `IInspectable`, or `IBindableObservableVector` |
| Collection change notifications | `ObservableCollection<T>` | `IObservableVector` of `IInspectable` |
| Implement a bindable collection | Extend `List<T>` or implement `IList`, `IList<Object>`, `IEnumerable`, or `IEnumerable<Object>`. Binding to generic `IList<T>` / `IEnumerable<T>` isn't supported. | Implement `IVector` of `IInspectable` |
| Collection with change notifications | Extend `ObservableCollection<T>` or implement non-generic `IList` and `INotifyCollectionChanged` | Implement `IObservableVector` of `IInspectable`, or `IBindableObservableVector` |
| Incremental loading | As above, plus `ISupportIncrementalLoading` | As above, plus `ISupportIncrementalLoading` |

## Notes

- Source: https://learn.microsoft.com/en-us/windows/apps/develop/data-binding/data-binding-in-depth (page updated 2026-09-29)
- The official page's sample sets `Window.DataContext`, but the WinUI 3 `Window` does not derive from `FrameworkElement` and has no `DataContext`; set it on the root `Grid` / `Page` instead (see datacontext.md).
- The official page's opening description states the target is a `DependencyProperty` and the binding object is created at XAML load time for both `{x:Bind}` and `{Binding}`; this is read as `{Binding}`-specific to stay consistent with the same page's `{x:Bind}` description (compile-time code generation, event binding).
- String indexers require `IDictionary<string,T>` / `IMap<string,T>` (see x-bind-markup-extension.md).
- Package: `Microsoft.UI.Xaml.Data` (WinUI 3, Windows App SDK). Distinct from WPF `System.Windows.Data.Binding`.
- Modes: one-time (value that doesn't change at run-time), one-way (observe source, read-only data), two-way (user changes in the UI are pushed back to the source). `{x:Bind}` and `{Binding}` can be mixed in one app, even on the same element.
- Observability: derive from `DependencyObject` and expose a `DependencyProperty`, or implement `INotifyPropertyChanged` (lighter, necessary for classes with an existing base class). Raising `PropertyChanged` with `String.Empty` re-reads all non-indexer properties (the in-depth page also mentions `null`, but the INotifyPropertyChanged API reference states `null` is not supported in WinUI, unlike WPF; use `String.Empty`. See inotifypropertychanged.md); `"Item[indexer]"` or `"Item[]"` signals indexer changes.
- C++/WinRT: `[Microsoft.UI.Xaml.Data.Bindable]` (`BindableAttribute`, available with Windows App SDK) is required on runtime classes used with `{Binding}`; without it implement `ICustomPropertyProvider` and `ICustomProperty`. Not needed for `{x:Bind}`.
- `x:Bind` Path is interpreted in the context of the window; inside a `DataTemplate` it is interpreted against the templated data object, and the template must declare `x:DataType` for compile-time validation. Generic types can't be expressed in markup, so use `{Binding}` for such templates (for example group header templates over `IGrouping<,>`).
- Weakly-typed paths (`object` properties) fail to compile; add a cast, e.g. `{x:Bind ((data:SampleDataGroup)SampleDataGroupAsObject).Title}`.
- Asynchronous data: generated code (`<view name>.g.cs` in `obj`) initializes bindings on `Loading`. After loading data, call `this.Bindings.Update();` to refresh one-time bindings; this is cheaper than one-way bindings when data doesn't change finely.
- `{x:Bind}` is not suited to late-bound scenarios (e.g. JSON dictionary navigation) or duck typing; use `{Binding}`.
- `{Binding}`: `Source` defaults to the element's `DataContext` (inherited from the parent by default; inside a `DataTemplate` it is the templated data object). Override with `Source`, `RelativeSource`, or `ElementName`.
- `TextBox.Text` sends two-way changes on lost focus by default. For `{Binding}`, set `UpdateSourceTrigger=PropertyChanged` for per-keystroke updates, or `Explicit` then call `GetBindingExpression` and `BindingExpression.UpdateSource`.
- Converters: `Convert` is called source-to-target, `ConvertBack` target-to-source. On conversion error do not throw; return `DependencyProperty.UnsetValue` to stop the data transfer. `FallbackValue` handles unresolved sources. The Windows Community Toolkit provides `BoolToVisibilityConverter` in the `CommunityToolkit.WinUI.Converters` NuGet package.
- Non-string values bound to text controls are converted via `ICustomPropertyProvider.GetStringRepresentation` / `IStringable.ToString` if available, otherwise `Object.ToString`; a `ToString` that hides (rather than overrides) the base implementation is ignored.
- Function bindings: the last step of an `{x:Bind}` path can be a function (see the Functions in x:Bind page).
- Resource dictionaries using `{x:Bind}` need a code-behind constructor calling `InitializeComponent`; merge by instantiating the type (`<examplenamespace:TemplatesResourceDictionary/>`) instead of referencing the filename. Reusable Styles can mix `{x:Bind}` and `{Binding}`.
- Event binding: the target method can't be overloaded, and its parameters must be assignable from the event's parameters. Commands are properties returning `System.Windows.Input.ICommand`; both binding kinds work with them. Call `RaiseCanExecuteChanged` when can-execute state changes.
- Folders/files: `GetFilesAsync` / `GetFoldersAsync` / `GetItemsAsync` results aren't suitable for list controls; bind to `FileInformationFactory.GetVirtualizedFilesVector` / `GetVirtualizedFoldersVector` / `GetVirtualizedItemsVector`. Virtualized vectors can return `null` items before population. Two-way binding works only in indexed locations; persist with `SavePropertiesAsync`.
- Grouping: set `CollectionViewSource.IsSourceGrouped` to `true`. "Is-a-group" (group derives from a collection, or LINQ `IGrouping`) needs no `ItemsPath`; "has-a-group" needs `ItemsPath` naming the collection property. `CollectionViewSource` also tracks the current item (`ICollectionView.CurrentItem` via `CollectionViewSource.View`) so several items controls stay in sync.
- Debugging: `{x:Bind}` gives compile-time validation and breakpoints in generated code (`obj`, `<view name>.g.cs`); `{Binding}` errors appear in Visual Studio's Output and XAML Binding Failures windows.
- Code-created bindings apply only to `{Binding}` (`FrameworkElement.SetBinding` / `BindingOperations.SetBinding`); `{x:Bind}` can't be created in code, but `DependencyObject.RegisterPropertyChangedCallback` gives some of the same benefits. Binding property values can't be changed after `SetBinding`.
- WinUI Gallery (github.com/microsoft/WinUI-Gallery) has data binding samples for both kinds.

## Related

- [Tutorial: Basic data binding](./data-binding-overview.md)
- [Data binding and MVVM](./data-binding-and-mvvm.md)
- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [Functions in x:Bind](./function-bindings.md)
- [CollectionViewSource](./collectionviewsource.md)
- [IValueConverter](./ivalueconverter.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
- [ISupportIncrementalLoading](./isupportincrementalloading.md)
- [Data binding debugging](./data-binding-debugging.md)
