# Application.Run (WinForms)

`System.Windows.Forms.Application` is a static class that manages the WinForms message loop, thread-level app settings, and app lifetime. `Application.Run` starts the message loop for the current thread, optionally showing a main form.

## Signature / Usage

```csharp
using System.Windows.Forms;

static class Program
{
    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new MyForm());
    }
}
```

## Options / Props

| Member | Description |
|--------|-------------|
| `Application.Run()` | Starts a message loop without a main form (for use with `ApplicationContext`) |
| `Application.Run(Form)` | Starts the message loop and shows the given form as the main form; loop ends when it closes |
| `Application.Run(ApplicationContext)` | Starts the loop under custom lifetime rules (e.g. tray apps with no visible main form) |
| `Application.EnableVisualStyles()` | Enables OS visual styles for controls (call before creating any control) |
| `Application.Exit()` | Ends the message loop / all message loops of the process |
| `[STAThread]` | Required attribute on `Main` — WinForms controls require a single-threaded apartment |

## Notes

- `Application.Run` blocks the calling thread until the message loop ends (main form closed, or `Application.Exit()` called).
- WinForms's event-driven model + `Application.Run` message pump is analogous in role to WPF's `Application.Run()`/`Dispatcher` message loop, but they are separate implementations (`System.Windows.Forms.Application` vs `System.Windows.Application`) and not interchangeable.

## Related

- [winforms-form-control.md](./winforms-form-control.md)
- [wpf-application.md](./wpf-application.md)
