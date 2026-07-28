# XamlReader.Load

Parses a well-formed XAML fragment string at runtime and creates a corresponding, initially-disconnected object tree, returning its root object.

## Signature / Usage

```csharp
public static object Load(string xaml);
```

```csharp
string xaml =
"<Ellipse Name=\"EllipseAdded\" Width=\"300.5\" Height=\"200\" Fill=\"Red\" " +
"xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"/>";
object ellipse = XamlReader.Load(xaml);
stackPanelRoot.Children.Add(ellipse as UIElement);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| xaml | string | A well-formed XAML fragment string with a single root element and a default `xmlns`. |
| Returns | object | The root object of the newly created object tree. |

## Notes

- The XAML content string must define exactly one root element, be well-formed XML/valid XAML, and declare a default `xmlns` (typically `http://schemas.microsoft.com/winfx/2006/xaml/presentation`).
- Any custom assemblies referenced via a namespace mapping must already be available to the app.
- Must not specify `x:Class`, and cannot include XAML-declared event-handler attributes; attach handlers imperatively (`+=`) after loading.
- Creates a **new, discrete XAML namescope** — `FindName` in the main app namescope will not find objects from a `XamlReader.Load` tree, and vice versa. See [XAML namescopes](./xaml-namescopes.md).
- The returned object can be assigned to only one location in the primary object tree; to reuse the same XAML string in multiple places, call `Load` again for each destination.
- Cannot be combined with `x:Load` attribute deferred-loading elements.
- Package: `Microsoft.UI.Xaml.Markup.XamlReader` (WinUI 3) / `Windows.UI.Xaml.Markup.XamlReader` (UWP).

## Related

- [XAML namescopes](./xaml-namescopes.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
- [x:Name attribute](./x-name-attribute.md)
