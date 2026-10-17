---
source: https://ai.google.dev/gemini-api/docs/prompting-strategies
---

# Prompt design strategies

Basic concepts, strategies, and best practices for designing prompts for Gemini models, including Gemini 3 and agentic-workflow guidance.

## Signature / Usage

Gemini 3 structured prompt example (XML tags), verbatim:

```text
<role>
You are a helpful assistant.
</role>

<constraints>
1. Be objective.
2. Cite sources.
</constraints>

<context>
[Insert User Input Here - The model knows this is data, not instructions]
</context>

<task>
[Insert the specific user request here]
</task>
```

Markdown variant:

```text
# Identity
You are a senior solution architect.

# Constraints
- No external libraries allowed.
- Python 3.11+ syntax only.

# Output format
Return a single code block.
```

Grounding clause for Gemini 3 Flash system instructions:

```text
You are a strictly grounded assistant limited to the information provided in
the User Context. In your answers, rely **only** on the facts that are
directly mentioned in that context. You must **not** access or utilize your
own knowledge or common sense to answer. Do not assume or infer from the
provided facts; simply report them exactly as they appear. Your answer must
be factual and fully truthful to the provided text, leaving absolutely no
room for speculation or interpretation. Treat the provided context as the
absolute limit of truth; any facts or details that are not directly
mentioned in the context must be considered **completely untruthful** and
**completely unsupported**. If the exact answer is not explicitly written in
the context, you must state that the information is not available.
```

## Options / Props

Common model parameters:

| Name | Type | Description |
|------|------|-------------|
| Max output tokens | integer | Maximum tokens in the response; a token is approximately four characters, 100 tokens is roughly 60-80 words |
| Temperature | number | Randomness in token selection; 0 is deterministic |
| `topK` | integer | Select from the K most probable tokens; 1 is greedy decoding |
| `topP` | number | Select from most to least probable until probabilities sum to `topP`; default `0.95` |
| `stop_sequences` | array | Character sequences that stop generation |

Gemini 3 core principles:

| Principle | Guidance |
|-----------|----------|
| Be precise and direct | State the goal clearly; avoid unnecessary or overly persuasive language |
| Consistent structure | Use XML-style tags or Markdown headings; choose one format per prompt |
| Define parameters | Explain ambiguous terms or parameters |
| Control verbosity | Gemini 3 answers directly by default; explicitly request conversational or detailed output |
| Multimodal inputs | Treat text, images, audio, video as equal-class inputs and reference each |
| Prioritize critical instructions | Put constraints, persona, and output format in the System Instruction or at the very start of the user prompt |
| Long contexts | Supply all context first, then place the question at the very end |
| Anchor context | Use a transition such as "Based on the information above..." |

## Notes

- Availability: model-agnostic prompt guidance, applies to both APIs.
- Prefer the structured output feature over prose instructions when specifying a complex JSON Schema.
- Recommendation: always include few-shot examples; keep format consistent across examples; too many examples may overfit the response.
- For Gemini 3.x models, keep `temperature`, `top_p`, `top_k` at defaults; changing them (for example temperature below 1.0) can cause looping or degraded performance, particularly in complex math or reasoning tasks.
- Gemini 2.5 and 3 series generate internal thinking, so it is generally unnecessary to have the model write out its reasoning; "Think very hard before answering" can help at the cost of extra thinking tokens.
- Break down complex prompts: split instructions, chain prompts, aggregate parallel responses.
- Fallback responses appear when a safety filter triggers; try increasing the temperature (advice for earlier models only; see the Gemini 4 / 3.6+ note below).
- Gemini 4 and Gemini 3.6+ models ignore custom `temperature`, `top_p`, and `top_k` values and return deprecation warning headers; remove these parameters for those models (the temperature advice above applies only to earlier models).
- Enable Grounding with Google Search for obscure or recent facts, and the code execution tool for arithmetic, counting, or calculation.
- Agentic prompting dimensions: reasoning and strategy (logical decomposition, problem diagnosis, information exhaustiveness), execution and reliability (adaptability, persistence and recovery, risk assessment), interaction and output (ambiguity and permission handling, verbosity, precision and completeness). The guide includes a full system instruction template for agent benchmarks (not reproduced here).
- Gemini 3 Flash system-instruction clauses in the guide: current-day accuracy (states it is 2026), knowledge cutoff (`Your knowledge cutoff date is January 2025.`), and the grounding clause above.
- Provider-neutral prompt guidance for other APIs is in `openai-api-core` and `anthropic-prompt-eval`; this page is Gemini-specific.

## Related

- [Text generation](./text-generation.md)
- [Structured outputs](./structured-output.md)
- [Thinking](./thinking.md)
