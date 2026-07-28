# App Installer Troubleshooting

Common causes of App Installer download/install failures for `.appinstaller`-based sideloaded apps, and how to diagnose them.

## Signature / Usage

```powershell
# Verify an app package installs correctly outside of App Installer
Add-AppxPackage -Path .\MyApp.msix

# Verify a full .appinstaller-driven install/update
Add-AppxPackage -AppInstallerFile .\MyApp.appinstaller
```

## Options / Props

| Symptom | Root cause | Resolution |
| --- | --- | --- |
| "Untrusted package" prompt or install blocked | Signing certificate not trusted on device | Import the cert into **Local Computer: Trusted People** (see sideloading prerequisites) |
| Framework dependencies not found | App built in Debug config looks for dependencies at the `.appinstaller`-specified location instead of the Store | Build in Release config for distribution, or ensure declared dependency locations are reachable |
| Files not accessible over HTTP | `.appinstaller`, `.msix`/`.appxbundle`/`.msixbundle` not all hosted/reachable | Verify every linked file resolves (check the Visual Studio-generated deployment HTML page's links) |
| `0x80072F76` or similar generic error | Web server not returning a `Content-Length` header (including on `HEAD` requests) | Ensure the web server sends correct `Content-Length` for all responses |
| "The parameter is incorrect" via `ms-appinstaller:` | Source URL doesn't literally end in `.appinstaller` (redirects don't count) | Use a URL that ends in `.appinstaller` directly |
| Wrong MIME type errors | Web server not serving files with correct `Content-Type` | Configure server MIME types for `.appinstaller`, `.msix`, `.msixbundle` |

## Notes

- Windows 10 1709 (build 16299) only supports HTTP endpoints and a fixed 24-hour update check; UNC/share access and configurable update checks require build 17134 (version 1803) or later.
- For deployment-level diagnostics, check **Event Viewer > Applications and Services Logs > Microsoft > Windows > AppxDeployment-Server > Operational**, plus log files under `%LocalAppData%\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\LocalState\DiagOutputDir`.
- Isolate whether the issue is in App Installer itself or the package by installing the `.appx`/`.msix` and the `.appinstaller` separately via `Add-AppxPackage`.

## Related

- [Sideloading prerequisites](./sideloading-prerequisites.md)
- [App Installer file overview](./app-installer-file-overview.md)
- [Windows App SDK deployment guide for framework-dependent packaged apps](./windows-app-sdk-deploy-packaged-apps.md)
