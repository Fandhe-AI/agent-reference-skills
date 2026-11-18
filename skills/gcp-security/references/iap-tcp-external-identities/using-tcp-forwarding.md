---
source: https://docs.cloud.google.com/iap/docs/using-tcp-forwarding
---

# Use IAP for TCP forwarding

Establish an encrypted tunnel through Identity-Aware Proxy to forward SSH, RDP, and other TCP traffic to Compute Engine VM instances that have no external IP address or do not permit direct internet access, with fine-grained control over who may tunnel and to which VMs.

## Signature / Usage

### Create a firewall rule

Allow ingress from the IAP range `35.235.240.0/20` (IPv6 VMs: `2600:2d00:1:7::/64`) on the ports you need (for example `22` for SSH and `3389` for RDP) for all VMs reachable through IAP.

```bash
gcloud compute firewall-rules create allow-rdp-ingress-from-iap \
  --direction=INGRESS \
  --action=allow \
  --rules=tcp:3389 \
  --source-ranges=35.235.240.0/20
```

```bash
gcloud compute firewall-rules create allow-ssh-ingress-from-iap \
  --direction=INGRESS \
  --action=allow \
  --rules=tcp:22 \
  --source-ranges=35.235.240.0/20
```

```bash
gcloud compute firewall-rules create allow-ingress-from-iap \
  --direction=INGRESS \
  --action=allow \
  --rules=tcp:PORT \
  --source-ranges=35.235.240.0/20
```

`PORT` is the port used by the protocol.

### Grant access to all VMs in a project

Grant the roles at project level. Optionally add an IAM condition, for example a CEL expression limiting access to port 22:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=user:EMAIL \
    --role=roles/iap.tunnelResourceAccessor
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=user:EMAIL \
    --role=roles/compute.instanceAdmin.v1
```

```text
destination.port == 22
```

### Grant access to a specific VM

Grant `roles/iap.tunnelResourceAccessor` on the VM (IAP admin page, SSH and TCP Resources tab, or the API); the other roles stay at project level. Access-level condition format:

```text
accessPolicies/POLICY_NAME/accessLevels/ACCESS_LEVEL_NAME
```

Example `policy.json` for `setIamPolicy` (condition: access level, private IP `10.0.0.1`, port `22`):

Adapted (not in the official docs): `version` `3` and the `etag` from the `getIamPolicy` response are added to the policy, as the IAP Discovery document requires for conditional role bindings.

```json
{
  "policy": {
    "version": 3,
    "etag": "ETAG_FROM_GETIAMPOLICY",
    "bindings": [
      {
        "role": "roles/iap.tunnelResourceAccessor",
        "members": ["group:instance-admins@example.com"],
        "condition": {
          "expression": "\"accessPolicies/POLICY_NAME/accessLevels/ACCESS_LEVEL_NAME\" in request.auth.access_levels && destination.ip == \"10.0.0.1\" && destination.port == 22",
          "title": "CONDITION_NAME"
        }
      }
    ]
  }
}
```

Find the policy name with `accessPolicies.list`:

Adapted (not in the official docs): the Discovery document marks the `parent` query parameter (`organizations/{org_id}`) as required, so it is added.

```text
GET https://accesscontextmanager.googleapis.com/v1/accessPolicies?parent=organizations/ORGANIZATION_ID
```

### Tunnel SSH

```bash
gcloud compute ssh INSTANCE_NAME
```

Without an external IP the connection uses IAP TCP tunneling automatically; with an external IP it uses that address. `--tunnel-through-iap` always tunnels; `--internal-ip` never tunnels (useful from the same VPC network). To print the full `ssh` command with a `ProxyCommand`:

```bash
gcloud compute ssh INSTANCE_NAME --dry-run
```

PuTTY preparation (run once so the SSH keys exist and are published; PowerShell continuation shown):

```powershell
gcloud compute ssh INSTANCE_NAME `
  --tunnel-through-iap `
  --project PROJECT_ID `
  --zone ZONE
```

### Tunnel RDP and other TCP

```bash
gcloud compute start-iap-tunnel INSTANCE_NAME 3389 \
    --local-host-port=localhost:LOCAL_PORT \
    --zone=ZONE
```

Use `0` for `LOCAL_PORT` to pick an unused port. Leave gcloud running, then connect the Remote Desktop client to `localhost:LOCAL_PORT`. For other protocols:

```bash
gcloud compute start-iap-tunnel INSTANCE_NAME INSTANCE_PORT \
    --local-host-port=localhost:LOCAL_PORT \
    --zone=ZONE
```

Expected output:

```text
Listening on port [LOCAL_PORT].
```

The local port is only accessible by applications on your local computer.

### Increase upload bandwidth (NumPy)

Linux: install NumPy with pip in a new terminal:

```bash
$(gcloud info --format="value(basic.python_location)") -m pip install numpy
```

If the error message persists, allow gcloud to access external packages:

```bash
export CLOUDSDK_PYTHON_SITEPACKAGES=1
```

Windows: install NumPy with pip in a new PowerShell instance:

```powershell
start (gcloud info --format="value(basic.python_location)") "-m pip install numpy"
```

If the message persists, allow gcloud to access external packages:

```powershell
$env:CLOUDSDK_PYTHON_SITEPACKAGES="1"
```

The leading `$` in the Linux command is part of the command. `export` applies to the current terminal only (add it to `.bashrc` to persist).

## Options / Props

### Roles

| Task | Role |
|------|------|
| Manage IAP-related setup (required to follow this page) | IAP Policy Admin (`roles/iap.policyAdmin`) on the project |
| TCP forwarding | IAP-secured Tunnel User (`roles/iap.tunnelResourceAccessor`) |
| SSH access | Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) |
| Use a service account | Service Account User (`roles/iam.serviceAccountUser`) |

### Permissions by scenario

| Scenario | Permissions |
|----------|-------------|
| All | `iap.tunnelInstances.accessViaIAP` |
| `gcloud compute start-iap-tunnel`, `ssh`, `scp` | `compute.instances.get`, `compute.instances.list` |
| `gcloud compute ssh`, `scp` | `compute.projects.get` |
| ... VM using OS Login | see Compute Engine "Configuring OS Login roles on user accounts" |
| ... VM not using OS Login | `compute.instances.setMetadata`, `compute.projects.setCommonInstanceMetadata`, `compute.globalOperations.get` |
| SSH to VM using a service account | `iam.serviceAccounts.actAs` |
| SSH from the browser | see Compute Engine "SSH in browser" |

### Known limitations

| Limit | Detail |
|-------|--------|
| Bandwidth | Not intended for bulk data transfer; IAP may rate-limit abusing users |
| Connection length | Sessions disconnect after one hour of inactivity; `gcloud compute start-iap-tunnel` tries to re-establish a disconnected tunnel |

## Notes

- Tags are not supported for granting IAP TCP forwarding permission.
- IAP proxies connect to the primary internal IPv4 address of `nic0` on the VM.
- If you are behind a corporate proxy without Cloud VPN to your VPC network, allowlist the IAP for TCP domain (see [faq.md](./faq.md)) on your corporate network.
- The `default-allow-ssh` and `default-allow-rdp` default rules allow SSH and RDP from all IP addresses, not only from IAP; consider disabling or deleting them to prevent direct access.
- Principals with the Owner role can use IAP for TCP forwarding.
- Project-level grants give access to all VMs in the project; the source also offers a VM-level grant of `roles/iap.tunnelResourceAccessor`, which is narrower. The API `setIamPolicy` call replaces the resource's policy, so fetch the current policy with `getIamPolicy` first and keep its `etag`; conditional bindings need policy `version` `3` (IAP Discovery document).
- Adapted from the official docs: `"version": 3` and `"etag"` were added to the source `policy.json`, and `?parent=organizations/ORGANIZATION_ID` to `GET https://accesscontextmanager.googleapis.com/v1/accessPolicies`.
- The source also shows Console steps, IAP Desktop (open source, not an officially supported Google product), the PuTTY proxy settings, and the `getIamPolicy`/`setIamPolicy` curl calls against `https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/iap_tunnel/zones/ZONE_NAME/instances/...`; the PuTTY local proxy command (`gcloud.cmd compute start-iap-tunnel %host %port --listen-on-stdin --project PROJECT_ID --zone ZONE`) is omitted; `--listen-on-stdin` is accepted by gcloud 593.0.0 but is a hidden flag not listed in its `start-iap-tunnel` help. If PuTTY shows `proxy: - Invalid Credentials`, refresh credentials, for example with `gcloud auth print-identity-token`.
- The full flag lists of `gcloud compute start-iap-tunnel` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/start-iap-tunnel) and `gcloud compute ssh` (`--tunnel-through-iap`, https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssh) are in the `gcp-compute` skill.
- Because you connect RDP to `localhost`, the client may warn that the remote computer identity cannot be verified.
- Source: https://docs.cloud.google.com/iap/docs/using-tcp-forwarding (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [tcp-forwarding-overview.md](./tcp-forwarding-overview.md)
- [securing-tcp-with-vpc-sc.md](./securing-tcp-with-vpc-sc.md)
- [tcp-by-host.md](./tcp-by-host.md)
- [faq.md](./faq.md)
