---
source: https://developer.apple.com/documentation/appintents/launching-your-voice-based-conversational-app-from-the-side-button-of-iphone
---

# Launch a Voice-Based Conversational App from the Side Button

Adopt the `.assistant.activate` app intent schema so people in Japan can launch your voice-based conversational app from the iPhone side button.

```swift
@AppIntent(schema: .assistant.activate)
struct ActivateVoiceBasedConversationSceneIntent {
    static let supportedModes: IntentModes = .foreground

    func perform() async throws -> some IntentResult {

        // Add code here to navigate to the scene in your app that provides
        // voice-based conversational functionality.
        // If applicable, pass information to your app that allows it to update
        // its data or UI in response to the invocation from
        // the side button and start voice-based conversational functionality.

        return .result()
    }
}
```

## Notes

- Source article: "Launching your voice-based conversational app from the side button of iPhone" (https://developer.apple.com/documentation/appintents/launching-your-voice-based-conversational-app-from-the-side-button-of-iphone). The article does not state an OS version; the API is available only on iPhone in Japan.
- Requires the `com.apple.developer.side-button-access.allow` entitlement in the app's `.entitlements` file. For production devices the Apple Account country or region must be Japan and the device must physically be in Japan; during development, install the provisioning profile on the test device.
- Start an audio session (for example with AVFoundation) in `perform()` so the conversation is immediately usable after launch.
- `IntentModes` is iOS 26.0+ (see references/intents/intentmodes.md); the Assistant schema domain is in references/app-schemas/domain-assistant.md.
