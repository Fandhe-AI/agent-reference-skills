---
source: https://v2.tauri.app/reference/javascript/websocket/
---

# @tauri-apps/plugin-websocket

Open a WebSocket connection using a Rust client in JS.

## Signature / Usage

```ts
import WebSocket from '@tauri-apps/plugin-websocket';

const ws = await WebSocket.connect('wss://example.com');
const unlisten = ws.addListener((message) => console.log(message));
await ws.send('Hello World');
await ws.send([1, 2, 3]);
await ws.send({ type: 'Text', data: 'Hello World' });
unlisten(); // call when the listener is no longer needed
await ws.disconnect();
```

```ts
export default class WebSocket {          // @since 2.0.0
  id: number
  constructor(id: number, listeners: Set<(arg: Message) => void>)
  static connect(url: string, config?: ConnectionConfig): Promise<WebSocket>
  addListener(cb: (arg: Message) => void): () => void
  send(message: Message | string | number[]): Promise<void>
  disconnect(): Promise<void>
}

type Message =
  | MessageKind<'Text', string>
  | MessageKind<'Binary', number[]>
  | MessageKind<'Ping', number[]>
  | MessageKind<'Pong', number[]>
  | MessageKind<'Close', CloseFrame | null>

interface MessageKind<T, D> { type: T; data: D }
interface CloseFrame { code: number; reason: string }
```

## Options / Props

`ConnectionConfig` (forwarded to the underlying `tungstenite` client)

| Name | Type | Description |
| --- | --- | --- |
| readBufferSize | `number` | Read buffer capacity. The default value is 128 KiB. |
| writeBufferSize | `number` | Target minimum size of the write buffer to reach before writing data to the underlying stream. Default 128 KiB. If set to 0 each message will be eagerly written. |
| maxWriteBufferSize | `number` | Max size of the write buffer in bytes. Can provide backpressure when the buffer fills due to write errors. Default unlimited. Should always be at least write_buffer_size + 1 message. |
| maxMessageSize | `number \| 'none'` | Maximum size of an incoming message. `"none"` means no limit. Default 64 MiB. |
| maxFrameSize | `number \| 'none'` | Maximum size of a single incoming message frame payload (not including the frame header). `"none"` means no limit. Default 16 MiB. |
| acceptUnmaskedFrames | `boolean` | When true, the server accepts unmasked frames from the client (RFC 6455 says the server must close the connection). Default `false`. |
| headers | `HeadersInit` | Additional connect request headers. |

`MessageKind` / `CloseFrame`

| Name | Type | Description |
| --- | --- | --- |
| type | `T` | The kind of message, e.g. `'Text'`, `'Binary'`, `'Ping'`, `'Pong'` or `'Close'`. |
| data | `D` | The message payload; shape depends on `type`. |
| code | `number` | WebSocket close status code, e.g. `1000` for a normal closure. |
| reason | `string` | Human-readable explanation for why the connection was closed. |

## Notes

- `connect`: `wss://` requires one of the plugin's TLS Cargo features to be enabled.
- `addListener` is also called with an error message (as a `'Close'` message) when the underlying stream fails.
- `send` accepts a string (sent as `'Text'`), a numeric array (sent as `'Binary'`), or an explicit `Message`; anything else throws.
- `disconnect` sends a normal closure (`1000`) close frame with reason `Disconnected by client`.
- The constructor is used internally by `WebSocket.connect`; prefer `connect`.
- Source: `plugins-workspace@websocket-v2.5.0` `plugins/websocket/guest-js/index.ts`

## Related

- WebSocket plugin
