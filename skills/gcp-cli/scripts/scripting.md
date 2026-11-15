---
source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud
---

# Scripting gcloud CLI Commands

Copy-paste patterns for running gcloud commands from scripts and automation: authorization, disabling prompts, parsing output, and flag files.

## Signature / Usage

### Authorize a script

User account authorization, for a single machine:

```bash
gcloud init
```

Service account authorization, for production automation across machines:

```bash
gcloud auth activate-service-account --key-file [KEY_FILE]
```

### Disable prompts

```bash
gcloud config set disable_prompts true
```

The global `--quiet` (`-q`) flag does the same for one command. With prompts disabled, default answers are used; commands that need real input raise an error.

### Parse output as values or CSV

```bash
gcloud projects list --format="value(projectId)"
```

```bash
gcloud compute project-info describe --flatten='quotas[]' \
  --format='csv(quotas.metric,quotas.limit,quotas.usage)'
```

```bash
gcloud info --format='value(config.account)'
```

### Iterate over projects, service accounts and keys

Adapted (not in the official docs): the official Bash loop expands command output and variables unquoted (values are word-split and glob-expanded) and ignores a failed listing; it is replaced by this version, which reads line by line, quotes every variable, skips empty lines, and stops on the first error.

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

### Split multi-valued CSV fields

Adapted (not in the official docs): the official loop iterates over an unquoted command substitution (records are word-split) and wraps the `--format` value across lines; it is replaced by this version, which reads one CSV record per line, quotes every variable, and stops on the first error. A VM without a service account yields empty email and scope fields, so missing array elements default to empty strings.

```bash
#!/bin/bash
set -euo pipefail
scopes_info="$(gcloud compute instances list --filter=name:instance-1 \
  --format="csv[no-heading](name,id,serviceAccounts[].email.list(),serviceAccounts[].scopes[].map().list(separator=;))")"
while IFS= read -r scopesInfo; do
  [ -n "${scopesInfo}" ] || continue
  IFS=',' read -r -a scopesInfoArray <<< "${scopesInfo}"
  NAME="${scopesInfoArray[0]-}"
  ID="${scopesInfoArray[1]-}"
  EMAIL="${scopesInfoArray[2]-}"
  SCOPES_LIST="${scopesInfoArray[3]-}"

  echo "NAME: ${NAME}, ID: ${ID}, EMAIL: ${EMAIL}"
  echo ""
  IFS=';' read -r -a scopeListArray <<< "${SCOPES_LIST}"
  for SCOPE in ${scopeListArray[@]+"${scopeListArray[@]}"}; do
    echo "  SCOPE: ${SCOPE}"
  done
done <<< "${scopes_info}"
```

### Pass flag values from YAML files

Contents of `flags-1.yaml`:

```yaml
--zone: us-east2-a
```

Contents of `flags-2.yaml`:

```yaml
--verbosity: info
--zone: us-central1-a
```

```bash
gcloud compute instances describe \
    --flags-file=flags-1.yaml my-instance --flags-file=flags-2.yaml
```

`--flags-file` may be repeated; the file to the right has higher precedence, so the effective zone is `us-central1-a`.

### Read command conventions and escaping rules

```bash
gcloud topic command-conventions
```

```bash
gcloud topic escaping
```

```bash
gcloud topic arg-files
```

## Notes

- Adapted from the official docs: the key-listing loop and the CSV parsing loop are shown only in a safe form (quoted variables, line-by-line reads, `set -euo pipefail`); the official versions iterate over unquoted command substitutions.
- Do depend on the command exit status: a non-zero status means an error occurred and output may be incomplete. Do not depend on the wording of messages on standard error or on the raw default standard output; use `--format` (and `--filter`) instead.
- Parallel execution of multiple gcloud CLI commands is not supported.
- The Bash loops expand command output unquoted, as in the official samples; they assume values contain no whitespace.
- The `disable_prompts` property is equivalent to the `--quiet` flag or the environment variable `CLOUDSDK_CORE_DISABLE_PROMPTS` set to 1 (see `gcloud config set --help`).
- The `show_structured_logs` property (values `never`, `always`, `log`, `terminal`; see `gcloud config set --help`) makes error logs parseable as JSON.
- The service account key sample is the older form; the Authorize page uses `gcloud auth login --cred-file=KEY_FILE`. Service account keys are a security risk; key lifecycle and keyless alternatives belong to the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/set (gcloud 593.0.0 help; `disable_prompts`, `show_structured_logs`)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/flags-file (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/command-conventions (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/escaping (gcloud 593.0.0 help)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/arg-files (gcloud 593.0.0 help)

## Related

- [scripting-gcloud.md](../references/config-auth/scripting-gcloud.md)
- [properties.md](../references/config-auth/properties.md)
- [authorizing-service-accounts.md](../references/config-auth/authorizing-service-accounts.md)
