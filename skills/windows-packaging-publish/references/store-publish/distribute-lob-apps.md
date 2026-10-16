# Distribute LOB Apps to Enterprises

Ways to distribute line-of-business (LOB) MSIX apps to an organization without publishing them broadly, and what happened to Store for Business / offline licensing.

## Signature / Usage

```text
Direct link to a hosted .appinstaller file (HTTPS web server) -> user opens it -> App Installer installs/updates the signed MSIX.
```

## Options / Props

| Method | Use when |
|---|---|
| Microsoft Intune | Cloud-connected devices; assign to Microsoft Entra user or device groups (add as Windows line-of-business app; required or available via Company Portal) |
| Microsoft Configuration Manager | On-premises or co-managed devices; centralized deployment and reporting |
| App Installer | Package and optional `.appinstaller` hosted on a web server; interactive install and update experience |
| Direct sideloading | Signed package via file share, download, script or other controlled channel (PowerShell, deployment scripts, provisioning packages, Windows images) |

## Notes

- Every MSIX installed outside the Microsoft Store must be signed with a certificate the target device trusts. Sideloading is enabled by default on Windows 10 version 2004+ and Windows 11.
- Configuration Manager reads the package identity, publisher and version; deploy the signing certificate to devices first if not already trusted.
- The `ms-appinstaller:` URI protocol for one-click web install is disabled by default; enterprise admins can enable it by policy on managed devices.
- Microsoft Store for Business and Microsoft Store for Education retired on March 31, 2023; the enterprise association, private store and offline Store licensing workflow is no longer a path for new LOB apps. Company Portal is the private app repository for Intune organizations.
- Private audience contains individually named personal Microsoft accounts (not Entra work/school accounts), so it is not a replacement for enterprise deployment.
- Partner Center still shows Organizational licensing on Pricing and availability; these apply to publicly published apps and don't create a private catalog. Per-app, change via a new submission (effective after certification). Submissions made through the Store submission API aren't available for volume acquisition.
- "Make my app available to organizations with Store-managed (online) licensing and distribution" is a legacy setting; unchecking keeps already-acquired licenses valid. "Allow organization-managed (offline) licensing" is unchecked by default and is not supported for .xap packages.

## Related

- [Visibility Options](./visibility-options.md)
- [Pricing and Availability](./pricing-and-availability.md)
- [Beta Testing and Targeted Distribution](./beta-testing-targeted-distribution.md)
