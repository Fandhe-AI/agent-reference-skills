# Gamepad Input (Web)

Send game controller input to a Rive graphic in the Web (JS) runtime, so players can drive it with a controller's buttons and sticks. On by default in `@rive-app/canvas`, `@rive-app/canvas-lite` and `@rive-app/webgl2` `2.48.0+`.

## Signature / Usage

```js
const rive = new Rive({
  canvas: document.getElementById("rive-canvas"),
  src: "game.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  gamepadOptions: {
    requireFocus: true,
  },
});
```

Turn gamepad input off for an instance:

```js
const rive = new Rive({
  canvas: document.getElementById("rive-canvas"),
  src: "game.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  shouldDisableGamepad: true,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `gamepadOptions.requireFocus` | `boolean` | `false` | When `true`, controller input only reaches the graphic while browser focus is on the canvas. Useful when several graphics on a page use a controller |
| `shouldDisableGamepad` | `boolean` | `false` | When `true`, the instance doesn't read controllers and its state machine receives no gamepad events |

## Notes

- To react to a controller in a file, add a Gamepad listener to a state machine in the Rive Editor; scripts can receive gamepad events too (see `GamepadConnected` / `GamepadEvent` / `GamepadDisconnected` in the scripting API reference).
- The runtime reads every controller the browser detects once per frame, before the state machine advances. Controllers without the browser's standard button layout also work; their buttons and sticks are sent as the browser reports them.
- Each Rive instance sends input to its playing state machine; if it plays more than one, only the first receives controller input.
- Gamepad events go to the node that has focus, then up through its ancestors. When no node has focus, only scripts receive them.
- By default an instance receives controller input even when its canvas lacks browser focus. The semantics overlay and the hidden input of text input count as part of the canvas. While browser focus is elsewhere and `requireFocus` is `true`, controllers stay connected but the graphic sees all buttons released and all sticks at rest.
- Setting `shouldDisableRiveListeners` to `true` also turns off gamepad input.
- Source: https://rive.app/docs/runtimes/web/gamepad.md (fetched 2026-11-14)

## Related

- [focus.md](./focus.md)
- [text-and-key-input.md](./text-and-key-input.md)
- [rive-constructor.md](./rive-constructor.md)
