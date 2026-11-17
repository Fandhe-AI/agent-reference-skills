---
source: https://docs.cloud.google.com/vpc/docs/about-network-attachments
---

# About network attachments

A network attachment is a regional resource that lets a producer VPC network initiate connections to a consumer VPC network through a Private Service Connect interface. When a connection is accepted, Google Cloud allocates the interface an internal IP address from the consumer subnet specified by the attachment.

## Signature / Usage

Snippet taken from the EXAMPLES section of `gcloud compute network-attachments create` (gcloud 593.0.0 help).

```bash
gcloud compute network-attachments create \
    NETWORK_ATTACHMENT_NAME --region=us-central1 \
    --subnets=MY_SUBNET --connection-preference=ACCEPT_MANUAL \
    --producer-accept-list=PROJECT1,PROJECT2 \
    --producer-reject-list=PROJECT3,PROJECT4
```

## Options / Props

### Authorization policy fields

| Field | Values | Behavior |
|---|---|---|
| Connection preference | `ACCEPT_AUTOMATIC`, `ACCEPT_MANUAL` | `ACCEPT_AUTOMATIC` accepts new connections automatically; `ACCEPT_MANUAL` decides by accept list |
| Accept list | Project IDs or service class IDs (only for `ACCEPT_MANUAL`) | Connections from listed producers are accepted; otherwise creation of the interface's VM fails |
| Reject list | Project IDs or service class IDs (only for `ACCEPT_MANUAL`) | Connections from listed producers are rejected; creation of the interface's VM fails |

### Specifications

| Specifications |
|---|
| Regional resource representing the consumer side of a Private Service Connect interface connection; associated with a single subnet. |
| Accepts connections explicitly or automatically; multiple interfaces can connect to the same network attachment. |
| If one VM has multiple interfaces, each must connect to a different network attachment with a different subnet, and to an attachment in a different VPC network, unless both hold: the consumer network uses an RDMA network profile for Falcon VPC networks, and the producer connects with virtual Private Service Connect interfaces. |
| Supports Shared VPC: the attachment can be created in a service project, but its subnet must be in a host project. |
| Connections are bi-directional and transitive. An attachment can connect to both virtual and dynamic interfaces. |

### Subnet requirements

| Subnet requirements |
|---|
| Must be a regular subnet; stack type IPv4-only, dual-stack or IPv6-only (dual-stack and IPv6-only need internal IPv6 ranges). |
| IP addresses are not reserved and other resources can use the subnet. |
| Cannot be deleted while assigned to an attachment; can be replaced (existing connections unaffected, new connections use the new subnet); the CIDR range can be expanded. |

### Limitations

| Limitations |
|---|
| Only the subnet, accept list, reject list and description can be updated; to change other fields, delete and recreate. |
| An attachment with open connections cannot be deleted; the producer must first delete the interfaces. |
| External (publicly advertised) IP addresses cannot be assigned to interfaces. |
| Quota: limited per region per project (see the VPC quota page). |

## Notes

- Authorization: all values in accept and reject lists must have the same type (no mixing project IDs and service class IDs). If the same ID is in both lists, the request is rejected. Updating lists does not affect existing connections. If a producer uses a service class ID it has no permission for, the operation fails; check the Google service's docs for whether one is required.
- Deleting or replacing network attachments can break connectivity of producer VMs; try it on a disposable resource first.
- Pricing is on the VPC pricing page and is not copied here.
- The source has no code; the gcloud example is borrowed from the gcloud 593.0.0 help. The full flag list is in the `gcp-compute` skill. The producer service's own docs are in `gcp-databases-relational` / `gcp-databases-nosql`.
- Source: https://docs.cloud.google.com/vpc/docs/about-network-attachments (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-attachments/create (gcloud 593.0.0 help).

## Related

- [private-service-connect.md](./private-service-connect.md)
- Create and manage network attachments: https://docs.cloud.google.com/vpc/docs/create-manage-network-attachments
- Private Service Connect interfaces: https://docs.cloud.google.com/vpc/docs/about-private-service-connect-interfaces
