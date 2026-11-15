---
source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/describe
---

# gcloud org-policies describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud org-policies describe

```text
NAME
    gcloud org-policies describe - describe an organization policy

SYNOPSIS
    gcloud org-policies describe CONSTRAINT
        (--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID) [--effective] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes an organization policy.

EXAMPLES
    To describe the policy associated with the constraint
    'gcp.resourceLocations' and the Project 'foo-project', run:

        $ gcloud org-policies describe gcp.resourceLocations \
            --project=foo-project

POSITIONAL ARGUMENTS
     CONSTRAINT
        Name of the org policy constraint. The list of available constraints
        can be found here:
        https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints

REQUIRED FLAGS
     Resource that is associated with the organization policy.

     Exactly one of these must be specified:

       --folder=FOLDER_ID
          Folder ID.

       --organization=ORGANIZATION_ID
          Organization ID.

       --project=PROJECT_ID
          Project ID. Overrides the default core/project property value for
          this command invocation.

OPTIONAL FLAGS
     --effective
        Describe the effective policy.

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
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
