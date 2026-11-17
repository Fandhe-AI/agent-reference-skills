---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/update
---

# gcloud compute interconnects update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute interconnects update

```text
NAME
    gcloud compute interconnects update - update a Compute Engine interconnect

SYNOPSIS
    gcloud compute interconnects update NAME [--admin-enabled]
        [--description=DESCRIPTION] [--location=LOCATION]
        [--noc-contact-email=NOC_CONTACT_EMAIL]
        [--requested-link-count=REQUESTED_LINK_COUNT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute interconnects update is used to update interconnects. An
    interconnect represents a single specific connection between Google and the
    customer.

POSITIONAL ARGUMENTS
     NAME
        Name of the interconnect to update.

FLAGS
     --admin-enabled
        Administrative status of the interconnect. When this is enabled, the
        interconnect is operational and will carry traffic across any
        functioning linked interconnect attachments. Use --no-admin-enabled to
        disable it.

     --description=DESCRIPTION
        An optional, textual description for the interconnect.

     --location=LOCATION
        The location for the interconnect. The locations can be listed by using
        the gcloud compute interconnects locations list command to find the
        appropriate location to use when creating an interconnect.

     --noc-contact-email=NOC_CONTACT_EMAIL
        Email address to contact the customer NOC for operations and
        maintenance notifications regarding this interconnect.

     --requested-link-count=REQUESTED_LINK_COUNT
        Target number of physical links in the link bundle.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute interconnects update

        $ gcloud beta compute interconnects update
```

### gcloud beta compute interconnects update

```text
NAME
    gcloud beta compute interconnects update - update a Compute Engine
        interconnect

SYNOPSIS
    gcloud beta compute interconnects update NAME [--admin-enabled]
        [--description=DESCRIPTION] [--location=LOCATION]
        [--noc-contact-email=NOC_CONTACT_EMAIL]
        [--requested-link-count=REQUESTED_LINK_COUNT]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute interconnects update

```text
NAME
    gcloud alpha compute interconnects update - update a Compute Engine
        interconnect

SYNOPSIS
    gcloud alpha compute interconnects update NAME [--admin-enabled]
        [--description=DESCRIPTION] [--location=LOCATION]
        [--noc-contact-email=NOC_CONTACT_EMAIL]
        [--requested-link-count=REQUESTED_LINK_COUNT]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/interconnects/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
