---
source: https://docs.cloud.google.com/compute/docs/connect/ssh-using-iap
---

# Connect to Linux VMs by using IAP

How to SSH to a VM through its internal IP address with Identity-Aware Proxy (IAP) TCP forwarding. IAP wraps the SSH connection in HTTPS, checks your IAM permissions, then forwards to the VM.

## Signature / Usage

### gcloud

```bash
gcloud compute ssh INSTANCE_NAME \
    --project=PROJECT_ID \
    --zone=ZONE \
    --tunnel-through-iap
```

### OpenSSH client (`~/.ssh/config`)

First connect once with the gcloud command above to generate and propagate keys, then exit. Append this entry (`%USERPROFILE%\.ssh\config` on Windows):

```text
Host INSTANCE_NAME
    HostName INSTANCE_NAME
    IdentityFile PATH_TO_PRIVATE_KEY
    ProxyCommand gcloud compute start-iap-tunnel %h %p --listen-on-stdin --project=PROJECT_ID --zone=ZONE --verbosity=warning
    User USERNAME
```

Then connect:

```bash
ssh INSTANCE_NAME
```

### PuTTY

Host Name field `USERNAME@INSTANCE_NAME`; private key `.ppk`; **Connection > Proxy**: type **Local**, and in the local proxy command field enter:

```text
gcloud.cmd compute start-iap-tunnel INSTANCE_NAME PORT_NUMBER --listen-on-stdin --project=PROJECT_ID --zone=ZONE
```

## Options / Props

| Placeholder | Description |
|---|---|
| `INSTANCE_NAME` | VM to connect to |
| `PROJECT_ID` | Project that contains the VM |
| `ZONE` | Zone of the VM |
| `PATH_TO_PRIVATE_KEY` | Private key file, typically `~/.ssh/google_compute_engine` |
| `USERNAME` | VM username, such as your OS Login username or the metadata username |
| `PORT_NUMBER` | Port `sshd` runs on; default `22` |

## Notes

- Required permissions: all permissions included in the IAP roles (see the IAP TCP forwarding docs). The source states you must create a firewall rule that allows connections from IAP before you begin; restrict it to the IAP source ranges documented there and do not open port 22 to `0.0.0.0/0`.
- Console SSH-in-browser uses IAP only if the VM has no external IP address. Console connections create an ephemeral SSH key; gcloud CLI connections create a persistent key.
- IAP Desktop is another client (install from the `GoogleCloudPlatform/iap-desktop` repository, sign in, add the project, right-click the VM and select **Connect**).
- Supported on all public Linux images; for Fedora CoreOS set up SSH access first. If IAP is not usable for internal-only VMs, see the "Connection options for internal-only VMs" page.
- IAP itself is in the planned `gcp-security`; the firewall rule and VPC are in the planned `gcp-networking`. Users also need `roles/iap.tunnelResourceAccessor` when OS Login is used (see [set-up-oslogin.md](./set-up-oslogin.md)).
- Private keys are never shown here; keep them local.
- Source: https://docs.cloud.google.com/compute/docs/connect/ssh-using-iap (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-ssh.md](./standard-ssh.md)
- [set-up-oslogin.md](./set-up-oslogin.md)
- [access-overview.md](./access-overview.md)
