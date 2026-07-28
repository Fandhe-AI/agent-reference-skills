# MSIX Package Signing Requirements

Windows requires every MSIX package to be signed with a valid code signing certificate before it can be installed. The certificate must chain to a trusted root on the target device; by default Windows trusts certificates from most certificate authorities that issue code signing certificates.

## Signature and integrity model

- If you create an MSIX bundle (`.msixbundle`), you only need to sign the bundle — the signature covers all packages inside it. You do not need to sign each inner package separately.
- Signing an app package chains to `AppxBlockMap.xml` and `AppxSignature.p7x` inside the package, letting Windows validate package integrity at install time and at runtime (including during Windows Defender scans). Tampered packages are blocked from launching.
- Non-Store packages enforce package integrity only when the manifest declares `uap10:PackageIntegrity` with `Content Enforcement="on"`, and only on Windows 2004 and later:

```xml
<Package ...
xmlns:uap10="http://schemas.microsoft.com/appx/manifest/uap/windows10/10"
IgnorableNamespaces="uap10">
  <Properties>
    <uap10:PackageIntegrity>
      <uap10:Content Enforcement="on" />
    </uap10:PackageIntegrity>
  </Properties>
</Package>
```

## Signing options by scenario

| Scenario | Option | Cost |
| --- | --- | --- |
| Development and local testing | Self-signed certificate | Free |
| Production distribution (recommended) | Azure Artifact Signing (formerly Trusted Signing) | ~$10/month |
| Production distribution (alternative) | OV code signing certificate from a CA | $300-500/year |
| Microsoft Store distribution | Signed by the Store on submission | Free |

## Timestamping

Timestamping is strongly recommended whenever signing a package with a certificate. It preserves the signature so the package remains installable after the signing certificate expires, because the package's signature is validated against the time it was signed rather than the current time.

| Scenario | Signed without timestamping | Signed with timestamping |
| --- | --- | --- |
| Certificate is valid | App installs | App installs |
| Certificate is invalid (expired) | App fails to install | App installs (authenticity verified at signing time) |

Note: once an app is successfully installed, it keeps running after certificate expiry regardless of whether it was timestamped.

## Device mode and sideloading

Windows 10 lets users choose a device mode in Settings that affects which signed packages can be installed:

- **Microsoft Store apps** — most restrictive; only Store-distributed apps are allowed.
- **Sideload apps** — allows installation of apps signed by any certificate trusted and chained to a device trust root. Enabled by default since Windows 10 version 2004.
- **Developer mode** — intended for developers building/debugging apps; also permits sideloading.

## Notes

- This page describes signing requirements for the MSIX/APPX package format specifically. It is unrelated to code signing for Win32 MSI/EXE installers submitted to the Microsoft Store, which must chain to the Microsoft Trusted Root Program instead (self-signed certificates are not accepted for that path).
- Publishing an MSIX package through the Microsoft Store does not require you to sign or manage a certificate — the Store re-signs the package automatically after certification.

## Related

- [Certificate Types](./certificate-types.md)
- [SignTool Sign Command](./signtool-sign.md)
- [Azure Trusted Signing](./azure-trusted-signing.md)
