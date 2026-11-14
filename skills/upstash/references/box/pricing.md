# Pricing & Limits

Upstash Box plans and limits: Free, Pay as You Go (billed per active CPU hour), and Fixed (always-on keep-alive boxes at a flat hourly rate). Agents use your own model provider key; Upstash does not provide or bill model usage.

## Signature / Usage

Machine-readable pricing is published at `/pricing/box.md` on the Upstash site.

Adapted (not in the official docs): fetching the machine-readable page the official text points to.

```bash
curl -sL https://upstash.com/pricing/box.md
```

## Options / Props

| Plan | Price | Concurrent boxes | CPU hours / month | Idle timeout |
|------|-------|------------------|-------------------|--------------|
| Free | $0 | 10 | 5 | 1 hour |
| Pay as You Go | $0.10-$0.40 per active CPU hour | 1,000 (default, soft limit) | Unlimited | 6 hours |
| Fixed (Keep Alive) | $0.0111-$0.0444 per box / hour | 1,000 | Unlimited | Never (always on) |

| Size | vCPU | Memory | Storage limit | PAYG price | Keep-alive price |
|------|------|--------|---------------|------------|------------------|
| Small | 2 | 4 GB | 10 GB | $0.10 / active CPU hour | $0.0111 / hour ($8 / month) |
| Medium | 4 | 8 GB | 20 GB | $0.20 / active CPU hour | $0.0222 / hour ($16 / month) |
| Large | 8 | 16 GB | 30 GB | $0.40 / active CPU hour | $0.0444 / hour ($32 / month) |

## Notes

- Source: https://upstash.com/docs/box/overall/pricing (fetched 2026-11-14; no version pin on the site). The downloaded file for this URL was the rendered HTML pricing page, not a Markdown twin, so values are read from its text
- Active CPU hour: billed by CPU actually consumed in core-hours (100% of 2 cores for one hour costs $0.2; 10% of one core for one hour costs $0.01). An idle standard box with no CPU usage costs nothing
- Standard boxes freeze after inactivity (storage preserved, running processes stopped) and wake automatically on the next request; keep-alive boxes stay on and are billed per second at a fixed rate by size, with no separate CPU or storage charge
- Storage on Pay as You Go is $0.10 per GB per month and includes all data on disk, including snapshots; storage is included in the Fixed rate and free on the Free plan
- The page's size table lists Medium disk as 30 GB while its storage FAQ says 20 GB for Medium; the FAQ and the Box Basics page agree on 10 / 20 / 30 GB
- Model usage: agents use your own provider key (Anthropic, OpenAI, OpenRouter, ...), set on the box or saved on your account; Upstash does not provide or bill model usage. Agent runs, scheduled runs, and browser AI calls need a key; shell, files, git, SSH, previews, and browser CDP work without one
- Runtimes: Node.js, Python, Go, Ruby, Rust; custom Docker containers / runtimes are planned ("coming soon")
- Boxes currently run on AWS us-east-1; the 1,000 concurrent-box quota is a soft limit raised on request
- Keep-alive boxes require a paid plan (see Keep Alive)

## Related

- [Box Basics (How It Works)](./how-it-works.md)
- [Keep Alive](./keep-alive.md)
- [Agent](./agent.md)
