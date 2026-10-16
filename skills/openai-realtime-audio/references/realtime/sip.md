# Realtime API with SIP

Connect phone calls to the Realtime API via SIP trunking (e.g. through Twilio), for telephony voice agents.

## Signature / Usage

```text
SIP endpoint:        sip:$PROJECT_ID@sip.api.openai.com;transport=tls
EU data residency:   sip:$PROJECT_ID@sip-eu.api.openai.com;transport=tls
```

## Options / Props

| Operation | Purpose |
|------|-------------|
| Webhook `realtime.call.incoming` | Delivers `call_id` and SIP headers for an inbound call |
| Accept endpoint | Approve the call and configure the Realtime session (instructions, voice, model) |
| Reject endpoint | Decline with an optional SIP status code (e.g. `486` busy) |
| WebSocket (`?call_id=...`) | Stream events / issue realtime commands against the same session |
| Refer endpoint | Transfer an active call to another destination |
| Hangup endpoint | Terminate the session |

## Notes

- Requires a webhook for incoming calls, created in platform.openai.com settings > Project > Webhooks, to receive `realtime.call.incoming`; SIP webhook payload/signature verification follows the same pattern as other OpenAI webhooks (see openai-api-core's webhooks-errors reference for the general webhook mechanics — not duplicated here).
- Network requirements (guide section "SIP signaling and media IP ranges"): `sip.api.openai.com` and `sip-eu.api.openai.com` are GeoIP-routed endpoints; allow outbound TCP/TLS to the addresses returned by DNS on port `5061`. The API specifies a separate media IP address and UDP port in the negotiated SDP; allow bidirectional SRTP over UDP to and from `13.79.45.80/28`, `23.98.140.64/28`, `40.67.149.176/28`, `40.83.204.240/28`.
- The official guide is now `guides/voice-sip` ("Telephony and SIP"). Its first half covers GPT-Live (Direct SIP, `live.transport.incoming` webhook, sideband at `wss://api.openai.com/v1/live/sessions/{session_id}/attach`, sessions created via `/v1/live/sessions`); this page covers the Realtime half. For GPT-Live see [GPT-Live SIP](../live/sip.md).
- In WebRTC/SIP connections, the server manages the output audio buffer and auto-truncates unplayed audio on interruption (unlike WebSocket, where the client must truncate manually).
- For server-side control of an active SIP call (business logic, tool calls) without exposing it to the caller's client, see the sideband pattern in [Server-side controls](./server-controls.md).

## Related

- [Overview](./overview.md)
- [Server-side controls](./server-controls.md)
- [Conversations](./conversations.md)
