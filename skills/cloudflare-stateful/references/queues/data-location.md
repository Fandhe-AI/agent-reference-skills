---
source: https://developers.cloudflare.com/queues/configuration/data-location/
---

# Data location

Restrict where Queues stores and processes messages by creating a queue with a jurisdiction.

## Signature / Usage

```bash
cf queues create --queue-name my-eu-queue --jurisdiction eu
```

Adapted (not in the official docs): the account ID variable is wrapped in braces inside the quoted URL.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/queues" \
  --request POST \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "queue_name": "my-eu-queue",
    "jurisdiction": "eu"
  }'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `eu` | jurisdiction | — | European Union. |
| `us` | jurisdiction | — | United States. |
| `fedramp` | jurisdiction | — | FedRAMP-Moderate data centers. |

## Notes

- Default: messages are stored and processed across Cloudflare's global network.
- Workers can produce to and consume from a restricted queue from any location; the jurisdiction only restricts storage and processing.
- A jurisdiction can only be set at creation; it cannot be added, changed or removed later.
- The first command uses `cf`, Cloudflare's newer CLI (beta, documented on this page but not covered by this skill). The Wrangler equivalent is `npx wrangler queues create my-eu-queue --jurisdiction eu`.
- Also settable in the dashboard (Queues > Create queue) and with `wrangler queues create --jurisdiction`. The dashboard shows it on the overview and settings pages.
- A Dead Letter Queue must use the same jurisdiction as its source queue.
- Keep the API token out of shell history and version control.

## Related

- [Dead Letter Queues](./dead-letter-queues.md)
- [Configure Queues](./configure-queues.md)
