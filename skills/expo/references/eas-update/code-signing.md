---
source: https://docs.expo.dev/eas-update/code-signing/
---

# End-to-end code signing with EAS Update

Learn how code signing and key rotation work in EAS Update.

## Signature / Usage

The `expo-updates` library supports end-to-end code signing using public-key cryptography. Updates are signed with your own keys and the signature is verified on the client before the update is applied, so ISPs, CDNs, cloud providers, and even EAS itself cannot tamper with updates.

```sh
npx expo-updates codesigning:generate \
--key-output-directory ../keys \
--certificate-output-directory certs \
--certificate-validity-duration-years 10 \
--certificate-common-name "Your Organization Name"
```

### Steps

#### 1. Generate a private key and certificate

Specify a directory outside source control for `--key-output-directory`. Generated files:

- `../keys/private-key.pem`: the private key. Keep private and secure (KMS, password manager, and so on).
- `../keys/public-key.pem`: the public key; not sensitive.
- `certs/certificate.pem`: the code signing certificate (valid for 10 years in the example). Add it to source control; it contains the public key and is used to verify signatures.

A shorter validity duration requires key rotation more often but limits exposure of a compromised key; binaries with expired certificates will not apply new updates. Expo sets 20 years for the public Expo Go app and 1 year for internal apps.

#### 2. Configure your project

```sh
npx expo-updates codesigning:configure \
--certificate-input-directory certs \
--key-input-directory ../keys
```

With CNG, the generated app.json configuration is all you need:

```json
{
  "expo": {
    "updates": {
      "codeSigningCertificate": "./certs/certificate.pem",
      "codeSigningMetadata": {
        "keyid": "main",
        "alg": "rsa-v1_5-sha256"
      }
    }
  }
}
```

Without CNG, configure **AndroidManifest.xml** and/or **Expo.plist**. First produce an XML-escaped certificate (Android: replace `\r` with `&#xD;` and `\n` with `&#xA;`; iOS: replace `\r` with `&#xD;`):

```sh
node -e "console.log(require('fs').readFileSync('./certs/certificate.pem', 'utf8')\
.replace(/\r/g, '&#xD;').replace(/\n/g, '&#xA;'));"
```

Android (`<application>` element in **android/app/src/main/AndroidManifest.xml**):

```xml
<meta-data
  android:name="expo.modules.updates.CODE_SIGNING_CERTIFICATE"
  android:value="(insert XML-escaped certificate here)"
  />
<meta-data
  android:name="expo.modules.updates.CODE_SIGNING_METADATA"
  android:value="{&quot;keyid&quot;:&quot;main&quot;,&quot;alg&quot;:&quot;rsa-v1_5-sha256&quot;}"
  />
```

iOS (`<dict>` element in **ios/project-name/Supporting/Expo.plist**) uses the keys `EXUpdatesCodeSigningCertificate` and `EXUpdatesCodeSigningMetadata` (a dict with `keyid` and `alg`).

With code signing configured, create a new build with a new runtime version; the certificate is embedded in that build.

#### 3. Publish a signed update

Adapted (not in the official docs): adds `--environment`, which the EAS CLI reference marks as required for Expo SDK 55 or greater.

```sh
eas update --private-key-path ../keys/private-key.pem --environment production
```

EAS CLI detects that code signing is configured, verifies the update's integrity, and creates a digital signature with your private key locally (the key never leaves your machine). The signature is sent to EAS and stored alongside the update.

#### 4. Verify that the update is loaded

After download but before being applied, the update is verified against the embedded certificate and signature. It is applied if valid, rejected otherwise.

### Key rotation

Rotate keys on key expiration (updates signed with an expired certificate are no longer applied after download; updates downloaded before expiry keep working), private key compromise, or as periodic best practice. Procedure:

1. Back up the old keys and certificate.
2. Generate a new key (optionally change `updates.codeSigningMetadata.keyid` to help debugging).
3. Set a new runtime version for builds using the new certificate so only updates signed with the new key run in the new build.
4. Publish signed updates using the new key.

### Removing code signing

Treat as key rotation to a `null` key: back up the old key and certificate, remove `updates.codeSigningMetadata` from app config, and set a new runtime version so only unsigned updates run in the new build.

## Notes

- XML entity form (`&quot;`) in the AndroidManifest.xml JSON follows docs/pages/eas-update/*.mdx at expo@58.0.12.
- The official guide example omits `--environment`; it is required for SDK 55+ (EAS CLI reference).
- EAS Update Code Signing is only available to accounts subscribed to the EAS Production or Enterprise plans.
- Source modificationDate: July 21, 2026 (fetched 2026-10-17).

## Related

- [Runtime versions and updates](./runtime-versions.md)
- [Asset selection and exclusion](./asset-selection.md)
- [Override update configuration at runtime](./override.md)
- [Updates](./updates.md)
