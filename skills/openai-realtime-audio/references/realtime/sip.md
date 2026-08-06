# Realtime API with SIP

Connect phone calls to the Realtime API via SIP trunking (e.g. through Twilio), for telephony voice agents.

## Signature / Usage

```text
SIP endpoint: sip:$PROJECT_ID@sip.api.openai.com;transport=tls
(EU data residency variant available)
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

- Requires a webhook configured in project settings to receive `realtime.call.incoming`; SIP webhook payload/signature verification follows the same pattern as other OpenAI webhooks (see openai-api-core's webhooks-errors reference for the general webhook mechanics — not duplicated here).
- Network requirements: outbound TCP/TLS on port 5061 for SIP signaling, bidirectional UDP for SRTP media to OpenAI's published CIDR ranges.
- In WebRTC/SIP connections, the server manages the output audio buffer and auto-truncates unplayed audio on interruption (unlike WebSocket, where the client must truncate manually).
- For server-side control of an active SIP call (business logic, tool calls) without exposing it to the caller's client, see the sideband pattern in [Server-side controls](./server-controls.md).

## Related

- [Overview](./overview.md)
- [Server-side controls](./server-controls.md)
- [Conversations](./conversations.md)
