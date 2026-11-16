---
source: https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux
---

# Linux startup scripts

A startup script runs during VM boot, as the `root` user. Compute Engine copies it to the VM, sets run permissions and executes it; it can apply to a single VM or the whole project. VM-level metadata overrides project-level metadata, and startup scripts only run when a network is available. Scripts can be bash or any interpreter named by a `#!` line (for example `#! /usr/bin/python3`).

## Signature / Usage

### Pass the script directly (new VM)

Adapted (not in the official docs): removed the leading indentation of the script lines so the `EOF` heredoc terminator starts at column 0 (the official gcloud block indents it, so the heredoc never terminates), and replaced the end-of-support image family `--image-family=debian-10` with `debian-12`.

```bash
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-12 \
  --metadata=startup-script='#! /bin/bash
apt update
apt -y install apache2
cat <<EOF > /var/www/html/index.html
<html><body><p>Linux startup script added directly.</p></body></html>
EOF'
```

### Pass the script directly (existing VM)

Adapted (not in the official docs): same de-indentation of the script lines as above.

```bash
gcloud compute instances add-metadata VM_NAME \
    --zone=ZONE \
    --metadata=startup-script='#! /bin/bash
apt update
apt -y install apache2
cat <<EOF > /var/www/html/index.html
<html><body><p>Linux startup script added directly.</p></body></html>
EOF'
```

### Pass the script from a local file

Adapted (not in the official docs): `--image-family=debian-10` (an end-of-support image family) replaced with `debian-12`.

```bash
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-12 \
  --metadata-from-file=startup-script=FILE_PATH
```

```bash
gcloud compute instances add-metadata VM_NAME \
  --zone=ZONE \
  --metadata-from-file startup-script=FILE_PATH
```

### Pass the script from Cloud Storage

`CLOUD_STORAGE_URL` is `https://storage.googleapis.com/BUCKET/FILE` (authenticated URL) or `gs://BUCKET/FILE`. Use `--scopes=storage-ro` so the VM can read the bucket.

Adapted (not in the official docs): `--image-family=debian-10` (an end-of-support image family) replaced with `debian-12`.

```bash
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-12 \
  --scopes=storage-ro \
  --metadata=startup-script-url=CLOUD_STORAGE_URL
```

```bash
gcloud compute instances add-metadata VM_NAME \
    --zone=ZONE \
    --metadata startup-script-url=CLOUD_STORAGE_URL
```

### REST: set the script on an existing VM

First `GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME` (`instances.get`) to read `metadata.fingerprint`, then call `instances.setMetadata` with `FINGERPRINT` replaced by that value (`instances.insert` takes the same `metadata.items` entry). For a `startup-script-url` script on a new VM, the REST equivalent of `--scopes=storage-ro` is required too: "To the `scopes` field, add `https://www.googleapis.com/auth/devstorage.read_only` so the VM can access Cloud Storage" (in `serviceAccounts[].scopes` of the `instances.insert` body).

Adapted (not in the official docs): `"fingerprint"` is quoted because the `Metadata.fingerprint` field is a string (format byte) in the Compute API discovery document; the source shows it unquoted, which is not valid JSON.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME/setMetadata

{
  "fingerprint": "FINGERPRINT",
  "items": [
    {
      "key": "startup-script",
      "value": "#! /bin/bash\napt update\napt -y install apache2\ncat <<EOF > /var/www/html/index.html\n<html><body><p>Linux startup script added directly.</p></body></html>\nEOF"
    }
  ],
  ...
}
```

### Read a custom metadata value inside the script

Startup script that reads the `foo` key (keeps the `Metadata-Flavor: Google` header):

Adapted (not in the official docs): `curl` changed to `curl -fsS` so a missing key or an unavailable metadata server fails the command instead of writing the error body into the page.

```bash
#! /bin/bash
METADATA_VALUE=$(curl -fsS http://metadata.google.internal/computeMetadata/v1/instance/attributes/foo -H "Metadata-Flavor: Google")
apt update
apt -y install apache2
cat <<EOF > /var/www/html/index.html
<html><body><p>Accessing metadata value of foo: $METADATA_VALUE</p></body></html>
EOF
```

Create the VM with the script file and the `foo` value:

Adapted (not in the official docs): `--image-family=debian-10` (an end-of-support image family) replaced with `debian-12`.

```bash
gcloud compute instances create VM_NAME \
  --image-project=debian-cloud \
  --image-family=debian-12 \
  --metadata-from-file=startup-script=FILE_PATH \
  --metadata=foo=bar
```

### Rerun and inspect output (on the VM)

```bash
sudo google_metadata_script_runner startup
```

```bash
sudo journalctl -u google-startup-scripts.service
```

## Options / Props

| Metadata key | Use for | Order of execution |
|---|---|---|
| `startup-script` | bash or non-bash script stored locally or added directly, up to 256 KB | First, on each boot after the initial boot |
| `startup-script-url` | script stored in Cloud Storage, for scripts greater than 256 KB; the string is used as-is to run `gcloud storage` (do not replace spaces with `%20` or add double quotes) | Second, on each boot after the initial boot |

Permissions: all permissions needed to create a VM, plus `compute.instances.setMetadata` on the VM; for Cloud Storage scripts also access to the bucket and object. Console service account for a bucket script needs Storage Object Viewer (`roles/storage.objectViewer`) on the bucket.

## Notes

- Prerequisite: the guest environment (guest agent) must be installed and running. All public Compute Engine images include it; custom images need a manual install.
- Never put passwords, tokens or keys in a startup script or its metadata; anyone who can read VM metadata can read them.
- Security (Cloud Storage scripts): project owners and editors can access Cloud Storage files in the project by default. If the bucket or object is less secure than metadata, a modified script runs as `root` on the next reboot with the VM service account's permissions (privilege escalation risk). Container-Optimized OS has limited or no support for some features.
- Local scripts must be passed from the workstation; files stored on VMs cannot be used as startup scripts. `startup-script` entries run before `startup-script-url` entries.
- Corrected from the official docs: the "Accessing metadata" script calls `curl` without `-f`; the metadata server returns `404` ("Not Found: the requested endpoint doesn't exist") for a path that does not exist, such as an unset attribute key, and `503` while it "isn't ready to serve"; without `-f`, `curl` prints the error response body and exits 0, so the error text would be written into `index.html`. It now uses `curl -fsS`.
- Corrected from the official docs: the source uses the end-of-support image family debian-10; replaced with debian-12. The OS details page lists Debian 10 (`debian-10`) with lifecycle stage "EOS" and EOS date June 30, 2024.
- Corrected from the official docs: the REST example shows `"fingerprint": FINGERPRINT` unquoted; `fingerprint` is a string (the value of `metadata.fingerprint`), so it is quoted.
- Corrected from the official docs: the two gcloud "directly" blocks indent every script line by 2 or 4 spaces (for example `  EOF'`); the REST value and the Console text in the same page carry no indentation, so the lines were de-indented.
- The source also shows Console steps and REST `instances.insert` bodies; they are omitted. Project-level scripts use `gcloud compute project-info add-metadata`.
- Source inconsistency: this page reruns startup scripts with `sudo google_metadata_script_runner startup` without naming the agent architecture, while guest-agent.md lists `/usr/bin/google_metadata_script_runner` only under "Monolithic agent binaries" and gives `/usr/bin/gce_metadata_script_runner` as the metadata script runner of the plugin-based agent, which is used "starting with version `20250901.00`". The command as written matches the monolithic agent; guest-agent.md says "Ubuntu and SUSE Linux Enterprise Server (SLES) operating systems still use the monolithic guest agent architecture."
- Scope choice: this page uses `--scopes=storage-ro` so the VM can read the bucket, while service-accounts.md (compute-security) describes authorization as the intersection of IAM roles and access scopes and recommends the `cloud-platform` scope with IAM roles as best practice. With either scope, the VM's service account still needs access to the bucket and object (Permissions above).
- Source (guest agent binaries): https://docs.cloud.google.com/compute/docs/images/guest-agent (retrieved 2026-11-17)
- Source (OS image lifecycle per version): https://docs.cloud.google.com/compute/docs/images/os-details (retrieved 2026-11-17)
- Source (metadata server status codes): https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshoot-metadata-server (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [shutdownscript.md](./shutdownscript.md)
- [overview.md](./overview.md)
- [guest-agent.md](./guest-agent.md)
- [guest-environment.md](./guest-environment.md)
