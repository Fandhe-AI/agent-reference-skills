---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/custom-intercept
---

# gcloud network-security security-profiles custom-intercept

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles custom-intercept create

```text
NAME
    gcloud network-security security-profiles custom-intercept create - create
        a new Custom Intercept Profile

SYNOPSIS
    gcloud network-security security-profiles custom-intercept create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--intercept-endpoint-group=INTERCEPT_ENDPOINT_GROUP
          : --intercept-endpoint-group-location=INTERCEPT_ENDPOINT_GROUP_LOCATION --intercept-endpoint-group-project=INTERCEPT_ENDPOINT_GROUP_PROJECT)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Custom Intercept Security Profile.

EXAMPLES
    To create a Custom Intercept Security Profile named intercept-profile
    linked to a Intercept Endpoint Group (q.v.), run:

        $ gcloud network-security security-profiles custom-intercept \
          create intercept-profile --description="An Intercept Profile" \
          --intercept-endpoint-group=projects/my-project/locations/\
        global/interceptEndpointGroups/my-mep

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

REQUIRED FLAGS
     Intercept endpoint group resource - Intercept Endpoint Group. The
     arguments in this group can be used to specify the attributes of this
     resource.

     This must be specified.

       --intercept-endpoint-group=INTERCEPT_ENDPOINT_GROUP
          ID of the intercept endpoint group or fully qualified identifier for
          the intercept endpoint group.

          To set the id attribute:
          + provide the argument --intercept-endpoint-group on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --intercept-endpoint-group-location=INTERCEPT_ENDPOINT_GROUP_LOCATION
          Location of the intercept endpoint group.

          To set the location attribute:
          + provide the argument --intercept-endpoint-group on the command
            line with a fully specified name;
          + provide the argument --intercept-endpoint-group-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument security_profile on the command line with a
            fully specified name.

       --intercept-endpoint-group-project=INTERCEPT_ENDPOINT_GROUP_PROJECT
          Project ID of the intercept endpoint group.

          To set the project attribute:
          + provide the argument --intercept-endpoint-group on the command
            line with a fully specified name;
          + provide the argument --intercept-endpoint-group-project on the
            command line;
          + provide the argument --project on the command line;
          + set the property core/project;
          + provide the argument security_profile on the command line with a
            fully specified name.

OPTIONAL FLAGS
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

        $ gcloud alpha network-security security-profiles custom-intercept \
            create

        $ gcloud beta network-security security-profiles custom-intercept \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles custom-intercept create intercept-profile \
    --organization=1234 \
    --location=global \
    --description="An Intercept Profile" \
    --intercept-endpoint-group=projects/my-project/locations/global/interceptEndpointGroups/my-mep
```

### gcloud network-security security-profiles custom-intercept delete

```text
NAME
    gcloud network-security security-profiles custom-intercept delete - delete
        a Custom Intercept Profile

SYNOPSIS
    gcloud network-security security-profiles custom-intercept delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile.

EXAMPLES
    To delete a Security Profile called my-security-profile run:

        $ gcloud network-security security-profiles custom-intercept \
          delete my-security-profile

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

        $ gcloud alpha network-security security-profiles custom-intercept \
            delete

        $ gcloud beta network-security security-profiles custom-intercept \
            delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles custom-intercept delete my-security-profile \
    --organization=1234 \
    --location=global
```

### gcloud network-security security-profiles custom-intercept describe

```text
NAME
    gcloud network-security security-profiles custom-intercept describe -
        describe a Custom Intercept Profile

SYNOPSIS
    gcloud network-security security-profiles custom-intercept describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of the Security Profile.

EXAMPLES
    To show details of a Security Profile named my-intercept-sp run:

        $ gcloud network-security security-profiles custom-intercept \
          describe my-intercept-sp --organization=1234 --location=global

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

        $ gcloud alpha network-security security-profiles custom-intercept \
            describe

        $ gcloud beta network-security security-profiles custom-intercept \
            describe
```

### gcloud network-security security-profiles custom-intercept list

```text
NAME
    gcloud network-security security-profiles custom-intercept list - list
        Custom Intercept Security Profiles

SYNOPSIS
    gcloud network-security security-profiles custom-intercept list
        [--location=LOCATION : --organization=ORGANIZATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Custom Intercept Security Profiles.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list Custom Intercept security profiles in an organization, run:

        $ gcloud network-security security-profiles custom-intercept list \
            --organization=12345 --location=global

FLAGS
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

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line.

        This flag argument must be specified if any of the other arguments in
        this group are specified.

     --organization=ORGANIZATION
        Organization ID of the location.

        To set the organization attribute:
        * provide the argument --location on the command line with a fully
          specified name;
        * provide the argument --organization on the command line. Must be
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

        $ gcloud alpha network-security security-profiles custom-intercept \
            list

        $ gcloud beta network-security security-profiles custom-intercept \
            list
```

### gcloud network-security security-profiles custom-intercept update

```text
NAME
    gcloud network-security security-profiles custom-intercept update - updates
        a Custom Intercept Profile

SYNOPSIS
    gcloud network-security security-profiles custom-intercept update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Custom Intercept Security Profile.

    The supported fields for update are description and labels.

EXAMPLES
    To update the description of a Custom Intercept Security Profile named
    intercept-profile, run:

        $ gcloud network-security security-profiles custom-intercept \
          update intercept-profile --description="A new description" \
          --organization=1234567890 --location=global

    To change the labels of a Custom Intercept Security Profile named
    intercept-profile, run:

        $ gcloud network-security security-profiles custom-intercept \
          update intercept-profile \
          --update-labels=key1=value1,key2=value2 \
          --delete-labels=key3,key4 --organization=1234567890 \
          --location=glob

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

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-security security-profiles custom-intercept \
                update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profiles custom-intercept \
                update --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles custom-intercept \
            update

        $ gcloud beta network-security security-profiles custom-intercept \
            update
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles custom-intercept update intercept-profile \
    --update-labels=key1=value1,key2=value2 \
    --remove-labels=key3,key4 \
    --organization=1234567890 \
    --location=global
```

### gcloud beta network-security security-profiles custom-intercept create

```text
NAME
    gcloud beta network-security security-profiles custom-intercept create -
        create a new Custom Intercept Profile

SYNOPSIS
    gcloud beta network-security security-profiles custom-intercept create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--intercept-endpoint-group=INTERCEPT_ENDPOINT_GROUP
          : --intercept-endpoint-group-location=INTERCEPT_ENDPOINT_GROUP_LOCATION --intercept-endpoint-group-project=INTERCEPT_ENDPOINT_GROUP_PROJECT)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles custom-intercept delete

```text
NAME
    gcloud beta network-security security-profiles custom-intercept delete -
        delete a Custom Intercept Profile

SYNOPSIS
    gcloud beta network-security security-profiles custom-intercept delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles custom-intercept describe

```text
NAME
    gcloud beta network-security security-profiles custom-intercept describe -
        describe a Custom Intercept Profile

SYNOPSIS
    gcloud beta network-security security-profiles custom-intercept describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles custom-intercept list

```text
NAME
    gcloud beta network-security security-profiles custom-intercept list - list
        Custom Intercept Security Profiles

SYNOPSIS
    gcloud beta network-security security-profiles custom-intercept list
        [--location=LOCATION : --organization=ORGANIZATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles custom-intercept update

```text
NAME
    gcloud beta network-security security-profiles custom-intercept update -
        updates a Custom Intercept Profile

SYNOPSIS
    gcloud beta network-security security-profiles custom-intercept update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles custom-intercept create

```text
NAME
    gcloud alpha network-security security-profiles custom-intercept create -
        create a new Custom Intercept Profile

SYNOPSIS
    gcloud alpha network-security security-profiles custom-intercept create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--intercept-endpoint-group=INTERCEPT_ENDPOINT_GROUP
          : --intercept-endpoint-group-location=INTERCEPT_ENDPOINT_GROUP_LOCATION --intercept-endpoint-group-project=INTERCEPT_ENDPOINT_GROUP_PROJECT)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles custom-intercept delete

```text
NAME
    gcloud alpha network-security security-profiles custom-intercept delete -
        delete a Custom Intercept Profile

SYNOPSIS
    gcloud alpha network-security security-profiles custom-intercept delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles custom-intercept describe

```text
NAME
    gcloud alpha network-security security-profiles custom-intercept describe -
        describe a Custom Intercept Profile

SYNOPSIS
    gcloud alpha network-security security-profiles custom-intercept describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles custom-intercept list

```text
NAME
    gcloud alpha network-security security-profiles custom-intercept list -
        list Custom Intercept Security Profiles

SYNOPSIS
    gcloud alpha network-security security-profiles custom-intercept list
        [--location=LOCATION : --organization=ORGANIZATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles custom-intercept update

```text
NAME
    gcloud alpha network-security security-profiles custom-intercept update -
        updates a Custom Intercept Profile

SYNOPSIS
    gcloud alpha network-security security-profiles custom-intercept update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the security profile name; the SYNOPSIS is `(SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)`, and gcloud 593.0.0 fails with "[security_profile] resource missing required data" because `--location` is set only by a fully specified name or the flag (and `--organization` only by a fully specified name or the flag); the runnable form adds `--organization=1234 --location=global`, values that other examples on this page use.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the label `update` example passes `--delete-labels=key3,key4`, which is not a flag of this command (gcloud 593.0.0: "unrecognized arguments: --delete-labels=key3,key4 (did you mean '--update-labels'?)"); the SYNOPSIS flag that removes labels is `--remove-labels`, which the runnable form uses.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the same example ends with `--location=glob`, while the other examples on this page use `--location=global`; the runnable form uses `--location=global`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/custom-intercept (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
