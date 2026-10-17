---
source: https://docs.expo.dev/eas-update/standalone-service/
---

# Using EAS Update without other EAS services

Use EAS Update independently of other EAS services, such as EAS Build.

## Signature / Usage

```sh
# Create a channel named `production` (for example, which points to the production EAS Update branch by default)
# Your channel names may vary depending on release process
eas channel:create production
```

## Using EAS Update without EAS Build

Most installation and configuration steps are identical whether or not you use EAS Build. The primary difference is how the update channel is configured. With EAS Build, the channel from **eas.json** is added to your build's **AndroidManifest.xml** and **Expo.plist** at build time. Without it, set the request header in the app config (`updates.requestHeaders`, see [Get started with EAS Update](./getting-started.md)), then create the channel on the server manually.

## Notes

- All main features are designed to be agnostic of the build pipeline.
- Downsides: EAS Build helps with bookkeeping for the runtime version and channel. Builds that use the same channel and runtime version are grouped into a **Deployments** section on expo.dev; these bookkeeping and insights features are unavailable without other EAS services.
- Source modificationDate: February 13, 2025 (fetched 2026-10-17).

## Related

- [Get started with EAS Update](./getting-started.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
- [Debugging](./debug.md)
