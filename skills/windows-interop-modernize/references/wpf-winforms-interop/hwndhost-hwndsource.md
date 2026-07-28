# HwndHost / HwndSource

`System.Windows.Interop.HwndHost` embeds a native Win32 window (HWND) as an element inside a WPF content tree. `System.Windows.Interop.HwndSource` is the inverse: it embeds WPF content inside a native Win32 HWND. Both live in `System.Windows.Interop`.

## Signature / Usage

```csharp
public class Win32Control : HwndHost
{
    protected override HandleRef BuildWindowCore(HandleRef hwndParent)
    {
        // P/Invoke CreateWindowEx to create the child HWND, parented to hwndParent.hWnd
        IntPtr hwnd = CreateWindowEx(/* ... */, hwndParent.Handle, /* ... */);
        return new HandleRef(this, hwnd);
    }

    protected override void DestroyWindowCore(HandleRef hwnd)
    {
        DestroyWindow(hwnd.Handle);
    }
}
```

```xaml
<Window xmlns:local="clr-namespace:YourNamespace">
    <Grid>
        <local:Win32Control Width="400" Height="300"/>
    </Grid>
</Window>
```

## Options / Props

| Member | Description |
|--------|-------------|
| `HwndHost.BuildWindowCore(HandleRef hwndParent)` | Abstract; create and return the hosted native child window |
| `HwndHost.DestroyWindowCore(HandleRef hwnd)` | Abstract; destroy the hosted native window |
| `HwndHost.Handle` | Window handle of the hosted content |
| `HwndSource` | Wraps a WPF visual tree in a native HWND (used to embed WPF content into an existing Win32 window/app) |
| `HwndSourceParameters` | Configures a new `HwndSource` (parent HWND, window style, size) |

## Notes

- `HwndHost` derives from `FrameworkElement` for layout participation, but most `FrameworkElement`/`UIElement` properties and input events don't map to the hosted Win32 window's equivalents across the interop boundary.
- `WindowsFormsHost` (see `wpf-winforms-hosting.md`) is itself an `HwndHost` subclass — it's the ready-made way to embed WinForms controls rather than writing a custom `HwndHost`.
- Use `HwndHost` for embedding arbitrary Win32/legacy HWND content (e.g. an ActiveX control, an unmanaged window) into WPF; use `HwndSource` for the opposite direction — hosting WPF content inside a native Win32 app or window.

## Related

- [wpf-winforms-hosting.md](./wpf-winforms-hosting.md)
- [wpf-window.md](./wpf-window.md)
