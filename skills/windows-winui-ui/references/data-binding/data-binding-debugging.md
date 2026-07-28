# Diagnosing and debugging data binding problems

Techniques for finding and fixing broken bindings in WinUI 3 apps, covering both `{x:Bind}` (compile-time) and `{Binding}` (runtime) failure modes.

## Signature / Usage

```csharp
// {x:Bind} generates a partial class with breakpoint-able code in obj\, e.g. for C#:
// <view name>.g.cs
//
// The generated Bindings object exposes:
this.Bindings.Update();       // re-run all compiled bindings (e.g. after async data loads)
this.Bindings.Initialize();   // initialize bindings if not already initialized (calls Update)
this.Bindings.StopTracking(); // unhook OneWay/TwoWay listeners
```

## Notes

- `{x:Bind}` bugs (e.g. renaming a bound property without updating markup) are caught at **compile time** because compiled bindings generate typed code in `obj/<view name>.g.cs`; set breakpoints directly in those generated files and use **Break On Unhandled Exceptions** in Visual Studio, then inspect the **Call Stack** window.
- `{Binding}` has no compile-time type information for the source; binding failures only surface at run time, in Visual Studio's **Output** window and the **XAML Binding Failures** window (see "XAML data binding diagnostics" in Visual Studio docs).
- If bound data loads asynchronously and isn't ready when the page's `Loading` event first initializes bindings, force a manual refresh after the data arrives: `this.Bindings.Update()`. For one-time-bind-only scenarios, this is cheaper than switching to `OneWay` bindings just to pick up late data.
- Value converters should never throw for a failed conversion — return `DependencyProperty.UnsetValue` instead so the binding engine stops the transfer cleanly rather than throwing an unhandled exception at runtime.
- `x:DataType` mismatches (or missing `x:DataType`) inside a `DataTemplate` are a common `{x:Bind}` compile error; add an explicit cast in the `Path` (`((TextBox)obj).Text`) when the declared type is weaker than the actual runtime type.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [{Binding} markup extension](./binding-markup-extension.md)
- [IValueConverter](./ivalueconverter.md)
