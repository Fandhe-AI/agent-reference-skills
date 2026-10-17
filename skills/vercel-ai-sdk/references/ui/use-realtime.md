---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-realtime
---

# experimental_useRealtime

Creates a browser-side realtime session for bidirectional audio and text conversations with a realtime provider model. Supports token-based provider WebSockets, application-owned WebSocket relays, and optional WebRTC where the model declares support. Turn-based conversation messages use `UIMessage[]`; continuous transcript fragments remain in `session`.

## Signature / Usage

```tsx
import { openai } from '@ai-sdk/openai';
import { experimental_useRealtime } from '@ai-sdk/react';

const model = openai.experimental_realtime('gpt-realtime');

function Conversation() {
  const realtime = experimental_useRealtime({
    model,
    api: { token: '/api/realtime/setup' },
  });
  return <button onClick={realtime.connect}>Connect</button>;
}
```

For AI Gateway, pass `gateway.experimental_realtime(...)` as the model and point `api.token` at a server-side setup endpoint that calls `gateway.experimental_realtime.getToken()`. Keep the model and session configuration stable across renders (module scope or `useMemo`); replacing either replaces the hook's session.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| model | `Experimental_RealtimeModel` | The realtime model to connect to. |
| api | `{ token: string } \| { websocket: string; protocols?: string[] } \| { session: string }` | Choose one connection mechanism. `token`: setup endpoint returning an `Experimental_RealtimeSetupResponse`. `session`: application WebRTC setup endpoint; accepts JSON `{ sdp, sessionConfig }` and returns JSON `{ sdp, sessionId }`. `websocket`: application-owned raw-protocol relay URL (use wss in production; never put provider credentials in the URL). `protocols`: optional relay subprotocols, only with `websocket`. |
| sessionConfig | `Partial<Experimental_RealtimeSessionConfig>` | Optional. Provider-neutral session configuration, such as instructions, voice, audio formats, input audio transcription, turn detection, tools, and `providerOptions`. |
| sampleRate | `number` | Optional. Default audio sample rate when `inputAudioFormat.rate` or `outputAudioFormat.rate` is not specified. Defaults to 24000. |
| maxEvents | `number` | Optional. Maximum provider events kept in the `events` array. Defaults to 500. |
| startupTimeoutMs | `number` | Optional. Readiness deadline, including transport setup. Defaults to 30000. |
| closeTimeoutMs | `number` | Optional. Deadline for confirmed provider finalization after graceful close. Defaults to 15000. |
| rtcDisconnectTimeoutMs | `number` | Optional. WebRTC peer disconnect recovery grace period. Defaults to 5000. Failed ICE terminates immediately. |
| maxPlaybackBufferSeconds | `number` | Optional. Continuous WebSocket PCM playback budget before reporting a recoverable gap and pausing playback. Defaults to 2. Unsupported with WebRTC. |
| onToolCall | `(options: { toolCall: { toolCallId: string; toolName: string; args: unknown } }) => unknown \| Promise<unknown> \| undefined` | Optional. Turn-based tools only. Return a value to automatically submit it as tool output, or return undefined and call `addToolOutput` manually later. Live client delegations are application-handled through session metadata and events. |
| onEvent | `(event: Experimental_RealtimeServerEvent) => void` | Optional. Called for every normalized realtime server event. |
| onError | `(error: Error) => void` | Optional. Called when the realtime session encounters an error. |

### Returns

| Name | Type | Description |
| --- | --- | --- |
| status | `'disconnected' \| 'connecting' \| 'connected' \| 'closing' \| 'error'` | The current connection status. |
| messages | `UIMessage[]` | Messages assembled from turn-based response text, transcript, and tool events. Continuous Live transcript fragments are exposed through `session.transcripts`. |
| events | `Experimental_RealtimeServerEvent[]` | Recent normalized provider events for inspection or debug UI. |
| isCapturing | `boolean` | Capture state observed through SDK controls and events on the selected audio track. |
| isPlaying | `boolean` | Whether model audio playback is active. |
| session | `Experimental_RealtimeSessionState \| undefined` | Session lifecycle metadata where supported: sessionId, transcript fragments, client delegation metadata, cumulative voice usage, input mute, terminationReason, and pending/confirmed/unconfirmed finalization. Transcript fragments may overlap or arrive late; they are not complete turns. |
| connect | `(options?: { stream?: MediaStream; capture?: boolean }) => Promise<void>` | Starts the selected connection. Continuous browser sessions acquire microphone audio by default; `capture: false` opts out. A supplied Live stream remains caller-owned. |
| close | `(options?: { eventId?: string }) => Promise<void>` | Stops capture/submissions and waits for bounded graceful finalization where supported. Inspect `session.finalization` for confirmation; models without acknowledged close disconnect immediately. |
| disconnect | `() => void` | Immediately releases transports and owned media. Preserves latest usage as unconfirmed unless a terminal provider event was received. |
| addToolOutput | `(callId: string, result: unknown) => void` | Turn-based only: submits a tool result back to the realtime provider. Continuous Live sessions reject this control; use `sendEvent` instead. |
| sendEvent | `(event: Experimental_RealtimeClientEvent) => Promise<void>` | Sends a normalized command in order. Resolves on local serialization/submission, not provider acceptance. Validation can throw synchronously; asynchronous send failures reject and are reported through `onError`. Live context/results use `context-append` with a known client delegation ID or `null`. |
| sendTextMessage | `(text: string) => void` | Turn-based only: sends user text and requests a response. Continuous Live sessions reject this control. |
| sendAudio | `(base64Audio: string) => void` | Sends a base64-encoded audio chunk to the provider input audio buffer over WebSocket. WebRTC uses media tracks and rejects JSON audio commands. |
| commitAudio | `() => void` | Turn-based only: commits the provider input audio buffer. |
| clearAudioBuffer | `() => void` | Turn-based only: clears the provider input audio buffer. |
| requestResponse | `(options?: { modalities?: string[] }) => void` | Turn-based only: requests a new model response. |
| cancelResponse | `() => void` | Turn-based only: cancels the active model response. |
| startAudioCapture | `(stream: MediaStream) => void` | Starts or replaces capture with the supplied MediaStream. Live paths borrow tracks. Async attachment failures are reported through `onError`. |
| stopAudioCapture | `() => void` | Stops local capture and releases SDK-owned microphone tracks. Caller-owned Live tracks are only detached. Does not change the provider input-mute state. |
| resumeAudioCapture | `() => Promise<void>` | Restarts capture, reusing a supplied Live stream or acquiring a fresh SDK-owned microphone. Does not reconnect the provider. |
| stopPlayback | `() => void` | Stops queued model audio playback. |
| resumePlayback | `() => Promise<void>` | Retries browser playback after interruption, suspension, or buffer overflow. Discarded stale audio is not replayed. |

## Notes

- `experimental_useRealtime` is an experimental feature (names and event unions may change in patch releases).
- Experimental compatibility: relay options were added and experimental `sendEvent` now returns a promise. OpenAI uses `experimental_realtime` for both Realtime and Live models, with a provider-specific `{ api: 'live' }` override for unknown or early-access Live model IDs; OpenAI Live startup options are exported as `Experimental_OpenAIRealtimeModelLiveOptions`.
- Continuous Live (for example `openai.experimental_realtime('gpt-live-1')`): use an application-owned WebSocket relay that supplies server credentials and authenticates clients; `wss:` in production. The current continuous browser runtime supports a JSON/PCM16 WebSocket relay media profile. Client delegation is application-handled (`session.delegations`, `sendEvent` with `type: 'context-append'`, `delegationId`, `content`, `providerOptions`); the SDK runs no generic agent executor for Live and Live delegations do not invoke `onToolCall`.
- Optional WebRTC: use `api: { session: '/api/realtime-live' }`; same-origin broker authenticated with your session cookie (no custom auth headers, custom fetch, or cross-origin credentials); answer needs nonempty `sdp` and `sessionId`; JSON response body limited to 1 MiB. Omit fixed audio formats and `maxPlaybackBufferSeconds`. `connect({ capture: false })` starts without microphone capture.
- Use `status === 'connected'` as the readiness signal; `connect()` does not wait for provider readiness. A fulfilled `close()` does not by itself confirm usage; read `session.finalization`.
- Live WebSocket sessions have a 128 KiB outgoing wire-frame limit and a 128 KiB combined buffered-send budget; oversized control messages are rejected, not split. Not applied to legacy turn-based sessions or WebRTC.
- Turn-based models such as `gpt-realtime` run tools client-side via `onToolCall`; return `undefined` and call `addToolOutput` later for tools that need user interaction.
- Capture ownership: SDK-acquired tracks are stopped on local capture stop or cleanup; caller-owned tracks are only detached. `isCapturing` does not continuously observe caller-owned media; call `startAudioCapture(stream)` or `resumeAudioCapture()` to refresh. Protocol mute and local capture are separate operations.
- Provider-package distinction: this hook drives realtime models through AI SDK provider packages (`@ai-sdk/openai`, AI Gateway). The raw OpenAI Realtime API (WebRTC / WebSocket / SIP event protocol) is covered by openai-realtime-audio.

## Related

- [Realtime](../media/realtime.md)
- [getRealtimeToolDefinitions](../media/get-realtime-tool-definitions.md)
- [useChat](./use-chat.md)
