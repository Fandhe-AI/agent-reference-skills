# Install Earlier Versions of an MSIX App Package

An earlier version of an MSIX app package can be installed without prior removal of the application.

## Signature / Usage

```powershell
Add-AppxPackage -Path .\MyApp_1.0.0.0_x64.msix
```

## Notes

- Installing an earlier version makes the client review the manifest (`appxmanifest.xml`) in the installing package and identify delta differences from the installed app.
- Data stored in the `appdata` folder is maintained. Changes made while installing the upgraded version aren't undone when an earlier version is installed.
- In the App Installer dialog the Install button changes to **Reinstall** when downgrading or reinstalling.
- Via an App Installer file, downgrade needs `ForceUpdateFromAnyVersion` (default False: only newer versions installed).
- A deployment error 0x80073CF3 (`ERROR_INSTALL_PACKAGE_DOWNGRADE`) can occur in ConfigMgr deployments when a newer version is already installed.

## Related

- [Auto-update and repair apps](./app-installer-auto-update-repair.md)
- [Deploy with Configuration Manager](./configmgr-deployment.md)
