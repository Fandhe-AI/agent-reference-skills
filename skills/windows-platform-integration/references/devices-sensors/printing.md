# Printing (PrintManager / PrintDocument)

APIs for printing app content: `PrintManager` (`Windows.Graphics.Printing`) orchestrates the OS printing flow; `PrintDocument` (`Microsoft.UI.Xaml.Printing`) prepares XAML content into pages sent to the printer.

## Signature / Usage

```csharp
using Microsoft.UI.Xaml.Printing;
using Windows.Graphics.Printing;

PrintDocument printDocument;
IPrintDocumentSource printDocumentSource;

void RegisterForPrinting()
{
    var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
    PrintManager printManager = PrintManagerInterop.GetForWindow(hWnd);
    printManager.PrintTaskRequested += PrintTask_Requested;

    printDocument = new PrintDocument();
    printDocumentSource = printDocument.DocumentSource;
    printDocument.Paginate += (s, e) => { /* build printPreviewPages, call SetPreviewPageCount */ };
    printDocument.GetPreviewPage += (s, e) => { /* SetPreviewPage(e.PageNumber, page) */ };
    printDocument.AddPages += (s, e) => { /* AddPage(...) for each page, then AddPagesComplete() */ };
}

async void OnPrintButtonClick()
{
    if (PrintManager.IsSupported())
    {
        var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(App.MainWindow);
        await PrintManagerInterop.ShowPrintUIForWindowAsync(hWnd);
    }
}

void PrintTask_Requested(PrintManager sender, PrintTaskRequestedEventArgs args)
{
    PrintTask printTask = args.Request.CreatePrintTask("My document", (taskArgs) =>
    {
        taskArgs.SetSource(printDocumentSource);
    });
    printTask.Completed += (s, e) => { /* check e.Completion */ };
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `PrintManagerInterop.GetForWindow(IntPtr hWnd)` | Gets the `PrintManager` for the given window handle (WinUI 3 / Windows App SDK). |
| `PrintManagerInterop.ShowPrintUIForWindowAsync(IntPtr hWnd)` | Displays the system print UI for the given window. |
| `PrintManager.IsSupported()` | Checks whether printing is supported on the current device before invoking print UI. |
| `PrintManager.PrintTaskRequested` | Event raised when the print UI is shown; used to create a `PrintTask`. |
| `PrintTaskRequest.CreatePrintTask(string title, PrintTaskSourceRequestedHandler)` | Creates the `PrintTask`, associating a title and a `PrintDocumentSource` handler. |
| `PrintTask.Completed` | Event reporting `PrintTaskCompletion` (`Submitted`, `Canceled`, `Failed`). |
| `PrintDocument.Paginate` | Event to build/paginate pages using `PrintTaskOptions.GetPageDescription(0)`. |
| `PrintDocument.GetPreviewPage` | Event to supply a specific page for print preview. |
| `PrintDocument.AddPages` | Event to supply the final page collection sent to the printer. |

## Notes

- Namespace: `Windows.Graphics.Printing` (`PrintManager`, `PrintTask`) plus `Microsoft.UI.Xaml.Printing` (`PrintDocument`, WinUI 3 / Windows App SDK). Distinct from Android `PrintManager`/`PrintDocumentAdapter` and Apple `UIPrintInteractionController`.
- Registration must happen on the currently-displayed screen only, typically from the page's `Loaded` event (not `OnNavigatedTo`) so the window handle is non-null; unregister in `OnNavigatedFrom` to avoid exceptions when leaving and returning to the page.
- Printers and scanners generally do not require a `DeviceCapability` manifest declaration, unlike most other device APIs in this category.
- For 3D printing (`Windows.Graphics.Printing3D`) or lower-level UWP print device apps, see the separate driver/device-app documentation; this page covers standard document printing from an app.

## Related

- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
