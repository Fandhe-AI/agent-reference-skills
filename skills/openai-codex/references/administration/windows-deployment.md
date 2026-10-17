# Deploy the Windows app

Choose an enterprise installation and update path for the ChatGPT desktop app on Windows.

## Overview

Users can self-install via the web installer, or IT can deploy centrally with Microsoft Intune or another MDM/software-deployment platform. The app is Store-signed but users don't need to browse the Microsoft Store.

## Signature / Usage

Command-line install:

```powershell
winget install --id 9PLM9XGG6VKS -s msstore
```

Enterprise MDM deployment: search "ChatGPT from OpenAI" in the Store app flow, or use Store product ID `9PLM9XGG6VKS`.

## Install without Microsoft distribution services

Download the Store-signed MSIX per architecture and, if required, the offline license file, then ingest into your MDM/software-deployment platform:

| Device architecture | Package |
|----------------------|---------|
| x64 | `ChatGPT-x64.msix` |
| Arm64 | `ChatGPT-arm64.msix` |

## Deployment methods

- Package URLs (Store-signed, latest per architecture): `https://persistent.oaistatic.com/codex-app-prod/ChatGPT-x64.msix`, `https://persistent.oaistatic.com/codex-app-prod/ChatGPT-arm64.msix`, and the offline license `https://persistent.oaistatic.com/codex-app-prod/ChatGPT-License.xml`. Offline installation doesn't provide offline access to ChatGPT; standalone MSI and non-Store EXE packages aren't available.
- Intune, Microsoft Store (recommended): **Apps** > **All apps** > **Create** > **Microsoft Store app (new)**, search **ChatGPT** from **OpenAI** or enter product ID `9PLM9XGG6VKS`, set **Install behavior** to **System** on **App information**, assign the target group under **Required** (or **Available for enrolled devices** for Company Portal). Devices need access to Microsoft Store and Windows Update endpoints; otherwise use an offline MSIX.
- Intune, offline MSIX: **Line-of-business app**, upload the MSIX, assign under **Required**, change **Install Context** from **User context** to **Device context**, then confirm in **Device install status**. For user-chosen installs use a **Windows app (Win32)** with **Available for enrolled devices**: rename the package to `ChatGPT.msix`, keep it with `ChatGPT-License.xml`, and package `Install-ChatGPT.ps1` (`#Requires -RunAsAdministrator`; `Add-AppxProvisionedPackage -Online -PackagePath "$PSScriptRoot\ChatGPT.msix" -LicensePath "$PSScriptRoot\ChatGPT-License.xml" -Regions all`). Install command: `%SystemRoot%\Sysnative\WindowsPowerShell\v1.0\powershell.exe -NoProfile -File .\Install-ChatGPT.ps1`. Detection rule: `Get-AppxProvisionedPackage -Online` where `DisplayName -eq 'OpenAI.Codex'` (exit 0 if found; also compare `Version` for a specific approved version). Uninstall: run `Get-AppxProvisionedPackage -Online | Where-Object DisplayName -eq 'OpenAI.Codex' | Remove-AppxProvisionedPackage -Online -AllUsers` and `Get-AppxPackage -AllUsers -Name 'OpenAI.Codex' | Remove-AppxPackage -AllUsers`. Follow your PowerShell script-signing policy.
- SCCM: put the MSIX on a share, **Software Library** > **Application Management** > **Applications** > **Create Application** > **Windows app package**, enable **Provision this application for all users on the device**, distribute to distribution points, deploy as **Required** or **Available** (use the Windows app package deployment type, not the Store-link type).
- Other tools: add the MSIX, install for the device with Local System or administrator privileges, assign to a pilot group, and confirm employees can open ChatGPT under normal Windows accounts; if a script is required use the same `Install-ChatGPT.ps1` with 64-bit Windows PowerShell. If the app doesn't appear, have users sign out and back in (Windows registers the provisioned package at sign-in).
- Self-install: the ChatGPT Windows installer (administrator must approve) or `winget install --id 9PLM9XGG6VKS -s msstore`; offline install by an administrator with `Add-AppxProvisionedPackage -Online -PackagePath .\ChatGPT.msix -LicensePath .\ChatGPT-License.xml -Regions all`.
- Manage app updates: the app checks for updates by default (also after offline installation); allow `persistent.oaistatic.com` for automatic updates; if you disable them, deploy newer packages through your management tool. Disabling the built-in updater doesn't disable updates from the Microsoft Store or your management tool.
- Troubleshooting: administrator-credential prompts are expected for self-install; for an Intune Store deployment check **Install behavior** (re-add as **Microsoft Store app (new)** with **System** if it was **User**), assign the group, sync the device; deploying with **System** over an existing install may report `0x87D1041C` while installation still succeeds. Error `0x80073D28` (`ERROR_PACKAGED_SERVICE_REQUIRES_ADMIN_PRIVILEGES`) means the packaged service can't install without administrator privileges: run as administrator or install in device/System context; for SCCM enable **Provision this application for all users on the device** in the deployment type's **User Experience**, refresh machine policy, and retry in Software Center.

## Notes

- This deployment path supports x64/Arm64 initial installation in restricted environments but doesn't provide a standalone MSI or non-Store EXE.
- After initial install, devices that can reach `persistent.oaistatic.com` update automatically unless [managed configuration](./managed-configuration.md) disables the built-in updater.
- See [Manage app updates](./manage-app-updates.md) for turning off/on the in-app updater and deploying approved versions.

## Related

- [Manage app updates](./manage-app-updates.md)
- [Admin rollout guide](./admin-rollout-guide.md)
