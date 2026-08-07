# Realtime conversations

Manage the Realtime speech-to-speech session lifecycle: session/conversation/response model, sending client events, and handling server events for text, audio, images, interruption, and push-to-talk.

## Signature / Usage

```javascript
// Update session config (client event)
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    output_modalities: ["audio"],
    audio: {
      input: {
        format: { type: "audio/pcm", rate: 24000 },
        turn_detection: { type: "semantic_vad" },
      },
      output: { format: { type: "audio/pcm" }, voice: "marin" },
    },
    instructions: "Speak clearly and briefly.",
  },
};
dataChannel.send(JSON.stringify(event)); // or ws.send(...)

// Create a text conversation item, then trigger a response
dataChannel.send(JSON.stringify({
  type: "conversation.item.create",
  item: { type: "message", role: "user", content: [{ type: "input_text", text: "hello" }] },
}));
dataChannel.send(JSON.stringify({ type: "response.create" }));
```

## Options / Props

| Concept | Description |
|------|-------------|
| Session | Controls interaction parameters (model, voice, audio format, turn detection, tools) |
| Conversation | User input Items and model output Items generated during the session |
| Response | Model-generated audio/text Items added to the Conversation for one turn |
| `session.update` / `session.created` / `session.updated` | Configure session; `voice` is immutable once the model has emitted audio |
| `conversation.item.create` | Add a message (text, audio, or image content), or a `function_call_output` / `mcp_approval_response` item |
| `response.create` | Trigger a model turn; supports `output_modalities`, `conversation: "none"` (out-of-band), custom `input`, `metadata` |
| `response.done` | Final event for a turn; contains full output and, for function calls, `call_id` / `arguments` |
| `conversation.item.truncate` | Remove the unplayed portion of the model's last response after a user interruption (WebSocket only — WebRTC/SIP truncate server-side) |
| Voice options | `alloy`, `ash`, `ballad`, `coral`, `echo`, `sage`, `shimmer`, `verse`, `marin`, `cedar` (recommended: `marin`/`cedar`) |

## Notes

- Max session duration is 60 minutes.
- WebRTC handles audio media automatically via peer-connection tracks; WebSocket requires manually appending Base64 PCM16 chunks with `input_audio_buffer.append` (max 15 MB/chunk) and committing with `input_audio_buffer.commit`.
- `gpt-realtime-2` / `gpt-realtime` support image input via `input_image` content parts (base64 data URL).
- Out-of-band responses (`response.conversation: "none"`) don't join the default conversation — use `metadata` to correlate their `response.done` event.
- VAD is on by default; disabling it (`turn_detection: null`) requires manually sending `input_audio_buffer.commit` and `response.create`, and is the basis for push-to-talk interfaces.
- Function calling: configure `tools` in `session.update`/`response.create`, detect `function_call` items in `response.done` or `response.function_call_arguments.delta`, then reply with a `function_call_output` conversation item + `response.create`.
- Errors arrive as a server `error` event; include a client-side `event_id` on outgoing events to correlate failures.

## Related

- [Overview](./overview.md)
- [WebRTC connection](./webrtc.md)
- [WebSocket connection](./websocket.md)
- [Voice activity detection](./vad.md)
- [Tools and MCP](./tools-mcp.md)
- [Voice agents](./voice-agents.md)
