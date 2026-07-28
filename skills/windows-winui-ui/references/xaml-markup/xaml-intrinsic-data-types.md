# XAML intrinsic data types

Language-level support in XAML for the Windows Runtime for frequently-used primitive types (common language runtime and other languages such as C++). Most often used when defining resources in a XAML `ResourceDictionary`, or providing key-frame values for storyboarded animations.

## Signature / Usage

```xaml
<Page.Resources>
  <x:String x:Key="greeting">Hello world</x:String>
</Page.Resources>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| x:Boolean | bool | Corresponds to CLR `Boolean`. Case-insensitive value parsing. "x:Bool" is not an accepted alternative. |
| x:String | string | Corresponds to CLR `String`. Encoding defaults to the surrounding XML encoding. |
| x:Double | double | Corresponds to CLR `Double`. Permits `"NaN"` (case-sensitive) and scientific notation (e.g. `"1+E06"` for 1,000,000). |
| x:Int32 | int | Corresponds to CLR `Int32`. Signed; minus sign allowed, absence of sign implies positive. |

## Notes

- These four primitives (`x:Boolean`, `x:String`, `x:Double`, `x:Int32`) are generally the only cases where an object element uses the `x:` prefix in real-world XAML markup.
- The XAML 2009 specification defines other primitives such as `x:Uri` and `x:Single`; unless listed in the table above, other XAML-spec language primitives are **not currently supported** in XAML for the Windows Runtime (per official docs, this includes types not explicitly listed here — no dedicated `x:Array` reference page currently exists in the official WinUI/UWP docs).
- Dates and times (`DateTime`, `DateTimeOffset`, `TimeSpan`) are not settable with a XAML primitive; there's no built-in from-string conversion. Set these from code-behind at page/element load time.
- Package: `Microsoft.UI.Xaml` (WinUI 3) / `Windows.UI.Xaml` (UWP) XAML language namespace.

## Related

- [x:Null markup extension](./x-null-markup-extension.md)
- [ResourceDictionary and XAML resource references](./xaml-resource-dictionary.md)
- [XAML syntax guide](./xaml-syntax-guide.md)
