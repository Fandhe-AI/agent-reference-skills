# App Installer Authentication Manager

The Microsoft Desktop App Installer on Windows 11 supports OAuth 2.0 authentication requests for identities hosted in Microsoft Azure Active Directory (AAD) to access app installation media. The user is prompted only if the installation media is inaccessible.

## Signature / Usage

Append `?msixauth=<identity provider>` to the URI targeting the installation media:

```text
ms-appinstaller:?source=https://website.com/app.msix&msixauth=aad
```

## Options / Props

| Identity Service | Identity Connection String |
| --- | --- |
| Microsoft AAD | `msixauth=aad` |

## Notes

- Field values must be URL-encoded (non-printing characters and spaces). Use `?` to separate the main source from field values and `&` to separate subsequent fields in the `ms-appinstaller:` URI.
- An IT professional can control the `ms-appinstaller` URI scheme. To enable it on a network, set the policy `EnableMSAppInstallerProtocol` (Policy CSP - DesktopAppInstaller) to enabled.

## Related

- [App Installer security features](./app-installer-security-features.md)
- [Web install with App Installer](./web-install-app-installer.md)
