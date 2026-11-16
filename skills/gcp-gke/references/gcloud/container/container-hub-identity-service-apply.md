---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/apply
---

# gcloud container hub identity-service apply

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub identity-service apply

```text
NAME
    gcloud container hub identity-service apply - update the Identity Service
        Feature

SYNOPSIS
    gcloud container hub identity-service apply
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          [(--config=CONFIG | --origin=ORIGIN)
          : [--membership=MEMBERSHIP : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command updates the Identity Service Feature in a fleet.

EXAMPLES
    To apply an Identity Service configuration to a membership, run:

        $ gcloud container hub identity-service apply \
            --membership=MEMBERSHIP_NAME \
            --config=/path/to/identity-service.yaml

    To create or modify a fleet-level default membership configuration, run:

        $ gcloud container hub identity-service apply \
            --fleet-default-member-config=/path/to/identity-service.yaml

    To apply an existing fleet-level default membership configuration to a
    membership, run:

        $ gcloud container hub identity-service apply --origin=fleet \
            --membership=MEMBERSHIP_NAME

REQUIRED FLAGS
     At least one of these must be specified:

       --fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          The path to an identity-service.yaml configuration file.

       Exactly one of these must be specified:

         --config=CONFIG
            The path to an identity-service.yaml configuration file.

         --origin=ORIGIN
            Applies the fleet-level default membership configuration to a
            membership. ORIGIN must be (only one value is supported): fleet.

       Membership resource - The group of arguments defining a membership. The
       arguments in this group can be used to specify the attributes of this
       resource. (NOTE) Some attributes are not given arguments in this group
       but can be set in other ways.

       To set the project attribute:
        + provide the argument --membership on the command line with a fully
          specified name;
        + provide the argument --project on the command line;
        + set the property core/project.

       --membership=MEMBERSHIP
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument --membership on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --location=LOCATION
          Location for the membership.

          To set the location attribute:
          + provide the argument --membership on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub identity-service apply

        $ gcloud beta container hub identity-service apply
```

### gcloud beta container hub identity-service apply

```text
NAME
    gcloud beta container hub identity-service apply - update the Identity
        Service Feature

SYNOPSIS
    gcloud beta container hub identity-service apply
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          [(--config=CONFIG | --origin=ORIGIN)
          : [--membership=MEMBERSHIP : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub identity-service apply

```text
NAME
    gcloud alpha container hub identity-service apply - update the Identity
        Service Feature

SYNOPSIS
    gcloud alpha container hub identity-service apply
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          [(--config=CONFIG | --origin=ORIGIN)
          : [--membership=MEMBERSHIP : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/identity-service/apply (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
