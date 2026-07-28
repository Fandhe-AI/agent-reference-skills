# Packaged vs Unpackaged Behavior

Whether a process has package identity changes which Windows APIs work, how the app is sandboxed, and how storage/state is scoped. This page summarizes the practical differences to account for when writing code that must run in both packaged and unpackaged contexts.

## Options / Props

| Aspect | Packaged (MSIX / external location) | Unpackaged |
|------|-------------|-------------|
| Package-identity-gated APIs (background tasks, WNS push, share target, context menu extensions, file/protocol associations, startup tasks, app services, toast, Windows AI APIs) | Available | Throw `E_ILLEGAL_METHOD_CALL` or `APPMODEL_ERROR_NO_PACKAGE` |
| `Package.Current` | Returns the current package | Throws (no current package) |
| File system / registry | May run in an app container with virtualization (can be configured not to); `ApplicationData` roams/local folders are package-scoped | Fully unrestricted API surface, file system, and registry access |
| Elevation / process model | Typically constrained by app container trust level unless configured otherwise | Fully unrestricted |
| Data/settings scoping | Scoped per **package family** (`PackageFamilyName`), so app updates within the same family retain data | Scoped however the app chooses (registry, files, etc.); no family-based isolation |
| Install/update/uninstall | Managed by MSIX (or the app's own installer for external-location packages), atomic install/uninstall, clean rollback | Managed by `.exe`/`.msi`/custom installer/xcopy; no built-in atomicity guarantee |

## Notes

- The recommended pattern is to detect identity once at startup with `GetCurrentPackageFullName` and branch feature availability, rather than relying on try/catch around every gated API call.
- A single package can carry package identity fields (`Name`, `Publisher`, etc.) that are distinct from **application identity** (AUMID); code that reasons about "which app is this" (taskbar grouping, notification routing) uses AUMID, not the package identity tuple directly.
- Sparse/external-location packages have package identity but keep the unpackaged app's original install location and installer — so file system access patterns for the app's own files are unaffected, while identity-gated Windows APIs become available.

## Related

- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Detecting Package Identity](./detect-package-identity.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
