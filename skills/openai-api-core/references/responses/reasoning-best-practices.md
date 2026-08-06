# Reasoning best practices

Guidance on choosing between reasoning (o-series) models and GPT models, and how to prompt reasoning models effectively.

## Signature / Usage

```python
response = client.responses.create(
    model="gpt-5.6",
    store=True,
    input=[{"role": "developer", "content": "Formatting re-enabled\nBe concise."}],
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| store | boolean | true | Recommended `true` with `previous_response_id` (or replaying prior output items) so relevant reasoning items are automatically kept in context around function calls |

## Notes

- Reasoning (o-series) models excel at ambiguous tasks, large-document synthesis, multistep agentic planning, visual reasoning, code review, and evaluation/benchmarking of other model outputs. GPT models are faster/cheaper and best for well-defined, latency-sensitive execution. Most workflows combine both: reasoning model as planner, GPT model as executor.
- Prompting reasoning models: keep prompts simple and direct, avoid "think step by step" chain-of-thought instructions (reasoning happens internally), use delimiters (markdown/XML) for structure, try zero-shot before few-shot, state constraints and end goals explicitly.
- Since `o1-2024-12-17`, reasoning models support `developer` messages instead of `system` messages, and avoid markdown formatting in responses by default — include `Formatting re-enabled` on the first line of the developer message to opt back in.
- With `o3`/`o4-mini` and later, some reasoning items adjacent to function calls are automatically included in context (unlike `o1`/`o3-mini`/`o1-mini`, where reasoning items were always ignored on follow-up requests). Use the Responses API with `store: true` and pass back `previous_response_id` or all prior output items for best cost/accuracy.
- Chat Completions is stateless, so reasoning items are never carried in context there — this can degrade performance/token-efficiency in complex agentic, multi-function-call cases relative to the Responses API.

## Related

- [reasoning](./reasoning.md)
