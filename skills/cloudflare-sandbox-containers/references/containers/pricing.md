---
source: https://developers.cloudflare.com/containers/platform/pricing/
---

# Pricing

Containers bill vCPU, memory and disk for every 10 ms a container is actively running, plus network egress, with included monthly usage on the $5 USD per month Workers Paid plan.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/containers/configuration/scheduling-policy/ (the instance type you choose drives the bill):

```jsonc
{
	"containers": [
		{
			"class_name": "ApiContainer",
			"scheduling_policy": "default",
			"image": "./api/Dockerfile",
			"instance_type": "standard-1",
			"max_instances": 5,
		},
	],
}
```

## Options / Props

### vCPU, memory and disk (Workers Paid)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Memory | — | — | 25 GiB-hours/month included, then $0.0000025 per additional GiB-second. |
| CPU | — | — | 375 vCPU-minutes/month included, then $0.000020 per additional vCPU-second. |
| Disk | — | — | 200 GB-hours/month included, then $0.00000007 per additional GB-second. |

The Free plan row of the source table is `N/A` for memory and CPU and empty for disk.

### Network egress

| Name | Type | Default | Description |
|------|------|---------|-------------|
| North America and Europe | — | — | $0.025 per GB; 1 TB included per month. |
| Oceania, Korea, Taiwan | — | — | $0.05 per GB; 500 GB included per month. |
| Everywhere else | — | — | $0.04 per GB; 500 GB included per month. |

## Notes

- Charges start when a request reaches the container or it is manually started, and stop after the instance sleeps. Memory and disk bill on the provisioned resources of the instance type; CPU bills on active usage only.
- Snapshots are available at no charge during the public beta; Cloudflare will share pricing details when snapshots reach general availability.
- Instance types and their vCPU, memory and disk are listed in limits.md.
- Derived (not stated in the source), converting the included allowances to the per-second units the overage rates use: 25 GiB-hours = 90,000 GiB-seconds; 375 vCPU-minutes = 22,500 vCPU-seconds; 200 GB-hours = 720,000 GB-seconds.
- Derived worked example, `standard-1` (1/2 vCPU, 4 GiB, 8 GB) running one hour with the CPU fully busy, before included usage: memory 4 GiB x 3,600 s x $0.0000025 = $0.036; CPU 0.5 vCPU x 3,600 s x $0.000020 = $0.036; disk 8 GB x 3,600 s x $0.00000007 = $0.002016; total $0.074016. For `lite` (1/16 vCPU, 256 MiB, 2 GB), same assumptions: memory 0.25 x 3,600 x $0.0000025 = $0.00225; CPU 0.0625 x 3,600 x $0.000020 = $0.0045; disk 2 x 3,600 x $0.00000007 = $0.000504; total $0.007254. A mostly idle container pays less CPU since CPU is active-usage based.
- Requests are handled by your Worker and each container has its own Durable Object; Workers and Durable Objects usage is billed separately. Logs are billed at Workers Logs rates; logs appear in both the Containers and Observability dashboard sections when observability is enabled for the Worker or the container.
- Source: https://developers.cloudflare.com/containers/platform/pricing/ (cloudflare-docs production `34d908a`, fetched 2026-11-14).

## Related

- [Limits](./limits.md)
- [Overview](./overview.md)
