---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies-overview
---

# Overview of agent policies for the Ops Agent

Agent policies automate installation and maintenance of the Ops Agent across Compute Engine VMs that match user-specified criteria. They come in two release levels, GA and beta, both built on OS Config features of VM Manager (VM Manager itself is covered by `gcp-compute`). GA policies are recommended; most beta policies can be converted to GA policies.

## Signature / Usage

### GA policy creation (YAML file and zone)

Adapted (not in the official docs): removed the backticks around the command words (they are command substitution in bash).

```bash
gcloud compute instances ops-agents policies create test-policy \
  --zone us-central1-a \
  --file test-policy.yaml \
  --project PROJECT_ID
```

### Convert beta policies to GA policies

List all beta agent policies in the project. Adapted (not in the official docs): removed the backticks around the command words.

```bash
gcloud beta compute instances ops-agents policies list --project PROJECT_ID
```

Create a GA agent policy in each zone where you need it (see the GA page for the command), then delete the beta policy. Adapted (not in the official docs): removed the backticks around the command words.

```bash
gcloud beta compute instances ops-agents policies delete POLICY_ID --project PROJECT_ID
```

### Convert a beta named-instance policy to a label-based GA policy

Label the instances:

```bash
gcloud compute instances add-labels INSTANCE_NAME --labels=KEY=VALUE
```

Adapted (not in the official docs): indented `KEY: VALUE` under `labels:` so the label is a child of `labels` (as in the GA agent-policies page).

```bash
cat > config.yaml << EOF
agentsRule:
  packageState: installed
  version: 2.47.0
instanceFilter:
  inclusionLabels:
  - labels:
      KEY: VALUE
EOF
```

Create the GA policy in each zone that has VMs with the label. Adapted (not in the official docs): removed the backticks around the command words and added the missing `\` after `--file config.yaml`.

```bash
gcloud compute instances ops-agents policies create POLICY_ID \
  --zone ZONE \
  --file config.yaml \
  --project PROJECT_ID
```

### Replace beta agent-upgrade policies (one-time upgrade)

Create or modify a GA policy that pins the latest version (here 2.70.0, as the source's example):

```text
agentsRule:
  packageState: installed
  version: 2.70.0
instanceFilter:
[...]
```

## Options / Props

### Differences between beta and GA agent policies

| Aspect | Beta | GA |
|--------|------|----|
| Creation mechanism | `gcloud beta compute instances ops-agents policies`; `agent-policy` Terraform module | `gcloud compute instances ops-agents policies`; `ops-agent-policy` Terraform module |
| Legacy Monitoring / Logging agents | Can manage them as well as the Ops Agent | Manage only the Ops Agent |
| Automatic agent upgrade | Supported | Not supported (use OS Patch or a one-time version pin) |
| Named Compute Engine instances | Supported (list of named instances) | Not supported (use labels via `instanceFilter`) |
| Scope within the project | Global: all instances selected by the criteria in the project | Zonal: only instances in the zone the policy specifies (a policy in `us-central1-a` has no effect on VMs in other zones) |
| Policy description | Individual command options (`--agent-rules`, `--os-types`, `--instances`, ...) | YAML configuration file (`--file`) plus `--zone` |

### Supported operating systems

| Operating system | Ops Agent (GA and beta) | Logging agent (beta only) | Monitoring agent (beta only) |
|------------------|-----|-----|-----|
| CentOS 8 | Yes | Yes | Yes |
| Rocky Linux 8 | Yes | Yes | Yes |
| RHEL 6 | | Yes | |
| RHEL 7: rhel-7, rhel-7-6-sap-ha, rhel-7-7-sap-ha, rhel-7-9-sap-ha | Yes | Yes | Yes (see note) |
| RHEL 8: rhel-8, rhel-8-4-sap-ha, rhel-8-6-sap-ha, rhel-8-8-sap-ha | Yes | Yes | Yes (see note) |
| Debian 9 (Stretch) | Yes | Yes | Yes |
| Debian 11 (Bullseye) | Yes | | |
| Deep Learning VM Images based on Debian 11 (Bullseye) | Yes | | |
| Ubuntu LTS 18.04 (Bionic Beaver): ubuntu-1804-lts, ubuntu-minimal-1804-lts | Yes | Yes | Yes |
| Ubuntu LTS 20.04 (Focal Fossa): ubuntu-2004-lts, ubuntu-minimal-2004-lts | Yes | Yes | Yes |
| Ubuntu LTS 22.04 (Jammy Jellyfish): ubuntu-2204-lts, ubuntu-minimal-2204-lts | Yes | Yes | Yes |
| SLES 12: sles-12, sles-12-sp5-sap | Yes | Yes | Yes |
| SLES 15: sles-15, sles-15-sp2-sap, sles-15-sp3-sap, sles-15-sp4-sap, sles-15-sp5-sap, sles-15-sp6-sap | Yes | Yes | Yes |
| OpenSUSE Leap 15: opensuse-leap (opensuse-leap-15-3-\*, opensuse-leap-15-4-\*) | Yes | Yes | Yes |
| Windows Server: 2016, 2019, 2022, Core 2016, Core 2019, Core 2022 | Yes | | |

## Notes

- Supported operating systems: "Yes" means supported; beta columns apply to beta policies only. Ops Agent supports GA and beta policies.
- In beta policies the agent columns map to the `--agent-rules` agent type: Ops Agent = `ops-agent`, Logging agent = `logging`, Monitoring agent = `metrics`.
- The Monitoring agent is not supported on `rhel-7-9-sap-ha`, `rhel-8-2-sap-ha`, or `rhel-8-4-sap-ha`.
- The legacy Monitoring and Logging agents are legacy components; this page records only that beta policies can still manage them. The source's beta `create` example installs them and is omitted here. You can't convert beta policies for the legacy agents to GA policies.
- Beta and GA policies can both apply to the same VM; make sure their purposes do not conflict (for example a beta policy that installs the Ops Agent and a GA policy that uninstalls it). If the two types select different VMs, they can't conflict.
- To keep the agent current without beta auto-upgrade, use OS Patch (a VM Manager feature, see `gcp-compute`) to run a patch job. Find versions in the Ops Agent GitHub release notes (https://github.com/GoogleCloudPlatform/ops-agent/releases).
- Adapted from the official docs: the original `config.yaml` heredoc wrote `KEY: VALUE` at the same indent as `labels:`; the original GA `create` example lacked a `\` after `--file config.yaml`; command words were wrapped in backticks. All are corrected above.
- The beta `list` and `delete` commands take no `--zone`; the GA `describe` / `list` / `update` / `delete` commands require `--zone` (gcloud 593.0.0 help). No DEPRECATED markers appear in the gcloud 593.0.0 help for these command groups.
- Deleting a beta policy removes the management of the agents on the matching VMs (the agents themselves stay installed); try it on a disposable project first.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the Ubuntu 22.04 row reads `buntu-2204-lts`; the image family is `ubuntu-2204-lts`, as in the Ops Agent supported operating systems list (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent).
- Source inconsistency: this table marks the Ops Agent as supported on CentOS 8, RHEL 7, Debian 9, Debian 11, Ubuntu 18.04 / 20.04, OpenSUSE Leap 15 and `rhel-8-4-sap-ha`, but the Ops Agent supported operating systems list (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent, retrieved 2026-11-18) lists none of them (its Linux list is Rocky Linux 8 / 9 / 10, RHEL 8 / 9 / 10, CentOS Stream 10, Debian 12 / 13, Ubuntu 22.04 / 24.04 / 26.04, SLES 12 / 15). Check that list before targeting an operating system with a policy.

## Related

- [agent-policies.md](./agent-policies.md)
- Beta policies: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/managing-agent-policies
