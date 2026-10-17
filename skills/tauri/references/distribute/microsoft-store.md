---
source: https://v2.tauri.app/distribute/microsoft-store/
---

# Microsoft Store

Microsoft Store is the Windows app store operated by Microsoft. This guide only covers details for distributing Windows apps directly to the Microsoft Store.

## Signature / Usage

Separate config `src-tauri/tauri.microsoftstore.conf.json`:

```json
{
  "bundle": {
    "windows": {
      "webviewInstallMode": {
        "type": "offlineInstaller"
      }
    }
  }
}
```

```sh
cargo tauri build --no-bundle
cargo tauri bundle --config src-tauri/tauri.microsoftstore.conf.json
```

## Requirements

- A Microsoft account, enrolled as a developer (individual or company).
- Register the app in the Apps and Games page: `New Product`, select `EXE or MSI app`, reserve a unique name.
- Icons: `tauri icon /path/to/app-icon.png` generates all icons including Microsoft Store icons from a PNG or SVG.

## Build and upload

Tauri currently only generates EXE and MSI installers, so you create a Microsoft Store application that only links to the unpacked application. The linked installer must be offline, handle auto-updates and be code signed.

### Silent install

The Store requires Win32 installers to support silent installation, otherwise submission is rejected with:

```
10.2.9.2 Security - Package Submissions | Win32 products must install silently.
```

Provide the silent install parameters in Partner Center. The NSIS `-setup.exe` installs silently with `/S` (uppercase):

```
MyApp_x64-setup.exe /S
```

For the MSI installer use the standard `msiexec` flag `/quiet`.

### Publisher

The application publisher name cannot match the product name. If `publisher` is unset, Tauri derives it from the second part of the bundle identifier, so this is invalid:

```json
{
  "productName": "Example",
  "identifier": "com.example.app"
}
```

Define the publisher separately:

```json
{
  "productName": "Example",
  "identifier": "com.example.app",
  "bundle": {
    "publisher": "Example Inc."
  }
}
```

### Upload

Upload the installer to a distribution service of your choice and link it in your application page in the Microsoft Store website.

## Notes

- The installer distributed through the Store must use the `offlineInstaller` WebView2 installation option.
- Tauri bundler side only; Microsoft Store submission procedures belong to the windows-packaging-publish skill.

## Related

- [windows-installer](./windows-installer.md)
- [sign-windows](./sign-windows.md)
- updater plugin
- [bundle-windows config](../config/bundle-windows.md)
