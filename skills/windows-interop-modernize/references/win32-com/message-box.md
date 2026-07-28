# MessageBoxW

Displays a modal dialog box containing a system icon, a set of buttons, and a brief application-specific message; returns which button the user selected.

## Signature / Usage

```cpp
int MessageBoxW(
  [in, optional] HWND    hWnd,
  [in, optional] LPCWSTR lpText,
  [in, optional] LPCWSTR lpCaption,
  [in]           UINT    uType
);
```

```cpp
int id = MessageBoxW(
    NULL,
    L"Resource not available\nDo you want to try again?",
    L"Account Details",
    MB_ICONWARNING | MB_CANCELTRYCONTINUE | MB_DEFBUTTON2);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| hWnd | HWND | Owner window; `NULL` for no owner |
| lpText | LPCWSTR | Message text; `\n` separates lines |
| lpCaption | LPCWSTR | Dialog title; `NULL` defaults to "Error" |
| uType | UINT | Combination of button (`MB_OK`, `MB_OKCANCEL`, `MB_YESNO`, `MB_YESNOCANCEL`, `MB_RETRYCANCEL`, `MB_ABORTRETRYIGNORE`, `MB_CANCELTRYCONTINUE`), icon (`MB_ICONERROR`, `MB_ICONWARNING`, `MB_ICONINFORMATION`, `MB_ICONQUESTION`), default-button (`MB_DEFBUTTON1..4`), and modality (`MB_APPLMODAL`, `MB_SYSTEMMODAL`, `MB_TASKMODAL`) flags |

Return value: one of `IDOK`, `IDCANCEL`, `IDABORT`, `IDRETRY`, `IDIGNORE`, `IDYES`, `IDNO`, `IDTRYAGAIN`, `IDCONTINUE`; `0` on failure (call `GetLastError`).

## Notes

- `MessageBoxW` is the Unicode entry point; the `MessageBox` alias selects it under `UNICODE`.
- For dialogs with custom controls, use `DialogBoxParamW` instead.

## Related

- [DialogBoxParamW](./dialog-box.md)
