# XAML in WPF

XAML (Extensible Application Markup Language) is a declarative XML-based markup used to instantiate WPF objects and separate UI definition from run-time logic via code-behind partial classes.

## Signature / Usage

```xaml
<Window x:Class="WindowsOverview.Window1"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <Button Click="Button_Click">Click This Button</Button>
</Window>
```

```csharp
public partial class Window1 : Window
{
    public Window1() => InitializeComponent();

    private void Button_Click(object sender, RoutedEventArgs e) =>
        MessageBox.Show("Button was clicked.");
}
```

## Options / Props

| Concept | Syntax | Description |
|---------|--------|-------------|
| Object element | `<TypeName .../>` | Instantiates a type via its parameterless constructor |
| Attribute syntax | `Property="value"` | Sets a property from a string, via type converter |
| Property element syntax | `<TypeName.PropertyName>...</TypeName.PropertyName>` | Sets a property whose value can't be a plain string |
| Content property | implicit child elements | A class's designated property (e.g. `Panel.Children`) that child elements populate without an explicit tag |
| Markup extension | `{Binding ...}`, `{StaticResource ...}`, `{DynamicResource ...}` | Escapes attribute value into an expression evaluated by the XAML processor |
| `x:Class` | attribute | Associates the markup file with a code-behind partial class |
| `x:Name` | attribute | Assigns a run-time field/variable name to the instance |
| `x:Key` | attribute | Keys a resource in a `ResourceDictionary` |

## Notes

- `x:Class` on the root element triggers MSBuild to generate a partial class deriving from the root type (e.g. `Window`); the code-behind file must declare the same `partial class` and call `InitializeComponent()`.
- WPF `.xaml` files compile as MSBuild `Page` items; the paired `.xaml.cs` compiles as `Compile`.
- WinUI 3 XAML shares the same core language (elements, attributes, markup extensions, `x:Name`/`x:Key`/`x:Class`) but uses a different default namespace (`http://schemas.microsoft.com/winfx/2006/xaml/presentation` still applies, but the backing types are `Microsoft.UI.Xaml.*` instead of `System.Windows.*`), and adds `x:Bind` (compiled binding) which WPF does not have. See `wpf-vs-winui3.md`.
- WinForms has no XAML; UI is built via the Designer generating C# code in `.Designer.cs` files (see `winforms-designer.md`).

## Related

- [wpf-window.md](./wpf-window.md)
- [wpf-dependency-property.md](./wpf-dependency-property.md)
- [wpf-data-binding.md](./wpf-data-binding.md)
- [wpf-vs-winui3.md](./wpf-vs-winui3.md)
