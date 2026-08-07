# Microsoft Copilot hardware key provider

Lets a packaged app register to appear in the picker UI shown when the user presses the Microsoft Copilot hardware key (or Windows key + C), so the app can be launched instead of Search.

## Signature / Usage

```xml
<Package
  xmlns:uap3="http://schemas.microsoft.com/appx/manifest/uap/windows10/3">
  <Applications>
    <Application>
      <Extensions>
        <uap3:Extension Category="windows.appExtension">
          <uap3:AppExtension Name="com.microsoft.windows.copilotkeyprovider"
              Id="MyAppId"
              DisplayName="App display name"
              Description="App description"
              PublicFolder="Public" />
        </uap3:Extension>
      </Extensions>
    </Application>
  </Applications>
</Package>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uap3:AppExtension Name="com.microsoft.windows.copilotkeyprovider"` | manifest extension | Required extension name for registering as a Copilot hardware key provider; declared inside `uap3:Extension Category="windows.appExtension"`. |
| `Id` | attribute (required) | App-defined identifier for the app. |
| `DisplayName` | attribute (required) | App name shown in the Copilot hardware button picker UI. |
| `Description` | attribute (required) | App description shown in the picker UI. |
| `PublicFolder` | attribute (required) | Folder the app declares as read-accessible to a host broker. |
| `HKCU\Software\Microsoft\Windows\Shell\BrandedKey\BrandedKeyChoiceType` | registry key | Current target of the Copilot key/Windows key+C: `"Search"`, `"App"`, or `"AppEnforcedByPolicy"` (IT-admin policy). |
| `HKCU\Software\Microsoft\Windows\Shell\BrandedKey\AppAumid` | registry key | AUMID of the last-configured Copilot hardware key provider app, even if currently set to Search. |

## Notes

- Registration lives in the package manifest via `uap3:AppExtension`/`uap3:Extension` (the `Windows.ApplicationModel` app-package manifest schema), the same extension mechanism used by other app-extension-based providers in this category.
- Available starting with Windows Build 22621; the provider app must be packaged (has package identity) and code-signed.
- Recommended that Copilot hardware key provider apps are implemented as single-window apps.
- Apps should respect the user's existing selection and avoid persistent/noisy prompts asking users to change it.

## Related

- [Default apps platform](./default-apps-platform.md)
- [Launcher](./launcher.md)
