# Feed provider package manifest

XML format for registering a Win32 feed provider in the app package manifest. Feed providers declare their registration inside a `uap3:AppExtension` with `Name="com.microsoft.windows.widgets.feeds"`.

## Signature / Usage

```xml
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
            Icon="ms-appx:Images\ContosoFeedIcon.png"
            WebRequestFilter="https://contoso.com/*/feed/appResource/*"
            ExcludedRegions="FR,DE,IT">
        </Definition>
      </Definitions>
    </FeedProvider>
  </uap3:Properties>
</uap3:AppExtension>
```

## Options / Props

| Element / Attribute | Description |
|------|-------------|
| `FeedProvider` | Root element of the feed provider registration. Attributes: `Description` (required), `DisplayName` (required), `Icon` (required, package-relative path), `Id` (required, unique). |
| `Activation` > `CreateInstance ClassId` | Activation type for Win32 providers implementing `IFeedProvider`; system calls `CoCreateInstance` with the given CLSID. |
| `Definitions` > `Definition` | Registration for a single feed. Attributes: `Id` (required, unique), `DisplayName` (required), `Description` (required), `ContentUri` (required, the URI feed content is retrieved from), `Icon` (required), `WebRequestFilter` (optional match-pattern filter routed to `IFeedResourceProvider.OnResourceRequested`, Punycode where necessary), `ExcludedRegions` / `ExclusiveRegions` (mutually exclusive, comma-separated 2-char region codes). |

## Notes

- Structurally parallel to the widget provider manifest (`widget-provider-manifest`), but a distinct `AppExtension` name (`com.microsoft.windows.widgets.feeds` vs `com.microsoft.windows.widgets`) and root element (`FeedProvider` vs `WidgetProvider`).
- UI-facing string attributes can use `ms-resource:` localized references instead of literals.
- The feed providers feature is in preview and, per the official docs, is available only to users in the European Economic Area (EEA).

## Related

- [IFeedProvider](./ifeedprovider.md)
- [implement-feed-provider](./implement-feed-provider.md)
- [widget-provider-manifest](./widget-provider-manifest.md)
