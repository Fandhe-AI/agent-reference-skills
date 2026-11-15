---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys
---

# gcloud iam service-accounts keys

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud iam service-accounts keys create

```text
NAME
    gcloud iam service-accounts keys create - create a service account key

SYNOPSIS
    gcloud iam service-accounts keys create OUTPUT-FILE
        --iam-account=IAM_ACCOUNT
        [--key-file-type=KEY_FILE_TYPE; default="json"] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To create a new service account key and save the private portion of the key
    locally, run:

        $ gcloud iam service-accounts keys create key.json \
            --iam-account=my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     OUTPUT-FILE
        The path where the resulting private key should be written. File system
        write permission will be checked on the specified path prior to the key
        creation.

REQUIRED FLAGS
     --iam-account=IAM_ACCOUNT
        The service account for which to create a key.

        To list all service accounts in the project, run:

            $ gcloud iam service-accounts list

OPTIONAL FLAGS
     --key-file-type=KEY_FILE_TYPE; default="json"
        The type of key to create. KEY_FILE_TYPE must be one of: json, p12.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    The option --key-file-type=p12 is available here only for legacy reasons;
    all new use cases are encouraged to use the default 'json' format.

    These variants are also available:

        $ gcloud alpha iam service-accounts keys create

        $ gcloud beta iam service-accounts keys create
```

### gcloud iam service-accounts keys delete

```text
NAME
    gcloud iam service-accounts keys delete - delete a service account key

SYNOPSIS
    gcloud iam service-accounts keys delete KEY-ID --iam-account=IAM_ACCOUNT
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To delete a key with ID b4f1037aeef9ab37deee9 for the service account
    my-iam-account@my-project.iam.gserviceaccount.com, run:

        $ gcloud iam service-accounts keys delete b4f1037aeef9ab37deee9 \
            --iam-account=my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     KEY-ID
        The key to delete.

REQUIRED FLAGS
     --iam-account=IAM_ACCOUNT
        The service account from which to delete a key.

        To list all service accounts in the project, run:

            $ gcloud iam service-accounts list

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts keys delete

        $ gcloud beta iam service-accounts keys delete
```

### gcloud iam service-accounts keys disable

```text
NAME
    gcloud iam service-accounts keys disable - disable a service account key

SYNOPSIS
    gcloud iam service-accounts keys disable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable a service account key.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To disable a key with ID b4f1037aeef9ab37deee9 for the service account
    my-iam-account@my-project.iam.gserviceaccount.com, run:

        gcloud iam service-accounts keys disable b4f1037aeef9ab37deee9 --iam-account=my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     IamKey resource - The id of the key to disable. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument iam_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IAM_KEY
          ID of the iamKey or fully qualified identifier for the iamKey.

          To set the iam_key attribute:
          + provide the argument iam_key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --iam-account=IAM_ACCOUNT
          The name of the IAM ServiceAccount.

          To set the iam-account attribute:
          + provide the argument iam_key on the command line with a fully
            specified name;
          + provide the argument --iam-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts keys disable

        $ gcloud beta iam service-accounts keys disable
```

### gcloud iam service-accounts keys enable

```text
NAME
    gcloud iam service-accounts keys enable - enable a service account key

SYNOPSIS
    gcloud iam service-accounts keys enable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enable a service account key.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To enable a key with ID b4f1037aeef9ab37deee9 for the service account
    my-iam-account@my-project.iam.gserviceaccount.com, run:

        gcloud iam service-accounts keys enable b4f1037aeef9ab37deee9 --iam-account=my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     IamKey resource - The id of the key to disable. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument iam_key on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IAM_KEY
          ID of the iamKey or fully qualified identifier for the iamKey.

          To set the iam_key attribute:
          + provide the argument iam_key on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --iam-account=IAM_ACCOUNT
          The name of the IAM ServiceAccount.

          To set the iam-account attribute:
          + provide the argument iam_key on the command line with a fully
            specified name;
          + provide the argument --iam-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts keys enable

        $ gcloud beta iam service-accounts keys enable
```

### gcloud iam service-accounts keys list

```text
NAME
    gcloud iam service-accounts keys list - list the keys for a service account

SYNOPSIS
    gcloud iam service-accounts keys list --iam-account=IAM_ACCOUNT
        [--created-before=CREATED_BEFORE]
        [--managed-by=MANAGED_BY; default="any"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    To list all user-managed keys created before noon on July 19th, 2015 (to
    perform key rotation, for example), run:

        $ gcloud iam service-accounts keys list \
            --iam-account=my-iam-account@my-project.iam.gserviceaccount.com \
        --managed-by=user --created-before=2015-07-19T12:00:00Z

REQUIRED FLAGS
     --iam-account=IAM_ACCOUNT
        A textual name to display for the account.

FLAGS
     --created-before=CREATED_BEFORE
        Return only keys created before the specified time. Common time formats
        are accepted. This is equivalent to
        --filter="validAfterTime<DATE_TIME". See $ gcloud topic datetimes for
        information on time formats.

     --managed-by=MANAGED_BY; default="any"
        The types of keys to list. MANAGED_BY must be one of: user, system,
        any.

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

        $ gcloud alpha iam service-accounts keys list

        $ gcloud beta iam service-accounts keys list
```

### gcloud iam service-accounts keys upload

```text
NAME
    gcloud iam service-accounts keys upload - upload a public key for an IAM
        service account

SYNOPSIS
    gcloud iam service-accounts keys upload PUBLIC_KEY_FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upload a public key for an IAM service account.

    If the service account does not exist, this command returns a
    PERMISSION_DENIED error.

EXAMPLES
    The following command uploads a public key certificate to a service
    account:        gcloud iam service-accounts keys upload test_data/public_key.cert --iam-account=my-iam-account@my-project.iam.gserviceaccount.com

POSITIONAL ARGUMENTS
     PUBLIC_KEY_FILE
        Path of the file containing the public key. Note that only public key
        data in the format of RSA_X509_PEM is supported. See
        https://cloud.google.com/iot/docs/concepts/device-security#public_key_format
        for more information.

REQUIRED FLAGS
     IamAccount resource - The service account for which to upload a key. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --iam-account on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --iam-account=IAM_ACCOUNT
          ID of the iamAccount or fully qualified identifier for the
          iamAccount.

          To set the iam-account attribute:
          + provide the argument --iam-account on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the iam/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/iam/

NOTES
    These variants are also available:

        $ gcloud alpha iam service-accounts keys upload

        $ gcloud beta iam service-accounts keys upload
```

### gcloud beta iam service-accounts keys create

```text
NAME
    gcloud beta iam service-accounts keys create - create a service account key

SYNOPSIS
    gcloud beta iam service-accounts keys create OUTPUT-FILE
        --iam-account=IAM_ACCOUNT
        [--key-file-type=KEY_FILE_TYPE; default="json"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys delete

```text
NAME
    gcloud beta iam service-accounts keys delete - delete a service account key

SYNOPSIS
    gcloud beta iam service-accounts keys delete KEY-ID
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys disable

```text
NAME
    gcloud beta iam service-accounts keys disable - disable a service account
        key

SYNOPSIS
    gcloud beta iam service-accounts keys disable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys enable

```text
NAME
    gcloud beta iam service-accounts keys enable - enable a service account key

SYNOPSIS
    gcloud beta iam service-accounts keys enable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys get-public-key

```text
NAME
    gcloud beta iam service-accounts keys get-public-key - get the public key
        for a service account key pair

SYNOPSIS
    gcloud beta iam service-accounts keys get-public-key KEY-ID
        --iam-account=IAM_ACCOUNT --output-file=OUTPUT_FILE
        [--type=TYPE; default="pem"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys list

```text
NAME
    gcloud beta iam service-accounts keys list - list the keys for a service
        account

SYNOPSIS
    gcloud beta iam service-accounts keys list --iam-account=IAM_ACCOUNT
        [--created-before=CREATED_BEFORE]
        [--managed-by=MANAGED_BY; default="any"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta iam service-accounts keys upload

```text
NAME
    gcloud beta iam service-accounts keys upload - upload a public key for an
        IAM service account

SYNOPSIS
    gcloud beta iam service-accounts keys upload PUBLIC_KEY_FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys config export

```text
NAME
    gcloud alpha iam service-accounts keys config export - export the
        configuration for a Iam key

SYNOPSIS
    gcloud alpha iam service-accounts keys config export
        ([IAM_KEY : --iam-account=IAM_ACCOUNT] --all)
        [--path=PATH; default="-"] [--resource-format=RESOURCE_FORMAT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys create

```text
NAME
    gcloud alpha iam service-accounts keys create - create a service account
        key

SYNOPSIS
    gcloud alpha iam service-accounts keys create OUTPUT-FILE
        --iam-account=IAM_ACCOUNT
        [--key-file-type=KEY_FILE_TYPE; default="json"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys delete

```text
NAME
    gcloud alpha iam service-accounts keys delete - delete a service account
        key

SYNOPSIS
    gcloud alpha iam service-accounts keys delete KEY-ID
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys disable

```text
NAME
    gcloud alpha iam service-accounts keys disable - disable a service account
        key

SYNOPSIS
    gcloud alpha iam service-accounts keys disable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys enable

```text
NAME
    gcloud alpha iam service-accounts keys enable - enable a service account
        key

SYNOPSIS
    gcloud alpha iam service-accounts keys enable
        (IAM_KEY : --iam-account=IAM_ACCOUNT) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys get-public-key

```text
NAME
    gcloud alpha iam service-accounts keys get-public-key - get the public key
        for a service account key pair

SYNOPSIS
    gcloud alpha iam service-accounts keys get-public-key KEY-ID
        --iam-account=IAM_ACCOUNT --output-file=OUTPUT_FILE
        [--type=TYPE; default="pem"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys list

```text
NAME
    gcloud alpha iam service-accounts keys list - list the keys for a service
        account

SYNOPSIS
    gcloud alpha iam service-accounts keys list --iam-account=IAM_ACCOUNT
        [--created-before=CREATED_BEFORE]
        [--managed-by=MANAGED_BY; default="any"] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha iam service-accounts keys upload

```text
NAME
    gcloud alpha iam service-accounts keys upload - upload a public key for an
        IAM service account

SYNOPSIS
    gcloud alpha iam service-accounts keys upload PUBLIC_KEY_FILE
        --iam-account=IAM_ACCOUNT [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
