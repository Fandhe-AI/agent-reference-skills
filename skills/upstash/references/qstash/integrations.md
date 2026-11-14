# Integrations (LLM, Resend, Monitoring, Automation)

QStash provider integrations in the TypeScript SDK (`llm` API with OpenAI-compatible and Anthropic providers, `email` API with Resend), metrics export to Datadog and Prometheus, and no-code automation (n8n, Pipedream).

## Signature / Usage

```typescript
import { anthropic, Client } from "@upstash/qstash";

const client = new Client({ token: "<QSTASH_TOKEN>" });
await client.publishJSON({
  api: { name: "llm", provider: anthropic({ token: "<ANTHROPIC_TOKEN>" }) },
  body: {
    model: "claude-3-5-sonnet-20241022",
    messages: [{ role: "user", content: "Summarize recent tech trends." }],
  },
  callback: "https://example.com/callback",
});
```

```typescript
import { Client, resend } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

await client.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: "<RESEND_TOKEN>" }),
  },
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
});
```

Prometheus federation (Grafana can alternatively use `https://api.upstash.com/monitoring/prometheus` as data source with the monitoring token):

```yaml
scrape_configs:
  # Federation job: pull QStash metrics from Upstash API
  - job_name: "federate_upstash_qstash"
    honor_labels: true
    metrics_path: "/monitoring/prometheus/federate"
    scheme: https
    params:
      match[]:
        - 'qstash_public_metrics{}'
    static_configs:
      - targets:
          - "api.upstash.com"
    authorization:
      type: Bearer
      credentials: "<MONITORING_TOKEN>"
```

## Options / Props

| Integration | Mechanism |
| --- | --- |
| LLM (OpenAI-compatible, `custom`) | `api: { name: "llm", provider }` with `publishJSON`, `enqueueJSON`, `batchJSON`; body is the chat completion request; use `callback` for the response |
| Anthropic | Provider `anthropic({ token })`; streaming completions are not supported; use `Upstash-Callback` / `callback` |
| Helicone analytics | `analytics: { name: "helicone", token }` inside `api` |
| Resend | `api: { name: "email", provider: resend({ token, batch? }) }`; `batch: true` with an array body uses the Batch Email API |
| Datadog | Install the Upstash app in Datadog, connect accounts, select personal or team account; metrics (publish counts, success/error rates, retries, DLQ, schedule executions) appear in dashboards |
| Prometheus / Grafana | Enable in Console Settings, Monitoring; send token as `Authorization: Bearer <MONITORING_TOKEN>`; import Grafana dashboard 24206 |
| n8n | Build the request in the Console Request Builder, copy the cURL, and import it into an n8n HTTP Request node |
| Pipedream | QStash "Create Topic Endpoint" trigger subscribes a Pipedream endpoint to a QStash topic (URL Group) |

## Notes

- When LLM rate limits are exceeded, QStash schedules the retry based on the reset time of the limits instead of retrying prematurely
- Datadog and Prometheus integrations cover the Prod Pack; the Datadog integration can be established for one account scope at a time
- QStash metrics are exposed as `qstash_public_metrics`; the `upstash_db_metrics` selector from the Redis Prometheus guide only matches Redis metrics
- In Pipedream, do not use the "Create topic message" action in the same workflow as the trigger, otherwise messages can loop between QStash and Pipedream
- The official LLM page imports `upstash` but calls `openai(...)` in its examples (inconsistent in the source); the Anthropic page imports `anthropic` and the Resend page imports `resend` from `@upstash/qstash`
- Source: https://upstash.com/docs/qstash/integrations/llm (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/anthropic (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/resend (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/datadog (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/prometheus (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/n8n (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/integrations/pipedream (fetched 2026-11-14; no version pin on the site)

## Related

- [publish.md](./publish.md)
- [queues.md](./queues.md)
- [batch.md](./batch.md)
- [callbacks.md](./callbacks.md)
