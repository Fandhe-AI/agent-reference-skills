# XAML Islands

| Name | Description | Path |
|------|-------------|------|
| XAML Islands overview | Overview of hosting WinUI 3 content in WPF/WinForms/Win32 apps via Windows App SDK 1.4+ | [overview.md](./overview.md) |
| DesktopWindowXamlSource | Primary hosting class; `Initialize`, `Content`, `SiteBridge`, focus events | [desktop-window-xaml-source.md](./desktop-window-xaml-source.md) |
| DesktopChildSiteBridge | Manages the hosted content's child HWND positioning/visibility/Z-order | [desktop-child-site-bridge.md](./desktop-child-site-bridge.md) |
| WindowsXamlManager | Initializes/tracks the WinUI XAML framework lifetime on a thread | [windows-xaml-manager.md](./windows-xaml-manager.md) |
| Hosting in WPF, WinForms, and Win32 apps | Step-by-step hosting procedure per host framework | [hosting-wpf-winforms-win32.md](./hosting-wpf-winforms-win32.md) |
| Input and focus navigation | Keyboard focus handoff between host window and hosted content | [input-focus-navigation.md](./input-focus-navigation.md) |
| DPI and sizing | Keeping the hosted content's HWND in sync with host window bounds/DPI | [dpi-and-sizing.md](./dpi-and-sizing.md) |
| UWP XAML Islands vs WinUI 3 XAML Islands | Differences and migration notes between the two hosting APIs | [uwp-vs-winui3-migration.md](./uwp-vs-winui3-migration.md) |
| Limitations and known issues | Constraints of both the WinUI 3 and legacy UWP XAML Islands APIs | [limitations.md](./limitations.md) |
