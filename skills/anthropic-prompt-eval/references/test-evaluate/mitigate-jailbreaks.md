<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks / last verified: 2026-08-07 -->

# Mitigate jailbreaks and prompt injections

Defend your application against jailbreaks and prompt injection with input screening, hardened system prompts, and safe handling of untrusted tool content.

Jailbreaking and prompt injection attempt to make Claude ignore its guidelines or your instructions. Claude is inherently resilient, but these mitigations strengthen guardrails further. Two distinct threat models:

- **Jailbreaks and direct prompt injection** — the *user* of the application is the adversary, crafting inputs to bypass guardrails.
- **Indirect prompt injection** — the user is trusted, but Claude processes *third-party content* (web pages, emails, documents, tool results) containing adversarial instructions.

## Jailbreaks and direct prompt injection

- **Harmlessness screens** — pre-screen user input with a lightweight model (Claude Haiku 4.5) constrained via [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) to a simple `{"is_harmful": boolean}` classification.
- **Input validation** — filter for known injection patterns before input reaches Claude; an LLM can build a generalized validation screen from example jailbreak language.
- **Prompt engineering** — craft system prompts emphasizing ethical/legal boundaries and explicit refusal wording, framed predominantly as a [role prompt](../prompt-engineering/claude-prompting-best-practices.md).
- **Respond to repeat offenders** — throttle or ban users who repeatedly trigger the same refusal category.

## Indirect prompt injection

Structure the application so Claude can reliably distinguish untrusted content from instructions:

- **Put untrusted content only in tool results** — never in `system` prompts or plain user `text` blocks; Claude is trained to treat instructions inside `tool_result` blocks with appropriate skepticism.
- **Tell Claude what the content is and where it came from** — in the tool `description` or result structure, state the nature/source explicitly (for example, "body of an inbound email from an unknown sender").
- **State the policy in the system prompt** — explicitly declare that tool/document/search content is untrusted data that must never override the system prompt or user's original request.
- **JSON-encode untrusted content** — wrapping third-party strings in a JSON object provides unambiguous delimiters, preventing an attacker from "breaking out" via quote/tag closure.
- **Don't put your own instructions in tool results** — Claude treats tool-result content as data; send instructions in a following `user` turn, or use a mid-conversation system message on supported models.
- **Limit Claude's access to sensitive data and actions** — least privilege, sandboxed tool execution, narrowly scoped permissions.
- **Screen tool outputs before Claude acts on them** — run raw tool output through a lightweight-model classifier (structured outputs, `{"injection_suspected": boolean}`) before returning it as a `tool_result`; on a positive, return an error or stripped summary instead of the raw content.
- **Red-team your own agent** — test with documents/emails/tool outputs deliberately containing injection attempts before deploying.

```json
{
  "output_config": {
    "format": {
      "type": "json_schema",
      "schema": {
        "type": "object",
        "properties": { "injection_suspected": { "type": "boolean" } },
        "required": ["injection_suspected"],
        "additionalProperties": false
      }
    }
  }
}
```

## Continuous monitoring

Regularly analyze outputs for signs of successful injection to iteratively refine prompts, validation, and filtering.

## Advanced: Chain safeguards

Combine multiple layers for robust protection — for example a financial-advisor bot whose system prompt requires screening every query with a `harmlessness_screen` tool (itself a structured-output boolean classification against regulatory/privacy rules) before processing.

## Notes

- The [computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) runs additional classifiers that detect prompt injection in screenshots and prompt for user confirmation — see that page (anthropic-api-core) for opt-out details.
- Structured Outputs schema mechanics are documented in anthropic-api-core; this page covers the guardrail-design pattern only.

## Related

- [handle-streaming-refusals](./handle-streaming-refusals.md)
- [reduce-prompt-leak](./reduce-prompt-leak.md)
