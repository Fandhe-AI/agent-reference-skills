---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/os-images
---

# gcloud bms os-images

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms os-images describe

```text
NAME
    gcloud bms os-images describe - describe Bare Metal Solution OS images in a
        project

SYNOPSIS
    gcloud bms os-images describe (OS_IMAGE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe Bare Metal Solution OS image in a project.

EXAMPLES
    To describe given OS image within the project, run:

        $ gcloud bms os-images describe my-os-image --project=my-project

POSITIONAL ARGUMENTS
     Os image resource - os_image. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument os_image on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       OS_IMAGE
          ID of the os_image or fully qualified identifier for the os_image.

          To set the os_image attribute:
          + provide the argument os_image on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument os_image on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + global is the only supported location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms os-images describe
```

### gcloud bms os-images list

```text
NAME
    gcloud bms os-images list - list Bare Metal Solution OS images in a project

SYNOPSIS
    gcloud bms os-images list [--filter=EXPRESSION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution OS images in a project.

EXAMPLES
    To list all OS images within the project, run:

        $ gcloud bms os-images list

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms os-images list
```

### gcloud alpha bms os-images describe

```text
NAME
    gcloud alpha bms os-images describe - describe Bare Metal Solution OS
        images in a project

SYNOPSIS
    gcloud alpha bms os-images describe (OS_IMAGE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms os-images list

```text
NAME
    gcloud alpha bms os-images list - list Bare Metal Solution OS images in a
        project

SYNOPSIS
    gcloud alpha bms os-images list [--filter=EXPRESSION] [--limit=LIMIT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/os-images (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
