---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/config-management/disable
---

# gcloud container fleet config-management disable

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet config-management disable

```text
NAME
    gcloud container fleet config-management disable - disable the Config
        Management feature

SYNOPSIS
    gcloud container fleet config-management disable [--force]
        [--fleet-default-member-config | --uninstall --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disable the Config Management feature entirely, or disable specific
    configuration on the feature.

    gcloud container fleet config-management disable without flags deletes the
    Config Management feature, which unmanages and leaves existing Config Sync
    installations on membership clusters. Running the command without flags
    exits silently if the feature does not exist. Specify flags to disable
    configuration on parts of the feature without deleting it.

EXAMPLES
    To disable the Config Management feature entirely, run:

        $ gcloud container fleet config-management disable

    To unmanage Config Sync only on select memberships, run:

        $ gcloud container fleet config-management disable \
            --memberships=example-membership-1,example-membership-2

FLAGS
     --force
        Force disablement. Bypasses any prompts for confirmation. When
        disabling the entire feature, proceeds even if the feature is in use.
        Might result in unexpected behavior.

     At most one of these can be specified:

       --fleet-default-member-config
          Disable the fleet-default membership configuration
          (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features).
          Does not change existing membership configurations. Does nothing if
          the feature is disabled.

       Or at least one of these can be specified:

         Membership-specific flags. In the absence of --uninstall, using either
         --memberships or --all-memberships removes the entire configuration
         for the specified memberships, which unmanages and leaves existing
         Config Sync installations on the membership clusters. Unmanagement
         does not error if the feature is disabled.

         --uninstall
            Uninstall any previously-installed and managed Config Sync on the
            specified memberships by setting the enabled field
            (https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/gcloud-apply-fields)
            to false. Clears all other configuration for each membership. Does
            not wait for the uninstallation to complete. To bypass the
            confirmation prompt, use --force. Requires the feature to be
            enabled.

            To uninstall Config Sync on select memberships, run:

                $ gcloud container fleet config-management disable --uninstall \
                    --memberships=example-membership-1,example-membership-2

         At most one of these can be specified:

           --all-memberships
              All memberships in the fleet.

           Or at least one of these can be specified:

             Membership resource - The group of arguments defining one or more
             memberships. The arguments in this group can be used to specify
             the attributes of this resource. (NOTE) Some attributes are not
             given arguments in this group but can be set in other ways.

             To set the project attribute:
              * provide the argument --memberships on the command line with a
                fully specified name;
              * provide the argument --project on the command line;
              * set the property core/project.

             --memberships=[MEMBERSHIPS,...]
                IDs of the memberships or fully qualified identifiers for the
                memberships.

                To set the memberships attribute:
                * provide the argument --memberships on the command line.

                This flag argument must be specified if any of the other
                arguments in this group are specified.

             --location=LOCATION
                Location for the memberships.

                To set the location attribute:
                * provide the argument --memberships on the command line with
                  a fully specified name;
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

        $ gcloud alpha container fleet config-management disable

        $ gcloud beta container fleet config-management disable
```

### gcloud beta container fleet config-management disable

```text
NAME
    gcloud beta container fleet config-management disable - disable the Config
        Management feature

SYNOPSIS
    gcloud beta container fleet config-management disable [--force]
        [--fleet-default-member-config | --uninstall --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet config-management disable

```text
NAME
    gcloud alpha container fleet config-management disable - disable the Config
        Management feature

SYNOPSIS
    gcloud alpha container fleet config-management disable [--force]
        [--fleet-default-member-config | --uninstall --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/config-management/disable (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
