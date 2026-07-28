# InkCanvas / InkToolbar

UWP controls for pen/stylus ink input (`InkCanvas`) and an associated toolbar of ink tools (`InkToolbar`).

## Signature / Usage

```xaml
<!-- UWP only -->
<InkCanvas x:Name="inkCanvas"/>
<InkToolbar TargetInkCanvas="{x:Bind inkCanvas}"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| InkPresenter | InkPresenter | (UWP) Manages ink strokes, input processing, and rendering for `InkCanvas`. |
| TargetInkCanvas | InkCanvas | (UWP) The `InkCanvas` an `InkToolbar` controls. |

## Notes

- Package: `Windows.UI.Xaml.Controls.InkCanvas` / `InkToolbar` (UWP namespace, not `Microsoft.UI.Xaml.Controls`).
- **Not available in the stable WinUI 3 / Windows App SDK 2.0 channel.** `InkCanvas` exists only as an experimental API (introduced in Windows App SDK 2.0 Experimental 1); `InkToolbar` is not available at all. Referencing either type in WinUI 3 XAML produces a `WMC0001 Unknown type` build error because the types don't exist in `Microsoft.UI.Xaml.Controls`.
- Recommended WinUI 3 alternatives: [Win2D](https://github.com/Microsoft/Win2D) combined with manual pointer input handling, or third-party inking libraries.
- Do not use experimental APIs in production apps; they may change or be removed in future releases.

## Related

- [Image](./image.md)
