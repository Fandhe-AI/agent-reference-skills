# MSIX Sideloading and Developer Mode

Testing an MSIX-packaged app before Store submission requires either **Developer Mode** or the **sideloading** policy enabled on the test device, so unsigned/unpublished packages can be installed and deployed from Visual Studio or a package + certificate.

## Signature / Usage

```powershell
# Enable sideloading via registry (no reboot required for sideloading alone)
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v "AllowAllTrustedApps" /d "1"

# Enable full Developer Mode via registry
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v "AllowDevelopmentWithoutDevLicense" /d "1"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| **Developer Mode** setting | Settings toggle | `System > Advanced > For developers`; unlocks sideloading, debugging, and remote deployment (Device Portal, Device Discovery/SSH) |
| `AllowAllTrustedApps` | registry DWORD | `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock`; `1` enables sideloading only |
| `AllowDevelopmentWithoutDevLicense` | registry DWORD | Same key; `1` enables full Developer Mode |
| `gpedit.msc` policy | Group Policy | **Computer Configuration > Administrative Templates > Windows Components > App Package Deployment** > "Allow all trusted apps to install" (+ the UWP IDE-install policy for full Developer Mode) |

## Notes

- Enabling Developer Mode requires administrator access; on organization-owned devices this may be disabled by policy.
- `AllowAllTrustedApps` / `AllowDevelopmentWithoutDevLicense` relax the install-time trust checks for the whole machine. Set them only on test machines, and reset them to `0` once testing is finished.
- The registry/`gpedit` paths do **not** enable the SSH server or remote deployment targeting — those require Developer Mode's **Device Discovery** feature enabled via Settings.
- Device Portal and Device Discovery are used when developing on one machine but deploying/testing on another (e.g. a tablet for touch UI testing); enable Device Discovery only on the deployment target, not the dev PC.
- `Windows 10/11 Home` editions lack `gpedit.msc`; use `regedit` or the PowerShell/`reg add` commands instead.
- Sideloading is also a prerequisite for WinAppDriver/Appium automation and for local WACK certification testing of unsigned packages.

## Related

- [Windows App Certification Kit (WACK)](./wack-certification.md)
- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)
