# Safety in Building Agents

Risk types and mitigations for multi-agent workflows built with Agent Builder.

OpenAI is deprecating Agent Builder (shutdown scheduled November 30, 2026); ChatKit remains available. See the deprecations page for the current timeline.

## Types of risk

- **Prompt injections** — untrusted text/data enters the system and malicious content attempts to override instructions, e.g. exfiltrating data via downstream tool calls or taking misaligned actions.
- **Private data leakage** — an agent shares more data than intended with a connected tool/MCP, even without an attacker; guardrails limit but do not fully control what the model shares.

## Mitigations

- **Don't use untrusted variables in developer messages** — developer messages take precedence over user/assistant messages, so route untrusted input through user messages instead.
- **Use structured outputs to constrain data flow** — enums, fixed schemas, and required field names eliminate freeform channels attackers can exploit between nodes.
- **Steer with clear guidance and examples** — document desired policies and provide examples for ambiguous/unintended scenarios.
- **Use GPT-5 or GPT-5-mini** at the agent node level for stronger instruction-following and jailbreak/injection resistance.
- **Keep tool approvals on** for MCP tools — use the [human approval node](https://developers.openai.com/api/docs/guides/node-reference#human-approval) so users confirm every operation, including reads.
- **Use guardrails** ([node-reference#guardrails](https://developers.openai.com/api/docs/guides/node-reference#guardrails)) to redact PII and detect jailbreak attempts on user input.
- **Run trace graders and evals** to catch and prevent agent mistakes across decisions, tool calls, and reasoning steps.

## Notes

- Structured outputs and isolation greatly reduce, but don't fully remove, risk when agents process arbitrary text that influences tool calls.
- Design workflows so untrusted data never directly drives agent behavior — extract only validated structured fields from external inputs.

## Related

- [Safety best practices](./safety-best-practices.md)
- [Cybersecurity checks](./cybersecurity-checks.md)
