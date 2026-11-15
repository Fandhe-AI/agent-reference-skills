---
source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud
---

# Run gcloud Non-Interactively in CI and Scripts

Disable prompts, set the project through the environment, authorize with a credential file, and parse output with `--format=value(...)`.

## Signature / Usage

### Disable prompts and set properties through the environment

Adapted (not in the official docs): the `CLOUDSDK_CORE_DISABLE_PROMPTS=1` equivalence (593.0.0 `--quiet` help) and the `CLOUDSDK_CORE_PROJECT` example (properties page) are combined with `export`; `PROJECT_ID` is a placeholder.

```bash
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
export CLOUDSDK_CORE_PROJECT=PROJECT_ID
```

The same effect for a single command is the global flag `--quiet` (or `-q`); the persistent form is the property:

```bash
gcloud config set disable_prompts true
```

### Authorize with a credential file

Use a credential configuration file for Workload Identity Federation (preferred) or a service account key file.

```bash
gcloud auth login --cred-file=CONFIGURATION_FILE
```

### Read single values with `value(...)`

```bash
gcloud info --format='value(config.account)'
```

### Fail on a non-zero exit status

Adapted (not in the official docs): the official best practice says to depend on the exit status; this snippet wires `--quiet` and `--format="value(projectId)"` (both from the official page) into a Bash check.

```bash
#!/bin/bash
set -u
if ! projects="$(gcloud projects list --quiet --format="value(projectId)")"; then
  echo "gcloud projects list failed" >&2
  exit 1
fi
printf '%s\n' "${projects}"
```

### Iterate over projects and service accounts

Adapted (not in the official docs): the official nested loop for service account keys is rewritten with `while read`, quoted variables, and `set -euo pipefail` so names are not word-split and a failed listing exits non-zero; commands, flags, and `value(...)` projections are unchanged.

```bash
#!/bin/bash
set -euo pipefail
projects="$(gcloud projects list --format="value(projectId)")"
while IFS= read -r project; do
  [ -n "${project}" ] || continue
  echo "ProjectId:  ${project}"
  robots="$(gcloud iam service-accounts list --project "${project}" --format="value(email)")"
  while IFS= read -r robot; do
    [ -n "${robot}" ] || continue
    echo "    -> Robot ${robot}"
    gcloud iam service-accounts keys list --iam-account "${robot}" --project "${project}" --format="value(name.basename())"
  done <<< "${robots}"
done <<< "${projects}"
```

### Parse multi-valued fields as CSV

```bash
gcloud compute instances list --filter=name:instance-1 \
  --format="csv[no-heading](name,id,serviceAccounts[].email.list(),serviceAccounts[].scopes[].map().list(separator=;))"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--quiet` / `-q` | global flag | Disable prompts; defaults are used, or an error is raised if input is required |
| `disable_prompts` | property | Persistent form of `--quiet` (`CLOUDSDK_CORE_DISABLE_PROMPTS=1`) |
| `CLOUDSDK_CORE_PROJECT` | environment variable | Sets `core/project` |
| `--cred-file` | flag (`gcloud auth login`) | Credential configuration file or service account key file |
| `show_structured_logs` | property | Write JSON-structured logs to stderr; see `gcloud topic configurations` |

## Notes

- Do depend on the exit status; do not depend on stderr text or on the default (non-`--format`) stdout, which can change between releases.
- Run gcloud commands sequentially; parallel execution of multiple gcloud CLI commands is not supported.
- The official loop expands command output unquoted; the quoted version above is an Adapted rewrite.
- The official scripting page also shows `gcloud auth activate-service-account --key-file [KEY_FILE]`. A service account key is a security risk; prefer keyless options. Design of keys, Workload Identity Federation, and impersonation is in the `gcp-foundation` skill, and client-library authentication is in the `gcp-client-libraries` skill.
- Run the project and service account loops only against projects you own; they list keys for every project the credentials can see.
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/properties (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference (Google Cloud CLI 593.0.0 help for `--quiet`, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/configurations (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [properties.md](../references/config-auth/properties.md)
- [authorizing-service-accounts.md](../references/config-auth/authorizing-service-accounts.md)
