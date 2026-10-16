# Transitioning to the UIKit Scene-Based Life Cycle

Adopt the scene-based life cycle to replace the app delegate life cycle in UIKit. Required for apps built with the iOS 27 SDK.

## Signature / Usage

Scene manifest in the information property list:

```xml
<key>UIApplicationSceneManifest</key>
<dict>
    <key>UIApplicationSupportsMultipleScenes</key>
    <false/>
    <key>UISceneConfigurations</key>
    <dict>
        <key>UIWindowSceneSessionRoleApplication</key>
        <array>
            <dict>
                <key>UISceneConfigurationName</key>
                <string>Default Configuration</string>
                <key>UISceneDelegateClassName</key>
                <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
                <key>UISceneStoryboardFile</key>
                <string>Main</string>
            </dict>
        </array>
    </dict>
</dict>
```

Dynamic scene configuration from the app delegate (`application(_:configurationForConnecting:options:)`):

```swift
@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        configurationForConnecting connectingSceneSession: UISceneSession,
        options: UIScene.ConnectionOptions
    ) -> UISceneConfiguration {

        // Each `UISceneConfiguration` must have a unique configuration name
        // that corresponds to an entry in the information property list scene manifest.
        let configurationName: String

        switch options.userActivities.first?.activityType {
        case UserActivity.GalleryOpenInspectorActivityType:
            // Create a photo inspector window scene.
            configurationName = "Inspector Configuration"
        default:
            // Create a default gallery window scene.
            configurationName = "Default Configuration"
        }

        return UISceneConfiguration(
            name: configurationName,
            sessionRole: connectingSceneSession.role
        )
    }
}
```

Programmatic root view controller in the scene delegate:

```swift
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        guard let windowScene = scene as? UIWindowScene else { return }

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = YourRootViewController()
        window?.makeKeyAndVisible()
    }
}
```

## Notes

- Required: beginning in iOS 27, iPadOS 27, Mac Catalyst 27, tvOS 27, and visionOS 27, apps built with the latest SDK must adopt the scene-based life cycle or they fail to launch.
- iOS 18.4 / iPadOS 18.4 / Mac Catalyst 18.4 / tvOS 18.4 / visionOS 2.4 log for unmigrated apps: `This process does not adopt UIScene lifecycle.` / `This will become an assert in a future version.`
- iOS 26 / iPadOS 26 / Mac Catalyst 26 / tvOS 26 / visionOS 26 log: `UIScene lifecycle will soon be required.` / `Failure to adopt will result in an assert in the future.`
- Migrate if the `UIApplicationSceneManifest` key is missing from the information property list or has no specified configurations, or if the app delegate does not implement `application(_:configurationForConnecting:options:)`.
- Specify `UIWindowScene` objects rather than `UIScene` objects in the configuration. For CarPlay scenes use `CPTemplateApplicationScene` instead.
- Storyboard root view controller: include the storyboard name in `UISceneConfigurations`; the system configures the window scene and root view controller automatically. Programmatic root: implement `scene(_:willConnectTo:options:)`.
- Multiple scenes are optional and may require a scene-specific data model. To enable, set `UIApplicationSupportsMultipleScenes` to `true` and give each `UISceneConfiguration` a unique configuration name.
- Move life-cycle logic from `UIApplicationDelegate` to `UISceneDelegate`:

| UIApplicationDelegate | UISceneDelegate |
|-----------------------|-----------------|
| `applicationDidBecomeActive(_:)` | `sceneDidBecomeActive(_:)` |
| `applicationWillResignActive(_:)` | `sceneWillResignActive(_:)` |
| `applicationDidEnterBackground(_:)` | `sceneDidEnterBackground(_:)` |
| `applicationWillEnterForeground(_:)` | `sceneWillEnterForeground(_:)` |

- Once the app adopts scenes, UIKit no longer calls the `UIApplicationDelegate` methods above, even if still implemented. Each scene delegate method reflects only that scene's transitions. To track aggregate app state (`UIApplication.applicationState`), use the corresponding `UIApplication` notification, for example `UIApplication.willEnterForegroundNotification`.
- After migrating, test in Full Screen Apps, Windowed Apps, and Stage Manager on iPad.
- External display: in iOS 26 and earlier the system connected a `windowExternalDisplayNonInteractive` scene automatically. Beginning in iOS 27 the app receives this scene only after it registers a scene accessory. Remove role-specific logic in `configurationForConnecting` / the scene delegate and register a scene accessory instead (see `uisceneaccessory.md`). The content spans the full screen.
- Source: https://developer.apple.com/documentation/uikit/transitioning-to-the-uikit-scene-based-life-cycle

## Related

- [UIWindowScene](./uiwindowscene.md)
- [UIWindow](./uiwindow.md)
- [UISceneAccessory](./uisceneaccessory.md)
