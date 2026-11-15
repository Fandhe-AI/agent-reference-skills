---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations
---

# Cloud Workstations

Copy-paste commands for Cloud Workstations: create clusters, configurations and workstations, start, stop, connect over SSH or a TCP tunnel, enable image streaming, and build, test and push a custom container image.

## Signature / Usage

### Enable faster startup (image streaming)

Snippet taken from https://docs.cloud.google.com/workstations/docs/architecture (the cluster and configuration pages link to it as an optional prerequisite):

```bash
gcloud services enable containerfilesystem.googleapis.com
```

### Create a cluster (from the gcloud reference)

A public cluster `my-cluster` in region `us-central1`:

```bash
gcloud workstations clusters create my-cluster --region=us-central1
```

A private cluster associated with a network and subnetwork:

```bash
gcloud workstations clusters create my-private-cluster \
    --region=us-central1 --enable-private-endpoint \
    --network='my-network' --subnetwork='my-subnetwork'
```

### Create a configuration (from the gcloud reference)

`configs create` needs the cluster and region, and `create`, `start`, `stop` and `ssh` need the cluster, config and region, either as the flags `--cluster`, `--config`, `--region` or from the properties `workstations/cluster`, `workstations/config` and `workstations/region`. The commands below pass the flags: `my-cluster` and `us-central1` are the cluster and region created above (use `my-private-cluster` for the private cluster), and `CONFIG` and `WORKSTATION` are the names you choose. In the TCP tunnel example, `my-config` is `CONFIG`, `my-workstation` is `WORKSTATION` and `my-project` is your project ID.

A configuration with the `e2-standard-8` machine type and an IntelliJ image:

Adapted (not in the official docs): the gcloud reference example has no `--cluster` / `--region`, so it fails unless the `workstations/*` properties are set; the flags from the command's SYNOPSIS were appended.

```bash
gcloud workstations configs create CONFIG \
    --machine-type=e2-standard-8 \
    --container-predefined-image=intellij \
    --cluster=my-cluster --region=us-central1
```

A configuration with a Shielded VM instance (Secure Boot, vTPM and integrity monitoring):

Adapted (not in the official docs): the gcloud reference example has no `--cluster` / `--region`, so it fails unless the `workstations/*` properties are set; the flags from the command's SYNOPSIS were appended.

```bash
gcloud workstations configs create CONFIG \
    --machine-type=e2-standard-4 --shielded-secure-boot \
    --shielded-vtpm --shielded-integrity-monitoring \
    --cluster=my-cluster --region=us-central1
```

A configuration with a non-default persistent disk containing 10GB of PD SSD storage:

Adapted (not in the official docs): the gcloud reference example has no `--cluster` / `--region`, so it fails unless the `workstations/*` properties are set; the flags from the command's SYNOPSIS were appended.

```bash
gcloud workstations configs create CONFIG \
    --machine-type=e2-standard-4 --pd-disk-type=pd-ssd \
    --pd-disk-size=10 \
    --cluster=my-cluster --region=us-central1
```

### Create, start and stop a workstation (from the gcloud reference)

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations create WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

Start (or resume) a workstation:

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations start WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations stop WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

### Connect over SSH or a TCP tunnel (from the gcloud reference)

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --cluster=my-cluster --config=CONFIG --region=us-central1
```

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --port=22 \
    --cluster=my-cluster --config=CONFIG --region=us-central1
```

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --user=my-user \
    --cluster=my-cluster --config=CONFIG --region=us-central1
```

Run a command on the workstation, such as a snapshot of the guest's process tree:

Adapted (not in the official docs): `--cluster`, `--config` and `--region` from the command's SYNOPSIS were appended to the gcloud reference example.

```bash
gcloud workstations ssh WORKSTATION --command="ps -ejH" \
    --cluster=my-cluster --config=CONFIG --region=us-central1
```

Start a tunnel to port 22 on a workstation:

```bash
gcloud workstations start-tcp-tunnel --project=my-project \
    --region=us-central1 --cluster=my-cluster --config=my-config \
    my-workstation 22
```

### Extend a preconfigured base image

Adapted (not in the official docs): `apt update` and `apt install` are joined into one `RUN` with `apt-get`, so a cached update layer cannot leave stale package indexes for a changed install line, and the build step runs as root through `USER root` instead of `sudo`.

```dockerfile
FROM us-central1-docker.pkg.dev/cloud-workstations-images/predefined/code-oss:latest

USER root
RUN apt-get update && apt-get install -y emacs
```

### Build, test and push the image

Replace `CUSTOM_IMAGE_FOLDER` and `TARGET_IMAGE` (an Artifact Registry path such as `*.pkg.dev/cloud-workstations-external/customimage:latest`, with `*` replaced by region and identifiers). `LOCAL_PORT` and `CONTAINER_PORT` are for local testing: `-p 8080:80` for the base editor image, `-p 2222:22` for SSH.

The source gives these as three separate steps; run them one at a time (`docker run` stays in the foreground until you stop the container).

Build the image:

```bash
docker build CUSTOM_IMAGE_FOLDER -t TARGET_IMAGE
```

Test it locally:

> **Warning**: `docker run --privileged` gives the container broad access to the host. Use it for local testing only and never on a shared host.

```bash
docker run --privileged -p LOCAL_PORT:CONTAINER_PORT TARGET_IMAGE
```

Local test of the SSH port after `-p 2222:22`:

```bash
ssh user@localhost -p 2222
```

After testing, push the image to Artifact Registry:

```bash
docker push TARGET_IMAGE
```

## Options / Props

| Flag | Command | Meaning |
| --- | --- | --- |
| `--region` | `clusters create` | Region of the cluster |
| `--enable-private-endpoint` / `--network` / `--subnetwork` | `clusters create` | Private cluster on a network and subnetwork |
| `--machine-type` | `configs create` | Machine type (default `e2-standard-4`) |
| `--container-predefined-image` / `--container-custom-image` | `configs create` | Predefined image (default `codeoss`) or custom image |
| `--shielded-secure-boot` / `--shielded-vtpm` / `--shielded-integrity-monitoring` | `configs create` | Shielded VM options |
| `--pd-disk-type` / `--pd-disk-size` | `configs create` | Persistent disk type and size (default `pd-standard`, 200) |
| `--cluster` / `--config` / `--region` | workstation commands | Resource group of the workstation; otherwise the `workstations/cluster` / `workstations/config` / `workstations/region` properties (no default) |
| `--user` / `--port` / `--command` | `workstations ssh` | SSH user (default `user`), port (default 22), command to run |
| `--start-workstation` | `ssh`, `start-tcp-tunnel` | Start the workstation first if it is stopped |
| `--local-host-port` | `ssh`, `start-tcp-tunnel` | Local bind address (default `localhost:0`) |

Before creating a cluster, enable the Cloud Workstations API and hold a Cloud Workstations Admin role on the project.

## Notes

- Commands marked from the gcloud reference come from its EXAMPLES section (the `$ ` prompt removed); the `configs create`, `create`, `start`, `stop` and `ssh` examples carry the added resource flags described in the next line. Example names such as `my-cluster`, `my-network`, `my-user` and `my-project` are the reference's own placeholders; replace them with your values.
- Corrected from the official docs: the EXAMPLES `gcloud workstations configs create CONFIG ...` (all three), `gcloud workstations create WORKSTATION`, `gcloud workstations start WORKSTATION`, `gcloud workstations stop WORKSTATION`, `gcloud workstations ssh WORKSTATION` and its `--port=22`, `--user=my-user` and `--command="ps -ejH"` forms name only `CONFIG` or `WORKSTATION` and omit the required cluster / config / region; `--cluster`, `--config` (not for `configs create`) and `--region` from each command's SYNOPSIS were appended. Alternatively set the properties `workstations/region`, `workstations/cluster` and `workstations/config` and use the examples as written; these properties have no default, and the commands fail without the flags or the properties.
- The `ssh` command-run example is jammed onto one line in the help text; it is written here as the command only.
- Destructive: deleting a workstation cluster, configuration or workstation cannot be undone; try it on a disposable resource first. See https://docs.cloud.google.com/workstations/docs/delete-resources.
- Host custom images in Artifact Registry; a private image needs a service account with pull permission in the workstation configuration.
- Adapted from the official docs: the emacs Dockerfile's two layers `RUN sudo apt update` / `RUN sudo apt install -y emacs` are written as one `RUN apt-get update && apt-get install -y emacs` after `USER root`, so packages are installed by the root build step instead of through `sudo`.
- The Console steps for creating clusters and configurations are on the cluster and configuration pages cited below. See the `docker` skill for Dockerfile and image-build practice.
- Cloud Workstations are Google Cloud's managed development environments, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`).
- Command group reference: https://docs.cloud.google.com/sdk/gcloud/reference/workstations
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/clusters (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/configs (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/stop (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/ssh (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workstations/start-tcp-tunnel (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/customize-container-images (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/architecture (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/create-cluster (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/workstations/docs/create-configuration (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [services.md](./services.md)
