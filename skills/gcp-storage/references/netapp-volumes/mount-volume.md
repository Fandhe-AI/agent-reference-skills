---
source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/mount-volume
---

# Quickstart: Mount a volume on a client

Mount a NetApp Volumes volume on a Linux Compute Engine VM: open Mount instructions for the volume in the console, install the NFS client, create a directory and mount.

## Signature / Usage

Install the NFS client (Red Hat; for SUSE see Notes):

```bash
sudo yum install -y nfs-utils
```

Ubuntu and Debian:

```bash
sudo apt-get install nfs-common
```

Get the exact mount command from the CLI:

```bash
gcloud netapp volumes describe VOLUME_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --format="value(mountOptions.instructions)"
```

Snippet taken from https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients.

## Notes

- Steps: Volumes, More options icon, Mount instructions, SSH into the instance, install the NFS client, create a directory, run the mount command shown in the console. The source gives no literal `mount` line.
- Clean up deletes the whole Google Cloud project (all contents, custom project ID lost). Destructive: use a disposable project; delete selected resources instead to preserve URLs that use the project ID.
- SUSE: the source's SuSE tab shows the same `sudo yum install -y nfs-utils` command, but SUSE Linux Enterprise uses `zypper`, not `yum`, so that command does not install the NFS client there; install the NFS client package with the distribution's package manager following the SUSE documentation instead.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/mount-volume (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (borrowed snippet)

## Related

- [create-volume.md](./create-volume.md)
- [connect-nfs-clients.md](./connect-nfs-clients.md)
