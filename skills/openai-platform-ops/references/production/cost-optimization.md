# Cost Optimization

Strategies for reducing OpenAI API spend beyond basic prompt/token hygiene.

## Strategies

- **Reduce requests and tokens** — limit unnecessary API calls; lower input token count and optimize for shorter outputs. Usually improves latency simultaneously.
- **Model selection** — choose smaller models where accuracy requirements allow, balancing affordability and performance.
- **Batch API** — collect requests into a single file and kick off an asynchronous batch processing job; retrieve results when complete, at reduced cost vs. synchronous calls.
- **Flex processing** — significantly lower cost for Chat Completions/Responses requests, trading off increased latency and occasional unavailability. Suited to non-production workloads like evals and data enrichment, not latency-sensitive production traffic.

## Notes

- 12-hour prompt caching (changelog 2026-10-20): in the Responses API you can choose a 12-hour minimum cache lifetime (`"12h"`, via `prompt_cache_options.ttl` or a per-breakpoint `prompt_cache_breakpoint.ttl`) instead of the default 30 minutes (`"30m"`). For GPT-5.6 and later, a 12-hour cache write costs 2.5x the ordinary input-token rate versus 1.25x for 30 minutes; cache reads cost the same for both lifetimes. Usage details live in the openai-api-core skill. Source: https://developers.openai.com/api/docs/guides/prompt-caching and https://developers.openai.com/api/docs/changelog (fetched 2026-11-14).
- Administrators can restrict which service tiers a project may use; see [Projects](../administration/projects.md).
- rate limits and error-handling patterns are covered by openai-api-core, not duplicated here.
- Prompt caching (`prompt_cache_key`, cache breakpoints) is covered by openai-api-core; see the [Deployment checklist](./deployment-checklist.md) for its production-tuning guidance.

## Related

- [Latency optimization](./latency-optimization.md)
- [Deployment checklist](./deployment-checklist.md)
- [Model optimization](./model-optimization.md)
- [Managing Realtime API costs](./realtime-costs.md)
