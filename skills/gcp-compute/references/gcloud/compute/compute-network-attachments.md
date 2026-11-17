---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-attachments
---

# gcloud compute network-attachments

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-attachments create

```text
NAME
    gcloud compute network-attachments create - create a Google Compute Engine
        network attachment

SYNOPSIS
    gcloud compute network-attachments create NAME
        --subnets=SUBNETS,[SUBNETS,...]
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"] [--description=DESCRIPTION]
        [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets-region=SUBNETS_REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-attachments create is used to create network
    attachments. A service consumer creates network attachments and makes it
    available to producers. Service producers then use a multi-NIC VM to form a
    bi-directional, non-NAT'd communication channel.

EXAMPLES
        $ gcloud compute network-attachments create \
            NETWORK_ATTACHMENT_NAME --region=us-central1 \
            --subnets=MY_SUBNET --connection-preference=ACCEPT_MANUAL \
            --producer-accept-list=PROJECT1,PROJECT2 \
            --producer-reject-list=PROJECT3,PROJECT4

    To create a network attachment with a textual description, run:

        $ gcloud compute network-attachments create \
            NETWORK_ATTACHMENT_NAME --region=us-central1 \
            --subnets=MY_SUBNET --connection-preference=ACCEPT_MANUAL \
            --producer-accept-list=PROJECT1,PROJECT2 \
            --producer-reject-list=PROJECT3,PROJECT4 \
            --description='default network attachment'

POSITIONAL ARGUMENTS
     NAME
        Name of the network attachment to create.

REQUIRED FLAGS
     --subnets=SUBNETS,[SUBNETS,...]
        The subnetworks provided by the consumer for the producers

OPTIONAL FLAGS
     --connection-preference=CONNECTION_PREFERENCE; default="ACCEPT_AUTOMATIC"
        The connection preference of network attachment. The value can be set
        to ACCEPT_AUTOMATIC or ACCEPT_MANUAL. An ACCEPT_AUTOMATIC network
        attachment is one that always accepts the connection from producer NIC.
        An ACCEPT_MANUAL network attachment is one that requires an explicit
        addition of the producer project id or project number to the producer
        accept list. CONNECTION_PREFERENCE must be one of: ACCEPT_AUTOMATIC,
        ACCEPT_MANUAL.

     --description=DESCRIPTION
        An optional, textual description for the network attachment.

     --producer-accept-list=[ACCEPT_LIST,...]
        Projects that are allowed to connect to this network attachment.

     --producer-reject-list=[REJECT_LIST,...]
        Projects that are not allowed to connect to this network attachment.

     --region=REGION
        Region of the network attachment to create. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --subnets-region=SUBNETS_REGION
        Region of the subnetworks to operate on. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments create

        $ gcloud beta compute network-attachments create
```

### gcloud compute network-attachments delete

```text
NAME
    gcloud compute network-attachments delete - delete one or more Google
        Compute Engine network attachments

SYNOPSIS
    gcloud compute network-attachments delete NAME [NAME ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete one or more Google Compute Engine network attachments.

EXAMPLES
    To delete a network attachment, run:

        $ gcloud compute network-attachments delete \
          NETWORK_ATTACHMENT_NAME --region=us-central1

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the network attachments to delete.

FLAGS
     --region=REGION
        Region of the network attachments to delete. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments delete

        $ gcloud beta compute network-attachments delete
```

### gcloud compute network-attachments describe

```text
NAME
    gcloud compute network-attachments describe - describes a Google Compute
        Engine network attachment

SYNOPSIS
    gcloud compute network-attachments describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describes a Google Compute Engine network attachment.

EXAMPLES
    To describe a network attachment, run:

        $ gcloud compute network-attachments describe \
          NETWORK_ATTACHMENT_NAME --region=us-central1

POSITIONAL ARGUMENTS
     NAME
        Name of the network attachment to describe.

FLAGS
     --region=REGION
        Region of the network attachment to describe. If not specified, you
        might be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments describe

        $ gcloud beta compute network-attachments describe
```

### gcloud compute network-attachments list

```text
NAME
    gcloud compute network-attachments list - list Google Compute Engine
        network attachments

SYNOPSIS
    gcloud compute network-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Google Compute Engine network attachments.

EXAMPLES
    To list all the network attachments, run:

        $ gcloud compute network-attachments list

    To list the network attachments in given region(s), run:

        $ gcloud compute network-attachments list --regions=region-1,region-2

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --regions=REGION,[REGION,...]
        If provided, only resources from the given regions are queried.

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

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments list

        $ gcloud beta compute network-attachments list
```

### gcloud compute network-attachments set-iam-policy

```text
NAME
    gcloud compute network-attachments set-iam-policy - set the IAM policy for
        a Compute Engine network attachment

SYNOPSIS
    gcloud compute network-attachments set-iam-policy
        (NETWORK_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sets the IAM policy for the given network attachment as defined in a JSON
    or YAML file.

EXAMPLES
    The following command will read an IAM policy defined in a JSON file
    'policy.json' and set it for the network attachment my-network-attachment:

        $ gcloud compute network-attachments set-iam-policy \
            my-network-attachment --region=REGION policy.json

    See https://cloud.google.com/iam/docs/managing-policies for details of the
    policy file format and contents.

POSITIONAL ARGUMENTS
     Network attachment resource - The network attachment to set the IAM policy
     for. The arguments in this group can be used to specify the attributes of
     this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument network_attachment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK_ATTACHMENT
          ID of the network attachment or fully qualified identifier for the
          network attachment.

          To set the network_attachment attribute:
          + provide the argument network_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument network_attachment on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments set-iam-policy

        $ gcloud beta compute network-attachments set-iam-policy
```

### gcloud compute network-attachments test-iam-permissions

```text
NAME
    gcloud compute network-attachments test-iam-permissions - test IAM
        permissions for a Compute Engine network attachment

SYNOPSIS
    gcloud compute network-attachments test-iam-permissions
        (NETWORK_ATTACHMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Returns permissions that a caller has on the specified network attachment.

EXAMPLES
    To test if the caller has 'compute.networkAttachments.get' permission on a
    network attachment, run:

        $ gcloud compute network-attachments test-iam-permissions \
            my-network-attachment --region=`_REGION_` \
            --permissions=compute.networkAttachments.get

POSITIONAL ARGUMENTS
     Network attachment resource - The network attachment for which to test
     permissions. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument network_attachment on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NETWORK_ATTACHMENT
          ID of the network attachment or fully qualified identifier for the
          network attachment.

          To set the network_attachment attribute:
          + provide the argument network_attachment on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument network_attachment on the command line with
            a fully specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

REQUIRED FLAGS
     --permissions=[PERMISSIONS,...]
        Permissions to be tested.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments test-iam-permissions

        $ gcloud beta compute network-attachments test-iam-permissions
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute network-attachments test-iam-permissions my-network-attachment \
    --region='_REGION_' \
    --permissions=compute.networkAttachments.get
```

### gcloud compute network-attachments update

```text
NAME
    gcloud compute network-attachments update - update a Google Compute Engine
        network attachment

SYNOPSIS
    gcloud compute network-attachments update NAME [--description=DESCRIPTION]
        [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets=SUBNETS,[SUBNETS,...]] [--subnets-region=SUBNETS_REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-attachments update is used to update network
    attachments. You can update the following fields: description, subnets,
    producer-accept-list and producer-reject-list. If you update the
    producer-accept-list or producer-reject-list, the full new list should be
    specified.

EXAMPLES
    To update all the parameters with the new list, run:

        $ gcloud compute network-attachments update \
            NETWORK_ATTACHMENT_NAME --region=us-central1 \
            --subnets=MY_SUBNET2 \
            --description='default network attachment' \
            --producer-accept-list=PROJECT5,PROJECT6 \
            --producer-reject-list=PROJECT7,PROJECT8

    To update a network attachment to change only the subnet to MY_SUBNET3,
    run:

        $ gcloud compute network-attachments update \
            NETWORK_ATTACHMENT_NAME --region=us-central1 \
            --subnets=MY_SUBNET3

POSITIONAL ARGUMENTS
     NAME
        Name of the network attachment to update.

FLAGS
     --description=DESCRIPTION
        An optional, textual description for the network attachment.

     --producer-accept-list=[ACCEPT_LIST,...]
        Projects that are allowed to connect to this network attachment.

     --producer-reject-list=[REJECT_LIST,...]
        Projects that are not allowed to connect to this network attachment.

     --region=REGION
        Region of the network attachment to update. If not specified, you might
        be prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

     --subnets=SUBNETS,[SUBNETS,...]
        The subnetworks provided by the consumer for the producers

     --subnets-region=SUBNETS_REGION
        Region of the subnetworks to operate on. Overrides the default
        compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-attachments update

        $ gcloud beta compute network-attachments update
```

### gcloud beta compute network-attachments create

```text
NAME
    gcloud beta compute network-attachments create - create a Google Compute
        Engine network attachment

SYNOPSIS
    gcloud beta compute network-attachments create NAME
        --subnets=SUBNETS,[SUBNETS,...]
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"] [--description=DESCRIPTION]
        [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets-region=SUBNETS_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments delete

```text
NAME
    gcloud beta compute network-attachments delete - delete one or more Google
        Compute Engine network attachments

SYNOPSIS
    gcloud beta compute network-attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments describe

```text
NAME
    gcloud beta compute network-attachments describe - describes a Google
        Compute Engine network attachment

SYNOPSIS
    gcloud beta compute network-attachments describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments list

```text
NAME
    gcloud beta compute network-attachments list - list Google Compute Engine
        network attachments

SYNOPSIS
    gcloud beta compute network-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments set-iam-policy

```text
NAME
    gcloud beta compute network-attachments set-iam-policy - set the IAM policy
        for a Compute Engine network attachment

SYNOPSIS
    gcloud beta compute network-attachments set-iam-policy
        (NETWORK_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments test-iam-permissions

```text
NAME
    gcloud beta compute network-attachments test-iam-permissions - test IAM
        permissions for a Compute Engine network attachment

SYNOPSIS
    gcloud beta compute network-attachments test-iam-permissions
        (NETWORK_ATTACHMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute network-attachments update

```text
NAME
    gcloud beta compute network-attachments update - update a Google Compute
        Engine network attachment

SYNOPSIS
    gcloud beta compute network-attachments update NAME
        [--description=DESCRIPTION] [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets=SUBNETS,[SUBNETS,...]] [--subnets-region=SUBNETS_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments create

```text
NAME
    gcloud alpha compute network-attachments create - create a Google Compute
        Engine network attachment

SYNOPSIS
    gcloud alpha compute network-attachments create NAME
        --subnets=SUBNETS,[SUBNETS,...]
        [--connection-preference=CONNECTION_PREFERENCE;
          default="ACCEPT_AUTOMATIC"] [--description=DESCRIPTION]
        [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets-region=SUBNETS_REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments delete

```text
NAME
    gcloud alpha compute network-attachments delete - delete one or more Google
        Compute Engine network attachments

SYNOPSIS
    gcloud alpha compute network-attachments delete NAME [NAME ...]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments describe

```text
NAME
    gcloud alpha compute network-attachments describe - describes a Google
        Compute Engine network attachment

SYNOPSIS
    gcloud alpha compute network-attachments describe NAME [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments list

```text
NAME
    gcloud alpha compute network-attachments list - list Google Compute Engine
        network attachments

SYNOPSIS
    gcloud alpha compute network-attachments list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--regions=REGION,[REGION,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments set-iam-policy

```text
NAME
    gcloud alpha compute network-attachments set-iam-policy - set the IAM
        policy for a Compute Engine network attachment

SYNOPSIS
    gcloud alpha compute network-attachments set-iam-policy
        (NETWORK_ATTACHMENT : --region=REGION) POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments test-iam-permissions

```text
NAME
    gcloud alpha compute network-attachments test-iam-permissions - test IAM
        permissions for a Compute Engine network attachment

SYNOPSIS
    gcloud alpha compute network-attachments test-iam-permissions
        (NETWORK_ATTACHMENT : --region=REGION) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-attachments update

```text
NAME
    gcloud alpha compute network-attachments update - update a Google Compute
        Engine network attachment

SYNOPSIS
    gcloud alpha compute network-attachments update NAME
        [--description=DESCRIPTION] [--producer-accept-list=[ACCEPT_LIST,...]]
        [--producer-reject-list=[REJECT_LIST,...]] [--region=REGION]
        [--subnets=SUBNETS,[SUBNETS,...]] [--subnets-region=SUBNETS_REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute network-attachments list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute network-attachments list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-attachments (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
