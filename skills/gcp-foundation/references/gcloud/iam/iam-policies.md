---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/policies
---

# gcloud iam policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam policies create

```text
NAME
    gcloud iam policies create - create a policy on the given attachment point
        with the given name

SYNOPSIS
    gcloud iam policies create POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND --policy-file=POLICY_FILE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a policy on the given attachment point with the given name.

EXAMPLES
    The following command creates the IAM policy defined at the resource
    project 123 of kind denypolicies and id my-deny-policy from the file
    policy.json:

        $ gcloud iam policies create my-deny-policy \
            --attachment-point=cloudresourcemanager.googleapis.com/\
        projects/123 --kind=denypolicies --policy-file=policy.json

POSITIONAL ARGUMENTS
     POLICY_ID
        Policy ID that is unique for the resource to which the policy is
        attached.

REQUIRED FLAGS
     --attachment-point=ATTACHMENT_POINT
        Resource to which the policy is attached. For valid formats, see
        https://cloud.google.com/iam/help/deny/attachment-point.

     --kind=KIND
        Policy type. Use denypolicies for deny policies.

     --policy-file=POLICY_FILE
        Path to the file that contains the policy, in JSON or YAML format. For
        valid syntax, see https://cloud.google.com/iam/help/deny/policy-syntax.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam policies create

        $ gcloud beta iam policies create
```

### gcloud iam policies delete

```text
NAME
    gcloud iam policies delete - delete a policy on the given attachment point
        with the given name

SYNOPSIS
    gcloud iam policies delete POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a policy on the given attachment point with the given name.

EXAMPLES
    The following command deletes the IAM policy defined at the resource
    project 123 of kind denypolicies and id my-deny-policy, with etag abc:

        $ gcloud iam policies delete my-deny-policy \
            --attachment-point=cloudresourcemanager.googleapis.com/\
        projects/123 --kind=denypolicies --etag=abc

POSITIONAL ARGUMENTS
     POLICY_ID
        Policy ID that is unique for the resource to which the policy is
        attached.

REQUIRED FLAGS
     --attachment-point=ATTACHMENT_POINT
        Resource to which the policy is attached. For valid formats, see
        https://cloud.google.com/iam/help/deny/attachment-point.

     --kind=KIND
        Policy type. Use denypolicies for deny policies.

OPTIONAL FLAGS
     --etag=ETAG
        Etag that identifies the version of the existing policy. It can be
        obtained by running gcloud iam policies get. When deleting a policy, if
        the etag is omitted, the policy is deleted regardless of its current
        etag. When updating a policy, if the etag is omitted, the update uses
        the etag provided in the policy file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam policies delete

        $ gcloud beta iam policies delete
```

### gcloud iam policies get

```text
NAME
    gcloud iam policies get - get a policy on the given attachment point with
        the given name

SYNOPSIS
    gcloud iam policies get POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get a policy on the given attachment point with the given name.

EXAMPLES
    The following command gets the IAM policy defined at the resource project
    123 of kind denypolicies and id my-deny-policy:

        $ gcloud iam policies get my-deny-policy \
            --attachment-point=cloudresourcemanager.googleapis.com/\
        projects/123 --kind=denypolicies

POSITIONAL ARGUMENTS
     POLICY_ID
        Policy ID that is unique for the resource to which the policy is
        attached.

REQUIRED FLAGS
     --attachment-point=ATTACHMENT_POINT
        Resource to which the policy is attached. For valid formats, see
        https://cloud.google.com/iam/help/deny/attachment-point.

     --kind=KIND
        Policy type. Use denypolicies for deny policies.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam policies get

        $ gcloud beta iam policies get
```

### gcloud iam policies list

```text
NAME
    gcloud iam policies list - list the policies on the given attachment point

SYNOPSIS
    gcloud iam policies list --attachment-point=ATTACHMENT_POINT --kind=KIND
        [--page_token=PAGE_TOKEN] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List the policies on the given attachment point.

EXAMPLES
    The following command lists the IAM policy defined at the resource project
    123 of kind denypolicies:

        $ gcloud iam policies list \
            --attachment-point=cloudresourcemanager.googleapis.com/\
        projects/123 --kind=denypolicies

REQUIRED FLAGS
     --attachment-point=ATTACHMENT_POINT
        Resource to which the policy is attached. For valid formats, see
        https://cloud.google.com/iam/help/deny/attachment-point.

     --kind=KIND
        Policy type. Use denypolicies for deny policies.

FLAGS
     --page_token=PAGE_TOKEN
        Page token received from a previous call. Provide this token to
        retrieve the next page.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam policies list

        $ gcloud beta iam policies list
```

### gcloud iam policies update

```text
NAME
    gcloud iam policies update - update the policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud iam policies update POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND --policy-file=POLICY_FILE [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the policy on the given attachment point with the given name.

EXAMPLES
    The following command updates the IAM policy my-deny-policy, which is
    attached to the resource project 123 and has the etag abc:

        $ gcloud iam policies update my-deny-policy \
            --attachment-point=cloudresourcemanager.googleapis.com/\
        projects/123 --kind=denypolicies --policy-file=policy.json \
            --etag=abc

POSITIONAL ARGUMENTS
     POLICY_ID
        Policy ID that is unique for the resource to which the policy is
        attached.

REQUIRED FLAGS
     --attachment-point=ATTACHMENT_POINT
        Resource to which the policy is attached. For valid formats, see
        https://cloud.google.com/iam/help/deny/attachment-point.

     --kind=KIND
        Policy type. Use denypolicies for deny policies.

     --policy-file=POLICY_FILE
        Path to the file that contains the policy, in JSON or YAML format. For
        valid syntax, see https://cloud.google.com/iam/help/deny/policy-syntax.

OPTIONAL FLAGS
     --etag=ETAG
        Etag that identifies the version of the existing policy. It can be
        obtained by running gcloud iam policies get. When deleting a policy, if
        the etag is omitted, the policy is deleted regardless of its current
        etag. When updating a policy, if the etag is omitted, the update uses
        the etag provided in the policy file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam policies update

        $ gcloud beta iam policies update
```

### gcloud beta iam policies create

```text
NAME
    gcloud beta iam policies create - create a policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud beta iam policies create POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND
        --policy-file=POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policies delete

```text
NAME
    gcloud beta iam policies delete - delete a policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud beta iam policies delete POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policies get

```text
NAME
    gcloud beta iam policies get - get a policy on the given attachment point
        with the given name

SYNOPSIS
    gcloud beta iam policies get POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policies list

```text
NAME
    gcloud beta iam policies list - list the policies on the given attachment
        point

SYNOPSIS
    gcloud beta iam policies list --attachment-point=ATTACHMENT_POINT
        --kind=KIND [--page_token=PAGE_TOKEN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam policies update

```text
NAME
    gcloud beta iam policies update - update the policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud beta iam policies update POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND
        --policy-file=POLICY_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies create

```text
NAME
    gcloud alpha iam policies create - create a policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud alpha iam policies create POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND
        --policy-file=POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies delete

```text
NAME
    gcloud alpha iam policies delete - delete a policy on the given attachment
        point with the given name

SYNOPSIS
    gcloud alpha iam policies delete POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies get

```text
NAME
    gcloud alpha iam policies get - get a policy on the given attachment point
        with the given name

SYNOPSIS
    gcloud alpha iam policies get POLICY_ID --attachment-point=ATTACHMENT_POINT
        --kind=KIND [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies lint-condition

```text
NAME
    gcloud alpha iam policies lint-condition - lint an IAM condition

SYNOPSIS
    gcloud alpha iam policies lint-condition
        (--condition-from-file=CONDITION_FROM_FILE
          | [--expression=EXPRESSION --title=TITLE
          : --description=DESCRIPTION]) [--resource-name=RESOURCE_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies list

```text
NAME
    gcloud alpha iam policies list - list the policies on the given attachment
        point

SYNOPSIS
    gcloud alpha iam policies list --attachment-point=ATTACHMENT_POINT
        --kind=KIND [--page_token=PAGE_TOKEN] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam policies update

```text
NAME
    gcloud alpha iam policies update - update the policy on the given
        attachment point with the given name

SYNOPSIS
    gcloud alpha iam policies update POLICY_ID
        --attachment-point=ATTACHMENT_POINT --kind=KIND
        --policy-file=POLICY_FILE [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
