---
source: https://docs.cloud.google.com/vpc/docs/reserve-static-internal-ip-address
---

# Reserve a static internal IP address

Reserve and manage static internal IPv4 or IPv6 addresses in VPC networks. Reserving takes the address out of the dynamic allocation pool, so the same address can be reused for a resource that is deleted and re-created.

## Signature / Usage

### Reserve a new address

Replace `ADDRESS_NAMES` (one or more names, space-separated), `REGION`, `SUBNETWORK`, `IPV4_ADDRESS` (must be in the subnet primary range; omit to auto-allocate) and `IPV6_ADDRESS` (a `/96` from the subnet's `/64` internal range). The source annotates `ADDRESS_NAMES` with `[--purpose=SHARED_LOADBALANCER_VIP]` (names of one or more addresses, separated by spaces, for example `example-address-1 example-address-2 example-address-3`).

```bash
gcloud compute addresses create ADDRESS_NAMES \
    --region REGION --subnet SUBNETWORK \
    --addresses IPV4_ADDRESS
```

Auto-allocate an IPv6 address (specify `--ip-version IPV6`):

```bash
gcloud compute addresses create ADDRESS_NAMES \
    --region REGION --subnet SUBNETWORK \
    --ip-version IPV6
```

Reserve a specific IPv6 address (do not include `--ip-version`):

```bash
gcloud compute addresses create ADDRESS_NAMES \
    --region REGION --subnet SUBNETWORK \
    --addresses IPV6_ADDRESS
```

Example, a specific IPv4 address:

```bash
gcloud compute addresses create example-address-1 \
    --region us-central1 \
    --subnet subnet-1 \
    --addresses 10.128.0.12
```

### Reserve with the API

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/addresses
```

The body must include `addressType` (`INTERNAL`), `name` and `subnetwork`; `purpose` is optional. For IPv6 also set `ipVersion` to `IPV6`.

```json
{
  "addressType": "INTERNAL",
  "name": "example-ipv6-address-1",
  "ipVersion": "IPV6",
  "subnetwork": "regions/us-central1/subnetworks/my-custom-subnet",
  "address": "2001:db8:a0b:c0d:e0f:f0e::",
  "purpose": "GCE_ENDPOINT"
}
```

### Promote an in-use ephemeral address to static

Find the current address first:

```bash
gcloud compute instances describe INSTANCE_NAME --zone ZONE | grep "networkIP"
```

For IPv6 use `grep "ipv6Address"`; for a regional forwarding rule:

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME --region REGION | grep "IPAddress"
```

Promote IPv4 (`--prefix-length` optional, integer 7 to 31, only for ranges):

```bash
gcloud compute addresses create IPV4_ADDRESS_NAMES \
  --addresses IPV4_ADDRESSES \
  --region REGION \
  --prefix-length PREFIX_LENGTH \
  --subnet SUBNETWORK
```

API body for promoting IPv4 (for IPv6 also set `"prefixLength": 96`):

```json
{
  "name": "example-IPv4-address-1",
  "addressType": "INTERNAL",
  "address": "10.128.0.2",
  "subnetwork": "regions/us-central1/subnetworks/my-custom-subnet"
}
```

### List and release

```bash
gcloud compute addresses list
```

```bash
gcloud compute addresses delete ADDRESS_NAME \
    --region REGION
```

List with REST: `GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/addresses`, or all regions with `GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/aggregated/addresses`.

## Options / Props

### Required role and permissions

Compute Network Admin (`roles/compute.networkAdmin`) on the project, which includes:

| Permission | On |
|------------|----|
| `compute.addresses.create` | the IP address |
| `compute.addresses.createInternal` | the IP address |
| `compute.networks.list` | the network |
| `compute.subnetworks.use` | the subnet |
| `compute.subnetworks.list` | the subnet |

### Limitations

| Limitation |
|------------|
| Count cannot exceed the project's per-project quota (VPC quotas). |
| Only one resource at a time can use a static internal IP address. |
| Supported only for VPC networks, not legacy mode networks. |
| Deleting a resource does not release the address; release it manually. |
| Interface stack types: IPv4-only (internal IPv4 required, external IPv4 optional); dual-stack (internal IPv4 required, external IPv4 optional, a `/96` IPv6 range internal or external but not both, required); IPv6-only (a `/96` range, internal or external but not both). |
| You cannot unassign or change the internal IPv4 address of an existing resource, or the internal IPv6 address of a VM with an IPv6-only interface; you can promote an ephemeral address to static. |
| You cannot rename a static IP address. |
| Static internal addresses are regional and usable only in the region where reserved. |

## Notes

- IPv6 ULA reservation requires a network with the ULA internal IPv6 range enabled and a subnet with an IPv6 range and the `INTERNAL` access type. An internal IPv6 address cannot be shared across multiple load balancer frontends.
- HA VPN over Cloud Interconnect: reserve a range with `--purpose=IPSEC_INTERCONNECT` and `--prefix-length` between 26 and 29.
- Shared VPC: the address object is created in the same service project as the resource that uses it, with its value taken from the shared subnet.
- Release: the Console only releases an address not used by another resource; gcloud and the API can release an address that is in use, which then stays attached until the resource is deleted. Releasing is destructive for the reservation; try it on a disposable address first.
- A promoted internal IPv6 address stays attached to the instance; unassign it before assigning it to another resource.
- The source also shows Console and Terraform. Only IPv4 and IPv6 forms of the main commands are kept here. The full gcloud flag list is in the `gcp-compute` skill.
- Clarified from the official docs: the IPv6 example address `2001:db8:a0b:c0d:e0f:f0e::` is a placeholder from the documentation prefix; internal IPv6 subnet ranges are normally unique local addresses (ULAs) assigned from the VPC network's `/48` ULA range (VPC subnets page, https://docs.cloud.google.com/vpc/docs/subnets, retrieved 2026-11-17), so use an address from your subnet's IPv6 range.
- Source: https://docs.cloud.google.com/vpc/docs/reserve-static-internal-ip-address (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [ip-addresses.md](./ip-addresses.md)
- [alias-ip.md](./alias-ip.md)
- [internal-ranges.md](./internal-ranges.md)
