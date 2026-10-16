# GPT-Live partner integrations

Guides for connecting existing voice frameworks and telephony providers to GPT-Live. Each partner maintains its own setup instructions and supported package versions.

## Signature / Usage

Partner guides (source URLs from the page):

```text
LiveKit       https://docs.livekit.io/agents/models/realtime/plugins/gpt-live
Twilio        https://www.twilio.com/en-us/blog/developers/twilio-openai-gpt-live-1-api-resources
Telnyx        https://developers.telnyx.com/docs/voice/sip-trunking/gpt-live-configuration-guide
Bandwidth     https://dev.bandwidth.com/docs/voice/integrations/openai/live/sip/
Daily/Pipecat https://docs.pipecat.ai/api-reference/server/services/s2s/openai-live
```

## Options / Props

| Partner | Integration |
|---------|-------------|
| LiveKit | Build GPT-Live voice agents with LiveKit's OpenAI plugin |
| Twilio | Connect incoming and outgoing phone calls to GPT-Live with Twilio Agent Connect |
| Telnyx | Build outbound calling experiences with GPT-Live and the Telnyx Voice API |
| Bandwidth | Connect incoming calls to GPT-Live over SIP with Bandwidth Universal Platform |
| Daily/Pipecat | Add GPT-Live to your application with Pipecat's OpenAI Live service |

## Notes

- Follow the partner guide for installation, credentials, and a package version that supports `gpt-live-1`. Check how it handles audio formats, interruptions, session events, backend delegation, and call termination.
- A Realtime integration is not automatically compatible with GPT-Live.
- For direct audio connections to GPT-Live, WebRTC is recommended (including from a server); WebSockets are also supported. For phone calls see the telephony and SIP guide.

## Related

- [Overview](./overview.md)
- [WebRTC](./webrtc.md)
- [WebSockets](./websocket.md)
- [SIP](./sip.md)
