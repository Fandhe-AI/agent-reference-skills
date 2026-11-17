---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/image-views
---

# gcloud compute image-views

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute image-views describe

```text
NAME
    gcloud compute image-views describe - describe a Compute Engine image-view
        resource

SYNOPSIS
    gcloud compute image-views describe (IMAGE_NAME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute image-views describe displays all data associated with the
    Compute Engine image-view resource.

EXAMPLES
    To describe an image-view resource named my-image-view in region
    us-central1:

        $ gcloud compute image-views describe my-image-view \
            --region=us-central1

POSITIONAL ARGUMENTS
     Image views resource - Name of the image-view resource to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument image_name on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       IMAGE_NAME
          ID of the image_views or fully qualified identifier for the
          image_views.

          To set the image_name attribute:
          + provide the argument image_name on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The name of the Google Compute Engine region.

          To set the region attribute:
          + provide the argument image_name on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property compute/region.

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

        $ gcloud alpha compute image-views describe

        $ gcloud beta compute image-views describe
```

### gcloud compute image-views list

```text
NAME
    gcloud compute image-views list - list Compute Engine image-view resources

SYNOPSIS
    gcloud compute image-views list [NAME ...] [--endpoint-mode=ENDPOINT_MODE]
        [--preview-images] [--regexp=REGEXP, -r REGEXP] [--region=REGION]
        [--show-deprecated] [--no-standard-images] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute image-views list lists Compute Engine image-view resources
    in a given project and region.

    By default, image views from both the current project and public image
    projects (e.g. debian-cloud, ubuntu-os-cloud) are listed. Use
    --no-standard-images to list only image views from the current project.

EXAMPLES
    To list all image-view resources in a project in region us-central1:

        $ gcloud compute image-views list --region=us-central1

    To list all image-view resources with a specific source disk in region
    us-central1:

        $ gcloud compute image-views list --region=us-central1 \
            --filter="image.sourceDisk:test-disk-us-central1-ir1"

POSITIONAL ARGUMENTS
     [NAME ...]
        (DEPRECATED) If provided, show details for the specified names and/or
        URIs of resources.

        Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )"
        instead.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --preview-images
        Show image views that are in limited preview. The preview image
        projects are: (none)

     --regexp=REGEXP, -r REGEXP
        (DEPRECATED) Regular expression to filter the names of the results on.
        Any names that do not match the entire regular expression will be
        filtered out.

        Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.

     --region=REGION
        The region of the image-view resources to list. Overrides the default
        compute/region property value for this command invocation.

     --show-deprecated
        If provided, deprecated images are shown.

     --standard-images
        List image views from public image projects. The public image projects
        that are available include the following: cos-cloud, debian-cloud,
        rocky-linux-cloud, ubuntu-os-cloud, almalinux-cloud, centos-cloud,
        fedora-coreos-cloud, opensuse-cloud, oracle-linux-cloud, rhel-cloud,
        rhel-sap-cloud, rocky-linux-accelerator-cloud, suse-cloud,
        suse-sap-cloud, ubuntu-os-accelerator-images, ubuntu-os-pro-cloud,
        windows-cloud, windows-sql-cloud. Enabled by default, use
        --no-standard-images to disable.

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

        $ gcloud alpha compute image-views list

        $ gcloud beta compute image-views list
```

### gcloud beta compute image-views describe

```text
NAME
    gcloud beta compute image-views describe - describe a Compute Engine
        image-view resource

SYNOPSIS
    gcloud beta compute image-views describe (IMAGE_NAME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute image-views list

```text
NAME
    gcloud beta compute image-views list - list Compute Engine image-view
        resources

SYNOPSIS
    gcloud beta compute image-views list [NAME ...]
        [--endpoint-mode=ENDPOINT_MODE] [--preview-images]
        [--regexp=REGEXP, -r REGEXP] [--region=REGION] [--show-deprecated]
        [--no-standard-images] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute image-views describe

```text
NAME
    gcloud alpha compute image-views describe - describe a Compute Engine
        image-view resource

SYNOPSIS
    gcloud alpha compute image-views describe (IMAGE_NAME : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute image-views list

```text
NAME
    gcloud alpha compute image-views list - list Compute Engine image-view
        resources

SYNOPSIS
    gcloud alpha compute image-views list [NAME ...]
        [--endpoint-mode=ENDPOINT_MODE] [--preview-images]
        [--regexp=REGEXP, -r REGEXP] [--region=REGION] [--show-deprecated]
        [--no-standard-images] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated (quoted from the 593.0.0 help; the migration target is the one the help names): `gcloud compute image-views list NAME`: "Argument NAME is deprecated. Use --filter="name=( 'NAME' ... )" instead."; `gcloud compute image-views list --regexp`: "Flag --regexp is deprecated. Use --filter="name~'REGEXP'" instead.".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/image-views (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
