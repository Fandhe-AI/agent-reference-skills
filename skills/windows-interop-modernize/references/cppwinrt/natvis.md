# Visual Studio Native Debug Visualization (natvis) for C++/WinRT

The C++/WinRT Visual Studio Extension (VSIX) provides natvis debug visualization of C++/WinRT projected types, giving an experience similar to C# debugging.

## Signature / Usage

Natvis is automatically on for debug builds. To opt in for a release build, define `WINRT_NATVIS` and generate a full PDB. Troubleshooting from the Visual Studio Immediate/Command window:

```console
>? WINRT_abi_val((::IUnknown*)&stringable, L"{96369F54-8EB6-48F0-ABCE-C1B211E627C3}", 0).s,sh
L"string"
```

## Options / Props

| Name | Description |
|------|-------------|
| `WINRT_NATVIS` | Symbol defined automatically when `_DEBUG` is defined; compiling with it exports `WINRT_abi_val`, the entry point the visualizer uses to evaluate property values in the target process. |
| `WINRT_abi_val` | Exported function invoked via the C++ Expression Evaluator; makes `VirtualQuery` calls to avoid faulting. |

## Notes

- Release builds need `WINRT_NATVIS` defined and a full PDB (the Expression Evaluator needs symbolic definitions of displayed property types).
- A visualized type must report a runtime class or interface defined in discoverable metadata through `IInspectable::GetRuntimeClassName`. It works best with Windows system types (metadata in `C:\Windows\System32\WinMetadata`), but supports user-defined types and remote debugging if `.winmd` files are located.
- User-defined metadata lookup: alongside the process `.exe`, probing successive substrings of the type name (for `Contoso.Controls.Widget`: `Contoso.Controls.Widget.winmd`, `Contoso.Controls.winmd`, `Contoso.winmd`).
- Remote debugging falls back to a local cache folder (`%TEMP%`) and downloads the `.winmd` from the target if needed.
- Enable diagnostics via **Tools > Options > Debugging > Output Window > Natvis diagnostic messages**. When a property can't be evaluated, the Watch window shows "<Object uninitialized or information unavailable>".
- If no metadata is found: `Natvis C++/WinRT: Could not find metadata for Consoso.Controls.Widget`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/natvis (en-us, fetched 2026-10-16)

## Related

- [Get Started](./get-started.md)
- [Overview](./overview.md)
