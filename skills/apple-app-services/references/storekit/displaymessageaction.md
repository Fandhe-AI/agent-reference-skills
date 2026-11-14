# DisplayMessageAction

An instance that asks StoreKit to display an App Store message, if appropriate.

## Signature / Usage

```swift
@MainActor struct DisplayMessageAction
```

Adapted (not in the official docs): trimmed from the official example to a minimal listener that displays each message immediately; the official example is longer and leaves a local variable uninitialized.

```swift
import SwiftUI
import StoreKit

struct MessageListenerView: View {
    @Environment(\.displayStoreKitMessage) private var displayStoreMessage

    var body: some View {
        Text("Hello World")
            .task {
                for await message in StoreKit.Message.messages {
                    // Decide here whether to display now, defer, or suppress the message.
                    try? displayStoreMessage(message)
                }
            }
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `callAsFunction(_:)` | `@MainActor func callAsFunction(_ message: Message) throws` | Tells StoreKit to display the App Store message, if appropriate |
| `EnvironmentValues.displayStoreKitMessage` | environment value | Provides an instance of this structure |

## Notes

- Available iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, visionOS 1.0+. Not listed for macOS, tvOS or watchOS.
- Conforms to `Sendable` and `SendableMetatype`.
- StoreKit retrieves App Store messages at each app launch and presents them by default. Listen to `Message.messages` to delay or suppress them, then call the instance to display a deferred message. StoreKit displays a message only if it is still pending; it does not display expired messages.
- Don't call `callAsFunction(_:)` directly; call the instance obtained from the `displayStoreKitMessage` environment value.
- For apps built on `UIWindowScene` instead of SwiftUI views, use `Message.display(in:)`.
- Source: https://developer.apple.com/documentation/storekit/displaymessageaction (fetched 2026-11-14)

## Related

- [Message](./message.md)
- [AppStore](./appstore.md)
