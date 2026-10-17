---
source: https://docs.expo.dev/app-signing/app-credentials/
---

# App credentials

Learn about what app credentials Android and iOS require.

## Signature / Usage

Expo automates signing for Android and iOS, and you can provide your own overrides. EAS Build can generate signed or unsigned applications, but to distribute through the stores the application **must** be signed. Inspect and manage all credentials with:

```sh
eas credentials
```

### Android

Google requires all Android apps to be digitally signed with a certificate. A private key and its public certificate are usually stored in a keystore. With App Signing by Google Play you upload an APK/AAB signed with an **upload certificate** and Google Play replaces it with the **app signing certificate**. From the build process's perspective there is no difference: `eas build` generates an **.apk** or **.aab** signed with the keystore currently associated with your application.

#### Lost your keystore? Reset your upload key on Google Play

1. Download credentials: run `eas credentials`, select `Android` and the profile, choose `credentials.json: Upload/Download credentials between EAS servers and your local json`, then `Download credentials from EAS to credentials.json`.
2. Export keystore to `pem`: find the key alias under `keyAlias` in **credentials.json**, then:

```sh
keytool -export -rfc -alias alias_from_step_1 -file certificate_for_google.pem -keystore ./path/to/keystore.jks
```

3. Contact Google Support with the `pem` file via the Google Play key reset support form.

### iOS

The 3 primary iOS credentials, all associated with your Apple Developer account:

- Distribution Certificate
- Provisioning Profiles
- Push Notification Keys

| Credential | Limit per account | App-specific? | Can be revoked with no production side effects? | Used at |
| --- | --- | --- | --- | --- |
| Distribution Certificate | 2 | No | Yes | Build time |
| Push Notification Key | 2 | No | No | Run time |
| Provisioning Profile | Unlimited | Yes | Yes | Build time |

#### Re-signing new credentials

```sh
eas build:resign
```

Codesigns an existing **.ipa** with a new ad hoc provisioning profile (for example to add a new test device) without rebuilding the app. The triggered build reuses the application artifact from the selected build.

## Notes

- Never check the Android keystore into the repository (debug keystores are the only exception).
- Google sets the validity start date of a new upload certificate 72 hours in the future after a key reset.
- Provisioning profiles expire after 12 months, without affecting production apps; create a new one with `eas build -p ios` or `eas credentials`.
- Uploading a new APN key does not change users' Expo Push Tokens; push notification keys do not expire.
- `eas credentials` deletion only removes credentials from Expo's servers, not from Apple's.
- Source modificationDate: July 29, 2026 (fetched 2026-10-17).

## Related

- [Using automatically managed credentials](./managed-credentials.md)
- [Using local credentials](./local-credentials.md)
