---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/delete
---

# gcloud container hub identity-service delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub identity-service delete

```text
NAME
    gcloud container hub identity-service delete - delete a resource from the
        Identity Service Feature

SYNOPSIS
    gcloud container hub identity-service delete
        [--fleet-default-member-config]
        [--membership=MEMBERSHIP : --location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a resource from the Identity Service Feature.

EXAMPLES
    To delete the Identity Service configuration from a membership, run:

        $ gcloud container hub identity-service delete \
            --membership=MEMBERSHIP_NAME

    To delete the fleet-level default membership configuration, run:

        $ gcloud container hub identity-service delete \
            --fleet-default-member-config

FLAGS
     --fleet-default-member-config
        If specified, deletes the default membership configuration present in
        your fleet.

            To delete the default membership configuration present in your
            fleet, run:

            $ gcloud container hub identity-service delete \
            --fleet-default-member-config

     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --membership on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --membership=MEMBERSHIP
        ID of the membership or fully qualified identifier for the membership.

        To set the membership attribute:
        * provide the argument --membership on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --location=LOCATION
        Location for the membership.

        To set the location attribute:
        * provide the argument --membership on the command line with a fully
          specified name;
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

        $ gcloud alpha container hub identity-service delete

        $ gcloud beta container hub identity-service delete
```

### gcloud beta container hub identity-service delete

```text
NAME
    gcloud beta container hub identity-service delete - delete a resource from
        the Identity Service Feature

SYNOPSIS
    gcloud beta container hub identity-service delete
        [--fleet-default-member-config]
        [--membership=MEMBERSHIP : --location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub identity-service delete

```text
NAME
    gcloud alpha container hub identity-service delete - delete a resource from
        the Identity Service Feature

SYNOPSIS
    gcloud alpha container hub identity-service delete
        [--fleet-default-member-config]
        [--membership=MEMBERSHIP : --location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
