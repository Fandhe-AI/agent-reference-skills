---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data
---

# Copy data to Transfer Appliance

Methods for copying data onto the appliance: SCP/SFTP, NFS share, SMB share, and mounting your own NFS/CIFS shares on the appliance. Verify the transfer to Cloud Storage is complete before deleting source data.

## Signature / Usage

### SCP (Linux and macOS)

Destination directory on the appliance is `/mnt/ta_data`. Replace `PATH_TO_FILES`, `USERNAME` (provided by the Transfer Appliance Team) and `IP_ADDRESS`.

```bash
scp PATH_TO_FILES USERNAME@IP_ADDRESS:/mnt/ta_data
```

Windows: use an SFTP client supporting UTF-8 filenames (such as WinSCP), protocol SFTP, port 22, destination `/mnt/ta_data`.

### NFS share (Linux)

```bash
sudo mkdir /mnt/data
```

```bash
sudo mount -o vers=4 IP_ADDRESS:/mnt/ta_data /mnt/data
```

### NFS share (macOS)

```bash
cd ~
mkdir ta_data
sudo mount -t nfs -o vers=4,resvport IP_ADDRESS:/mnt/ta_data ~/ta_data
```

Copying is long-running; on macOS/Linux use `tmux` or `screen` so it survives logout.

### SSH key for faster logins

Adapted (not in the official docs): removed the stray `posix-terminal` line from the first block, which is a rendering artifact rather than a command.

```bash
ssh-keygen -t rsa
```

Put the public key in `/tmp/ssh_key` on the appliance (one key per line), then run on the appliance (overwrites existing keys):

```bash
ta copy_ssh_keys
```

```bash
ssh ta_customer@IP_ADDRESS
```

```bash
ssh -i PRIVATE_KEY_PATH ta_customer@IP_ADDRESS
```

### SMB share

```bash
ta config --data_port=PORT --ip=IP_ADDRESS --fileshare=smb
```

Connect from Windows with `net use X: \\IP_ADDRESS\ta_data` (or the file manager path `\\IP_ADDRESS\ta_data`); from Linux with `smbclient //IP_ADDRESS/ta_data -U USERNAME` (after `sudo apt-get install smbclient`) or `smb://IP_ADDRESS/ta_data` in a file manager.

### Mount your own shares on the appliance

NFS share:

Adapted (not in the official docs): added the `\` line continuations, which the source omits, so the multi-line `ta mount` command parses as one shell command; the source's separate `mkdir` and `ta mount` blocks are shown in one fence.

```bash
mkdir /mnt/ta_data_base/ta_mounts/MOUNT_POINT
ta mount --types=nfs --source=NFS_SERVER_IP:/NFS_DIRECTORY \
  --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT \
  --options=OPTIONS
```

CIFS share:

Adapted (not in the official docs): added the `\` line continuations, which the source omits, so the multi-line `ta mount` command parses as one shell command; the source's separate `mkdir` and `ta mount` blocks are shown in one fence.

```bash
mkdir /mnt/ta_data_base/ta_mounts/MOUNT_POINT
ta mount --types=cifs --source=//CIFS_SERVER_IP/CIFS_NAME \
  --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT \
  --options=OPTIONS
```

```bash
ta unmount --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT
```

Copy with rclone on the appliance:

```bash
rclone copy /mnt/ta_data_base/ta_mounts/MOUNT_POINT /mnt/ta_data
```

### Archive pull (tar balls)

Adapted (not in the official docs): added the `\` line continuation, which the source omits, so the two-line `ta pull` command parses as one shell command.

```bash
ta pull --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT --size=ARCHIVE_SIZE_BYTES \
  --destination=/mnt/ta_data --count=THREAD_COUNT
```

```bash
ta pull --id=ID --status
ta pull --id=ID --pause
ta pull --id=ID --resume
```

## Options / Props

| Item | Detail |
|---|---|
| `ARCHIVE_SIZE_BYTES` | Target tar ball size; default 1GB, between 5MB and 20GB inclusive |
| `THREAD_COUNT` | Archive threads; default 20, between 1 and 10000 inclusive |
| `OPTIONS` (`ta mount`) | Comma-separated Linux `mount` options (for CIFS include username and password) |
| `ta_data` SMB share | User `ta_customer`, password `ta_customer` |

Benchmarks (TA300 V2, 10Gb port): 100 GB files 740 MBps (cp over NFS) and 675 MBps (SCP); 1 GB files 648 and 600 MBps; 10 MB files 512 MBps (NFS) but only 14 MBps (SCP). Estimated 40 TB: 16 to 23 hours; 300 TB: 5 to 7 days.

## Notes

- Each appliance supports one file sharing protocol at a time; changing it requires a reset that erases data already transferred (destructive). Order separate appliances for NFS and SMB.
- Passing `password=` in `--options` for CIFS exposes the password in shell history and process listings. Where supported, prefer the Linux `mount.cifs` option `credentials=/path/to/file` (a file readable only by its owner, mode 600) over `username=` / `password=`; the source does not document this for `ta mount`, so verify it on the appliance.
- The appliance does not validate file size or names; non-compliant files may fail to transfer after shipping.
- The default SMB credentials are fixed and publicly documented; restrict network access to the appliance (see [security-and-encryption.md](./security-and-encryption.md)).
- Mounts persist across reboot unless removed with `ta unmount`. Archive pull writes tar balls to `/mnt/ta_data/TA_ARCHIVE_ID/` with manifests `manifest_ID.tsv` and `manifest_ID_ERROR.tsv`; run one pull at a time; it is not designed for directories with more than 50,000 subdirectories.
- Adapted from the official docs: the source's `ssh-keygen` block starts with a `posix-terminal` line (a rendering artifact), which was removed.
- Adapted from the official docs: the NFS command was `ta mount --types=nfs --source=NFS_SERVER_IP:/NFS_DIRECTORY` / `--target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT` / `--options=OPTIONS` on three lines without `\` (each line would run as a separate command), in a block separate from its `mkdir` command.
- Adapted from the official docs: the CIFS command was `ta mount --types=cifs --source=//CIFS_SERVER_IP/CIFS_NAME` / `--target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT` / `--options=OPTIONS` on three lines without `\`, in a block separate from its `mkdir` command.
- Adapted from the official docs: the archive pull command was `ta pull --target=/mnt/ta_data_base/ta_mounts/MOUNT_POINT --size=ARCHIVE_SIZE_BYTES` / `--destination=/mnt/ta_data --count=THREAD_COUNT` on two lines without `\`.
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [procedure-guide.md](./procedure-guide.md)
- [known-limitations.md](./known-limitations.md)
