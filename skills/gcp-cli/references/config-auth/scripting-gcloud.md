---
source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud
---

# Scripting gcloud CLI commands

In addition to running Google Cloud CLI commands from the command line, you can run them from scripts or other automations, for example when using Jenkins to drive automation of Google Cloud tasks. Google Cloud SDK comes with tools like filtering, formatting, and the `--quiet` flag, enabling you to handle output and automate tasks.

## Signature / Usage

### Authorization

Google Cloud SDK provides two options: user account authorization and service account authorization.

User account authorization is recommended if you are running a script or other automation on a single machine. To authorize access and perform other common setup steps:

```
gcloud init
```

Service account authorization is recommended if you are deploying a script or other automation across machines in a production environment. It is also the recommended method if you are running gcloud CLI commands on a Compute Engine virtual machine instance where all users have access to `root`.

To use service account authorization, use an existing service account or create a new one on the Service Accounts page. To create and download the associated private key as a JSON-formatted key file, choose **Manage Keys** from the action menu for the service account. To run the authorization:

```
gcloud auth activate-service-account --key-file [KEY_FILE]
```

You can SSH into your VM instance by using `gcloud compute ssh`, which takes care of authentication. SSH configuration files can be configured using `gcloud compute config-ssh`.

### Disabling prompts

Some gcloud CLI commands are interactive. You can disable prompts by setting the `disable_prompts` property in your configuration to `True` or by using the global `--quiet` or `-q` flag. Most interactive commands have default values when additional confirmation or input is required. If prompts are disabled, these default values are used.

```
gcloud debug targets list --quiet
```

### Filtering and formatting output

The `--filter` and `--format` flags ensure that output adheres to your format (like json, yaml, csv, and text) and filter (VM names prefixed with 'test', creation year after 2015, etc.) specifications.

List instances created in zone *us-central1-a*:

```
gcloud compute instances list --filter="zone:us-central1-a"
```

List in JSON format those projects where the labels match specific values (e.g. label.env is 'test' and label.version is alpha):

```
gcloud projects list --format="json" \
  --filter="labels.env=test AND labels.version=alpha"
```

List projects with their creation date and time specified in the local timezone:

```
gcloud projects list \
  --format="table(name, project_id, createTime.date(tz=LOCAL))"
```

List projects that were created after a specific date in table format:

```
gcloud projects list \
  --format="table(projectNumber,projectId,createTime)" \
  --filter="createTime.date('%Y-%m-%d', Z)='2016-05-11'"
```

In the last example, a projection on the key was used. The filter is applied on the `createTime` key after the date formatting is set.

List a nested table of the quotas of a region:

```
gcloud compute regions describe us-central1 \
  --format="table(quotas:format='table(metric,limit,usage)')"
```

Print a flattened list of global quotas in CSV format:

```
gcloud compute project-info describe --flatten='quotas[]' \
  --format='csv(quotas.metric,quotas.limit,quotas.usage)'
```

List compute instance resources with box decorations and titles, sorted by name, in table format:

```
gcloud compute instances list \
  --format='table[box,title=Instances](name:sort=1,zone:label=zone,status)'
```

List the project authenticated user email address:

```
gcloud info --format='value(config.account)'
```

### Best practices

If you want a script or other automation to perform actions conditionally based on the output of a gcloud CLI command:

- **Do depend on command exit status.** If the exit status is not zero, an error occurred and the output may be incomplete unless the command documentation notes otherwise. For example, a command that creates multiple resources may only create a few, list them on the standard output, and then exit with a non-zero status. Alternatively, you can use the `show_structured_logs` property to parse error logs. Run `gcloud config` for more details.
- **Don't depend on messages printed to standard error.** The wording of these messages may change in future versions of the gcloud CLI and break your automation.
- **Don't depend on the raw output of messages printed to standard output.** The default output for any command may change in a future release. Minimize the impact by using the `--format` flag with one of `--format=json|yaml|csv|text|list`. Run `gcloud topic formats` for more options. You can modify the default output from `--format` by using projections. For increased granularity, use the `--filter` flag to return a subset of the values based on an expression. You can then script against those returned values.

### Example scripts: list keys for all your projects' service accounts

The sample scripts list the keys associated with all your projects' service accounts by iterating over your projects, getting the associated service accounts for each project, and getting the associated keys for each service account.

Bash:

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

Windows PowerShell:

```
foreach ($project in gcloud projects list --format="value(projectId)")
{
  Write-Host "ProjectId: $project"
  foreach ($robot in  gcloud iam service-accounts list --project $project --format="value(email)")
  {
      Write-Host "    -> Robot $robot"
      foreach ($key in gcloud iam service-accounts keys list --iam-account $robot --project $project --format="value(name.basename())")
      {
        Write-Host "        $key"
      }
  }
}
```

### Parse output for processing

The sample writes the service account information into an array and segregates values in the multi-valued CSV-formatted `serviceAccounts.scope()` field:

Adapted (not in the official docs): the official loop iterates over an unquoted command substitution (records are word-split) and wraps the `--format` value across lines; it is replaced by this version, which reads one CSV record per line, quotes every variable, and stops on the first error.

```bash
#!/bin/bash
set -euo pipefail
scopes_info="$(gcloud compute instances list --filter=name:instance-1 \
  --format="csv[no-heading](name,id,serviceAccounts[].email.list(),serviceAccounts[].scopes[].map().list(separator=;))")"
while IFS= read -r scopesInfo; do
  [ -n "${scopesInfo}" ] || continue
  IFS=',' read -r -a scopesInfoArray <<< "${scopesInfo}"
  NAME="${scopesInfoArray[0]}"
  ID="${scopesInfoArray[1]}"
  EMAIL="${scopesInfoArray[2]}"
  SCOPES_LIST="${scopesInfoArray[3]}"

  echo "NAME: ${NAME}, ID: ${ID}, EMAIL: ${EMAIL}"
  echo ""
  IFS=';' read -r -a scopeListArray <<< "${SCOPES_LIST}"
  for SCOPE in "${scopeListArray[@]}"; do
    echo "  SCOPE: ${SCOPE}"
  done
done <<< "${scopes_info}"
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `disable_prompts` | property | Set to `True` to disable prompts; default input values are used |
| `--quiet` / `-q` | global flag | Disables interactive prompting (default values are applied) |
| `--filter` | flag | Returns a subset of values based on an expression |
| `--format` | flag | Output format (`json`, `yaml`, `csv`, `text`, `list`, `table(...)`, `value(...)`, ...) |
| `--flatten` | flag | Flattens a repeated field (example: `--flatten='quotas[]'`) |
| `show_structured_logs` | property | Parse error logs; run `gcloud config` for details |

## Notes

- Adapted from the official docs: the Bash loops (service account keys per project, and the multi-valued CSV parsing) are shown only in a safe form: the official versions iterate over unquoted command substitutions, which word-split values, and the CSV example wraps the `--format` value across lines. The PowerShell loop is unchanged.
- Parallel execution of multiple gcloud CLI commands is not supported.
- The service account key-file command `gcloud auth activate-service-account --key-file [KEY_FILE]` is the older form used here; the Authorize page uses `gcloud auth login --cred-file=KEY_FILE` (see authorizing-service-accounts.md). Service account keys are a security risk; key lifecycle and keyless alternatives belong to the `gcp-foundation` skill.
- The Bash loops above expand command output unquoted, as in the official sample.
- Further reading named on the page: the blog posts "Scripting with gcloud: a beginner's guide to automating Google Cloud tasks" (https://cloud.google.com/blog/products/management-tools/scripting-with-gcloud-a-beginners-guide-to-automating-gcp-tasks) and "filtering and formatting fun with" (https://cloud.google.com/blog/products/it-ops/filtering-and-formatting-fun-with); `gcloud topic filters`, `gcloud topic formats`, `gcloud topic projections` are the topic references.
- Source: https://docs.cloud.google.com/sdk/docs/scripting-gcloud (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [authorizing-service-accounts.md](./authorizing-service-accounts.md)
- [properties.md](./properties.md)
- [cheatsheet.md](./cheatsheet.md)
