---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/providers/keys
---

# gcloud iam workload-identity-pools providers keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam workload-identity-pools providers keys create

```text
NAME
    gcloud iam workload-identity-pools providers keys create - create a new
        workload identity pool provider key

SYNOPSIS
    gcloud iam workload-identity-pools providers keys create
        (KEY : --location=LOCATION
          --provider=PROVIDER --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        --spec=SPEC --use=USE [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new workload identity pool provider key.

EXAMPLES
    The following command creates a workload identity pool provider key in the
    default project with the ID my-key. Explicit values for all required and
    optional parameters are provided.

        $ gcloud iam workload-identity-pools providers keys create my-key \
            --location="global" \
            --workload-identity-pool="my-workload-identity-pool" \
            --provider="my-provider" --use="ENCRYPTION" --spec="RSA_4096"

POSITIONAL ARGUMENTS
     Workload identity pool provider key resource - The workload identity pool
     provider key to create. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the workload identity pool provider key or fully qualified
          identifier for the workload identity pool provider key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID for the provider, which becomes the final component of the
          resource name. This value must be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

REQUIRED FLAGS
     --spec=SPEC
        The specifications for the key. SPEC must be one of:
        key-spec-unspecified, rsa-2048, rsa-3072, rsa-4096.

     --use=USE
        The purpose of the key. USE must be one of: encryption,
        key-use-unspecified.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

### gcloud iam workload-identity-pools providers keys delete

```text
NAME
    gcloud iam workload-identity-pools providers keys delete - delete a
        workload identity pool provider key

SYNOPSIS
    gcloud iam workload-identity-pools providers keys delete
        (KEY : --location=LOCATION
          --provider=PROVIDER --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a workload identity pool provider key.

EXAMPLES
    The following command deletes a workload identity pool provider key in the
    default project with the ID my-key.

        $ gcloud iam workload-identity-pools providers keys delete my-key \
            --location="global" \
            --workload-identity-pool="my-workload-identity-pool" \
            --provider="my-provider"

POSITIONAL ARGUMENTS
     Workload identity pool provider key resource - The workload identity pool
     provider key to delete. The arguments in this group can be used to specify
     the attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the workload identity pool provider key or fully qualified
          identifier for the workload identity pool provider key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID for the provider, which becomes the final component of the
          resource name. This value must be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

### gcloud iam workload-identity-pools providers keys describe

```text
NAME
    gcloud iam workload-identity-pools providers keys describe - describe a
        workload identity pool provider key

SYNOPSIS
    gcloud iam workload-identity-pools providers keys describe
        (KEY : --location=LOCATION
          --provider=PROVIDER --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a workload identity pool provider key.

EXAMPLES
    The following command describes a workload identity pool provider key in
    the default project with the ID my-key.

        $ gcloud iam workload-identity-pools providers keys describe \
            my-key --location="global" \
            --workload-identity-pool="my-workload-identity-pool" \
            --provider="my-provider"

POSITIONAL ARGUMENTS
     Workload identity pool provider key resource - The workload identity pool
     provider key to describe. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the workload identity pool provider key or fully qualified
          identifier for the workload identity pool provider key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID for the provider, which becomes the final component of the
          resource name. This value must be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

### gcloud iam workload-identity-pools providers keys list

```text
NAME
    gcloud iam workload-identity-pools providers keys list - list workload
        identity pool provider keys

SYNOPSIS
    gcloud iam workload-identity-pools providers keys list
        (--provider=PROVIDER : --location=LOCATION
          --workload-identity-pool=WORKLOAD_IDENTITY_POOL) [--show-deleted]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List workload identity pool provider keys.

EXAMPLES
    The following command lists all keys in the workload identity pool
    provider, including soft-deleted keys:

        $ gcloud iam workload-identity-pools providers keys list \
            --workload-identity-pool="my-workload-identity-pool" \
            --provider="my-provider" --location="global" --show-deleted

REQUIRED FLAGS
     Workload identity pool provider resource - The parent workload identity
     pool provider to list keys for. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --provider on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --provider=PROVIDER
          ID of the workload identity pool provider or fully qualified
          identifier for the workload identity pool provider.

          To set the provider attribute:
          + provide the argument --provider on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument --provider on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument --provider on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

FLAGS
     --show-deleted
        Whether to return soft-deleted resources.

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

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

### gcloud iam workload-identity-pools providers keys operations describe

```text
NAME
    gcloud iam workload-identity-pools providers keys operations describe -
        describe a workload identity pool provider key operation

SYNOPSIS
    gcloud iam workload-identity-pools providers keys operations describe
        (OPERATION : --key=KEY --location=LOCATION
          --provider=PROVIDER --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a workload identity pool provider key operation.

EXAMPLES
    To describe the long-running workload identity pool provider key operation
    with the ID my-operation, run:

        $ gcloud iam workload-identity-pools providers keys operations \
            describe my-operation --workload-identity-pool="my-pool" \
            --provider="my-provider" --key="my-key" --location="global"

POSITIONAL ARGUMENTS
     Workload identity pool provider key operation resource - The workload
     identity pool provider key long-running operation to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument operation on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OPERATION
          ID of the workload identity pool provider key operation or fully
          qualified identifier for the workload identity pool provider key
          operation.

          To set the operation attribute:
          + provide the argument operation on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --key=KEY
          The ID for the key, which becomes the final component of the resource
          name. This value must be 4-32 characters, and may contain the
          characters [a-z0-9-]. The prefix gcp- is reserved for use by Google,
          and may not be specified.

          To set the key attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --key on the command line.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID for the provider, which becomes the final component of the
          resource name. This value must be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument operation on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

### gcloud iam workload-identity-pools providers keys undelete

```text
NAME
    gcloud iam workload-identity-pools providers keys undelete - undelete a
        workload identity pool provider key

SYNOPSIS
    gcloud iam workload-identity-pools providers keys undelete
        (KEY : --location=LOCATION
          --provider=PROVIDER --workload-identity-pool=WORKLOAD_IDENTITY_POOL)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Undelete a workload identity pool provider key.

EXAMPLES
    The following command undeletes a workload identity pool provider key in
    the default project with the ID my-key.

        $ gcloud iam workload-identity-pools providers keys undelete \
            my-key --location="global" \
            --workload-identity-pool="my-workload-identity-pool" \
            --provider="my-provider"

POSITIONAL ARGUMENTS
     Workload identity pool provider key resource - The workload identity pool
     provider key to undelete. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument key on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       KEY
          ID of the workload identity pool provider key or fully qualified
          identifier for the workload identity pool provider key.

          To set the key attribute:
          + provide the argument key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --provider=PROVIDER
          The ID for the provider, which becomes the final component of the
          resource name. This value must be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the provider attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --provider on the command line.

       --workload-identity-pool=WORKLOAD_IDENTITY_POOL
          The ID to use for the pool, which becomes the final component of the
          resource name. This value should be 4-32 characters, and may contain
          the characters [a-z0-9-]. The prefix gcp- is reserved for use by
          Google, and may not be specified.

          To set the workload-identity-pool attribute:
          + provide the argument key on the command line with a fully
            specified name;
          + provide the argument --workload-identity-pool on the command
            line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/workload-identity-pools/providers/keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
