# Verify App Links and Troubleshooting

Steps and `adb` commands to trigger, inspect, and debug Android App Links verification after declaring `android:autoVerify="true"` and publishing `assetlinks.json`.

## Signature / Usage

```bash
# Reset link-handling state for the package
adb shell pm set-app-links --package PACKAGE_NAME 0 all

# Force re-verification
adb shell pm verify-app-links --re-verify PACKAGE_NAME

# Inspect verification result per domain
adb shell pm get-app-links PACKAGE_NAME

# Check overall link policies (all packages)
adb shell dumpsys package domain-preferred-apps
```

Example `pm get-app-links` output:

```
com.example.pkg:
    Domain verification state:
      example.com: verified
      sub.example.com: legacy_failure
      example.org: 1026
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `none` | status | No verification record yet; wait and re-verify. |
| `verified` | status | Domain successfully verified. |
| `approved` / `denied` | status | Force-approved / force-denied, usually via shell. |
| `legacy_failure` | status | Rejected by the legacy verifier — check `assetlinks.json` format and fingerprint. |
| `1024+` | status | Custom device-verifier error code. |

## Notes

- Common causes of failure: invalid JSON in `assetlinks.json`, wrong or lowercase `sha256_cert_fingerprints`, missing `android:autoVerify="true"`, server-side redirects on the domain, or debug-signed builds whose fingerprint isn't listed.
- `DomainVerificationManager.getDomainVerificationUserState(packageName)` (Kotlin/Java) reads verified/selected/unapproved domains programmatically at runtime.
- Users can override verification manually via `Settings.ACTION_APP_OPEN_BY_DEFAULT_SETTINGS`, launched with `Uri.parse("package:$packageName")`; user preference takes precedence over the automatic result.
- Only one app can be associated with a given domain at a time — a second app's verification silently loses unless the user disassociates the first.

## Related

- [asset-links-verification](./asset-links-verification.md)
- [test-deep-links](./test-deep-links.md)
