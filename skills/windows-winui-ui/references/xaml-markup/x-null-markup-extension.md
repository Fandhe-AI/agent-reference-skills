# {x:Null} markup extension

Specifies a `null` value for a property in XAML markup.

## Signature / Usage

```xaml
<object property="{x:Null}" .../>
```

## Notes

- `null` is the null reference keyword for C# and C++.
- A dependency property's default value is not necessarily `null`, and many dependency properties reject `null` (whether set from markup or code) due to internal implementation — using `{x:Null}` on such a property throws a XAML parser exception.
- For nullable Windows Runtime types where `null` isn't already the default, `{x:Null}` sets the value to `null`. In C++/CX, nullable types are represented as `Platform::IBox<T>`; in .NET languages, as `Nullable<T>`.
- Package: `Microsoft.UI.Xaml.Markup` (WinUI 3) / `Windows.UI.Xaml.Markup` (UWP) XAML language namespace.

## Related

- [XAML overview](./xaml-overview.md)
- [XAML intrinsic data types](./xaml-intrinsic-data-types.md)
