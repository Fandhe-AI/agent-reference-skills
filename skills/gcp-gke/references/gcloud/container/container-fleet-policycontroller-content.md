---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/content
---

# gcloud container fleet policycontroller content

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container fleet policycontroller content bundles remove

```text
NAME
    gcloud container fleet policycontroller content bundles remove - removes a
        bundle installation for Policy Controller content

SYNOPSIS
    gcloud container fleet policycontroller content bundles remove BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Google-defined policy bundles of constraints can be installed onto Policy
    Controller installations. This command removes those bundles.

EXAMPLES
    To remove a policy bundle:

        $ gcloud container fleet policycontroller content bundles remove \
            cis-k8s-v1.5.1

POSITIONAL ARGUMENTS
     BUNDLE_NAME
        The constraint bundle to remove from Policy Controller.

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

        $ gcloud alpha container fleet policycontroller content bundles \
            remove

        $ gcloud beta container fleet policycontroller content bundles remove
```

### gcloud container fleet policycontroller content bundles set

```text
NAME
    gcloud container fleet policycontroller content bundles set - sets bundle
        installation for Policy Controller content

SYNOPSIS
    gcloud container fleet policycontroller content bundles set BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [--exempted-namespaces=EXEMPTED_NAMESPACES | --no-exempted-namespaces]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Google-defined policy bundles of constraints can be installed onto Policy
    Controller installations.

    The namespace exclusion flag (--exempted-namespaces) will specify a set of
    namespaces that the installed bundle will ignore. Subsequent calls with the
    same bundle name and this flag will overwrite what namespaces are being
    ignored. Using --no-exempted-namespaces or specifying no namespaces with
    --exempted-namespaces will remove all namespaces from the ignore list.

    To uninstall a bundle, use the remove command.

EXAMPLES
    To install a policy bundle:

        $ gcloud container fleet policycontroller content bundles set \
            cis-k8s-v1.5.1

    To install a policy bundle, while ignoring (exempting) certain namespaces
    from being affected by the bundle:

        $ gcloud container fleet policycontroller content bundles set \
            cis-k8s-v1.5.1 \
            --exempted-namespaces=kube-system,gatekeeper-system

    To remove all exempted namespaces from a particular bundles ignore list:

        $ gcloud container fleet policycontroller content bundles set \
            cis-k8s-v1.5.1 --no-exempted-namespaces

POSITIONAL ARGUMENTS
     BUNDLE_NAME
        The constraint bundle to install in Policy Controller.

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

     Exempted Namespaces flags.

     At most one of these can be specified:

       --exempted-namespaces=EXEMPTED_NAMESPACES
          Exempted namespaces are ignored by Policy Controller when applying
          constraints added by this bundle.

       --no-exempted-namespaces
          Removes all exempted namespaces from the specified bundle.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container fleet policycontroller content bundles set

        $ gcloud beta container fleet policycontroller content bundles set
```

### gcloud container fleet policycontroller content templates disable

```text
NAME
    gcloud container fleet policycontroller content templates disable - disable
        template installation for Policy Controller content

SYNOPSIS
    gcloud container fleet policycontroller content templates disable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The Google-defined template library can be installed onto Policy Controller
    installations. This command removes that template library.

EXAMPLES
    To remove the template library:

        $ gcloud container fleet policycontroller content templates disable

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

        $ gcloud alpha container fleet policycontroller content templates \
            disable

        $ gcloud beta container fleet policycontroller content templates \
            disable
```

### gcloud container fleet policycontroller content templates enable

```text
NAME
    gcloud container fleet policycontroller content templates enable - installs
        the template library for Policy Controller

SYNOPSIS
    gcloud container fleet policycontroller content templates enable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Google-defined template library can be installed onto Policy Controller
    installations. To uninstall the template library, use the disable command.

EXAMPLES
    To install a template library:

        $ gcloud container fleet policycontroller content templates enable

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

        $ gcloud alpha container fleet policycontroller content templates \
            enable

        $ gcloud beta container fleet policycontroller content templates \
            enable
```

### gcloud beta container fleet policycontroller content bundles remove

```text
NAME
    gcloud beta container fleet policycontroller content bundles remove -
        removes a bundle installation for Policy Controller content

SYNOPSIS
    gcloud beta container fleet policycontroller content bundles remove
        BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet policycontroller content bundles set

```text
NAME
    gcloud beta container fleet policycontroller content bundles set - sets
        bundle installation for Policy Controller content

SYNOPSIS
    gcloud beta container fleet policycontroller content bundles set
        BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [--exempted-namespaces=EXEMPTED_NAMESPACES | --no-exempted-namespaces]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet policycontroller content templates disable

```text
NAME
    gcloud beta container fleet policycontroller content templates disable -
        disable template installation for Policy Controller content

SYNOPSIS
    gcloud beta container fleet policycontroller content templates disable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container fleet policycontroller content templates enable

```text
NAME
    gcloud beta container fleet policycontroller content templates enable -
        installs the template library for Policy Controller

SYNOPSIS
    gcloud beta container fleet policycontroller content templates enable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller content bundles remove

```text
NAME
    gcloud alpha container fleet policycontroller content bundles remove -
        removes a bundle installation for Policy Controller content

SYNOPSIS
    gcloud alpha container fleet policycontroller content bundles remove
        BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller content bundles set

```text
NAME
    gcloud alpha container fleet policycontroller content bundles set - sets
        bundle installation for Policy Controller content

SYNOPSIS
    gcloud alpha container fleet policycontroller content bundles set
        BUNDLE_NAME
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [--exempted-namespaces=EXEMPTED_NAMESPACES | --no-exempted-namespaces]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller content templates disable

```text
NAME
    gcloud alpha container fleet policycontroller content templates disable -
        disable template installation for Policy Controller content

SYNOPSIS
    gcloud alpha container fleet policycontroller content templates disable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container fleet policycontroller content templates enable

```text
NAME
    gcloud alpha container fleet policycontroller content templates enable -
        installs the template library for Policy Controller

SYNOPSIS
    gcloud alpha container fleet policycontroller content templates enable
        [--all-memberships
          | [--memberships=[MEMBERSHIPS,...] : --location=LOCATION]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated product: "Policy Controller is deprecated as of November 12, 2026, and reaches end of support on December 31, 2027. In version 1.39 and later, Google Kubernetes Engine (GKE) clusters don't support Policy Controller." Migrate admission policies to Kubernetes ValidatingAdmissionPolicies or self-managed OPA Gatekeeper (see `config-sync-policy/policy-controller-deprecation.md`; https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller, retrieved 2026-11-16).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/fleet/policycontroller/content (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
