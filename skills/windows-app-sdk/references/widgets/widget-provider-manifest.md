# Widget provider package manifest

XML format for registering a Win32 widget provider in the app package manifest. Widget providers declare their registration inside a `uap3:AppExtension` with `Name="com.microsoft.windows.widgets"`.

## Signature / Usage

```xml
<uap3:Extension Category="windows.appExtension">
  <uap3:AppExtension Name="com.microsoft.windows.widgets" DisplayName="Widget Test App" Id="ContosoWidgetApp" PublicFolder="Public">
    <uap3:Properties>
      <WidgetProvider>
        <ProviderIcons>
          <Icon Path="Images\StoreIcon.png" />
        </ProviderIcons>
        <Activation>
          <!-- App exports COM interface which implements IWidgetProvider -->
          <CreateInstance ClassId="XXXXXXXX-XXXX-XXXX-XXXX-D3397A3FF15C" />
        </Activation>
        <Definitions>
          <Definition
            Id="Weather_Widget"
            DisplayName="Microsoft Weather Widget"
            Description="Weather Widget Description"
            AdditionalInfoUri="https://contoso.com/widgets/Weather"
            ExclusiveRegions="US,UK"
            AllowMultiple="true">
            <Capabilities>
              <Capability><Size Name="small" /></Capability>
              <Capability><Size Name="medium" /></Capability>
              <Capability><Size Name="large" /></Capability>
            </Capabilities>
            <ThemeResources>
              <Icons>
                <Icon Path="Assets\icon.png" />
              </Icons>
              <Screenshots>
                <Screenshot Path="Assets\background.png" DisplayAltText="For accessibility"/>
              </Screenshots>
            </ThemeResources>
          </Definition>
        </Definitions>
      </WidgetProvider>
    </uap3:Properties>
  </uap3:AppExtension>
</uap3:Extension>
```

## Options / Props

| Element / Attribute | Description |
|------|-------------|
| `WidgetProvider` | Root element of the widget provider registration. |
| `ProviderIcons` / `Icon` | Icons representing the widget provider app. |
| `Activation` > `CreateInstance ClassId` | Recommended activation type for Win32 providers implementing `IWidgetProvider`; system calls `CoCreateInstance` with the given CLSID. Takes precedence over `ActivateApplication` if both are specified. |
| `Activation` > `ActivateApplication` | Activates the provider via command line with base64url-encoded JSON arguments; `CreateInstance` is recommended instead. |
| `Definitions` > `Definition` | Registration for a single widget. Attributes: `Id` (required, unique), `DisplayName` (required), `Description` (required), `AllowMultiple` (default `true`), `IsCustomizable` (default `false`, Windows App SDK 1.4+, shows "Customize widget" menu item), `AdditionalInfoUri`, `ExcludedRegions` / `ExclusiveRegions` (mutually exclusive, comma-separated 2-char region codes), `WebRequestFilter` (match-pattern filter routed to `IWidgetResourceProvider.OnResourceRequested`). |
| `Capabilities` > `Capability` > `Size Name` | Supported widget sizes: `small`, `medium`, `large`. If no capabilities declared, defaults to `large`. |
| `ThemeResources` > `Icons` / `Screenshots` | Icon and screenshot images shown in the widget picker; optional `DarkMode` / `LightMode` children override per device theme. |

## Notes

- Only packaged Win32 apps can currently register as widget providers.
- `Definition.Id` is used by the widget provider implementation (via `WidgetContext.DefinitionId`) to determine which widget an operation targets.

## Related

- [IWidgetProvider](./iwidgetprovider.md)
- [implement-widget-provider](./implement-widget-provider.md)
