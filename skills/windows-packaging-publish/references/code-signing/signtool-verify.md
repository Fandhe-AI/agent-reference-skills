# SignTool verify

`signtool verify` checks the digital signature of a file: whether the signing certificate was issued by a trusted authority, whether it's been revoked, and optionally whether it's valid for a specific policy.

## Signature / Usage

```console
signtool verify /pa /v package.msix
```

Verify a file that might be signed in a catalog rather than embedded:

```console
signtool verify /a SystemFile.dll
```

Verify against a named catalog file:

```console
signtool verify /c MyCatalog.cat SystemFile.dll
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/pa` | flag | Uses the Default Authentication Verification Policy. Without it, SignTool uses the Windows Driver Verification Policy — required for verifying ordinary app packages/executables rather than drivers. |
| `/v` | flag | Verbose output regardless of success or failure, including warning messages. |
| `/a` | flag | Try all verification methods: first search catalog databases, then fall back to the file's embedded signature. Recommended for files that may or may not be catalog-signed. |
| `/ad` | flag | Find the catalog using the default catalog database. |
| `/as` | flag | Find the catalog using the system component (driver) catalog database. |
| `/ag <CatDBGUID>` | string | Find the catalog in the catalog database identified by the GUID. |
| `/c <CatFile>` | path | Specify the catalog file by name. |
| `/all` | flag | Verify all signatures in a file with multiple signatures. |
| `/ds <Index>` | int | Verify the signature at a specific position. |
| `/hash {SHA1\|SHA256}` | string | Hash algorithm to use when searching for a file in a catalog. |
| `/o <Version>` | string | Verify the file against a specific OS version (`<PlatformID>:<VerMajor>.<VerMinor>.<BuildNumber>`). Recommended — without it results can be inconsistent across OS versions. |
| `/r <RootSubjectName>` | string | Subject name (or substring) of the root certificate the signing certificate must chain to. |
| `/tw` | flag | Warn if the signature isn't time stamped. |
| `/ph` | flag | Print and verify page hash values. |
| `/kp` | flag | Verify using the x64 kernel-mode driver signing policy. |

## Notes

- `/pa` cannot be combined with `catdb` options.
- SignTool's `verify` command outputs the embedded signature status unless a catalog-search option (`/a`, `/ad`, `/as`, `/ag`, `/c`) is specified.
- Exit codes: `0` success (valid signature), `1` failure, `2` completed with warnings.

## Related

- [SignTool Sign Command](./signtool-sign.md)
- [SignTool Timestamp Options](./signtool-timestamp.md)
- [Signing Troubleshooting](./signing-troubleshooting.md)
