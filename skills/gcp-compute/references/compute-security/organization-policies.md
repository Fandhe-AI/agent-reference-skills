---
source: https://docs.cloud.google.com/compute/docs/access/organization-policies
---

# Organization policies for Compute Engine

Overview of using the Organization Policy Service to enforce constraints on Compute Engine resources (VMs, disks, networks): use cases, the three constraint types, the 20-constraint limit and the legacy `compute.*` constraints.

## Signature / Usage

### Enforce a boolean constraint on a project

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/org-policies/enable-enforce (gcloud 593.0.0 help). It enforces the boolean constraint `compute.disableSerialPortAccess` on project `foo-project`:

Adapted (not in the official docs): removed the shell prompt `$ ` from the help example.

```bash
gcloud resource-manager org-policies enable-enforce \
    compute.disableSerialPortAccess --project=foo-project
```

## Options / Props

### Constraint types

| Type | Identification | Properties |
|---|---|---|
| Managed constraints | `compute.managed.*` prefix | Modern platform; support dry run, Policy Simulator and tag-conditioned statements (granular exemptions). |
| Managed constraints (legacy) | `compute.*` prefix | Generally lack Dry Run, Policy Simulator and tag-conditioned statements; migrate to managed constraints when an equivalent exists. |
| Custom constraints | Created with Common Expression Language (CEL) | Enforce policies on fields not covered by managed constraints; support tag-conditioned statements and safe rollout tools. |

Limit: 20 constraints per Compute Engine resource, counting managed and custom constraints combined. Legacy managed constraints do not count toward this limit.

### Legacy constraints

| Constraint | Description |
|---|---|
| `compute.allowedDeviceEncryptionKeys` | Restricts the Cloud KMS keys that can encrypt device resources. |
| `compute.disableAllIpv6` | Disables creation of or update to subnet stacks of type `IPV4_IPV6`; existing `IPV4_IPV6` subnetworks keep working, but you must delete them before creating an `IPV4_ONLY` subnetwork in the same region. |
| `compute.disableGuestAttributes` | Disables guest attributes. |
| `compute.disableInstanceDataAccessApis` | Disables access to instance metadata APIs for sensitive metadata such as sshKeys, serialPortLogging and startup/shutdown scripts. |
| `compute.disableInternetNetworkEndpointGroup` | Disables creation of Internet NEGs. |
| `compute.disableNestedVirtualization` | When `true`, disables hardware-accelerated nested virtualization for all VMs in the project. |
| `compute.disableSerialPortAccess` | Disables serial port access to VMs. |
| `compute.disableSerialPortLogging` | Disables serial port logging to Google Cloud Observability. |
| `compute.disableVpcExternalIpv6` | Prevents VPC networks with ULA internal IPv6 ranges and external IPv6 addresses on VMs in VPC networks; internal IPv6 unaffected. |
| `compute.enableComplianceMemoryProtection` | Enables memory protection features on VMs. |
| `compute.requireConfidentialVm` | Requires all new VMs to use Confidential VM. |
| `compute.requireGuestAttributes` | Requires guest attributes. |
| `compute.requireOsLogin` | Requires all new VMs to enable OS Login. |
| `compute.requireShieldedVm` | Requires that all new VMs are Shielded VMs. |
| `compute.restrictCloudNATUsage` | Restricts Cloud NAT usage to specified VPC networks. |
| `compute.restrictDedicatedInterconnectUsage` | Restricts Dedicated Interconnect usage to specified VPC networks. |
| `compute.restrictLoadBalancerCreationForTypes` | Restricts creation of load balancers to allowed types. |
| `compute.restrictPartnerInterconnectUsage` | Restricts Partner Interconnect usage to specified VPC networks. |
| `compute.restrictProtocolForwardingCreationForTypes` | Restricts protocol forwarding to internal or external target instances. |
| `compute.restrictSharedVpcHostProjects` | Restricts host projects that projects in scope can attach to. |
| `compute.restrictSharedVpcSubnetworks` | Restricts Shared VPC subnetworks projects in scope can use. |
| `compute.restrictVpcPeering` | Restricts VPC Network Peering to allowed VPC networks. |
| `compute.restrictVpnPeerIPs` | Restricts VPN peer IPs to allowed IPs. |
| `compute.setNewProjectDefaultToZonalDnsOnly` | When `true`, new projects default to Zonal DNS only (names `.zone.c.project-id.internal`); projects with Global DNS disabled cannot revert. |
| `compute.skipDefaultNetworkCreation` | Skips automatic creation of the `default` VPC network at project creation. |
| `compute.storageResourceUseRestrictions` | Restricts use of storage resources (PD-Standard, PD-SSD, PD-Balanced, Local-SSD) by location. |
| `compute.trustedImageProjects` | Restricts image access to trusted images from specified projects. |
| `compute.vmCanIpForward` | Restricts which VMs can enable IP forwarding. |
| `compute.vmExternalIpAccess` | Restricts which VMs may use external IP addresses. |

## Notes

- Policies can be set at organization, folder or project level; descendants inherit. Use cases: cost management (machine types, Persistent Disk sizes), security posture (OS Login, serial console), compliance (for example sole-tenant nodes).
- The list of `compute.managed.*` constraints is on https://docs.cloud.google.com/compute/docs/access/managed-constraints; custom constraints are on https://docs.cloud.google.com/compute/docs/access/custom-constraints.
- `compute.disableSerialPortAccess` is a security setting: it turns interactive serial console access off.
- Distance line: Compute Engine constraints only; org policy in general is in `gcp-foundation`. Cloud KMS keys are in `gcp-security` and Security Command Center is in `gcp-security-compliance`.
- Adapted from the official docs: the `enable-enforce` example drops the leading `$ ` prompt that the gcloud help shows, so the command can be pasted as is.
- Source (gcloud help): https://docs.cloud.google.com/sdk/gcloud/reference/resource-manager/org-policies/enable-enforce (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/compute/docs/access/organization-policies (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [access.md](./access.md)
- [shielded-vm.md](./shielded-vm.md)
