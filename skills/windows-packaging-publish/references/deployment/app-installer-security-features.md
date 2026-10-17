# App Installer Security Features

Security features introduced in App Installer build 1.24.1981: internet warning, Microsoft SmartScreen reputation-based URL validation, and URL Security Zones.

## Signature / Usage

Registry policy values under `HKLM:\Software\Policies\Microsoft\Windows\AppInstaller`:

```text
EnableMSAppInstallerProtocol=1
EnableMsixAllowedZones=1
```

## Options / Props

| Security Zone | Default | Detail |
| --- | --- | --- |
| Local Machine | Allow | Setting to *Blocked* prevents any local MSIX from being installed. |
| Intranet | Allow | Setting to *Blocked* prevents files from enterprise servers from being downloaded and installed. |
| Trusted Sites | Allow | When *Allow*, lets the IT professional allow specific Internet URIs. |
| Internet | Allow | When *Allow*, lets the IT professional restrict installing apps from all Internet URIs. |
| Untrusted Sites | Blocked | When *Blocked*, lets the IT professional block specific Internet URIs. |

| Policy entry | Description |
| --- | --- |
| EnableMSAppInstallerProtocol | Enables or disables the MS-AppInstaller protocol. |
| EnableMsixAllowedZones | If enabled (1), allows overriding whether App Installer allows a Security Zone. |
| MsixAllowedZones | Honored when `EnableMsixAllowedZones` is enabled. By default `UntrustedSites` URLs are rejected and all other zones allowed. |

## Notes

- The source's "Allow zone" example sets `UntrustedSites=1` under `MsixAllowedZones`. This lifts the default block on Untrusted Sites and weakens install protection, so it is not recommended as a default configuration. The source documents no value for the blocking direction, so none is given here.
- Internet warning: App Installer shows a warning banner whenever a package is installed from the internet; verify the source on the dialog is trusted.
- SmartScreen: before downloading a package from an Internet source, App Installer consults Microsoft SmartScreen's URL Reputation service. On a failure the user can **Cancel** or **Continue** (not recommended); Continue lets App Installer open the package.
- Blocked URLs show the dialog "Your internet security settings prevented this file from being opened".
- App Installer access to URL Security Zones is controlled by the DesktopAppInstaller CSP. IT pros can add sites to the Restricted or Trusted Sites zone via the `policy-csp-internetexplorer` policy; a URL in a blocked zone blocks installation.
- Source: https://learn.microsoft.com/en-us/windows/msix/app-installer/app-installer-security-features, last updated 7/1/2024 (ms.date).

## Related

- [App Installer authentication manager](./app-installer-authentication-manager.md)
- [App Installer (the app)](./app-installer-app.md)
