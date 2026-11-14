---
source: https://developers.cloudflare.com/containers/platform/limits/
---

# Limits and instance types

Instance types, account limits, outbound request body size, and snapshot limits. All maximums are defaults and can be increased by contacting your account team or Cloudflare Support.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/containers/configuration/scheduling-policy/ (custom instance sizes at start time, `durable_object` policy):

Adapted (not in the official docs): wrapped in a Durable Object method (the source fragment used `this` at top level).

```js
import { DurableObject } from "cloudflare:workers";

export class AgentComputer extends DurableObject {
	startCustomInstance() {
		this.ctx.container.start({
			image: this.ctx.container.images.base,
			enableInternet: false,
			instance: {
				vcpu: 1,
				memoryMib: 4096,
				diskMb: 8000,
			},
		});
	}
}
```

## Options / Props

### Instance types

| Name | Type | Default | Description |
|------|------|---------|-------------|
| lite | instance type | — | 1/16 vCPU, 256 MiB memory, 2 GB disk. |
| basic | instance type | — | 1/4 vCPU, 1 GiB, 4 GB. |
| standard-1 | instance type | — | 1/2 vCPU, 4 GiB, 8 GB. |
| standard-2 | instance type | — | 1 vCPU, 6 GiB, 12 GB. |
| standard-3 | instance type | — | 2 vCPU, 8 GiB, 16 GB. |
| standard-4 | instance type | — | 4 vCPU, 12 GiB, 20 GB. |

### Custom instance types

Minimums for custom instance types using the `durable_object` scheduling policy. Maximum resources per instance are subject to the account limits below.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Minimum vCPU | — | — | 1/16 (`0.0625`) |
| Minimum memory | — | — | 256 MiB |
| Minimum disk | — | — | 2 GB (`2000` MB) |

### Account limits (per account)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| vCPU per instance | — | — | 4 |
| Memory per instance | — | — | 12 GiB |
| Disk per instance | — | — | 20 GB |
| Concurrent memory | — | — | 60 TiB |
| Concurrent vCPU | — | — | 15,000 |
| Concurrent disk | — | — | 300 TB |
| Image size | — | — | Same as the instance disk space |
| Total image storage per account | — | — | 50 GB |

### Other limits

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Outbound HTTP request body size | — | — | 100 MiB (104,857,600 bytes) per request body forwarded through an outbound handler. |
| Maximum snapshot size | — | — | 20 GB |
| Snapshot retention | — | — | 30 days from creation or the most recent restore. |

## Notes

- `default` policy: set size with `instance_type` in Wrangler. `durable_object` policy: pass the named size or a custom object to `ctx.container.start()` as `instance`. `dev` and `standard` are backward-compatible aliases for `lite` and `standard-1`.
- Field names differ by place: Wrangler (`default` policy) uses `vcpu`, `memory_mib`, `disk_mb`; `ctx.container.start()` (`durable_object` policy) uses `vcpu`, `memoryMib`, `diskMb`.
- Derived (not stated in the source): with the account limits above, the binding constraint on concurrent instances of one type is the smallest of memory, vCPU and disk. For `standard-4` (4 vCPU, 12 GiB, 20 GB): memory 61,440 GiB / 12 = 5,120, vCPU 15,000 / 4 = 3,750, disk 300,000 GB / 20 = 15,000, so about 3,750 instances (vCPU-bound). For `standard-1`: memory 61,440 / 4 = 15,360, vCPU 15,000 / 0.5 = 30,000, disk 300,000 / 8 = 37,500, so about 15,360 (memory-bound). For `lite`: memory 61,440 / 0.25 = 245,760, vCPU 15,000 / 0.0625 = 240,000, disk 300,000 / 2 = 150,000, so about 150,000 (disk-bound). This assumes 1 TiB = 1,024 GiB and 1 TB = 1,000 GB and a single instance type.
- Custom instance minimums above apply to the `durable_object` policy. If you see different constraints, the application may be using the legacy `default` policy; migrating to `durable_object` is required to get these minimums. Before 2026-11-10 the page listed custom-type constraints of 1 to 4 vCPU, at most 12 GiB memory, at most 20 GB disk and at least 3 GiB memory per vCPU; the 2026-11-10 docs update replaced them (Source: cloudflare-docs commit `8f44ded`). The account limits were raised from 6 TiB / 1,500 vCPU / 30 TB to the figures above on 2026-11-12 (commit `efdd5a3`).
- Source: https://developers.cloudflare.com/containers/platform/limits/ (cloudflare-docs production `34d908a`, fetched 2026-11-14).
- The 100 MiB outbound limit applies per request body (including encoding and multipart fields), not to total uploaded size. Streaming, chunked transfer encoding and `multipart/form-data` do not bypass it, and the custom-domain "Maximum Upload Size" setting does not control it. To request an increase, contact support stating it concerns outbound HTTP uploads from Containers or Durable Objects, and include account ID and Worker name, the container instance ID or Durable Object namespace and ID, destination hostname, failing body size in bytes and requested limit, failure timestamp, logs and a minimal reproduction.
- Image storage: delete a tagged image with `wrangler containers images delete IMAGE:TAG` to free space; if you delete an image and then roll back the Worker, that version may stop working.
- Restoring a snapshot refreshes its 30-day TTL.
- Corrected from the official docs: the snippet is wrapped in a Durable Object method because the source fragment used `this` at top level.

## Related

- [Pricing](./pricing.md)
- [Snapshots](./snapshots.md)
- [Outbound traffic](./outbound-traffic.md)
- [Scheduling policy](./scheduling-policy.md)
