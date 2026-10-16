# MSIX Features and Supported Platforms

MSIX is supported on Windows 10 version 1709 and later, Windows Server 2019 LTSC and later, and Windows Enterprise 2019 LTSC and later. Feature availability varies by Windows release.

## Signature / Usage

The minimum supported OS version of a package is declared in its manifest:

```xml
<TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17701.0" ... />
```

## Options / Props

Windows desktop (first release in which the feature is supported):

| Feature | Supported from |
|---------|----------------|
| Allow elevation, App Installer file support, Force update from any version downgrade, Identity for packaged desktop apps, Modification packages, Native MSIX install/uninstall, Package Support Framework (PSF) | Windows 10 1809 (LTSC 2019) |
| Defer registration flag, Force provisioning, Windows services, Package Integrity Enforcement for non-Store packages, Windows App App Services, Packages with external location, Hosted Apps | Windows 10 2004 |
| Flexible virtualization, Start menu groups | Windows 10 21H1 |
| Shared package containers, Legacy context menu support, Mutable package directories, MSIX Persistent Identity, Dynamic dependencies | Windows 11 21H2 |

Windows Server: Windows Server 2022 supports everything Windows Server 2019 does, plus Defer registration flag, Windows services, Package Integrity Enforcement, Windows App App Services, Packages with external location, and Hosted Apps. Force provisioning and Shared package containers are not supported on either.

Package formats `.msix`, `.msixbundle`, `.appx`, `.appxbundle` are supported on Windows 10 1809 and all later listed releases. Microsoft Store features (Publishing, Update Notification, Streaming Install, Delta Updates) are supported on all listed releases.

## Notes

- Windows Server 2019 LTSC and Windows Enterprise 2019 LTSC require the App Installer app for double-click install or install from a website. Without it, install via PowerShell, API, or a supported systems management product.
- For versions earlier than Windows 10 1709, use MSIX Core to install MSIX packages.
- Prior to Windows 10 2004, sideloading must be enabled to install non-Store apps on Enterprise, Education, and LTSC SKUs. Home and Professional had sideloading enabled by default.
- On Windows 10 1709, 1803, and 1809 the mainstream enterprise deployment scenarios are supported: Microsoft Endpoint Configuration Manager, Microsoft Intune, PowerShell, or double-click installation. MSIX installation through the Microsoft Store and Microsoft Store for Business requires Windows 10 1809 or later.
- The MSIX SDK (open source) lets cross-platform client apps use the MSIX format on macOS, iOS, Android, and Linux.
- Source: https://learn.microsoft.com/en-us/windows/msix/supported-platforms, last updated 04/11/2023 (ms.date).

## Related

- [MSIX Overview](./msix-overview.md)
- [MSIX SDK](./msix-sdk.md)
- [Flexible Virtualization](./flexible-virtualization.md)
- [Modification Packages](./modification-packages.md)
