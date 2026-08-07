# A Windows App SDK migration of the UWP PhotoLab sample app (C#)

Case study walkthrough of taking the C# [UWP PhotoLab sample app](https://github.com/microsoft/Windows-appsample-photo-lab) and migrating it to the Windows App SDK, migrating each type in dependency order (assets, `ImageFileInfo` model, `App`, `LoadedImageBrush`, `DetailPage`, `MainPage`, navigation, back button).

## Signature / Usage

```csharp
// App.xaml.cs — expose the main window and its HWND as static members,
// used throughout the walkthrough by migrated code that needs Window.Current
// or a window handle for pickers/dialogs
public partial class App : Application
{
    protected override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
    {
        Window = new MainWindow();
        Window.Activate();
        WindowHandle = WinRT.Interop.WindowNative.GetWindowHandle(Window);
    }

    public static MainWindow Window { get; private set; }
    public static IntPtr WindowHandle { get; private set; }
}
```

## Options / Props

| Migration order | Source type | Key changes |
|------|-------------|-------------|
| 1 | Asset files | Copy `Assets` + `Samples` subfolder from the UWP project into the target `WinUI Blank App (Packaged)` project |
| 2 | `ImageFileInfo` (model) | `namespace PhotoLab` → `namespace PhotoLabWinUI`; `Windows.UI.Xaml` → `Microsoft.UI.Xaml` |
| 3 | `App` | Add static `Window` and `WindowHandle` properties for later use by `FileSavePicker` and `Window.Current` replacements |
| 4 | `LoadedImageBrush` | `Windows.UI.Composition` → `Microsoft.UI.Composition`; `Window.Current.Compositor` → `App.Window.Compositor` |
| 5 | `DetailPage` (view) | Set `ContentDialog.XamlRoot` before `ShowAsync`; remove `SystemNavigationManager` back-button code; add `WinRT.Interop.InitializeWithWindow.Initialize` before `FileSavePicker.PickSaveFileAsync` |
| 6 | `MainPage` (view) | Same `ContentDialog.XamlRoot` and back-button removal as `DetailPage`; remove `ReorderGridAnimation.Duration` markup |
| 7 | Navigation | Replace `MainWindow.xaml`'s `StackPanel` with a named `Frame`, and `Navigate(typeof(MainPage))` in the `MainWindow` constructor |
| 8 | Back button | Re-add an `AppBarButton` in `DetailPage.xaml` and a `Frame.GoBack()` handler, since Win32 apps have no built-in back-button chrome |

## Notes

- Uses a *source* (UWP) / *target* (Windows App SDK) project pair created side by side; the target project is a new `WinUI Blank App (Packaged)` C# project named `PhotoLabWinUI`.
- Before attempting this walkthrough, see [Overall migration strategy](./overall-migration-strategy.md) and [What's supported when migrating from UWP to WinUI](./what-is-supported.md) to confirm all needed features are supported.
- Requires installing tools for the Windows App SDK and checking the release channel's known issues before following along, since these can affect the case study's exact steps.
- The `Windows-appsample-photo-lab` sample depends on Win2D (`Microsoft.Graphics.Win2D` NuGet package) for its photo-effects pipeline; the target project needs the same dependency added manually.
- Namespace changes throughout (`Windows.UI.Xaml` → `Microsoft.UI.Xaml`, `Windows.UI.Colors` → `Microsoft.UI.Colors`) follow the general mapping in [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md).

## Related

- [Migrate from UWP to the Windows App SDK](./migration-overview.md)
- [Overall migration strategy](./overall-migration-strategy.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [User interface migration (including WinUI)](./winui3-ui-migration.md)
- [A Windows App SDK migration of the UWP Photo Editor sample app (C++/WinRT)](./case-study-2-photo-editor.md)
