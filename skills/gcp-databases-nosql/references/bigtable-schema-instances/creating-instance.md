---
source: https://docs.cloud.google.com/bigtable/docs/creating-instance
---

# Create an instance

A Bigtable instance is the top-level container for clusters and tables and configures storage and replication across up to 8 regions. Create it with the Google Cloud console, the Google Cloud CLI, the `cbt` CLI or the client libraries.

## Signature / Usage

### Install cbt

```text
gcloud components install cbt
```

### gcloud

The source shows one syntax template for both node modes; it is split here into two runnable forms. Repeat `--cluster-config` once per cluster.

Manual node allocation:

Adapted (not in the official docs): the source template splits each `--cluster-config` value across continuation lines and puts `node-scaling-factor` outside the flag; rewritten as one `--cluster-config` argument per `gcloud bigtable instances create --help`.

```bash
gcloud bigtable instances create INSTANCE_ID \
    --display-name=DISPLAY_NAME \
    --cluster-storage-type=CLUSTER_STORAGE_TYPE \
    --cluster-config=id=CLUSTER_ID,zone=CLUSTER_ZONE,nodes=NODES,node-scaling-factor=NODE_SCALING_FACTOR
```

Autoscaling (for CMEK, append `,kms-key=KMS_KEY` to the `--cluster-config` value):

Adapted (not in the official docs): the source template splits the autoscaling `--cluster-config` value across continuation lines; rewritten as one argument per `gcloud bigtable instances create --help`.

```bash
gcloud bigtable instances create INSTANCE_ID \
    --display-name=DISPLAY_NAME \
    --cluster-config=id=CLUSTER_ID,zone=CLUSTER_ZONE,autoscaling-min-nodes=AUTOSCALING_MIN_NODES,autoscaling-max-nodes=AUTOSCALING_MAX_NODES,autoscaling-cpu-target=AUTOSCALING_CPU_TARGET,autoscaling-storage-target=AUTOSCALING_STORAGE_TARGET
```

CMEK key format:

```text
projects/PROJECT/locations/LOCATION/keyRings/KEYRING/cryptoKeys/KEY
```

### cbt

```text
cbt createinstance INSTANCE_ID \
    DISPLAY_NAME \
    CLUSTER_ID \
    CLUSTER_ZONE \
    CLUSTER_NUM_NODES \
    CLUSTER_STORAGE_TYPE
```

Add a cluster (replication):

```text
cbt -instance=INSTANCE_ID \
createcluster CLUSTER_ID \
ZONE \
NUM_NODES \
STORAGE_TYPE
```

### Node.js

```javascript
// Creates a Production Instance with the ID "ssd-instance"
// with cluster id "ssd-cluster", 3 nodes and location us-central1-f
const {BigtableInstanceAdminClient} = require('@google-cloud/bigtable').v2;
const instanceAdminClient = new BigtableInstanceAdminClient();
const projectId = await instanceAdminClient.getProjectId();

const instanceOptions = {
  parent: `projects/${projectId}`,
  instanceId: instanceID,
  instance: {
    displayName: instanceID,
    labels: {'prod-label': 'prod-label'},
    type: 'PRODUCTION',
  },
  clusters: {
    [clusterID]: {
      location: `projects/${projectId}/locations/us-central1-f`,
      serveNodes: 3,
      defaultStorageType: 'SSD',
    },
  },
};

// Create production instance with given options
const [prodInstance, operation] =
  await instanceAdminClient.createInstance(instanceOptions);
await operation.promise();
console.log(`Created Instance: ${prodInstance.name}`);
```

### Python

```python
cluster = instance.cluster(
    cluster_id,
    location_id=location_id,
    serve_nodes=serve_nodes,
    default_storage_type=storage_type,
)
if not instance.exists():
    print("\nCreating an instance")
    # Create instance with given options
    operation = instance.create(clusters=[cluster])
    # Ensure the operation completes.
    operation.result(timeout=480)
    print("\nCreated instance: {}".format(instance_id))
```

## Options / Props

| Flag / field | Description |
|--------------|-------------|
| `INSTANCE_ID` | Permanent identifier for the instance |
| `--display-name` | Human-readable name shown in the console |
| `--edition` | `ENTERPRISE` (default) or `ENTERPRISE_PLUS` |
| `--cluster-storage-type` | `SSD` (default) or `HDD`; permanent choice; SSD required for the in-memory tier |
| `--cluster-config` keys | `id`, `zone`, `nodes`, `autoscaling-min-nodes`, `autoscaling-max-nodes`, `autoscaling-cpu-target` (10 to 80), `autoscaling-storage-target` (optional, GiB), `kms-key` |
| `node-scaling-factor` | `node-scaling-factor-2x` or `node-scaling-factor-1x`; works with manual scaling and autoscaling |
| `--project` | Project to create the cluster in if different from the current one |
| `--tags` | Tags as `TAGKEY_NAME=TAGVALUE_NAME` (permanent IDs or namespaced names), comma-separated |
| cbt `CLUSTER_STORAGE_TYPE` | `SSD` or `HDD`; all clusters in an instance must use the same type |

## Notes

- Corrected from the official docs: the source's syntax template reads `[--cluster-config=id=CLUSTER_ID,zone=CLUSTER_ZONE, \` / `nodes=NODES] \` ... `kms-key=KMS_KEY], \` / `[node-scaling-factor=NODE_SCALING_FACTOR]`; each `--cluster-config` must be a single argument without spaces, and `node-scaling-factor` is a key inside it (per `gcloud bigtable instances create --help`).
- At least one cluster is required via `--cluster-config`; repeat the flag per cluster. Without `nodes`, Bigtable allocates nodes from your data footprint (targets 50% storage utilization), which affects pricing. Prefer autoscaling; use `autoscaling-` keys and not `nodes`.
- CMEK: have the key ready before creating the instance; it cannot be added or changed afterwards. The CMEK key must be in the same region as each cluster, and CMEK clusters can only be added to CMEK-protected instances. The `cbt` CLI cannot create CMEK resources, configure autoscaling or enable 2x node scaling; each zone can hold only one cluster; for more than six clusters create six and then add more.
- Review replication settings in the default app profile after creation.
- Node.js and Python samples omit variable definitions (`instanceID`, `clusterID`, etc.); the source also shows Console, C++, C#, Go, Java, PHP and Ruby samples.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`). See `gcp-client-libraries` for client library and ADC patterns; `gcp-foundation` for IAM.
- Source: https://docs.cloud.google.com/bigtable/docs/creating-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0). gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/create

## Related

- [create-instance-write-data-cbt-cli.md](./create-instance-write-data-cbt-cli.md)
- [tables-and-views.md](./tables-and-views.md)
- [schema-design-steps.md](./schema-design-steps.md)
