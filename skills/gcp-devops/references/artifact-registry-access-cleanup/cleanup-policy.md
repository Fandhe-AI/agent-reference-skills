---
source: https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy
---

# Configure Artifact Registry cleanup policies

Define delete and keep rules in a JSON policy file, test them with a dry run, then apply them with the gcloud CLI (or console). Policies delete artifact versions irreversibly once dry run is disabled.

## Signature / Usage

### Delete policy

```json
{
  "name": "DELETE_POLICY_NAME",
  "action": {"type": "Delete"},
  "condition": {
    "tagState": "TAG_STATUS",
    "tagPrefixes": ["TAG_PREFIXES"],
    "versionNamePrefixes": ["VERSION_PREFIXES"],
    "packageNamePrefixes": ["PACKAGE_PREFIXES"],
    "olderThan": "OLDER_THAN_DURATION",
    "newerThan": "NEWER_THAN_DURATION"
  }
}
```

A delete policy must include a name, an action and at least one condition.

### Conditional keep policy

```json
{
  "name": "KEEP_POLICY_NAME",
  "action": {"type": "Keep"},
  "condition": {
    "tagState": "TAG_STATUS",
    "tagPrefixes": ["TAG_PREFIXES"],
    "versionNamePrefixes": ["VERSION_PREFIXES"],
    "packageNamePrefixes": ["PACKAGE_PREFIXES"],
    "olderThan": "OLDER_THAN_DURATION",
    "newerThan": "NEWER_THAN_DURATION"
  }
}
```

### Keep most recent versions

The template below is not valid JSON until `MINIMUM_NUMBER` is replaced by a number, so it is shown as text:

```text
{
  "name": "KEEP_POLICY_NAME",
  "action": {"type": "Keep"},
  "mostRecentVersions": {
    "packageNamePrefixes": ["PACKAGE_PREFIXES"],
    "keepCount": MINIMUM_NUMBER
  }
}
```

Omit `packageNamePrefixes` to keep the given number of recent versions of every package.

### Example policy file

```json
[
  {
    "name": "delete-prerelease",
    "action": {"type": "Delete"},
    "condition": {
      "tagState": "tagged",
      "tagPrefixes": ["alpha", "v0"],
      "olderThan": "30d"
    }
  },
  {
    "name": "keep-tagged-release",
    "action": {"type": "Keep"},
    "condition": {
      "tagState": "tagged",
      "tagPrefixes": ["release"],
      "packageNamePrefixes": ["webapp", "mobile"]
    }
  },
  {
    "name": "keep-minimum-versions",
    "action": {"type": "Keep"},
    "mostRecentVersions": {
      "packageNamePrefixes": ["webapp", "mobile", "sandbox"],
      "keepCount": 5
    }
  }
]
```

### Dry run (test first; nothing is deleted)

```bash
gcloud artifacts repositories set-cleanup-policies REPOSITORY \
    --project=PROJECT_ID \
    --location=LOCATION \
    --policy=POLICY_FILE \
    --dry-run
```

Query the audit logs for the dry run (wait at least a day):

```bash
gcloud logging read 'protoPayload.serviceName="artifactregistry.googleapis.com" AND protoPayload.request.parent="projects/PROJECT_ID/locations/LOCATION/repositories/REPOSITORY/packages/-" AND protoPayload.request.validateOnly=true' \
    --resource-names="projects/PROJECT_ID" \
    --project=PROJECT_ID
```

### Apply (deletes artifacts)

```bash
gcloud artifacts repositories set-cleanup-policies REPOSITORY \
    --project=PROJECT_ID \
    --location=LOCATION \
    --policy=POLICY_FILE \
    --no-dry-run
```

```bash
gcloud artifacts repositories set-cleanup-policies my-repo \
    --project=my-project \
    --location=us-west1 \
    --policy=policy.json
```

### Update, list and remove policies

To update, edit the policy file and run the apply command again with `--no-dry-run`.

```bash
gcloud artifacts repositories list-cleanup-policies REPOSITORY \
    --project=PROJECT_ID \
    --location=LOCATION
```

```bash
gcloud artifacts repositories delete-cleanup-policies REPOSITORY \
    --policynames=POLICY_NAMES \
    --project=PROJECT_ID \
    --location=LOCATION
```

```bash
gcloud artifacts repositories delete-cleanup-policies my-repo \
    --policynames=delete-test \
    --project=my-project \
    --location=us-west1
```

## Options / Props

### Policy fields

| Field | Description |
|---|---|
| `name` | Unique within the policies applied to a repository. |
| `action` | `{"type": "Delete"}` or `{"type": "Keep"}`. |
| `condition` | One or more conditions (delete: at least one). Not used together with `mostRecentVersions`. |
| `mostRecentVersions` | Keep policy for a number of versions: `packageNamePrefixes` (optional) and `keepCount`. |

### Conditions

| Condition | Description |
|---|---|
| `tagState` | `tagged` (only tagged artifacts), `untagged` (only untagged), `any` (both). Formats that do not support tags are treated as `untagged`. |
| `tagPrefixes` | Tag prefixes, for example `"test", "staging"` match `testenv` and `staging-1.5`. `tagState` must be `TAGGED` to use them. |
| `versionNamePrefixes` | Version prefixes, for example `"v1", "v2"` match `v1.5`, `v2.0alpha`, `v10.2`. |
| `packageNamePrefixes` | Package name prefixes, for example `"red", "blue"` match `red-team`, `redis`, `bluebird`. |
| `olderThan` | Minimum time since the version was created in the repository, as a duration: `s`, `m`, `h`, `d` suffix (`30d` = 30 days). |
| `newerThan` | Maximum time since the version was created in the repository, same duration format. |

### gcloud flags (set-cleanup-policies)

| Flag | Description |
|---|---|
| `--policy=POLICY` | Path to a local JSON policy file. |
| `--dry-run` / `--no-dry-run` | Dry run on / off. At least one of `--dry-run`, `--policy` is required. |
| `--location=LOCATION` | Location of the repository. |
| `--project=PROJECT_ID` | Project of the repository. |

## Notes

- Required role: Artifact Registry Administrator (`roles/artifactregistry.admin`) on the repository project. Permissions: `artifactregistry.repositories.update`, and to delete matching artifacts `artifactregistry.versions.delete`. The default role of the Artifact Registry Service Agent includes `artifactregistry.versions.delete`.
- Irreversible: with `--no-dry-run` (console: **Delete artifacts**) matching versions are deleted by a background job; changes take effect within approximately one day. Always run `--dry-run` first, review the audit logs, and try the policy on a disposable project or repository.
- The apply example in the source (`my-repo`) omits `--no-dry-run`; the source states `--no-dry-run` disables dry run functionality for the repository, and the console requires setting **Delete artifacts**. In gcloud 593.0.0 help `--dry-run` is described as "Disable deleting images according to cleanup policies". Add `--no-dry-run` explicitly when you intend to delete.
- A keep policy only exempts artifacts; add at least one delete policy to delete anything. You cannot use `condition` and `mostRecentVersions` in the same keep policy. If a version matches delete and keep policies, it is kept.
- If `packageNamePrefixes` is specified in a keep policy, Artifact Registry only keeps the most recent versions of packages matching those prefixes (source caution).
- Docker: cleanup policies do not delete images referenced by a parent manifest; related images are deleted on the next run after the parent manifest is deleted. If immutable tags are enabled, tagged artifacts cannot be deleted.
- Cleanup policies apply to standard repositories only in this procedure: not to a project and not to virtual repositories (the overview page also lists remote repositories as supported).
- Dry-run audit logs need the Data Access `DATA_WRITE` log type enabled for the Artifact Registry service; a dry run appears as `BatchDeleteVersions` with `validateOnly` true. Applying policies logs an `UpdateRepository`; deletions are logged as performed by `service-PROJECT-NUMBER@gcp-sa-artifactregistry.iam.gserviceaccount.com`. The source's sample log output is omitted.
- Maximum 10 policies per repository; 600,000 deletions per repository per day.
- The source also shows the Console steps for creating, applying, updating, listing and removing policies.
- Source: https://docs.cloud.google.com/artifact-registry/docs/repositories/cleanup-policy (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cleanup-policy-overview.md](./cleanup-policy-overview.md)
- [protect-artifacts.md](./protect-artifacts.md)
- [access-control.md](./access-control.md)
