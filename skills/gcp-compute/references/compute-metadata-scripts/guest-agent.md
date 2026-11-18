---
source: https://docs.cloud.google.com/compute/docs/images/guest-agent
---

# Guest agent

The guest agent is the central component of the guest environment. It sets up services and minimum configurations for features such as snapshot script execution, Windows failover, OS Login and metadata-based SSH authentication. Starting with version `20250901.00` it is a plugin-based system (guest agent manager, core plugin, optional extensions) instead of a single monolithic process.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux. Check the output of the startup-script unit named in the services table below:

```bash
sudo journalctl -u google-startup-scripts.service
```

## Options / Props

### Daemon services

| Component | Linux service | Windows service | Status |
|---|---|---|---|
| Guest agent manager | `google-guest-agent-manager.service` | `GCEAgentManager` | Enabled in all modes, including backward compatibility |
| Guest agent | `google-guest-agent.service` | `GCEAgent` | Disabled by default; enabled only in backward compatibility mode |
| Guest agent compatibility manager | `google-guest-compat-manager.service` | `GCEWindowsCompatManager` | Enabled in all modes |
| Workload certificate refresher | `gce-workload-cert-refresh.timer` | N/A | Disabled by default; backward compatibility mode only |
| Startup scripts | `google-startup-scripts.service` | `GCEStartup` | Linux: enabled in all modes. Windows: a scheduled task with a boot trigger, not a daemon |
| Shutdown scripts | `google-shutdown-scripts.service` | `Shutdown` | Linux: enabled in all modes. Windows: a group policy script execution, not a daemon |

### Binaries, plugin-based agent

| Component | Linux | Windows |
|---|---|---|
| Guest agent manager | `/usr/bin/google_guest_agent_manager` | `C:\ProgramData\Google\Compute Engine\agent\GCEWindowsAgentManager.exe` |
| Core plugin | `/usr/lib/google/guest_agent/core_plugin` | `C:\Program Files\Google\Compute Engine\agent\CorePlugin.exe` |
| Metadata script runner | `/usr/bin/gce_metadata_script_runner` | `C:\Program Files\Google\Compute Engine\agent\GCEMetadataScriptRunner.exe` |

### Binaries, monolithic agent

| Component | Linux | Windows |
|---|---|---|
| Guest agent | `/usr/bin/google_guest_agent` | `C:\Program Files\Google\Compute Engine\agent\GCEWindowsAgent.exe` |
| Metadata script runner | `/usr/bin/google_metadata_script_runner` | `C:\Program Files\Google\Compute Engine\metadata_scripts\GCEMetadataScripts.exe` |
| Authorized keys | Not applicable | `C:\Program Files\Google\Compute Engine\agent\GCEAuthorizedKeys.exe` |

### Backward compatibility components

| Component | Linux | Windows |
|---|---|---|
| Guest agent compatibility manager | `/usr/bin/google_guest_compat_manager` | `C:\Program Files\Google\Compute Engine\agent\GCEWindowsCompatManager.exe` |
| Metadata script runner compatibility manager | `/usr/bin/metadata_script_runner_compat` | `C:\Program Files\Google\Compute Engine\metadata_scripts\GCECompatMetadataScripts.exe` |
| Authorized keys compatibility manager | Not applicable | `C:\Program Files\Google\Compute Engine\agent\GCEWindowsAuthorizedKeysCompat.exe` |

### API endpoints the agent must reach (if you have specific firewall rules or use VPC Service Controls)

| Endpoint | Use |
|---|---|
| `metadata.google.internal` | Instance and project metadata (SSH keys, network configuration) |
| `storage.googleapis.com` | Metadata scripts whose URL points to a Cloud Storage bucket |
| `*.agentcommunication.googleapis.com` | Agent Communication Service: extension lifecycle and metrics for VM Extension Manager |
| `logging.googleapis.com` | Cloud Logging, enabled by default for the agent's logs |

## Notes

- Plugin-based design: a core plugin (network configuration, SSH access, metadata access; cannot be disabled) plus optional extensions (Ops Agent, Agent for Compute Workloads, Agent for SAP) managed by the guest agent manager and the VM Extension Manager backend service. Benefits: plugin isolation, resource limits, automatic crash recovery, selective enablement.
- Ubuntu and SLES still use the monolithic agent: only `google-guest-agent.service` is installed and running; `google-guest-agent-manager.service` and `google-guest-compat-manager.service` are not installed.
- Backward compatibility mode is activated only by manually setting the metadata attribute `enable-guest-agent-core-plugin` to `false`.
- Important: the guest agent service and the core plugin are mutually exclusive. Do not manually start the disabled `google-guest-agent.service`; running both causes conflicts. The compatibility manager enables it only when needed.
- Version note: agents earlier than `20250901.00` are monolithic and long poll the metadata server; shared state across SSH and network tasks.
- Distance: OS Login behavior of the agent is on Compute Engine VMs; IAM concepts in general are in `gcp-foundation`. Firewall rules and VPC Service Controls themselves are in `gcp-networking` / `gcp-security`.
- Source inconsistency: this page lists `/usr/bin/google_metadata_script_runner` only under the monolithic agent and `/usr/bin/gce_metadata_script_runner` for the plugin-based agent ("starting with version `20250901.00`"), while linux.md reruns startup scripts with `sudo google_metadata_script_runner startup` without naming the agent architecture; that command matches the monolithic agent, which Ubuntu and SLES still use.
- Source (Linux startup scripts): https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/images/guest-agent (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux

## Related

- [guest-environment.md](./guest-environment.md)
- [linux.md](./linux.md)
- [shutdownscript.md](./shutdownscript.md)
- [overview.md](./overview.md)
