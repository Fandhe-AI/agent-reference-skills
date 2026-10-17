---
source: https://docs.flutter.dev/ai/ai-toolkit
---

# Flutter AI Toolkit

A set of AI chat-related widgets that make it easy to add an AI chat window to a Flutter app, organized around an abstract LLM provider API. Firebase AI Logic is supported out of the box.

## Signature / Usage

Dependencies in `pubspec.yaml`:

```yaml
dependencies:
  flutter_ai_toolkit: ^latest_version
  firebase_ai: ^latest_version
  firebase_core: ^latest_version
```

Initialize Firebase:

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_ai/firebase_ai.dart';
import 'package:flutter_ai_toolkit/flutter_ai_toolkit.dart';

// ... other imports

import 'firebase_options.dart'; // from `flutterfire config`

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const App());
}

// ...app stuff here
```

Create the chat view with the Firebase provider (Gemini Developer API endpoint for prototyping):

```dart
class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text(App.title)),
        // create the chat view, passing in the Firebase provider
        body: LlmChatView(
          provider: FirebaseProvider(
            // Use the Google AI endpoint
            model: FirebaseAI.googleAI().generativeModel(
              model: 'gemini-2.5-flash',
            ),
          ),
        ),
      );
}
```

For production, swap in the Firebase AI Logic production endpoint:

```dart
model: FirebaseAI.vertexAI().generativeModel(
  model: 'gemini-2.5-flash',
),
```

## Options / Props

Key features:

| Feature | Description |
| --- | --- |
| Multiturn chat | Maintains context across multiple interactions |
| Streaming responses | Displays AI responses in real-time as they are generated |
| Rich text display | Supports formatted text in chat messages |
| Voice input | Input prompts using speech |
| Multimedia attachments | Send and receive various media types |
| Function calling | Supports tool calls to the LLM provider |
| Custom styling | Extensive customization to match the app's design |
| Chat serialization/deserialization | Store and retrieve conversations between app sessions |
| Custom response widgets | Specialized UI components to present LLM responses |
| Pluggable LLM support | Implement a simple interface to plug in your own LLM |
| Cross-platform support | Android, iOS, web, and macOS |

Device permissions:

| Need | Setup |
| --- | --- |
| Network (macOS) | Add `com.apple.security.network.client` = `<true/>` to `*.entitlements` |
| Network (Android) | `<uses-permission android:name="android.permission.INTERNET"/>` in `AndroidManifest.xml` |
| Microphone | Follow the `record` package's permission setup |
| File selection | Follow the `file_selector` plugin's instructions |
| Image selection | Follow the `image_picker` plugin's installation instructions |
| Web photo | Follow the `camera` plugin's setup instructions |

## Notes

- Both the Gemini Developer API (prototyping) and the Firebase AI Logic production endpoint require a Firebase project and an initialized `firebase_core`; use the `flutterfire CLI` tool to add the project to the app. The `FirebaseProvider` takes a model name but no API key; the key is handled by the Firebase project.
- If the app calls Gemini APIs directly from the client, do not commit `firebase_options.dart` to a public repository: anyone could reuse the app configuration to send requests to the AI endpoint, consuming quota and potentially causing billing costs. For production apps, route AI requests through a backend service (for example Cloud Functions for Firebase, Cloud Run, or your own server); in that setup including `firebase_options.dart` in the repository is safe. Review the Firebase security checklist.
- The values in `firebase_options.dart` ship inside the client app and can be extracted from any distributed build, so keeping the file private is not an access control by itself; protect the AI endpoint with Firebase App Check enforcement and/or a backend that authenticates and authorizes requests.
- The `ChatPage` snippet above is abbreviated: it creates a new `FirebaseProvider` on every `build`, so a rebuild replaces the provider and drops the chat history. In a real app, create the provider once (for example in `State.initState` of a `StatefulWidget`) and keep it across rebuilds.
- To use the Firebase AI Logic example app, put the Firebase configuration into `example/lib/firebase_options.dart` using `flutterfire CLI` from within the `example` directory.
- Source repository and demo: https://github.com/flutter/ai (demo at `example/lib/demo/demo.dart`; Gemini and Vertex examples at `example/lib/gemini/gemini.dart` and `example/lib/vertex/vertex.dart`).
- Distinction: `LlmChatView` / `LlmProvider` are Flutter widgets and a Dart interface in `flutter_ai_toolkit`; this is not an LLM client SDK like openai-api-core or anthropic-api-core, nor an agent framework like openai-agents.

## Related

- [User experience](./ai-toolkit-user-experience.md)
- [Feature integration](./ai-toolkit-feature-integration.md)
- [Custom LLM providers](./ai-toolkit-custom-llm-providers.md)
