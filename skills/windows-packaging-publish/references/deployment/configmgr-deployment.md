# Deploy MSIX with Microsoft Configuration Manager

Microsoft Configuration Manager (ConfigMgr) can deploy MSIX-packaged apps silently to on-premises managed Windows devices: code signing, certificate trust, application creation, collection targeting, supersedence-based updates, and troubleshooting.

## Signature / Usage

Verify a package outside ConfigMgr when diagnosing a `0x80073CF0` error, and read the client deployment log:

```powershell
Add-AppxPackage -Path .\MyApp.msix
Get-Content C:\Windows\CCM\Logs\AppEnforce.log
```

## Options / Props

Prerequisites: a signed MSIX package; a UNC path accessible from the distribution point (or content on a distribution point); a device or user collection; Configuration Manager Current Branch (or SCCM 1706 or later); sideloading enabled on target devices.

| Windows version | Sideloading default | Action |
| --- | --- | --- |
| Windows 11 | Enabled | None |
| Windows 10 (2004 and later) | Enabled | None |
| Windows 10 (before 2004) | Disabled | Enable via Group Policy: **Computer Configuration** > **Administrative Templates** > **Windows Components** > **App Package Deployment** > **Allow all trusted apps to install** |

Error codes:

| Code | Meaning / checks |
| --- | --- |
| 0x80073CF3 | `ERROR_INSTALL_RESOLVE_DEPENDENCY_FAILED`: package failed updates, dependency or conflict validation. Check dependency packages are available. |
| 0x80073D06 | `ERROR_INSTALL_PACKAGE_DOWNGRADE`: a newer version is already installed. Verify manifest version is higher, or allow `-ForceUpdateFromAnyVersion`. |
| 0x80073CF0 | Package file can't be opened. Check UNC path, distribution point content status, and file corruption. |
| 0x8007000D | Invalid data / publisher mismatch: manifest `Publisher` doesn't exactly match the signing certificate Subject. Re-sign after correcting. |

## Notes

- Source: https://learn.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-deployment-configmgr
- The source page maps 0x80073CF3 to `ERROR_INSTALL_PACKAGE_DOWNGRADE`; per winerror.h 0x80073CF3 is `ERROR_INSTALL_RESOLVE_DEPENDENCY_FAILED` and downgrade is 0x80073D06.
- Every MSIX must be signed; Windows won't install an unsigned MSIX, even silently via ConfigMgr. Options: a self-signed certificate (domain-managed devices only; trust must be distributed) or Azure Artifact Signing (formerly Trusted Signing), a CA-trusted certificate needing no certificate deployment.
- Self-signed trust: import the `.cer` into **Public Key Policies** > **Trusted People** with Group Policy, or deploy a ConfigMgr **Trusted CA Certificate** profile with store **Trusted People** to the same collection. Trust must reach devices before the app, otherwise installation can fail with a certificate trust error.
- Create the application: **Software Library** > **Application Management** > **Applications** > **Create Application**; select **Automatically detect information about this application from installation files**, type **Windows app package (*.appx, *.appxbundle, *.msix, *.msixbundle)**, with the UNC path. Install and detection logic are set automatically.
- Deploy: set **Action** to **Install**; **Purpose** **Required** for silent install or **Available** for Software Center. Clients pick it up on the next policy refresh (default 60 minutes); trigger **Machine Policy Retrieval & Evaluation Cycle** for immediate sync.
- Updates use application supersedence: create a new application for the new version, add it as the superseding app on the original's **Supersedence** tab, and leave **Uninstall** unchecked for a normal in-place upgrade (same identity, higher version); check it only when the new package can't supersede in place. Unlike Intune, ConfigMgr doesn't auto-detect MSIX version changes on the same application entry.
- Windows 10 may require an elevated session for all-user registration and has more unbackported MSIX packaging bugs than Windows 11 (see `microsoft/msix-packaging` issues).
- Certificate trust failure diagnosis: `gpresult /r`, and `certlm.msc` > **Local Computer > Trusted People**. "Waiting for content": **Update Distribution Points** and check **Monitoring** > **Distribution Status** > **Content Status**.

## Related

- [Enterprise deployment with Intune](./enterprise-deployment-intune.md)
- [MSIX troubleshooting guide](./msix-troubleshooting-guide.md)
- [Sideloading prerequisites](./sideloading-prerequisites.md)
