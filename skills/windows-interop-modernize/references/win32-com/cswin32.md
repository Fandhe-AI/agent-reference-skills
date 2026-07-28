# CsWin32 Source Generator

`Microsoft.Windows.CsWin32` is a Roslyn source generator that produces strongly-typed C# P/Invoke and COM-interop bindings for Win32 APIs from Microsoft's `win32metadata` (`.winmd`), removing the need to hand-write `DllImport`/`LibraryImport` declarations.

## Signature / Usage

```xml
<!-- .csproj -->
<ItemGroup>
  <PackageReference Include="Microsoft.Windows.CsWin32" Version="*" PrivateAssets="all" />
</ItemGroup>
```

```text
# NativeMethods.txt (project root) — list the APIs to generate bindings for
CreateWindowEx
RegisterClassEx
GetMessage
DefWindowProc
```

```csharp
// Generated bindings become available under the Windows.Win32 namespace
using Windows.Win32;
using Windows.Win32.Foundation;

PInvoke.MessageBox(default(HWND), "Hello", "Title", 0);
```

## Options / Props

| Name | Description |
|------|-------------|
| `NativeMethods.txt` | Project file listing the exact Win32 functions/types/constants to generate |
| `NativeMethods.json` | Optional configuration file (e.g. target class name, allowed marshalling styles) |
| Generated namespace | `Windows.Win32.*`, mirroring the win32metadata structure |

## Notes

- Generates bindings only at compile time; adds no extra runtime assembly dependency.
- Produces developer-friendly overloads (e.g. `SafeHandle`-returning variants) in addition to raw P/Invoke signatures.
- Complements, rather than replaces, `windows-rs` in Rust codebases — CsWin32 is C#/.NET only.

## Related

- [P/Invoke from C# (DllImport / LibraryImport)](./pinvoke-csharp.md)
