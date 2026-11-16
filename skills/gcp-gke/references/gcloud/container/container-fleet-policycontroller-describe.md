---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/describe
---

# gcloud container fleet policycontroller describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet policycontroller describe

```text
NAME
    gcloud container fleet policycontroller describe - describe Policy
        Controller feature

SYNOPSIS
    gcloud container fleet policycontroller describe
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe the Policy Controller feature:

        $ gcloud container fleet policycontroller describe

FLAGS
     Membership flags.

     At most one of these can be specified:

       --all-memberships
          If supplied, apply to all Policy Controllers memberships in the
          fleet.

       Or at least one of these can be specified:

         Membership resource - The group of arguments defining one or more
         memberships. The arguments in this group can be used to specify the
         attributes of this resource. (NOTE) Some attributes are not given
         arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --memberships on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --memberships=[MEMBERSHIPS,...]
            IDs of the memberships or fully qualified identifiers for the
            memberships.

            To set the memberships attribute:
            - provide the argument --memberships on the command line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --location=LOCATION
            Location for the memberships.

            To set the location attribute:
            - provide the argument --memberships on the command line with a
              fully specified name;
            - provide the argument --location on the command line;
            - set the property gkehub/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet policycontroller describe

        $ gcloud beta container fleet policycontroller describe
```

### gcloud beta container fleet policycontroller describe

```text
NAME
    gcloud beta container fleet policycontroller describe - describe Policy
        Controller feature

SYNOPSIS
    gcloud beta container fleet policycontroller describe
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller describe

```text
NAME
    gcloud alpha container fleet policycontroller describe - describe Policy
        Controller feature

SYNOPSIS
    gcloud alpha container fleet policycontroller describe
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
