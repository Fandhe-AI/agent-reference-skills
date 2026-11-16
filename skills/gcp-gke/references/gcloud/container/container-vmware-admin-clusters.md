---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/admin-clusters
---

# gcloud container vmware admin-clusters

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container vmware admin-clusters describe

```text
NAME
    gcloud container vmware admin-clusters describe - describe an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud container vmware admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Anthos on VMware admin cluster.

EXAMPLES
    To describe an admin cluster named my-cluster managed in location us-west1,
    run:

        $ gcloud container vmware admin-clusters describe my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to describe The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware admin-clusters describe

        $ gcloud beta container vmware admin-clusters describe
```

### gcloud container vmware admin-clusters enroll

```text
NAME
    gcloud container vmware admin-clusters enroll - enroll an Anthos on VMware
        admin cluster

SYNOPSIS
    gcloud container vmware admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enroll an Anthos on VMware admin cluster.

EXAMPLES
    To enroll a cluster named my-cluster managed in location us-west1 with
    admin cluster membership of
    projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership,
    run:

        $ gcloud container vmware admin-clusters enroll my-cluster \
            --location=us-west1 \
            --admin-cluster-membership=projects/my-project/locations/\
        us-west1/memberships/my-admin-cluster-membership

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to enroll The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

REQUIRED FLAGS
     Admin cluster membership resource - membership of the admin cluster.
     Membership can be the membership ID or the full resource name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --admin-cluster-membership on the command line
        with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          ID of the admin_cluster_membership or fully qualified identifier for
          the admin_cluster_membership.

          To set the admin_cluster_membership attribute:
          + provide the argument --admin-cluster-membership on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global"
          Google Cloud location for the admin_cluster_membership.

          To set the location attribute:
          + provide the argument --admin-cluster-membership on the command
            line with a fully specified name;
          + provide the argument --admin-cluster-membership-location on the
            command line.

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

NOTES
    These variants are also available:

        $ gcloud alpha container vmware admin-clusters enroll

        $ gcloud beta container vmware admin-clusters enroll
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud container vmware admin-clusters enroll my-cluster \
    --location=us-west1 \
    --admin-cluster-membership=projects/my-project/locations/us-west1/memberships/my-admin-cluster-membership
```

### gcloud container vmware admin-clusters list

```text
NAME
    gcloud container vmware admin-clusters list - list Anthos on VMware admin
        clusters

SYNOPSIS
    gcloud container vmware admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Anthos on VMware admin clusters.

EXAMPLES
    To list all admin clusters managed in location us-west1, run:

        $ gcloud container vmware admin-clusters list --location=us-west1

FLAGS
     Location resource - Google Cloud location to list Anthos on VMware admin
     clusters. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property container_vmware/location with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property container_vmware/location.

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

        $ gcloud alpha container vmware admin-clusters list

        $ gcloud beta container vmware admin-clusters list
```

### gcloud container vmware admin-clusters unenroll

```text
NAME
    gcloud container vmware admin-clusters unenroll - unenroll an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud container vmware admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Unenroll an Anthos on VMware admin cluster.

EXAMPLES
    To unenroll an admin cluster named my-cluster managed in location us-west1,
    run:

        $ gcloud container vmware admin-clusters unenroll my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to unenroll The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

FLAGS
     --allow-missing
        If set, and the VMware Cluster is not found, the request will succeed
        but no action will be taken on the server and return a completed LRO.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --ignore-errors
        If set, the unenrollment of a VMware admin cluster resource will
        succeed even if errors occur during deletion.

     --validate-only
        If set, only validate the request, but do not actually perform the
        operation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware admin-clusters unenroll

        $ gcloud beta container vmware admin-clusters unenroll
```

### gcloud container vmware admin-clusters update

```text
NAME
    gcloud container vmware admin-clusters update - update an Anthos on VMware
        admin cluster

SYNOPSIS
    gcloud container vmware admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--required-platform-version=REQUIRED_PLATFORM_VERSION]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an Anthos on VMware admin cluster.

EXAMPLES
    To update a cluster named my-cluster managed in location us-west1, run:

        $ gcloud container vmware admin-clusters update my-cluster \
            --location=us-west1

POSITIONAL ARGUMENTS
     Admin cluster resource - admin cluster to update The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument admin_cluster on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ADMIN_CLUSTER
          ID of the admin_cluster or fully qualified identifier for the
          admin_cluster.

          To set the admin_cluster attribute:
          + provide the argument admin_cluster on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Google Cloud location for the admin_cluster.

          To set the location attribute:
          + provide the argument admin_cluster on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property container_vmware/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --required-platform-version=REQUIRED_PLATFORM_VERSION
        Platform version required for upgrading an admin cluster or a user
        cluster. If the current platform version is lower than the required
        version, the platform version will be updated to the required version.
        If it is not installed in the platform, download the required version
        bundle.

     --version=VERSION
        Anthos Cluster on VMware version for the cluster resource

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container vmware admin-clusters update

        $ gcloud beta container vmware admin-clusters update
```

### gcloud beta container vmware admin-clusters describe

```text
NAME
    gcloud beta container vmware admin-clusters describe - describe an Anthos
        on VMware admin cluster

SYNOPSIS
    gcloud beta container vmware admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware admin-clusters enroll

```text
NAME
    gcloud beta container vmware admin-clusters enroll - enroll an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud beta container vmware admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware admin-clusters list

```text
NAME
    gcloud beta container vmware admin-clusters list - list Anthos on VMware
        admin clusters

SYNOPSIS
    gcloud beta container vmware admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware admin-clusters unenroll

```text
NAME
    gcloud beta container vmware admin-clusters unenroll - unenroll an Anthos
        on VMware admin cluster

SYNOPSIS
    gcloud beta container vmware admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container vmware admin-clusters update

```text
NAME
    gcloud beta container vmware admin-clusters update - update an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud beta container vmware admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--required-platform-version=REQUIRED_PLATFORM_VERSION]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware admin-clusters describe

```text
NAME
    gcloud alpha container vmware admin-clusters describe - describe an Anthos
        on VMware admin cluster

SYNOPSIS
    gcloud alpha container vmware admin-clusters describe
        (ADMIN_CLUSTER : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware admin-clusters enroll

```text
NAME
    gcloud alpha container vmware admin-clusters enroll - enroll an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud alpha container vmware admin-clusters enroll
        (ADMIN_CLUSTER : --location=LOCATION)
        (--admin-cluster-membership=ADMIN_CLUSTER_MEMBERSHIP
          : --admin-cluster-membership-location=ADMIN_CLUSTER_MEMBERSHIP_LOCATION; default="global")
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware admin-clusters list

```text
NAME
    gcloud alpha container vmware admin-clusters list - list Anthos on VMware
        admin clusters

SYNOPSIS
    gcloud alpha container vmware admin-clusters list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware admin-clusters unenroll

```text
NAME
    gcloud alpha container vmware admin-clusters unenroll - unenroll an Anthos
        on VMware admin cluster

SYNOPSIS
    gcloud alpha container vmware admin-clusters unenroll
        (ADMIN_CLUSTER : --location=LOCATION) [--allow-missing] [--async]
        [--ignore-errors] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container vmware admin-clusters update

```text
NAME
    gcloud alpha container vmware admin-clusters update - update an Anthos on
        VMware admin cluster

SYNOPSIS
    gcloud alpha container vmware admin-clusters update
        (ADMIN_CLUSTER : --location=LOCATION) [--async]
        [--required-platform-version=REQUIRED_PLATFORM_VERSION]
        [--version=VERSION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/admin-clusters (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
