---
source: https://ai.google.dev/api/live
---

# Live API - WebSockets API reference

Reference for the stateful Live API over WebSockets (`BidiGenerateContent`): session setup, client and server messages, and ephemeral authentication tokens.

## Signature / Usage

```text
wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent
```

Session configuration (first message, `setup`):

```json
{
  "model": "string",
  "generationConfig": {
    "candidateCount": 0,
    "maxOutputTokens": 0,
    "temperature": 0,
    "topP": 0,
    "topK": 0,
    "presencePenalty": 0,
    "frequencyPenalty": 0,
    "responseModalities": ["string"],
    "speechConfig": {},
    "mediaResolution": {},
    "translationConfig": {}
  },
  "systemInstruction": "string",
  "tools": [{}]
}
```

(The source shows type placeholders such as `integer` / `number` / `string` / `object`; numbers above stand in for those placeholders.)

Each client message is one JSON object with exactly one of:

```json
{
  "setup": "BidiGenerateContentSetup",
  "clientContent": "BidiGenerateContentClientContent",
  "realtimeInput": "BidiGenerateContentRealtimeInput",
  "toolResponse": "BidiGenerateContentToolResponse"
}
```

Receiving (Python SDK):

```python
async with client.aio.live.connect(model='...', config=config) as session:
    await session.send(input='Hello world!', end_of_turn=True)
    async for message in session.receive():
        print(message)
```

## Options / Props

Client messages:

| Message | Description |
|------|-------------|
| BidiGenerateContentSetup | Session configuration to be sent in the first message (and only the first). Wait for `BidiGenerateContentSetupComplete` before sending anything else. |
| BidiGenerateContentClientContent | Incremental content update of the current conversation (`turns[]`, `turnComplete`). Unconditionally appended to history and interrupts any current model generation. |
| BidiGenerateContentRealtimeInput | Real time audio, video, or text input (`audio`, `video`, `text`, `activityStart`, `activityEnd`, `mediaResolution`, `audioStreamEnd`; `mediaChunks[]` is deprecated). Streams are concurrent; ordering across them is not guaranteed; end of turn is derived from user activity. |
| BidiGenerateContentToolResponse | Response to a `ToolCall` (`functionResponses[]`, matched to function calls by `id`). |

`BidiGenerateContentSetup` fields: `model` (required, `models/{model}`), `generationConfig`, `systemInstruction`, `tools[]`, `realtimeInputConfig`, `sessionResumption`, `contextWindowCompression`, `inputAudioTranscription`, `outputAudioTranscription`, `proactivity`, `historyConfig`, `labels`. Not supported in `generationConfig`: `responseLogprobs`, `responseMimeType`, `logprobs`, `responseSchema`, `responseJsonSchema`, `stopSequence`, `skipResponseCache`, `routingConfig`, `audioTimestamp`.

Server messages (`BidiGenerateContentServerMessage`): `usageMetadata` and `voiceActivity` may accompany exactly one of the union `messageType` fields: `setupComplete`, `serverContent`, `toolCall`, `toolCallCancellation`, `goAway`, `sessionResumptionUpdate`.

`BidiGenerateContentServerContent` fields: `generationComplete`, `turnComplete`, `interrupted`, `groundingMetadata`, `inputTranscription`, `interimInputTranscription`, `outputTranscription`, `urlContextMetadata`, `waitingForInput`, `interactionStatus`, `modelTurn`.

Ephemeral authentication tokens (`CreateAuthTokenRequest.authToken`):

| Name | Type | Description |
|------|------|-------------|
| name | string | Output only. The token itself. |
| expireTime | Timestamp | Optional. Input only. Immutable. After this time messages in BidiGenerateContent sessions are rejected. Defaults to 30 minutes in the future; if set, must be less than 20 hours in the future. |
| newSessionExpireTime | Timestamp | Optional. Input only. Immutable. After this time new Live API sessions using the token are rejected. Defaults to 60 seconds in the future; if set, must be less than 20 hours in the future. |
| fieldMask | FieldMask | Optional. Input only. Immutable. Controls whether the setup comes from the connection or from `bidiGenerateContentSetup` in the token request. |
| bidiGenerateContentSetup | BidiGenerateContentSetup | Optional (union `config`). Configuration specific to `BidiGenerateContent`. |
| uses | int32 | Optional (union `config`). Number of times the token can be used; zero means no limit; default is 1. Resuming a Live API session does not count as a use. |

## Notes

- Availability: Live API, v1beta only. The source page warns "Preview: The Live API is in preview." and states the URL is for version `v1beta`.
- You cannot update the configuration while the connection is open; you can change parameters except the model when pausing and resuming via session resumption.
- Ephemeral tokens obtained via `AuthTokenService.CreateToken` are used with `GenerativeService.BidiGenerateContentConstrained`, either in an `access_token` query parameter or in an HTTP `Authorization` header with "`Token`" prefixed.
- Message types also documented in the source: `ActivityStart` / `ActivityEnd`, `ActivityHandling`, `AudioTranscriptionConfig`, `AutomaticActivityDetection`, `ContextWindowCompressionConfig` / `SlidingWindow`, `StartSensitivity` / `EndSensitivity`, `GoAway`, `HistoryConfig`, `InteractionStatus`, `ProactivityConfig`, `RealtimeInputConfig`, `SessionResumptionConfig` / `SessionResumptionUpdate`, `TurnCoverage`, `TranslationConfig`, `UsageMetadata`, `VoiceActivity`.
- Function calling in the bidi API happens over dedicated tool messages, not `Content` parts as in unary / server-streaming `generateContent`.
- Distinct from openai-realtime-audio (OpenAI Realtime API over WebRTC / WebSocket / SIP).
- This reference example uses `session.send(...)`; the Live API get-started guide sends text with `session.send_realtime_input(text=...)`.
- Docs fetched 2026-10-16.

## Related

- [Live Music API](./live-music.md)
- [Generating content](./generate-content.md)
