# UIWindowScene

A scene that manages one or more windows for your app.

## Signature / Usage

```swift
@MainActor
class UIWindowScene : UIScene
```

Do not create `UIWindowScene` directly. The system creates it based on your app's `Info.plist` scene configuration or in response to `UIApplication.requestSceneSessionActivation(_:userActivity:options:errorHandler:)`.

```swift
// Accessed from UISceneDelegate
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene else { return }
    let window = UIWindow(windowScene: windowScene)
    window.rootViewController = MyViewController()
    window.makeKeyAndVisible()
    self.window = window
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `windows` | `[UIWindow]` | All windows associated with this scene |
| `keyWindow` | `UIWindow?` | The key window of this scene |
| `screen` | `UIScreen` | The screen displaying the scene's content |
| `traitCollection` | `UITraitCollection` | Current environment traits (size class, appearance, etc.) |
| `focusSystem` | `UIFocusSystem?` | The focus system for this window scene |
| `statusBarManager` | `UIStatusBarManager?` | Current status bar configuration |
| `titlebar` | `UITitlebar?` | Title bar for Mac Catalyst apps |
| `sizeRestrictions` | `UISceneSizeRestrictions?` | Minimum and maximum window size |
| `isFullScreen` | `Bool` | Whether the scene occupies the full screen |
| `effectiveGeometry` | `UIWindowScene.Geometry` | Current geometry in system space |

## Key Methods

```swift
// Request geometry changes (e.g., resize or reposition on Mac)
func requestGeometryUpdate(
    _ geometryPreferences: UIWindowScene.GeometryPreferences,
    errorHandler: ((Error) -> Void)?
)

// Create a display link tied to this scene's display
func displayLink(action: UIAction) -> CADisplayLink
```

## Notes

- iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.1+, tvOS 13.0+, visionOS 1.0+
- Conforms to `UITraitEnvironment`; observe trait changes using `registerForTraitChanges(_:handler:)`.
- `interfaceOrientation` is deprecated in iOS 16+; use `UIWindowScene.Geometry` or trait collections instead.
- Each window in the scene shares the scene's `traitCollection`.

## Related

- [UIWindow](./uiwindow.md)
- [UIResponder](./uiresponder.md)
