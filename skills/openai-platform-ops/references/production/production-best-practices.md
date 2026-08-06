# Production Best Practices

Guide for transitioning OpenAI API projects from prototype to production, covering org setup, billing, key security, scaling, latency, and cost.

## Organization setup

- Manage the org via settings; invite team members as readers or owners; configure billing.
- Multiple organizations are supported; specify which org receives charges via request headers.

## Billing management

- Set spend alerts on the limits page for notifications when usage exceeds a dollar threshold.
- Hard spend limits enforce monthly caps (review the spend limits guide first).

## API key security

- Avoid exposing API keys in code or public repositories; store them in a secure location.
- Manage keys via environment variables or secret management services, not hardcoding.

## Scaling architecture

- Horizontal scaling (more servers), vertical scaling (upgrade resources), caching frequently accessed data, and load balancing to distribute requests.

## Latency optimization (summary)

- Token generation time is the bulk of latency. Select appropriate models, reduce `max_tokens`, use stop sequences, and enable streaming.
- Full detail in [Latency optimization](./latency-optimization.md).

## Cost management (summary)

- Frame cost as a function of number of tokens × cost per token; optimize model selection and reduce token consumption via prompts, fine-tuning, and caching.
- Full detail in [Cost optimization](./cost-optimization.md).

## MLOps and security

- Develop strategies for data management, model monitoring, retraining, and deployment.
- Implement security and compliance measures alongside the above.

## Related

- [Deployment checklist](./deployment-checklist.md)
- [Cost optimization](./cost-optimization.md)
- [Latency optimization](./latency-optimization.md)
- [Safety best practices](./safety-best-practices.md)
