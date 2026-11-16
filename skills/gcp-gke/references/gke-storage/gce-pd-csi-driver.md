---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver
---

# Use the Compute Engine persistent disk CSI driver

Enable, disable and use the Compute Engine persistent disk CSI driver (`pd.csi.storage.gke.io`) on GKE: StorageClasses, PVCs, Windows clusters, Autopilot storage-compatible scheduling, `VolumeAttributesClass` for Hyperdisk, `xfs` filesystems, logs and known issues.

## Signature / Usage

### Enable or disable the driver (Standard clusters)

The driver is always enabled in Autopilot clusters and cannot be disabled or edited. In Standard clusters you must enable it. Replace `CLUSTER-NAME` with the existing cluster name.

```bash
gcloud container clusters update CLUSTER-NAME \
   --update-addons=GcePersistentDiskCsiDriver=ENABLED
```

Disabling does not terminate Pods already using the driver's PVs, but new Pods using those PVs fail to start; the in-tree `gcePersistentDisk` volume type (migrated to the CSI driver in 1.22 and later) also stops working.

```bash
gcloud container clusters update CLUSTER-NAME \
    --update-addons=GcePersistentDiskCsiDriver=DISABLED
```

### Pre-installed StorageClasses and a custom one

GKE installs `standard-rwo` (balanced persistent disk) and `premium-rwo` (SSD persistent disk). In Autopilot clusters the default is `standard-rwo`; in Standard clusters the default uses the in-tree `gcePersistentDisk` plugin.

```bash
kubectl get sc
```

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: pd-example
provisioner: pd.csi.storage.gke.io
# Recommended setting. Delays the binding and provisioning of a PersistentVolume until a Pod that uses the
# PersistentVolumeClaim is created and scheduled on a node.
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: pd-balanced
```

```bash
kubectl create -f pd-example-class.yaml
```

For `pd-extreme`, `provisioned-iops-on-create` must equal the provisioned IOPS value you set on the disk.

Adapted (not in the official docs): the source has `provisioned-iops-on-create:'10000'` with no space after the colon, which is not a valid YAML mapping; a space was added.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: pd-extreme-example
provisioner: pd.csi.storage.gke.io
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: pd-extreme
  provisioned-iops-on-create: '10000'
```

### PersistentVolumeClaim and Pod (Linux)

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: podpvc
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: standard-rwo
  resources:
    requests:
      storage: 6Gi
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-server
spec:
  containers:
   - name: web-server
     image: nginx
     volumeMounts:
       # The path in the container where the volume will be mounted.
       - mountPath: /var/lib/www/html
         # The name of the volume that is being defined in the "volumes" section.
         name: mypvc
  volumes:
   - name: mypvc
     persistentVolumeClaim:
       # References the PersistentVolumeClaim created earlier.
       claimName: podpvc
       readOnly: false
```

With `WaitForFirstConsumer` the PV is not provisioned until a Pod referencing the PVC is scheduled; with `Immediate` (or omitted) it is provisioned when the PVC is created. Prefer a workload controller (Deployment or StatefulSet) over standalone Pods.

### Windows clusters

Requires cluster version 1.19.7-gke.2000, 1.20.2-gke.2000 or later and node version 1.18.12-gke.1203, 1.19.6-gke.800 or later. The default StorageClasses do not work; add `csi.storage.k8s.io/fstype: NTFS`.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: pd-sc-windows
provisioner: pd.csi.storage.gke.io
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: pd-balanced
  csi.storage.k8s.io/fstype: NTFS
```

The Pod must use `nodeSelector: kubernetes.io/os: windows` (the source example runs `mcr.microsoft.com/windows/servercore/iis`).

### Dynamically modify Hyperdisk IOPS and throughput with VolumeAttributesClass

Requires GKE cluster version 1.34 or later.

```yaml
apiVersion: storage.k8s.io/v1
kind: VolumeAttributesClass
metadata:
  name: silver
driverName: pd.csi.storage.gke.io
parameters:
  iops: "3000"
  throughput: "188Mi"
---
apiVersion: storage.k8s.io/v1
kind: VolumeAttributesClass
metadata:
  name: gold
driverName: pd.csi.storage.gke.io
parameters:
  iops: "6000"
  throughput: "345Mi"
```

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: hyperdisk-example
provisioner: pd.csi.storage.gke.io
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
parameters:
  type: hyperdisk-balanced
```

Create a PVC with `volumeAttributesClassName: silver` (200Gi, `ReadWriteOnce`, `storageClassName: hyperdisk-example`) and a Pod that consumes it; to move to the `gold` tier re-apply the same PVC with `volumeAttributesClassName: gold`. Expected provisioned values: silver 3000 IOPS / 188 throughput, gold 6000 IOPS / 345 throughput.

### Use `xfs` instead of `ext4`

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: xfs-class
provisioner: pd.csi.storage.gke.io
parameters:
  # The type of Compute Engine persistent disk to provision.
  type: pd-balanced
  # Specify "xfs" as the filesystem type.
  csi.storage.k8s.io/fstype: xfs
volumeBindingMode: WaitForFirstConsumer
```

Verify in a Pod that mounts the PVC: `kubectl exec -it pd-xfs-pod -- /bin/bash`, then `df -aTh --type=xfs`.

### View driver logs (Cloud Logging query)

```text
resource.type="k8s_container"
resource.labels.project_id="PROJECT_ID"
resource.labels.location="LOCATION"
resource.labels.cluster_name="CLUSTER_NAME"
resource.labels.namespace_name="kube-system"
resource.labels.container_name="gce-pd-driver"
```

## Options / Props

### StorageClass parameters

| Parameter | Value | Description |
| --- | --- | --- |
| `type` | `pd-balanced`, `pd-ssd`, `pd-standard`, `pd-extreme` (GKE 1.26 and later), `hyperdisk-balanced` | Disk type. `pd-standard` and `pd-extreme` have extra restrictions (see Notes). |
| `provisioned-iops-on-create` | string | Required with `pd-extreme`; must equal the provisioned IOPS value on the disk. |
| `csi.storage.k8s.io/fstype` | `ext4` (default), `xfs` (if the node image supports it), `NTFS` (Windows) | Filesystem type. |
| `use-allowed-disk-topology` | `"true"` | Autopilot: provision only nodes whose machine types support the requested disk type, and schedule the Pod on a compatible node. |

## Notes

- The driver version is tied to the GKE version and updates automatically when the cluster is upgraded to the latest GKE patch. The driver and associated CSI components run as separate containers, using tens of millicores of CPU and tens of MB of memory per node plus boot disk for logs.
- Benefits: automatic deployment and management, CMEK support, volume snapshots, volume cloning (GKE 1.22 and later), and release cadence independent of Kubernetes minor releases.
- Set the `compute/region` (or `compute/zone`) gcloud property to avoid "One of [--zone, --region] must be supplied" errors.
- Known issue (GKE 1.21 and earlier, in-tree driver): a Compute Engine regional disk can leak when its PersistentVolume is deleted.
- Autopilot storage compatibility: newer machine series (C3, E4) need Hyperdisk (for example `hyperdisk-balanced`) and do not support `pd-standard` / `pd-ssd`. Without an explicit machine series, a legacy-disk workload silently falls back to E2 nodes. Explicitly requesting a newer series (nodeSelector, custom ComputeClass) with a legacy disk, mixing PVCs of different storage types, or requesting too few vCPUs for `hyperdisk-extreme` / `pd-extreme` leaves the Pod `Pending`. Applies to Autopilot clusters and Standard clusters using Autopilot ComputeClasses.
- C3 machine series do not support `pd-standard`. `pd-extreme` needs a VM with a suitable machine shape. Typical attach failure: `[pd-standard] features are not compatible for creating instance.` Use node taints and node affinity to restrict where such workloads run.
- `VolumeAttributesClass`: if a PVC cannot bind a volume attributes class due to an error such as unavailable resources, re-apply the previous PVC. The control plane can enforce quotas on PVCs per `VolumeAttributesClass` by using `scopeSelector` in `ResourceQuota`.
- Disabling the driver affects existing PVs; try it on a disposable cluster first.
- The source also shows Console steps, Pod manifests for the Hyperdisk and Windows examples, the `gold` PVC manifest and the commands that read back the provisioned disk name (omitted here to keep the page short) and links to volume expansion, snapshots, cloning and regional disks pages.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: `provisioned-iops-on-create:'10000'` was changed to `provisioned-iops-on-create: '10000'` (invalid YAML otherwise).

## Related

- [persistent-volumes.md](./persistent-volumes.md)
- [hyperdisk.md](./hyperdisk.md)
- [volume-snapshots.md](./volume-snapshots.md)
- [persistent-volume-attach-limits.md](./persistent-volume-attach-limits.md)
