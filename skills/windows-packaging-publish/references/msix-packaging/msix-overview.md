# What is MSIX?

MSIX is the modern Windows app packaging format. It gives any Windows app a reliable, clean install and uninstall, automatic updates, and access to Windows platform features that require a package identity.

## Signature / Usage

Package identity (publisher + name + version) is assigned to an app once it is packaged as MSIX. That identity is required for:

- Windows platform APIs such as push notifications, background tasks, and live tiles
- AI features that use on-device models through the Windows AI APIs
- Store distribution and update channels
- Enterprise management through Intune and Configuration Manager

## Options / Props

| Feature | Description |
|---------|-------------|
| Reliable install/uninstall | 99.96% install success rate; guarantees a clean uninstall with no leftover files or registry entries |
| Differential updates | Only changed 64 KB blocks are downloaded on update |
| Disk space efficiency | Shared files across apps are managed by Windows; each app remains independent |
| Containerized execution | Apps run in a lightweight container with virtual file system/registry; see MSIX containerization overview |
| Enterprise-ready | Full support for deployment via Intune, Configuration Manager, Enterprise Modern App Management CSP |

## Notes

- All MSIX packages must be signed before installation (`AppxSignature.p7x`).
- Use the Windows Application Packaging Project in Visual Studio to package a new app from source, the MSIX Packaging Tool to convert an existing installer without source code, and `makeappx.exe`/WinApp CLI to package and sign from the command line.
- This applies only to Windows client app packaging (MSIX). It is unrelated to Store submission/certification content, which lives outside this scope.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Package Manifest Schema](./package-manifest-schema.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
