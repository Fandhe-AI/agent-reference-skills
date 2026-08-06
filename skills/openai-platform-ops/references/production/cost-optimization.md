# Cost Optimization

Strategies for reducing OpenAI API spend beyond basic prompt/token hygiene.

## Strategies

- **Reduce requests and tokens** — limit unnecessary API calls; lower input token count and optimize for shorter outputs. Usually improves latency simultaneously.
- **Model selection** — choose smaller models where accuracy requirements allow, balancing affordability and performance.
- **Batch API** — collect requests into a single file and kick off an asynchronous batch processing job; retrieve results when complete, at reduced cost vs. synchronous calls.
- **Flex processing** — significantly lower cost for Chat Completions/Responses requests, trading off increased latency and occasional unavailability. Suited to non-production workloads like evals and data enrichment, not latency-sensitive production traffic.

## Notes

- rate limits and error-handling patterns are covered by openai-api-core, not duplicated here.
- Prompt caching (`prompt_cache_key`, cache breakpoints) is covered by openai-api-core; see the [Deployment checklist](./deployment-checklist.md) for its production-tuning guidance.

## Related

- [Latency optimization](./latency-optimization.md)
- [Deployment checklist](./deployment-checklist.md)
- [Model optimization](./model-optimization.md)
- [Managing Realtime API costs](./realtime-costs.md)
