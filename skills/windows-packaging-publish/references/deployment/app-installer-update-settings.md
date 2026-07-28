# App Installer Update Settings

Configures how and when App Installer checks for and applies updates to a sideloaded app, via the `UpdateSettings` element of the `.appinstaller` file.

## Signature / Usage

```xml
<UpdateSettings>
  <OnLaunch
      HoursBetweenUpdateChecks="3"
      ShowPrompt="true"
      UpdateBlocksActivation="false" />
  <s4:AutomaticBackgroundTask xmlns:s4="http://schemas.microsoft.com/appx/appinstaller/2021" />
  <s4:ForceUpdateFromAnyVersion xmlns:s4="http://schemas.microsoft.com/appx/appinstaller/2021">true</s4:ForceUpdateFromAnyVersion>
</UpdateSettings>
```

## Options / Props

| Element / Attribute | Min Windows 10 version | Description |
| --- | --- | --- |
| `OnLaunch` | 1709 | Checks for updates when the app launches. Can show UI. |
| `OnLaunch.HoursBetweenUpdateChecks` | 1803 | Integer 0–255; how often (in hours) to check for updates on launch. Default 24 if unspecified. |
| `OnLaunch.ShowPrompt` | 1903 | Boolean; whether to show update UI to the user. |
| `OnLaunch.UpdateBlocksActivation` | 1903 | Boolean; if `true`, the user must take the update before launching the app. Requires `ShowPrompt="true"`. |
| `AutomaticBackgroundTask` (`s4:` namespace) | 1803 | Checks for updates in the background every 8 hours, independent of app launch. Cannot show UI. |
| `ForceUpdateFromAnyVersion` (`s4:` namespace) | 1903 | Boolean; allows moving to a higher **or** lower version. Without it, the app can only move to a higher version. |

## Notes

- `ShowPrompt` must be `true` for `UpdateBlocksActivation` to be set to `true`.
- Two independent choices drive update behavior: *when* to check (on launch vs. background) and *how* to apply (prompt vs. silent, blocking vs. non-blocking).
- The `s4:` namespace (`http://schemas.microsoft.com/appx/appinstaller/2021`) is required for elements introduced in Windows version 21H2 (build 22000).

## Related

- [App Installer file overview](./app-installer-file-overview.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
