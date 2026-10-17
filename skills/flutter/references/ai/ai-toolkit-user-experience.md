---
source: https://docs.flutter.dev/ai/ai-toolkit/user-experience
---

# User experience

The `LlmChatView` widget is the entry point for the interactive chat experience of the AI Toolkit. Hosting it enables a set of user experience features that need no additional code.

## Signature / Usage

```dart
LlmChatView(
  provider: FirebaseProvider(
    model: FirebaseAI.googleAI().generativeModel(
      model: 'gemini-2.5-flash',
    ),
  ),
)
```

(Constructed as in the AI Toolkit overview page; the style of the chat view is set with the `style` parameter, see Feature integration.)

## Options / Props

| Feature | Behavior |
| --- | --- |
| Multiline text input | Submit: Mobile taps the Submit button; Web and Desktop press Enter or tap Submit. Newline: Mobile taps Return on the virtual keyboard; Web and Desktop press `Shift+Enter`. Pasted text with newlines works as normal |
| Voice input | Mic button (visible when no text has been entered) starts recording; Stop translates the voice into text that can be edited and submitted |
| Multimedia input | Plus button offers Take Photo, Image Gallery, Attach File, Attach Link; selections become attachment thumbnails that can be removed with the X button |
| Image zoom | Tap a thumbnail to zoom; Esc or tapping outside dismisses |
| Copy to clipboard | Select text (desktop/web), hover Copy button, or long-tap and choose Copy on mobile |
| Message editing | Edit button (desktop) or long-tap (mobile) on the most recent prompt enters Editing mode: the last prompt and last LLM response are removed from history and the prompt text is placed in the field; X near the Editing indicator cancels and restores the previous response |
| Material and Cupertino | Uses Material facilities such as `TextField` when hosted in a Material app and Cupertino facilities such as `CupertinoTextField` when hosted in a Cupertino app |

## Notes

- The chat view supports both Material and Cupertino app types but does not automatically adopt the associated themes; theming is set by the `style` property of `LlmChatView` (see Custom styling in Feature integration).
- Source API links: `LlmChatView` at `https://pub.dev/documentation/flutter_ai_toolkit/latest/flutter_ai_toolkit/LlmChatView-class.html`.
- Distinction: Material/Cupertino here refer to Flutter's design widget libraries, not Compose Material3 (android-compose-components) or SwiftUI / UIKit (apple-swiftui, apple-uikit).

## Related

- [Flutter AI Toolkit](./ai-toolkit.md)
- [Feature integration](./ai-toolkit-feature-integration.md)
