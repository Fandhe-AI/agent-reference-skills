# Latency Optimization

Seven principles for reducing latency across LLM-based applications, applicable from a single workflow to an end-to-end chatbot.

## Seven principles

1. **Process tokens faster** — inference speed (TPM/TPS) is mainly driven by model size; smaller models run faster/cheaper. Maintain quality with a longer/more detailed prompt, more few-shot examples, or fine-tuning/distillation. [Predicted outputs](https://developers.openai.com/api/docs/guides/predicted-outputs) reduce latency when most of the output is known ahead of time (e.g. code editing).
2. **Generate fewer tokens** — output generation is usually the largest latency contributor; cutting ~50% of output tokens cuts roughly ~50% of latency. Ask for conciseness for natural language; minimize structured-output syntax (short field names, omit named args); cap generation length with `max_output_tokens` (Responses API) or `max_completion_tokens` (Chat Completions) — a stop-sequence parameter is model/endpoint dependent, not a uniform `stop` across both APIs.
3. **Use fewer input tokens** — has a much smaller effect (cutting 50% of prompt may only yield 1–5% latency improvement). For massive contexts: fine-tune to replace lengthy instructions, filter/prune context input, and maximize the shared prompt prefix (put dynamic content later) to be KV-cache/prompt-cache friendly.
4. **Make fewer requests** — combine sequential steps into a single prompt/response (e.g. return named JSON fields) instead of one round trip per step.
5. **Parallelize** — run independent steps concurrently; for sequential steps, use speculative execution (start both, verify the first, cancel the second if the guess was wrong) — effective for classification steps like moderation.
6. **Make users wait less** — streaming is the single most effective technique (cuts perceived wait to ~1s); chunk output that needs backend processing before display; surface intermediate steps and loading states.
7. **Don't default to an LLM** — hard-code highly constrained outputs (confirmations, refusals), pre-compute responses for constrained inputs, use classical UI for summarized metrics/reports, and apply traditional techniques (binary search, caching, hash maps).

## Notes

- The guide walks through a worked example (a customer-service bot) applying: combining prompts to reduce requests, switching sub-tasks to a smaller/fine-tuned model, splitting and parallelizing reasoning vs. final-response generation, and shortening structured-output field names.
- Prompt caching mechanics referenced by principle 3 are covered by openai-api-core; not duplicated here.

## Related

- [Cost optimization](./cost-optimization.md)
- [Deployment checklist](./deployment-checklist.md)
- [Fast mode](./fast-mode.md)
