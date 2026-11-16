---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/managing-clusters
---

# Manage clusters

View, set defaults for, change zones of, resize, protect from deletion and register GKE clusters to a fleet.

## Signature / Usage

### View clusters

```bash
gcloud container clusters describe CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container clusters list
```

```bash
gcloud container clusters list \
    --location=CONTROL_PLANE_LOCATION
```

### Set a default cluster for gcloud

```bash
gcloud config set container/cluster CLUSTER_NAME
```

### Add or remove zones (Standard clusters)

Nodes are added or removed immediately; make sure workloads in a removed zone can tolerate disruption. For zonal clusters, `--node-locations` must contain the cluster's primary zone. Do not put spaces between zone names.

Adapted (not in the official docs): added the missing line-continuation backslash after `--location us-central1-a` (the source omits it, so the command would split in a shell).

```bash
gcloud container clusters update example-cluster \
  --location us-central1-a \
  --node-locations us-central1-a,us-central1-b,us-central1-c
```

```bash
gcloud container clusters update CLUSTER_NAME \
  --location CONTROL_PLANE_LOCATION \
  --node-locations COMPUTE_ZONE1,COMPUTE_ZONE2
```

Regional cluster (changing zones of an existing regional cluster is possible only with gcloud):

```bash
gcloud container clusters update example-cluster \
  --location us-central1 \
  --node-locations us-central1-a,us-central1-b
```

### Prevent cluster deletion with an IAM deny policy

Create and attach a tag key (for example `do_not_delete`) to protected clusters, then create a deny policy JSON file:

```json
{
  "displayName": "Prevent cluster deletion based on tag",
  "rules": [
    {
      "description": "Prevent cluster deletion based on tag",
      "deniedPrincipals": [
        "principalSet://goog/public:all"
      ],
      "deniedPermissions": [
        "container.googleapis.com/clusters.delete"
      ],
      "denialCondition": {
        "title": "Cluster has the do_not_delete tag",
        "expression": "resource.hasTagKey('TAG_KEY_NAME')"
      }
    }
  ]
}
```

Replace `TAG_KEY_NAME` with the path to the tag key you created.

```bash
gcloud iam policies create POLICY_ID \
    --attachment-point=ATTACHMENT_POINT \
    --kind=denypolicies --policy-file=POLICY_FILE
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `CONTROL_PLANE_LOCATION` | Region for regional clusters, zone for zonal clusters |
| `COMPUTE_ZONE1,COMPUTE_ZONE2,[...]` | Node zones; all in the control plane's region |
| `POLICY_ID` | ID of the deny policy (unique, immutable) |
| `ATTACHMENT_POINT` | Organization, folder or project; a folder applies to clusters in all its projects |
| `POLICY_FILE` | Path to the JSON deny policy file |

## Notes

- Autopilot clusters are sized automatically from Pod specifications; resizing applies to Standard clusters (can scale nodes to zero). Vertical Pod Autoscaling can recommend or apply CPU / memory requests.
- GKE auto-upgrades clusters; Standard clusters can be upgraded manually.
- With the deny policy, any attempt to delete a cluster carrying the tag key fails with `Permission denied` until the tag key is detached. The deny rule covers any principal (`principalSet://goog/public:all`); try it on a disposable cluster first.
- Fleets enable features such as Multi Cluster Ingress, Config Sync and Policy Controller; clusters can be added via Console, gcloud, Terraform or Config Connector.
- The source also shows Console forms; they are omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/managing-clusters (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the first zonal example omitted the trailing `\` after `--location us-central1-a`.

## Related

- [deleting-a-cluster.md](./deleting-a-cluster.md)
- [cluster-access-for-kubectl.md](./cluster-access-for-kubectl.md)
- [configuration-overview.md](./configuration-overview.md)
