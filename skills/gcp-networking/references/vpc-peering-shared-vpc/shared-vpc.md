---
source: https://docs.cloud.google.com/vpc/docs/shared-vpc
---

# Shared VPC

Shared VPC lets an organization connect resources from multiple projects to a common VPC network and communicate using internal IP addresses from it. A host project owns the Shared VPC networks; service projects attached to it use their subnets. It is called "XPN" in the API.

## Signature / Usage

### Enable a host project and attach a service project

Adapted (not in the official docs): the host project is named `host-project`, the project that the next command attaches to (the gcloud help example for `enable` uses `myproject`).

```bash
gcloud compute shared-vpc enable host-project
```

```bash
gcloud compute shared-vpc associated-projects add \
    --host-project=host-project service-project
```

## Options / Props

### Required administrative roles

| Administrator | IAM role | Purpose |
|---|---|---|
| Organization Admin | `resourcemanager.organizationAdmin` | Nominates Shared VPC Admins by granting project creation/deletion roles and the Shared VPC Admin role for the organization. |
| Shared VPC Admin | `compute.xpnAdmin` and `resourcemanager.projectIamAdmin` (organization or folders) | Enables host projects, attaches service projects, delegates subnet access. The role on an organization applies to all folders; on a folder it applies to that folder and nested ones. Linking projects in two folders requires the role on both. |
| Service Project Admin | `compute.networkUser` (whole host project or selected subnets); also `compute.instanceAdmin` on the service project | Creates and manages instances using the Shared VPC network. |
| Network Admin (optional) | `compute.networkAdmin` on the host project | Full control of network resources except firewall rules and SSL certificates. |
| Security Admin (optional) | `compute.securityAdmin` on the host project | Manages firewall rules and SSL certificates. |

### Organization policy constraints

| Constraint | Effect |
|---|---|
| `constraints/compute.restrictSharedVpcHostProjects` | Limits host projects a non-host project (or those in a folder/organization) can attach to. Applies at attach time; existing attachments remain. |
| `constraints/compute.restrictSharedVpcSubnetworks` | Limits Shared VPC subnets a service project can use for new VMs and load balancers; existing resources are unaffected. Private Service Connect endpoint forwarding rules are not restricted. |

### Rules for projects and networks

| Rules for projects and networks |
|---|
| A project can't be both host and service project; each service project attaches to a single host project; multiple host projects are allowed. |
| Host and service projects must be in the same organization (exception: temporarily during an organization migration). |
| Shared networks can be auto or custom mode; legacy networks are not supported. |
| Share all host subnets (new subnets, including in new networks, are shared automatically) or share individual subnets. Attachments are at the project level. |
| Project-level `compute.networkUser` covers all current and future subnets and networks of the host project; subnet-level restricts to the selected subnets. After new networks or subnets are added, review `compute.networkUser` bindings. |

### Resources, IPs, DNS

| Resources, IPs, DNS |
|---|
| Using a Shared VPC network is not mandatory. Existing resources in a newly attached service project do not switch to it; eligible resources (for example VM instances; also private zones) must be created again to use a shared subnet. |
| Instances must be in a zone of the subnet's region. |
| Ephemeral IPv4/IPv6: allocated from the selected shared subnet. Static internal IPv4/IPv6 and static external IPv6: the address object must be created in the same service project as the resource, with the value taken from the shared subnet. Static external IPv4 address objects defined in the host project can be used by the host or any attached service project; service projects can also use their own. |
| Internal DNS names use the service project ID. Cloud DNS private zones: create in the host project and authorize the Shared VPC network, or create in a service project using cross-project binding. |
| Quotas: standard per-project VPC quotas, per-network and per-instance limits, plus limits specific to Shared VPC (see the VPC quota page). |

## Notes

- Billing: Billing for resources is attributed to the service project where the resource is, at the same rates as if in the host project. Outbound instance traffic goes to the instance's project; load balancer costs to the project holding its components; outbound traffic to VPNs to the project containing the VPN gateway (the host project for a gateway in the Shared VPC network); traffic out through a VLAN attachment to the project owning the attachment.
- Load balancing: Backends are normally created in a service project, with all load balancer components in that project. Supported Shared VPC architectures are documented for: external Application, internal Application, external proxy Network, internal proxy Network, internal passthrough Network, regional external passthrough Network, and global external passthrough Network Load Balancers (see the `gcp-load-balancing` skill).
- Example scenarios in the source: basic (two service projects with subnets `10.0.1.0/24` in `us-west1` and `10.15.2.0/24` in `us-east1`), multiple host projects (separate test and production), hybrid with Cloud VPN and global dynamic routing, and a two-tier web service with subnet-level permissions per tier.
- Attaching or enabling hosts is an administrative change affecting many projects; try it on disposable projects first. The code blocks are taken from the gcloud 593.0.0 help EXAMPLES.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/shared-vpc/enable and https://docs.cloud.google.com/sdk/gcloud/reference/compute/shared-vpc/associated-projects/add (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill. The source has no code block and shows diagrams.
- Corrected from the official docs: the two gcloud help examples name different host projects (`shared-vpc enable myproject`, then `associated-projects add --host-project=host-project`); the first now enables `host-project`, so the second attaches to a project that was enabled as a host.
- Source: https://docs.cloud.google.com/vpc/docs/shared-vpc (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-peering.md](./vpc-peering.md)
- [using-vpc-peering.md](./using-vpc-peering.md)
