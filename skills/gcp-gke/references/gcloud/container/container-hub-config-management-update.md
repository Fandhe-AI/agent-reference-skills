---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/config-management/update
---

# gcloud container hub config-management update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub config-management update

```text
NAME
    gcloud container hub config-management update - update the Config
        Management feature

SYNOPSIS
    gcloud container hub config-management update
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          | [(--config=CONFIG | --origin=ORIGIN
          | --version=VERSION) : --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update the Config Management feature.

    gcloud container hub config-management update replaces the apply and
    upgrade commands for feature updates. The update command streamlines
    partial configuration changes by accepting the describe command output as
    input. In addition to the plural --memberships and --all-memberships flags,
    the command also supports a --version flag dedicated to upgrades that
    operates independently of the --config flag. This command errors if the
    feature does not exist.

EXAMPLES
    To update only the Config Sync sync directory on an existing membership
    configuration, run:

        $ gcloud container hub config-management describe --view=config \
            --memberships=example-membership-1 > config.yaml

        $ sed -i "s/policyDir: foo/policyDir: bar/g" config.yaml

        $ gcloud container hub config-management update \
            --config=config.yaml --memberships=example-membership-1

    To update the Config Sync version for all memberships to ${VERSION}, run:

        $ gcloud container hub config-management update \
            --version="${VERSION}" --all-memberships

    To update the fleet-default membership configuration
    (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features)
    and sync select membership configurations to it, run:

        $ gcloud container hub config-management update \
            --fleet-default-member-config=config.yaml

        $ gcloud container hub config-management update --origin=fleet \
            --memberships=example-membership-1,example-membership-2

REQUIRED FLAGS
     Exactly one of these must be specified:

       --fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          Path to YAML file, or - to read from stdin, that specifies the
          fleet-default membership configuration
          (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features)
          to update the feature to. Accepts the same schema as the
          MembershipSpec API field
          (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/reference/rpc/google.cloud.gkehub.configmanagement.v1#google.cloud.gkehub.configmanagement.v1.MembershipSpec).
          Provides the additional field-handling documented at
          https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/gcloud-configuration-field-behavior.

          To update only the Config Sync sync directory on the existing
          fleet-default membership configuration, run:

              $ gcloud container hub config-management describe \
                  --view=fleet-default-member-config > config.yaml

              $ sed -i "s/policyDir: foo/policyDir: bar/g" config.yaml

              $ gcloud container hub config-management update \
                  --fleet-default-member-config=config.yaml

          To achieve the same result in a single invocation, run:

              $ gcloud container hub config-management describe \
                  --view=fleet-default-member-config | sed \
                  "s/policyDir: foo/policyDir: bar/g" | gcloud container hub \
                  config-management update --fleet-default-member-config="-"

       Or at least one of these can be specified:

         MEMBERSHIP CONFIGURATION FLAGS. Updates membership configuration(s),
         but does not wait for the resulting on-cluster changes to complete.

         Exactly one of these must be specified:

           --config=CONFIG
              Path to YAML file, or - to read from stdin, that specifies the
              configuration to update the target membership(s) to. Accepts the
              same schema as the Spec API field
              (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/reference/rpc/google.cloud.gkehub.configmanagement.v2#google.cloud.gkehub.configmanagement.v2.Spec).
              Provides the additional field-handling documented at
              https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/reference/gcloud-configuration-field-behavior.

              To update the entire configuration for select memberships to that
              specified in a config.yaml, run:

                  $ gcloud container hub config-management update \
                      --config=path/to/config.yaml \
                      --memberships=example-membership-1,example-membership-2

              To update only the Config Sync sync directory on an existing
              membership configuration in a single invocation, making sure to
              first inspect the existing membership configuration, run:

                  $ gcloud container hub config-management describe --view=config \
                      --memberships=example-membership-1

                  $ gcloud container hub config-management describe --view=config \
                      --memberships=example-membership-1 | sed \
                      "s/policyDir: foo/policyDir: bar/g" | gcloud container hub \
                      config-management update --config="-" \
                      --memberships=example-membership-1

           --origin=ORIGIN
              Update the configuration of the target membership(s) to the
              fleet-default membership configuration
              (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/manage-features).
              Errors if the fleet-default membership configuration is not set;
              see the --fleet-default-member-config flag. ORIGIN must be (only
              one value is supported): fleet.

           Or at least one of these can be specified:

             PER-FIELD FLAGS. Updates a single field and preserves all other
             existing configuration fields for target membership(s). Use the
             --config flag to update other configuration fields.

             Warns if the configSync field is not enabled. Only if the
             configSync field is enabled according to the configSync.enabled
             field description
             (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/reference/rpc/google.cloud.gkehub.configmanagement.v2#google.cloud.gkehub.configmanagement.v2.ConfigSync)
             does the feature install and manage Config Sync based on the
             membership configuration field values. Use --verbosity=error to
             suppress the warning.

             --version=VERSION
                Version of Config Sync to update the target membership
                configuration(s) to. Upgrades Config Sync if the configSync
                field is enabled, and logs a warning otherwise. See the
                PER-FIELD FLAGS section above for details. To bypass the
                upgrade confirmation prompt, use --quiet. Find supported
                versions and the default version behavior in the version field
                description
                (https://docs.cloud.google.com/kubernetes-engine/fleet-management/docs/reference/rpc/google.cloud.gkehub.configmanagement.v2#spec).

                To upgrade all memberships to the latest version, unless the
                configSync field is not enabled for any membership, for which
                the flag will log a warning, run:

                    $ gcloud container hub config-management update --version="" \
                        --all-memberships

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

        $ gcloud alpha container hub config-management update

        $ gcloud beta container hub config-management update
```

### gcloud beta container hub config-management update

```text
NAME
    gcloud beta container hub config-management update - update the Config
        Management feature

SYNOPSIS
    gcloud beta container hub config-management update
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          | [(--config=CONFIG | --origin=ORIGIN
          | --version=VERSION) : --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub config-management update

```text
NAME
    gcloud alpha container hub config-management update - update the Config
        Management feature

SYNOPSIS
    gcloud alpha container hub config-management update
        (--fleet-default-member-config=FLEET_DEFAULT_MEMBER_CONFIG
          | [(--config=CONFIG | --origin=ORIGIN
          | --version=VERSION) : --all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]])
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/config-management/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
