---
source: https://v2.tauri.app/distribute/sign/ios/
---

# iOS Code Signing

Code signing on iOS is required to distribute through the Apple App Store (or possibly alternative marketplaces in the European Union) and in general to install and execute on end user devices.

## Signature / Usage

Manual signing via environment variables (base64 values):

```sh
base64 -i <path-to-certificate.p12> | pbcopy      # -> IOS_CERTIFICATE
base64 -i <path-to-profile.mobileprovision> | pbcopy   # -> IOS_MOBILE_PROVISION
```

## Options / Props

| Environment variable | Description |
| --- | --- |
| `IOS_CERTIFICATE` | base64 representation of the certificate exported from the Keychain (.p12) |
| `IOS_CERTIFICATE_PASSWORD` | Password of the certificate set when exporting it from the Keychain |
| `IOS_MOBILE_PROVISION` | base64 representation of the provisioning profile |
| `APPLE_API_ISSUER` | Issuer ID (shown above the keys table in App Store Connect), for automatic signing in CI/CD |
| `APPLE_API_KEY` | Key ID (Key ID column) of the App Store Connect API key |
| `APPLE_API_KEY_PATH` | File path of the downloaded API private key |

Certificate type per export method:

| Export method | Certificate type |
| --- | --- |
| `debugging` | Apple Development or iOS App Development |
| `app-store-connect` | Apple Distribution or iOS Distribution (App Store Connect and Ad Hoc) |
| `ad-hoc` | Apple Distribution or iOS Distribution (App Store Connect and Ad Hoc) |

## Prerequisites

Enroll in the Apple Developer program (99$ per year at the time of writing) and use an Apple device for signing. You need a bundle identifier registered in App Store Connect, an appropriate iOS code signing certificate and a mobile provisioning profile linking them and enabling the iOS capabilities of your app. These can be managed by Xcode automatically or provided manually.

## Automatic Signing

Letting Xcode manage signing and provisioning is the most convenient way. It registers your bundle identifier, manages capability changes and configures a certificate based on the export method. It is enabled by default and uses the account configured in Xcode (`Xcode > Settings > Accounts`, `+` icon).

For CI/CD, create an App Store Connect API key (Users and Access, Integrations tab, Add, name and Admin access) and set `APPLE_API_ISSUER`, `APPLE_API_KEY` and `APPLE_API_KEY_PATH`. The private key can be downloaded only once (visible after a page reload).

## Manual Signing

- Signing certificate: on the Certificates page create an Apple Distribution certificate, install it in the macOS Keychain, export the key from Keychain Access (right-click the key item, "Export <key-name>") as a `.p12` with a password, convert it with the `base64` command above.
- Provisioning profile: in Identifiers create an App ID whose "Bundle ID" matches the `identifier` config; in Profiles create a profile ("App Store Connect" for App Store distribution) linked to the App ID and your certificate; download it and convert it with the `base64` command above.

## Notes

- Tauri bundler side only; Apple's signing procedures belong to the apple-distribution skill.

## Related

- [app-store](./app-store.md)
- [sign-macos](./sign-macos.md)
- [bundle-mobile config](../config/bundle-mobile.md)
