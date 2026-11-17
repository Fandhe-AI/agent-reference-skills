---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/update
---

# gcloud compute images update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute images update

```text
NAME
    gcloud compute images update - update a Compute Engine image

SYNOPSIS
    gcloud compute images update IMAGE_NAME [--architecture=ARCHITECTURE]
        [--description=DESCRIPTION] [--family=FAMILY]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute images update updates labels for a Compute Engine image.

EXAMPLES
    To update labels k0 and k1 and remove labels with key k3, run:

        $ gcloud compute images update example-image \
            --update-labels=k0=value1,k1=value2 --remove-labels=k3

        k0 and k1 will be added as new labels if not already present.

    Labels can be used to identify the image and to filter them like:

        $ gcloud compute images list --filter='labels.k1:value2'

    To list only the labels when describing a resource, use --format:

        $ gcloud compute images describe example-image \
            --format="default(labels)"

POSITIONAL ARGUMENTS
     IMAGE_NAME
        Name of the disk image to update.

FLAGS
     --architecture=ARCHITECTURE
        Specifies the architecture or processor type that this image can
        support. For available processor types on Compute Engine, see
        https://cloud.google.com/compute/docs/cpu-platforms. ARCHITECTURE must
        be one of: ARM64, X86_64.

     --description=DESCRIPTION
        An optional text description for the image.

     --family=FAMILY
        Name of the image family to use. If an image family is specified when
        you create an instance or disk, the latest non-deprecated image in the
        family is used.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud compute images update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud compute images update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute images update

        $ gcloud beta compute images update
```

### gcloud beta compute images update

```text
NAME
    gcloud beta compute images update - update a Compute Engine image

SYNOPSIS
    gcloud beta compute images update IMAGE_NAME [--architecture=ARCHITECTURE]
        [--description=DESCRIPTION] [--family=FAMILY]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-user-licenses | --update-user-licenses=[LICENSE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images update

```text
NAME
    gcloud alpha compute images update - update a Compute Engine image

SYNOPSIS
    gcloud alpha compute images update IMAGE_NAME [--architecture=ARCHITECTURE]
        [--description=DESCRIPTION] [--family=FAMILY]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-user-licenses | --update-user-licenses=[LICENSE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/images/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
