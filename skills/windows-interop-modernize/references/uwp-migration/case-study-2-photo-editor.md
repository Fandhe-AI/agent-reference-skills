# A Windows App SDK migration of the UWP Photo Editor sample app (C++/WinRT)

Case study walkthrough of taking the C++/WinRT [UWP Photo Editor sample app](https://github.com/microsoft/windows-appsample-photo-editor) and migrating it to the Windows App SDK, migrating each type in dependency order (assets, `Photo` model, `App`, `DetailPage`, `MainPage`, navigation, threading fixes).

## Signature / Usage

```cppwinrt
// App.xaml.h / App.xaml.cpp — make the main window a static member with an
// accessor, replacing UWP's Window::Current() pattern
struct App : AppT<App>
{
    static winrt::Microsoft::UI::Xaml::Window Window(){ return window; };

private:
    static winrt::Microsoft::UI::Xaml::Window window;
};

// App.xaml.cpp
winrt::Microsoft::UI::Xaml::Window App::window{ nullptr };

void App::OnLaunched(LaunchActivatedEventArgs const&)
{
    window = make<MainWindow>();

    Frame rootFrame = CreateRootFrame();
    if (!rootFrame.Content())
    {
        rootFrame.Navigate(xaml_typename<PhotoEditor::MainPage>());
    }

    window.Activate();
}
```

## Options / Props

| Migration order | Source type | Key changes |
|------|-------------|-------------|
| 1 | Asset files | Copy `Assets` folder (eight files) from the UWP project into the target `WinUI Blank App (Packaged)` C++/WinRT project |
| 2 | `Photo` (model, `.idl`/`.h`/`.cpp`) | `Windows.UI.Xaml` → `Microsoft.UI.Xaml` in the IDL; add `#include "Photo.g.cpp"`; `Windows::UI::Xaml` → `Microsoft::UI::Xaml` in code |
| 3 | `App` | Add static `window` member + `Window()` accessor; migrate `OnNavigationFailed` and `CreateRootFrame`; merge `OnLaunched` to use `Microsoft::UI::Xaml::LaunchActivatedEventArgs` |
| 4 | `DetailPage` (view) | Rename `.h`/`.cpp` to `.xaml.h`/`.xaml.cpp`; add Win2D package reference; `Windows::UI::Composition`/`Windows::UI::Xaml` → `Microsoft::UI::...`; `Window::Current()` → `App::Window()` |
| 5 | `MainPage` (view) | Same rename and namespace changes as `DetailPage`; set `ContentDialog.XamlRoot` before `ShowAsync`; `Window::Current()` → `App::Window()` |
| 6 | `MainWindow` | Remove placeholder `StackPanel`/`MyProperty`/`myButton_Click`, leaving only the constructor and an empty `Window` element |
| 7 | Threading fixes | `MainPage`: `co_await wil::resume_foreground(...)` before `StorageFile.GetThumbnailAsync` to avoid `GridView` reentrancy crash; `Photo`: cache `ImageProperties.Title` in the constructor instead of accessing it from a data-bound accessor on the UI thread |

## Notes

- Uses a *source* (UWP) / *target* (Windows App SDK) project pair; the target project is a new `WinUI Blank App (Packaged)` C++/WinRT project named `PhotoEditor`.
- Before attempting this walkthrough, see [Overall migration strategy](./overall-migration-strategy.md), including the [Folder and file name differences (C++/WinRT)](./overall-migration-strategy.md) that require renaming `.h`/`.cpp` to `.xaml.h`/`.xaml.cpp` and re-nesting `.idl` files as `DependentUpon` in the `.vcxproj`.
- Requires installing tools for the Windows App SDK and checking the release channel's known issues; a `PropertyGroup` with `EnableWin32Codegen=true` may be needed in `.vcxproj` for VSIX Preview 3 project templates.
- The `Windows-appsample-photo-editor` sample depends on Win2D (`Microsoft.Graphics.Win2D` NuGet package) for `DetailPage`'s photo-effects pipeline; the target project needs the same dependency added manually.
- The threading fixes are necessary because of the ASTA-to-STA threading model change between UWP and the Windows App SDK — see [Threading functionality migration](./threading-migration.md).
- Namespace changes throughout follow the general mapping in [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md).
- An appendix in the source topic shows an alternative approach of copying file *contents* into generated stubs rather than copying whole source files, using the `Photo` model as the worked example.

## Related

- [Migrate from UWP to the Windows App SDK](./migration-overview.md)
- [Overall migration strategy](./overall-migration-strategy.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Threading functionality migration](./threading-migration.md)
- [A Windows App SDK migration of the UWP PhotoLab sample app (C#)](./case-study-1-photolab.md)
