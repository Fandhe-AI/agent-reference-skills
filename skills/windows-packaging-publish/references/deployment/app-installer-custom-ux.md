# Create Custom App Installer UX

Customize the App Installer install experience for your MSIX package with a `MSIXAppInstallerData.xml` file added to the package. Available on Windows 10 1709 and later.

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<AppInstallerUX xmlns="http://schemas.microsoft.com/msix/appinstallerux"
  xmlns:ux="http://schemas.microsoft.com/msix/appinstallerux"
  xmlns:ux2="http://schemas.microsoft.com/msix/appinstallerux/2"
  IgnorableNamespaces="ux ux2" Version="1.0.0">
  <UX AccentColor="#DE781F" FontFamily="Segoe UI" AllowUserInteraction="false" BackgroundColor="#F3F3F3"
    AppNameInTitle="true" HyperLinkFontSize="12">
    <Icon HorizontalAlignment="center" Logo="Images\Contoso96x96.png" TopMargin="70"/>
    <Buttons HorizontalAlignment="center" Text="Contoso" IsSecondaryButtonAccent="false"/>
    <LaunchWhenReady HorizontalAlignment="center"/>
    <AppInformation Mode="flyout" />
    <HyperLinks TopMargin="30">
      <HyperLink Text="Terms &amp; conditions" Url="https://support.microsoft.com/" HorizontalAlignment="center"/>
    </HyperLinks>
  </UX>
</AppInstallerUX>
```

## Options / Props

| Setting | Description |
| --- | --- |
| UX::AccentColor | Hex code for the accent color. |
| UX::FontFamily | Font family. |
| UX::AllowUserInteraction | Boolean. If true, the user sees the "launch when ready" checkbox (checked by default) and can cancel the install. |
| UX::BackgroundColor | Hex code for the background color. |
| UX::AppNameInTitle | Boolean. If true, the app name appears in the installer window title. |
| HyperLinkFontSize | Hyperlink font size. |
| Icon::HorizontalAlignment | Icon alignment: left, center, right. |
| Icon::Logo | Link to icon location. |
| Icon::TopMarging | Margin from the top of the icon to the top of the window (spelled as in the source). |
| Buttons::HorizontalAlignment | Button alignment: left, center, right. |
| Buttons::Text | Additional text to add to the Install button. |
| Buttons::IsSecondaryButtonAccent | Boolean. |
| LaunchWhenReady::HorizontalAlignment | Alignment of the "Launch when ready" checkbox: center, left. |
| AppInformation::Mode | Additional information display type: Normal, flyout. |
| Hyperlinks::TopMargin | Margin between hyperlink and buttons. |
| Hyperlink::Text / Hyperlink::Url | Hyperlink text and link. |
| Hyperlink::HorizontalAlignment | Hyperlink alignment: left, center, right. |

## Notes

- Add the file with the MSIX Packaging Tool Package Editor: create a folder `Msix.AppInstaller.Data` under the package root, add `MSIXAppInstallerData.xml` to it, then save the package (increment the version and sign it).
- Troubleshooting: the file must be named `MSIXAppInstallerData.xml`; it must be in a folder named `MSIX.AppInstaller.Data` directly under the package root; check the OS version and App Installer version; verify the XML is valid.
- Source: https://learn.microsoft.com/en-us/windows/msix/app-installer/how-to-create-custom-app-installer-ux, last updated 9/30/2021 (ms.date).

## Related

- [App Installer (the app)](./app-installer-app.md)
- [App Installer file overview](./app-installer-file-overview.md)
