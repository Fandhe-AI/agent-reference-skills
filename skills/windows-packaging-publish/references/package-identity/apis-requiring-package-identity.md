# APIs Requiring Package Identity

A subset of Windows platform features and APIs only work in a process that has **package identity** — either full MSIX packaging or packaging with external location (sparse packaging). Package identity lets Windows reliably identify the caller of these APIs, which unpackaged Win32 processes cannot provide.

## Options / Props

| Feature | Why it needs package identity |
|------|-------------|
| Background tasks | The background task infrastructure registers and activates code via the package's `ApplicationUserModelID`/manifest declarations. |
| Windows AI APIs (Phi Silica, OCR, etc.) | On-device AI broker APIs authorize callers by package identity. |
| Push notifications (WNS) | The Windows Notification Service routes notifications to a specific package/AUMID channel. |
| Share target | The Share sheet activates share targets declared in a package manifest (`Extension`/`ShareTarget`). |
| Custom context menu extensions | File Explorer resolves context-menu handlers from package manifest extension declarations. |
| File type and protocol associations | File/URI activation is routed to the AUMID declared for the association in the package manifest. |
| Startup tasks | The `StartupTask` extension is declared and enabled per package. |
| App services | App service connections are addressed by `PackageFamilyName` + service name. |
| Toast notifications | Toast content and activation are associated with the sending package's identity. |
| Privacy consent prompts (camera, microphone, location, etc.) | Per-package Settings toggles and brokered consent prompts require package identity to scope the grant. |
| Windows App SDK notification APIs | Require package identity (full MSIX or sparse) at runtime. |

## Notes

- Calling one of these APIs from an unpackaged process typically raises `E_ILLEGAL_METHOD_CALL` or `APPMODEL_ERROR_NO_PACKAGE`.
- The lowest-friction fix for an existing unpackaged Win32/WPF/WinForms app is packaging with external location (a sparse package) rather than converting the whole app to MSIX — see Sparse Packages / External Location.
- Apps without package identity remain fully unrestricted for general Win32 API surface, file system/registry access, elevation, and process model — package identity is required only for the extensibility points above, not for ordinary Win32 programming.

## Related

- [Package Identity Overview](./package-identity-overview.md)
- [Sparse Packages and External Location Packages](./sparse-packages-external-location.md)
- [Detecting Package Identity](./detect-package-identity.md)
- [Packaged vs Unpackaged Behavior](./packaged-vs-unpackaged-behavior.md)
- [Integrate a Packaged Desktop App with File Explorer](./integrate-packaged-app-with-file-explorer.md)
