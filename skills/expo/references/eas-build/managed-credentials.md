---
source: https://docs.expo.dev/app-signing/managed-credentials/
---

# Using automatically managed credentials

Learn how to automatically manage your app credentials with EAS.

## Signature / Usage

For an app to be distributed in a store it must be signed with credentials such as a keystore or a distribution certificate. When you run `eas build`, you are prompted to generate credentials if you have not done so already; they are stored on EAS servers where needed and re-used on subsequent builds unless you specify otherwise.

```sh
eas credentials
```

`eas credentials` shows the currently configured app signing credentials and lets you remove and modify them. Use it to set up push notification keys:

- Android: run `eas credentials`, select `Android`, then `Push Notifications: Manage your FCM Api Key`, then choose the option to set up the key.
- iOS: EAS CLI asks for the Push Notifications key during the next `eas build` run, or run `eas credentials`, select `iOS`, then `Push Notifications: Manage your Apple Push Notifications Key`.

## Notes

- Generating iOS credentials (distribution certificate, provisioning profile, push key) requires signing in with an Apple Developer Program membership.
- Other credentials, such as the FCM API Key and Apple Push Key, are needed to send push notifications but are not involved in app signing.
- Team sharing: once the project is configured for collaboration (organization account), teammates with sufficient permissions can run `eas build`. After iOS credentials are generated, collaborators can start iOS builds with only their Expo accounts, without access to the Apple Developer team.
- Security concerns: see the Security guide (not included in this skill) or use local credentials instead.
- Credentials can be synced to a local machine or existing credentials migrated to be automatically managed (see the Syncing credentials and Existing credentials guides, not included in this skill).
- Source modificationDate: May 21, 2025 (fetched 2026-10-17).

## Related

- [App credentials](./app-credentials.md)
- [Using local credentials](./local-credentials.md)
- [Internal distribution](./internal-distribution.md)
