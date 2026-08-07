# Dashboards and feed providers

Feed providers let a third-party app or service register content feeds that surface directly on the Windows Widgets Board's Dashboards, without users needing to open the app.

## Signature / Usage

```xml
<!-- package.appxmanifest: register the feed provider app extension -->
<uap3:AppExtension Name="com.microsoft.windows.widgets.feeds" DisplayName="ContosoApp" Id="ContosoApp" PublicFolder="Public">
  <uap3:Properties>
    <FeedProvider Description="ms-resource:ProviderDescription" Icon="ms-appx:Images\ContosoProviderIcon.png">
      <Activation>
        <CreateInstance ClassId="ECB883FD-3755-4E1C-BECA-D3397A3FF15C" />
      </Activation>
      <Definitions>
        <Definition Id="Contoso_Feed"
            DisplayName="ms-resource:FeedDisplayName"
            Description="ms-resource:FeedDescription"
            ContentUri="https://contoso.com/news"
            Icon="ms-appx:Images\ContosoFeedIcon.png" />
      </Definitions>
    </FeedProvider>
  </uap3:Properties>
</uap3:AppExtension>
```

High-level steps: 1. Register feeds — declare the app's feeds in the app manifest; once detected, they appear in the Widgets Board. 2. Implement feed experience — a web component rendered in an iframe on the Widgets Board, shown as a pivot above the Feeds section. 3. Provide personalization controls (optional) — a per-feed dialog letting users customize the feed experience.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uap3:AppExtension Name="com.microsoft.windows.widgets.feeds"` | manifest extension | Required app-extension name for registering a Win32 feed provider; registration content goes in the nested `uap3:Properties` > `FeedProvider` element. |
| `FeedProvider` (`Description`, `DisplayName`, `Icon`, `Id`) | manifest element | Root registration element for the provider, shown on the Widgets Board. |
| `Definition` (`Id`, `DisplayName`, `Description`, `ContentUri`, `Icon`) | manifest element | Per-feed registration; `ContentUri` is the URI feed content is retrieved from. |
| Feed experience | web component (iframe) | The rendered feed UI, shown as a pivot above the Feeds section of the Widgets Board. |
| Personalization control | optional dialog | Per-feed customization dialog defined by the provider. |

## Notes

- Windows App SDK feed providers (`com.microsoft.windows.widgets.feeds` app extension), part of the same Widgets Board surface as [widget providers](./widget-providers.md) but a distinct registration/content model (feed content is fetched from `ContentUri`, not returned as Adaptive Cards by an `IWidgetProvider`).
- **Preview feature**, and currently available only to users in the European Economic Area (EEA); requires the latest Windows App SDK.
- Users can enable/disable individual feeds from Widgets Board settings.
- Implementation detail is split across separate how-to pages (C# / C++ WinRT implementation, manifest XML format) not duplicated here.

## Related

- [Widget providers](./widget-providers.md)
