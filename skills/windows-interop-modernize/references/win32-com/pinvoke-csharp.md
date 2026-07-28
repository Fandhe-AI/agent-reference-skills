# P/Invoke from C# (DllImport / LibraryImport)

Platform Invoke (P/Invoke) lets managed C# code call unmanaged Win32 functions. `DllImport` is the classic runtime-marshalled attribute; `LibraryImport` (since .NET 7) is a source-generator-based alternative that produces compile-time marshalling code with less overhead.

## Signature / Usage

```csharp
using System;
using System.Runtime.InteropServices;

public partial class Program
{
    // Source-generated P/Invoke (preferred, .NET 7+)
    [LibraryImport("user32.dll", StringMarshalling = StringMarshalling.Utf16, SetLastError = true)]
    private static partial int MessageBoxW(IntPtr hWnd, string lpText, string lpCaption, uint uType);

    // Classic runtime-marshalled P/Invoke
    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);

    public static void Main()
    {
        MessageBoxW(IntPtr.Zero, "Command-line message box", "Attention!", 0);
    }
}
```

## Options / Props

| Attribute / member | Description |
|---------------------|-------------|
| `[DllImport(dllName)]` | Marks an `extern` method as an unmanaged import; runtime performs marshalling at call time |
| `[LibraryImport(dllName)]` | Marks a `partial` method; a Roslyn source generator emits marshalling code at compile time (no runtime `Reflection.Emit` marshaller) |
| `StringMarshalling` / `CharSet` | Controls string encoding (`Utf16`, `Utf8`, `Ansi`) between managed and native strings |
| `SetLastError` | Captures the native `GetLastError()` value for retrieval via `Marshal.GetLastPInvokeError()` |
| callback parameters | Represent native function-pointer parameters (e.g. `WNDENUMPROC`) with a managed `delegate` type |

## Notes

- `LibraryImport` requires the containing type and method to be `partial`; it is the recommended approach for new code (AOT-friendly, no runtime codegen).
- `DllImport` remains necessary for signatures `LibraryImport`'s generator does not yet support.
- Win32 handle types (`HWND`, `LPARAM`, etc.) are commonly represented as `IntPtr`/`nint` in P/Invoke signatures.

## Related

- [CsWin32](./cswin32.md)
