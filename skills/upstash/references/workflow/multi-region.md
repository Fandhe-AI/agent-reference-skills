# Select a Region (Multi-Region)

Upstash Workflow runs on QStash, available in an EU region and a US region. Each region is fully independent (infrastructure, pricing, resources, workflow runs, API tokens, signing keys).

## Signature / Usage

Single-region mode (default, `QSTASH_REGION` not set):

```bash
# Single-region configuration (EU)
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="your_eu_token"
QSTASH_CURRENT_SIGNING_KEY="your_eu_current_key"
QSTASH_NEXT_SIGNING_KEY="your_eu_next_key"
```

Migration mode (`QSTASH_REGION` set to `US_EAST_1` or `EU_CENTRAL_1`):

```bash
# Migration mode configuration with US as primary
QSTASH_REGION="US_EAST_1"

US_EAST_1_QSTASH_URL="https://qstash-us-east-1.upstash.io"
US_EAST_1_QSTASH_TOKEN="your_us_token"
US_EAST_1_QSTASH_CURRENT_SIGNING_KEY="your_us_current_key"
US_EAST_1_QSTASH_NEXT_SIGNING_KEY="your_us_next_key"

EU_CENTRAL_1_QSTASH_URL="https://qstash-eu-central-1.upstash.io"
EU_CENTRAL_1_QSTASH_TOKEN="your_eu_token"
EU_CENTRAL_1_QSTASH_CURRENT_SIGNING_KEY="your_eu_current_key"
EU_CENTRAL_1_QSTASH_NEXT_SIGNING_KEY="your_eu_next_key"
```

## Regional URLs

| Region | URL |
|--------|-----|
| EU | `https://qstash-eu-central-1.upstash.io`, or `https://qstash.upstash.io` |
| US | `https://qstash-us-east-1.upstash.io` |

## Operating modes

| Mode | Behavior |
|------|----------|
| Single-region (default) | Uses `QSTASH_TOKEN` and `QSTASH_URL` (defaults to EU); triggers go through the configured region; incoming requests verified with default signing keys |
| Migration | Uses region-specific credentials for the primary region (`QSTASH_REGION`); detects the region of incoming workflow requests; can receive calls from multiple regions simultaneously |

## Migration between regions

- With no active resources (workflow runs, schedules, URL groups), update environment variables to the new region
- With active resources, use the Upstash Console: Workflow tab, **Migrate** button, guided process. It helps set up migration-mode environment variables and copies/updates QStash resources (schedules, URL groups, queues)
- Workflow logs and the DLQ are not migrated; they remain in the old region

SDK requirements: `@upstash/workflow` >= 1.1.0 and `@upstash/qstash` >= 2.9.0.

```bash
npm install @upstash/workflow@latest @upstash/qstash@latest
```

## Notes

- Usage in each region is tracked and billed independently; runs, events, and configurations are region-specific
- If a workflow run started in one region, all its steps execute in that region
- After migration the app can handle requests from both regions simultaneously
- Migration mode relies on `process.env`; it does not work on platforms without it, such as Cloudflare Workers
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/howto/multi-region

## Related

- [security](./security.md)
- [local-development](./local-development.md)
