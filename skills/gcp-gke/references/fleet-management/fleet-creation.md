---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation
---

# Fleet creation overview

How fleets are created (by registering a cluster or by creating a named empty fleet), how fleet membership, membership location and lightweight memberships work, and how each cluster type is registered.

## Signature / Usage

### Check a cluster's membership location

```bash
gcloud container fleet memberships list \
  --project=PROJECT_ID
```

```bash
gcloud container fleet memberships describe MEMBERSHIP_NAME \
  --project=PROJECT_ID
```

Replace `MEMBERSHIP_NAME` with your cluster's membership name. The location is shown in the `LOCATION` column of the list output.

### Create an empty fleet (optional)

By default a fleet is created in the fleet host project the first time you register a cluster there. To create a named fleet first (for example to set up team scopes):

Adapted (not in the official docs): the source wrote the optional flag as `[--project=FLEET_HOST_PROJECT_ID]`; the template brackets make the command unrunnable (and are globs in zsh), so the flag is shown without them.

```bash
gcloud container fleet create --display-name=NAME --project=FLEET_HOST_PROJECT_ID
```

If you do not specify `display-name`, the fleet gets a default display name based on the fleet host project name.

## Options / Props

| Cluster type | How it joins a fleet |
|---|---|
| GKE on Google Cloud | Must be explicitly registered: Console quick registration, gcloud, Terraform or Config Connector; or registered at cluster creation. Can register to a fleet in another project with extra permissions. |
| Google Distributed Cloud on VMware / bare metal | Automatically registered at creation from the cluster configuration file. On VMware 1.13 and later, both admin and user clusters must be registered; before 1.13, admin cluster registration is optional (register later by updating the configuration file and using `gkectl`). Cannot be unregistered or (except unregistered admin clusters) manually registered. |
| GKE on AWS / Azure (GKE Multi-Cloud API) | Automatically registered at creation (fleet host project given in the create command); cross-project needs extra setup. Cannot be unregistered or manually registered. |
| Third-party clusters (attached clusters) | Register manually (EKS, AKS, any CNCF-conformant cluster with x86 nodes) using the GKE Multi-Cloud API. |

Membership location (Fleet service instance managing the membership):

| Registration | Location |
|---|---|
| GKE clusters registered by using the gcloud CLI | Regional (same region as the cluster); you cannot choose another region |
| GKE clusters registered by using Config Connector | Global or regional |
| All other fleet members | Global |

## Notes

- Corrected from the official docs: `gcloud container fleet create --display-name=NAME [--project=FLEET_HOST_PROJECT_ID]`; `--project` is optional and may be omitted to use the active project.
- Registering a cluster to a fleet does not incur additional charges. Third-party (attached) clusters incur a per-vCPU charge as part of GKE pricing.
- Each fleet name is shown in the console; the default is the fleet host project ID with `fleet` appended. A cluster's fleet membership name is typically its cluster name and must be unique in the fleet; registering a duplicate name fails.
- All clusters registered before January 2023 have global memberships. You cannot change a membership location while the cluster is a member; to change it, unregister and then register again to the same fleet using gcloud or Config Connector. Unregistering is destructive for fleet features and identities; try it on a disposable cluster first.
- Lightweight memberships (GKE on Google Cloud): register as a fleet member without enabling all fleet-level configuration. They can use fleet-based rollout sequencing for upgrades, but cannot use fleet-level features, fleet-level default logs, fleet-level default metrics or fleet Workload Identity Federation.
- Moving a registered cluster between fleets (unregister then re-register) is not recommended: for example, fleet Workload Identity changes, potentially blocking requests and causing outages. Create a new cluster in the target fleet and move the workloads instead.
- Registering clusters outside Google Cloud installs the Connect Agent on the cluster.
- Viewing fleets across projects in your organization requires at least `roles/gkehub.viewer`. Fleets can be viewed in the console (GKE page, All fleets, or the Fleet drop-down which opens the fleet dashboard); the source shows only Console steps for this.
- Google Distributed Cloud on VMware / bare metal were formerly Anthos clusters on VMware / bare metal; GKE on AWS / Azure support ends March 17, 2027.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/aws/deprecations/deprecation-announcement (retrieved 2026-11-16; states GKE on AWS shutdown on March 17, 2027)
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/azure/deprecations/deprecation-announcement (retrieved 2026-11-16; states GKE on Azure shutdown on March 17, 2027)
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/fleet-creation (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [register-gke.md](./register-gke.md)
- [plan-fleets.md](./plan-fleets.md)
- [connect-agent.md](./connect-agent.md)
- [quotas.md](./quotas.md)
