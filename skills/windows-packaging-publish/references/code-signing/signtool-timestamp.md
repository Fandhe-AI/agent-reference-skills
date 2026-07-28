# SignTool Timestamp Options

Specifying a timestamp server when signing (via `sign /tr` `/td` or the legacy `/t`), or timestamping an already-signed file with the dedicated `timestamp` command. Timestamping preserves signature validity after the signing certificate expires.

## Signature / Usage

Sign and timestamp in one step using an RFC 3161 timestamp server:

```console
signtool sign /f MyCert.pfx /p MyPassword /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 package.msix
```

Legacy (non-RFC-3161) Authenticode timestamp:

```console
signtool sign /f MyCert.pfx /t http://timestamp.digicert.com /fd SHA256 package.msix
```

Timestamp a file that was already signed, using the dedicated `timestamp` command:

```console
signtool timestamp /tr http://timestamp.digicert.com /td SHA256 package.msix
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/t <URL>` | string | Legacy time stamp server URL. If neither `/t` nor `/tr` is specified, the file is not timestamped. Mutually exclusive with `/tr`. Failure to timestamp only produces a warning. |
| `/tr <URL>` | string | RFC 3161 time stamp server URL. Mutually exclusive with `/t`. |
| `/td <alg>` | string | Digest algorithm requested from the RFC 3161 timestamp server (used with `/tr`). Required when timestamping — omitting it is an error for `sign`, a warning for `timestamp`. |
| `/tp <index>` | int | (`timestamp` command only) Timestamps the signature at the given index. |
| `/p7` | flag | (`timestamp` command only) Timestamps PKCS #7 files. |

## Notes

- Timestamping is strongly recommended for every production signature: without it, Windows evaluates the package's certificate validity against the *current* time, so the package stops installing once the certificate expires. With a valid timestamp, the package remains installable because validity is checked against the time it was signed.
- Once an app is already installed, it continues to run after certificate expiry regardless of timestamping.
- Azure Artifact Signing certificates are valid for only about 3 days, so timestamping is effectively mandatory; use its dedicated timestamp authority `http://timestamp.acs.microsoft.com/` (with `/td SHA256`).
- Common public RFC 3161 timestamp servers used in examples: `http://timestamp.digicert.com`.

## Related

- [SignTool Sign Command](./signtool-sign.md)
- [Azure Trusted Signing](./azure-trusted-signing.md)
- [MSIX Signing Requirements](./msix-signing-requirements.md)
