---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies
---

# Use agent policies (GA) to manage the Ops Agent

GA agent policies install or remove the Ops Agent on Compute Engine VMs matched by a YAML `instanceFilter` in one zone. They are created with the `gcloud compute instances ops-agents policies` group (or the `ops-agent-policy` Terraform module) and implemented as OS policy assignments of VM Manager (see `gcp-compute`; the general group is `gcloud compute os-config os-policy-assignments`). They can't be applied to the legacy Monitoring or Logging agents.

## Signature / Usage

### Find OS short name and version values

Requires the OS Config agent on the VM.

```text
gcloud compute instances os-inventory describe INSTANCE_NAME \
--zone ZONE | grep "^ShortName: "

gcloud compute instances os-inventory describe INSTANCE_NAME \
--zone ZONE | grep "^Version: "
```

### Create an agent policy

```text
gcloud compute instances ops-agents policies create POLICY_ID \
  --zone ZONE \
  --file path/to/policy-description-file.yaml \
  --project PROJECT_ID
```

`POLICY_ID` is a name for the policy; `ZONE` is the only zone the policy applies to (create one policy per zone). Other group commands (`describe`, `list`, `update`, `delete`) take `--zone` too.

### `agentsRule` structure

```text
agentsRule:
  packageState: installed|removed
  version: latest|2.*.*|2.x.y
```

### `instanceFilter` structure

All VMs in the zone (no other criteria allowed with `all: True`):

```yaml
instanceFilter:
  all: True
```

Labels and operating system (labels in separate `labels:` entries are ORed; key-value pairs inside one entry are ANDed):

```yaml
instanceFilter:
  inclusionLabels:
  - labels:
      env: prod
  exclusionLabels:
  - labels:
      app: web
  inventories:
  - osShortName: rhel
    osVersion: '7.*'
  - osShortName: debian
    osVersion: '11'
```

### Example policy-description files

Install the latest Ops Agent on all VMs in the zone:

```yaml
agentsRule:
  packageState: installed
  version: latest
instanceFilter:
  all: True
```

Remove from all VMs:

```yaml
agentsRule:
  packageState: removed
  version: latest
instanceFilter:
  all: True
```

Install on VMs labelled `env=prod` OR `app=web`:

```yaml
agentsRule:
  packageState: installed
  version: latest
instanceFilter:
  inclusionLabels:
  - labels:
      env: prod
  - labels:
      app: web
```

Install on Debian 11 VMs except those labelled `env=prod` AND `app=web6`:

```yaml
agentsRule:
  packageState: installed
  version: latest
instanceFilter:
  exclusionLabels:
  - labels:
      env: prod
      app: web6
  inventories:
  - osShortName: debian
    osVersion: '11'
```

Install major version 2 on Debian 11 or RHEL 7.* VMs:

```yaml
agentsRule:
  packageState: installed
  version: 2.*.*
instanceFilter:
  inventories:
  - osShortName: rhel
    osVersion: '7.*'
  - osShortName: debian
    osVersion: '11'
```

### Prepare the project (`prepare-for-ops-agents-policies.sh`)

Download the script from https://docs.cloud.google.com/static/stackdriver/docs/prepare-for-ops-agents-policies.sh and inspect it before running (run it on Linux or from Cloud Shell). Enable the APIs, grant roles to the default service account and enable OS Config metadata:

```text
bash prepare-for-ops-agents-policies.sh --project=PROJECT_ID
```

Grant an OS Config role to a user who is not a project Owner (`[admin|editor|viewer]` is a choice of one value):

```text
bash prepare-for-ops-agents-policies.sh --project=PROJECT_ID \
  --iam-user=USER_EMAIL \
  --iam-policy-access=[admin|editor|viewer]
```

Grant an OS Config role to a non-default service account:

```text
bash prepare-for-ops-agents-policies.sh --project=PROJECT_ID \
  --iam-service-account=SERVICE_ACCT_EMAIL \
  --iam-policy-access=[admin|editor|viewer]
```

### Verify OS Config

Check that the OS Config API is enabled (expected output `osconfig.googleapis.com    Cloud OS Config API`):

```bash
gcloud services list --project PROJECT_ID | grep osconfig.googleapis.com
```

Check the OS Config agent on Linux (sample output shows `Active: active (running)`):

```text
gcloud compute ssh instance-id \
    --project project-id \
    -- sudo systemctl status google-osconfig-agent
```

On Windows (PowerShell, no administrator rights needed; expected `Running ... Google OSConfig Agent`):

```powershell
Get-Service google_osconfig_agent
```

Check project metadata (expected `enable-guest-attributes: 'TRUE'` and `enable-osconfig: 'TRUE'`):

```bash
gcloud compute project-info describe \
    --project PROJECT_ID \
    | grep "enable-osconfig\|enable-guest-attributes" -A 1
```

### View OS Config agent logs

Logs Explorer filter:

```text
resource.type="gce_instance"
logId(OSConfigAgent)
```

CentOS, RHEL, SLES, SUSE:

```bash
gcloud compute ssh INSTANCE_ID \
    --project PROJECT_ID \
    -- sudo cat /var/log/messages \
       | grep "OSConfigAgent\|google-fluentd\|stackdriver-agent"
```

Debian, Ubuntu:

```bash
gcloud compute ssh INSTANCE_ID \
    --project PROJECT_ID \
    -- sudo cat /var/log/syslog \
       | grep "OSConfigAgent\|google-fluentd\|stackdriver-agent"
```

On Windows, open Event Viewer, **Windows Logs** > **Application**, and search for `Source` equal to `OSConfigAgent`.

### Enable debug-level OS Config agent logs

Whole project:

```bash
gcloud compute project-info add-metadata \
    --project PROJECT_ID \
    --metadata osconfig-log-level=debug
```

One VM:

```bash
gcloud compute instances add-metadata INSTANCE_ID \
    --project PROJECT_ID \
    --metadata osconfig-log-level=debug
```

### Collect diagnostics (`diagnose_policies.sh`)

Download from https://docs.cloud.google.com/static/stackdriver/docs/diagnose_policies.sh and inspect before running. Adapted (not in the official docs): removed the space after the first `\` (it broke the line continuation).

```bash
bash diagnose_policies.sh --project-id=PROJECT_ID \
  --gce-instance-id=INSTANCE_ID \
  --policy-id=POLICY_ID \
  --zone=ZONE
```

It collects the OS Config agent version, the underlying OS policy assignment, the OS policy assignments that apply to the instance, and the instance description.

## Options / Props

### `agentsRule` fields

| Field | Values | Description |
|-------|--------|-------------|
| `packageState` | `installed`, `removed` | Intended state of the Ops Agent |
| `version` | `latest`, `2.*.*`, `2.x.y` | `latest` = most recent version; `2.*.*` = most recent release of major version 2; `2.x.y` = a specific release of major version 2 |

### `instanceFilter` fields

| Field | Description |
|-------|-------------|
| `all: True` | All VMs in the zone; no other criteria allowed |
| `inclusionLabels` / `exclusionLabels` | Labels on the VM for inclusion or exclusion |
| `inventories` | Operating system (`osShortName`, `osVersion`) |

### Required roles

| Role | Description |
|------|-------------|
| `roles/osconfig.osPolicyAssignmentAdmin` | Full access to OS policy assignments |
| `roles/osconfig.osPolicyAssignmentEditor` | Get, update, and list OS policy assignments |
| `roles/osconfig.osPolicyAssignmentViewer` | Read-only access to get and list OS policy assignments |

### Script actions (`prepare-for-ops-agents-policies.sh`)

| Action | Details |
|--------|---------|
| Enable APIs | Cloud Logging API, Cloud Monitoring API and OS Config API; OS Config is enabled in limited-feature mode if not already enabled |
| Grant roles | `roles/logging.logWriter` and `roles/monitoring.metricWriter` to the Compute Engine default service account |
| Metadata | Enables OS Config metadata for the project |
| OS Config role | Optional, to a user (`--iam-user`) or a non-default service account (`--iam-service-account`) |

### Policy state in the Compute Engine OS policies page

| Indicator | Meaning |
|-----------|---------|
| State: Compliant | Policy successfully installed |
| State: Pending | In progress |
| State: Unknown | Possibly failed |
| State: No policies | Missing |
| VM monitored: Monitored / Not monitored | Whether the Ops Agent is managed by OS Config (Compliant but Not monitored can mean a legacy agent is already installed) |

## Notes

- Required roles: Project owners have full access; all other users or service accounts need one of these roles. The script maps `admin`, `editor`, `viewer` to these role names.
- The policy takes effect asynchronously; the gcloud 593.0.0 help says VMs can take 10-15 minutes to enforce a new policy, and that deleting a policy does not remove agents (to remove them, update the policy to `packageState: removed`, wait, then delete the policy).
- Policy `POLICY_ID` limits (gcloud 593.0.0 help): lowercase letters, numbers and hyphens, end with a letter or number, 1-63 characters, unique within the project. There are no DEPRECATED markers on these commands in the help.
- Remove-from-all-VMs and `packageState: removed` stop telemetry collection for every VM the filter matches in the zone; try it on a disposable project or a labelled subset first.
- Before creating an Ops Agent policy, uninstall the legacy Logging and Monitoring agents from the VMs: running the Ops Agent and the legacy agents on the same VM can cause duplicate logs or a conflict in metrics ingestion. The legacy agents are legacy components; this page does not manage them.
- Verify the OS Config agent on VMs that predate OS Config (VM Manager verification checklist, see `gcp-compute`). It may be missing on operating systems VM Manager does not support.
- Policies labelled `goog-ops-agent-policy` on the OS policies page include policies from `gcloud ... ops-agents policies`, policies created when requesting Ops Agent installation at VM creation, and Terraform-managed ones; use the **OS policy assignments** tab to see policy IDs. The **VM monitored** column does not reflect manual installs or beta agent policies. The Cloud Monitoring **VM Instances** page shows an **Agent** column and flags Ops Agent versions older than the latest.
- Errors: `ALREADY_EXISTS: Requested entity already exists` (the source says same name, project ID and region; GA policies are zonal, so check `describe` in the zone) and `NOT_FOUND: Requested entity was not found` (never created, deleted, or wrong `POLICY_ID`; use `list`). If the OS Config API is not enabled, gcloud prompts `API [osconfig.googleapis.com] not enabled on project PROJECT_ID`; enter `y` or run the script (the script is still needed for permissions). Permission errors: run the script to set the OS Config policy roles.
- The script grants roles to the Compute Engine default service account at project level and sets project-wide metadata; read the script before running and prefer a dedicated service account with least-privilege roles for the Ops Agent (see the authorization page). Do not log credentials when collecting diagnostics.
- Pricing: the group uses OS policy assignments; the script sets VM Manager to limited-feature mode (`OSCONFIG_B`), which has no cost; full-feature mode (`OSCONFIG_C`) might incur costs.
- The twin also describes Terraform (`ops-agent-policy` module in `terraform-google-cloud-operations`; examples `ops_agent_policy_install_all`, `ops_agent_policy_install_all_in_region`, `ops_agent_policy_install_all_in_zone`) and Console pages; Terraform is omitted here.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/agent-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the `inventories` examples target `rhel` `7.*` and `debian` `11`, which are not in the Ops Agent supported operating systems list (https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent, retrieved 2026-11-18: RHEL 8 / 9 / 10, Debian 12 / 13 among others). The examples show the filter syntax only; pick `osShortName` / `osVersion` values from that list.

## Related

- [agent-policies-overview.md](./agent-policies-overview.md)
- [troubleshoot-install-startup.md](./troubleshoot-install-startup.md)
- [authorization.md](./authorization.md)
