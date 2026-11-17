---
source: https://docs.cloud.google.com/vpc/docs/internal-ranges
---

# Internal ranges overview

Internal ranges reserve blocks of internal IPv4 or IPv6 addresses in a VPC network and specify how they can be used, helping manage topology with VPC Network Peering, Shared VPC, Cloud VPN and Cloud Interconnect.

## Signature / Usage

The source page has no code. The example below is from the gcloud 593.0.0 help EXAMPLES (auto-allocated block).

```bash
gcloud network-connectivity internal-ranges create my-range \
    --prefix-length=25 --network="my-network" --project=my-project
```

## Options / Props

### Purpose types (cannot change after creation)

| Value | Meaning |
|-------|---------|
| `VPC_SUBNET` | Default. Range can create subnets and smaller child internal ranges. |
| `INTERNAL_ADDRESS` | Only for reserving global internal IPv4 addresses for Private Service Connect endpoints for global Google APIs. |

### Peering types

| Value | Meaning |
|-------|---------|
| `FOR_SELF` | CIDR usable only in the parent VPC network, by referencing the internal range; peers cannot use it. |
| `FOR_PEER` | CIDR usable only in peer networks (without referencing the range); the parent cannot use it. |
| `NOT_SHARED` | Usable by the parent (by reference) and by peers (without reference, in a way not visible to the parent). Two peered networks can use the same CIDR if both are `NOT_SHARED`. |

### Usage types

| Value | Meaning |
|-------|---------|
| `FOR_VPC` | Default. Can be associated with other resources in the parent VPC network. |
| `EXTERNAL_TO_VPC` | Cannot be associated with resources in the parent network. |
| `FOR_MIGRATION` | Used to migrate a subnet range, including between peered VPC networks. Must have peering type `FOR_SELF`. |

### Use cases

| Use case | Purpose | Peering | Usage |
|---|---|---|---|
| Use only within the range's VPC network (IPv4 only) | `VPC_SUBNET` | `NOT_SHARED` | `FOR_VPC` |
| Reserve for peer networks only (IPv4 only) | `VPC_SUBNET` | `FOR_PEER` | `FOR_VPC` |
| Reserve for use outside the VPC network; for IPv6 prevents automatic assignment to new IPv6-only or dual-stack subnets (IPv4 or IPv6) | `VPC_SUBNET` | `FOR_SELF` | `EXTERNAL_TO_VPC` |
| On-premises use only (IPv4 only) | `VPC_SUBNET` | `NOT_SHARED` | `EXTERNAL_TO_VPC` |
| Temporarily migrate a subnet between VPC networks (IPv4 only) | `VPC_SUBNET` | `FOR_SELF` | `FOR_MIGRATION` |
| Allocate global internal IPv4 for PSC endpoints for global Google APIs (IPv4 only) | `INTERNAL_ADDRESS` | `FOR_SELF` | `FOR_VPC` |

### IPv4 allocation strategies (automatic allocation only)

| Strategy | Description | Trade-offs |
|----------|-------------|-----------|
| `RANDOM` (default) | Random free CIDR block | Fastest for concurrent reservations of the same prefix length; can fragment address space. |
| `FIRST_AVAILABLE` | Free block with the numerically lowest start | Most predictable; maximizes contiguous free space; contention and slower allocation. |
| `RANDOM_FIRST_N_AVAILABLE` | Find N lowest free blocks of the requested length, pick one at random | Reduces contention while keeping contiguous space; larger N improves concurrency but may fragment. |
| `FIRST_SMALLEST_FITTING` | Smallest free blocks that can contain the prefix; lowest start among them | Minimizes fragmentation; most contention, slowest. |

## Notes

- Purpose types (cannot change after creation): PSC endpoint ranges: purpose `INTERNAL_ADDRESS`, peering `FOR_SELF`, usage `FOR_VPC`, IPv4 only, must not overlap existing subnets or routes, and no subnets or child ranges inside.
- Usage types: Migration ranges (IPv4 only) specify a CIDR range, a source subnet and a target subnet: the CIDR must match or contain the source subnet range; source and target can be in different projects; the source must be in the same project as the range; the target need not exist yet. After the source subnet is deleted, the CIDR can only be assigned to a subnet matching the target. Delete the range after migration.
- IPv4 allocation strategies (automatic allocation only): Example: reserving a `/24` from `10.0.0.0/8` where only `10.1.0.0/25`, `10.2.0.0/16`, `10.3.0.0/23` are free gives `RANDOM` any free `/24` such as `10.2.179.0/24`; `FIRST_AVAILABLE` `10.2.0.0/24`; `RANDOM_FIRST_N_AVAILABLE` with N=3 one of `10.2.0.0/24`, `10.2.1.0/24`, `10.2.2.0/24`; `FIRST_SMALLEST_FITTING` `10.3.0.0/24`.
- By default you cannot reserve a range containing IPs used by other resources in the network. Overlap with subnets, routes or both can be enabled; resources cannot use an existing range's IPs unless associated with it (subnets) or overlap is allowed (routes, `overlaps` set to `OVERLAP_ROUTE_RANGE`).
- Mutability: an immutable range only allows description changes; a mutable one (default) allows changing the CIDR, overlap behavior and description. Immutability cannot be changed after creation.
- Example: with a mutable range `10.0.0.0/24` and no overlap, creating a subnet for `10.0.0.0/25` fails unless associated with the range, and a route fails unless `overlaps` is `OVERLAP_ROUTE_RANGE`.
- Deleting a subnet releases its CIDR to any resource unless a `FOR_MIGRATION` range holds it, so a migration can break connectivity; try it on a disposable subnet first.
- There is a per-project quota on internal range resources (see VPC quotas). Internal ranges are managed with `gcloud network-connectivity internal-ranges`; Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/internal-ranges/create (gcloud 593.0.0 help).
- Source inconsistency: the use case "Use only within the range's VPC network" lists peering type `NOT_SHARED`, but the peering type definitions say `NOT_SHARED` is "usable by both the parent VPC network and peer networks" and `FOR_SELF` is "usable only in the parent VPC network". The table is kept as in the source; by the definitions, `FOR_SELF` is the value that keeps a range from peers.
- Source: https://docs.cloud.google.com/vpc/docs/internal-ranges (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ip-addresses.md](./ip-addresses.md)
- [reserve-static-internal-ip-address.md](./reserve-static-internal-ip-address.md)
