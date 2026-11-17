---
source: https://docs.cloud.google.com/vpc/docs/configure-private-services-access
---

# Configure private services access

Steps to set up private services access: create an allocated range (reserves an IP range for the producer), then create a private connection (VPC Network Peering to the producer network). VMs then reach services over internal IPs only, with no internet access or external IPs.

## Signature / Usage

### Create an allocated range with a given address

```bash
gcloud compute addresses create RESERVED_RANGE_NAME \
    --global \
    --purpose=VPC_PEERING \
    --addresses=192.168.0.0 \
    --prefix-length=16 \
    --description="DESCRIPTION" \
    --network=VPC_NETWORK
```

### Create an allocated range, address chosen automatically

```bash
gcloud compute addresses create RESERVED_RANGE_NAME \
    --global \
    --purpose=VPC_PEERING \
    --prefix-length=16 \
    --description="DESCRIPTION" \
    --network=VPC_NETWORK
```

Replace `RESERVED_RANGE_NAME` (such as `my-allocated-range`), `DESCRIPTION` and `VPC_NETWORK`.

### Create a private connection

```bash
gcloud services vpc-peerings connect \
    --service=servicenetworking.googleapis.com \
    --ranges=RESERVED_RANGE_NAME \
    --network=VPC_NETWORK
```

The command starts a long-running operation. Check it:

```bash
gcloud services vpc-peerings operations describe \
    --name=OPERATION_NAME
```

### List allocated ranges and private connections

```bash
gcloud compute addresses list --global --filter="purpose=VPC_PEERING"
```

```bash
gcloud services vpc-peerings list \
    --network=VPC_NETWORK
```

### Modify a private connection

Adapted (not in the official docs): removed the `[--force]` template brackets, which make the command unrunnable in a shell (add `--force` only when removing a range from the connection, see Options / Props), and `--ranges` lists `EXISTING_RANGE_NAMES` (the ranges already assigned, from `gcloud services vpc-peerings list --network=VPC_NETWORK`) before the new `RESERVED_RANGE_NAME`, because the update replaces the list.

```bash
gcloud services vpc-peerings update \
    --service=servicenetworking.googleapis.com \
    --ranges=EXISTING_RANGE_NAMES,RESERVED_RANGE_NAME \
    --network=VPC_NETWORK
```

### Delete an allocated range and a private connection

```bash
gcloud compute addresses delete NAME \
    --global
```

```bash
gcloud services vpc-peerings delete \
    --service=servicenetworking.googleapis.com \
    --network=VPC_NETWORK
```

### Peer DNS with the service producer

```bash
gcloud services peered-dns-domains create PEERING_NAME \
    --network=VPC_NETWORK \
    --dns-suffix=DNS_SUFFIX
```

```bash
gcloud services peered-dns-domains list \
    --network=VPC_NETWORK
```

```bash
gcloud services peered-dns-domains delete PEERING_NAME \
    --network=VPC_NETWORK
```

`DNS_SUFFIX` must be a complete domain name including the trailing dot, for example `example.com.`.

### Grant the Service Networking service agent role

Adapted (not in the official docs): `HOST_PROJECT_NAME` is `HOST_PROJECT_ID`, because `gcloud projects add-iam-policy-binding` takes a project ID, not a project name.

```bash
gcloud projects add-iam-policy-binding HOST_PROJECT_ID \
    --member=serviceAccount:service-HOST_PROJECT_NUMBER@service-networking.iam.gserviceaccount.com \
    --role=roles/servicenetworking.serviceAgent
```

`HOST_PROJECT_ID` is the host project ID, `HOST_PROJECT_NUMBER` its project number.

## Options / Props

### Prerequisites and permissions

- Enable the Service Networking API in the project (required to create a private connection); have a VPC network; install the Google Cloud CLI for gcloud examples.
- Project owners and principals with Compute Network Admin (`roles/compute.networkAdmin`) can create allocated ranges and manage private connections.
- DNS peering requires the Cloud DNS API enabled. All supported services support DNS peering except Cloud SQL.

### Choosing the allocated range

| Rule | Detail |
|------|--------|
| Size | For Google services minimum a single `/24`, recommended `/16`; check producer docs. Quotas limit the number of ranges, not their size |
| Separation | Fully separate from current and future subnet ranges, including peered networks and NCC hub VPC spokes |
| Custom routes | Don't match or contain custom static/dynamic route destinations. E.g. for `10.0.0.0/16`: a route for `10.0.0.0/16` makes all of it unavailable; a route for `10.0.0.0/20` makes that portion unavailable; a route for `10.0.0.0/8` has no effect. Otherwise "allocation exhausted" errors occur |
| Conflicts | Avoid `172.17.0.0/16` if a product you use relies on it (e.g. default Docker bridge); in an auto mode VPC network don't match or overlap `10.128.0.0/9` |
| Naming | Google services name their own allocation `google-managed-services-CONSUMER_NETWORK_NAME` and reuse it if it exists |

### Private connection rules

- One connection suffices for all services of one producer. Use a unique allocated range per producer; don't reuse a range across producers (also for multiple producer organizations).
- Multiple ranges may be assigned; addresses are used in the order you specified.
- You can't modify an allocated range, but you can add or remove ranges on a connection without disrupting traffic. `--ranges` in `update` replaces the previous list; removing a range requires `--force`. A removed range isn't deleted, existing producer resources may keep using it, and it's not used for new subnets.

### Hybrid connectivity

- Export custom routes on the peering connection to send eligible static and dynamic routes (for example to on-premises) to the producer network. If the learned routes overlap Private Google Access ranges, producer traffic to Google services may be misrouted over the peering; avoid overlapping exports or enable VPC Service Controls for the private services access connection.
- Advertise the allocated range prefixes to on-premises via Cloud Router, and ensure the VLAN attachment or Cloud VPN tunnel ends in the same VPC network (or Shared VPC network) as the private connection, since peering isn't transitive.

### Troubleshooting

| Problem | Cause / resolution |
|---------|--------------------|
| `Failed to create subnetwork. Couldn't find free blocks in allocated IP ranges.` | Range too small or blocked by custom routes. Expand the allocation (contiguous range including the existing one: delete the old range, recreate with the same name and a covering range) or add another range to the connection. Never replace an in-use range with a smaller one |
| `compute.globalAddresses.list` permission error or `Error 400: Precondition check failed` | Service Networking service agent lacks `roles/servicenetworking.serviceAgent`; the account is created after enabling the API and can take time to appear |
| Old peering subnet route persists after updating the range | Range still in use; update the private connection when deleting an allocation and delete resources using it. Can take up to four days for Cloud SQL |
| `ERROR: Cannot modify allocated ranges in CreateConnection. Please use UpdateConnection. Existing allocated IP ranges: ALLOCATED_RANGE_NAMES.` | Recreate the connection with the same allocated range names (CIDRs may differ), then modify it |
| `encountered some transient internal error, please try again later` | Contact Cloud Support |
| `Constraint constraints/compute.restrictVpcPeering violated for project PROJECT_ID. Peering with network 'servicenetworking' is not allowed.` | Add `under:organizations/433637338589` to `allowedValues` of the constraint |

## Notes

- Destructive / connectivity-breaking: `gcloud compute addresses delete`, `gcloud services vpc-peerings delete` and `update --force` can break connectivity to service instances. Try them on a disposable resource first.
- Before deleting an in-use allocated range, modify the private connection to remove it; otherwise existing connections stay active but nothing prevents overlapping addresses in your VPC, new subnets can't be created, and re-adding an overlapping range fails.
- Delete a connection with the procedure above, not by deleting its VPC Network Peering directly. Delete all service instances first; Cloud SQL deletion waits four days before producer resources are removed, and deleting the connection during that window fails. A connection in use by a producer VPC spoke can't be deleted until the spoke is.
- With Shared VPC, create the allocated range and private connection in the host project. The source's role-binding example uses `HOST_PROJECT_NAME` ("the name of the host project") and `HOST_PROJECT_NUMBER`.
- Adapted from the official docs: the `update` example reads `[--force]` as a bracketed optional line, and the role-binding example uses `HOST_PROJECT_NAME` ("the name of the host project"); gcloud takes a project ID there.
- `--prefix-length` examples in the source use `192.168.0.0/16`. The source's step 3 for expanding an allocation is cut off after "if the previous allocated range was `192.168.0.0/20`, create a new allocated range"; the covering range is not given, so use a range that includes the deleted one.
- The source also shows Console and Terraform steps.
- Full `gcloud compute addresses` flags: https://docs.cloud.google.com/sdk/gcloud/reference/compute/addresses/create (see the `gcp-compute` skill).
- Corrected from the official docs: the source update example passes only `--ranges=RESERVED_RANGE_NAME`, while the same page says "`RESERVED_RANGE_NAME` replaces the previous list of allocated ranges. If you omit a range that was previously associated with this private connection, the range is removed from the connection"; the example therefore passes the existing ranges as well, so it adds a range instead of failing or removing one.
- Source: https://docs.cloud.google.com/vpc/docs/configure-private-services-access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-services-access.md](./private-services-access.md)
- [private-access-options.md](./private-access-options.md)
