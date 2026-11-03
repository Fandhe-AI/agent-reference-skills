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

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Minimum vCPU | — | — | 1 |
| Maximum vCPU | — | — | 4 |
| Maximum memory | — | — | 12 GiB |
| Maximum disk | — | — | 20 GB |
| Memory to vCPU ratio | — | — | Minimum 3 GiB memory per vCPU |

### Account limits (per account)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Concurrent memory | — | — | 6 TiB |
| Concurrent vCPU | — | — | 1,500 |
| Concurrent disk | — | — | 30 TB |
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
- Field names differ by place: Wrangler (`default` policy) uses `vcpu`, `memory_mib`, `disk_mb`; `ctx.container.start()` (`durable_object` policy) uses `vcpu`, `memoryMib`, `diskMb`. For less than 1 vCPU use `lite` or `basic`.
- Derived (not stated in the source): with the account limits above, the binding constraint on concurrent instances of one type is the smallest of memory, vCPU and disk. For `standard-4` (4 vCPU, 12 GiB, 20 GB): memory 6144 GiB / 12 = 512, vCPU 1500 / 4 = 375, disk 30,000 GB / 20 = 1,500, so about 375 instances (vCPU-bound). For `standard-1`: memory 6144 / 4 = 1,536, vCPU 1500 / 0.5 = 3,000, disk 30,000 / 8 = 3,750, so about 1,536 (memory-bound). For `lite`: memory 6144 / 0.25 = 24,576, vCPU 1500 / 0.0625 = 24,000, disk 30,000 / 2 = 15,000, so about 15,000 (disk-bound). This assumes 1 TiB = 1,024 GiB and 1 TB = 1,000 GB and a single instance type.
- The 100 MiB outbound limit applies per request body (including encoding and multipart fields), not to total uploaded size. Streaming, chunked transfer encoding and `multipart/form-data` do not bypass it, and the custom-domain "Maximum Upload Size" setting does not control it. To request an increase, contact support stating it concerns outbound HTTP uploads from Containers or Durable Objects, and include account ID and Worker name, the container instance ID or Durable Object namespace and ID, destination hostname, failing body size in bytes and requested limit, failure timestamp, logs and a minimal reproduction.
- Image storage: delete a tagged image with `wrangler containers images delete IMAGE:TAG` to free space; if you delete an image and then roll back the Worker, that version may stop working.
- Restoring a snapshot refreshes its 30-day TTL.

## Related

- [Pricing](./pricing.md)
- [Snapshots](./snapshots.md)
- [Outbound traffic](./outbound-traffic.md)
- [Scheduling policy](./scheduling-policy.md)
