---
source: https://docs.expo.dev/eas-update/preview/
---

# Preview updates

Learn how to preview updates in development, preview, and production builds.

## Signature / Usage

Before deploying an update to production, test it in a production-like environment. The source page is a conceptual overview with no code example.

## Previewing in development builds

Development builds can preview updates from pull requests, directly from the EAS dashboard, or from the built-in UI provided by the `expo-dev-client` library. Related approaches: GitHub Actions to automate publishing updates, and Expo Orbit (macOS, Windows, Linux desktop app) to launch preview updates from the EAS dashboard.

## Previewing in preview builds

Non-technical users typically test changes from a preview build on an app store testing track or through internal distribution. For smaller teams, deploy a single preview build at a time and publish updates to the channel that build uses. Alternatively, build a mechanism into the preview build that lets users select a different update or channel to load (channel surfing), useful when the app runtime does not change often.

## Previewing in production builds

Teams may first roll out an update to a small set of internal users in production. One way is channel surfing for a known subset of users; use it only with users who can report and recover from preview update issues, because a broken update can prevent them from reaching the UI that clears the channel override. Another approach is a deployment pattern such as the persistent staging flow, which keeps a version of your production app that points to a staging channel.

## Notes

- This page contains no fenced code in the official source; no snippet is included here. For a runtime channel-switch snippet see [Override update configuration at runtime](./override.md).
- Source modificationDate: September 17, 2026 (fetched 2026-10-17).

## Related

- [Override update configuration at runtime](./override.md)
- [Deploy updates](./deployment.md)
- [Runtime versions and updates](./runtime-versions.md)
