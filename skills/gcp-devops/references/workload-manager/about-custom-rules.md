---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/about-custom-rules
---

# About custom rules in Workload Manager

Custom rules let you validate workloads against best practices recommended by your organization, for example to ensure that VMs don't use the Compute Engine default service account. You write the rule in Rego, create and run an evaluation, then review results and remediate violations.

## Signature / Usage

How it works:

1. Identify the best practices relevant to your deployments from the Google Cloud Well-Architected Framework.
2. Create custom rules using Rego.
3. Create and schedule evaluations for your workloads.
4. Optional: export evaluation results to BigQuery and set up notifications.

```rego
package google.compute.defaultserviceAccount

import data.validator.google.lib as lib
import data.validator.google.lib.parameters as gparam
import future.keywords

asset := input.asset

input_enriched := object.union({"resource": {"data": {"serviceAccounts": []}}}, asset)

params := lib.get_default(gparam.global_parameters, "compute", {})

deny[{
	"msg": "Disallowed default service account",
	"details": {"name": asset.name},
}] {

	account = input_enriched.resource.data.serviceAccounts[_]
	endswith(account.email, params.default_sa)
}
```

## Options / Props

### Limitations

| Limit | Value |
|-------|-------|
| Rules per evaluation | A maximum of 300. More rules can slow down the evaluation; split rules across multiple evaluations. |
| BigQuery export | Multi-regional BigQuery datasets are not supported; export to regional datasets. |

### Supported data sources

| Source | Notes |
|--------|-------|
| Cloud Asset Inventory | See the supported asset types list in the Cloud Asset Inventory documentation. |
| Cloud Monitoring metrics | Compute Engine metrics in the table below. |

### Supported metrics for Compute Engine

| Display name (metric type) | Description and labels | ASSET_TYPE (rule metadata) |
|----------------------------|------------------------|----------------------------|
| CPU utilization (`instance/cpu/utilization`) | Fractional utilization of allocated CPU on a VM instance. Label `instance_name`: the name of the VM instance. | `Instance_CPUUtil_Last1H`, `Instance_CPUUtil_Last6H`, `Instance_CPUUtil_Last12H`, `Instance_CPUUtil_Last1D` |
| Disk average latency (`instance/disk/average_io_latency`) | Disk's average io latency in the last 60s. Label `device_name`: the name of the disk device. Label `storage_type`: one of [pd-standard, pd-balanced, pd-ssd, pd-extreme, hyperdisk-extreme, hyperdisk-throughput]. | `Instance_DiskIO_Last1H`, `Instance_DiskIO_Last6H`, `Instance_DiskIO_Last12H`, `Instance_DiskIO_Last1D` |
| VM Memory Used (`instance/memory/balloon/ram_used`) | Memory currently used in the VM. Label `instance_name`: the name of the VM instance. | `Instance_MemoryUtil_Last1H`, `Instance_MemoryUtil_Last6H`, `Instance_MemoryUtil_Last12H`, `Instance_MemoryUtil_Last1D` |

## Notes

- The metric type strings in the table must be prefixed with `compute.googleapis.com` (the source omits the prefix in the table).
- Pricing: see https://cloud.google.com/workload-manager/pricing (prices are not copied).
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/rego-custom-rules (the default-service-account rule the page uses as its example)
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/about-custom-rules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [rego-custom-rules.md](./rego-custom-rules.md)
- [evaluate-using-custom-rules.md](./evaluate-using-custom-rules.md)
- [create-evaluation.md](./create-evaluation.md)
