---
source: https://v2.tauri.app/distribute/sign/linux/
---

# Linux Code Signing

Code signing for Linux packages. Artifact signing is not required to deploy on Linux but increases trust, allowing end users to verify that binaries are genuine and unmodified.

## Signature / Usage

AppImages can be signed with gpg or gpg2. Generate a key:

```shell
gpg2 --full-gen-key
```

Embed a signature by setting environment variables before building, then display it:

```shell
./src-tauri/target/release/bundle/appimage/$APPNAME_$VERSION_amd64.AppImage --appimage-signature
```

## Options / Props

| Environment variable | Description |
| --- | --- |
| `SIGN` | Set to `1` to sign the AppImage |
| `SIGN_KEY` | Optional specific GPG Key ID for signing |
| `APPIMAGETOOL_SIGN_PASSPHRASE` | Signing key password; if unset gpg shows a dialog. Must be set in CI/CD |
| `APPIMAGETOOL_FORCE_SIGN` | By default the AppImage is generated even if signing fails; set to `1` to exit on errors |

## Validate the signature

Download one of the `validate-$PLATFORM.AppImage` files from https://github.com/AppImageCommunity/AppImageUpdate/releases/tag/continuous.

```shell
chmod +x validate-$PLATFORM.AppImage
./validate-$PLATFORM.AppImage $TAURI_OUTPUT.AppImage
```

Successful output:

```
Validation result: validation successful
Signatures found with key fingerprints: $KEY_ID
====================
Validator report:
Signature checked for key with fingerprint $KEY_ID:
Validation successful
```

## Notes

- Back up your private and public keys in a secure location.
- AppImage does not validate the signature itself, so you cannot rely on it to detect tampering. Users must verify manually with the AppImage validate tool, which requires you to publish your key ID on an authenticated channel (e.g. your website served via TLS).
- Replace `$APPNAME` and `$VERSION` with the values from your configuration.
- RPM package signing (GPG key via `TAURI_SIGNING_RPM_KEY`) is documented on the RPM page.

## Related

- [appimage](./appimage.md)
- [rpm](./rpm.md)
