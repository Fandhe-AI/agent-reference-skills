---
source: https://ai.google.dev/gemini-api/docs/live-api/session-management
---

# Session management with Live API

Strategies for session time limits and early termination: context window compression, session resumption, GoAway messages, and generation-complete signals.

## Signature / Usage

Context window compression:

```python
from google.genai import types

config = types.LiveConnectConfig(
    response_modalities=["AUDIO"],
    context_window_compression=(
        # Configures compression with default parameters.
        types.ContextWindowCompressionConfig(
            sliding_window=types.SlidingWindow(),
        )
    ),
)
```

```javascript
const config = {
  responseModalities: [Modality.AUDIO],
  contextWindowCompression: { slidingWindow: {} }
};
```

Session resumption (Python):

```python
import asyncio
from google import genai
from google.genai import types

client = genai.Client()
model = "gemini-3.8-live"

async def main():
    print(f"Connecting to the service with handle {previous_session_handle}...")
    async with client.aio.live.connect(
        model=model,
        config=types.LiveConnectConfig(
            response_modalities=["AUDIO"],
            session_resumption=types.SessionResumptionConfig(
                # The handle of the session to resume is passed here,
                # or else None to start a new session.
                handle=previous_session_handle
            ),
        ),
    ) as session:
        while True:
            await session.send_client_content(
                turns=types.Content(
                    role="user", parts=[types.Part(text="Hello world!")]
                )
            )
            async for message in session.receive():
                # Periodically, the server will send update messages that may
                # contain a handle for the current state of the session.
                if message.session_resumption_update:
                    update = message.session_resumption_update
                    if update.resumable and update.new_handle:
                        # The handle should be retained and linked to the session.
                        return update.new_handle

                # For the purposes of this example, placeholder input is continually fed
                # to the model. In non-sample code, the model inputs would come from
                # the user.
                if message.server_content and message.server_content.turn_complete:
                    break
```

JavaScript:

```javascript
config: {
  responseModalities: [Modality.AUDIO],
  sessionResumption: { handle: previousSessionHandle }
  // The handle of the session to resume is passed here, or else null to start a new session.
}

if (turn.sessionResumptionUpdate) {
  if (turn.sessionResumptionUpdate.resumable && turn.sessionResumptionUpdate.newHandle) {
    let newHandle = turn.sessionResumptionUpdate.newHandle
    // ...Store newHandle and start new session with this handle here
  }
}
```

GoAway and generation-complete messages:

```python
async for response in session.receive():
    if response.go_away is not None:
        # The connection will soon be terminated
        print(response.go_away.time_left)

async for response in session.receive():
    if response.server_content and response.server_content.generation_complete is True:
        # The generation is complete
        pass
```

```javascript
if (turn.goAway) {
  console.debug('Time left: %s\n', turn.goAway.timeLeft);
}

if (turn.serverContent && turn.serverContent.generationComplete) {
  // The generation is complete
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `contextWindowCompression` / `context_window_compression` | ContextWindowCompressionConfig | Setup field enabling compression; configure a `slidingWindow` and the number of tokens (`triggerTokens`) that triggers compression |
| `sessionResumption` / `session_resumption` | SessionResumptionConfig | Setup field; server then sends `SessionResumptionUpdate` messages; pass the last resumption token as `SessionResumptionConfig.handle` on the next connection |
| `GoAway` (`timeLeft`) | message | Signals the current connection will soon be terminated; `timeLeft` is the remaining time |
| `generationComplete` | bool | Signals that the model finished generating the response |

## Notes

- Added a `pass` placeholder to the generation-complete handler so the snippet parses (the source leaves the block body as a comment).
- Added a `server_content` presence check; messages such as tool calls, GoAway, and session-resumption updates carry no `server_content`.
- Without compression, audio-only sessions are limited to 15 minutes and audio-video sessions to 2 minutes; exceeding these terminates the session. Context window compression extends sessions to an unlimited amount of time.
- The lifetime of a connection is limited to around 10 minutes; when it terminates, the session terminates too. Session resumption keeps one session active over multiple connections.
- Resumption tokens are valid for 2 hr after the last session's termination.
- Availability: Live API is v1beta only.

## Related

- [Live API capabilities guide](./capabilities.md)
- [Ephemeral tokens](./ephemeral-tokens.md)
- [Live API best practices](./best-practices.md)
