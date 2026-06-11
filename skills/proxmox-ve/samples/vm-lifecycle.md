# VM Lifecycle

Create, start, stop, clone, convert to template, and migrate QEMU/KVM VMs using `qm`.

```bash
# --- Create a VM from a cloud image (cloud-init template workflow) ---

# 1. Download a cloud image
wget https://cloud-images.ubuntu.com/bionic/current/bionic-server-cloudimg-amd64.img

# 2. Create VM with VirtIO SCSI controller
qm create 9000 --memory 2048 --net0 virtio,bridge=vmbr0 --scsihw virtio-scsi-pci

# 3. Import downloaded disk to VM
qm set 9000 --scsi0 local-lvm:0,import-from=/path/to/bionic-server-cloudimg-amd64.img

# 4. Add cloud-init CD-ROM drive
qm set 9000 --ide2 local-lvm:cloudinit

# 5. Set boot order and serial console
qm set 9000 --boot order=scsi0
qm set 9000 --serial0 socket --vga serial0

# 6. Convert the VM to a reusable template
qm template 9000

# --- Deploy an instance from the template ---

# Clone template to new VM (full clone)
qm clone 9000 123 --name ubuntu-prod --full

# Configure cloud-init: SSH key, IP, gateway
qm set 123 --sshkey ~/.ssh/id_rsa.pub
qm set 123 --ipconfig0 ip=10.0.10.123/24,gw=10.0.10.1
qm set 123 --nameserver 1.1.1.1

# Start the VM
qm start 123

# --- Lifecycle operations ---

# Graceful shutdown
qm shutdown 123

# Force stop
qm stop 123

# Take a snapshot (with memory state)
qm snapshot 123 snap1 --description "Before upgrade" --vmstate 1

# Roll back to snapshot
qm rollback 123 snap1

# --- Migration ---

# Offline migration to node pve2
qm migrate 123 pve2

# Live migration (no downtime) with target storage mapping
qm migrate 123 pve2 --online --targetstorage local-lvm
```

## Notes

- VMID must be unique across the cluster (range 100–999999999).
- `qm clone` with `--full` creates independent disk copies; without it, linked clones share base disk.
- `qm template` is irreversible; the VM becomes read-only. Always clone from templates, never run the template directly.
- Live migration (`--online`) requires shared storage or storage replication; use `--bwlimit <KiB/s>` to throttle bandwidth.
