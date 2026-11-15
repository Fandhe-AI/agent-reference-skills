---
source: https://docs.cloud.google.com/workstations/docs/create-configuration
---

# Create a Workstation Cluster, Configuration and Workstation, Then Connect

Create a Cloud Workstations cluster and configuration, create a workstation from them, start it, and reach it over SSH or a TCP tunnel.

## Signature / Usage

Enable the Cloud Workstations API and hold a Cloud Workstations Admin role on the project. `configs create` needs the cluster and region, and `create`, `start` and `ssh` need the cluster, config and region; the SYNOPSIS of each command requires them, either as the flags `--cluster`, `--config`, `--region` or from the properties `workstations/cluster`, `workstations/config` and `workstations/region`. The commands below pass the flags. `CONFIG` and `WORKSTATION` are the names you choose; `my-cluster` and `us-central1` are the cluster and region from step 2 (use `my-private-cluster` if you created the private cluster). In step 5b, `my-config` is `CONFIG`, `my-workstation` is `WORKSTATION` and `my-project` is your project ID.

### 1. Optional: enable faster startup (Image streaming)

```bash
gcloud services enable containerfilesystem.googleapis.com
```

### 2. Create the cluster

A public cluster:

```bash
gcloud workstations clusters create my-cluster --region=us-central1
```

Or a private cluster associated with a network and subnetwork:

```bash
gcloud workstations clusters create my-private-cluster \
    --region=us-central1 --enable-private-endpoint \
    --network='my-network' --subnetwork='my-subnetwork'
```

Cluster creation is generally needed only once per region.

### 3. Create the configuration

The configuration is the template for workstations (machine type, image, disk). This example uses the `e2-standard-8` machine type and an IntelliJ image:

Adapted (not in the official docs): the gcloud reference example has no `--cluster` / `--region`, so it fails unless the `workstations/*` properties are set; the flags from the command's SYNOPSIS were appended.

```bash
gcloud workstations configs create CONFIG \
    --machine-type=e2-standard-8 \
    --container-predefined-image=intellij \
    --cluster=my-cluster --region=us-central1
```

### 4. Create and start the workstation

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations create WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations start WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

### 5a. Connect over SSH

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

To run one command on the workstation, such as a snapshot of the guest's process tree:

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --command="ps -ejH" \
    --cluster=my-cluster --config=CONFIG --region=us-central1
```

### 5b. Or start a TCP tunnel to port 22

```bash
gcloud workstations start-tcp-tunnel --project=my-project \
    --region=us-central1 --cluster=my-cluster --config=my-config \
    my-workstation 22
```

## Options / Props

| Setting | Detail |
|---|---|
| Public gateway | Makes workstations accessible from public networks |
| Private gateway | For data residency of data in transit, and ingress/egress to the workstations service from inside the selected network |
| Machine type | Default `e2-standard-4` (`--machine-type`) |
| Persistent disk | Default 200 GB; disk type cannot be changed after creating a workstation |
| Auto-sleep | Shuts down workstations inactive for more than two hours (default) |
| Quick start pool size | Default `1`; pre-started VMs are billed |
| Reclaim policy | `delete` (default) or `retain` for the persistent disk when a workstation is deleted |

## Notes

- Commands from the gcloud reference come from its EXAMPLES section (the `$ ` prompt removed); the adapted ones are listed in the next line. Example names such as `my-cluster`, `my-network` and `my-project` are the reference's own placeholders; replace them with your values.
- Adapted from the official docs: the EXAMPLES `gcloud workstations configs create CONFIG --machine-type=e2-standard-8 --container-predefined-image=intellij`, `gcloud workstations create WORKSTATION`, `gcloud workstations start WORKSTATION`, `gcloud workstations ssh WORKSTATION` and `gcloud workstations ssh WORKSTATION --command="ps -ejH"` omit the required cluster / config / region; `--cluster`, `--config` (not for `configs create`) and `--region` from each command's SYNOPSIS were appended. Alternatively set the `workstations/cluster`, `workstations/config` and `workstations/region` properties and use the examples as written.
- The Console flow creates a cluster automatically if none exists in the region when you create a configuration; creation can take up to 20 minutes. Clusters are unrelated to GKE clusters.
- Workstation VMs boot from Compute Engine public Container-Optimized OS images. Organization policy constraints such as `constraints/compute.trustedimageProjects` and the Private Service Connect constraints can block cluster creation; see the cluster page below.
- Disabling public IP addresses on a configuration needs Private Google Access or Cloud NAT, or the VMs have no route to Google services and image repositories.
- A custom image's service account must be able to pull the image. Deleting a cluster or workstation is destructive; try it on a disposable resource first.
- Source: https://docs.cloud.google.com/workstations/docs/create-configuration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/create-cluster (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/architecture (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/clusters (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/configs (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/ssh (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start-tcp-tunnel (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-service-from-source.md](./deploy-service-from-source.md)
- Access control: https://docs.cloud.google.com/workstations/docs/access-control
- Preconfigured base images: https://docs.cloud.google.com/workstations/docs/preconfigured-base-images
