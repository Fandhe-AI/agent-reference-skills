---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/installation
---

# Installing the Ops Agent on a VM

Install, verify, upgrade and uninstall the Ops Agent on one Compute Engine VM from the command line (or from the Google Cloud console). The agent collects logs and metrics and sends them to Cloud Logging and Cloud Monitoring.

## Signature / Usage

### Before you begin

- A supported VM instance and operating system (see ops-agent.md).
- Credentials on the VM that authorize Cloud Logging and Cloud Monitoring. By default the agent uses the Compute Engine service account, which has `roles/logging.logWriter` (Logs Writer) and `roles/monitoring.metricWriter` (Monitoring Metric Writer). Very old instances, or instances created without default credentials, need the "Authorize the Ops Agent" procedure (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/authorization).
- The Cloud Logging API and Cloud Monitoring API enabled.
- No legacy Cloud Logging agent or Cloud Monitoring agent on the VM (duplicate logs or metric conflicts; the Ops Agent configuration files are not compatible). Save custom legacy configuration files first, then uninstall the legacy agents.

### Install the latest version (Linux)

Run in a directory you can write to, with `sudo` access.

Adapted (not in the official docs): the source's `curl -sSO ... && sudo bash ...` is split into download, inspect and run; `curl -f` is added so an HTTP error does not leave an error page to be executed as root.

```bash
curl -fsSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
less add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
```

After it is installed, the agent starts automatically.

### Install the latest version (Windows)

Use a PowerShell terminal run as administrator.

Adapted (not in the official docs): an inspect step (`Get-Content`) is inserted between the download and the run.

```powershell
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.ps1", "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1")
Get-Content "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1"
Invoke-Expression "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1 -AlsoInstall"
```

### Install a specific or pinned version (Linux)

First download the script as above. Pin to a major version for production to avoid backward-incompatible changes.

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --also-install \
  --version=MAJOR_VERSION.*.*
```

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --also-install \
  --version=2.*.*
```

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --also-install \
  --version=MAJOR_VERSION.MINOR_VERSION.PATCH_VERSION
```

### Install a specific or pinned version (Windows)

```powershell
Invoke-Expression "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1 -AlsoInstall -Version MAJOR_VERSION.*.*"
```

Adapted (not in the official docs): pinned to major version 2 (the GA line) instead of the source's `1.*.*`, which installs a Preview version.

```powershell
Invoke-Expression "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1 -AlsoInstall -Version 2.*.*"
```

Adapted (not in the official docs): the source's exact-version example `1.0.1` (a Preview version) is replaced with the placeholder form used by the Linux example.

```powershell
Invoke-Expression "${env:UserProfile}\add-google-cloud-ops-agent-repo.ps1 -AlsoInstall -Version MAJOR_VERSION.MINOR_VERSION.PATCH_VERSION"
```

### Verify the agent is running

```bash
sudo systemctl status google-cloud-ops-agent"*"
```

Verify that the components "Logging Agent" and "Metrics Agent" are running.

```powershell
Get-Service google-cloud-ops-agent
```

The status should be `Running`.

### Determine the agent version

```bash
rpm --query --queryformat '%{NAME} %{VERSION} %{RELEASE} %{ARCH}\n' google-cloud-ops-agent
```

```bash
dpkg-query --show --showformat '${Package} ${Version} ${Architecture} ${Status}\n' google-cloud-ops-agent
```

```powershell
googet installed google-cloud-ops-agent
```

The `rpm` command is for Red Hat, CentOS and SUSE; `dpkg-query` for Debian and Ubuntu; `googet` for Windows.

### List all agent versions

```bash
sudo yum list --showduplicates google-cloud-ops-agent
```

```bash
sudo apt-cache madison google-cloud-ops-agent
```

```bash
sudo zypper search -s google-cloud-ops-agent
```

```powershell
googet available google-cloud-ops-agent
```

Commands are for CentOS / RHEL, Debian / Ubuntu, SLES / SUSE and Windows respectively.

### Restart the agent

Restart is required to pick up configuration changes.

```bash
sudo systemctl restart google-cloud-ops-agent
```

```powershell
Restart-Service google-cloud-ops-agent -Force
```

### Upgrade the agent

Linux (re-run the downloaded script):

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
```

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --also-install \
  --version=MAJOR_VERSION.*.*
```

Windows (back up the configuration, then remove and install):

```powershell
Copy-Item -Path "C:\Program Files\Google\Cloud Operations\Ops Agent\config\config.yaml" -Destination "C:\Program Files\Google\Cloud Operations\Ops Agent\config\config.bak"
```

```powershell
googet -noconfirm remove google-cloud-ops-agent
googet -noconfirm install google-cloud-ops-agent
```

### Uninstall the agent

```bash
sudo bash add-google-cloud-ops-agent-repo.sh --uninstall
```

Append `--remove-repo` to also remove the repository.

```powershell
googet -noconfirm remove google-cloud-ops-agent
```

### Configure an HTTP proxy (Linux)

Edit `/etc/systemd/system.conf` (create it if missing).

Adapted (not in the official docs): the trailing `# Skip proxy for the local Metadata Server.` comment is moved to its own line, because systemd does not strip comments that follow a value on the same line.

```text
# Skip proxy for the local Metadata Server.
DefaultEnvironment="HTTP_PROXY=http://proxy-ip:proxy-port" "HTTPS_PROXY=http://proxy-ip:proxy-port" "NO_PROXY=http://metadata.google.internal"
```

```bash
sudo systemctl daemon-reload
```

```bash
sudo systemctl restart google-cloud-ops-agent"*"
```

### Configure an HTTP proxy (Windows)

Run from an administrator command prompt.

```text
setx HTTP_PROXY http://proxy-ip:proxy-port /m
setx HTTPS_PROXY http://proxy-ip:proxy-port /m
setx no_proxy "metadata.google.internal,169.254.169.254" /m
```

## Options / Props

### Installation script flags

| Linux (`add-google-cloud-ops-agent-repo.sh`) | Windows (`add-google-cloud-ops-agent-repo.ps1`) | Description |
|---|---|---|
| `--verbose` | `-Verbose` | Turns on verbose logging during the script execution |
| `--also-install` | `-AlsoInstall` | Installs the agent after adding the agent package repository |
| `--version` | `-Version` | Sets the agent version for the script to install |
| `--uninstall` | `-Uninstall` | Uninstalls the agent |
| `--remove-repo` | `-RemoveRepo` | Removes the corresponding agent package repository after installing or uninstalling the agent |
| `--dry-run` | `-WhatIf` | Triggers only a dry run and prints the commands that it is supposed to execute |
| `--uninstall-standalone-logging-agent` | `-UninstallStandaloneLoggingAgent` | Uninstalls the legacy Logging agent (`StackdriverLogging`) |
| `--uninstall-standalone-monitoring-agent` | `-UninstallStandaloneMonitoringAgent` | Uninstalls the legacy Monitoring agent (`StackdriverMonitoring`) |

### Agent column on the Monitoring VM Instances page

| Value | Meaning |
|---|---|
| Not detected | No agent installed or it is not running; or installed and started but not sending metrics |
| Ops Agent | You are running the Ops Agent; no green checkmark means an upgrade is available |
| Pending | Being installed or upgraded; more than 10 minutes may indicate a problem applying the Ops Agent OS policy or starting the agent |
| Agent installation failed | Installation failed |
| Not Collecting Telemetry | Installed but not yet sending telemetry; usually about 10 minutes for a new agent |
| Legacy Agent | The legacy Monitoring or Logging agent is running |
| Not applicable | VM is not a supported platform |
| VM Stopped | VM is not running, so the status is unknown |

## Notes

- The Linux and Windows install commands download and run a script as root / administrator. The source's `curl -sSO` form was changed to `curl -fsSO` with an inspect step; do the same for the Windows script. Delete the installation script after it runs successfully.
- Adapted from the official docs: the original `DefaultEnvironment=... "NO_PROXY=http://metadata.google.internal"  # Skip proxy for the local Metadata Server.` had the comment on the same line as the value.
- Corrected from the official docs: the Windows major-version pin example was `-Version 1.*.*`; the transition page (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/transition) states that the GA column refers to Ops Agent versions 2.0.0 and higher and Preview to versions less than 2.0.0, so the example pins `2.*.*` like the Linux example. The exact-version example `-Version 1.0.1` (also a Preview version) is replaced with the `MAJOR_VERSION.MINOR_VERSION.PATCH_VERSION` placeholder.
- Uninstalling removes the Ops Agent and its configuration files; back up `/etc/google-cloud-ops-agent/config.yaml` (Linux) or `C:\Program Files\Google\Cloud Operations\Ops Agent\config\config.yaml` (Windows) first. The Windows upgrade is remove plus install and removes the old config file when upgrading from a version earlier than 2.0.3 to 2.0.3 or later; the source's backup command is shown above.
- After uninstalling, the Google Cloud console can take up to one hour to report the change. If the OS was upgraded to a new major release, remove the agent and re-install it instead of upgrading.
- If the agent was installed during VM creation, see "Manage VMs covered by the Ops Agent OS policy" (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/manage-policies-auto-install). Agent policies for a whole fleet are in "Managing Agent Policies" (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/managing-agent-policies); VM Manager / OS policies are covered by `gcp-compute`.
- The VM Instances dashboard status can be inaccurate if the VM lacks access scopes or the service account lacks IAM roles; gcpdiag verifies both installation and telemetry transmission (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/troubleshoot-find-info#agent-status-gcpdiag-cmd).
- Proxy: the Linux `NO_PROXY` value and the Windows `no_proxy` value differ as written in the source. The proxy URLs are plain `http://`; do not embed proxy credentials in `system.conf` or `setx` commands (they land in the file system and shell history).
- VMs without remote package access: installation needs access to remote package repositories for the agent and, on Linux, its dependencies. With VPC Service Controls or a private network, agent packages are reachable via Private Google Access, but dependencies from upstream repositories may not be. If the security policy denies repository access, create a custom VM image with the agent pre-installed and package management disabled.
- The source also shows Console install steps (Install/Update Ops Agent from Cloud Monitoring and Compute Engine pages; Cloud Shell commands when OS policies are not supported) and installation during VM creation.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/installation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ops-agent.md](./ops-agent.md)
- [configuration.md](./configuration.md)
- [transition.md](./transition.md)
