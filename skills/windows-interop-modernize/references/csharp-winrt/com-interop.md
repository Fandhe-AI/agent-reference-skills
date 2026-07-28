# COM Interop with ComImport and ComWrappers

Before .NET 5, the CLR had built-in support for WinRT (`IInspectable`-based) interop, so you could define a COM interop interface directly in C# with `[ComImport]` and cast a projected object to it. Since .NET 5 removed built-in WinRT support, `[ComImport]` still works for plain `IUnknown`-based COM interfaces, but no longer works for `IInspectable`-based WinRT interfaces. For WinRT interop, use the `WinRT.Interop` projected classes (see [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md)) or `ComWrappers`/`Marshal.GetObjectForIUnknown` for raw COM interop.

## Signature / Usage

```csharp
// Casting to a [ComImport] interface requires .As<T>(), not a C# cast expression.
someObject.As<SomeComImportInterface>();
```

```csharp
// [ComImport] is still valid for IUnknown-based (non-WinRT) COM interfaces.
[ComImport]
[Guid("00000000-0000-0000-C000-000000000046")]
[InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
public interface IUnknownBasedInterface
{
    void SomeMethod();
}
```

```csharp
// Wrapping a raw COM pointer as a managed object (Runtime Callable Wrapper).
object comObject = Marshal.GetObjectForIUnknown(pUnknown);
```

## Options / Props

| API | Description |
| --- | --- |
| `[System.Runtime.InteropServices.ComImportAttribute]` | Marks an interface as a COM-imported type. Still valid for `IUnknown`-based interfaces; not valid for `IInspectable`-based WinRT interfaces in .NET 5+. |
| `.As<T>()` (WinRT projection extension) | Required (instead of a C# cast expression) when casting a WinRT-projected object to a `[ComImport]`-attributed interface. |
| `System.Runtime.InteropServices.Marshal.GetObjectForIUnknown(IntPtr)` | Wraps a raw `IUnknown*` pointer as a managed Runtime Callable Wrapper object. Legacy COM interop mechanism, predates `ComWrappers`. |
| `System.Runtime.InteropServices.ComWrappers` | .NET 5+ mechanism for managing COM/WinRT object lifetime and identity without the built-in COM interop marshaler; the mechanism C#/WinRT itself is built on. |

## Notes

- Casting error `System.InvalidCastException` when casting to a `[ComImport]`-attributed interface is fixed by using `.As<T>()` instead of an explicit cast expression.
- `Marshal.GetObjectForIUnknown` / `Marshal.GetIUnknownForObject` are the legacy RCW/CCW mechanism and are not integrated with `ComWrappers`; prefer `ComWrappers`-based interop (which C#/WinRT itself uses internally) for new WinRT interop code rather than hand-writing `Marshal` calls.
- Declaring `IInitializeWithWindow` yourself with `[ComImport]` is unnecessary for WinRT usage — `WinRT.Interop.InitializeWithWindow` (a C#/WinRT projected class) already wraps it; see [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md).

## Related

- [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md)
- [C#/WinRT Overview](./overview.md)
- [System.Runtime.InteropServices.WindowsRuntime Removal](./dotnet-winrt-removal.md)
