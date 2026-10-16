# config

| Name | Description | Path |
|------|-------------|------|
| AppConfig | The App configuration object (`app` in `tauri.conf.json`). | [app-config.md](./app-config.md) |
| BuildConfig | The Build configuration object (`build` in `tauri.conf.json`). | [build-config.md](./build-config.md) |
| BundleConfig | Configuration for tauri-bundler (`bundle` in `tauri.conf.json`). | [bundle-config.md](./bundle-config.md) |
| LinuxConfig / DebConfig / RpmConfig / AppImageConfig | Configuration for Linux bundles (`bundle.linux`): AppImage, Debian (`.deb`) and RPM (`.rpm`). | [bundle-linux.md](./bundle-linux.md) |
| MacConfig / DmgConfig | Configuration for the macOS bundles (`bundle.macOS`) and Apple Disk Image (`.dmg`) bundles (`bundle.macOS.dmg`). | [bundle-macos.md](./bundle-macos.md) |
| AndroidConfig / IosConfig | General configuration for the Android target (`bundle.android`) and the iOS target (`bundle.iOS`). | [bundle-mobile.md](./bundle-mobile.md) |
| WindowsConfig / WixConfig / NsisConfig | Windows bundler configuration (`bundle.windows`): signing, WebView2 install mode, and the MSI (WiX) and NSIS installer options. | [bundle-windows.md](./bundle-windows.md) |
| Configuration (root Config) | The Tauri configuration object. | [overview.md](./overview.md) |
| PluginConfig (`plugins.<name>` keys cross-index) | The plugin configs hold a map from a plugin name to its configuration object (`plugins` in `tauri.conf.json`). | [plugins-config.md](./plugins-config.md) |
| SecurityConfig | Security configuration (`app.security`). | [security-config.md](./security-config.md) |
| TrayIconConfig | Configuration for the application tray icon (`app.trayIcon`). | [tray-icon-config.md](./tray-icon-config.md) |
| WindowConfig | The window configuration object (items of `app.windows`). | [window-config.md](./window-config.md) |
