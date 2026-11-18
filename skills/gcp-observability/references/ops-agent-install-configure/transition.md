---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/transition
---

# Migrating to the Ops Agent

Migration steps for Ops Agent Preview users moving to the GA version, and for users of the legacy Logging and Monitoring agents moving to the Ops Agent. The GA column refers to Ops Agent versions 2.0.0 and higher; Preview refers to versions less than 2.0.0.

## Signature / Usage

### Keep the default pipeline disabled after upgrading from Preview

If you edited the agent's default configuration to remove the `default_pipeline`, add this snippet to the agent configuration to keep that pipeline disabled:

Adapted (not in the official docs): removed the two `exporters: []` lines, because the GA configuration reference defines only `receivers` and `processors` for a pipeline and disables a default pipeline with an empty `receivers` list.

```yaml
logging:
  service:
    pipelines:
      default_pipeline:
        receivers: []
metrics:
  service:
    pipelines:
      default_pipeline:
        receivers: []
```

### Migrate from the legacy agents

1. Uninstall the legacy Logging and Monitoring agents. The Google Cloud console might take up to one hour to report this change.
2. Install the latest version of the Ops Agent on a single VM (see installation.md), or install and manage it on multiple VMs (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/install-index).
3. Configure the Ops Agent as needed (see configuration.md).

### Commands for managing the agent

```bash
sudo service google-cloud-ops-agent restart
```

## Options / Props

### Changed management commands (GA vs Preview)

| Procedure | GA version | Preview version |
|---|---|---|
| Starting the agent | `sudo service google-cloud-ops-agent start` | N/A |
| Stopping the agent | `sudo service google-cloud-ops-agent stop` | N/A |
| Restarting the agent | `sudo service google-cloud-ops-agent restart` | `sudo systemctl restart google-cloud-ops-agent.target` |
| Checking agent status | `sudo service google-cloud-ops-agent status` | `sudo systemctl status google-cloud-ops-agent.target` |

### Metric differences (omitting `agent.googleapis.com` from the metric type)

| Metric | Ops Agent (GA) | Ops Agent (Preview) | Legacy Monitoring agent |
|---|---|---|---|
| `cpu_state` | Windows values: `idle`, `interrupt`, `system`, `user` | Windows values: `idle`, `interrupt`, `system`, `user` | Windows values: `idle`, `used` |
| `disk/bytes_used` and `disk/percent_used` | Ingested with the full path in the `device` label (for example `/dev/sda15`); not ingested for virtual devices like `tmpfs` and `udev` | Ingested without `/dev` in the `device` label (for example `sda15`); ingested for virtual devices like `tmpfs` and `udev` | Ingested without `/dev` in the `device` label (for example `sda15`); ingested for virtual devices like `tmpfs` and `udev` |

## Notes

- Uninstall the legacy agents before installing the Ops Agent; running both can duplicate logs or conflict in metric ingestion (see installation.md). The legacy agents reached end of support; see legacy-agents.md.
- To install the latest version when upgrading from Preview, complete the "Upgrading the agent" procedures in installation.md.
- Corrected from the official docs: the Preview-migration snippet had `exporters: []` under both `default_pipeline` entries; the Ops Agent configuration reference (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration) lists only `receivers` and `processors` as pipeline elements, has no `exporters` key, and turns off built-in ingestion by redefining `default_pipeline` with `receivers: []`.
- The source's command table lists `service` commands for GA; installation.md shows `systemctl` forms for restart. Both are copied as the sources state them.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/transition (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [installation.md](./installation.md)
- [legacy-agents.md](./legacy-agents.md)
- [configuration.md](./configuration.md)
