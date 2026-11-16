---
source: https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type
---

# Choose a reservation type

Reservations give your project a very high assurance that zonal resources are available. You can reserve vCPUs, memory, GPUs, TPUs, Local SSD disks and Hyperdisk pools; a shared reservation extends the assurance to up to 100 projects in the organization. This page compares on-demand reservations, future reservations, future reservations in calendar mode, and future reservations for capacity blocks.

## Signature / Usage

### Create an on-demand reservation

```bash
gcloud compute reservations create my-reservation --vm-count=1 \
  --source-instance-template=example-instance-template \
  --zone=fake-zone
```

### Request a future reservation (update shown)

```bash
gcloud compute future-reservations update my-future-reservation \
  --total-count=1000 --start-time=2021-11-10T07:00:00Z \
  --end-time=2021-12-10T07:00:00Z --zone=us-central1-a
```

## Options / Props

### Decision flow

1. Need capacity immediately? Yes: need flexibility on how long to hold it? Yes: on-demand reservations. No: continue.
2. Need high-demand resources like GPUs? No: future reservations. Yes: continue.
3. Need resources for more than 90 days? Yes: future reservations for capacity blocks. No: future reservations in calendar mode.

### Comparison

| | On-demand | Future | Future, calendar mode | Future, capacity blocks |
|---|---|---|---|---|
| Machine series | All families except A5X, A4X Max, A4X, A4, A3 Ultra, A3 High (less than 8 GPUs), TPU7x, TPU v6e, TPU v5p | A3 Mega\*, A3 High (8 GPUs)\*, A3 Edge\*, C4, C4A, C4D, C4N, C3, C3D, G4\*, H4D\*, H3, M4, M4N, M3, N4, N4A, N4D, X5, X4, Z4D, Z4M\*, Z3 | A4, A3 Ultra, A3 Mega, A3 High (8 GPUs), A3 Edge, H4D, TPU7x, TPU v6e, TPU v5p | A5X, A4X Max, A4X, A4, A3 Ultra, A3 Mega, A3 High (8 GPUs), A3 Edge, H4D, TPU7x, TPU v6e, TPU v5p |
| Custom machine types | Yes | Yes | No | No |
| Storage reservations | No | No | No | Optional (Hyperdisk pool) |
| Max instances per request | 1,000 (‡) | No limit (#) | 80 GPU instances, 256 H4D instances, 1,024 TPU chips | No limit (#) |
| Max duration | Unlimited (until deleted) | Unlimited (until deleted) | Up to 90 days | Unlimited (contract period) |
| View future availability | No | No | Yes (up to 60 days for GPU and H4D; up to 120 days for TPU chips) | Yes (contact your account team) |
| Creation method | You create the reservation | You create the request | You create the request | You contact your account team; Google creates the request |
| Delivery | Immediate | Specific future date and time | Specific future date and time | Specific future date and time |
| Resource allocation | Best-effort (compact placement policies optional) | Best-effort | Dense | Dense |
| Cluster management capabilities | No | No | Yes | Yes |
| Provisioning model | Standard | Standard | Reservation-bound | Reservation-bound |
| Quota | Standard quota | Standard quota | No quota for GPU instances or TPU chips; standard quota for H4D | Google increases quota before delivery |
| Pricing | Standard (discounted with commitments) | Standard (discounted with commitments) | Discounted up to 53% (see DWS pricing) | Standard (discounted with commitments) |
| End of period | Manual deletion | Manual deletion | Automatic reservation deletion; instances stop or delete per their termination action | Automatic reservation and Hyperdisk pool deletion; instances stop or delete per termination action |

\* Before submitting a future reservation request for A3 Mega, A3 High (8 GPUs), A3 Edge, G4, H4D or Z4M, contact your account team or sales team; otherwise Google Cloud is likely to decline it.

‡ With a compact placement policy of max distance `2`: at most 256 A3 Mega, A3 High with 8 GPUs or A3 Edge instances, or 150 instances for all other supported families.

\# Requests above 1,000 instances are delivered as multiple on-demand reservations at the delivery time.

### Limitations (all types)

- Reservations are zone-specific resources.
- Reserved capacity cannot create `f1-micro` or `g1-small` instances, Flex-start VMs, sole-tenant nodes, or Spot VMs / preemptible instances.

## Notes

- Capacity-block requests go through your account team; for A5X, A4X Max, A4X, A4, A3 Ultra, A3 Mega, A3 High (8 GPUs) and A3 Edge see AI Hypercomputer "Reserve capacity through your account team" (https://docs.cloud.google.com/ai-hypercomputer/docs/reserve-capacity); for Cluster Director clusters (A4X, A4, A3 Ultra, A3 Mega) see https://docs.cloud.google.com/cluster-director/docs/reserve-capacity; for TPU7x, TPU v6e, TPU v5p see https://docs.cloud.google.com/tpu/docs/long-term-reservation; for H4D see https://docs.cloud.google.com/compute/docs/hpc/reserve-capacity-account-team.
- After a reservation is provisioned you pay for it whether you use it or not; consuming it adds no extra cost except resources outside the reservation, such as IP addresses.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/reservations/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations/update (gcloud 593.0.0 help); the update example uses 2021 timestamps from the help text, and `fake-zone` in the create example is a placeholder from the help text (use a real zone). The twin itself contains no code.
- GPU / TPU capacity on Compute Engine; GPUs and TPUs on GKE nodes are in `gcp-gke`.
- Source inconsistency: this page lists "X5, X4, Z4D, Z4M\*, and Z3" among the supported machine series for future reservations, while future-reservations-overview.md says "You can create and submit future reservation requests only for the following machine series" and lists "Memory-optimized: M3, M4, M4N, and X4" and "Storage-optimized: Z3 and Z4M" (no X5 or Z4D).
- Source (About future reservation requests, cited above as `future-reservations-overview.md`): https://docs.cloud.google.com/compute/docs/instances/future-reservations-overview (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [reservations-overview.md](./reservations-overview.md)
- [future-reservations-overview.md](./future-reservations-overview.md)
- [about-flex-start-vms.md](./about-flex-start-vms.md)
- [committed-use-discounts-overview.md](./committed-use-discounts-overview.md)
