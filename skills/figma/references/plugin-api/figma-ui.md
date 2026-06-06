# figma.ui

Sub-API for managing the plugin's iframe UI — showing, hiding, resizing, repositioning, and passing messages between the plugin sandbox and the UI iframe.

## Signature / Usage

```ts
// Show UI defined in manifest
figma.showUI(__html__, { width: 300, height: 400 });

// Send a message to the iframe
figma.ui.postMessage({ type: 'init', data: payload });

// Receive a message from the iframe
figma.ui.onmessage = (msg) => {
  if (msg.type === 'resize') {
    figma.ui.resize(msg.width, msg.height);
  }
};

// Inside iframe (ui.html)
window.onmessage = (event) => {
  const msg = event.data.pluginMessage;
  // handle msg
};
parent.postMessage({ pluginMessage: { type: 'done' } }, '*');
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `show()` | `() => void` | Make UI visible (if created with `visible: false`) |
| `hide()` | `() => void` | Hide UI; plugin code keeps running |
| `resize()` | `(width: number, height: number) => void` | Resize UI (minimum 70×0) |
| `reposition()` | `(x: number, y: number) => void` | Move UI position after creation |
| `getPosition()` | `() => { windowSpace: Vector; canvasSpace: Vector }` | Get current UI position |
| `close()` | `() => void` | Destroy iframe and UI |
| `postMessage()` | `(pluginMessage: any, options?: UIPostMessageOptions) => void` | Send message to iframe |
| `on()` | `(type: 'message', callback: MessageEventHandler) => void` | Register message handler |
| `once()` | `(type: 'message', callback: MessageEventHandler) => void` | Single-use message handler |
| `off()` | `(type: 'message', callback: MessageEventHandler) => void` | Remove message handler |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `onmessage` | `MessageEventHandler \| undefined` | Shorthand handler for incoming iframe messages |

### ShowUIOptions (passed to `figma.showUI()`)

| Name | Type | Description |
|------|------|-------------|
| `visible` | `boolean` | Whether to show immediately (default `true`) |
| `width` | `number` | Initial width in px |
| `height` | `number` | Initial height in px |
| `position` | `{ x: number; y: number }` | Initial screen position |
| `title` | `string` | Window title |
| `themeColors` | `boolean` | Pass Figma theme CSS variables to iframe |

## Notes

- Messages flow from plugin sandbox → iframe via `figma.ui.postMessage()`, and from iframe → sandbox via `parent.postMessage({ pluginMessage: ... }, '*')`.
- Use `figma.ui.onmessage` or `figma.ui.on('message', cb)` — they are equivalent.
- The UI iframe has no direct access to the Figma document; all document operations must be relayed through messaging.

## Related

- [figma global object](./figma-global.md)
- [global fetch](./global-fetch.md)
