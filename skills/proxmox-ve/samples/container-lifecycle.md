# Container Lifecycle

Create, start, configure, snapshot, and restore LXC containers using `pct` and `pveam`.

```bash
# --- Fetch a container template ---

# Update the template list from online repositories
pveam update

# List available templates (filter by section)
pveam available --section system

# Download a template to local storage
pveam download local debian-12-standard_12.7-1_amd64.tar.zst

# Confirm the template is available locally
pveam list local

# --- Create and start a container ---

# Create container CTID 100 using the downloaded template
# rootfs on local-lvm with 8 GB, 512 MB RAM, bridged network
pct create 100 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --rootfs local-lvm:8 \
  --memory 512 \
  --net0 name=eth0,bridge=vmbr0,ip=dhcp \
  --hostname mycontainer \
  --password secretpassword \
  --unprivileged 1

# Start the container
pct start 100

# Open a shell inside the container
pct enter 100

# --- Resource configuration ---

# Set CPU and memory limits; enable auto-start at boot
pct set 100 --cores 2 --cpulimit 0.5 --memory 1024 --onboot 1

# Add a bind-mount from the host
pct set 100 --mp0 /mnt/bindmounts/shared,mp=/shared

# --- Snapshots ---

# Create a snapshot before changes
pct snapshot 100 snap1 --description "Before updates"

# List all snapshots
pct listsnapshot 100

# Roll back to a snapshot (and start the container afterward)
pct rollback 100 snap1 --start 1

# Delete a snapshot
pct delsnapshot 100 snap1

# --- Stop and remove ---

# Graceful stop
pct stop 100

# Destroy the container (remove disk and config)
pct destroy 100
```

## Notes

- CTID must be unique across the cluster (range 100–999999999).
- Snapshots require storage that supports them (e.g., ZFS, LVM-thin); classic dir storage does not.
- Use `--unprivileged 1` for better isolation; privileged containers run as root on the host and should be avoided unless necessary.
- `pveam download` stores templates under `<storage>:vztmpl/`; reference the full path when calling `pct create`.
