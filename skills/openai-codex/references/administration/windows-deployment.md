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

## Notes

- This deployment path supports x64/Arm64 initial installation in restricted environments but doesn't provide a standalone MSI or non-Store EXE.
- After initial install, devices that can reach `persistent.oaistatic.com` update automatically unless [managed configuration](./managed-configuration.md) disables the built-in updater.
- See [Manage app updates](./manage-app-updates.md) for turning off/on the in-app updater and deploying approved versions.

## Related

- [Manage app updates](./manage-app-updates.md)
- [Admin rollout guide](./admin-rollout-guide.md)
