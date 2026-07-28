# System Requirements

Minimum OS, SDK, and tooling requirements to develop and run Windows App SDK apps, and how the Windows OS version, Windows SDK, and Windows App SDK relate to each other.

## Signature / Usage

| Component | Requirement |
|---|---|
| Minimum OS | Windows 10, version 1809 (build 17763) or later |
| Development tools | Visual Studio 2022 17.0+ (or Visual Studio 2019 16.9+) with required workloads |
| Windows SDK | Version 2004 (build 19041) or later (included by default with VS 2019/2022) |

## Options / Props

| Component | What it is | Version format | Updated via |
|---|---|---|---|
| Windows OS version | OS installed on the device | `YYHX` (e.g. 25H2) | Windows Update |
| Windows SDK | Headers/libraries/metadata for Win32, WinRT, COM | `10.0.BBBBB.x` | Visual Studio / standalone installer |
| Windows App SDK | NuGet framework (WinUI 3, app lifecycle, windowing, etc.) | `Major.Minor.Patch` | NuGet package update |

## Notes

- The Windows App SDK is independent of both the OS and the Windows SDK: you can update `Microsoft.WindowsAppSDK` without touching the Windows SDK version, and it supports back to Windows 10 1809 regardless of its own release version.
- The Windows SDK you compile against determines compile-time API visibility; the OS build the user runs determines what's actually callable at runtime. Compiling against a newer SDK than your minimum target OS is safe as long as you guard newer API calls with `ApiInformation.IsApiContractPresent` / `IsTypePresent` / `IsMethodPresent` runtime checks.
- `SupportedOSPlatformVersion` / `TargetPlatformMinVersion` (C#) and `WindowsTargetPlatformMinVersion` (C++) set the minimum OS your app installs on; `TargetFramework`'s embedded Windows version / `WindowsTargetPlatformVersion` sets the compile-time SDK surface.

## Related

- [Downloads](./downloads.md)
- [Release Channels](./release-channels.md)
