# AOT and Trimming with C#/WinRT

C#/WinRT supports .NET Native AOT (`PublishAot`) publishing, building on top of IL trimming support. Because AOT relies on trimming, most trimming guidance (rooting types, avoiding reflection) applies to AOT builds too.

## Signature / Usage

```xml
<PropertyGroup>
  <PublishAot>true</PublishAot>
  <!-- Only if you hit CS0227 "Unsafe code may only appear if compiling with /unsafe" -->
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
<ItemGroup>
  <PackageReference Include="Microsoft.Windows.CsWinRT" Version="2.1.1" />
</ItemGroup>
```

```csharp
// Classes must be `partial` to be AOT-safe-analyzed by the C#/WinRT source generator.
public sealed partial class Example
{
    public int SampleProperty { get; set; }
}
```

```xml
<!-- Rooting a type that's only referenced dynamically (e.g. via {Binding}) -->
<ItemGroup>
  <TrimmerRootDescriptor Include="ILLink.Descriptors.xml" />
</ItemGroup>
```

## Options / Props

| Property / attribute | Description |
| --- | --- |
| `PublishAot` | Enables Native AOT publishing. Recommended to enable unconditionally, or at minimum for Release configuration publishes. |
| `partial` (on a class) | Required on any class with methods for the C#/WinRT AOT source analyzer to statically attribute it. |
| `WinRT.GeneratedBindableCustomProperty` (attribute) | Marks types used with the AOT-safe `ICustomPropertyProvider` implementation; the type must also be `partial`. |
| `AllowUnsafeBlocks` | Set `true` if the CsWinRT source generator emits `unsafe` code that triggers `CS0227`. |
| `TrimmerRootDescriptor` (ItemGroup) + `ILLink.Descriptors.xml` | Preserves a dynamically-referenced type (e.g. an `x:Bind`/`{Binding}` target) from trimming. |

## Notes

- Requires `Microsoft.Windows.CsWinRT` version `2.1.1` or later (until the corresponding .NET SDK servicing update ships the source generator by default).
- The developer is responsible for ensuring all dynamically-referenced types (reflection-based `{Binding}` targets) are properly rooted — trimming does not automatically detect these.
- WebView2 (`Microsoft.Web.WebView2` package version 1.0.2651.64 and earlier) is not yet AOT-compatible.
- Prefer reflection-free techniques (statically typed serialization, `typeof()`, `AppContext.BaseDirectory`) over reflection-based code to remain AOT/trimming compatible.
- Because the Windows App SDK invokes publishing targets during F5 deploy, enabling `PublishAot` at NuGet restore time (rather than only at publish time) avoids inconsistent builds.
- Dependency packages that have not adopted AOT support may still exhibit runtime issues even when your own project is AOT-clean.

## Related

- [C#/WinRT Overview](./overview.md)
- [Authoring WinRT Components with C#/WinRT](./authoring-winrt-components.md)
