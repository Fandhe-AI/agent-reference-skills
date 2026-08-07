# MSIX Persistent Identity

Signs a package with a new certificate while preserving the app's update experience: an **artifact** cryptographically records the relationship between the old (original signing) certificate and the new certificate, so the platform accepts the re-signed package as a continuation of the same package identity without requiring the old certificate to keep signing it. Starting in Windows 11, version 21H2 (build 22000).

## Signature / Usage

```xml
<!-- artifact.xml: declares the old -> new publisher relationship -->
<?xml version="1.0" encoding="UTF-8"?>
<Publisher xmlns="http://schemas.microsoft.com/appx/publisherbridging/2021" Old="CN=Old" New="CN=New" />
```

```powershell
# 1. Build and sign the artifact catalog with the OLD certificate
makecat.exe artifact.cdf
signtool.exe sign /f old-cert.pfx /fd SHA256 artifact.cat

# 2. Pack the app referencing the publisher-bridging file (artifacts.txt: "artifact.xml" "artifact.cat")
makeappx.exe pack /p app.msix /d .\app\ /pb artifacts.txt

# 3. Sign the resulting package with the NEW certificate
signtool.exe sign /f new-cert.pfx /fd SHA256 app.msix
```

## Options / Props

| Item | Description |
|------|-------------|
| `Publisher/@Old`, `Publisher/@New` | Subject names of the original and new signing certificates in `artifact.xml`. |
| CDF (Catalog Definition File) | `[CatalogHeader]` names the output `.cat` and hash algorithm; `[CatalogFiles]` lists `artifact.xml` to hash. Built into a catalog via `makecat.exe`. |
| Publisher bridging file (e.g. `artifacts.txt`) | `[PublisherBridging]` section listing ordered pairs of `"<artifact>.xml" "<artifact>.cat"` paths, passed to `makeappx.exe pack /pb`. |
| `makeappx.exe pack /pb <file>` | Packs the app and embeds the listed artifact(s) inside the MSIX package. |
| `signtool.exe sign /td SHA256 /tr <url>` | Recommended timestamp arguments when signing the artifact catalog. |

## Notes

- The platform currently supports up to 5 artifacts per package (i.e. up to 5 certificate transitions can be chained).
- Multiple artifacts must be listed in application order in the publisher bridging file (e.g. Publisher1→Publisher2 before Publisher2→Publisher3).
- Timestamp the artifact catalog when signing it (`signtool /td /tr`); an untimestamped catalog becomes useless once the old certificate expires.
- The old certificate (ideally with a timestamp) must still be installed on the target machine for the platform to accept the package signed with the new certificate.
- This feature must be applied before the old certificate expires.
- Works for both MSIX packages and MSIX Bundles.

## Related

- [Package Identity Overview](./package-identity-overview.md)
- [Package Uninstall and Update Behavior](./package-uninstall-update.md)
