# System.Windows.Forms.Form / Control

`System.Windows.Forms.Form` represents a window in a WinForms app; it derives from `System.Windows.Forms.Control`, the base class for all WinForms UI elements (buttons, labels, panels, and the form itself).

## Signature / Usage

```csharp
using System.Windows.Forms;

public class MyForm : Form
{
    public MyForm()
    {
        Text = "My Application";
        Size = new System.Drawing.Size(400, 300);
        StartPosition = FormStartPosition.CenterScreen;

        var button = new Button
        {
            Text = "Click Me",
            Location = new System.Drawing.Point(150, 120),
            Size = new System.Drawing.Size(100, 40)
        };
        button.Click += (s, e) => MessageBox.Show("Button clicked!");

        Controls.Add(button);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Text` | `string` | Title bar text (`Form`) or displayed text (most `Control` subclasses) |
| `WindowState` | `FormWindowState` | `Normal`, `Minimized`, `Maximized` |
| `StartPosition` | `FormStartPosition` | e.g. `CenterScreen`, `Manual` |
| `FormBorderStyle` | `FormBorderStyle` | `Sizable`, `FixedSingle`, `FixedDialog`, etc. |
| `DialogResult` | `DialogResult` | Result used with `ShowDialog()` |
| `IsMdiContainer` | `bool` | Whether the form hosts MDI child forms |
| `Controls` | `Control.ControlCollection` | Child controls added to this form/control |
| `Show()` / `ShowDialog()` | methods | Modeless / modal display |
| `Load`, `FormClosing`, `FormClosed` | events | Lifecycle events (`FormClosing` is cancelable) |

## Notes

- WinForms events (`Click`, `TextChanged`, etc.) are plain CLR events — no routing/tunneling as in WPF's `RoutedEvent`.
- `Control` is not marshalable across `AppDomain` boundaries.
- This is `System.Windows.Forms.Form` / `Control` (WinForms). It is unrelated to `System.Windows.Window` (WPF) and `Microsoft.UI.Xaml.Window` (WinUI 3) — WinForms has no XAML and no dependency-property system.

## Related

- [winforms-application-run.md](./winforms-application-run.md)
- [winforms-designer.md](./winforms-designer.md)
- [wpf-window.md](./wpf-window.md)
