---
source: https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-using-serial-console
---

# Interact with the serial console

Interactive access to an instance's serial console (four virtual serial ports; port 1 is usually the "serial console") for debugging boot and networking problems, interacting with GRUB, and other troubleshooting. To only view output, use serial port output logs instead. Interactive access is disabled by default; enabling it is a security trade-off (see Notes).

## Signature / Usage

### Enable interactive access (project / instance)

Any Boolean value accepted by the metadata server works. A per-instance setting overrides the project setting.

```bash
gcloud compute project-info add-metadata \
    --metadata serial-port-enable=TRUE
```

```bash
gcloud compute instances add-metadata instance-name \
    --metadata serial-port-enable=TRUE
```

### Connect

```bash
gcloud compute connect-to-serial-port INSTANCE_NAME \
    --port=PORT_NUMBER
```

Other SSH client, Linux instance:

```bash
ssh -i PRIVATE_SSH_KEY_FILE -p 9600 PROJECT_ID.ZONE.INSTANCE_NAME.USERNAME.OPTIONS@REGION-ssh-serialport.googleapis.com
```

Optional host key validation: add the regional key from `https://www.gstatic.com/vm_serial_port_public_keys/REGION/REGION.pub` to `~/.ssh/known_hosts` with the hostname prepended:

```text
[us-central1-ssh-serialport.googleapis.com]:9600 ssh-rsa AAAAB3NzaC1yc...
```

### Disconnect

Press `ENTER`, then type `~.`. Do not use `CTRL+ALT+DELETE`, `exit` or `logout` (unless `on-dtr-low=disconnect` is set).

### Local password for a login prompt (Linux, via `passwd`)

```bash
sudo passwd $(whoami)
```

### Login prompt on another serial port (Linux, systemd)

```bash
sudo systemctl start serial-getty@ttyS1.service
```

Windows: in an administrator Command Prompt, change the EMS port from COM2 to COM1, then reboot:

```bash
bcdedit /emssettings EMSPORT:1 EMSBAUDRATE:9600
```

### Advanced options

```bash
gcloud compute connect-to-serial-port instance-name \
    --port port-number \
    --extra-args max-connections=3
```

### Disable interactive access

```bash
gcloud compute instances add-metadata instance-name \
    --metadata=serial-port-enable=FALSE
```

```bash
gcloud compute project-info add-metadata \
    --metadata=serial-port-enable=FALSE
```

### Enforce the organization policy (requires `orgpolicy.policyAdmin`)

```bash
gcloud resource-manager org-policies enable-enforce \
    --organization organization-id compute.disableSerialPortAccess
```

Per-project exemption (turn enforcement off for one project):

```bash
gcloud resource-manager org-policies disable-enforce \
    --project project-id compute.disableSerialPortAccess
```

## Options / Props

| Item | Value |
|---|---|
| Metadata key | `serial-port-enable` (default disabled) |
| Org policy constraint | `compute.disableSerialPortAccess` (default `FALSE`); overrides `serial-port-enable` once enforced |
| Required permissions | `compute.instances.setMetadata` (VM), `compute.projects.setCommonInstanceMetadata` (project), `iam.serviceAccountUser` on the instance service account |
| Gateway | Regional `REGION-ssh-serialport.googleapis.com`, TCP port 9600 |
| `max-connections` | Concurrent connections per serial port; default and maximum 5 |
| `replay-lines=N` / `replay-bytes=N` / `replay-from=N` | Default replay is the last 10 lines; `replay-bytes` also accepts `new`; `replay-from` (absolute byte index) overrides other replay options |
| `on-dropped-output` | `insert-stderr-note` (default), `ignore`, `disconnect`; relevant when more than 1 MiB is produced while the client is not accepting data |
| `on-dtr-low` | `none` (default) or `disconnect`; may disconnect during reboots; no effect on port 1 for some OSes |

### Serial port numbering

| VM serial port | Linux | Windows |
|---|---|---|
| `1` | `/dev/ttyS0` | `COM1` |
| `2` | `/dev/ttyS1` | `COM2` |
| `3` | `/dev/ttyS2` | `COM3` |
| `4` | `/dev/ttyS3` | `COM4` |

Port number for `connect-to-serial-port`: `1` for Linux (default), `2` for Windows.

### Audit logs (Logs Explorer, search `ssh-serialport.googleapis.com`)

| Event | `methodName` | Notable fields |
|---|---|---|
| Connect | `google.ssh-serialport.v1.connect` | `request.@type` `type.googleapis.com/google.compute.SerialConsoleSessionBegin`, `operation.first` `TRUE`, `severity` `NOTICE` |
| Disconnect | `google.ssh-serialport.v1.disconnect` | `response.duration` (seconds), `operation.last` `TRUE` |
| Failed connect | `severity` `ERROR` | `INVALID_ARGUMENT` (bad port), `PERMISSION_DENIED` (not enabled), `UNAUTHENTICATED` (no matching SSH key), `UNKNOWN` |

## Notes

- Caution from the source: the interactive serial console does not support IP-based restrictions unless you use VPC Service Controls. Anyone who knows the correct SSH key, username, project ID, zone and instance name can try to connect from any IP. Enable it only while troubleshooting and disable it afterwards (`serial-port-enable=FALSE` or the org policy). Disabling via metadata is not destructive; the per-project org-policy exemption relaxes a security control, so scope it narrowly.
- Authentication is by SSH keys (public key in project or instance metadata). The gcloud CLI and console add keys automatically and validate host keys automatically; third-party clients may need manual setup. Never share your private key file.
- Do not connect to the console by IP address; serial console IP addresses can change without notice. If a host key check fails, end the attempt, download the new key, and never send credentials over a connection where host authentication failed.
- Deprecations (as written in the source): the serial console SSH host key endpoint `https://www.gstatic.com/vm_serial_port/REGION/REGION.pub` was deprecated as of March 31, 2025; use gcloud CLI 515.0.0 or later. The global serial console gateway (`ssh-serialport.googleapis.com`) was deprecated on April 30, 2024 and is unavailable for new projects or projects that haven't used it; use regional gateways.
- Not reproduced: the source's startup-script methods for a local password (Linux `useradd` / `chpasswd` and Windows `net user` in `windows-startup-script-cmd`) embed a plaintext password in instance metadata, which is readable by anyone who can read the VM metadata. Use the `passwd` method above. The source also notes this is not needed if you interact during or before boot, or if `getty` is configured with `-a root`. For VMs that can't boot far enough, the source suggests the open-source GCE Rescue tool or attaching the boot disk to a temporary VM.
- Not reproduced: the source's REST `setOrgPolicy` bodies use `TRUE` / `FALSE` literals (not valid JSON); the replay-option combination examples (the gcloud lines in the source are missing a space in `instance-name--port`).
- Troubleshooting web UI: with VPC Service Controls use `gcloud compute connect-to-serial-port`; you need `iam.serviceAccountUser` on the instance service account; with OS Login make sure SSH keys are in your OS Login profile or project metadata; with Private Google Access and a `*.googleapis.com` DNS wildcard, route the serial console endpoint over the public internet.
- Sending a serial break: press `ENTER`, type `~B`, then the Magic SysRq command. In nested SSH sessions add extra tildes (`~~`) per hop. Use `stty rows Y cols X` to set window size.
- On the gcloud side, `--dry-run` prints the SSH command it would run, useful for comparing with a third-party client.
- Omitted to keep the page short: the Windows-instance variant of the SSH client command (`...OPTIONS.port=2@REGION-ssh-serialport.googleapis.com`), the `systemctl enable serial-getty@ttyS1.service` step, the bare metal bootloader settings (115,200 bps: `console=ttyS0,115200`, `serial --speed=115200`), the `--extra-args on-dropped-output=ignore` example, the `gcloud compute ssh INSTANCE_NAME` login step before `passwd`, and the one-line `--extra-args replay-lines=N` / `on-dtr-low=disconnect` examples (the options are in the table above). The source also shows Console steps and several REST bodies.
- Source: https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-using-serial-console (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [viewing-serial-port-output.md](./viewing-serial-port-output.md)
- [set-up-oslogin.md](./set-up-oslogin.md)
