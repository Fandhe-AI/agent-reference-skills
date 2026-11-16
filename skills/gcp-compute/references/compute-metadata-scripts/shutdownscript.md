---
source: https://docs.cloud.google.com/compute/docs/shutdownscript
---

# Running shutdown scripts

Shutdown scripts run commands right before a VM is stopped or restarted, so the VM can clean up, export logs or sync with other systems. They work like startup scripts and are especially useful for VMs in a managed instance group with an autoscaler. Linux VMs run them as `root`, Windows VMs as the `System` account (for both shutdown and reboot).

## Signature / Usage

### Pass a local shutdown script file (gcloud only)

```bash
gcloud compute instances create example-instance \
    --metadata-from-file shutdown-script=examples/scripts/install.sh
```

### Pass the script contents directly

Adapted (not in the official docs): removed the `> ` continuation-prompt prefixes that the source copied into the quoted script, so the script lines are not turned into stray `>` redirections.

```bash
gcloud compute instances create example-instance --metadata shutdown-script="#! /bin/bash
# Shuts down Apache server
/etc/init.d/apache2 stop"
```

### REST: shutdown script in instance metadata

```http
POST https://compute.googleapis.com/compute/v1/projects/myproject/zones/us-central1-a/instances

{...
  "metadata": {
    "items": [
      {
       "key": "shutdown-script",
       "value": "#! /bin/bash\n\n# Shuts down Apache server\n/etc/init.d/apache2 stop"
      }
    ]
  }...
}
```

## Options / Props

| Metadata key | Purpose |
|---|---|
| `shutdown-script` | Script contents (or `--metadata-from-file` path), up to the 256 KB metadata value limit |
| `shutdown-script-url` | Cloud Storage URL of the script; follow the startup-script Cloud Storage procedure with this key |
| `windows-shutdown-script-cmd` / `-bat` / `-ps1` | Windows `cmd`, `bat` and PowerShell scripts; each key once per VM, multiple keys allowed |
| `windows-shutdown-script-url` | Cloud Storage script for Windows; use it in place of `windows-startup-script-url` when following the startup-script Cloud Storage procedure |

| Topic | Behavior |
|---|---|
| Triggers | Stop or reboot from the guest OS; stop or delete the instance; programmed stop or delete by Compute Engine; Spot VM or preemptible preemption |
| Timing | Starts when state becomes `STOPPING`; must finish before `TERMINATED`; the time varies by instance type, and scripts still running are forcefully stopped (possible data loss) |
| Precedence | A VM-level or zonal shutdown script prevents the project-level script from running on that VM (project-level: `gcloud compute project-info add-metadata`) |
| Non-bash scripts | Add a shebang line such as `#!/usr/bin/python`; Compute Engine runs the file verbatim |
| Running instances | Add `shutdown-script` or `shutdown-script-url` as for startup scripts on running instances |

Permissions: all permissions to create an instance, plus `compute.instances.setMetadata`.

## Notes

- Execution is best effort; in rare cases Compute Engine cannot guarantee the script completes. To keep the state at `STOPPING` until scripts finish, stop the VM from inside its guest OS.
- Prerequisite: the guest environment must be installed and running; see guest-environment.md.
- Graceful shutdown: if graceful shutdown is enabled on the instance, metadata shutdown scripts run only after the graceful shutdown ends. To run commands during it, run a background watcher script (also at boot) that long-polls `http://metadata.google.internal/computeMetadata/v1/instance/attributes/shutdown-status` with `?wait_for_change=true&last_etag=ETAG` and the `Metadata-Flavor: Google` header, treats HTTP 200 with value `PENDING_STOP` as the signal, treats 503 as a timeout and retries, runs your cleanup, then calls `sudo shutdown -h now` (Linux, needs passwordless sudo) or `Stop-Computer -Force` (Windows). The full Linux (bash) and Windows (PowerShell) watcher scripts are omitted here; fetch them from the source.
- Output: Linux `sudo journalctl -u google-shutdown-scripts.service` or serial port 1 (`google_metadata_script_runner` events); Windows serial port 1 or the Application Log (`GCEMetadataScripts` events); IAP Desktop also works. On Windows the Local Group Policy `Computer Configuration/Windows Setting/Scripts (Startup/Shutdown)` launches the script.
- Corrected from the official docs: the source gcloud example shows `> # Shuts down Apache server` and `> /etc/init.d/apache2 stop"` (shell prompt characters); the REST value in the same page shows the plain script lines.
- Never put secrets in a shutdown script or its metadata. The source also shows Console and Terraform forms; they are omitted.
- Source: https://docs.cloud.google.com/compute/docs/shutdownscript (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [linux.md](./linux.md)
- [guest-environment.md](./guest-environment.md)
- [guest-agent.md](./guest-agent.md)
- [overview.md](./overview.md)
