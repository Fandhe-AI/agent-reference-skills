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
| `OnLaunch.HoursBetweenUpdateChecks` | 1803 | Integer 0–255; the minimum number of hours between update checks. Default 24 if unspecified. On launch, the system checks only if at least this many hours have passed since the last check (e.g. 3 means no check if one ran within the past 3 hours). |
| `OnLaunch.ShowPrompt` | 1903 | Boolean; whether to show update UI to the user. |
| `OnLaunch.UpdateBlocksActivation` | 1903 | Boolean; if `true`, the user must take the update before launching the app. Requires `ShowPrompt="true"`. |
| `AutomaticBackgroundTask` (`s4:` namespace) | 1803 | Checks for updates in the background every 8 hours, independent of app launch. Cannot show UI. |
| `ForceUpdateFromAnyVersion` (`s4:` namespace) | 1903 | Boolean; allows moving to a higher **or** lower version. Without it, the app can only move to a higher version. |

## Notes

- `OnLaunch` update checks depend on how the MSIX app is activated, not where the user starts it. Checks run through supported activation entry points: the Start menu (including a pinned tile), an app execution alias, or a protocol handler. A desktop shortcut or taskbar item that launches the executable directly bypasses the check and starts the installed version without checking for an update; one that invokes a supported activation entry point triggers the check. To check regardless of activation path, check for and apply package updates from your code.
- `ShowPrompt` must be `true` for `UpdateBlocksActivation` to be set to `true`.
- Two independent choices drive update behavior: *when* to check (on launch vs. background) and *how* to apply (prompt vs. silent, blocking vs. non-blocking).
- The `s4:` namespace (`http://schemas.microsoft.com/appx/appinstaller/2021`) is required for elements introduced in Windows version 21H2 (build 22000).

## Related

- [App Installer file overview](./app-installer-file-overview.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
