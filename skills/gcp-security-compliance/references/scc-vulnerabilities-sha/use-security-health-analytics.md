---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-health-analytics
---

# Use Security Health Analytics

How to manage Security Health Analytics (SHA) findings in Security Command Center: enable or disable detectors, count findings by type, mute findings, use security marks, and allow the Security Command Center service agent through a VPC Service Controls perimeter. Applies to the Standard-legacy, Standard, Premium and Enterprise (Deprecated) tiers unless a section says otherwise; the Enterprise tier shuts down on May 21, 2027 (organizations then move to Premium). SHA must be enabled in the Security Command Center **Services** settings; AWS findings also need Security Command Center connected to AWS.

## Signature / Usage

### Enable or disable a detector (gcloud)

`gcloud scc manage services update` updates the state of a service or module. Save the module config in `request.json`, then run the command. The file maps module names to an enablement state (`ENABLED`, `DISABLED` or `INHERITED`; `INHERITED` is valid only for projects and folders).

```json
{
  "MODULE_NAME": {
    "intendedEnablementState": "NEW_STATE"
  }
}
```

```bash
gcloud scc manage services update security-health-analytics \
    --RESOURCE_TYPE=RESOURCE_ID \
    --module-config-file=request.json
```

Replace `RESOURCE_TYPE` with `organization`, `folder` or `project` (the flag becomes `--organization`, `--folder` or `--project`), and `RESOURCE_ID` with the numeric ID (projects can also use the alphanumeric ID). The response shows the service's `effectiveEnablementState` and `intendedEnablementState` and the `effectiveEnablementState` of each module.

### Enable or disable a detector (REST)

`RESOURCE_TYPE.locations.securityCenterServices.patch` in the Security Command Center Management API. `RESOURCE_TYPE` is `organizations`, `folders` or `projects`; `QUOTA_PROJECT` is the project used for billing and quota.

```text
PATCH https://securitycentermanagement.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/global/securityCenterServices/security-health-analytics?updateMask=modules
```

Save the request body (with the top-level `modules` field) in `rest-request.json`:

```json
{
  "modules": {
    "MODULE_NAME": {
      "intendedEnablementState": "NEW_STATE"
    }
  }
}
```

Adapted (not in the official docs): the REST body is read from `rest-request.json`, separate from the gcloud module config file `request.json`.

```bash
curl -X PATCH \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: QUOTA_PROJECT" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @rest-request.json \
     "https://securitycentermanagement.googleapis.com/v1/RESOURCE_TYPE/RESOURCE_ID/locations/global/securityCenterServices/security-health-analytics?updateMask=modules"
```

### Count active findings by finding type (gcloud)

Get the SHA source ID (organization-level or project-level activation), then group findings by category. `PAGE_SIZE` can be up to 1000.

Adapted (not in the official docs): the grouping commands below add `--filter='state="ACTIVE"'` so that only active findings are counted.

```bash
gcloud scc sources describe organizations/ORGANIZATION_ID \
    --source-display-name="Security Health Analytics"
```

```bash
gcloud scc sources describe projects/PROJECT_ID \
    --source-display-name="Security Health Analytics"
```

```bash
gcloud scc findings group organizations/ORGANIZATION_ID/sources/SOURCE_ID \
    --group-by=category --page-size=PAGE_SIZE \
    --filter='state="ACTIVE"'
```

Adapted (not in the official docs): the project-level form passes the project as the positional parent and the source ID in `--source`, because gcloud 593.0.0 does not recognize `projects/PROJECT_ID/sources/SOURCE_ID` as a source name when the project ID contains a hyphen.

```bash
gcloud scc findings group projects/PROJECT_ID \
    --source=SOURCE_ID \
    --group-by=category --page-size=PAGE_SIZE \
    --filter='state="ACTIVE"'
```

### Let SHA scan projects inside a VPC Service Controls perimeter

Premium and Enterprise (Deprecated) tiers with organization-level activation. If a service perimeter blocks projects and services, grant the Security Command Center service agent inbound and outbound access, otherwise SHA cannot produce findings for them. Find the perimeter from log entries with `RESOURCES_NOT_IN_SAME_SERVICE_PERIMETER` violations (`servicePerimeterName` field).

```bash
gcloud config set billing/quota_project QUOTA_PROJECT_ID
```

`egress-rule.yaml`:

```yaml
- egressFrom:
    identities:
    - serviceAccount:service-org-ORGANIZATION_ID@security-center-api.iam.gserviceaccount.com
  egressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: binaryauthorization.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: cloudkms.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: logging.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: monitoring.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: cloudresourcemanager.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: storage.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: compute.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: iam.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: container.googleapis.com
      methodSelectors:
      - method: '*'
    resources:
    - '*'
```

`ingress-rule.yaml`:

```yaml
- ingressFrom:
    identities:
    - serviceAccount:service-org-ORGANIZATION_ID@security-center-api.iam.gserviceaccount.com
    sources:
    - accessLevel: '*'
  ingressTo:
    operations:
    - serviceName: bigquery.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: binaryauthorization.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: cloudkms.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: logging.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: monitoring.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: cloudresourcemanager.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: storage.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: compute.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: iam.googleapis.com
      methodSelectors:
      - method: '*'
    - serviceName: container.googleapis.com
      methodSelectors:
      - method: '*'
    resources:
    - '*'
```

Apply the rules (replace `PERIMETER_NAME`, for example `accessPolicies/1234567890/servicePerimeters/example_perimeter`):

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
    --set-egress-policies=egress-rule.yaml
```

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME \
    --set-ingress-policies=ingress-rule.yaml
```

## Options / Props

### IAM roles (organization, folder or project)

| Task | Role |
|------|------|
| Enable and disable detectors | Security Center Settings Editor (`roles/securitycenter.settingsEditor`) |
| View and filter findings | Security Center Findings Viewer (`roles/securitycenter.findingsViewer`) |
| Manage mute rules | Security Center Mute Configurations Editor (`roles/securitycenter.muteConfigsEditor`) |
| Manage security marks | Security Center Finding Security Marks Writer (`roles/securitycenter.findingSecurityMarksWriter`) |
| Programmatically manage findings | Security Center Findings Editor (`roles/securitycenter.findingsEditor`) |
| Grant inbound access to a VPC Service Controls perimeter | Access Context Manager Editor (`roles/accesscontextmanager.policyEditor`) |
| All Security Command Center tasks on this page (not the VPC Service Controls perimeter update, which needs `roles/accesscontextmanager.policyEditor`) | Security Center Settings Admin (`roles/securitycenter.settingsAdmin`) |

### Placeholders

| Name | Description |
|------|-------------|
| `MODULE_NAME` | Module to enable or disable (see SHA built-in detectors). |
| `NEW_STATE` | `ENABLED`, `DISABLED`, or `INHERITED` (projects and folders only). |
| `ORGANIZATION_ID` | Organization ID; also used in the service agent `service-org-ORGANIZATION_ID@security-center-api.iam.gserviceaccount.com`. |

### Mute rule types

| Type | Behavior |
|------|----------|
| Static mute rule | Indefinitely mutes future findings. |
| Dynamic mute rule | Can temporarily mute current and future findings. |

## Notes

- Detectors disabled by default (Google Cloud): `ALLOYDB_AUTO_BACKUP_DISABLED`, `ALLOYDB_CMEK_DISABLED`, `BIGQUERY_TABLE_CMEK_DISABLED`, `BUCKET_CMEK_DISABLED`, `CLOUD_ASSET_API_DISABLED`, `DATAPROC_CMEK_DISABLED`, `DATASET_CMEK_DISABLED`, `DISK_CMEK_DISABLED`, `DISK_CSEK_DISABLED`, `NODEPOOL_BOOT_CMEK_DISABLED`, `PUBSUB_CMEK_DISABLED`, `SQL_CMEK_DISABLED`, `SQL_NO_ROOT_PASSWORD`, `SQL_WEAK_ROOT_PASSWORD`, `VPC_FLOW_LOGS_SETTINGS_NOT_RECOMMENDED`.
- Services SHA calls (allow them in VPC Service Controls perimeters as needed): BigQuery `bigquery.googleapis.com`, Binary Authorization `binaryauthorization.googleapis.com`, Cloud KMS `cloudkms.googleapis.com`, Cloud Logging `logging.googleapis.com`, Cloud Monitoring `monitoring.googleapis.com`, Cloud Resource Manager `cloudresourcemanager.googleapis.com`, Cloud Storage `storage.googleapis.com`, Compute Engine `compute.googleapis.com`, IAM `iam.googleapis.com`, Kubernetes Engine `container.googleapis.com`.
- Disabling detectors affects active findings: when a detector is disabled, existing findings are automatically marked inactive. If SHA or detectors are turned off for folders and projects under an organization-level activation, existing findings on assets in them are marked inactive. Disabling the whole SHA service stores the module states and re-enabling restores them.
- Disruptive: `--set-ingress-policies` and `--set-egress-policies` replace all existing ingress or egress policies in the perimeter. Retrieve the existing policies first, add the new rule to the YAML, then update. Try perimeter changes on a disposable perimeter or in VPC Service Controls dry-run mode first because a wrong perimeter change can block production traffic.
- Permissive: the ingress and egress rules above use `accessLevel: '*'`, `method: '*'` and `resources: - '*'`, which allow every method of the 10 listed services for the Security Command Center service agent. They are for the stated purpose only (letting SHA scan); the source's Terraform sample notes that least privilege (specific read methods such as `compute.v1.InstancesService.Get`) is recommended. Alternatively use `operations` to list only the services for which violations appear and `resources` for the project that appeared in the finding. The source also provides the same rules for the Console and Terraform; they are omitted here.
- A `VPC_SC_RESTRICTION` error finding ("VPC Service Controls Restriction") reports this misconfiguration.
- Mute findings: the source recommends dynamic mute rules exclusively and advises against using static and dynamic rules together. Muted findings are hidden but still logged for audit and compliance, and can be unmuted at any time. Mute rules are covered by the findings management references of this skill.
- Cases: on the Enterprise (Deprecated) tier, Security Command Center opens a case in the Security Operations console for threats, toxic combinations and related findings.
- Allowlists with security marks (`allow_FINDING_TYPE:true`, for example `allow_ssl_not_enforced:true`) are deprecated and unavailable for all users on or after April 15, 2025; until then only for instances activated before June 26, 2023. Use mute instead. Marks apply to assets (not findings), are only updated in batch scans, and removal can take up to 24 hours to produce a finding. Project and folder marks resolve only findings where that project or folder is the target resource (Premium, organization-level activation). A detector that supports several asset types needs the mark on each (for example `KMS_PUBLIC_KEY` on both `CryptoKey` and `KeyRing`).
- `DISK_CSEK_DISABLED` is off by default; to use it, set the security mark `enforce_customer_supplied_disk_encryption_keys` to `true` on the assets.
- Findings counts: the legacy **Vulnerabilities** page shows active findings by type in the console.
- The asset methods and fields of the Security Command Center API are deprecated and were to be removed on or after June 26, 2024; use the Cloud Asset Inventory API to export or list assets.
- Security: `curl` sends an access token over HTTPS; do not paste tokens into shared logs.
- Source inconsistency: the gcloud 593.0.0 help for `--module-config-file` documents module values as objects with an `"intended_enablement_state"` field (YAML or JSON); the source's `request.json` uses the REST field name `intendedEnablementState`, which is the field name of the `ModuleSettings` message that gcloud decodes the file into. The source's form is kept.
- Corrected from the official docs: the project-level command was `gcloud scc findings group projects/PROJECT_ID/sources/SOURCE_ID --group-by=category --page-size=PAGE_SIZE`; the help EXAMPLES use the parent as the positional argument (`projects/example-project`) and the source ID in `--source` (`--source=5678`). The organization-level form with a numeric organization ID is kept as written.
- The source also shows PowerShell / cmd.exe variants, an example command response, Console steps and Terraform; they are omitted.
- The `gcloud scc manage services update` help (gcloud 593.0.0) also lists the `--enablement-state` flag and `--validate-only`; at least one of `--enablement-state` or `--module-config-file` is required, and `--parent=organizations/ID` can replace the resource flags.
- Adapted from the official docs: without a filter, `gcloud scc findings group` counts findings in every state, including `INACTIVE`; `--filter='state="ACTIVE"'` (the `--filter` flag of the `gcloud scc findings group` help, gcloud 593.0.0) limits the counts to active findings.
- Adapted from the official docs: the source uses `request.json` for both the gcloud module config (module names at the top level) and the REST body (a top-level `modules` field). The REST example reads `rest-request.json` so that the gcloud file is not sent as the PATCH body.
- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-health-analytics (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [security-health-analytics-overview.md](./security-health-analytics-overview.md)
- [custom-modules-sha-overview.md](./custom-modules-sha-overview.md)
