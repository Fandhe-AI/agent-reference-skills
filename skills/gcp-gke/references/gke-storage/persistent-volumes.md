---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes
---

# About PersistentVolumes, PersistentVolumeClaims and StorageClasses in GKE

Overview of PersistentVolumes (PVs), PersistentVolumeClaims (PVCs) and StorageClasses in GKE, focused on storage backed by Compute Engine persistent disks: dynamic provisioning, reclaim policy, access modes, regional disks, zones and `WaitForFirstConsumer`.

## Signature / Usage

### Dynamically provision a PersistentVolume

A 30 GiB `ReadWriteOnce` claim plus a Pod that consumes it. Apply with `kubectl apply -f pvc-pod-demo.yaml`.

```yaml
# pvc-pod-demo.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-demo
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 30Gi
  storageClassName: standard-rwo
---
kind: Pod
apiVersion: v1
metadata:
  name: pod-demo
spec:
  volumes:
    - name: pvc-demo-vol
      persistentVolumeClaim:
       claimName: pvc-demo
  containers:
    - name: pod-demo
      image: nginx
      resources:
        limits:
          cpu: 10m
          memory: 80Mi
        requests:
          cpu: 10m
          memory: 80Mi
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: pvc-demo-vol
```

Because `standard-rwo` uses `WaitForFirstConsumer`, the PV is not created until a Pod is scheduled to consume the volume. The created PV uses provisioner annotation `pv.kubernetes.io/provisioned-by: pd.csi.storage.gke.io`, `persistentVolumeReclaimPolicy: Delete`, `volumeMode: Filesystem` and node affinity on `topology.gke.io/zone`.

### StorageClass with WaitForFirstConsumer

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: slow
provisioner: pd.csi.storage.gke.io
parameters:
  type: pd-balanced
  csi.storage.k8s.io/fstype: ext4
volumeBindingMode: WaitForFirstConsumer
```

### Delete a retained PersistentVolume and its disk

Destructive. Applies to a PV in `Released` status (reclaim policy `Retain`). Replace `PV_NAME` with the PersistentVolume name, `DISK_NAME` with the disk name found in `volumeHandle` of the PV YAML, and `ZONE` with the disk zone.

Adapted (not in the official docs): the source writes these as inline code with `<your-pv-name>` / `<your-disk-name>` / `<your-zone>` placeholders; converted to fenced blocks with upper-case placeholders so angle brackets are not read as shell redirection.

```bash
kubectl delete pv PV_NAME
gcloud compute disks delete DISK_NAME --zone=ZONE
```

### Diagnose unexpected disk deletion

Adapted (not in the official docs): placeholders converted from `<your-pvc-name>` / `<your-storageclass-name>` to upper-case.

```bash
kubectl get pvc PVC_NAME -o jsonpath='{.spec.storageClassName}'
kubectl get sc STORAGECLASS_NAME -o yaml
```

## Options / Props

### Default StorageClass when a PVC names none

| Claim access mode | Default StorageClass |
| --- | --- |
| `ReadWriteOnce` | `standard-rwo` |
| `ReadWriteMany` | `regional-rwx` in GKE version 1.37.1 and later (see Default StorageClass assignment in the Filestore CSI driver guide) |

### Access modes

| Mode | Meaning on GKE |
| --- | --- |
| `ReadWriteOnce` | Read-write by a single node. |
| `ReadOnlyMany` | Read-only by many nodes. Compute Engine persistent disks support it (for example static content across replicas). |
| `ReadWriteMany` | Read-write by many nodes. Filestore is the recommended solution for shared file access. Hyperdisk Balanced High Availability supports it only with `volumeMode: Block` (raw block device; the application must manage consistency, for example SCSI reservations). Standard persistent disks do not support it. |
| `ReadWriteOncePod` | Read-write by a single Pod only. |

### reclaimPolicy (StorageClass)

| Value | Behavior |
| --- | --- |
| `Delete` | Default. Deleting the PVC deletes the PV and the underlying disk. |
| `Retain` | PV and disk are kept; PV status becomes `Released` and cannot be reused by a new PVC until an administrator reclaims it. |

## Notes

- Caution: using the `fsGroup` setting with large PersistentVolumes can cause mounts to fail (see GKE storage troubleshooting, "Mounting a volume stops responding due to the fsGroup setting").
- Recommended provisioners: Compute Engine persistent disk CSI and Kubernetes Filestore CSI. Other provisioners are not covered by Cloud Customer Care, except the open source SMB CSI Driver for Kubernetes (best effort).
- Windows node pools: you must create a StorageClass and set `storageClassName` in the PVC because the default fstype (ext4) is not supported on Windows; use NTFS for Compute Engine persistent disks.
- Modifying the `topology.kubernetes.io/zone` label during the lifetime of a PV can result in mount failures.
- Cluster deletion: GKE retains PVs with either `Delete` or `Retain` reclaim policy. GKE does not wait for namespace / PVC deletion to complete before deleting the cluster, so deleting a namespace and then immediately the cluster can leave `Delete`-policy PVs behind. Back up with Backup for GKE.
- Deployments share one PVC across replicas, so only `ReadWriteMany` volumes work; a one-replica Deployment with a `ReadWriteOnce` volume is not recommended (the replacement Pod can deadlock waiting for the volume). Use a StatefulSet with `ReadWriteOnce` volumes.
- Regional persistent disks replicate across two zones in the same region; ensure both zones have enough capacity. Mounting a persistent disk from a different Google Cloud project is not supported; pre-existing disks must be in the same zone as the nodes. Without a specified zone, GKE picks a zone at random.
- `kubectl delete pv` and `gcloud compute disks delete` are destructive; try them on a disposable cluster and disk first.
- Adapted from the official docs: inline commands such as `kubectl delete pv <your-pv-name>`, `gcloud compute disks delete <your-disk-name> --zone=<your-zone>`, `kubectl get pvc <your-pvc-name> ...` and `kubectl get sc <your-storageclass-name> -o yaml` were rewritten as fenced blocks with upper-case placeholders.
- The source also contains Console views and links to how-to guides for regional disks, ReadOnlyMany disks and pre-existing disks (not reproduced).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [storage-overview.md](./storage-overview.md)
- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
- [volume-snapshots.md](./volume-snapshots.md)
- [persistent-volume-attach-limits.md](./persistent-volume-attach-limits.md)
- [filestore-for-gke.md](./filestore-for-gke.md)
