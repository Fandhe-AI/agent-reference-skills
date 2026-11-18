---
source: https://docs.cloud.google.com/logging/docs/audit/configure-data-access
---

# Enable Data Access audit logs

Data Access audit logs are disabled by default for most services (except some BigQuery services) and are enabled, configured, or disabled per project, folder, organization, or billing account in the IAM `auditConfigs` section of the resource's IAM policy (console: IAM & Admin > Audit Logs). Changing it through the API is a read-modify-write of that policy: read with `getIamPolicy`, edit only `auditConfigs`, write with `setIamPolicy`, and keep `etag`.

## Signature / Usage

### AuditConfig object

Each `AuditConfig` configures one service, or all services with the special value `allServices`.

```text
{
  "service": SERVICE_NAME,
  "auditLogConfigs": [
    {
      "logType": "ADMIN_READ",
      "exemptedMembers": [ PRINCIPAL,]
    },
    {
      "logType": "DATA_READ",
      "exemptedMembers": [ PRINCIPAL,]
    },
    {
      "logType": "DATA_WRITE",
      "exemptedMembers": [ PRINCIPAL,]
    },
  ]
},
```

### Example configuration

Enables all three Data Access log types for all services, and `ADMIN_READ` exempting a service account for Cloud SQL. The YAML form is the default in the Google Cloud CLI.

Adapted (not in the official docs): the exempted service account is written with the `serviceAccount:` prefix that `exemptedMembers` requires.

```yaml
auditConfigs:
- auditLogConfigs:
  - logType: ADMIN_READ
  - logType: DATA_WRITE
  - logType: DATA_READ
  service: allServices
- auditLogConfigs:
  - exemptedMembers:
    - serviceAccount:499862534253-compute@developer.gserviceaccount.com
    logType: ADMIN_READ
  service: cloudsql.googleapis.com
```

Adapted (not in the official docs): wrapped the source's `"auditConfigs": [...],` fragment in an object and removed the trailing comma so the JSON is valid, and added the `serviceAccount:` prefix to the exempted member.

```json
{
  "auditConfigs": [
    {
      "auditLogConfigs": [
        {
          "logType": "ADMIN_READ"
        },
        {
          "logType": "DATA_WRITE"
        },
        {
          "logType": "DATA_READ"
        }
      ],
      "service": "allServices"
    },
    {
      "auditLogConfigs": [
        {
          "exemptedMembers": [
            "serviceAccount:499862534253-compute@developer.gserviceaccount.com"
          ],
          "logType": "ADMIN_READ"
        }
      ],
      "service": "cloudsql.googleapis.com"
    }
  ]
}
```

### Enable all Data Access audit logs

Enables Data Access audit logs for all services and principals:

```yaml
auditConfigs:
- auditLogConfigs:
  - logType: ADMIN_READ
  - logType: DATA_WRITE
  - logType: DATA_READ
  service: allServices
```

Adapted (not in the official docs): wrapped the fragment in an object and removed the trailing commas so the JSON is valid.

```json
{
  "auditConfigs": [
    {
      "service": "allServices",
      "auditLogConfigs": [
        { "logType": "ADMIN_READ" },
        { "logType": "DATA_READ" },
        { "logType": "DATA_WRITE" }
      ]
    }
  ]
}
```

### Enable one service and log type

Enables `DATA_WRITE` Data Access audit logs for Cloud SQL:

```yaml
auditConfigs:
- auditLogConfigs:
  - logType: DATA_WRITE
  service: cloudsql.googleapis.com
```

Adapted (not in the official docs): wrapped the fragment in an object and removed the trailing commas so the JSON is valid.

```json
{
  "auditConfigs": [
    {
      "service": "cloudsql.googleapis.com",
      "auditLogConfigs": [
        { "logType": "DATA_WRITE" }
      ]
    }
  ]
}
```

### Disable all Data Access audit logs

To disable all Data Access audit logs (except some BigQuery logs) in a project, include an empty `auditConfigs:` section in the new IAM policy:

```yaml
auditConfigs:
```

Adapted (not in the official docs): wrapped the fragment `"auditConfigs": [],` in an object so the JSON is valid.

```json
{
  "auditConfigs": []
}
```

If you remove the `auditConfigs` section entirely from the new policy, `setIamPolicy` doesn't change the existing configuration (see the update mask below). BigQuery Data Access audit logs can't be disabled.

### Read-modify-write with gcloud

1. Read the project's IAM policy and store it in a file:

```bash
gcloud projects get-iam-policy PROJECT_ID > /tmp/policy.yaml
```

Returned policy (no `auditConfigs` section):

```yaml
bindings:
- members:
  - user:colleague@example.com
  role: roles/editor
- members:
  - user:myself@example.com
  role: roles/owner
etag: BwVM-FDzeYM=
version: 1
```

2. Edit `/tmp/policy.yaml`, adding or changing only the Data Access audit logs configuration, and preserve the `bindings:` and `etag:` sections without changes. Edited policy enabling Cloud SQL data-write Data Access audit logs:

```yaml
auditConfigs:
- auditLogConfigs:
  - logType: DATA_WRITE
  service: cloudsql.googleapis.com
bindings:
- members:
  - user:colleague@example.com
  role: roles/editor
- members:
  - user:myself@example.com
  role: roles/owner
etag: BwVM-FDzeYM=
version: 1
```

3. Write the new IAM policy. If the command reports a conflict with another change, repeat from step 1.

```bash
gcloud projects set-iam-policy PROJECT_ID /tmp/policy.yaml
```

JSON format instead of YAML:

```bash
gcloud projects get-iam-policy PROJECT_ID --format=json >/tmp/policy.json
gcloud projects set-iam-policy PROJECT_ID /tmp/policy.json
```

For organization-level configuration, replace the "projects" version of the commands and API methods with the "organizations" version.

### Read-modify-write with the Cloud Resource Manager API

1. Read the policy with `projects.getIamPolicy` (resource `projects/PROJECT_ID`, empty request body). Returned policy (no `auditConfigs` section):

```json
{
  "version": 1,
  "etag": "BwXqwxkr40M=",
  "bindings": [
    {
      "role": "roles/owner",
      "members": [
        "user:myself@example.com"
      ]
    }
  ]
}
```

2. Edit the policy: change or add `auditConfigs` (to disable, use an empty value `auditConfigs:[]`) and preserve `etag`. Other fields may be removed only if `updateMask` is set as shown. The edited request enabling Cloud SQL `DATA_WRITE`:

```json
{
  "policy": {
    "auditConfigs": [
      {
        "auditLogConfigs": [
          {
            "logType": "DATA_WRITE"
          }
        ],
        "service": "cloudsql.googleapis.com"
      }
    ],
    "etag": "BwXqwxkr40M="
  },
  "updateMask": "auditConfigs,etag"
}
```

3. Write it with `projects.setIamPolicy` (resource `projects/PROJECT_ID`, request body = the edited policy above).

## Options / Props

### Data Access and Admin Activity permission types

| `logType` | Type | Checked for API methods that | Default |
|-----------|------|------------------------------|---------|
| `ADMIN_READ` | Data Access | Read metadata or configuration information | Typically disabled; must be enabled |
| `DATA_READ` | Data Access | Read user-provided data | Typically disabled; must be enabled |
| `DATA_WRITE` | Data Access | Write user-provided data | Typically disabled; must be enabled |
| `ADMIN_WRITE` | Admin Activity | Write metadata or configuration information | On by default, can't be disabled (Admin Activity audit logs) |

### Where to configure

| Scope | Behavior |
|-------|----------|
| Organization | Applies to all existing and new projects and folders in the organization |
| Folder | Applies to all existing and new projects in the folder; can't disable a log enabled in the parent organization |
| Project | Can't disable a log enabled in a parent organization or folder |
| Billing account | Configure with the Google Cloud CLI (`gcloud beta billing accounts set-iam-policy`) |
| Default configuration | In an organization, folder, or project; applies to future services that begin producing Data Access audit logs. A new service inherits it |

### Merge rules

| You can | You can't |
|---------|-----------|
| Enable logs for a specific service | Disable a service that's enabled in the broader configuration or in a parent organization or folder |
| Add kinds of information to a service's log | Remove kinds that the broader or parent configuration specifies |
| Add principals to exemption lists | Remove principals from the broader or parent exemption lists |
| Enable Data Access logs for a child project from the parent organization or folder even if the project isn't configured | |

### `AuditConfig` fields

| Field | Description |
|-------|-------------|
| `service` | Service name such as `"appengine.googleapis.com"`, or the special value `"allServices"`. A service without its own configuration uses the broader one; with no configuration, Data Access audit logs aren't enabled for it |
| `auditLogConfigs` | List of 0 to 3 objects, one per kind (`ADMIN_READ`, `DATA_READ`, `DATA_WRITE`). A kind omitted from the list isn't enabled for the service |
| `auditLogConfigs[].logType` | `ADMIN_READ`, `DATA_READ`, or `DATA_WRITE` |
| `auditLogConfigs[].exemptedMembers` | Principals for whom Data Access audit logs aren't collected; not all `Binding` member kinds are valid |

### IAM methods to read and write the policy

| Interface | Commands |
|-----------|----------|
| Cloud Resource Manager API | `projects.getIamPolicy`, `projects.setIamPolicy`, `organizations.getIamPolicy`, `organizations.setIamPolicy` |
| gcloud (project) | `gcloud projects get-iam-policy`, `gcloud projects set-iam-policy` |
| gcloud (folder) | `gcloud resource-manager folders get-iam-policy`, `gcloud resource-manager folders set-iam-policy` |
| gcloud (organization) | `gcloud organizations get-iam-policy`, `gcloud organizations set-iam-policy` |
| gcloud (billing account) | `gcloud beta billing accounts get-iam-policy`, `gcloud beta billing accounts set-iam-policy` |

### Permissions to configure

| Action | Required permission |
|--------|---------------------|
| Set IAM policies | `resourcemanager.RESOURCE_TYPE.setIamPolicy` |
| View IAM policies | `resourcemanager.RESOURCE_TYPE.getIamPolicy` |
| View Data Access logs | `roles/logging.privateLogViewer` (the Editor role `roles/editor` doesn't include the permissions to view Data Access logs) |

### `updateMask` behavior of `gcloud ... set-iam-policy`

| Policy you supply | Result |
|-------------------|--------|
| Omits `auditConfigs` | Previous `auditConfigs` unchanged (not in the update mask) |
| Omits `bindings` | `bindings` removed from the policy; all principals lose access to the project (very harmful) |
| Omits `etag` | Concurrent-change checking is disabled; might overwrite someone else's changes |

## Notes

- Merge rules: Configurations across `allServices`, a specific service, and the resource hierarchy are merged as a union.
- Merge rules: For BigQuery Data Transfer Service, the configuration is inherited from the default audit log configuration.
- `updateMask` behavior of `gcloud ... set-iam-policy`: The command computes `updateMask` itself: it always contains `bindings` and `etag`, plus any other top-level fields in the supplied policy such as `auditConfigs`.
- Warning (source): your edited IAM policy replaces the current policy. Changing parts unrelated to audit logging might make your project inaccessible. You must specify `updateMask` as shown for the REST call; without it you might lose all access to the project. `setIamPolicy` fails if Resource Manager detects another change after your read; repeat the three steps.
- Changing the policy is a read-modify-write: keep `etag`, change only `auditConfigs`, and preserve `bindings` and `version` as read. The source examples show `version: 1` policies without conditional bindings and don't discuss conditional bindings; if your policy has conditional bindings, leave them and the policy `version` exactly as returned and don't add members to them.
- `projects.getIamPolicy` / `gcloud projects get-iam-policy` return only the policy set on the project, not policies inherited from a parent organization or folder. In the console, Data Access configurations of parent entities are hidden when you lack `getIamPolicy` on them, but they still apply.
- The examples write the policy to the fixed path `/tmp/policy.yaml` (`/tmp/policy.json`), which contains principal emails; on a shared machine use a private temporary directory and delete the file afterwards.
- Disabling Data Access audit logs (an empty `auditConfigs`) stops recording the corresponding access evidence; adding an exempted principal stops audit logs for that principal and, if the log type was disabled, enables it for the service. Try changes on a disposable or test project first, as the best-practices page recommends validating on a test project.
- Data Access logs are stored in `_Default` unless routed elsewhere and can incur additional log-usage charges; they help Google Support troubleshoot, so enabling them is recommended. Some BigQuery services (for example the BigQuery Reservation API) require `ADMIN_READ` enabled for `bigquery.googleapis.com`. A billing API method can depend on a permission type of another service (Cloud Billing's `ADMIN_READ` check requires `ADMIN_READ` enabled for `cloudresourcemanager.googleapis.com`).
- Google Cloud MCP servers write Data Access logs as `SERVICE_NAME.googleapis.com/mcp`; enable by turning on audit logging for `mcp.googleapis.com` in the `AuditConfig`.
- Console exemptions: a principal can be exempted per service and log type; the console also offers "Set Default Configuration". The source also shows these Console steps.
- Source: https://docs.cloud.google.com/logging/docs/audit/configure-data-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source lists the exempted member as the bare email `499862534253-compute@developer.gserviceaccount.com`. `AuditLogConfig.exemptedMembers` "Follows the same format of Binding.members" (Discovery `cloudresourcemanager` v3), so a service account is written `serviceAccount:EMAIL`.

## Related

- [audit-logs-overview.md](./audit-logs-overview.md)
- [best-practices.md](./best-practices.md)
- [understanding-audit-logs.md](./understanding-audit-logs.md)
