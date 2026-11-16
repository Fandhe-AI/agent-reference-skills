---
source: https://docs.cloud.google.com/compute/docs/connect/standard-ssh
---

# Connect to Linux VMs

How to connect by SSH to Linux VMs that have external IP addresses, using the Google Cloud console (SSH-in-browser), the gcloud CLI, an OpenSSH client, or PuTTY. VMs without external IPs, and SSH certificates for OS Login VMs, are covered by other pages.

## Signature / Usage

### gcloud

```bash
gcloud compute ssh INSTANCE_NAME \
    --project=PROJECT_ID \
    --zone=ZONE
```

With default `project` / `zone` properties set, the flags can be omitted:

```bash
gcloud compute ssh INSTANCE_NAME
```

### OpenSSH client

```bash
ssh -i PATH_TO_PRIVATE_KEY USERNAME@EXTERNAL_IP
```

### PuTTY

Enter this in **Host Name (or IP address)**, then select the private key (`.ppk`) under **Connection > SSH > Auth > Credentials** (**Connection > SSH > Auth** before PuTTY 0.78):

```text
USERNAME@EXTERNAL_IP
```

## Options / Props

| Placeholder | Description |
|---|---|
| `INSTANCE_NAME` | Name of the VM |
| `PROJECT_ID` | ID of the project that contains the VM |
| `ZONE` | Zone of the VM |
| `PATH_TO_PRIVATE_KEY` | Private key matching the public key on the VM, such as `~/.ssh/my-ssh-key`, or `~/.ssh/google_compute_engine` if the gcloud CLI generated it |
| `USERNAME` | With metadata-managed keys: the username given when the key was created. With OS Login: the username defined in your Google profile, such as `cloudysanfrancisco_example_com` or `cloudysanfrancisco` |
| `EXTERNAL_IP` | External IP address of the VM |

## Notes

- Prerequisites: a firewall rule (such as `default-allow-ssh`) in the VPC network allowing ingress TCP port `22`; SSH access configured via OS Login (recommended) or metadata-based SSH keys, with the needed IAM roles; authentication set up.
- Supported on all public Linux images. For Fedora CoreOS images you must set up SSH access first.
- Console connections create an ephemeral SSH key; gcloud CLI connections create a persistent SSH key.
- When a user connects to a VM, that user can use all IAM permissions granted to the service account attached to the VM.
- Restrict the firewall rule source ranges to what you need; do not open port 22 to `0.0.0.0/0` more broadly than required. The VM-side setting is here; VPC networks and firewall policies themselves are in the planned `gcp-networking`.
- The source also shows the Console click-path and Cloud Shell activation steps.
- Source: https://docs.cloud.google.com/compute/docs/connect/standard-ssh (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-overview.md](./access-overview.md)
- [set-up-oslogin.md](./set-up-oslogin.md)
- [ssh-using-iap.md](./ssh-using-iap.md)
