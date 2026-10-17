---
source: https://docs.flutter.dev/ai/genui/components
---

# GenUI SDK main components and concepts

The main components of the `genui` package and the interaction cycle managed by `Conversation`.

## Signature / Usage

Create a controller, adapter, and conversation (from the Get started page):

```dart
_surfaceController = SurfaceController(catalogs: [BasicCatalogItems.asCatalog()]);

_transportAdapter = A2uiTransportAdapter(onSend: (message) async {
  // Implement sending to LLM and pipe chunks back.
});

_conversation = Conversation(
  controller: _surfaceController,
  transport: _transportAdapter,
);
```

## Options / Props

| Component | Description |
| --- | --- |
| `Conversation` | Primary facade and entry point. Includes the `SurfaceController` class, manages conversation history, and orchestrates the generative UI process. |
| `Catalog` | A collection of `CatalogItem` objects defining the widgets the AI may use. `SurfaceController` supports multiple catalogs. Each `CatalogItem` specifies a widget name (for the AI to reference), a data schema for its properties, and a builder function. |
| `DataModel` | Centralized, observable store for all dynamic UI state. Widgets are bound to data in it; when data changes only dependent widgets rebuild. |
| `A2uiTransportAdapter` | Bridge that parses raw text streams from the LLM into `A2uiMessage` commands for the `SurfaceController`. |
| `A2uiMessage` | Message from the AI to the UI instructing actions like `createSurface`, `surfaceUpdate`, `dataModelUpdate`, or `deleteSurface`. |
| `SurfaceController` | Processes `A2uiMessage`s, manages the `DataModel`, and maintains the state of UI surfaces. |

Interaction cycle:

1. User input: the user provides a prompt; the app calls `conversation.sendMessage()`.
2. AI invocation: the `Conversation` sends the user's message to the LLM SDK.
3. AI response: the LLM, guided by the widget schemas in its system prompt, sends back responses.
4. Stream handling: the text stream is fed into the `A2uiTransportAdapter`.
5. UI state update: parsed `A2uiMessages` are passed to `SurfaceController.handleMessage()`, which updates the UI state and `DataModel`.
6. UI rendering: the `SurfaceController` broadcasts an update and any `Surface` widgets listening for that surface ID rebuild.
7. Callbacks: text responses and errors trigger callbacks on the `Conversation` or are handled by your LLM integration flow.
8. User interaction: interaction directly updates the `DataModel`. If it is an action (like a button click), the `Surface` forwards the event to the `SurfaceController`, which creates a new `UserMessage` containing the current data model state and restarts the cycle.

## Notes

- Experimental: the `genui` package is in alpha and is likely to change.
- A design doc is linked at `packages/genui/DESIGN.md` in the genui repository.
- Distinction: `Catalog`, `Surface`, and `Conversation` here are `package:genui` (Dart) types, unrelated to Agent SDK conversation or MCP concepts in openai-agents or anthropic-agent-sdk.

## Related

- [GenUI SDK for Flutter](./genui.md)
- [Get started with the GenUI SDK for Flutter](./genui-get-started.md)
