---
source: https://docs.flutter.dev/ai/ai-toolkit/feature-integration
---

# Feature integration

Integration points of `LlmChatView` that let an app blend with other features: welcome messages, suggested prompts, system instructions, function calling, disabling attachments and audio, custom speech-to-text, cancel/error behavior, history, serialization, custom response widgets, styling, chat without UI, and prompt rerouting.

## Signature / Usage

Welcome message and suggested prompts:

```dart
LlmChatView(
  welcomeMessage: 'Hello and welcome to the Flutter AI Toolkit!',
  suggestions: [
    'I\'m a Star Wars fan. What should I wear for Halloween?',
    'I\'m allergic to peanuts. What candy should I avoid at Halloween?',
    'What\'s the difference between a pumpkin and a squash?',
  ],
  provider: FirebaseProvider(
    model: FirebaseAI.geminiAI().generativeModel(
      model: 'gemini-2.5-flash',
    ),
  ),
)
```

Disable attachments and voice notes (both default to `true`):

```dart
LlmChatView(
  // ...
  enableAttachments: false,
  enableVoiceNotes: false,
),
```

History (the `LlmProvider` interface exposes `history`):

```dart
abstract class LlmProvider implements Listenable {
  Stream<String> generateStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Stream<String> sendMessageStream(
    String prompt, {
    Iterable<Attachment> attachments,
  });

  Iterable<ChatMessage> get history;
  set history(Iterable<ChatMessage> history);
}
```

```dart
void _clearHistory() => _provider.history = [];
```

Serialization and deserialization:

```dart
Future<void> _saveHistory() async {
  // get the latest history
  final history = _provider.history.toList();

  // write the new messages
  for (var i = 0; i != history.length; ++i) {
    // skip if the file already exists
    final file = await _messageFile(i);
    if (file.existsSync()) continue;

    // write the new message to disk
    final map = history[i].toJson();
    final json = JsonEncoder.withIndent('  ').convert(map);
    await file.writeAsString(json);
  }
}

Future<void> _loadHistory() async {
  // read the history from disk
  final history = <ChatMessage>[];
  for (var i = 0;; ++i) {
    final file = await _messageFile(i);
    if (!file.existsSync()) break;

    final map = jsonDecode(await file.readAsString());
    history.add(ChatMessage.fromJson(map));
  }

  // set the history on the controller
  _provider.history = history;
}
```

Custom response widgets, styling, and speech-to-text:

```dart
LlmChatView(
  provider: _provider,
  welcomeMessage: _welcomeMessage,
  responseBuilder: (context, response) => RecipeResponseView(
    response,
  ),
),

LlmChatView(
  provider: FirebaseProvider(...),
  style: LlmChatViewStyle(...),
),

LlmChatView(
  // ...
  speechToText: MyCustomSpeechToText(),
)
```

Rerouting prompts with an `LlmStreamGenerator` passed as `messageSender`:

```dart
class ChatPage extends StatelessWidget {
  final _provider = FirebaseProvider(...);

  @override
  Widget build(BuildContext context) => Scaffold(
      appBar: AppBar(title: const Text(App.title)),
      body: LlmChatView(
        provider: _provider,
        messageSender: _logMessage,
      ),
    );

  Stream<String> _logMessage(
    String prompt, {
    required Iterable<Attachment> attachments,
  }) async* {
    // log the message and attachments
    debugPrint('# Sending Message');
    debugPrint('## Prompt\n$prompt');
    debugPrint('## Attachments\n${attachments.map((a) => a.toString())}');

    // forward the message on to the provider
    final response = _provider.sendMessageStream(
      prompt,
      attachments: attachments,
    );

    // log the response
    final text = await response.join();
    debugPrint('## Response\n$text');

    // return it
    yield text;
  }
}
```

## Options / Props

`LlmChatView` parameters named on this page:

| Name | Type | Description |
| --- | --- | --- |
| `provider` | `LlmProvider` | The LLM provider (for example `FirebaseProvider`) |
| `welcomeMessage` | `String` | Initial greeting shown to the user |
| `suggestions` | list of strings | Suggested prompts, shown only when there is no chat history; clicking one sends it immediately |
| `enableAttachments` | `bool` | Show the **+** attachments button; default `true` |
| `enableVoiceNotes` | `bool` | Show the mic button; default `true` |
| `speechToText` | `SpeechToText` | Custom speech-to-text implementation |
| `cancelMessage`, `errorMessage` | message strings | Override the default cancel/error text appended to the response |
| `onCancelCallback`, `onErrorCallback` | callbacks | Override cancel/error handling |
| `responseBuilder` | `(context, response) => Widget` | Custom widget for LLM responses (default is formatted Markdown) |
| `style` | `LlmChatViewStyle` | Custom styling, including `voiceNoteRecorderStyle` |
| `messageSender` | `LlmStreamGenerator` | Reroute, log, or debug messages between the chat view and the provider |

## Notes

- By default, a user cancellation appends "CANCEL" to the LLM response with a pop-up; an LLM error (for example a dropped network connection) appends "ERROR" with an alert dialog. Override any or all of the cancel/error parameters; defaults remain for anything not overridden.
- System instructions are provider-specific; `FirebaseProvider` takes them through the model's `systemInstruction` parameter (`Content.system(...)`). The recipes example recreates the provider (moving history over via `_provider.history.toList()`) when user preferences change.
- Function calling: `FirebaseProvider` supports it out of the box, handling the loop of sending the prompt, receiving a function call request, executing the function, and sending the result back until a final text response is generated. Define the tools and pass them to `FirebaseProvider` (see the function calling example in the flutter/ai repository, `example/lib/function_calls/function_calls.dart`).
- When history changes a provider calls `notifyListeners` (a `Listenable`); subscribe/unsubscribe with `addListener`/`removeListener` (the source page abbreviates these as `add`/`remove`) or use `ListenableBuilder`. `generateStream` calls the LLM without affecting history; `sendMessageStream` adds two messages (user and LLM) to history when the response completes. The chat view uses `sendMessageStream` for chat prompts and `generateStream` for voice input.
- Serialize with `ChatMessage.toJson` and deserialize with the static `ChatMessage.fromJson`. To keep serialization fast, write each user message only once.
- The sample `_saveHistory` is append-only: it skips any index whose file already exists, so after the history is cleared, edited or rerouted the on-disk files can diverge from `_provider.history`; delete or rewrite the stored files when the history changes.
- JSON mode for custom response widgets: set `GenerationConfig(responseMimeType: 'application/json', responseSchema: Schema(...))` on the Firebase model and also describe the JSON schema in the system instructions.
- Chat without UI: create a separate provider and call `sendMessageStream` (which creates history entries that are not displayed) or call `generateStream` on an existing provider without affecting chat history.
- When providing a `messageSender`, you must call the underlying provider yourself or it will not get the message; this allows dynamic routing or Retrieval Augmented Generation (RAG).
- The source snippets use `FirebaseAI.geminiAI()` in several places while the AI Toolkit overview page uses `FirebaseAI.googleAI()`; both appear verbatim in the source.
- Example apps referenced live in https://github.com/flutter/ai/tree/main/example/lib (welcome, suggestions, history, recipes, custom_stt, custom_styles, styles, dark_mode, logging).
- Distinction: `ListenableBuilder`, `ChangeNotifier`, and `Listenable` here are Flutter framework types; provider-side concepts such as function calling and RAG are not API definitions of openai-api-core or anthropic-api-tools-mcp.

## Related

- [User experience](./ai-toolkit-user-experience.md)
- [Custom LLM providers](./ai-toolkit-custom-llm-providers.md)
