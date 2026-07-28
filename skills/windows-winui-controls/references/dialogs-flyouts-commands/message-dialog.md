# MessageDialog

Legacy UWP dialog for showing simple messages/questions to the user. Part of `Windows.UI.Popups`.

## Signature / Usage

```csharp
var messageDialog = new MessageDialog("No internet connection has been found.");

messageDialog.Commands.Add(new UICommand("Try again", new UICommandInvokedHandler(CommandInvokedHandler)));
messageDialog.Commands.Add(new UICommand("Close", new UICommandInvokedHandler(CommandInvokedHandler)));

messageDialog.DefaultCommandIndex = 0;
messageDialog.CancelCommandIndex = 1;

await messageDialog.ShowAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Title | string | Title displayed on the dialog, if any |
| Content | string | Message displayed to the user |
| Commands | IVector\<IUICommand\> | Commands shown in the dialog's command bar (up to 3 on desktop, 2 on mobile); if empty, a default close command is added |
| DefaultCommandIndex | uint | Index of the command invoked when ENTER is pressed. Set after adding commands |
| CancelCommandIndex | uint | Index of the command invoked when ESC is pressed. Set after adding commands |
| Options | MessageDialogOptions | Additional display options for the dialog |

## Methods

| Name | Description |
|------|-------------|
| `ShowAsync()` | Begins an asynchronous operation showing the dialog |

## Notes

- Namespace: `Windows.UI.Popups` (UWP legacy API), not `Microsoft.UI.Xaml.Controls`.
- **For new XAML/WinUI 3 apps, use `ContentDialog` instead.** Use `MessageDialog` only when upgrading a Universal Windows 8.x app that already uses it, or for non-XAML apps.
- In a desktop (WinUI 3) app, the dialog object must be associated with its owner window handle before it can display UI.

## Related

- [ContentDialog](./content-dialog.md)
