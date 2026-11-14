# Migrate an iOS app to WinUI 3

Concept mapping from UIKit / SwiftUI to WinUI 3, intended as context for an AI coding agent. Providing exact API mappings up front produces more accurate output than asking for a generic conversion.

## Signature / Usage

```powershell
gh copilot plugin install winui@awesome-copilot
```

Starter prompt:

```text
I'm migrating an iOS app to WinUI 3 using the Windows App SDK.

The app is written in [Swift / Objective-C] using [UIKit / SwiftUI].

Apply these mappings:
- UIViewController → Page, navigated via Frame
- UINavigationController → Frame + NavigationView
- UITableView → ListView with ObservableCollection<T>
- UIAlertController → ContentDialog (parented to XamlRoot)
- NSUserDefaults → ApplicationData.Current.LocalSettings
- URLSession → System.Net.Http.HttpClient
- DispatchQueue.main.async → DispatcherQueue.TryEnqueue
- @State / @Binding → INotifyPropertyChanged via CommunityToolkit.Mvvm

Use Microsoft.UI.Xaml.* namespaces throughout — never Windows.UI.Xaml.*.
Generate C# — not Swift.
```

## Options / Props

### Concept mapping

| iOS (UIKit / SwiftUI) | WinUI 3 equivalent | Notes |
| --- | --- | --- |
| `UIViewController` | `Page` | WinUI pages are navigated via `Frame` |
| `UINavigationController` | `Frame` + `NavigationView` | Use `Frame.Navigate()` for page transitions |
| `UITabBarController` | `NavigationView` (top or left tabs) |  |
| `UITableView` | `ListView` | Use `ObservableCollection<T>` for data binding |
| `UICollectionView` | `GridView` |  |
| `UIAlertController` | `ContentDialog` | Must be parented to the current `XamlRoot` |
| `UILabel` | `TextBlock` |  |
| `UITextField` | `TextBox` |  |
| `UIButton` | `Button` |  |
| `UIImageView` | `Image` |  |
| `UIStackView` | `StackPanel` | Set `Orientation` to `Horizontal` or `Vertical` |
| `Auto Layout` | `Grid` / `StackPanel` / `RelativePanel` | XAML layout is row/column based |
| `@State` / `@Binding` (SwiftUI) | `INotifyPropertyChanged` / `ObservableProperty` (CommunityToolkit.Mvvm) |  |
| `NSUserDefaults` | `ApplicationData.Current.LocalSettings` |  |
| `URLSession` | `HttpClient` | Use `System.Net.Http.HttpClient` |
| `NotificationCenter` | Events or `WeakReferenceMessenger` (CommunityToolkit.Mvvm) |  |
| `DispatchQueue.main.async` | `DispatcherQueue.TryEnqueue` |  |
| `AppDelegate.applicationDidFinishLaunching` | `App.OnLaunched` |  |
| `SceneDelegate` / `windowScene` | `MainWindow` / `AppWindow` |  |
| `FileManager` | `StorageFolder` / `StorageFile` |  |
| `UserNotifications` | `AppNotificationManager` (Microsoft.Windows.AppNotifications) |  |

### What doesn't map directly

- **In-app purchases**: Use the [Microsoft Store commerce APIs](https://learn.microsoft.com/en-us/windows/uwp/monetize/) via `Windows.Services.Store`
- **Push notifications (APNs)**: Use [Windows Push Notification Services (WNS)](https://learn.microsoft.com/en-us/windows/apps/develop/notifications/push-notifications/wns-overview)
- **HealthKit / ARKit / CoreML**: Windows has related technology areas — [Windows ML](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/overview), [Windows Mixed Reality](https://learn.microsoft.com/en-us/windows/mixed-reality/), and [Windows Sensors](https://learn.microsoft.com/en-us/windows/uwp/devices-sensors/sensors) — but these are not direct equivalents and require platform-specific implementation
- **App Clips**: No direct equivalent — consider [web-to-app linking](https://learn.microsoft.com/en-us/windows/uwp/launch-resume/web-to-app-linking)

## Notes

- This page maps iOS concepts to WinUI 3 (`Microsoft.UI.Xaml.*`); `UIButton` / `UIStackView` / `UITableView` rows are distinct from the WPF (`System.Windows.Controls.*`) and WinForms controls covered in the wpf-winforms-interop category.
- The `Windows.Services.Store` and `ApplicationData.Current.LocalSettings` rows reference WinRT APIs; `ApplicationData.Current` requires a packaged app (package identity), which is not stated on the source page.
- The mapping table and starter prompt are verbatim from the source (the unlabeled prompt fence is tagged `text`; relative links were expanded to full URLs).
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ai-assisted/migrate/ios-to-winui (en-us, fetched 2026-11-14). Source page `ms.date` 2026-05-13.

## Related

- [Cross-framework app considerations](./cross-framework.md)
- [Choose your migration path](./migration-decision-guide.md)
