---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/authorization
---

# Authorize the Ops Agent

Explains how the Ops Agent on a Compute Engine VM is authorized to send telemetry to Google Cloud Observability through application default credentials (ADC): an attached service account (recommended) or a service account key. Skip this guide unless you use very old VMs or must use a custom service account instead of the default one; Compute Engine instances are pre-authorized to run the agent.

## Signature / Usage

### Verify access scopes

Run on the Compute Engine instance:

```bash
curl --silent --connect-timeout 1 -f -H "Metadata-Flavor: Google" http://169.254.169.254/computeMetadata/v1/instance/service-accounts/default/scopes
```

If `https://www.googleapis.com/auth/cloud-platform` is listed, the access scopes are sufficient. Otherwise you need one scope from each pair:

- `https://www.googleapis.com/auth/logging.write` or `https://www.googleapis.com/auth/logging.admin`
- `https://www.googleapis.com/auth/monitoring.write` or `https://www.googleapis.com/auth/monitoring`

Access scopes are not IAM roles: the service account still needs the two roles listed under Options / Props.

To change scopes in the console: stop the VM, click **Edit**, under **Identity and API access** choose **Set access for each API**, set the Stackdriver Logging API and Stackdriver Monitoring API entries to **Write Only**, save and start the VM.

### Authorize with a service account key

Copy the key file to the VM (on your local machine):

```bash
CREDS=~/Downloads/PROJECT-NAME-KEY-ID.json
```

```bash
REMOTE_USER="$USER"
INSTANCE="INSTANCE_NAME"
ZONE="INSTANCE_ZONE"
gcloud compute scp "$CREDS" "$REMOTE_USER@$INSTANCE:~/temp.json" --zone "$ZONE"
```

On the VM, move the file to a permanent location readable only by `root` (Linux). Do not overwrite the key file of your current applications.

```bash
CREDENTIALS_FILE_LOCATION="/etc/google/auth/application_default_credentials.json"
sudo mkdir -p /etc/google/auth
sudo mv "$HOME/temp.json" "$CREDENTIALS_FILE_LOCATION"
sudo chown root:root "$CREDENTIALS_FILE_LOCATION"
sudo chmod 0400 "$CREDENTIALS_FILE_LOCATION"
```

### Set `GOOGLE_APPLICATION_CREDENTIALS` so the agent's process sees it

Linux: edit (or create) this file:

```text
/etc/systemd/system.conf
```

Add:

```text
DefaultEnvironment="GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_CREDENTIAL_FILE"
```

Reload and restart:

```bash
sudo systemctl daemon-reload
```

```bash
sudo systemctl restart google-cloud-ops-agent
```

Windows (PowerShell as administrator):

```powershell
[Environment]::SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "PATH_TO_CREDENTIAL_FILE", "Machine")
```

```powershell
Restart-Service -Name google-cloud-ops-agent -Force
```

## Options / Props

### Roles the agent's service account needs

| Role | Console label | Purpose |
|------|---------------|---------|
| `roles/monitoring.metricWriter` | Monitoring > Monitoring Metric Writer | Write metrics |
| `roles/logging.logWriter` | Logging > Logs Writer | Write logs |

### Access scopes

| Scope | Meets the scope requirement on its own |
|-------|-----------------------|
| `https://www.googleapis.com/auth/cloud-platform` | Yes |
| `https://www.googleapis.com/auth/logging.write` or `https://www.googleapis.com/auth/logging.admin` | One of each pair is needed together with one of the monitoring pair |
| `https://www.googleapis.com/auth/monitoring.write` or `https://www.googleapis.com/auth/monitoring` | See above |

## Notes

- The Ops Agent supports ADC that authenticate either a VM's attached service account or a service account key. Authorization using `gcloud auth` is not supported: revoke any credentials created by using `gcloud auth` (`gcloud auth application-default revoke`).
- Prefer an attached service account with the least-privileged roles: a private key requires local storage, which can be compromised. See the "Best practices for managing service account keys" page. Steps for the attached account: verify scopes, grant the two roles, attach the account to the VM, then install the agent.
- The service account key route puts a long-lived secret on the VM file system; keep the file mode `0400` owned by `root`, never commit it, and delete it when no longer needed. After you download a key you cannot download it again.
- The `curl` call targets the link-local metadata server (`169.254.169.254`), reachable only from inside the VM; it is plain `http` by design.
- Changing `GOOGLE_APPLICATION_CREDENTIALS` in `/etc/systemd/system.conf` affects all system services that rely on that variable, not only the Ops Agent.
- Creating the service account and role changes are done in IAM (see `gcp-foundation`); the source also shows console steps for IAM and VM editing, omitted here.
- To check the key file, see https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/troubleshoot-credentials#verify-key.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/authorization (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source lists `https://www.googleapis.com/auth/monitoring.admin` as the alternative Monitoring scope; the Monitoring API v3 Discovery document defines only `monitoring`, `monitoring.read`, `monitoring.write` and `cloud-platform`, and the Cloud Monitoring access-control page names the full-access scope `https://www.googleapis.com/auth/monitoring`.
- Corrected from the official docs: the source says that when `cloud-platform` is listed "you have sufficient authorization"; the scope check covers access scopes only; the source's own service-account section also requires `roles/monitoring.metricWriter` and `roles/logging.logWriter` on the service account, and the Cloud Monitoring access-control page recommends the `cloud-platform` scope together with IAM roles that restrict access.
- Source: https://docs.cloud.google.com/monitoring/access-control (retrieved 2026-11-18; CC BY 4.0), for the Monitoring access scopes.
- systemd re-reads `/etc/systemd/system.conf` and reapplies `DefaultEnvironment=` on `systemctl daemon-reload` (systemd v229 and later: `parse_config_file()` followed by `manager_set_defaults()` in the `MANAGER_RELOAD` branch of https://github.com/systemd/systemd/blob/v229/src/core/main.c; v258 calls `parse_configuration()` and `set_manager_defaults()`), so `daemon-reload` and a restart of the agent are enough on the supported distributions; `daemon-reexec` is not needed.

## Related

- [troubleshoot-install-startup.md](./troubleshoot-install-startup.md)
- [agent-policies.md](./agent-policies.md)
- Install the agent: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/installation
