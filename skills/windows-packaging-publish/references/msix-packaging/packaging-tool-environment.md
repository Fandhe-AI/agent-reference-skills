# MSIX Packaging Tool Conversion Environment (VM, Remote, Disconnected)

How to prepare the machine used for MSIX Packaging Tool conversion: clean VM guidance, Hyper-V Quick Create, remote machine setup, and offline acquisition.

## Signature / Usage

Enable PowerShell remoting on a remote machine in a trusted domain (run as administrator):

```powershell
Enable-PSRemoting -Force -SkipNetworkProfileCheck
```

Non-domain-joined remote machine (HTTPS):

```powershell
Enable-PSRemoting -Force -SkipNetworkProfileCheck
New-NetFirewallRule -Name "Allow WinRM HTTPS" -DisplayName "WinRM HTTPS" -Enabled True -Profile Any -Action Allow -Direction Inbound -LocalPort 5986 -Protocol TCP

$thumbprint = (New-SelfSignedCertificate -DnsName $env:COMPUTERNAME -CertStoreLocation Cert:\LocalMachine\My -KeyExportPolicy NonExportable).Thumbprint
$command = "winrm create winrm/config/Listener?Address=*+Transport=HTTPS @{Hostname=""$env:computername"";CertificateThumbprint=""$thumbprint""}"
cmd.exe /C $command
Export-Certificate -Cert Cert:\LocalMachine\My\$thumbprint -FilePath <path_to_cer_file>
```

On the local machine, trust the exported certificate:

```powershell
Import-Certificate -FilePath <path> -CertStoreLocation Cert:\LocalMachine\Root
```

Offline install of the tool and license:

```powershell
Add-AppxProvisionedPackage -Path C:\offline -PackagePath C:\MSIX\MyPackage.msix -LicensePath C:\MSIX\MyLicense.xml
Dism /Online /add-package /packagepath:(path)
```

## Options / Props

| Topic | Guidance |
|-------|----------|
| Minimum OS for the tool | Windows 10 1809 |
| Clean machine | Tool listens to everything during install; extraneous apps or services can be captured |
| Environment | Mimic the target environment (services, policies); match target architecture (x64 target -> x64 conversion machine) |
| Checkpoint | Apply best-practice settings, then checkpoint the VM and revert after each conversion |
| Dependencies | Runtime dependencies go in the main app; plug-ins as modification packages |
| Hyper-V Quick Create | Available from Windows 10 1709; "MSIX Packaging Tool Environment" is a custom Windows 10 evaluation build (version 1909) with the latest tool; requires Hyper-V |
| MSIX Packaging Tool server port | Default 1599 (changeable in tool Settings) |
| WinRM HTTPS port | 5986 |
| Azure inbound rule | Networking > Add inbound port > Basic; custom port 1599; for non-domain-joined also add a rule with Service set to WinRM |

Feature on Demand (FOD) `.cab` for the packaging tool driver (downloaded manually, installed with DISM):

| Windows version | Note |
|-----------------|------|
| 10 1809 (x64, x86) | Separate cab per architecture |
| 10 1903 (x64, x86) | Also works for 1909 |
| 10 2004 (x64) | Also works for later Windows 10 |
| 11 21H2 (x64) | Also works for 22H2 and later |

## Notes

- PowerShell remoting and an administrator account on the remote machine are required; for a domain-joined machine, sign in with a domain account, not a local account.
- Disconnected mode applies only to public releases, not Insider releases. The page offers the offline package `1.2024.405.0` (msixbundle) and an offline license file for download.
- The tool driver is delivered as an FOD from Windows Update and fails to install if Windows Update is disabled or Insider flight ring settings do not match the OS build. WSUS / Configuration Manager environments may need configuration changes, or the FOD can be installed manually.
- FOD media is also available via VLSC (Volume Licensing), OEM Portal, or MSDN; admins can build a side-by-side feature store shared folder.
- Ensure the `.cab` path includes the correct file name with the extension when using DISM.

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [MSIX Packaging Tool Best Practices and Known Issues](./packaging-tool-known-issues.md)
- [Know Your Installer (Conversion Readiness)](./know-your-installer.md)
- [MSIX Packaging Tool Command-Line Conversion and Conversion Templates](./packaging-tool-command-line.md)
