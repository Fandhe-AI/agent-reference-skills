---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/ingress/update
---

# gcloud container fleet ingress update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet ingress update

```text
NAME
    gcloud container fleet ingress update - update Multi-cluster Ingress
        Feature

SYNOPSIS
    gcloud container fleet ingress update
        [--config-membership=CONFIG_MEMBERSHIP : --location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates Multi-cluster Ingress Feature in a fleet.

EXAMPLES
    To update the Ingress Feature, run:

        $ gcloud container fleet ingress update \
            --config-membership=CONFIG_MEMBERSHIP

FLAGS
     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --config-membership on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --config-membership=CONFIG_MEMBERSHIP
        ID of the membership or fully qualified identifier for the membership.

        To set the membership attribute:
        * provide the argument --config-membership on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --location=LOCATION
        Location for the membership.

        To set the location attribute:
        * provide the argument --config-membership on the command line with a
          fully specified name;
        * provide the argument --location on the command line;
        * set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet ingress update

        $ gcloud beta container fleet ingress update
```

### gcloud beta container fleet ingress update

```text
NAME
    gcloud beta container fleet ingress update - update Multi-cluster Ingress
        Feature

SYNOPSIS
    gcloud beta container fleet ingress update
        [--config-membership=CONFIG_MEMBERSHIP : --location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet ingress update

```text
NAME
    gcloud alpha container fleet ingress update - update Multi-cluster Ingress
        Feature

SYNOPSIS
    gcloud alpha container fleet ingress update
        [--config-membership=CONFIG_MEMBERSHIP : --location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/ingress/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
