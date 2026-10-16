# Listeners

State Machine components that respond to user interactions (pointer events) or internal changes (ViewModel property changes, component events) and translate them into actions — updating data, firing events, or repositioning objects — without requiring runtime code.

## Signature / Usage

A listener is configured entirely in the editor. Each listener has three parts: a Target, a Condition, and one or more Actions.

```text
Listener
├── Target       — shape/group acting as a hit area, or an Artboard/Component
├── Condition    — what triggers the listener
└── Action(s)   — what happens when triggered
```

## Options / Props

### Target

| Option | Description |
| --- | --- |
| Shape / Group | Functions as a hitbox for pointer events |
| Artboard / Component | Used for listening to forwarded events from nested components |

### Condition ("Listen to")

| Listen to | Description |
| --- | --- |
| View Model Change | Fires whenever the selected property changes (no expected value or direction); only when the target is an artboard or nested component |
| Rive Event | Fires when the selected Rive event is fired; only when the target is an artboard or nested component |
| Pointer Enter | Fires when the pointer enters the target area |
| Pointer Exit | Fires when the pointer leaves the target area |
| Pointer Move | Fires repeatedly while the pointer moves over the target area |
| Pointer Down | Fires when the pointer is pressed down on the target |
| Pointer Up | Fires when the pointer is released over the target |
| Pointer Drag | Fires repeatedly as the pointer moves after being pressed down on the target, until released |
| Click | Fires when the target is clicked or tapped |
| Focus / Blur | Fires when the target receives / loses focus |
| Keyboard | Fires on key down / key up while the target has focus (**On Key Down** or **On Key Up**) |
| Gamepad | Fires on gamepad input such as a button press or stick movement |
| Text Input | Fires when text is entered while the target (a Text Input field) has focus |
| Semantic Action | Fires when assistive technology performs an action on the target: **Semantic Tap**, **Semantic Increase**, **Semantic Decrease** |

### Mouse buttons

Pointer Down, Pointer Up, Click and Pointer Drag listeners have a second dropdown to choose the button: Primary Button, Secondary Button or Middle Button (e.g. Secondary for right-click context menus). Runtimes that do not support this ignore Secondary and Middle Button listeners; they do not fire them on a left click instead.

### Action

| Action | Description |
| --- | --- |
| View Model Change | Sets a ViewModel property to a specific value or to the value of another property |
| Input Change (deprecated) | Sets the value of a state machine input |
| Align Target | Positions an object so it follows the pointer; **Preserve Offset** keeps the original distance, otherwise it aligns directly to the pointer |
| Focus Target | Moves focus to a specific element |
| Focus Traversal | Steps through the focus order |
| Report Event | Fires a named Rive event |
| Scripted Action | Runs a listener action script |

## Notes

- Creating a listener: select the element (or the artboard / nested component for View Model Change and Rive Event), show listeners in the Animations panel next to the State Machine, click **+**, then set Target, Listen to and options in the right sidebar. A listener can have multiple actions, and listener action values can be data bound.
- Pointer Exit only fires while Rive can read the pointer position; if the target touches the canvas or container edge, leaving the container may not trigger it.
- Focus: turn on **Focusable** for an element to add it to the focus order.
- Keyboard: to test in the editor press Option+Space (or Toggle Keyboard Capture in the playback header) so keys reach the file instead of editor shortcuts. Gamepad: the gamepad icon at the bottom of an open file turns green when a controller is visible; scripts can listen to gamepad events too.
- Text Input: use the Text Input tool to draw an editable field (over a layout to add it to that layout); configure font, colors, placeholder, selection color, background and single/multiline in the Inspector.
- Semantic Action: the Semantic section of the Inspector sets a role (button, checkbox, slider, text, ...), traits and state.
- The Rive Event listen-to is not recommended for communicating between artboards; use Data Binding instead.

- **Opaque Target**: When disabled, pointer events pass through the hit area and can trigger multiple overlapping listeners simultaneously.
- Converters can be applied to "View Model Change" actions when mapping one property to another (e.g., incrementing a number).
- Listeners enable fully designer-authored interactivity without any runtime code for common pointer interactions.

## Related

- [State Machine](./state-machine.md)
- [Inputs](./inputs.md)
- [Data Binding](./data-binding.md)
- [Events](./events.md)
