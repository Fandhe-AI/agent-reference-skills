---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-instances
---

# gcloud compute target-instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute target-instances create

```text
NAME
    gcloud compute target-instances create - create a target instance for
        handling traffic from a forwarding rule

SYNOPSIS
    gcloud compute target-instances create NAME --instance=INSTANCE
        [--description=DESCRIPTION] [--instance-zone=INSTANCE_ZONE]
        [--network=NETWORK] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-instances create is used to create a target instance
    for handling traffic from one or more forwarding rules. Target instances
    are ideal for traffic that should be managed by a single source. For more
    information on target instances, see
    https://cloud.google.com/compute/docs/protocol-forwarding/#targetinstances

POSITIONAL ARGUMENTS
     NAME
        Name of the target instance to operate on.

REQUIRED FLAGS
     --instance=INSTANCE
        The name of the virtual machine instance that will handle the traffic.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description of the target instance.

     --instance-zone=INSTANCE_ZONE
        Zone of the instance to operate on. If not specified, it will be set to
        the same as zone. Overrides the default compute/zone property value for
        this command invocation.

     --network=NETWORK
        Network that this target instance applies to. This is only necessary if
        the corresponding instance has multiple network interfaces. If not
        specified, the default network interface will be used.

     --zone=ZONE
        Zone of the target instance to operate on. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-instances create

        $ gcloud beta compute target-instances create
```

### gcloud compute target-instances delete

```text
NAME
    gcloud compute target-instances delete - delete target instances

SYNOPSIS
    gcloud compute target-instances delete NAME [NAME ...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-instances delete deletes one or more Compute Engine
    target instances. Target instances can be deleted only if they are not
    being used by any other resources like forwarding rules.

POSITIONAL ARGUMENTS
     NAME [NAME ...]
        Names of the target instances to delete.

FLAGS
     --zone=ZONE
        Zone of the target instances to delete. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-instances delete

        $ gcloud beta compute target-instances delete
```

### gcloud compute target-instances describe

```text
NAME
    gcloud compute target-instances describe - describe a target instance

SYNOPSIS
    gcloud compute target-instances describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-instances describe displays all data associated with
    a Compute Engine target instance in a project.

POSITIONAL ARGUMENTS
     NAME
        Name of the target instance to describe.

FLAGS
     --zone=ZONE
        Zone of the target instance to describe. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-instances describe

        $ gcloud beta compute target-instances describe
```

### gcloud compute target-instances list

```text
NAME
    gcloud compute target-instances list - list Google Compute Engine target
        instances

SYNOPSIS
    gcloud compute target-instances list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--zones=ZONE,[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-instances list displays all Google Compute Engine
    target instances in a project.

    By default, target instances from all zones are listed. The results can be
    narrowed down using a filter: --filter="zone:( ZONE ... )".

EXAMPLES
    To list all target instances in a project in table form, run:

        $ gcloud compute target-instances list

    To list the URIs of all target instances in a project, run:

        $ gcloud compute target-instances list --uri

    To list all target instances in the us-central1-b and europe-west1-d zones,
    run:

        $ gcloud compute target-instances list \
            --filter="zone:( us-central1-b europe-west1-d )"

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

     --zones=ZONE,[ZONE,...]
        If provided, only resources from the given zones are queried.

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

        $ gcloud alpha compute target-instances list

        $ gcloud beta compute target-instances list
```

### gcloud compute target-instances update

```text
NAME
    gcloud compute target-instances update - update a Compute Engine target
        instance

SYNOPSIS
    gcloud compute target-instances update NAME
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute target-instances update updates a Compute Engine target
    instance.

EXAMPLES
    To update the security policy run this:

        $ gcloud compute target-instances update TARGET_INSTANCE \
            --security-policy='my-policy'

POSITIONAL ARGUMENTS
     NAME
        Name of the target instance to update.

FLAGS
     --security-policy=SECURITY_POLICY
        The security policy that will be set for this target instance. To
        remove the policy from this target instance set the policy to an empty
        string.

     --security-policy-region=SECURITY_POLICY_REGION
        Region of the security policy to operate on. Overrides the default
        compute/region property value for this command invocation.

     --zone=ZONE
        Zone of the target instance to update. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute target-instances update

        $ gcloud beta compute target-instances update
```

### gcloud beta compute target-instances create

```text
NAME
    gcloud beta compute target-instances create - create a target instance for
        handling traffic from a forwarding rule

SYNOPSIS
    gcloud beta compute target-instances create NAME --instance=INSTANCE
        [--description=DESCRIPTION] [--instance-zone=INSTANCE_ZONE]
        [--network=NETWORK] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-instances delete

```text
NAME
    gcloud beta compute target-instances delete - delete target instances

SYNOPSIS
    gcloud beta compute target-instances delete NAME [NAME ...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-instances describe

```text
NAME
    gcloud beta compute target-instances describe - describe a target instance

SYNOPSIS
    gcloud beta compute target-instances describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-instances list

```text
NAME
    gcloud beta compute target-instances list - list Google Compute Engine
        target instances

SYNOPSIS
    gcloud beta compute target-instances list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--zones=ZONE,[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute target-instances update

```text
NAME
    gcloud beta compute target-instances update - update a Compute Engine
        target instance

SYNOPSIS
    gcloud beta compute target-instances update NAME
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances config export

```text
NAME
    gcloud alpha compute target-instances config export - export the
        configuration for a Compute Engine target instance

SYNOPSIS
    gcloud alpha compute target-instances config export
        ([TARGET_INSTANCE : --zone=ZONE] --all) [--path=PATH; default="-"]
        [--resource-format=RESOURCE_FORMAT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances create

```text
NAME
    gcloud alpha compute target-instances create - create a target instance for
        handling traffic from a forwarding rule

SYNOPSIS
    gcloud alpha compute target-instances create NAME --instance=INSTANCE
        [--description=DESCRIPTION] [--instance-zone=INSTANCE_ZONE]
        [--network=NETWORK] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances delete

```text
NAME
    gcloud alpha compute target-instances delete - delete target instances

SYNOPSIS
    gcloud alpha compute target-instances delete NAME [NAME ...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances describe

```text
NAME
    gcloud alpha compute target-instances describe - describe a target instance

SYNOPSIS
    gcloud alpha compute target-instances describe NAME [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances list

```text
NAME
    gcloud alpha compute target-instances list - list Google Compute Engine
        target instances

SYNOPSIS
    gcloud alpha compute target-instances list [NAME ...]
        [--regexp=REGEXP, -r REGEXP] [--zones=ZONE,[ZONE,...]]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances test-iam-permissions

```text
NAME
    gcloud alpha compute target-instances test-iam-permissions - test IAM
        permissions for a Compute Engine target instance

SYNOPSIS
    gcloud alpha compute target-instances test-iam-permissions
        (TARGET_INSTANCE : --zone=ZONE) --permissions=[PERMISSIONS,...]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute target-instances update

```text
NAME
    gcloud alpha compute target-instances update - update a Compute Engine
        target instance

SYNOPSIS
    gcloud alpha compute target-instances update NAME
        [--security-policy=SECURITY_POLICY]
        [--security-policy-region=SECURITY_POLICY_REGION] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute target-instances list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute target-instances list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
