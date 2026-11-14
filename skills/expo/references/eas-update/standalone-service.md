---
source: https://docs.expo.dev/eas-update/standalone-service/
---

# Using Expo Update without other Expo Services

Use Expo Update independently of other Expo Services, such as Expo Build.

## Signature / Usage

```sh
# Create a channel named `production` (for example, which points to the production Expo Update branch by default)
# Your channel names may vary depending on release process
eas channel:create production
```

### Using Expo Update without Expo Build

Most installation and configuration steps are identical whether or not you use Expo Build. The primary difference is how the update channel is configured. With Expo Build, the channel from **eas.json** is added to your build's **AndroidManifest.xml** and **Expo.plist** at build time. Without it, set the request header in the app config (`updates.requestHeaders`, see [Get started with Expo Update](./getting-started.md)), then create the channel on the server manually.

## Notes

- All main features are designed to be agnostic of the build pipeline.
- Downsides: Expo Build helps with bookkeeping for the runtime version and channel. Builds that use the same channel and runtime version are grouped into a **Deployments** section on expo.dev; these bookkeeping and insights features are unavailable without other Expo Services.
- Source: https://docs.expo.dev/eas-update/standalone-service/ (docs/pages/eas-update/standalone-service.mdx at tag expo@58.0.25).

## Related

- [Get started with Expo Update](./getting-started.md)
- [Manage branches and channels with EAS CLI](./branches-channels-cli.md)
- [Debugging](./debug.md)
