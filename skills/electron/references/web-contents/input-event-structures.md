---
source: https://www.electronjs.org/docs/latest/api/structures/input-event
---

# Input event structures (InputEvent, KeyboardInputEvent, MouseInputEvent, MouseWheelInputEvent, KeyboardEvent)

Object structures used by `webContents` `input-event` / `before-input-event` / `before-mouse-event` and `contents.sendInputEvent`.

## Signature / Usage

```js
// Send a synthetic key press to the focused window's page
win.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'A', modifiers: ['shift'] })
```

## InputEvent Object

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | Can be `undefined`, `mouseDown`, `mouseUp`, `mouseMove`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `rawKeyDown`, `keyDown`, `keyUp`, `char`, `gestureScrollBegin`, `gestureScrollEnd`, `gestureScrollUpdate`, `gestureFlingStart`, `gestureFlingCancel`, `gesturePinchBegin`, `gesturePinchEnd`, `gesturePinchUpdate`, `gestureTapDown`, `gestureShowPress`, `gestureTap`, `gestureTapCancel`, `gestureShortPress`, `gestureLongPress`, `gestureLongTap`, `gestureTwoFingerTap`, `gestureTapUnconfirmed`, `gestureDoubleTap`, `touchStart`, `touchMove`, `touchEnd`, `touchCancel`, `touchScrollStarted`, `pointerDown`, `pointerUp`, `pointerMove`, `pointerRawUpdate`, `pointerCancel` or `pointerCausedUaAction`. |
| `modifiers` | string[] (optional) | An array of modifiers of the event, can be `shift`, `control`, `ctrl`, `alt`, `meta`, `command`, `cmd`, `iskeypad`, `isautorepeat`, `leftbuttondown`, `middlebuttondown`, `rightbuttondown`, `capslock`, `numlock`, `left`, `right`. |

## KeyboardInputEvent Object extends `InputEvent`

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of the event, can be `rawKeyDown`, `keyDown`, `keyUp` or `char`. |
| `keyCode` | string | The character that will be sent as the keyboard event. Should only use valid Accelerator key codes. |

## MouseInputEvent Object extends `InputEvent`

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel` or `mouseMove`. |
| `x` | Integer | |
| `y` | Integer | |
| `button` | string (optional) | The button pressed, can be `left`, `middle`, `right`. |
| `globalX` | Integer (optional) | |
| `globalY` | Integer (optional) | |
| `movementX` | Integer (optional) | |
| `movementY` | Integer (optional) | |
| `clickCount` | Integer (optional) | |

## MouseWheelInputEvent Object extends `MouseInputEvent`

| Name | Type | Description |
| --- | --- | --- |
| `type` | string | The type of the event, can be `mouseWheel`. |
| `deltaX` | Integer (optional) | |
| `deltaY` | Integer (optional) | |
| `wheelTicksX` | Integer (optional) | |
| `wheelTicksY` | Integer (optional) | |
| `accelerationRatioX` | Integer (optional) | |
| `accelerationRatioY` | Integer (optional) | |
| `hasPreciseScrollingDeltas` | boolean (optional) | |
| `canScroll` | boolean (optional) | |

## KeyboardEvent Object

| Name | Type | Description |
| --- | --- | --- |
| `ctrlKey` | boolean (optional) | whether the Control key was used in an accelerator to trigger the Event |
| `metaKey` | boolean (optional) | whether a meta key was used in an accelerator to trigger the Event |
| `shiftKey` | boolean (optional) | whether a Shift key was used in an accelerator to trigger the Event |
| `altKey` | boolean (optional) | whether an Alt key was used in an accelerator to trigger the Event |
| `triggeredByAccelerator` | boolean (optional) | whether an accelerator was used to trigger the event as opposed to another user gesture like mouse click |

## Notes

* Source pages: `api/structures/input-event`, `keyboard-input-event`, `mouse-input-event`, `mouse-wheel-input-event`, `keyboard-event` (all under https://www.electronjs.org/docs/latest/).
* `KeyboardEvent` here is the Electron structure passed to menu item click handlers, not the DOM `KeyboardEvent`.
* The `BrowserWindow` containing the contents needs to be focused for `sendInputEvent()` to work.

## Related

* [WebContents events: input, devtools, ipc](./web-contents-events-input-devtools-ipc.md)
* [WebContents methods: devtools, ipc, input](./web-contents-methods-devtools-ipc-input.md)
