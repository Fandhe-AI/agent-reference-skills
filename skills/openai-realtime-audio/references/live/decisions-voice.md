# Connect voice to Decisions

Use the native Decisions API integration in GPT-Live to make low-latency decisions while the user is still speaking, either by letting Live delegate to Decisions (`session.delegation`) or by reacting to transcript deltas (`session.triggers`).

## Signature / Usage

Native delegation, placed under `session` in the WebRTC session request (alongside `transport`):

```json
{
  "model": "gpt-live-1",
  "instructions": "Delegate requests to warm the cabin or clear windshield fog, and questions about windshield fogging. Wait for the app to report the result before describing it.",
  "delegation": {
    "type": "decisions",
    "decisions": {
      "model": "gpt-6-luna",
      "questions": [
        {
          "type": "choice",
          "name": "cabin_temperature",
          "instructions": "Choose increase if the driver asks to make the cabin warmer. Otherwise choose none.",
          "choices": [{ "value": "increase" }, { "value": "none" }]
        }
      ]
    }
  }
}
```

Add context for Decisions after `session.started` (wait for `decision.item.created`):

```json
{
  "type": "decision.item.create",
  "event_id": "evt_cabin_70",
  "item": {
    "type": "message",
    "role": "user",
    "content": [
      { "type": "input_text", "text": "Cabin set to 70°F. Windshield defogger off." }
    ]
  }
}
```

Transcript trigger (added to `session.triggers`):

```json
{
  "type": "decisions",
  "event_type": "session.input_transcript.delta",
  "decisions": {
    "questions": [
      {
        "type": "choice",
        "name": "expression",
        "instructions": "Choose your expression as you listen to the person's latest words.",
        "choices": [
          { "value": "neutral" },
          { "value": "happy" },
          { "value": "sad" },
          { "value": "concerned" }
        ]
      }
    ]
  }
}
```

Trigger result:

```json
{
  "type": "decision.event",
  "delegation_id": null,
  "trigger_id": "trg_listening_1",
  "source_event_type": "session.input_transcript.delta",
  "source_event_id": "evt_input_42",
  "event": {
    "type": "decision.completed",
    "decision": {
      "answers": [
        { "type": "choice", "name": "expression", "choice": "happy" }
      ]
    }
  }
}
```

## Options / Props

| Event / field | Description |
|---------------|-------------|
| `session.delegation.type: "decisions"` | Native delegation; Live calls Decisions directly (fixed for the session) |
| `delegation.decisions.model` | Decisions model; the example uses `gpt-6-luna` |
| `delegation.decisions.questions[]` | `type: "choice"`, `name`, `instructions`, `choices[].value`; one request answers all questions independently |
| `session.triggers[]` | `type: "decisions"`, `event_type` (`session.input_transcript.delta` or `session.output_transcript.delta`), `decisions.questions`; Live supplies the model and trigger ID |
| `decision.item.create` / `decision.item.created` | Add context item; keep the returned `item.id` |
| `decision.item.delete` / `decision.item.deleted` | Remove old state before adding the new state |
| `decision.event` | Result; fields `delegation_id`, `trigger_id`, `source_event_type`, `source_event_id`, `event.type` `decision.completed`, `event.decision.answers` |
| `session.update` / `session.updated` | Change questions mid-session; wait for `session.updated` before adding a decision item |

## Notes

- Decisions API is in public beta (the Decisions guide states GA is expected "in the coming weeks" and that `gpt-6-luna` is currently the only available model, via the dedicated `POST /v1/decisions` endpoint). Requires `api.decisions.write` permission; the Responses call in the example needs `api.responses.write`. No Decisions-specific alpha header is needed.
- Native delegation skips the round trip through your app; with custom (client) delegation, Live notifies your app, which then calls Decisions.
- Save `delegation.id` from `session.delegation.created`; on the `decision.event` with that `delegation_id`, read `event.decision.answers` by question name. An answer of `none` is a no-op for that action. Report results with `session.commentary.append` and the delegation ID.
- If you filter WebRTC events, allow both `session.delegation.created` and `decision.event`; for triggers also allow the matching transcript event (Live only delivers a trigger result when its source transcript event is allowed).
- Transcript triggers run independently of delegation. Match `source_event_id` to the transcript delta; Live can combine pending deltas and results can arrive out of order, so apply the newest relevant result per direction and drive mouth movement from the audio.
- Example Responses explanation request in the guide uses model `gpt-6.1-sol` against `https://api.openai.com/v1/responses`.
- Source: https://developers.openai.com/api/docs/guides/decisions-voice

## Related

- [Overview](./overview.md)
- [Delegation](./delegation.md)
- [Sessions](./sessions.md)
- [Events](./events.md)
