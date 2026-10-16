# Migrate to GPT-Live

Migrate a Realtime API voice application or a text agent / chained (STT -> agent -> TTS) pipeline to GPT-Live: split prompts between voice model and backend, adapt connection and audio lifecycle, function handlers, and guardrails.

## Signature / Usage

Realtime function result (before) versus GPT-Live (after):

```json
{
  "type": "conversation.item.create",
  "item": {
    "type": "function_call_output",
    "call_id": "call_availability",
    "output": "{\"available\":true,\"slot_id\":\"slot_friday_14\",\"booked\":false}"
  }
}
```

```javascript
connection.send({
  type: "response.item.create",
  event_id: "availability_result_1",
  item: {
    type: "function_call_output",
    call_id: "call_availability",
    output: '{"available":true,"slot_id":"slot_friday_14","booked":false}',
  },
});
// after submitting every required result:
connection.send({ type: "response.create", event_id: "continue_availability_1" });
```

Client delegation adapter (text agent path):

```javascript
async function handleDelegation(event, app) {
  if (
    event.type !== "session.delegation.created" ||
    event.delegation?.target !== "client"
  )
    return;

  const context = app.readContext();
  if (!context) return; // Retain the notice; resolve the request before acting.

  const summary = await app.runAgent({
    revision: context.revision,
    recentConversation: context.recentConversation,
    task: context.task,
  });

  if (app.currentRevision() !== context.revision) return;

  app.send({
    type: "session.commentary.append",
    event_id: crypto.randomUUID(),
    delegation_id: event.delegation.id,
    content: summary,
  });
}
```

## Options / Props

Realtime to GPT-Live event mapping:

| Existing Realtime behavior | GPT-Live adaptation |
|----------------------------|---------------------|
| Send WebSocket audio with `input_audio_buffer.append` | Send `session.input_audio.append` (base64 raw audio in `audio`) |
| Play `response.output_audio.delta` | Play `session.output_audio.delta` `delta`, in order |
| Commit audio or create a response for manual turn control | Stream audio continuously; GPT-Live decides when to speak; remove manual commits and voice-turn triggers |
| Track `response.output_audio.done` / `response.done` | No equivalent end-of-spoken-response event; track playback in your client |
| User captions from input transcription events | Append `session.input_transcript.delta` |
| Assistant captions from `response.output_audio_transcript.delta` | Append `session.output_transcript.delta` |

Function handler migration:

| Step | Realtime API | GPT-Live with Responses delegation |
|------|--------------|-------------------------------------|
| Receive completed call | `response.output_item.done` | Unwrap `response.event`, read inner `response.output_item.done` |
| Identify and execute | `name`, `arguments`, `call_id` | Keep handler; preserve outer `delegation_id` and backend response ID |
| Return result | `conversation.item.create` | `response.item.create` |
| Continue | `response.create` | `response.create` to continue backend work |

Tool definitions move from Realtime `session.tools` / `response.tools` to `delegation.responses.tools`; tool selection moves to `delegation.responses.tool_choice` and `delegation.responses.parallel_tool_calls`.

## Notes

- Choose a path: from Realtime API (current voice model selects tools) or from a text agent / chained pipeline (keep the agent, add GPT-Live as voice interface). Either delegation mode supports either path.
- Before migrating, record tools and business rules, input types (audio, typed text, images), decisions that depend on audio, speech and playback rules, permissions and guardrails, durable state, and baseline conversations.
- Split the prompt: speaking style, turn-taking, and delegation rules go in `session.instructions`; task procedures and tool usage go in the backend prompt (`session.delegation.responses.instructions`, or your existing agent for client delegation). Keep safety and privacy limits in both prompts. Function names and tool schemas belong in the backend. Review both prompts for conflicting instructions and verify each required action (e.g. end call) has an implementation.
- For the initial migration set `parallel_tool_calls` to `false`; collect each function call from the inner `response.output_item.done` and keep its name, arguments, and `call_id`; the arguments-done event alone lacks them.
- Keep authoritative state (selected slot, confirmed slot, permissions, active operation, outcome) in your application; Live history can be compacted. Version the task (e.g. revision 2) so outdated results are recognized; if a pending call is declined because the request changed, still submit a result for every required call.
- Audio-dependent decisions (e.g. voicemail detection): delegation does not automatically send audio to your backend; route audio to an audio-capable detector explicitly (one option is a separate Realtime session alongside GPT-Live).
- Text agent path: `session.delegation.created` contains an ID and timing, no request text; build agent input from transcripts and task records, record the delegation ID so only one handler starts work, check revision before announcing results. Adapter results are at most 500 tokens.
- Guardrails: monitor transcripts, block tools and external actions in application code, send `session.instructions.append` to redirect, record the decision. A corrective instruction cannot retract audio already heard; pre-playback checks need your own buffering in the audio path. Choosing Responses delegation does not by itself require a sideband.
- Validate by comparing representative conversations: actions and confirmations, corrections and duplicate prevention, permissions, guardrail interventions, interruptions, failures and reconnects.
- Source: https://developers.openai.com/api/docs/guides/live-migration

## Related

- [Overview](./overview.md)
- [Prompting](./prompting.md)
- [Delegation](./delegation.md)
- [Server-side controls](./server-controls.md)
- [Sessions](./sessions.md)
