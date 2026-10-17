---
source: https://developer.apple.com/documentation/appintents/directing-app-intents-to-your-apps-scenes
---

# Direct App Intents to Your App's Scenes

Adopt `TargetContentProvidingIntent` so the system routes an intent to the matching scene, then update that scene's view.

```swift
struct ShowBrowserAppIntent: AppIntent, TargetContentProvidingIntent {
    @Parameter var item : ItemEntity
    
    var contentIdentifier: String { "ShowBrowser:\(item.id.uuidString)" }

    //...
}

struct BrowserView: View {
    @State private var item: ItemEntity
    
    init(item: ItemEntity) {
        self.item = item
    }
    
    var body: some View {
        VStack {
            Text("The item's name is: \(item.title)")
        }
        .padding()
        .handlesExternalEvents(preferring: (["ShowBrowser:" + item.id.uuidString]), allowing: ["*"])
        .onAppIntentExecution(ShowSceneAppIntent.self) { intent in
            self.item = intent.item
        }
    }
}
```

## Notes

- Source article: "Directing app intents to your app's scenes" (https://developer.apple.com/documentation/appintents/directing-app-intents-to-your-apps-scenes).
- Target OS: `TargetContentProvidingIntent` availability is on references/system-integration/targetcontentprovidingintent.md (SDK 27.0, Xcode 27.0).
- The `contentIdentifier` string must match what `.handlesExternalEvents(preferring:allowing:)` prefers so the system picks the intended scene.
- The article's last listing passes `ShowSceneAppIntent.self` to `onAppIntentExecution` while the intent above is named `ShowBrowserAppIntent`; the listing is reproduced verbatim, so use your intent type there. UIKit scenes use `UISceneAppIntent` / `AppIntentSceneDelegate` (iOS / iPadOS / Mac Catalyst / tvOS / visionOS 26.0+; not available in native AppKit). The article covers only SwiftUI and UIKit scenes.
