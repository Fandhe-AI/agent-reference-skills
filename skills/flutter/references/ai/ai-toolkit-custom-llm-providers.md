---
source: https://docs.flutter.dev/ai/ai-toolkit/custom-llm-providers
---

# Custom LLM providers

The protocol connecting an LLM and the `LlmChatView` is the `LlmProvider` interface. Any LLM or LLM-like endpoint (cloud or local, proprietary or open source) that can implement it can be plugged into the chat view.

## Signature / Usage

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(String prompt, {Iterable<Attachment> attachments});
  Stream<String> sendMessageStream(String prompt, {Iterable<Attachment> attachments});
  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

A provider that takes the underlying model as a constructor parameter and keeps history, notifying listeners:

```dart
class MyLlmProvider extends LlmProvider with ChangeNotifier {
  @immutable
  MyLlmProvider({
    required GenerativeModel model,
    Iterable<ChatMessage>? history,
    ...
  })  : _model = model,
        _history = history?.toList() ?? [],
        ... { ... }

  final GenerativeModel _model;
  final List<ChatMessage> _history;
  ...

  @override
  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments = const [],
  }) async* {
    final userMessage = ChatMessage.user(prompt, attachments);
    final llmMessage = ChatMessage.llm();
    _history.addAll([userMessage, llmMessage]);

    final response = _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: _chat!.sendMessageStream,
    );

    yield* response.map((chunk) {
      llmMessage.append(chunk);
      return chunk;
    });

    notifyListeners();
  }

  @override
  Iterable<ChatMessage> get history => _history;

  @override
  set history(Iterable<ChatMessage> history) {
    _history.clear();
    _history.addAll(history);
    _chat = _startChat(history);
    notifyListeners();
  }

  ...
}
```

Mapping messages and attachments to the underlying LLM:

```dart
import 'package:firebase_ai/firebase_ai.dart';
...

class MyLlmProvider extends LlmProvider with ChangeNotifier {
  ...
  static Part _partFrom(Attachment attachment) => switch (attachment) {
        (final FileAttachment a) => DataPart(a.mimeType, a.bytes),
        (final LinkAttachment a) => FilePart(a.url),
      };

  static Content _contentFrom(ChatMessage message) => Content(
        message.origin.isUser ? 'user' : 'model',
        [
          TextPart(message.text ?? ''),
          ...message.attachments.map(_partFrom),
        ],
      );
}
```

Calling the LLM:

```dart
@override
Stream<String> generateStream(
  String prompt, {
  Iterable<Attachment> attachments = const [],
}) =>
    _generateStream(
      prompt: prompt,
      attachments: attachments,
      contentStreamGenerator: (c) => _model.generateContentStream([c]),
    );

Stream<String> _generateStream({
  required String prompt,
  required Iterable<Attachment> attachments,
  required Stream<GenerateContentResponse> Function(Content)
      contentStreamGenerator,
}) async* {
  final content = Content('user', [
    TextPart(prompt),
    ...attachments.map(_partFrom),
  ]);

  final response = contentStreamGenerator(content);
  yield* response
      .map((chunk) => chunk.text)
      .where((text) => text != null)
      .cast<String>();
}
```

## Options / Props

Implementation checklist:

| Concern | Guidance |
| --- | --- |
| Configuration | Let the user create the underlying model and pass it in as a parameter so all configuration knobs stay available |
| History | Allow history to be manipulated directly, notify listeners as it changes, and accept history in the constructor to support serialization and changing provider parameters |
| Messages and attachments | Map the standard `ChatMessage` from the `LlmProvider` type to whatever the underlying LLM handles (Firebase maps to `Content`) |
| Calling the LLM | Implement `generateStream` and `sendMessageStream` according to the protocol the LLM exposes |

Providers shipped with the AI Toolkit: the Firebase AI Logic provider (`FirebaseProvider`, wraps `firebase_ai`) and the Echo provider (`EchoProvider`, a minimal example that formats the prompt and attachments as Markdown).

## Notes

- A custom provider manages the history for a single chat session with the underlying LLM; as the history changes the underlying chat is either kept up to date automatically or manually recreated (the Firebase provider recreates it whenever history is set manually).
- `ChangeNotifier` implements the `Listenable` requirement of `LlmProvider`.
- Example sources: the Echo provider at `lib/src/providers/implementations/echo_provider.dart` in https://github.com/flutter/ai and the `FirebaseProvider` class reference.
- The source page's navigation lists a next page, "Chat client sample", which is not part of this reference.

## Related

- [Feature integration](./ai-toolkit-feature-integration.md)
- [Flutter AI Toolkit](./ai-toolkit.md)
