# Package Bundles and Architecture

An MSIX bundle (`.msixbundle`) packages multiple architecture-, language-, or scale-specific MSIX packages into a single distributable unit; the Windows deployment platform downloads only the parts applicable to a given device.

## Signature / Usage

```powershell
# Bundle x86/x64/arm packages created separately with makeappx
MakeAppx bundle /v /bv 1.0.0.0 /d "C:\PackagesFolder" /p MyApp.msixbundle
```

In Visual Studio's Create App Packages wizard, set **Generate app bundle** to **Always** and select all architecture configurations (x86, x64, ARM/ARM64) you want to support.

## Options / Props

| Architecture | Runs on |
|--------------|---------|
| x86 | Nearly all devices; safest, broadest choice for PCs |
| x64 | 64-bit desktop Windows, UWP on Xbox, Windows 10 IoT Core on Intel Joule |
| ARM | Desktop PCs, mobile devices, some IoT Core boards (Raspberry Pi 2/3, DragonBoard) |
| ARM64 | Desktop PCs, mobile devices, Windows Mixed Reality/HoloLens; requires Visual Studio 2017 15.9+ to target natively |

It's recommended to build for all architectures to maximize device reach.

## Notes

- Once you distribute an `.msixbundle` for an app, you cannot revert to distributing just a single MSIX package for it.
- Bundles are also useful beyond architecture: language-specific assets, image-scale assets, and DirectX-feature-specific resources.
- `makeappx bundle` is the command-line path when not using Visual Studio; see makeappx.exe reference for full syntax.

## Related

- [makeappx.exe CLI](./makeappx-cli.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [MSIX Package Structure](./package-structure.md)
