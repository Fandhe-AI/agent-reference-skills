# windows-rs

The `windows` crate is Microsoft's official Rust binding to the Windows API surface (Win32, WinRT, and COM), generated from the same `win32metadata`/`winmd` sources used by CsWin32. It exposes Windows APIs under hierarchical modules such as `windows::Win32::...`.

## Signature / Usage

```toml
# Cargo.toml
[dependencies]
windows = { version = "0.x", features = [
    "Win32_Foundation",
    "Win32_UI_WindowsAndMessaging",
] }
```

```rust
use windows::Win32::Foundation::*;
use windows::Win32::UI::WindowsAndMessaging::*;
use windows::core::*;

unsafe {
    MessageBoxW(None, w!("Hello from Rust"), w!("windows-rs"), MB_OK);
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `windows::Win32::*` | Direct bindings to low-level Win32 functions, structs, and constants |
| `windows::core::*` | Core types: `Result`, `HRESULT`, `HSTRING`, `w!` macro for `PCWSTR` literals |
| Cargo feature flags | Each Windows namespace/module must be enabled explicitly as a Cargo feature (keeps binaries small) |
| COM interop | Generated interfaces implement `windows::core::Interface`, analogous to `IUnknown::QueryInterface`/smart-pointer patterns in C++ |

## Notes

- Feature discovery: use the crate's online feature search (`microsoft.github.io/windows-rs/features`) to find the Cargo feature name for a given Win32 API.
- Most raw Win32 calls in the bindings are `unsafe`; the crate wraps COM activation/lifetime in safe `Result`-returning helpers where practical.
- Distinct from `windows-sys` (a lower-level, `unsafe`-only sibling crate with no `Result`/COM ergonomics) and from CsWin32 (C#/.NET only).

## Related

- [ComPtr / winrt::com_ptr](./com-smart-pointers.md)
