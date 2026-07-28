# Data binding and MVVM

Applying the Model-View-ViewModel (MVVM) UI architectural pattern in WinUI 3 apps, using data binding to decouple UI (view) from business logic (model/view-model).

## Signature / Usage

```csharp
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;

public partial class CustomerViewModel : ObservableObject
{
    private readonly ICustomerService _customerService;

    public CustomerViewModel(ICustomerService customerService) => _customerService = customerService;

    [ObservableProperty]
    [NotifyCanExecuteChangedFor(nameof(SaveCommand))]
    private string _name = string.Empty;

    [ObservableProperty]
    private bool _isBusy;

    [RelayCommand(CanExecute = nameof(CanSave))]
    private async Task SaveAsync()
    {
        IsBusy = true;
        await _customerService.SaveAsync(Name);
        IsBusy = false;
    }

    private bool CanSave() => !string.IsNullOrWhiteSpace(Name);
}
```

```xaml
<Page x:Class="MyApp.Views.CustomerPage" ... >
    <StackPanel>
        <TextBox Text="{x:Bind ViewModel.Name, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}" />
        <Button Content="Save" Command="{x:Bind ViewModel.SaveCommand}" />
        <ProgressRing IsActive="{x:Bind ViewModel.IsBusy, Mode=OneWay}" />
    </StackPanel>
</Page>
```

```csharp
public sealed partial class CustomerPage : Page
{
    public CustomerViewModel ViewModel { get; }

    public CustomerPage()
    {
        ViewModel = App.GetService<CustomerViewModel>();
        InitializeComponent();
    }
}
```

## Notes

- Layers: **model** (business data/domain logic, UI-independent), **view** (XAML markup + `{x:Bind}`/`{Binding}` expressions, optional code-behind for UI-only glue), **view-model** (binding target exposing/wrapping the model plus UI-relevant state, e.g. selection or busy flags).
- Use MVVM for apps with complex data flows, multiple screens, or team codebases with unit-testable business logic; simple single-page tools/prototypes can stay code-behind and adopt MVVM incrementally.
- `{x:Bind}` (compile-time, better perf) is the recommended binding mechanism for the view layer in MVVM; it doesn't require a base `MVVM framework` to work.
- The `CommunityToolkit.Mvvm` library provides `ObservableObject` (base class implementing `INotifyPropertyChanged`) and `RelayCommand`/`AsyncRelayCommand` (`ICommand` implementations), plus source generators (`[ObservableProperty]`, `[RelayCommand]`) that eliminate most MVVM boilerplate.
- Command properties bound via `Command="{x:Bind ViewModel.SaveCommand}"` implement `ICommand` (`Microsoft.UI.Xaml.Input.ICommand`); `{x:Bind}` also supports binding directly to event handler methods ("event binding") as a lighter alternative to full commands.
- WinUI Gallery (github.com/microsoft/WinUI-Gallery) demonstrates data binding and MVVM patterns end-to-end.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [INotifyPropertyChanged](./inotifypropertychanged.md)
- [ItemsSource binding](./itemssource-binding.md)
