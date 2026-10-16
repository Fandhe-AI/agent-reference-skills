---
source: https://docs.flutter.dev/ai/genui/input-events
---

# Input and events

How user interactions are handled in the GenUI package, from the widget interaction to the AI agent receiving the event.

## Signature / Usage

Widgets dispatch events with `dispatchEvent` on `CatalogItemContext`. A `Button` typically captures a tap like this:

```dart
// Inside a CatalogItem widgetBuilder:
widgetBuilder: (itemContext) {
  // 1. Extract action data from the component properties.
  final buttonData = _ButtonData.fromMap(itemContext.data as JsonMap);
  final JsonMap actionData = buttonData.action;
  final actionName = actionData['name'] as String;

  // 2. Extract context definition (which data to send back).
  final List<Object?> contextDefinition =
      (actionData['context'] as List<Object?>?) ?? <Object?>[];

  return ElevatedButton(
    onPressed: () {
      // 3. Resolve the context values from the data model.
      final JsonMap resolvedContext = resolveContext(
        itemContext.dataContext,
        contextDefinition,
      );

      // 4. Dispatch the event.
      itemContext.dispatchEvent(
        UserActionEvent(
          name: actionName,
          sourceComponentId: itemContext.id,
          context: resolvedContext,
        ),
      );
    },
    child: /* ... */
  );
},
```

## Options / Props

The A2UI protocol `action` message:

| Field | Description |
| --- | --- |
| `name` | Name of the action (defined by the AI when generating the component). |
| `surfaceId` | ID of the UI surface where the event occurred. |
| `sourceComponentId` | ID of the component that triggered the event. |
| `context` | JSON object with data relevant to the event. |
| `timestamp` | When the event occurred. |

Dart types in `lib/src/model/ui_models.dart`:

```dart
/// A data object that represents a user interaction event in the UI.
extension type UiEvent.fromMap(JsonMap _json) { ... }

/// A UI event that represents a user action.
extension type UserActionEvent.fromMap(JsonMap _json) implements UiEvent {
  UserActionEvent({
    String? surfaceId,
    required String name,
    required String sourceComponentId,
    JsonMap? context,
    // ...
  }) : ...
}
```

Event flow:

1. Interaction: the user interacts with a widget (for example taps a button).
2. Capture: the widget implementation dispatches a `UiEvent`.
3. Processing: the framework adds context (such as `surfaceId` or data model values) and forwards the event.
4. Transmission: the event is routed to the AI through the `ContentGenerator` (wording from the source), which forwards it to the AI agent.

Pipeline details:

- `Surface` (`lib/src/core/surface.dart`) provides the dispatchEvent callback; `_dispatchEvent` injects `surfaceId` and delegates to `SurfaceHost` (implemented by `SurfaceController`):

```dart
void _dispatchEvent(UiEvent event) {
  // ...
  final Map<String, Object?> eventMap = {
    ...event.toMap(),
    surfaceIdKey: widget.surfaceId, // Inject surfaceId
  };
  final UiEvent newEvent = UserActionEvent.fromMap(eventMap);
  widget.host.handleUiEvent(newEvent);
}
```

- `SurfaceController.handleUiEvent` (`lib/src/core/surface_controller.dart`) verifies the event type, wraps it in the protocol `action` JSON envelope, and emits a `UserUiInteractionMessage` on its `onSubmit` stream:

```dart
@override
void handleUiEvent(UiEvent event) {
  if (event is! UserActionEvent) return;

  // Wrap in protocol 'action' envelope
  final String eventJsonString = jsonEncode({'action': event.toMap()});

  // Emit for listeners (like Conversation)
  _onSubmit.add(UserUiInteractionMessage.text(eventJsonString));
}
```

- `Conversation` (`lib/src/facade/conversation.dart`) listens to `onSubmit` and forwards through `sendRequest`:

```dart
_userEventSubscription = surfaceController.onSubmit.listen(sendRequest);
```

## Notes

- Experimental: the `genui` package is in alpha and is likely to change.
- The AI agent receives the JSON message, processes the user action, and may stream back new `surfaceUpdate` or `dataModelUpdate` messages, completing the loop.
- The source text still names `ContentGenerator` in the transmission step while the other GenUI pages use `A2uiTransportAdapter`; the class listing is not reconciled in the source.

## Related

- [GenUI SDK main components and concepts](./genui-components.md)
- [Get started with the GenUI SDK for Flutter](./genui-get-started.md)
