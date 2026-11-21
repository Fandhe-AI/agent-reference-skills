---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/guardrail
---

# Guardrails and Supervisor Agents

Guardrails are checks and balances that provide content restrictions for model input and output. Each agent application gets default guardrails you can modify (guardrails button on the right side of the agent builder). Types: prompt guard, blocklist, safety, rules, and supervisor agents.

## Signature / Usage

### Rule with code behavior (`after_model_callback`)

`CallbackContext`, `LlmResponse` and `Optional` are used without imports: the [Callbacks](./callback.md) page of the official docs says only that "In your Python callback code, you have access to certain classes and functions that help you write the code" (see the Python runtime reference (https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/reference/python)), and whether these names need imports is not stated in the official docs; the example assumes the CX Agent Studio Python runtime provides them.

A rule with **Code** behavior is code for an `after_model_callback` callback. The example below is the skeleton of that callback from the Callbacks page, not a working guardrail: it implements no check and always returns `None`, and returning `None` makes the agent use the model's response as-is, so registering it unchanged does not inspect or restrict any output. Put your own check in the body and return a replacement `LlmResponse` when the check fails. The official docs give no guardrail check; the Callbacks page shows how an `after_model_callback` builds and returns a replacement `LlmResponse` (see the custom payload example in [callback.md](./callback.md)).

```python
def after_model_callback(
  callback_context: CallbackContext,
  llm_response: LlmResponse
) -> Optional[LlmResponse]:
  """
  This callback executes *after* a response has been received from the LLM,
  but before the agent processes it.

  The `llm_response` parameter contains the actual data from the LLM.
  By returning `None`, we are approving this response and allowing the agent
  to use it as-is.

  If we returned a new `LlmResponse` object, it would *replace* the original,
  which is useful for redacting sensitive information, enforcing output
  formatting, or adding disclaimers.
  """
  # Returning None allows the LLM's actual response to be used.
  return None
```

## Notes

- Every guardrail type has an outcome setting that controls what happens when the guard is triggered. Outcomes: **Say exactly** (provide the exact agent response), **Handoff to an agent** (transition control to a specific agent), **Generate a response** (provide instructions to generate a response; a default is supplied which you can override).
- Safety levels: **Relaxed** (prioritize flexible generation and low latency; never engage with illicit or harmful prompts; always block explicitly harmful content), **Balanced** (prioritize safe and natural interactions with customers; always stop unsafe content; never engage with harmful prompts), **Strict** (prioritize deep harm filtering; never allow generated content with sensitive elements; always push back against harmful prompts).
- Prompt guard: basic protection against prompt-based attacks like "ignore your instructions and ..."; settings are enable prompt guard, outcomes, and **Custom** (a custom security prompt for screening queries).
- Blocklist: prevents users and your agent from using certain words and phrases. Matching method: **Whole words**, **Any mention** (content that contains words and phrases) or **Regex pattern**. Block words and phrases are comma-separated. Block content on user input, on agent response, or both. Optional name and description.
- Safety: enforces Responsible AI practices; settings are the safety level, outcomes and **Custom** (individually adjust or disable specific safety guardrail levels).
- Rules: build your own guardrails with behavior **Natural** (natural language instructions) or **Code** (code for an `after_model_callback` callback), outcomes, and optional name and description.
- Supervisor agents monitor the active agent that is interacting with the end-user (proper tool calls, good audio quality). When one detects an issue it can trigger an outcome; trigger events appear on the monitoring dashboard.
- Audio quality supervisor settings: name, notes, detection mode (Blocking: the active agent response is blocked until the supervisor finishes assessment; Non-Blocking: the active agent proceeds while the supervisor continues assessing), issue type (Audio mismatch: generated audio and text do not match; Speaker shift: synthesised voice sounds different over time; Missing tool call: model should make a tool call in the conversation context but did not), outcomes.
- Missed tool call supervisor settings: name, notes, detection mode (Blocking or Non-Blocking), outcomes.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/callback (the `after_model_callback` skeleton, shown verbatim; it returns `None` unconditionally and performs no check)
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/guardrail (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [callback.md](./callback.md)
- [agent.md](./agent.md)
