# Widget providers

Windows widgets are small UI containers, populated with Adaptive Cards JSON, that a Win32 desktop app or PWA can supply by implementing a widget service provider that responds to requests from the Widgets Board.

## Signature / Usage

```xml
<!-- package.appxmanifest: register the widget provider app extension -->
<uap3:Extension Category="windows.appExtension">
  <uap3:AppExtension Name="com.microsoft.windows.widgets" DisplayName="Widget Test App" Id="ContosoWidgetApp" PublicFolder="Public">
    <uap3:Properties>
      <WidgetProvider>
        <Activation>
          <!-- App exports a COM interface implementing IWidgetProvider -->
          <CreateInstance ClassId="XXXXXXXX-XXXX-XXXX-XXXX-D3397A3FF15C" />
        </Activation>
        <Definitions>
          <Definition Id="Weather_Widget" DisplayName="Microsoft Weather Widget"
              Description="Weather Widget Description" AllowMultiple="true">
            <Capabilities>
              <Capability><Size Name="medium" /></Capability>
            </Capabilities>
          </Definition>
        </Definitions>
      </WidgetProvider>
    </uap3:Properties>
  </uap3:AppExtension>
</uap3:Extension>
```

Implementation paths (each covered by its own how-to, not duplicated here): Win32 app (C#) — `implement-widget-provider-cs`; Win32 app (C++/WinRT) — `implement-widget-provider-win32`; PWA-driven widgets — Microsoft Edge "Build PWA-driven widgets" guide; Web widget providers — `web-widget-providers`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Microsoft.Windows.Widgets.Providers` | namespace | Windows App SDK namespace containing the widget provider API surface (`IWidgetProvider`, request/args types). |
| `uap3:AppExtension Name="com.microsoft.windows.widgets"` | manifest extension | Required app-extension name for registering a Win32 widget provider; registration content goes in the nested `uap3:Properties` > `WidgetProvider` element. |
| `WidgetProvider` / `Definitions` / `Definition` | manifest element | Root registration element and per-widget definitions (`Id`, `DisplayName`, `Description`, supported `Size`s: small/medium/large). |
| Adaptive Cards | data format | The widget's visual template and bound data are both expressed as Adaptive Cards JSON, returned by the provider in response to Widgets Board requests. |
| Widget header customization | feature | Providers can customize the widget's header area; see the dedicated `widget-header-customization` page. |

## Notes

- `Microsoft.Windows.Widgets.Providers` (Windows App SDK). These are Windows Widgets Board widgets rendered from Adaptive Cards, distinct from Android's Glance app widgets (`androidx.glance`, compiled to `RemoteViews`) and from the People Widget (`cross-device-people-api.md`).
- Only packaged Win32 desktop apps and PWAs can currently implement a widget provider.
- For design guidance (not implementation), see the "Windows widgets" design guide rather than this developer-facing overview.
- A walkthrough is also available as the *Tabs vs Spaces* episode "Create Widgets for Windows 11".

## Related

- [Dashboards and feed providers](./feed-providers.md)
