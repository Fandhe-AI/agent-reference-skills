---
source: https://developers.cloudflare.com/workers/configuration/placement/
---

# Placement

By default a Worker runs in the data center closest to the request. Placement runs it closer to back-end infrastructure (databases, APIs) to reduce round-trip latency. Options are Smart Placement, explicit region, or a probed host or hostname.

## Signature / Usage

```jsonc
{
	"placement": {
		// Use one of the following options (mutually exclusive):
		"mode": "smart", // Cloudflare automatically places your Worker closest to the upstream with the most requests
		"region": "gcp:us-east4", // Explicit cloud region to run your Worker closest to - e.g. "gcp:us-east4" or "aws:us-east-1"
		"host": "db.example.com:5432", // A host to probe (TCP/layer 4) - e.g. a database host - and place your Worker closest to
		"hostname": "api.example.com", // A hostname to probe (HTTP/layer 7) - e.g. an API endpoint - and place your Worker closest to
	},
}
```

```toml
[placement]
mode = "smart"
region = "gcp:us-east4"
host = "db.example.com:5432"
hostname = "api.example.com"
```

Configuration file keys: see the cloudflare-wrangler skill.

## Options / Props

| Option | Best for | Configuration |
| --- | --- | --- |
| Smart | Multiple back-end services, or unknown infrastructure locations | `mode = "smart"` |
| Region | Single back-end service in a known cloud region | `region` |
| Host | Single back-end service not in a major cloud provider | `host` or `hostname` |

Supported region identifiers:

| Provider | Format | Examples |
| --- | --- | --- |
| AWS | `aws:{region}` | `aws:us-east-1`, `aws:us-west-2`, `aws:eu-central-1` |
| GCP | `gcp:{region}` | `gcp:us-east4`, `gcp:europe-west1`, `gcp:asia-east1` |
| Azure | `azure:{region}` | `azure:westeurope`, `azure:eastus`, `azure:southeastasia` |

Smart Placement status (Workers API `GET /accounts/$ACCOUNT_ID/workers/services/$WORKER_NAME`):

| Status | Description |
| --- | --- |
| *(not present)* | The Worker has not been analyzed yet. It runs in the default location closest to the request. |
| `SUCCESS` | The Worker was analyzed and will be optimized by Smart Placement. |
| `INSUFFICIENT_INVOCATIONS` | The Worker has not received enough requests from multiple locations to make a placement decision. |
| `UNSUPPORTED_APPLICATION` | Smart Placement made the Worker slower and reverted the placement. This state is rare (fewer than 1% of Workers). |

## Notes

- Smart Placement is per Worker and available on all Workers plans. It analyzes request duration in different Cloudflare locations regularly, considers the Worker's performance and added forwarding latency, and forwards only if a candidate location is significantly faster. It only considers locations where the Worker has previously run. Analysis may take up to 15 minutes and needs consistent traffic from multiple locations. Dashboard: Worker > Settings > General > Placement > Smart.
- By default 1% of requests are not routed with Smart Placement as a baseline; request duration is measured at the data center closest to the end user.
- Placement Hints (`region`, `host`, `hostname`): use when the exact back-end location is known and single-homed (primary database, VM, Kubernetes cluster). Workers still run on Cloudflare's network (not inside cloud regions) in the data center with the lowest latency to the specified region; at extremely high request volumes Cloudflare may run instances across a more distributed area. No failover regions needed.
- `host` (layer 4, TCP CONNECT checks) and `hostname` (layer 7, HTTP HEAD checks) are probed from public IP ranges (not Cloudflare IP ranges) and rechecked at intervals. Host-based placement is experimental. Probes do not work for broadcast, anycast, multicast, or replicated resources.
- Limitations (Smart Placement and Placement Hints): placement only affects `fetch` event handlers, not RPC methods or named entrypoints; Workers without a `fetch` handler are ignored; static assets are always served from the location nearest to the request (assets fetched via the static assets binding are served from where the Worker runs).
- `cf-placement` header is added to all requests when placement is enabled: `remote-LHR` means routed by Smart Placement to a data center near London; `local-EWR` means not routed (ran near Newark). The header may be removed before Smart Placement exits beta.
- Multiple Workers: split edge logic (authentication, routing) from back-end logic (database queries, API calls) into separate Workers connected by service bindings with type-safe RPC, and enable placement on the back-end Worker. Example back-end config:

```jsonc
{
	"name": "app-worker",
	"main": "src/index.ts",
	"upload_source_maps": true,
	"placement": {
		// Use one of the following options (mutually exclusive):
		// "mode": "smart", // Cloudflare automatically places your Worker closest to the upstream with the most requests
		"region": "aws:us-east-1", // Explicit cloud region to run your Worker closest to - e.g. "gcp:us-east4" or "aws:us-east-1"
		// "host": "db.example.com:5432", // A host to probe (TCP/layer 4) - e.g. a database host - and place your Worker closest to
		// "hostname": "api.example.com", // A hostname to probe (HTTP/layer 7) - e.g. an API endpoint - and place your Worker closest to
	},
}
```

- Durable Objects provide automatic placement without configuration; SQLite storage queries are effectively zero-latency because compute and data are colocated. Do as much work as possible inside the Durable Object and return a composite result.

## Related

- [Service bindings](../bindings-rpc/README.md)
- [Handlers and context](../handlers-context/README.md)
- [Routes and domains](./routing-overview.md)
