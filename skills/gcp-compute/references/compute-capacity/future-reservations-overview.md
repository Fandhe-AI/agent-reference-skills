---
source: https://docs.cloud.google.com/compute/docs/instances/future-reservations-overview
---

# About future reservation requests

A future reservation request asks Google Cloud to provide capacity starting on a specific date up to 1 year ahead. If approved, Compute Engine automatically creates reservations at the start time that are consumed like on-demand reservations. Creating a request has no cost; you pay from the moment resources are provisioned, at the on-demand reservation rate.

## Signature / Usage

### Describe, update, cancel and delete a future reservation request

Describe a future reservation request:

```bash
gcloud compute future-reservations describe my-reservation \
    --zone=ZONE
```

Update total count, start and end time (the help example uses 2021 timestamps; use your own future dates):

```bash
gcloud compute future-reservations update my-future-reservation \
  --total-count=1000 --start-time=2021-11-10T07:00:00Z \
  --end-time=2021-12-10T07:00:00Z --zone=us-central1-a
```

Cancel a future reservation request (destructive, see Notes):

```bash
gcloud compute future-reservations cancel my-reservation \
    --zone=ZONE
```

Delete a future reservation request (destructive, see Notes):

```bash
gcloud compute future-reservations delete my-reservation \
    --zone=ZONE
```

## Options / Props

### Request properties

| Property | Detail |
|----------|--------|
| Name prefix | String added to the start of each auto-created reservation name |
| Reservation affinity | `ANY_RESERVATION` (automatically consumed; matching new and existing VMs in your and shared projects consume it) or `SPECIFIC_RESERVATION` (VM must target the reservation by name, new VMs only) |
| Reservation period | Start time within one year of submission; end time at least 24 hours after start, no upper limit. Recommended period: 365 days or longer |
| Share type | Single-project or shared (up to 100 consumer projects in the same organization) |
| Total count | Automatic: capacity target, existing matching VMs and reservations in your and shared projects are subtracted. Specific: incremental, full count provisioned, nothing subtracted. Each auto-created reservation holds up to 1,000 VMs |
| VM properties | Specified directly, copied from an existing VM, or from an instance template |
| Zone | Zone and machine type affect approval likelihood |
| Optional | Auto-delete (deletes auto-created reservations after the end time, within two hours), description, planning status |

### Statuses

| Field | Values |
|-------|--------|
| `planningStatus` | `DRAFT` (default; recommended first to see the VM count Compute Engine will provision), `SUBMITTED` (cannot go back to `DRAFT`) |
| `status.procurementStatus` | `DRAFTING`, `PENDING_APPROVAL` (then `DECLINED`, `APPROVED`, `CANCELLED`), `PROCURING` (lock time), `PROVISIONING` (starts 24 hours before start time; then `FULFILLED`, `FAILED_PARTIALLY_FULFILLED` for insufficient quota, `FAILED`) |
| `status.amendmentStatus` | `AMENDMENT_IN_REVIEW`, `AMENDMENT_APPROVED`, `AMENDMENT_DECLINED` |

### Lock time, updates and review

- Lock time begins 56 days (8 weeks) before the start time, or shortly after approval if the start is less than 56 days from submission. In lock time you cannot cancel, and cannot delete before the end time. A start more than 56 days out is recommended.
- Before `PROVISIONING` you can modify an uncancelled, not pending request. After approval, changing GPUs and type, Local SSDs and interface, machine series and type, minimum CPU platform, share settings, start and end time, or total count requires a modification request to Google Cloud. GPUs, Local SSDs, machine series and type, and minimum CPU platform can be modified only if the request was not created from an instance template. One modification request at a time; requests within 72 hours of start, VM property changes within 14 days of start, and large total count changes within 14 days of start are likely to be declined.
- Review typically takes five days. Approved requests get commercially reasonable efforts and priority over customers without approved future reservations with the same properties.
- Auto-created reservations: provisioning starts 24 hours before start but charges begin at the start time; the VM count and end time cannot be modified; modify or delete only after the end time. Avoid deleting or modifying matching reservations within 24 hours of the start, and make sure quota is sufficient 14 days before.

### Restrictions on creation

- Machine series: A3 Mega, A3 High (8 GPUs), A3 Edge, G4 (accelerator-optimized); H3, H4D (compute-optimized); C3, C3D, C4, C4A, C4D, C4N, N4, N4A, N4D (general-purpose); M3, M4, M4N, X4 (memory-optimized); Z3, Z4M (storage-optimized). Contact your account team or sales team before submitting for GPU, H4D or Z4M.
- Reservation period at least 24 hours; start no later than 1 year after submission; no placement policies.
- `ANY_RESERVATION` periods cannot overlap another request with matching VM properties and zone.
- If matching reservations exist, new requests must be shared across the same projects; a single-project request means only single-project requests; a shared request means only shared requests across the same projects.
- Moving the project to another organization before lock time deletes the request.
- Attaching auto-created reservations to a commitment: purchase the commitment only in the last 24 hours before the start time, and auto-delete must be disabled.

## Notes

- Billing: after approval and lock time you commit to pay for the provisioned capacity for the whole reservation period unless an approved modification changes it; you cannot delete an auto-created reservation before the end time. If provisioning is partial you pay only for what is provisioned.
- If you delete a specifically targeted reservation after stopping VMs that consume it, you cannot restart those VMs until you recreate a matching reservation. Deleting or canceling a request is destructive; try it on a disposable request first.
- If you cannot use future reservations in gcloud or the API, you may not be eligible; contact your account team or sales team.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations/describe, https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations/update, https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations/cancel and https://docs.cloud.google.com/sdk/gcloud/reference/compute/future-reservations/delete (gcloud 593.0.0 help); the update example uses 2021 timestamps from the help text. `ZONE` is a placeholder from the help text. The twin itself contains no code.
- `cancel` and `delete` are destructive: lock time rules above apply, and a canceled or deleted request cannot be restored.
- Compute Engine; VPC and firewall concerns are out of scope here.
- Corrected from the official docs: the source spells the canceled procurement status `CANCELED` and names the update status field `AmendmentStatus` with the values `AMENDMENT_PENDING_APPROVAL`, `AMENDMENT_APPROVED` and `AMENDMENT_DECLINED`; the table uses the Compute API spellings so that filters on these values match.
- Source inconsistency: this page lists "Memory-optimized: M3, M4, M4N, and X4" and "Storage-optimized: Z3 and Z4M" as the only series for future reservation requests, while choose-reservation-type.md lists "X5, X4, Z4D, Z4M\*, and Z3" among the supported machine series for future reservations.
- Source inconsistency: the source says "Canceled (`CANCELED`)" and "Update pending approval (`AMENDMENT_PENDING_APPROVAL`)", while the Compute API `FutureReservationStatus` schema lists `procurementStatus` values `APPROVED`, `CANCELLED`, `COMMITTED`, `DECLINED`, `DRAFTING`, `FAILED`, `FAILED_PARTIALLY_FULFILLED`, `FULFILLED`, `PENDING_AMENDMENT_APPROVAL`, `PENDING_APPROVAL`, `PROCURING`, `PROVISIONING` and `amendmentStatus` values `AMENDMENT_APPROVED`, `AMENDMENT_DECLINED`, `AMENDMENT_IN_REVIEW`. Use the API spellings when filtering or reading `status` in API and gcloud output.
- Source (`FutureReservationStatus` enums): Compute Engine API v1 Discovery document https://compute.googleapis.com/$discovery/rest?version=v1, schema `FutureReservationStatus` (retrieved 2026-11-14)
- Source (Choose a reservation type, cited above as `choose-reservation-type.md`): https://docs.cloud.google.com/compute/docs/instances/choose-reservation-type (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/future-reservations-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [reservations-overview.md](./reservations-overview.md)
- [choose-reservation-type.md](./choose-reservation-type.md)
- [committed-use-discounts-overview.md](./committed-use-discounts-overview.md)
