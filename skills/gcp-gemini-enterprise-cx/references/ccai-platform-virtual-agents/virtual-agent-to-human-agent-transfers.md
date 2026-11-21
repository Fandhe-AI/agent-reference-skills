---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/virtual-agent-to-human-agent-transfers
---

# Virtual Agent to Human Agent Transfers

Use custom payloads with Gemini Enterprise for Customer Experience or Dialogflow to transfer a voice session directly to a human agent, identified by extension number or agent ID. Transferring directly eliminates the intermediate step of transferring to a queue, which can improve wait times and customer satisfaction. Human agents can see conversation history in the call adapter when virtual agents transfer calls.

## Signature / Usage

### Custom payload using an agent extension

```text
{
  "ujet": {
    "type": "action",
    "action": "direct",
    "escalation_reason": "ESCALATION_REASON",
    "allow_virtual_agent": false,
    "agent_extension": AGENT_EXTENSION,
    "fallback_menu": FALLBACK_MENU,
    "language": "LANGUAGE"
  }
}
```

Replace the following:

- `ESCALATION_REASON`: possible values: `by_virtual_agent` (a planned transfer), `by_consumer` (an escalation).
- `AGENT_EXTENSION`: the extension number of the agent to transfer the call to.
- `FALLBACK_MENU`: the menu ID for the queue to fall back to if the transfer fails.
- `LANGUAGE`: the queue language to fall back to. Default: the virtual agent's current language.

### Custom payload using an agent ID

```text
{
  "ujet": {
    "type": "action",
    "action": "direct",
    "escalation_reason": "ESCALATION_REASON",
    "allow_virtual_agent": false,
    "agent_id": AGENT_ID,
    "fallback_menu": FALLBACK_MENU,
    "language": "LANGUAGE"
  }
}
```

Replace `AGENT_ID` with the agent ID of the agent to transfer the call to; the other placeholders are as above.

## Notes

- Deflections: if you've configured queue-level deflections for after hours or overcapacity, Google recommends using agent extensions to transfer calls. Transfers using agent extensions support deflections; transfers using agent IDs don't. Google recommends an agent extension when possible.
- Fallback behavior: if a transfer fails (for example, the agent extension number or agent ID is invalid), the first fallback transfers the end-user to the queue of the current session. If that fails (for example, no human agents are assigned to the queue), the second fallback transfers the end-user to the queue specified by `fallback_menu` in the custom payload. If that fails, the call ends.
- Reporting: an `escalation_reason` of `by_virtual_agent` appears as **Planned Transfers**; `by_consumer` appears as **Escalated**.
- The payloads are tagged `text` because `AGENT_EXTENSION`, `AGENT_ID` and `FALLBACK_MENU` are unquoted placeholders in the source.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/virtual-agent-to-human-agent-transfers (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [va-custom-payload.md](./va-custom-payload.md)
- [assign-virtual-agents-to-queues.md](./assign-virtual-agents-to-queues.md)
