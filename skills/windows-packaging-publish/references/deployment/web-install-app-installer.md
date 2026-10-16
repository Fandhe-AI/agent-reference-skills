# Distribute MSIX Through the Web with App Installer (Azure / IIS / AWS)

App Installer can install an app directly from a web server when the user clicks a link prefixed with the `ms-appinstaller:?source=` protocol. Includes hosting tutorials for Azure Web App, a local IIS server, and AWS S3.

## Signature / Usage

```html
<html>
    <body>
        <h1> MyApp Web Page </h1>
        <a href="ms-appinstaller:?source=http://mywebservice.azureedge.net/HubApp.msix"> Install app package </a>
        <a href="ms-appinstaller:?source=http://mywebservice.azureedge.net/HubAppBundle.msixbundle"> Install app bundle  </a>
        <a href="ms-appinstaller:?source=http://mywebservice.azureedge.net/HubAppSet.appinstaller"> Install related set </a>
    </body>
</html>
```

MIME types for the web server (IIS `Web.config`):

```xml
<system.webServer>
    <staticContent>
      <mimeMap fileExtension=".appx" mimeType="application/appx" />
      <mimeMap fileExtension=".msix" mimeType="application/msix" />
      <mimeMap fileExtension=".appxbundle" mimeType="application/appxbundle" />
      <mimeMap fileExtension=".msixbundle" mimeType="application/msixbundle" />
      <mimeMap fileExtension=".appinstaller" mimeType="application/appinstaller" />
    </staticContent>
</system.webServer>
```

## Options / Props

| File Extension | MIME Type |
| --- | --- |
| .msix | application/msix |
| .appx | application/appx |
| .msixbundle | application/msixbundle |
| .appxbundle | application/appxbundle |
| .appinstaller | application/appinstaller |

Requirements for the protocol activation scheme:

- Web servers must support byte range requests (HTTP/1.1).
- Web servers must know the app package content types (above). Only types actually hosted need configuring; if installation media is on a file share linked from the site, MIME types need not be configured.

## Notes

- **The `ms-appinstaller:` protocol is disabled by default as of December 2023** (App Installer 1.21.3421.0 and later, on consumer devices). One-click browser-triggered install won't work for most users without IT intervention. An administrator can re-enable it with the Group Policy `EnableMSAppInstallerProtocol` (Policy CSP - DesktopAppInstaller). For general distribution, publish to the Microsoft Store, or host the `.appinstaller` file and link directly to it (user downloads and double-clicks).
- Direct install from the web needs Windows 10 Fall Creators Update or newer and App Installer greater than 1.0.12271.0. Older Windows 10 versions (back to Anniversary Update) prompt to **Download** then **Install**.
- Signing: sign with a certificate from a trusted CA (for example Azure Artifact Signing, formerly Trusted Signing) so no certificate distribution is needed. A self-signed certificate must be deployed to the **Trusted People** store on each device before install. On Windows 10 version 2004 and later and Windows 11, sideloading is enabled by default; earlier versions may need the **Allow all trusted apps to install** policy.
- App Installer build 1.24.1981 added Internet Zone validation and Microsoft SmartScreen validation of the `ms-appinstaller` URI.
- Azure: create an Azure Web App, upload the package and a `default.html` via **App Service Editor**, add `Web.config` with the MIME types, then browse to `<app URL>/default.html`.
- IIS: install IIS and ASP.NET 4.5 or greater, create a web app with a `packages` folder, add the HTML page, configure `Web.config` MIME types (ASP.NET Core ignores `web.config` MIME mappings; configure static file middleware instead). Local IIS needs a loopback exemption because App Installer is network-isolated: `CheckNetIsolation.exe LoopbackExempt -a -n=microsoft.desktopappinstaller_8wekyb3d8bbwe` (verify with `-s`, remove with `-d`). Run Visual Studio as administrator; HTTP 403.14 means no start page is defined.
- AWS: create an S3 bucket with public read access, upload the package and web page, and link to the package URL. S3 content must grant read and public read access.
- Install fails if the signing certificate isn't installed on the device. If nothing happens on click, verify App Installer is installed in **Settings** > **Apps & Features**.

## Related

- [App Installer security features](./app-installer-security-features.md)
- [Pass installation parameters](./install-parameters.md)
- [App Installer file overview](./app-installer-file-overview.md)
