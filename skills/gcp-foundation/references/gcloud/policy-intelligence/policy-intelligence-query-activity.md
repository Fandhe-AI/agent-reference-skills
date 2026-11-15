---
source: https://docs.cloud.google.com/sdk/gcloud/reference/policy-intelligence/query-activity
---

# gcloud policy-intelligence query-activity

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud policy-intelligence query-activity

```text
NAME
    gcloud policy-intelligence query-activity - query activities on cloud
        resource

SYNOPSIS
    gcloud policy-intelligence query-activity --activity-type=ACTIVITY_TYPE
        --project=PROJECT [--limit=LIMIT; default=1000]
        [--page-size=PAGE_SIZE; default=500] [--query-filter=QUERY_FILTER]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Query activities with certain types of specific container resource. For
    --activity-type, supported values are:
      o serviceAccountLastAuthentication
      o serviceAccountKeyLastAuthentication

EXAMPLES
    To query serviceAccountKeyLastAuthentication activities of a project, run:

        $ gcloud policy-intelligence query-activity \
            --activity-type=serviceAccountKeyLastAuthentication \
            --project=project-id

    To query serviceAccountLastAuthentication activities of a project with no
    limit, run:

        $ gcloud policy-intelligence query-activity \
            --activity-type=serviceAccountLastAuthentication \
            --project=project-id --limit=unlimited

    To query serviceAccountLastAuthentication with filtering on certain service
    account, run:

        $ gcloud policy-intelligence query-activity \
            --activity-type=serviceAccountLastAuthentication \
            --project=project-id \
            --query-filter='activities.full_resource_name="//iam.googleapis.\
        com/projects/project-id/serviceAccounts/service-account-name@project\
        -id.iam.gserviceaccount.com"'

    To query serviceAccountLastAuthentication with filtering on multiple
    service accounts, run:

        $ gcloud policy-intelligence query-activity \
            --activity-type=serviceAccountLastAuthentication \
            --project=project-id \
            --query-filter='activities.full_resource_name="//iam.googleapis.\
        com/projects/project-id/serviceAccounts/service-account-name-1@proje\
        ct-id.iam.gserviceaccount.com" OR
         activities.full_resource_name="//iam.googleapis.com/projects/projec\
        t-id/serviceAccounts/service-account-name-2@project-id.iam.gservicea\
        ccount.com" OR
         activities.full_resource_name="//iam.googleapis.com/projects/projec\
        t-id/serviceAccounts/service-account-name-3@project-id.iam.gservicea\
        ccount.com"'

REQUIRED FLAGS
     --activity-type=ACTIVITY_TYPE
        Type of the activities. ACTIVITY_TYPE must be one of:
        serviceAccountLastAuthentication, serviceAccountKeyLastAuthentication.

     --project=PROJECT
        The project ID or number to query the activities.

OPTIONAL FLAGS
     --limit=LIMIT; default=1000
        Max number of query result. Default to be 1000 and max to be unlimited,
        i.e., --limit=unlimited.

     --page-size=PAGE_SIZE; default=500
        Max page size for each http response. Default to be 500 and max to be
        1000.

     --query-filter=QUERY_FILTER
        Filter on activities, separated by "OR" if multiple filters are
        specified. At most 10 filter restrictions are supported in the
        query-filter. e.g.
        --query-filter='activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name-1@project-id.iam.gserviceaccount.com"
        OR
        activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name-2@project-id.iam.gserviceaccount.com"'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and `$VARIABLE` placeholders are quoted.

```bash
gcloud policy-intelligence query-activity \
    --activity-type=serviceAccountLastAuthentication \
    --project=project-id \
    --query-filter='activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name@project-id.iam.gserviceaccount.com"'

gcloud policy-intelligence query-activity \
    --activity-type=serviceAccountLastAuthentication \
    --project=project-id \
    --query-filter='activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name-1@project-id.iam.gserviceaccount.com" OR activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name-2@project-id.iam.gserviceaccount.com" OR activities.full_resource_name="//iam.googleapis.com/projects/project-id/serviceAccounts/service-account-name-3@project-id.iam.gserviceaccount.com"'
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/policy-intelligence/query-activity (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
