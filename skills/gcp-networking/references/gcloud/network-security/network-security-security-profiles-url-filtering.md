---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/url-filtering
---

# gcloud network-security security-profiles url-filtering

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles url-filtering create

```text
NAME
    gcloud network-security security-profiles url-filtering create - create a
        new URL Filtering Profile

SYNOPSIS
    gcloud network-security security-profiles url-filtering create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new URL Filtering Security Profile.

EXAMPLES
    To create a URL Filtering Security Profile named my-urlf-security-profile
    with an optional description as New URLF Security Profile, run:

        $ gcloud network-security security-profiles url-filtering create \
          my-urlf-security-profile \
          --description="New URLF Security Profile"

POSITIONAL ARGUMENTS
     Security profile resource - Security Profile Name. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument security_profile on the command line with a
        fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfiles,
        networksecurity.projects.locations.securityProfiles].

     This must be specified.

       SECURITY_PROFILE
          ID of the security_profile or fully qualified identifier for the
          security_profile.

          To set the security_profile attribute:
          + provide the argument security_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the security profile.

          To set the location attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID to which the changes should apply.

          To set the organization attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

     --description=DESCRIPTION
        Brief description of the security profile

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles url-filtering \
            create

        $ gcloud beta network-security security-profiles url-filtering create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles url-filtering create my-urlf-security-profile \
    --organization=1234 \
    --location=global \
    --description="New URLF Security Profile"
```

### gcloud network-security security-profiles url-filtering delete

```text
NAME
    gcloud network-security security-profiles url-filtering delete - delete a
        URL Filtering Profile

SYNOPSIS
    gcloud network-security security-profiles url-filtering delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile.

EXAMPLES
    To delete a Security Profile called my-security-profile run:

        $ gcloud network-security security-profiles url-filtering delete \
          my-security-profile

POSITIONAL ARGUMENTS
     Security profile resource - Security Profile Name. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument security_profile on the command line with a
        fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfiles,
        networksecurity.projects.locations.securityProfiles].

     This must be specified.

       SECURITY_PROFILE
          ID of the security_profile or fully qualified identifier for the
          security_profile.

          To set the security_profile attribute:
          + provide the argument security_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the security profile.

          To set the location attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID to which the changes should apply.

          To set the organization attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles url-filtering \
            delete

        $ gcloud beta network-security security-profiles url-filtering delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles url-filtering delete my-security-profile \
    --organization=1234 \
    --location=global
```

### gcloud network-security security-profiles url-filtering describe

```text
NAME
    gcloud network-security security-profiles url-filtering describe - describe
        a URL Filtering Profile

SYNOPSIS
    gcloud network-security security-profiles url-filtering describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of the Security Profile.

EXAMPLES
    To show details of a Security Profile named my-urlf-sp run:

        $ gcloud network-security security-profiles url-filtering describe \
          my-urlf-sp --organization=1234 --location=global

POSITIONAL ARGUMENTS
     Security profile resource - Security Profile Name. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument security_profile on the command line with a
        fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfiles,
        networksecurity.projects.locations.securityProfiles].

     This must be specified.

       SECURITY_PROFILE
          ID of the security_profile or fully qualified identifier for the
          security_profile.

          To set the security_profile attribute:
          + provide the argument security_profile on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the security profile.

          To set the location attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID to which the changes should apply.

          To set the organization attribute:
          + provide the argument security_profile on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles url-filtering \
            describe

        $ gcloud beta network-security security-profiles url-filtering \
            describe
```

### gcloud network-security security-profiles url-filtering list

```text
NAME
    gcloud network-security security-profiles url-filtering list - list URL
        Filtering Security Profiles

SYNOPSIS
    gcloud network-security security-profiles url-filtering list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List URL Filtering Security Profiles.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list URL Filtering security profiles in an organization, run:

        $ gcloud network-security security-profiles url-filtering list \
            --organization=12345 --location=global

REQUIRED FLAGS
     Location resource - Parent resource for the list operation. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property core/project. This resource can be one of the
        following types: [networksecurity.organizations.locations,
        networksecurity.projects.locations].

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          Organization ID of the location.

          To set the organization attribute:
          + provide the argument --location on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations].

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles url-filtering list

        $ gcloud beta network-security security-profiles url-filtering list
```

### gcloud beta network-security security-profiles url-filtering create

```text
NAME
    gcloud beta network-security security-profiles url-filtering create -
        create a new URL Filtering Profile

SYNOPSIS
    gcloud beta network-security security-profiles url-filtering create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles url-filtering delete

```text
NAME
    gcloud beta network-security security-profiles url-filtering delete -
        delete a URL Filtering Profile

SYNOPSIS
    gcloud beta network-security security-profiles url-filtering delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles url-filtering describe

```text
NAME
    gcloud beta network-security security-profiles url-filtering describe -
        describe a URL Filtering Profile

SYNOPSIS
    gcloud beta network-security security-profiles url-filtering describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles url-filtering list

```text
NAME
    gcloud beta network-security security-profiles url-filtering list - list
        URL Filtering Security Profiles

SYNOPSIS
    gcloud beta network-security security-profiles url-filtering list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles url-filtering create

```text
NAME
    gcloud alpha network-security security-profiles url-filtering create -
        create a new URL Filtering Profile

SYNOPSIS
    gcloud alpha network-security security-profiles url-filtering create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles url-filtering delete

```text
NAME
    gcloud alpha network-security security-profiles url-filtering delete -
        delete a URL Filtering Profile

SYNOPSIS
    gcloud alpha network-security security-profiles url-filtering delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles url-filtering describe

```text
NAME
    gcloud alpha network-security security-profiles url-filtering describe -
        describe a URL Filtering Profile

SYNOPSIS
    gcloud alpha network-security security-profiles url-filtering describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles url-filtering list

```text
NAME
    gcloud alpha network-security security-profiles url-filtering list - list
        URL Filtering Security Profiles

SYNOPSIS
    gcloud alpha network-security security-profiles url-filtering list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the security profile name; the SYNOPSIS is `(SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)`, and gcloud 593.0.0 fails with "[security_profile] resource missing required data" because `--location` is set only by a fully specified name or the flag (and `--organization` only by a fully specified name or the flag); the runnable form adds `--organization=1234 --location=global`, values that other examples on this page use.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/url-filtering (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
