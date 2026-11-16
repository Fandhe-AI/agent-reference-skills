---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/support-access
---

# gcloud container hub memberships support-access

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub memberships support-access describe

```text
NAME
    gcloud container hub memberships support-access describe - describe support
        access for the specified membership

SYNOPSIS
    gcloud container hub memberships support-access describe
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe support access for membership my-membership run:

        $ gcloud container hub memberships support-access describe \
            my-membership

POSITIONAL ARGUMENTS
     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MEMBERSHIP_NAME on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MEMBERSHIP_NAME
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument MEMBERSHIP_NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the membership resource, e.g. us-central1. If not
          specified, defaults to global.

          To set the location attribute:
          + provide the argument MEMBERSHIP_NAME on the command line with a
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

        $ gcloud alpha container hub memberships support-access describe

        $ gcloud beta container hub memberships support-access describe
```

### gcloud container hub memberships support-access disable

```text
NAME
    gcloud container hub memberships support-access disable - disable support
        access for the specified membership

SYNOPSIS
    gcloud container hub memberships support-access disable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To disable support access for membership my-membership run:

        $ gcloud container hub memberships support-access disable \
            my-membership

POSITIONAL ARGUMENTS
     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MEMBERSHIP_NAME on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MEMBERSHIP_NAME
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument MEMBERSHIP_NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the membership resource, e.g. us-central1. If not
          specified, defaults to global.

          To set the location attribute:
          + provide the argument MEMBERSHIP_NAME on the command line with a
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

        $ gcloud alpha container hub memberships support-access disable

        $ gcloud beta container hub memberships support-access disable
```

### gcloud container hub memberships support-access enable

```text
NAME
    gcloud container hub memberships support-access enable - enable support
        access for the specified membership

SYNOPSIS
    gcloud container hub memberships support-access enable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To enable support access for membership my-membership run:

        $ gcloud container hub memberships support-access enable \
            my-membership

POSITIONAL ARGUMENTS
     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MEMBERSHIP_NAME on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MEMBERSHIP_NAME
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument MEMBERSHIP_NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the membership resource, e.g. us-central1. If not
          specified, defaults to global.

          To set the location attribute:
          + provide the argument MEMBERSHIP_NAME on the command line with a
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

        $ gcloud alpha container hub memberships support-access enable

        $ gcloud beta container hub memberships support-access enable
```

### gcloud container hub memberships support-access get-yaml

```text
NAME
    gcloud container hub memberships support-access get-yaml - generates YAML
        for anthos support RBAC policies

SYNOPSIS
    gcloud container hub memberships support-access get-yaml
        (MEMBERSHIP_NAME : --location=LOCATION)
        [--rbac-output-file=RBAC_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To generate the YAML for support access RBAC policies with membership
    my-membership, run:

        $ gcloud container hub memberships support-access get-yaml \
            my-membership

POSITIONAL ARGUMENTS
     Membership resource - The group of arguments defining a membership. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument MEMBERSHIP_NAME on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MEMBERSHIP_NAME
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument MEMBERSHIP_NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location of the membership resource, e.g. us-central1. If not
          specified, defaults to global.

          To set the location attribute:
          + provide the argument MEMBERSHIP_NAME on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property gkehub/location.

FLAGS
     --rbac-output-file=RBAC_OUTPUT_FILE
        If specified, the generated RBAC policy will be written to the
        designated local file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub memberships support-access get-yaml

        $ gcloud beta container hub memberships support-access get-yaml
```

### gcloud beta container hub memberships support-access describe

```text
NAME
    gcloud beta container hub memberships support-access describe - describe
        support access for the specified membership

SYNOPSIS
    gcloud beta container hub memberships support-access describe
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub memberships support-access disable

```text
NAME
    gcloud beta container hub memberships support-access disable - disable
        support access for the specified membership

SYNOPSIS
    gcloud beta container hub memberships support-access disable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub memberships support-access enable

```text
NAME
    gcloud beta container hub memberships support-access enable - enable
        support access for the specified membership

SYNOPSIS
    gcloud beta container hub memberships support-access enable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub memberships support-access get-yaml

```text
NAME
    gcloud beta container hub memberships support-access get-yaml - generates
        YAML for anthos support RBAC policies

SYNOPSIS
    gcloud beta container hub memberships support-access get-yaml
        (MEMBERSHIP_NAME : --location=LOCATION)
        [--rbac-output-file=RBAC_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships support-access describe

```text
NAME
    gcloud alpha container hub memberships support-access describe - describe
        support access for the specified membership

SYNOPSIS
    gcloud alpha container hub memberships support-access describe
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships support-access disable

```text
NAME
    gcloud alpha container hub memberships support-access disable - disable
        support access for the specified membership

SYNOPSIS
    gcloud alpha container hub memberships support-access disable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships support-access enable

```text
NAME
    gcloud alpha container hub memberships support-access enable - enable
        support access for the specified membership

SYNOPSIS
    gcloud alpha container hub memberships support-access enable
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships support-access get-yaml

```text
NAME
    gcloud alpha container hub memberships support-access get-yaml - generates
        YAML for anthos support RBAC policies

SYNOPSIS
    gcloud alpha container hub memberships support-access get-yaml
        (MEMBERSHIP_NAME : --location=LOCATION)
        [--rbac-output-file=RBAC_OUTPUT_FILE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/support-access (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
