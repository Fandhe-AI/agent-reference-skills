<!-- source: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency / last verified: 2026-08-07 -->

# Increase output consistency

Make Claude's outputs more consistent by specifying exact formats, prefilling responses, constraining with examples, and grounding answers in retrieval.

For guaranteed JSON schema conformance, prefer [Structured Outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) (an anthropic-api-core topic) over the prompt-engineering techniques below, which are for general consistency or cases needing more flexibility than strict schemas.

## Specify the desired output format

Precisely define the format (JSON, XML, or custom templates) so Claude follows every required element, for example specifying exact keys like `"sentiment"`, `"key_issues"`, `"action_items"` for a feedback-classification task.

## Prefill Claude's response

Prefilling the `Assistant` turn with the start of the desired format bypasses Claude's friendly preamble and enforces structure — for example prefilling `<report><summary><metric name=` to force an XML report to continue in-schema. **Not supported on Claude 4.6+ and Claude Mythos Preview**; use [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) or system-prompt instructions instead on those models.

## Constrain with examples

Provide concrete example outputs rather than abstract format instructions — more effective for getting Claude to replicate structure consistently (for example, a full worked `<competitor>` SWOT-analysis example before asking Claude to analyze new competitors in the same shape).

## Use retrieval for contextual consistency

For tasks needing consistent context (chatbots, knowledge bases), ground responses in a fixed information set via retrieval — for example instructing an IT support assistant to always check a provided `<kb>` knowledge base and cite the entry ID used before answering.

## Chain prompts for complex tasks

Break complex tasks into smaller, consistent subtasks so each gets Claude's full attention, reducing inconsistency across scaled workflows.

## Keep Claude in character

For role-based applications: use the [system prompt to set the role](../prompt-engineering/claude-prompting-best-practices.md) with detailed personality/background/traits, and prepare Claude for common scenarios with expected responses so it stays in character across diverse situations.

## Notes

- Structured Outputs (JSON schema conformance) and prefill support/removal by model generation are anthropic-api-core topics; this page covers the prompt-engineering-level techniques.

## Related

- [claude-prompting-best-practices](../prompt-engineering/claude-prompting-best-practices.md)
- [mitigate-jailbreaks](./mitigate-jailbreaks.md)
