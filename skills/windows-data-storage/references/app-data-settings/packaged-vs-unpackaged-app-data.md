# Packaged vs unpackaged app data

How the app data store APIs differ between packaged (MSIX) apps and unpackaged apps.

## Signature / Usage

```csharp
// Packaged app — classic UWP/WinRT API works
var appData = Windows.Storage.ApplicationData.Current;

// Packaged app — Windows App SDK equivalent, works outside AppContainer too
var appData2 = Microsoft.Windows.Storage.ApplicationData.GetDefault();

// Unpackaged app — only the Windows App SDK API supports this
var appData3 = Microsoft.Windows.Storage.ApplicationData.GetForUnpackaged("Contoso", "MyApp");
```

## Options / Props

| App type | `Windows.Storage.ApplicationData` (UWP/WinRT) | `Microsoft.Windows.Storage.ApplicationData` (Windows App SDK) |
|----------|-----------------------------------------------|-----------------------------------------------------------------|
| Packaged (MSIX), running in AppContainer | Supported (`ApplicationData.Current`) | Supported (`GetDefault()`, equivalent to `Current`) |
| Packaged (MSIX), not in AppContainer | Not guaranteed | Supported (`GetDefault()`) |
| Unpackaged | Not supported — no access to system-managed data stores | Supported via `GetForUnpackaged(publisher, product)` |

## Notes

- The `ApplicationData` APIs described in the classic `Windows.Storage` namespace are designed for packaged apps. Unpackaged apps do not have access to the system-managed app data stores through that namespace and should use alternative storage (direct file I/O, registry) — or the Windows App SDK's `GetForUnpackaged`.
- `GetForUnpackaged(publisher, product)` gives an unpackaged app an isolated, per-app data store equivalent in shape (`LocalFolder`, `LocalSettings`, etc.) to what packaged apps get automatically, keyed by the publisher/product strings you supply.
- For packaged apps, `GetForPackageFamily(Package.Current.Id.FamilyName)` is equivalent to `GetDefault()`.

## Related

- [ApplicationData](./application-data.md)
- [Windows App SDK ApplicationData (Microsoft.Windows.Storage)](./windows-app-sdk-application-data.md)
