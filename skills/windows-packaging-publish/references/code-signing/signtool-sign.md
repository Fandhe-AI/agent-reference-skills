# SignTool sign

`signtool sign` digitally signs an MSIX/APPX app package or bundle (or any PE/PKCS file) with a certificate. It confirms the file has not been modified since signing and confirms the signer's identity. Signing a bundle recursively signs all packages contained within it — inner packages don't need to be signed separately.

## Signature / Usage

```console
signtool sign [options] <filename(s)>
```

Sign with a certificate from a PFX file:

```console
signtool sign /fd SHA256 /a /f cert.pfx /p password package.msix
```

Sign using a certificate already installed in a certificate store, by subject name or SHA1 thumbprint:

```console
signtool sign /fd SHA256 /n "My Company Certificate" package.msix
signtool sign /fd SHA256 /sha1 <SHA1 hash> package.msix
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/fd <alg>` | string | File digest algorithm (e.g. `SHA256`). Required — omitting it produces a warning (older SignTool) or an error (SDK build 20236+). Must match the hash algorithm used when the package was created (check `AppxBlockMap.xml`'s `HashMethod`). |
| `/a` | flag | Automatically selects the best available signing certificate that satisfies the given conditions. |
| `/f <SignCertFile>` | path | Signing certificate file (PFX). Use with `/p` if password-protected. |
| `/p <Password>` | string | Password for the PFX file specified by `/f`. Omit if the certificate has no password. |
| `/n <SubjectName>` | string | Subject name (or substring) of a certificate in a certificate store to use for signing. |
| `/sha1 <Hash>` | string | SHA1 hash of the signing certificate, useful when multiple certificates match other criteria. |
| `/csp <CSPName>` | string | Cryptographic service provider containing the private key container. |
| `/kc <PrivKeyContainerName>` | string | Private key container name. |
| `/s <StoreName>` | string | Certificate store to search (default: `My`). |
| `/sm` | flag | Use the machine store instead of the user store. |
| `/i <IssuerName>` | string | Issuer name (or substring) of the signing certificate. |
| `/r <RootSubjectName>` | string | Subject name (or substring) of the root certificate the signing certificate must chain to. |
| `/u <Usage>` | OID/string | Enhanced key usage (EKU) required in the signing certificate. Default is `Code Signing` (`1.3.6.1.5.5.7.3.3`). |
| `/d <Desc>` | string | Description of the signed content. |
| `/du <URL>` | string | URL for the expanded description of the signed content. |
| `/t <URL>` | string | Time stamp server URL (legacy Authenticode timestamp). Mutually exclusive with `/tr`. |
| `/tr <URL>` | string | RFC 3161 time stamp server URL. Mutually exclusive with `/t`. |
| `/td <alg>` | string | Digest algorithm for the RFC 3161 timestamp; required when `/tr` is used. |
| `/debug` | flag | Prints debugging information — useful for diagnosing signing failures. |
| `/v` | flag | Verbose output regardless of success/failure, including warnings. |
| `/q` | flag | No output on success, minimal output on failure. |

## Notes

- Determine the correct `/fd` value by extracting the package and checking `AppxBlockMap.xml`'s `HashMethod` (`...#sha256` → `SHA256`, `...#sha384` → `SHA384`, `...#sha512` → `SHA512`). SignTool's own default digest algorithm is SHA1, which is not available from MakeAppx.exe — always specify `/fd` explicitly for app packages.
- The certificate's Subject must exactly match the app manifest's `Publisher` attribute, or signing/validation fails.
- SignTool.exe (Windows SDK) install paths: `C:\Program Files (x86)\Windows Kits\10\bin\<sdk version>\{x86|x64|arm64}\SignTool.exe`.
- Exit codes: `0` success, `1` failure, `2` completed with warnings.

## Related

- [SignTool Timestamp Options](./signtool-timestamp.md)
- [SignTool Verify](./signtool-verify.md)
- [Certificate Types](./certificate-types.md)
- [Azure Trusted Signing](./azure-trusted-signing.md)
- [Signing Troubleshooting](./signing-troubleshooting.md)
