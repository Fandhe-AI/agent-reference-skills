---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/handoff
---

# Handoff Rules

Handoff rules deterministically control transfers between parent and child agents by defining conditions. A transfer can be forced immediately when a condition is met, or blocked until a condition is met. Instructions give similar but non-deterministic control; callbacks require writing code.

## Signature / Usage

### Advanced code option

`CallbackContext` is used without an import: the [Callbacks](./callback.md) page of the official docs says only that "In your Python callback code, you have access to certain classes and functions that help you write the code" (see the Python runtime reference (https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/reference/python)), and whether it needs an import is not stated in the official docs; the example assumes the CX Agent Studio Python runtime provides it.

```python
def should_trigger_transfer_callback(callback_context: CallbackContext) -> bool:
  # Access session variables using callback_context:
  # callback_context.variables['variable_name]
  return True
```

## Notes

- Example: Agent A transfers to Agent B when a user is authenticated or to Agent C when the user is unauthenticated.
- Forward handoffs (agent to subagent): route authenticated or unauthenticated users to different agents; understand intent and steer to the right agent; direct high-stakes requests (for example financial transfers, PII handling) to specific agents. Backward handoffs (subagent to agent): retry failed authentication, loop back for more information, re-qualify after changed requirements, iterative troubleshooting.
- Configure in the agent builder: click **+** under an agent node, **Add handoff rules**, select a child agent, select the direction (to parent or to child), define conditions on variables or use the advanced code option, **Save**.
- Limitation: multiple variable conditions (one per variable) can be joined by AND or OR, but only one operator for all conditions; to mix operators and group conditions use the Python code option or the API.
- Limitation: only text, number and boolean variable types are supported for variable checks (list and custom object types are not).
- Limitation: a rule that blocks handoffs can only use variables for its condition (not code).
- A complex condition created through the API (multiple ANDs/ORs, grouping) appears read-only in the UI and can only be modified through the API.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/handoff (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent.md](./agent.md)
- [callback.md](./callback.md)
- [variable.md](./variable.md)
