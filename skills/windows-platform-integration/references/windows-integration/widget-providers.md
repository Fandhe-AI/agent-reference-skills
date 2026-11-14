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
| `IWidgetProvider` + `WidgetManager` | capability | Widget lifecycle and Adaptive Card updates. Windows App SDK 1.2. |
| `IWidgetProvider2` + manifest `IsCustomizable` attribute | capability | User customization. Windows App SDK 1.4. |
| Web widget providers, `IWidgetResourceProvider`, `IWidgetProviderMessage`, `WidgetManager.SendMessageToContent` | capability | Web content, resource requests, and messaging. Windows App SDK 1.6.3; also check the web-widget host and regional requirements. |
| `WidgetUpdateRequestOptions.IsPlaceholderContent` | capability | Indicates content that isn't yet personalized or actionable. Windows App SDK 1.6.6. |
| `IWidgetProviderAnalytics` | capability | Widget analytics callbacks. The Windows Widgets Board supports these callbacks starting with Windows 11 build 26900; other hosts must also support the interface (see the API remarks). |
| Widget header customization | feature | Providers can customize the widget's header area; see the dedicated `widget-header-customization` page. |

## Notes

- `Microsoft.Windows.Widgets.Providers` (Windows App SDK). These are Windows Widgets Board widgets rendered from Adaptive Cards, distinct from Android's Glance app widgets (`androidx.glance`, compiled to `RemoteViews`) and from the People Widget (`cross-device-people-api.md`).
- Only packaged Win32 desktop apps and PWAs can currently implement a widget provider.
- For design guidance (not implementation), see the "Windows widgets" design guide rather than this developer-facing overview.
- The base `IWidgetProvider` interface remains required when you add the optional interfaces above (customization, web content). The SDK versions in the capability rows identify when an API became available, not which release to install; use a currently supported stable Windows App SDK release and test on your target device and widget host. The PWA service-worker API is a separate implementation path from the desktop provider APIs.
- The widget host can activate and release a provider independently of the lifetime of pinned widgets. Restore widget state when the provider starts, and do not retain callback argument objects after an `IWidgetProvider` callback returns.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/widgets/widget-providers (ms.date 2026-10-23; fetched 2026-11-14). The capability table and lifetime guidance were added from this revision; the manifest snippet above is retained from the earlier fetch (2026-10-16).
- A walkthrough is also available as the *Tabs vs Spaces* episode "Create Widgets for Windows 11".

## Related

- [Dashboards and feed providers](./feed-providers.md)
