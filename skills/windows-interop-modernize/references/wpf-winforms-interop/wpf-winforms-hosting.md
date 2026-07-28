# WindowsFormsHost / ElementHost

`System.Windows.Forms.Integration.WindowsFormsHost` hosts a WinForms `Control` inside a WPF element tree. `System.Windows.Forms.Integration.ElementHost` is the inverse — a WinForms `Control` that hosts a WPF `UIElement`. Both live in `WindowsFormsIntegration.dll`.

## Signature / Usage

```xaml
<!-- WPF hosting a WinForms control -->
<Window xmlns:wf="clr-namespace:System.Windows.Forms;assembly=System.Windows.Forms">
    <Grid>
        <WindowsFormsHost>
            <wf:MaskedTextBox x:Name="mtbDate" Mask="00/00/0000"/>
        </WindowsFormsHost>
    </Grid>
</Window>
```

```csharp
// WinForms hosting a WPF UserControl
private void Form1_Load(object sender, EventArgs e)
{
    var host = new ElementHost { Dock = DockStyle.Fill };
    host.Child = new HostingWpfUserControlInWf.UserControl1();
    this.Controls.Add(host);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `WindowsFormsHost.Child` | `System.Windows.Forms.Control` | The WinForms control hosted inside WPF (XAML content property) |
| `ElementHost.Child` | `System.Windows.UIElement` | The WPF element hosted inside WinForms (content property) |
| `WindowsFormsHost.PropertyMap` / `ElementHost.PropertyMap` | `PropertyMap` | Customizes how host properties (e.g. `Background`, `Font`) map onto the hosted content |

## Notes

- Both host classes can host **only a single child**; wrap multiple controls/elements in a container (`Panel`, `Grid`) as the single child.
- `WindowsFormsHost` derives from `HwndHost` — see `hwndhost-hwndsource.md`.
- Dispose `WindowsFormsHost`/`ElementHost` instances explicitly in hybrid apps to avoid leaking native window resources.
- Ambient WPF properties (`Background`, `Foreground`, `FontFamily`, `FontSize`, `FontStyle`, `FontWeight`, `Padding`, `TabIndex`) flow into the hosted WinForms control via the default `PropertyMap`.

## Related

- [hwndhost-hwndsource.md](./hwndhost-hwndsource.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)
- [winforms-form-control.md](./winforms-form-control.md)
