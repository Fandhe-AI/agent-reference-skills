# Database Branching

A branch is an independent copy of a database's data with its own endpoint and password, for staging apps, test suites, or experiments. Changes on either side stay separate; nothing is synced back.

## Signature / Usage

```bash
upstash redis create-branch --db-id "${DB_ID}" --name staging
```

## Options / Props

| Flag | Description |
|------|-------------|
| `--db-id` | ID of the database to branch from |
| `--name` | Branch name: letters, numbers, hyphens, underscores and dots; starts and ends with a letter or number; max 100 characters; unique within the database |

## Notes

- Available for global databases on the Pay as You Go, Fixed and Enterprise plans (console, Upstash MCP server tool `redis_create_branch`, or Upstash CLI `redis create-branch`, added in CLI 1.7.0 per the release notes). Not available for free, regional, legacy Pro, IP-allowlisted, suspended or HIPAA databases, nor for accounts without a payment method or created through Vercel, Heroku, DigitalOcean, Laravel, Fly.io or AWS Marketplace
- A branch gets all keys and values as of creation, its own endpoint and password, and a single replica in the main database's region (no read regions, no high availability). It is always billed as Pay as You Go
- A new branch starts in the `creating` state and becomes `active` within seconds (`upstash redis get --db-id $BRANCH_ID`); rename or delete it with `upstash redis rename` / `upstash redis delete`. You can branch from the main database or from another branch; a branch cannot be promoted to the main database
- Not available on a branch: Prod Pack features (Protect Credentials, Prometheus, Datadog, Insights, past-month usage range, 3-day backups), plan changes, read regions, Enterprise add-ons (HIPAA, VPC peering), pinning, and the security checklist
- A database with branches cannot be deleted or transferred; delete its branches first
- Source: https://upstash.com/docs/redis/features/branching (fetched 2026-11-14; no version pin on the site)
- Source: https://github.com/upstash/cli/releases (upstash CLI 1.7.0 adds `redis create-branch`, release notes checked 2026-11-14)

## Related

- [Global Replication](./global-replication.md)
- [Security](./security.md)
