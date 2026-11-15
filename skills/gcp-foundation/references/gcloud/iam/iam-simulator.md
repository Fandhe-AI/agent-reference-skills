---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/simulator
---

# gcloud iam simulator

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam simulator replay-recent-access

```text
NAME
    gcloud iam simulator replay-recent-access - determine affected recent
        access attempts before IAM policy change deployment

SYNOPSIS
    gcloud iam simulator replay-recent-access RESOURCE POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replay the most recent 1,000 access logs from the past 90 days using the
    simulated policy. For each log entry, the replay determines if setting the
    provided policy on the given resource would result in a change in the
    access state, e.g. a previously granted access becoming denied. Any
    differences found are returned.

EXAMPLES
    To simulate a permission change of a member on a resource, run:

        $ gcloud iam simulator replay-recent-access projects/project-id \
            path/to/policy_file.json

    See https://cloud.google.com/iam/docs/managing-policies for details of
    policy role and member types.

POSITIONAL ARGUMENTS
     RESOURCE
        Full resource name to simulate the IAM policy for.

        See:
        https://cloud.google.com/apis/design/resource_names#full_resource_name.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy. See the
        Policy reference
        (https://cloud.google.com/iam/reference/rest/v1/Policy) for details.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/simulator (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
