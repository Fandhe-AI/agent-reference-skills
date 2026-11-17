---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/threat-prevention
---

# gcloud network-security security-profiles threat-prevention

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles threat-prevention add-override

```text
NAME
    gcloud network-security security-profiles threat-prevention add-override -
        add overrides to Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add antivirus, severities, or threat-ids to existing threat prevention
    profile with intended action on each specified. Check the updates of
    add-override command by using gcloud network-security security-profiles
    threat-prevention list-override my-security-profile.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To add an override, run:

        $ gcloud network-security security-profiles threat-prevention \
            add-override my-security-profile --severities=MEDIUM \
            --action=ALLOW

    my-security-profile is the name of the Security Profile in the format
    organizations/{organizationID}/locations/{location}/securityProfiles/
    {security_profile_id} where organizationID is the organization ID to which
    the changes should apply, location - global specified and
    security_profile_id the Security Profile Identifier

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
     --action=ACTION
        Action associated with antivirus, severity, or threat-id. ACTION must
        be one of: DEFAULT_ACTION, ALLOW, ALERT, DENY.

     Exactly one of these must be specified:

       --antivirus=[PROTOCOL,...]
          List of comma-separated protocols where each value in the list
          indicates the protocol of the antivirus threat.

       --severities=[SEVERITY_LEVEL,...]
          List of comma-separated severities where each value in the list
          indicates the severity of the threat.

       --threat-ids=[THREAT-ID,...]
          List of comma-separated threat identifiers where each identifier in
          the list is a vendor-specified Signature ID representing a threat
          type.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

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

              $ gcloud network-security security-profiles threat-prevention \
                add-override --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profiles threat-prevention \
                add-override --clear-labels --update-labels foo=bar,baz=qux

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention add-override

        $ gcloud beta network-security security-profiles threat-prevention \
            add-override
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention add-override my-security-profile \
    --organization=1234 \
    --location=global \
    --severities=MEDIUM \
    --action=ALLOW
```

### gcloud network-security security-profiles threat-prevention create

```text
NAME
    gcloud network-security security-profiles threat-prevention create - create
        a new Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Security Profile with the given name.

EXAMPLES
    To create a Security Profile with the name my-security-profile and an
    optional description as New Security Profile, run:

        $ gcloud network-security security-profiles threat-prevention \
          create my-security-profile --description="New Security Profile"

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention create

        $ gcloud beta network-security security-profiles threat-prevention \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention create my-security-profile \
    --organization=1234 \
    --location=global \
    --description="New Security Profile"
```

### gcloud network-security security-profiles threat-prevention delete

```text
NAME
    gcloud network-security security-profiles threat-prevention delete - delete
        a Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile.

EXAMPLES
    To delete a Security Profile called my-security-profile run:

        $ gcloud network-security security-profiles threat-prevention \
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

        $ gcloud alpha network-security security-profiles \
            threat-prevention delete

        $ gcloud beta network-security security-profiles threat-prevention \
            delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention delete my-security-profile \
    --organization=1234 \
    --location=global
```

### gcloud network-security security-profiles threat-prevention delete-override

```text
NAME
    gcloud network-security security-profiles threat-prevention delete-override
        - delete overrides of Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To delete existing antivirus, severities, or threat-ids of threat
    prevention profile. Check the updates of update-override command by using
    gcloud network-security security-profiles threat-prevention list-override
    my-security-profile.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To delete an override, run:

        $ gcloud network-security security-profiles threat-prevention \
            delete-override my-security-profile --severities=MEDIUM

    my-security-profile is the name of the Security Profile in the format
    organizations/{organizationID}/locations/{location}/securityProfiles/
    {security_profile_id} where organizationID is the organization ID to which
    the changes should apply, location - global specified and
    security_profile_id the Security Profile Identifier

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
     Exactly one of these must be specified:

       --antivirus=[PROTOCOL,...]
          List of comma-separated protocols where each value in the list
          indicates the protocol of the antivirus threat.

       --severities=[SEVERITY_LEVEL,...]
          List of comma-separated severities where each value in the list
          indicates the severity of the threat.

       --threat-ids=[THREAT-ID,...]
          List of comma-separated threat identifiers where each identifier in
          the list is a vendor-specified Signature ID representing a threat
          type.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

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

              $ gcloud network-security security-profiles threat-prevention \
                delete-override --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profiles threat-prevention \
                delete-override --clear-labels --update-labels foo=bar,baz=qux

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention delete-override

        $ gcloud beta network-security security-profiles threat-prevention \
            delete-override
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention delete-override my-security-profile \
    --organization=1234 \
    --location=global \
    --severities=MEDIUM
```

### gcloud network-security security-profiles threat-prevention describe

```text
NAME
    gcloud network-security security-profiles threat-prevention describe -
        describe a Threat Prevention Security Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Threat Prevention Security Profile.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To show details of a Threat Prevention security profile named
    my-security-profile in an organization, run:

    $ gcloud network-security security-profiles threat-prevention \        describe my-security-profile --organization=1234 \
        --location=global

    To show details of a Threat Prevention security profile named
    my-security-profile in a project, run:

    $ gcloud network-security security-profiles threat-prevention \        describe my-security-profile --project=my-project \
        --location=global

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention describe

        $ gcloud beta network-security security-profiles threat-prevention \
            describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security security-profiles threat-prevention describe my-security-profile \
    --organization=1234 \
    --location=global

gcloud network-security security-profiles threat-prevention describe my-security-profile \
    --project=my-project \
    --location=global
```

### gcloud network-security security-profiles threat-prevention list

```text
NAME
    gcloud network-security security-profiles threat-prevention list - list
        Threat Prevention Security Profiles

SYNOPSIS
    gcloud network-security security-profiles threat-prevention list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Threat Prevention Security Profiles.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list Threat Prevention security profiles in an organization, run:

        $ gcloud network-security security-profiles threat-prevention list \
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

        $ gcloud alpha network-security security-profiles \
            threat-prevention list

        $ gcloud beta network-security security-profiles threat-prevention \
            list
```

### gcloud network-security security-profiles threat-prevention list-overrides

```text
NAME
    gcloud network-security security-profiles threat-prevention list-overrides
        - list overrides of Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention list-overrides
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To list existing antivirus, severities, or threat-ids of threat prevention
    profile.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To list overrides, run:

        $ gcloud network-security security-profiles threat-prevention \
            list-overrides my-security-profile

    my-security-profile is the name of the Security Profile in the format
    organizations/{organizationID}/locations/{location}/securityProfiles/
    {security_profile_id} where organizationID is the organization ID to which
    the changes should apply, location - global specified and
    security_profile_id the Security Profile Identifier

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention list-overrides

        $ gcloud beta network-security security-profiles threat-prevention \
            list-overrides
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention list-overrides my-security-profile \
    --organization=1234 \
    --location=global
```

### gcloud network-security security-profiles threat-prevention update-override

```text
NAME
    gcloud network-security security-profiles threat-prevention update-override
        - update Overrides of Threat Prevention Profile

SYNOPSIS
    gcloud network-security security-profiles threat-prevention update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    To update existing antivirus, severities, or threat-ids of threat
    prevention profile with intended action on each specified. Check the
    updates of update-override command by using gcloud network-security
    security-profiles threat-prevention list-override my-security-profile.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To update an override, run:

        $ gcloud network-security security-profiles threat-prevention \
            update-override my-security-profile --severities=MEDIUM \
            --action=ALLOW

    my-security-profile is the name of the Security Profile in the format
    organizations/{organizationID}/locations/{location}/securityProfiles/
    {security_profile_id} where organizationID is the organization ID to which
    the changes should apply, location - global specified and
    security_profile_id the Security Profile Identifier

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
     --action=ACTION
        Action associated with antivirus, severity, or threat-id. ACTION must
        be one of: DEFAULT_ACTION, ALLOW, ALERT, DENY.

     Exactly one of these must be specified:

       --antivirus=[PROTOCOL,...]
          List of comma-separated protocols where each value in the list
          indicates the protocol of the antivirus threat.

       --severities=[SEVERITY_LEVEL,...]
          List of comma-separated severities where each value in the list
          indicates the severity of the threat.

       --threat-ids=[THREAT-ID,...]
          List of comma-separated threat identifiers where each identifier in
          the list is a vendor-specified Signature ID representing a threat
          type.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

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

              $ gcloud network-security security-profiles threat-prevention \
                update-override --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profiles threat-prevention \
                update-override --clear-labels --update-labels foo=bar,baz=qux

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

        $ gcloud alpha network-security security-profiles \
            threat-prevention update-override

        $ gcloud beta network-security security-profiles threat-prevention \
            update-override
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles threat-prevention update-override my-security-profile \
    --organization=1234 \
    --location=global \
    --severities=MEDIUM \
    --action=ALLOW
```

### gcloud beta network-security security-profiles threat-prevention add-override

```text
NAME
    gcloud beta network-security security-profiles threat-prevention
        add-override - add overrides to Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention
        add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention create

```text
NAME
    gcloud beta network-security security-profiles threat-prevention create -
        create a new Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention delete

```text
NAME
    gcloud beta network-security security-profiles threat-prevention delete -
        delete a Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention delete-override

```text
NAME
    gcloud beta network-security security-profiles threat-prevention
        delete-override - delete overrides of Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention
        delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention describe

```text
NAME
    gcloud beta network-security security-profiles threat-prevention describe -
        describe a Threat Prevention Security Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention list

```text
NAME
    gcloud beta network-security security-profiles threat-prevention list -
        list Threat Prevention Security Profiles

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention list-overrides

```text
NAME
    gcloud beta network-security security-profiles threat-prevention
        list-overrides - list overrides of Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention
        list-overrides
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles threat-prevention update-override

```text
NAME
    gcloud beta network-security security-profiles threat-prevention
        update-override - update Overrides of Threat Prevention Profile

SYNOPSIS
    gcloud beta network-security security-profiles threat-prevention
        update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention add-override

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention
        add-override - add overrides to Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention
        add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention create

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention create -
        create a new Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention delete

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention delete -
        delete a Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention delete-override

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention
        delete-override - delete overrides of Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention
        delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention describe

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention describe
        - describe a Threat Prevention Security Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention list

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention list -
        list Threat Prevention Security Profiles

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention list-overrides

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention
        list-overrides - list overrides of Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention
        list-overrides
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles threat-prevention update-override

```text
NAME
    gcloud alpha network-security security-profiles threat-prevention
        update-override - update Overrides of Threat Prevention Profile

SYNOPSIS
    gcloud alpha network-security security-profiles threat-prevention
        update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--antivirus=[PROTOCOL,...] | --severities=[SEVERITY_LEVEL,...]
          | --threat-ids=[THREAT-ID,...]) [--async]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the security profile name; the SYNOPSIS is `(SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)`, and gcloud 593.0.0 fails with "[security_profile] resource missing required data" because `--location` is set only by a fully specified name or the flag (and `--organization` only by a fully specified name or the flag); the runnable form adds `--organization=1234 --location=global`, values that other examples on this page use.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/threat-prevention (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
