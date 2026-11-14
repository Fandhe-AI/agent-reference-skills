---
source: https://developers.cloudflare.com/workers/platform/spend-management/
---

# Spending limits

Limit Workers usage charges and understand what stops when your account reaches a limit. The limit covers requests and CPU time across all Workers in your account, after included usage. It excludes the monthly subscription fee.

## Signature / Usage

Create a $50 Workers spending limit with the Cloudflare CLI (`cf`). Review what a Workers limit blocks (Notes) before running it. Replace the email address with your recipient's address.

Snippet taken from https://developers.cloudflare.com/billing/manage/spend-management/cli/ (cloudflare-docs production 34d908a, fetched 2026-11-14).

```sh
cf billing spend-policies create \
  --name 'Workers $50 spending limit' \
  --product-id workers \
  --enabled true \
  --threshold-cents 5000 \
  --action usage_block \
  --notification-email billing@example.com
```

To configure a limit in the dashboard, follow Set a spending limit in the dashboard (https://developers.cloudflare.com/billing/manage/spend-management/#set-a-spending-limit-in-the-dashboard).

## Notes

### What stops at the limit

- Once the limit takes effect, Cloudflare rejects new invocations of your Workers: incoming HTTP requests, Cron Triggers, Queue consumer invocations, Email Worker invocations, and calls from other Workers or Durable Objects.
- HTTP visitors receive error `1103`. This error has other causes, so check **Billing** > **Spend Management** before contacting support. Requests rejected by the spending limit are not billed as Worker invocations.
- Static assets served without running your Worker continue to be available. Requests that need Worker code, such as requests routed through `run_worker_first`, can fail. A limit does not delete your Workers or assets.

### Plan for application dependencies

- A Workers limit applies to the whole account, rather than one application or environment. For example, a test Worker can reach the shared limit and interrupt a production Worker in the same account.
- Durable Objects, Workers KV, R2, and other products have separate charges; a Workers spending limit does not apply to those charges. A Durable Object can also fail when it calls a Worker whose limit has been reached.

### Costs and timing

- A spending limit is not an exact maximum bill. Usage reporting and blocking take time, so usage can continue after the threshold is reached. The Workers Paid subscription fee remains payable.
- For a limit on the CPU time of each invocation, configure CPU time limits ([limits.md](./limits.md)). For an email without blocking invocations, use an email alert (https://developers.cloudflare.com/billing/manage/spend-management/cli/#create-an-email-alert).

### Resume Workers

- Raise the limit above current spend, turn it off, or remove it (https://developers.cloudflare.com/billing/manage/spend-management/#resume-service-or-change-a-limit). Changes can take a few minutes to apply.
- The block also expires at the start of the next subscription billing period. An enabled limit remains in place for that new period.
- Source: https://developers.cloudflare.com/workers/platform/spend-management/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [limits.md](./limits.md)
- [pricing.md](./pricing.md)
- [overview.md](./overview.md)
