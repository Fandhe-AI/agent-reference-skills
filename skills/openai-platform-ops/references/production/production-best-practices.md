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

## Staging projects

- Create separate projects for staging and production to isolate development and testing from the live application.
- Limit user access to the production project, and set custom rate and spend limits per project.

## Scaling architecture

- Horizontal scaling (more servers), vertical scaling (upgrade resources), caching frequently accessed data, and load balancing to distribute requests.

### Compress request bodies

Compress JSON request bodies with `zstd` when calling `POST /v1/responses`: set `Content-Encoding: zstd` and keep `Content-Type: application/json`.

```bash
zstd -3 -c request.json > request.json.zst

curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Content-Encoding: zstd" \
  --data-binary @request.json.zst
```

- The API decompresses the body before processing; compression reduces network bytes but does not change token usage or model context limits.
- Compressed and decompressed bodies must each be at most 128 MiB; the decompressed body must also be at most 100 times the compressed size. Exceeding these returns HTTP `413`; invalid or incomplete `zstd` data returns HTTP `400`. Other request limits still apply.

### Compress WebSocket messages

Responses API WebSocket mode supports `permessage-deflate` on `wss://api.openai.com/v1/responses` (a DEFLATE-based WebSocket extension that reduces message size). Enable it in the WebSocket client's compression settings before connecting.

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
