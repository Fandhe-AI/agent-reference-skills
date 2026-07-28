# ContentDialog

Customizable modal dialog box that can contain checkboxes, hyperlinks, buttons, and any other XAML content. Inherits from `ContentControl`.

## Signature / Usage

```csharp
private async void DisplayDeleteFileDialog()
{
    ContentDialog deleteFileDialog = new ContentDialog
    {
        XamlRoot = this.XamlRoot,
        Title = "Delete file permanently?",
        Content = "If you delete this file, you won't be able to recover it. Do you want to delete it?",
        PrimaryButtonText = "Delete",
        CloseButtonText = "Cancel",
        DefaultButton = ContentDialogButton.Primary
    };

    ContentDialogResult result = await deleteFileDialog.ShowAsync();

    if (result == ContentDialogResult.Primary)
    {
        // Delete the file.
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Title | object | Title of the dialog |
| Content | object | Dialog's content (inherited from `ContentControl`) |
| PrimaryButtonText | string | Text for the primary action button (leftmost "do it" action) |
| SecondaryButtonText | string | Text for the secondary action button (middle "do it" action) |
| CloseButtonText | string | Text for the safe, non-destructive close button (rightmost, required) |
| DefaultButton | ContentDialogButton | Which button receives accent styling and responds to ENTER (`Primary`, `Secondary`, `Close`) |
| IsPrimaryButtonEnabled | bool | Whether the primary button is enabled |
| IsSecondaryButtonEnabled | bool | Whether the secondary button is enabled |
| XamlRoot | XamlRoot | **Required in WinUI 3** — the XamlRoot to display the dialog in |
| FullSizeDesired | bool | Whether the dialog should display full size |

## Methods

| Name | Description |
|------|-------------|
| `ShowAsync()` | Displays the dialog modally; returns a `ContentDialogResult` (`Primary`, `Secondary`, `None`) |
| `Hide()` | Hides the dialog programmatically |

## Events

| Name | Description |
|------|-------------|
| PrimaryButtonClick | Raised when the primary button is tapped |
| SecondaryButtonClick | Raised when the secondary button is tapped |
| CloseButtonClick | Raised when the close button is tapped, or ESC/back/gamepad B is pressed |
| Opened | Raised when the dialog opens |
| Closing | Raised before the dialog closes; supports deferral to validate or prevent closure |
| Closed | Raised after the dialog closes |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.
- **In WinUI 3, `XamlRoot` must be set manually before calling `ShowAsync()`, or the dialog throws a runtime exception.** From a `Page`, set `dialog.XamlRoot = this.XamlRoot`. From a `Window` (which has no `XamlRoot` property), set it to the root content element's `XamlRoot`, e.g. `dialog.XamlRoot = rootPanel.XamlRoot`.
- Only one `ContentDialog` can be open per thread/window at a time; opening a second throws an exception. To chain dialogs, show the next one inside the `Closing` event handler.
- Every dialog should include at least one safe, nondestructive `CloseButton` so users can always exit confidently.
- Don't use the deprecated `MessageDialog` API for new WinUI 3 apps — use `ContentDialog` instead.

## Related

- [MessageDialog](./message-dialog.md)
- [Flyout](./flyout.md)
