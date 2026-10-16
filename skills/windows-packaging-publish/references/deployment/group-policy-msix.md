# MSIX Group Policy Settings

How Group Policy works with packaged apps: apps converted to MSIX can still read existing Group Policy registry keys, and Store and app-install policies affect MSIX deployment.

## Signature / Usage

Store policy registry values:

```text
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsStore AutoDownload REG_DWORD
  (enable = 2: apps will not be updated; disable = 4: apps will be automatically updated)
HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\WindowsStoreRemoveWindowsStore REG_DWORD
HKEY_CURRENT_USER\Software\Policies\Microsoft\WindowsStoreRemoveWindowsStore REG_DWORD
```

## Options / Props

| Policy | GPO path | Effect |
| --- | --- | --- |
| Turn off Automatic Download and Install of updates | `Computer Configuration\Administrative Templates\Windows Components\Store` | Enabled: automatic download and installation of app updates is off. Disabled: on. Not configured: determined by a user-changeable registry setting in Store Settings. |
| Turn off Store application | `Computer Configuration\...\Store` or `User Configuration\...\Store` | Enabled: access to the Store is denied (needed for installing app updates). In computer context this turns off app updates. |

Install results on Windows 10 2004 Enterprise (source tables, "PS" = PowerShell; Double-click and standard PS behave the same):

| BlockNonAdminUserInstall | AllowAllTrustedApps | AllowDevelopmentWithoutDevLicense | Result |
| --- | --- | --- | --- |
| Enabled | any | any | Double-click and standard PS blocked; elevated PS installs both Store-signed and trusted non-Store packages, except when AllowAllTrustedApps and AllowDevelopmentWithoutDevLicense are both Disabled: trusted non-Store via elevated PS is blocked. |
| Disabled | any | any | Everything installs, except when AllowAllTrustedApps and AllowDevelopmentWithoutDevLicense are both Disabled: trusted non-Store packages are blocked by every method (Store-signed still installs). |

## Notes

- Group Policy has no native support to install MSIX applications.
- A Win32 app packaged into MSIX (or built with the Desktop Bridge) has the full trust capability and reads Group Policy registry keys with the same view as other installers. Starting in Windows 10 version 1809, UWP apps can access the same keys. Converting with the MSIX Packaging Tool needs no new work for Group Policy.
- The Store app triggers updates for third-party and first-party apps; if the Store app is removed, apps on that computer may not update.

## Related

- [Sideloading prerequisites](./sideloading-prerequisites.md)
- [Deploy with Configuration Manager](./configmgr-deployment.md)
