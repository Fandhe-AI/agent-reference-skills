---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/troubleshoot-install-startup
---

# Troubleshoot Ops Agent installation and startup

Diagnoses Ops Agent installation failures and start-up problems (unsupported OS, conflicting legacy agents, repository errors, stopped services, port conflicts, missing API permissions, invalid configuration). If the agent runs but fails to ingest logs or metrics, use the ingestion troubleshooting page instead. Check the agent's health checks first.

## Signature / Usage

### Remove a stale Monitoring agent repository (Linux)

If a Monitoring agent install failed on an OS it does not support, the Ops Agent install then fails on the invalid repository. If `add-monitoring-agent-repo.sh` is on the system:

```bash
sudo bash add-monitoring-agent-repo.sh --remove-repo
```

Otherwise remove the repository file by distribution family. Debian:

```bash
sudo rm /etc/apt/sources.list.d/google-cloud-monitoring.list
```

RHEL:

```bash
sudo rm /etc/yum.repos.d/google-cloud-monitoring.repo
```

SUSE:

```bash
sudo rm /etc/zypp/repos.d/google-cloud-monitoring.repo
```

Then run the Ops Agent installation script again.

### Add the missing repository public key (Linux, `NO_PUBKEY` error)

```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg \
    | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/google-cloud-ops-agent.gpg
```

### Check and start the agent services

Linux (the expected output lists the main service plus the Metrics Agent and Logging Agent sub-services as running):

```bash
sudo systemctl status google-cloud-ops-agent"*"
```

Windows:

```powershell
Get-Service google-cloud-ops-agent*
```

Start a stopped service. Linux:

```bash
sudo service google-cloud-ops-agent start
```

Windows:

```powershell
Start-Service google-cloud-ops-agent
```

### Find which process uses the agent ports

Linux, Metrics Agent component (expected process `otelopscol`, port 20201):

Adapted (not in the official docs): `ss -lntp` lists the listening TCP sockets with their processes; the source's `netstat -ns -p` prints protocol statistics.

```bash
sudo ss -lntp | grep ':20201'
```

Linux, Logging Agent component (expected process `fluent-bit`, port 20202):

Adapted (not in the official docs): `ss -lntp` lists the listening TCP sockets with their processes; the source's `netstat -ns -p` prints protocol statistics.

```bash
sudo ss -lntp | grep ':20202'
```

Windows (expected `google-cloud-metrics-agent_windows_amd64.exe` on 20201 and `fluent-bit.exe` on 20202):

```powershell
netstat -na -b  | Select-String "20201" -Context 0,1
```

```powershell
netstat -na -b  | Select-String "20202" -Context 0,1
```

### Get the exact configuration error (Linux)

```bash
sudo journalctl -xe | grep "google_cloud_ops_agent_engine"
```

Sample messages:

```text
the agent config file is not valid YAML. detailed error: yaml: line 21: did not find expected key
```

```text
failed to generate config files: can't parse configuration: yaml: line 20: could not find expected ':'
```

The first is the Linux message and the second is the Windows message. Correct the configuration and restart the agent.

## Options / Props

### Symptoms and fixes

| Symptom | Cause / fix |
|---------|-------------|
| `repomd.xml ... 404 Not Found` (for example `google-cloud-ops-agent-el6-x86_64-all`) | The operating system isn't supported by the Ops Agent |
| `package google-cloud-ops-agent ... conflicts with stackdriver-agent` | A legacy agent is installed. Save custom configuration files, then uninstall the legacy Monitoring and Logging agents |
| apt `... does not have a Release file` for `google-cloud-monitoring` | A failed Monitoring agent install left an invalid repository; remove it (see above) |
| `NO_PUBKEY C0BA5CE6DC6315A3` | Add the public key (see above) |
| Windows: existing StackdriverLogging service not compatible with a non-empty logging section | Remove the logging section from the Ops Agent configuration, or disable the legacy Logging agent |
| Agent crashes and the report mentions NVIDIA (VM with attached GPUs) | Known issue in Ops Agent 2.39.0 and 2.40.0: install 2.38.0, or 2.41.0 or higher |
| Console shows installed agent as "Not Detected" | The agent must be running and ingesting data for the console to detect it |
| Console shows a removed agent as installed | The console might take up to one hour to report an uninstall |

### Ports used by the agent

| Port | Component | Process |
|------|-----------|---------|
| 20201 | Metrics Agent | `otelopscol` (Linux), `google-cloud-metrics-agent_windows_amd64.exe` (Windows) |
| 20202 | Logging Agent | `fluent-bit` (Linux), `fluent-bit.exe` (Windows) |

### Roles for the agent's service account

| Component | Role |
|-----------|------|
| Logging Agent | `roles/logging.logWriter` (Logs Writer) |
| Metrics Agent | `roles/monitoring.metricWriter` (Monitoring Metric Writer) |

## Notes

- Authorization using the Google Cloud CLI is not supported by the Ops Agent; revoke any credentials created with it.
- The legacy Logging and Monitoring agents are legacy components. This twin states no end-of-support date for them; it only says they conflict with the Ops Agent and must be uninstalled (after uninstalling, the console can take up to one hour to report it). The `curl -fsSL ... | sudo gpg --dearmor` command is not a pipe to a shell: it writes a repository signing key.
- Run the Ops Agent installation script as described on the installation page; this page does not give an installer command.
- Linux health states: when the services run, `google-cloud-ops-agent-opentelemetry-collector.service` is the Metrics Agent and `google-cloud-ops-agent-fluent-bit.service` is the Logging Agent. A stopped main service appears as `Active: inactive (dead)`; if it fails to start, the configuration might be invalid.
- Port and API-permission errors can also be detected by the Ops Agent health checks. To find the service account used by a VM, check the **API and identity management** section of the VM details page; see the authorization page for the roles.
- The source also shows long `systemctl` / `Get-Service` output samples and console steps; they are omitted here.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/troubleshoot-install-startup (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the Linux port checks are `sudo netstat -ns -p | grep '20201'` (and `20202`). `-s` prints per-protocol statistics, not sockets, so the output does not show which process listens on the port; the examples use `sudo ss -lntp | grep ':20201'` (`ss` is in iproute2; `sudo netstat -lntp` works where net-tools is installed).

## Related

- [authorization.md](./authorization.md)
- [agent-policies.md](./agent-policies.md)
- [rotate-logs.md](./rotate-logs.md)
