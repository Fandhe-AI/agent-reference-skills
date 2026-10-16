---
source: https://docs.flutter.dev/ai/genui/get-started
---

# Get started with the GenUI SDK for Flutter

Add `genui` to a Flutter app: configure an agent provider, connect a `SurfaceController`, `A2uiTransportAdapter`, and `Conversation`, display `Surface` widgets, and add custom catalog items.

## Signature / Usage

Create the connection (state class excerpt from the source):

```dart
class _MyHomePageState extends State<MyHomePage> {
  late final SurfaceController _surfaceController;
  late final A2uiTransportAdapter _transportAdapter;
  late final Conversation _conversation;

  @override
  void initState() {
    super.initState();

    // Create a SurfaceController with a widget catalog.
    // The BasicCatalogItems contain basic widgets for text, markdown, and images.
    _surfaceController = SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);

    // The Conversation wires transport -> controller internally.
    _transportAdapter = A2uiTransportAdapter(onSend: (message) async {
      // Implement sending to LLM and pipe chunks back.
    });

    final catalog = BasicCatalogItems.asCatalog();
    final promptBuilder = PromptBuilder.chat(
      catalog: catalog,
      systemPromptFragments: [
        '''
        You are an expert in creating funny riddles. Every time I give you a word,
        you should generate UI that displays one new riddle related to that word.
        Each riddle should have both a question and an answer.
        '''
      ],
    );

    // ... initialize your LLM Client of choice using promptBuilder.systemPromptJoined()

    // Create the Conversation to orchestrate everything.
    _conversation = Conversation(
      controller: _surfaceController,
      transport: _transportAdapter,
    );

    // Listen for surface lifecycle events:
    _conversation.events.listen((event) {
      if (event is ConversationSurfaceAdded) {
        _onSurfaceAdded(event);
      } else if (event is ConversationSurfaceRemoved) {
        _onSurfaceDeleted(event);
      }
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _conversation.dispose();
    _transportAdapter.dispose();

    super.dispose();
  }
}
```

Display generated UI: send with `sendRequest` on `Conversation` (or stream into your LLM client and pump results with `_transportAdapter.addChunk`), listen to `events`, and build a `Surface` per surface ID:

```dart
return Surface(surfaceContext: _surfaceController.contextFor(id));
```

Add custom widgets to the catalog (depends on `json_schema_builder`):

```console
$ dart pub add json_schema_builder
```

```dart
import 'package:json_schema_builder/json_schema_builder.dart';
import 'package:material_ui/material_ui.dart';
import 'package:genui/genui.dart';

final _schema = S.object(
  properties: {
    'question': S.string(description: 'The question part of a riddle.'),
    'answer': S.string(description: 'The answer part of a riddle.'),
  },
  required: ['question', 'answer'],
);
```

```dart
final riddleCard = CatalogItem(
  name: 'RiddleCard',
  dataSchema: _schema,
  widgetBuilder:
      (itemContext) {
        final json = itemContext.data as Map<String, Object?>;
        final question = json['question'] as String;
        final answer = json['answer'] as String;

        final context = itemContext.buildContext;

        return Container(
          constraints: const BoxConstraints(maxWidth: 400),
          decoration: BoxDecoration(border: Border.all()),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(question, style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 8.0),
              Text(answer, style: Theme.of(context).textTheme.headlineSmall),
            ],
          ),
        );
      },
);
```

```dart
_surfaceController = SurfaceController(
  catalogs: [BasicCatalogItems.asCatalog().copyWith(newItems: [riddleCard])],
);
```

## Options / Props

Agent providers:

| Provider | When to use | Packages |
| --- | --- | --- |
| Firebase AI Logic | Production apps where all LLM interactions are in the Flutter client without a server; Firebase manages the Gemini API key | `dart pub add genui firebase_ai` |
| GenUI A2UI | Client/server architectures where the agent runs on the server | `dart pub add genui genui_a2a` |
| Build your own | Build an adapter for your preferred LLM provider; stream its results into an `A2uiTransportAdapter` | provider SDK |

Firebase AI Logic setup steps: create a Firebase project, enable the Gemini API, follow the first three steps of Firebase's Flutter setup guide, add `genui` and `firebase_ai`, initialize Firebase in `main`, then create the model and wrap it with `SurfaceController` and `A2uiTransportAdapter`:

```dart
import 'package:genui/genui.dart';
import 'package:firebase_ai/firebase_ai.dart';

final catalog = Catalog([
  // ...
]);
final catalogs = [catalog];

final surfaceController = SurfaceController(catalogs: catalogs);

final promptBuilder = PromptBuilder.chat(
  catalog: catalog,
  systemPromptFragments: ['You are a helpful assistant.'],
);

final model = FirebaseAI.vertexAI().generativeModel(
  model: 'gemini-3.5-flash',
  systemInstruction: Content.system(promptBuilder.systemPromptJoined()),
);

// The Conversation wires transport -> controller internally.
late final A2uiTransportAdapter transportAdapter;
transportAdapter = A2uiTransportAdapter(onSend: (message) async {
  // final stream = model.generateContentStream(...);
  // await for (final chunk in stream) {
  //   transportAdapter.addChunk(chunk.text ?? '');
  // }
});

final conversation = Conversation(
  controller: surfaceController,
  transport: transportAdapter,
);
```

GenUI A2UI (`genui_a2a`, integration with the A2UI Streaming UI Protocol, https://a2ui.org/) main components: `A2uiAgentConnector` (low-level web socket communication with the A2A server, sending messages and parsing stream events) and `AgentCard` (metadata about the connected agent). Steps: initialize `SurfaceController` with `Catalog`s, create `A2uiTransportAdapter`, create `A2uiAgentConnector` with the A2A server URI, create `Conversation`, render with `Surface`, send with `connector.connectAndSend` or `Conversation.sendMessage`. Key lines from the source example:

```dart
_connector = A2uiAgentConnector(
  // TODO: Replace with your A2A server URL.
  url: Uri.parse('http://localhost:8080'),
);

// Listen for messages from the remote agent.
_connector.stream.listen(_surfaceController.handleMessage);
```

Data model and binding: widgets are bound to the `DataModel` through a `DataContext` passed to each widget's builder. The AI binds a property with a JSON object that holds either a JSON primitive (static value) or an object with a `path` property (bound value). Examples from the source:

```json
{
  "id": "welcome-text",
  "component": "Text",
  "text": "Welcome to GenUI",
  "variant": "h1"
}
```

```json
{
  "id": "image",
  "component": "Image",
  "url": "https://example.com/image.png",
  "variant": "mediumFeature"
}
```

Input widgets such as `TextField` update the `DataModel` directly; other widgets bound to the same path (for example `/user/name`) rebuild automatically.

System instructions: the `PromptBuilder` instruction must explicitly tell the LLM to generate UI with the tools `genui` provides.

```dart
final promptBuilder = PromptBuilder.chat(
  catalog: catalog,
  systemPromptFragments: [
    '''
    You are an expert in creating funny riddles.
    Every time I give you a word, you should generate UI that
    displays one new riddle related to that word.
    Each riddle should have both a question and an answer.
    '''
  ],
);
```

Logging:

```dart
import 'package:logging/logging.dart';
import 'package:genui/genui.dart';

final logger = configureLogging(level: Level.ALL);

void main() async {
  logger.onRecord.listen((record) {
    debugPrint('${record.loggerName}: ${record.message}');
  });

  // Additional initialization of bindings and Firebase.
}
```

## Notes

- Experimental: the `genui` package is in alpha and is likely to change.
- For iOS or macOS builds, add `com.apple.security.network.client` set to `<true/>` to the `{ios,macos}/Runner/*.entitlements` file(s) to enable outbound network requests.
- `PromptBuilder.chat()` generates a system prompt that might be 3,000-5,000+ tokens long, which can exceed the context window of on-device or small models. For on-device LLMs, write a compact custom system prompt that covers only the A2UI `createSurface` to `updateComponents` flow, or use `systemPromptFragments` to pass only the needed schema portions.
- Always include the tools provided by `SurfaceController` when building the `PromptBuilder`.
- Firebase has a minimum version requirement for Apple platforms that might be higher than Flutter's default; check the `Podfile` (iOS) and `CMakeLists.txt` (macOS).
- Source snippets import `package:material_ui/material_ui.dart`. In Flutter 3.47 `material_ui` is the standalone Material package that can be opted into; the framework `package:flutter/material.dart` remains the stable surface.
- Examples: the `examples` directory of the genui repository, including the travel app, which shows a custom domain-specific widget catalog.
- Distinction: `Catalog`, `Surface`, `Conversation` and the A2UI protocol here are Dart `package:genui`; the A2A/MCP agent frameworks of openai-agents and anthropic-agent-sdk are separate.

## Related

- [GenUI SDK main components and concepts](./genui-components.md)
- [Input and events](./genui-input-events.md)
