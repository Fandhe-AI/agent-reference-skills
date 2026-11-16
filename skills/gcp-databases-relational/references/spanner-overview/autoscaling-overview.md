---
source: https://docs.cloud.google.com/spanner/docs/autoscaling-overview
---

# Autoscaling overview

Scaling an instance means adding or removing compute capacity in response to workload or storage changes. You can scale manually or configure autoscaling; requirements on this page apply to both the managed autoscaler and the open source Autoscaler tool.

## Signature / Usage

Manual scaling sets capacity directly, for example at creation.

Snippet taken from https://docs.cloud.google.com/spanner/docs/getting-started/gcloud

```bash
gcloud spanner instances create test-instance --config=regional-us-central1 \
    --description="My Instance" --nodes=1
```

## Options / Props

| Option | Description |
|--------|-------------|
| Manual scaling | Configure the instance to add or remove compute capacity yourself |
| Spanner managed autoscaling | Service-side autoscaling configured on the instance (Enterprise and Enterprise Plus editions) |
| Autoscaler tool for Spanner | Open source tool you set up yourself (available in all editions) |

| Benefit | Description |
|---------|-------------|
| Costs | Decreases capacity off-peak, avoiding over-provisioning |
| Performance | Adds capacity when workload or storage grows to meet target CPU utilization and storage requirements |
| Automation | No manual monitoring or resizing; with managed autoscaling you write no scaling application |

## Notes

- Autoscaling is often best for steady diurnal or cyclical traffic (such as online banking), new applications expecting organic growth, and workloads new to Spanner.
- Spanner quickly adds capacity when traffic increases, but balancing the additional capacity can take time.
- Adding capacity does not resolve problems unrelated to instance size, such as lock contention and hotspots.
- Edition availability of the managed autoscaler and the open source Autoscaler is from the editions overview.
- Source: https://docs.cloud.google.com/spanner/docs/autoscaling-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/editions-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/getting-started/gcloud (borrowed command)

## Related

- [compute-capacity.md](./compute-capacity.md)
- [editions-overview.md](./editions-overview.md)
- [instances.md](./instances.md)
