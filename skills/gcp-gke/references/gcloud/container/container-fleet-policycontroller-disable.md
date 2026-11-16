---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/disable
---

# gcloud container fleet policycontroller disable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet policycontroller disable

```text
NAME
    gcloud container fleet policycontroller disable - disable (Uninstall)
        Policy Controller

SYNOPSIS
    gcloud container fleet policycontroller disable
        [--fleet-default-member-config | --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Uninstalls Policy Controller.

EXAMPLES
    To uninstall Policy Controller, run:

        $ gcloud container fleet policycontroller disable

FLAGS
     At most one of these can be specified:

       --fleet-default-member-config
          Removes the fleet default configuration for policy controller.
          Memberships configured with the fleet default will maintain their
          current configuration.

              $ gcloud container fleet policycontroller disable \
              --fleet-default-member-config

       Or at most one of these can be specified:

         Membership flags.

         --all-memberships
            If supplied, apply to all Policy Controllers memberships in the
            fleet.

         Or at least one of these can be specified:

           Membership resource - The group of arguments defining one or more
           memberships. The arguments in this group can be used to specify the
           attributes of this resource. (NOTE) Some attributes are not given
           arguments in this group but can be set in other ways.

           To set the project attribute:
            o provide the argument --memberships on the command line with a
              fully specified name;
            o provide the argument --project on the command line;
            o set the property core/project.

           --memberships=[MEMBERSHIPS,...]
              IDs of the memberships or fully qualified identifiers for the
              memberships.

              To set the memberships attribute:
              o provide the argument --memberships on the command line.

              This flag argument must be specified if any of the other
              arguments in this group are specified.

           --location=LOCATION
              Location for the memberships.

              To set the location attribute:
              o provide the argument --memberships on the command line with a
                fully specified name;
              o provide the argument --location on the command line;
              o set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet policycontroller disable

        $ gcloud beta container fleet policycontroller disable
```

### gcloud beta container fleet policycontroller disable

```text
NAME
    gcloud beta container fleet policycontroller disable - disable (Uninstall)
        Policy Controller

SYNOPSIS
    gcloud beta container fleet policycontroller disable
        [--fleet-default-member-config | --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller disable

```text
NAME
    gcloud alpha container fleet policycontroller disable - disable (Uninstall)
        Policy Controller

SYNOPSIS
    gcloud alpha container fleet policycontroller disable
        [--fleet-default-member-config | --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/disable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
