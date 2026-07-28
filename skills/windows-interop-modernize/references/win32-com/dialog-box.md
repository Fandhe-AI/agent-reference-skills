# DialogBoxParamW

Creates a modal dialog box from a dialog box template resource, passing an application-defined value to the dialog procedure via `WM_INITDIALOG`.

## Signature / Usage

```cpp
INT_PTR DialogBoxParamW(
  [in, optional] HINSTANCE hInstance,
  [in]           LPCWSTR   lpTemplateName,
  [in, optional] HWND      hWndParent,
  [in, optional] DLGPROC   lpDialogFunc,
  [in]           LPARAM    dwInitParam
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| hInstance | HINSTANCE | Module containing the dialog template; `NULL` uses the current executable |
| lpTemplateName | LPCWSTR | Template name string or `MAKEINTRESOURCE` identifier |
| hWndParent | HWND | Owner window of the dialog box |
| lpDialogFunc | DLGPROC | Pointer to the dialog box procedure |
| dwInitParam | LPARAM | Value passed as `lParam` of `WM_INITDIALOG` |

Return value: `INT_PTR` — the `nResult` passed to `EndDialog`; `0` if `hWndParent` was invalid, `-1` on other failures (`GetLastError`).

## Notes

- Internally uses `CreateWindowEx` to build the dialog, then runs its own modal message loop until `EndDialog` is called.
- Disables the owner window while the dialog is displayed and re-enables it afterward.
- `DialogBoxParamW` is the Unicode entry point.

## Related

- [MessageBoxW](./message-box.md)
