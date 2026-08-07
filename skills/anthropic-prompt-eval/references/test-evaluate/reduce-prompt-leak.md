<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-prompt-leak / last verified: 2026-08-07 -->

# Reduce prompt leak

Reduce the risk of prompt leaks by separating context from user queries, filtering Claude's outputs, and auditing prompts, without degrading task performance.

Prompt leaks can expose sensitive information expected to be "hidden" in a prompt. No method is foolproof, but the strategies below significantly reduce risk.

## Before you try to reduce prompt leak

Use leak-resistant techniques only when absolutely necessary — added complexity can degrade performance elsewhere in the task. Test thoroughly if implemented. Try monitoring techniques (output screening, post-processing) first to catch leak instances.

## Strategies to reduce prompt leak

- **Separate context from queries** — isolate key information/context in the system prompt (still predominantly a role prompt); emphasize key instructions again in the `User` turn, and reemphasize by prefilling the `Assistant` turn (prefilling **not supported on Claude 4.6+ and Claude Mythos Preview**).
- **Use post-processing** — filter outputs for keywords indicating a leak via regex, keyword filtering, or a prompted LLM filter for nuanced leaks.
- **Avoid unnecessary proprietary details** — omit anything Claude doesn't need for the task; extra content distracts from "no leak" instructions.
- **Regular audits** — periodically review prompts and outputs for potential leaks.

## Notes

- The goal is not just preventing leaks but maintaining performance — overly complex leak-prevention can degrade results; balance is key.

## Related

- [mitigate-jailbreaks](./mitigate-jailbreaks.md)
- [increase-consistency](./increase-consistency.md)
