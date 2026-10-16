---
source: https://docs.expo.dev/app-signing/local-credentials/
---

# Using local credentials

Learn how to configure and use local credentials when using EAS.

## Signature / Usage

To manage your own keystore, certificates and profiles, create a **credentials.json** at the project root with paths to the credentials and their passwords.

```json
{
  "android": {
    "keystore": {
      "keystorePath": "android/keystores/release.keystore",
      "keystorePassword": "KEYSTORE_PASSWORD",
      "keyAlias": "KEY_ALIAS",
      "keyPassword": "KEY_PASSWORD"
    }
  },
  "ios": {
    "provisioningProfilePath": "ios/certs/profile.mobileprovision",
    "distributionCertificate": {
      "path": "ios/certs/dist.p12",
      "password": "DISTRIBUTION_CERTIFICATE_PASSWORD"
    }
  }
}
```

Generate a release keystore:

```sh
keytool \
-genkey -v \
-storetype JKS \
-keyalg RSA \
-keysize 2048 \
-validity 10000 \
-storepass KEYSTORE_PASSWORD \
-keypass KEY_PASSWORD \
-alias KEY_ALIAS \
-keystore release.keystore \
-dname "CN=com.expo.your.android.package,OU=,O=,L=,S=,C=US"
```

Select the credentials source in a build profile:

```json
{
  "build": {
    "amazon-production": { "credentialsSource": "local" },
    "google-production": { "credentialsSource": "remote" }
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `android.keystore.keystorePath` | string | Keystore location (relative to the project root, or absolute). |
| `android.keystore.keystorePassword` | string | Keystore password. |
| `android.keystore.keyAlias` | string | Key alias. |
| `android.keystore.keyPassword` | string | Key password. |
| `ios.provisioningProfilePath` | string | Provisioning Profile location (relative or absolute). |
| `ios.distributionCertificate.path` | string | Distribution Certificate location (relative or absolute). |
| `ios.distributionCertificate.password` | string | Password for the Distribution Certificate. |
| `credentialsSource` (eas.json) | `local` \| `remote` | `local` uses **credentials.json**; `remote` resolves from EAS servers. Defaults to `remote`. |

## Notes

- Add **credentials.json** and all credentials (keystores, `ios/certs/*`) to **.gitignore** so secrets are not committed. Suggested locations: `android/keystores/release.keystore`, `ios/certs`.
- iOS needs a paid Apple Developer account, a Distribution Certificate and a Provisioning Profile (from the Apple Developer Portal).
- Multi-target iOS projects (App Extensions such as Share or Widget) need credentials for every Xcode target, keyed by target name under `ios` (each with `provisioningProfilePath` and `distributionCertificate`), because each extension has its own bundle identifier.
- CI: convert the file to base64 (`base64 credentials.json`), store it in an environment variable such as `CREDENTIALS_JSON_BASE64`, and restore with `echo $CREDENTIALS_JSON_BASE64 | base64 -d > credentials.json`. Keystore, provisioning profile and certificate must also exist on the CI file system at the paths defined in **credentials.json**.
- Source modificationDate: December 08, 2025 (fetched 2026-10-17).

## Related

- [Using automatically managed credentials](./managed-credentials.md)
- [App credentials](./app-credentials.md)
- [Trigger builds from CI](./building-on-ci.md)
- [Run EAS Build locally with local flag](./local-builds.md)
