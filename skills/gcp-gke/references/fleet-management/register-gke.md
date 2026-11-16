---
source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/register/gke
---

# Register a cluster on Google Cloud to your fleet

How to add a GKE cluster on Google Cloud to a fleet, either while creating the cluster or for an existing cluster, using the Google Cloud CLI, Config Connector, Terraform or the Google Cloud console.

## Signature / Usage

### Create and register a new cluster (gcloud)

Requires gcloud CLI 450.0.0 or higher. Registering with gcloud gives the cluster a regional membership location by default.

```bash
gcloud container clusters create-auto CLUSTER_NAME --enable-fleet
```

```bash
gcloud container clusters create-auto CLUSTER_NAME --enable-fleet --membership-type=LIGHTWEIGHT
```

```bash
gcloud container clusters create CLUSTER_NAME --enable-fleet \
--workload-pool=PROJECT_ID.svc.id.goog
```

```bash
gcloud container clusters create CLUSTER_NAME --enable-fleet --membership-type=LIGHTWEIGHT
```

`CLUSTER_NAME` becomes the membership name; the command errors if the fleet already has a cluster with that name. `PROJECT_ID` is the project that owns the new cluster. For Standard clusters, `--workload-pool` is recommended (it enables fleet Workload Identity Federation for regular memberships; lightweight memberships cannot use it) but can be omitted; Autopilot has Workload Identity Federation for GKE enabled by default.

### Register an existing cluster (gcloud)

Registering with a regular membership (`--enable-fleet` without `--membership-type=LIGHTWEIGHT`, or `--fleet-project`) enables fleet Workload Identity Federation if the cluster already has Workload Identity Federation for GKE enabled. Lightweight memberships cannot use fleet Workload Identity Federation.

```bash
gcloud container clusters update CLUSTER_NAME --enable-fleet
```

```bash
gcloud container clusters update CLUSTER_NAME --enable-fleet --membership-type=LIGHTWEIGHT
```

Register to a fleet in a different project (set up cross-project permissions first). Replace `PROJECT_ID_OR_NUMBER` with the fleet host project ID or number.

```bash
gcloud container clusters update CLUSTER_NAME --fleet-project=PROJECT_ID_OR_NUMBER
```

Adapted (not in the official docs): the line continuation in the source used `/` instead of `\`, which breaks the command; corrected to `\`.

```bash
gcloud container clusters update CLUSTER_NAME --fleet-project=PROJECT_ID_OR_NUMBER \
--membership-type=LIGHTWEIGHT
```

Convert from lightweight to regular membership:

```bash
gcloud container clusters update CLUSTER_NAME --unset-membership-type
```

### Config Connector (version above 1.47.0)

```yaml
apiVersion: container.cnrm.cloud.google.com/v1beta1
kind: ContainerCluster
metadata:
  name: CLUSTER_NAME
spec:
  location: LOCATION
  initialNodeCount: 1
```

```yaml
apiVersion: gkehub.cnrm.cloud.google.com/v1beta1
kind: GKEHubMembership
metadata:
  name: MEMBERSHIP_NAME
spec:
  location: MEMBERSHIP_LOCATION
  endpoint:
    gkeCluster:
      resourceRef:
        name: CLUSTER_NAME
```

Cross-project: add `metadata.annotations: cnrm.cloud.google.com/project-id: FLEET_PROJECT_ID`. For an existing cluster not created by Config Connector, replace `resourceRef` with `external: //container.googleapis.com/CLUSTER_RESOURCE_NAME` (for example `projects/my-project/zones/us-west1-a/clusters/my-cluster`).

Enable Workload Identity Federation for GKE and fleet Workload Identity Federation:

```yaml
spec:
  workloadIdentityConfig:
    workloadPool: PROJECT_ID.svc.id.goog
```

Adapted (not in the official docs): the source ended this YAML with a stray `}`, which is invalid YAML; removed.

```yaml
spec:
  authority:
    issuer: https://container.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/clusters/CLUSTER_NAME
```

## Options / Props

| Placeholder | Meaning |
|---|---|
| `MEMBERSHIP_LOCATION` | Location of the Fleet service managing the membership: the cluster's own location (recommended) or `global`. A location different from the cluster's location makes registration fail. |
| `LOCATION` | Zone or region of the GKE cluster resource, for example `us-central1-a` |
| `FLEET_PROJECT_ID` | Fleet host project for cross-project registration |

## Notes

- Prerequisites: general fleet prerequisites; for fleet Workload Identity Federation, Workload Identity Federation for GKE enabled on the cluster; for cross-project registration, extra permissions; for Terraform or Config Connector, a Google Cloud service account for the tool. Set `compute/region` and `compute/zone` to avoid `One of [--zone, --region] must be supplied:`.
- Terraform: use the `google` provider version 5.6.0 or later with a `fleet { project = "FLEET_HOST_PROJECT" }` block in `google_container_cluster`; `workload_identity_config { workload_pool = "PROJECT_ID.svc.id.goog" }` enables Workload Identity Federation for GKE. The source also shows Console steps and the full Terraform blocks, omitted here. If `fleet.project` is not set, the cluster is not registered.
- In the Console, clusters with Workload Identity Federation for GKE automatically get fleet Workload Identity Federation when registered. Autopilot clusters have it enabled by default.
- Distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Source inconsistency: the source says "Both of these commands enable fleet Workload Identity Federation" right after listing the regular and the `--membership-type=LIGHTWEIGHT` registration commands, while the fleet Workload Identity Federation page says lightweight memberships cannot use it. The sentence is applied to regular memberships only here (see `about-fleet-workload-identity-federation.md`).
- Source: https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/register/gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the `--fleet-project ... /` continuation and the trailing `}` after the `issuer` field.

## Related

- [fleet-creation.md](./fleet-creation.md)
- [about-fleet-workload-identity-federation.md](./about-fleet-workload-identity-federation.md)
- [manage-features.md](./manage-features.md)
