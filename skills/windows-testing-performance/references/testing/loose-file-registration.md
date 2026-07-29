# Loose File Registration

Registering an app's unpacked build folder ("loose file layout") directly as an installed package, so it can be launched and validated without going through MSIX packaging on every iteration. Intended for active development/design validation only — final sign-off should happen on a signed, packaged app.

## Signature / Usage

```powershell
# Local device only, from the folder containing the app manifest
Add-AppxPackage -Register <path to AppxManifest.xml>
```

```cmd
:: Remote device over the network, from the Windows SDK tools
WinAppDeployCmd.exe registerfiles -remotedeploydir <Network Path> -ip <IP Address> -pin <target machine PIN>
```

## Options / Props

| Method | Scope | Requirement |
|--------|-------|-------------|
| `Add-AppxPackage -Register <manifest>` | Local device only | PowerShell; points at the manifest file, not a folder |
| `WinAppDeployCmd.exe registerfiles` | Remote device over network | Windows SDK tool; needs the target's IP and, if prompted, a Device Discovery PIN |
| Device Portal Apps Manager → "Register from Network Share" | Remote device, browser-driven | Device Portal enabled on the target; network-share credentials if the host lacks access |
| Visual Studio "Register layout from network" | Remote device, IDE-driven | Deploying-and-debugging-UWP-apps workflow |

## Notes

- Requires Windows 10 Creators Update (build 14965) or later, and Developer Mode + Device Discovery enabled on the target device.
- Only available on devices that support the Network Share (SMB) protocol: **Desktop and Xbox**.
- Visual assets are loaded at app launch — editing a static asset in the loose folder is picked up on next launch, but code/dynamically-generated content changes require a rebuild.
- Mapped network drives aren't supported for registration; reference the network share by its full UNC path instead.

## Related

- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)
- [Windows Device Portal](./device-portal.md)
