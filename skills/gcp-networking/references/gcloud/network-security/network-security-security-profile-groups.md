---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profile-groups
---

# gcloud network-security security-profile-groups

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profile-groups create

```text
NAME
    gcloud network-security security-profile-groups create - create a new
        Security Profile Group

SYNOPSIS
    gcloud network-security security-profile-groups create
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        ([--custom-intercept-profile=CUSTOM_INTERCEPT_PROFILE
          : --custom-intercept-profile-location=CUSTOM_INTERCEPT_PROFILE_LOCATION --custom-intercept-profile-organization=CUSTOM_INTERCEPT_PROFILE_ORGANIZATION --custom-intercept-profile-project=CUSTOM_INTERCEPT_PROFILE_PROJECT] [--custom-mirroring-profile=CUSTOM_MIRRORING_PROFILE : --custom-mirroring-profile-location=CUSTOM_MIRRORING_PROFILE_LOCATION --custom-mirroring-profile-organization=CUSTOM_MIRRORING_PROFILE_ORGANIZATION --custom-mirroring-profile-project=CUSTOM_MIRRORING_PROFILE_PROJECT] [--threat-prevention-profile=THREAT_PREVENTION_PROFILE : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT] [--url-filtering-profile=URL_FILTERING_PROFILE : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT] [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new Security Profile Group with the given name.

EXAMPLES
    To create a Security Profile Group with the name my-security-profile-group,
    with a threat prevention profile using --threat-prevention-profile flag and
    optional description as optional description, run:

        $ gcloud network-security security-profile-groups create \
          my-security-profile-group --organization=1234 \
          --location=global \
          --threat-prevention-profile=`organizations/1234/locations/\
        global/securityProfiles/my-security-profile` \
            --description='optional description'

POSITIONAL ARGUMENTS
     Security profile group resource - Security Profile Group Name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument security_profile_group on the command line with
        a fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfileGroups,
        networksecurity.projects.locations.securityProfileGroups].

     This must be specified.

       SECURITY_PROFILE_GROUP
          ID of the security_profile_group or fully qualified identifier for
          the security_profile_group.

          To set the security_profile_group attribute:
          + provide the argument security_profile_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          location of the security_profile_group - Global.

          To set the location attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID of Security Profile Group

          To set the organization attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfileGroups].

REQUIRED FLAGS
     At least one of these must be specified:

       Custom intercept profile resource - Path to Custom Intercept Profile
       resource. The arguments in this group can be used to specify the
       attributes of this resource. This resource can be one of the following
       types: [networksecurity.organizations.locations.securityProfiles,
       networksecurity.projects.locations.securityProfiles].

       --custom-intercept-profile=CUSTOM_INTERCEPT_PROFILE
          ID of the custom_intercept_profile or fully qualified identifier for
          the custom_intercept_profile.

          To set the name attribute:
          + provide the argument --custom-intercept-profile on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-intercept-profile-location=CUSTOM_INTERCEPT_PROFILE_LOCATION
          Location of the custom_intercept_profile. NOTE: Only global security
          profiles are supported.

          To set the location attribute:
          + provide the argument --custom-intercept-profile on the command
            line with a fully specified name;
          + provide the argument --custom-intercept-profile-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name.

       --custom-intercept-profile-organization=CUSTOM_INTERCEPT_PROFILE_ORGANIZATION
          Organization ID of the Security Profile.

          To set the organization attribute:
          + provide the argument --custom-intercept-profile on the command
            line with a fully specified name;
          + provide the argument --custom-intercept-profile-organization on
            the command line;
          + provide the argument --organization on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

       --custom-intercept-profile-project=CUSTOM_INTERCEPT_PROFILE_PROJECT
          Project ID of the custom_intercept_profile.

          To set the project attribute:
          + provide the argument --custom-intercept-profile on the command
            line with a fully specified name;
          + provide the argument --custom-intercept-profile-project on the
            command line;
          + set the property core/project;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.projects.locations.securityProfiles].

       Custom mirroring profile resource - Path to Custom Mirroring Profile
       resource. The arguments in this group can be used to specify the
       attributes of this resource. This resource can be one of the following
       types: [networksecurity.organizations.locations.securityProfiles,
       networksecurity.projects.locations.securityProfiles].

       --custom-mirroring-profile=CUSTOM_MIRRORING_PROFILE
          ID of the custom_mirroring_profile or fully qualified identifier for
          the custom_mirroring_profile.

          To set the name attribute:
          + provide the argument --custom-mirroring-profile on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --custom-mirroring-profile-location=CUSTOM_MIRRORING_PROFILE_LOCATION
          Location of the custom_mirroring_profile. NOTE: Only global security
          profiles are supported.

          To set the location attribute:
          + provide the argument --custom-mirroring-profile on the command
            line with a fully specified name;
          + provide the argument --custom-mirroring-profile-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name.

       --custom-mirroring-profile-organization=CUSTOM_MIRRORING_PROFILE_ORGANIZATION
          Organization ID of the Security Profile.

          To set the organization attribute:
          + provide the argument --custom-mirroring-profile on the command
            line with a fully specified name;
          + provide the argument --custom-mirroring-profile-organization on
            the command line;
          + provide the argument --organization on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

       --custom-mirroring-profile-project=CUSTOM_MIRRORING_PROFILE_PROJECT
          Project ID of the custom_mirroring_profile.

          To set the project attribute:
          + provide the argument --custom-mirroring-profile on the command
            line with a fully specified name;
          + provide the argument --custom-mirroring-profile-project on the
            command line;
          + set the property core/project;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.projects.locations.securityProfiles].

       Threat prevention profile resource - Path to Threat Prevention Profile
       resource. The arguments in this group can be used to specify the
       attributes of this resource. This resource can be one of the following
       types: [networksecurity.organizations.locations.securityProfiles,
       networksecurity.projects.locations.securityProfiles].

       --threat-prevention-profile=THREAT_PREVENTION_PROFILE
          ID of the threat_prevention_profile or fully qualified identifier for
          the threat_prevention_profile.

          To set the name attribute:
          + provide the argument --threat-prevention-profile on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION
          Location of the threat_prevention_profile. NOTE: Only global security
          profiles are supported.

          To set the location attribute:
          + provide the argument --threat-prevention-profile on the command
            line with a fully specified name;
          + provide the argument --threat-prevention-profile-location on the
            command line;
          + provide the argument --security-profile-location on the command
            line;
          + provide the argument --location on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name.

       --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION
          Organization ID of the Security Profile.

          To set the organization attribute:
          + provide the argument --threat-prevention-profile on the command
            line with a fully specified name;
          + provide the argument --threat-prevention-profile-organization on
            the command line;
          + provide the argument --security-profile-organization on the
            command line;
          + provide the argument --organization on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

       --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT
          Project ID of the threat_prevention_profile.

          To set the project attribute:
          + provide the argument --threat-prevention-profile on the command
            line with a fully specified name;
          + provide the argument --threat-prevention-profile-project on the
            command line;
          + set the property core/project;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.projects.locations.securityProfiles].

       Url filtering profile resource - Path to URL Filtering Profile resource.
       The arguments in this group can be used to specify the attributes of
       this resource. This resource can be one of the following types:
       [networksecurity.organizations.locations.securityProfiles,
       networksecurity.projects.locations.securityProfiles].

       --url-filtering-profile=URL_FILTERING_PROFILE
          ID of the url_filtering_profile or fully qualified identifier for the
          url_filtering_profile.

          To set the name attribute:
          + provide the argument --url-filtering-profile on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION
          Location of the url_filtering_profile. NOTE: Only global security
          profiles are supported.

          To set the location attribute:
          + provide the argument --url-filtering-profile on the command line
            with a fully specified name;
          + provide the argument --url-filtering-profile-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name.

       --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION
          Organization ID of the Security Profile.

          To set the organization attribute:
          + provide the argument --url-filtering-profile on the command line
            with a fully specified name;
          + provide the argument --url-filtering-profile-organization on the
            command line;
          + provide the argument --organization on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

       --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT
          Project ID of the url_filtering_profile.

          To set the project attribute:
          + provide the argument --url-filtering-profile on the command line
            with a fully specified name;
          + provide the argument --url-filtering-profile-project on the
            command line;
          + set the property core/project;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.projects.locations.securityProfiles].

       Wildfire analysis profile resource - Path to WildFire Analysis Profile
       resource. The arguments in this group can be used to specify the
       attributes of this resource. This resource can be one of the following
       types: [networksecurity.organizations.locations.securityProfiles,
       networksecurity.projects.locations.securityProfiles].

       --wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE
          ID of the wildfire_analysis_profile or fully qualified identifier for
          the wildfire_analysis_profile.

          To set the name attribute:
          + provide the argument --wildfire-analysis-profile on the command
            line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION
          Location of the wildfire_analysis_profile. NOTE: Only global security
          profiles are supported.

          To set the location attribute:
          + provide the argument --wildfire-analysis-profile on the command
            line with a fully specified name;
          + provide the argument --wildfire-analysis-profile-location on the
            command line;
          + provide the argument --location on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name.

       --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION
          Organization ID of the Security Profile.

          To set the organization attribute:
          + provide the argument --wildfire-analysis-profile on the command
            line with a fully specified name;
          + provide the argument --wildfire-analysis-profile-organization on
            the command line;
          + provide the argument --organization on the command line;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.organizations.locations.securityProfiles].

       --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT
          Project ID of the wildfire_analysis_profile.

          To set the project attribute:
          + provide the argument --wildfire-analysis-profile on the command
            line with a fully specified name;
          + provide the argument --wildfire-analysis-profile-project on the
            command line;
          + set the property core/project;
          + provide the argument security_profile_group on the command line
            with a fully specified name. Must be specified for resource of type
            [networksecurity.projects.locations.securityProfiles].

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

     --description=DESCRIPTION
        Brief description of the security profile group

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

        $ gcloud alpha network-security security-profile-groups create

        $ gcloud beta network-security security-profile-groups create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security security-profile-groups create my-security-profile-group \
    --organization=1234 \
    --location=global \
    --threat-prevention-profile='organizations/1234/locations/global/securityProfiles/my-security-profile' \
    --description='optional description'
```

### gcloud network-security security-profile-groups delete

```text
NAME
    gcloud network-security security-profile-groups delete - delete a Security
        Profile Group

SYNOPSIS
    gcloud network-security security-profile-groups delete
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile Group.

EXAMPLES
    To delete an Security Profile Group called my-security-profile-group run:

        $ gcloud network-security security-profile-groups delete \
          my-security-profile-group --organization=1234 --location=global

POSITIONAL ARGUMENTS
     Security profile group resource - Security Profile Group Name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument security_profile_group on the command line with
        a fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfileGroups,
        networksecurity.projects.locations.securityProfileGroups].

     This must be specified.

       SECURITY_PROFILE_GROUP
          ID of the security_profile_group or fully qualified identifier for
          the security_profile_group.

          To set the security_profile_group attribute:
          + provide the argument security_profile_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          location of the security_profile_group - Global.

          To set the location attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID of Security Profile Group

          To set the organization attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfileGroups].

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

        $ gcloud alpha network-security security-profile-groups delete

        $ gcloud beta network-security security-profile-groups delete
```

### gcloud network-security security-profile-groups describe

```text
NAME
    gcloud network-security security-profile-groups describe - describe a
        Security Profile Group

SYNOPSIS
    gcloud network-security security-profile-groups describe
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details of a Security Profile Group.

EXAMPLES
    To show details of a Security Profile Group named my-security-profile-group
    run:

        $ gcloud network-security security-profile-groups describe \
          my-security-profile-group --organization=1234 --location=global

POSITIONAL ARGUMENTS
     Security profile group resource - Security Profile Group Name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument security_profile_group on the command line with
        a fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfileGroups,
        networksecurity.projects.locations.securityProfileGroups].

     This must be specified.

       SECURITY_PROFILE_GROUP
          ID of the security_profile_group or fully qualified identifier for
          the security_profile_group.

          To set the security_profile_group attribute:
          + provide the argument security_profile_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          location of the security_profile_group - Global.

          To set the location attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID of Security Profile Group

          To set the organization attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfileGroups].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profile-groups describe

        $ gcloud beta network-security security-profile-groups describe
```

### gcloud network-security security-profile-groups list

```text
NAME
    gcloud network-security security-profile-groups list - list Security
        Profile Groups

SYNOPSIS
    gcloud network-security security-profile-groups list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Security Profile Groups in the specified location.

EXAMPLES
    To list Security Profile Groups in specifed location, run:

        $ gcloud network-security security-profile-groups list \
          --location=global

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

        $ gcloud alpha network-security security-profile-groups list

        $ gcloud beta network-security security-profile-groups list
```

### gcloud network-security security-profile-groups update

```text
NAME
    gcloud network-security security-profile-groups update - update a Security
        Profile Group

SYNOPSIS
    gcloud network-security security-profile-groups update
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-threat-prevention-profile
          | [--threat-prevention-profile=THREAT_PREVENTION_PROFILE
          : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT]]
        [--clear-url-filtering-profile
          | [--url-filtering-profile=URL_FILTERING_PROFILE
          : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION
          --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT]]
        [--clear-wildfire-analysis-profile
          | [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE
          : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update details of a Security Profile Group.

EXAMPLES
    To update a Security Profile Group with new threat prevention profile
    my-new-security-profile, run:

        $ gcloud network-security security-profile-groups update \
          my-security-profile-group --organization=1234 \
          --location=global \
          --threat-prevention-profile=`organizations/1234/locations/\
        global/securityProfiles/my-new-security-profile` \
            --description='New Security Profile of type threat prevention'

POSITIONAL ARGUMENTS
     Security profile group resource - Security Profile Group Name. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument security_profile_group on the command line with
        a fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.securityProfileGroups,
        networksecurity.projects.locations.securityProfileGroups].

     This must be specified.

       SECURITY_PROFILE_GROUP
          ID of the security_profile_group or fully qualified identifier for
          the security_profile_group.

          To set the security_profile_group attribute:
          + provide the argument security_profile_group on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          location of the security_profile_group - Global.

          To set the location attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --location on the command line.

       --organization=ORGANIZATION
          Organization ID of Security Profile Group

          To set the organization attribute:
          + provide the argument security_profile_group on the command line
            with a fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.securityProfileGroups].

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

     --description=DESCRIPTION
        Brief description of the security profile group

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

              $ gcloud network-security security-profile-groups update \
                --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profile-groups update \
                --clear-labels --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

     At most one of these can be specified:

       --clear-threat-prevention-profile
          Clear the threat-prevention-profile field.

       Or at least one of these can be specified:

         Threat prevention profile resource - Path to Threat Prevention Profile
         resource. The arguments in this group can be used to specify the
         attributes of this resource. This resource can be one of the following
         types: [networksecurity.organizations.locations.securityProfiles,
         networksecurity.projects.locations.securityProfiles].

         --threat-prevention-profile=THREAT_PREVENTION_PROFILE
            ID of the threat_prevention_profile or fully qualified identifier
            for the threat_prevention_profile.

            To set the name attribute:
            - provide the argument --threat-prevention-profile on the command
              line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION
            Location of the threat_prevention_profile. NOTE: Only global
            security profiles are supported.

            To set the location attribute:
            - provide the argument --threat-prevention-profile on the command
              line with a fully specified name;
            - provide the argument --threat-prevention-profile-location on
              the command line;
            - provide the argument --security-profile-location on the command
              line;
            - provide the argument --location on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name.

         --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION
            Organization ID of the Security Profile.

            To set the organization attribute:
            - provide the argument --threat-prevention-profile on the command
              line with a fully specified name;
            - provide the argument --threat-prevention-profile-organization
              on the command line;
            - provide the argument --security-profile-organization on the
              command line;
            - provide the argument --organization on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.organizations.locations.securityProfiles].

         --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT
            Project ID of the threat_prevention_profile.

            To set the project attribute:
            - provide the argument --threat-prevention-profile on the command
              line with a fully specified name;
            - provide the argument --threat-prevention-profile-project on the
              command line;
            - set the property core/project;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.projects.locations.securityProfiles].

     At most one of these can be specified:

       --clear-url-filtering-profile
          Clear the url-filtering-profile field.

       Or at least one of these can be specified:

         Url filtering profile resource - Path to URL Filtering Profile
         resource. The arguments in this group can be used to specify the
         attributes of this resource. This resource can be one of the following
         types: [networksecurity.organizations.locations.securityProfiles,
         networksecurity.projects.locations.securityProfiles].

         --url-filtering-profile=URL_FILTERING_PROFILE
            ID of the url_filtering_profile or fully qualified identifier for
            the url_filtering_profile.

            To set the name attribute:
            - provide the argument --url-filtering-profile on the command
              line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION
            Location of the url_filtering_profile. NOTE: Only global security
            profiles are supported.

            To set the location attribute:
            - provide the argument --url-filtering-profile on the command
              line with a fully specified name;
            - provide the argument --url-filtering-profile-location on the
              command line;
            - provide the argument --location on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name.

         --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION
            Organization ID of the Security Profile.

            To set the organization attribute:
            - provide the argument --url-filtering-profile on the command
              line with a fully specified name;
            - provide the argument --url-filtering-profile-organization on
              the command line;
            - provide the argument --organization on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.organizations.locations.securityProfiles].

         --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT
            Project ID of the url_filtering_profile.

            To set the project attribute:
            - provide the argument --url-filtering-profile on the command
              line with a fully specified name;
            - provide the argument --url-filtering-profile-project on the
              command line;
            - set the property core/project;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.projects.locations.securityProfiles].

     At most one of these can be specified:

       --clear-wildfire-analysis-profile
          Clear the wildfire-analysis-profile field.

       Or at least one of these can be specified:

         Wildfire analysis profile resource - Path to WildFire Analysis Profile
         resource. The arguments in this group can be used to specify the
         attributes of this resource. This resource can be one of the following
         types: [networksecurity.organizations.locations.securityProfiles,
         networksecurity.projects.locations.securityProfiles].

         --wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE
            ID of the wildfire_analysis_profile or fully qualified identifier
            for the wildfire_analysis_profile.

            To set the name attribute:
            - provide the argument --wildfire-analysis-profile on the command
              line.

            This flag argument must be specified if any of the other arguments
            in this group are specified.

         --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION
            Location of the wildfire_analysis_profile. NOTE: Only global
            security profiles are supported.

            To set the location attribute:
            - provide the argument --wildfire-analysis-profile on the command
              line with a fully specified name;
            - provide the argument --wildfire-analysis-profile-location on
              the command line;
            - provide the argument --location on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name.

         --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION
            Organization ID of the Security Profile.

            To set the organization attribute:
            - provide the argument --wildfire-analysis-profile on the command
              line with a fully specified name;
            - provide the argument --wildfire-analysis-profile-organization
              on the command line;
            - provide the argument --organization on the command line;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.organizations.locations.securityProfiles].

         --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT
            Project ID of the wildfire_analysis_profile.

            To set the project attribute:
            - provide the argument --wildfire-analysis-profile on the command
              line with a fully specified name;
            - provide the argument --wildfire-analysis-profile-project on the
              command line;
            - set the property core/project;
            - provide the argument security_profile_group on the command line
              with a fully specified name. Must be specified for resource of
              type [networksecurity.projects.locations.securityProfiles].

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profile-groups update

        $ gcloud beta network-security security-profile-groups update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud network-security security-profile-groups update my-security-profile-group \
    --organization=1234 \
    --location=global \
    --threat-prevention-profile='organizations/1234/locations/global/securityProfiles/my-new-security-profile' \
    --description='New Security Profile of type threat prevention'
```

### gcloud beta network-security security-profile-groups create

```text
NAME
    gcloud beta network-security security-profile-groups create - create a new
        Security Profile Group

SYNOPSIS
    gcloud beta network-security security-profile-groups create
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        ([--custom-intercept-profile=CUSTOM_INTERCEPT_PROFILE
          : --custom-intercept-profile-location=CUSTOM_INTERCEPT_PROFILE_LOCATION --custom-intercept-profile-organization=CUSTOM_INTERCEPT_PROFILE_ORGANIZATION --custom-intercept-profile-project=CUSTOM_INTERCEPT_PROFILE_PROJECT] [--custom-mirroring-profile=CUSTOM_MIRRORING_PROFILE : --custom-mirroring-profile-location=CUSTOM_MIRRORING_PROFILE_LOCATION --custom-mirroring-profile-organization=CUSTOM_MIRRORING_PROFILE_ORGANIZATION --custom-mirroring-profile-project=CUSTOM_MIRRORING_PROFILE_PROJECT] [--threat-prevention-profile=THREAT_PREVENTION_PROFILE : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT] [--url-filtering-profile=URL_FILTERING_PROFILE : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT] [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profile-groups delete

```text
NAME
    gcloud beta network-security security-profile-groups delete - delete a
        Security Profile Group

SYNOPSIS
    gcloud beta network-security security-profile-groups delete
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profile-groups describe

```text
NAME
    gcloud beta network-security security-profile-groups describe - describe a
        Security Profile Group

SYNOPSIS
    gcloud beta network-security security-profile-groups describe
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profile-groups list

```text
NAME
    gcloud beta network-security security-profile-groups list - list Security
        Profile Groups

SYNOPSIS
    gcloud beta network-security security-profile-groups list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profile-groups update

```text
NAME
    gcloud beta network-security security-profile-groups update - update a
        Security Profile Group

SYNOPSIS
    gcloud beta network-security security-profile-groups update
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-threat-prevention-profile
          | [--threat-prevention-profile=THREAT_PREVENTION_PROFILE
          : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT]]
        [--clear-url-filtering-profile
          | [--url-filtering-profile=URL_FILTERING_PROFILE
          : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION
          --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT]]
        [--clear-wildfire-analysis-profile
          | [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE
          : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profile-groups create

```text
NAME
    gcloud alpha network-security security-profile-groups create - create a new
        Security Profile Group

SYNOPSIS
    gcloud alpha network-security security-profile-groups create
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        ([--custom-intercept-profile=CUSTOM_INTERCEPT_PROFILE
          : --custom-intercept-profile-location=CUSTOM_INTERCEPT_PROFILE_LOCATION --custom-intercept-profile-organization=CUSTOM_INTERCEPT_PROFILE_ORGANIZATION --custom-intercept-profile-project=CUSTOM_INTERCEPT_PROFILE_PROJECT] [--custom-mirroring-profile=CUSTOM_MIRRORING_PROFILE : --custom-mirroring-profile-location=CUSTOM_MIRRORING_PROFILE_LOCATION --custom-mirroring-profile-organization=CUSTOM_MIRRORING_PROFILE_ORGANIZATION --custom-mirroring-profile-project=CUSTOM_MIRRORING_PROFILE_PROJECT] [--scm-profile=SCM_PROFILE : --scm-profile-location=SCM_PROFILE_LOCATION --scm-profile-organization=SCM_PROFILE_ORGANIZATION --scm-profile-project=SCM_PROFILE_PROJECT] [--threat-prevention-profile=THREAT_PREVENTION_PROFILE : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT] [--url-filtering-profile=URL_FILTERING_PROFILE : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT] [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT])
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profile-groups delete

```text
NAME
    gcloud alpha network-security security-profile-groups delete - delete a
        Security Profile Group

SYNOPSIS
    gcloud alpha network-security security-profile-groups delete
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profile-groups describe

```text
NAME
    gcloud alpha network-security security-profile-groups describe - describe a
        Security Profile Group

SYNOPSIS
    gcloud alpha network-security security-profile-groups describe
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profile-groups list

```text
NAME
    gcloud alpha network-security security-profile-groups list - list Security
        Profile Groups

SYNOPSIS
    gcloud alpha network-security security-profile-groups list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profile-groups update

```text
NAME
    gcloud alpha network-security security-profile-groups update - update a
        Security Profile Group

SYNOPSIS
    gcloud alpha network-security security-profile-groups update
        (SECURITY_PROFILE_GROUP
          : --location=LOCATION --organization=ORGANIZATION) [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-scm-profile | [--scm-profile=SCM_PROFILE
          : --scm-profile-location=SCM_PROFILE_LOCATION
          --scm-profile-organization=SCM_PROFILE_ORGANIZATION
          --scm-profile-project=SCM_PROFILE_PROJECT]]
        [--clear-threat-prevention-profile
          | [--threat-prevention-profile=THREAT_PREVENTION_PROFILE
          : --threat-prevention-profile-location=THREAT_PREVENTION_PROFILE_LOCATION --threat-prevention-profile-organization=THREAT_PREVENTION_PROFILE_ORGANIZATION --threat-prevention-profile-project=THREAT_PREVENTION_PROFILE_PROJECT]]
        [--clear-url-filtering-profile
          | [--url-filtering-profile=URL_FILTERING_PROFILE
          : --url-filtering-profile-location=URL_FILTERING_PROFILE_LOCATION
          --url-filtering-profile-organization=URL_FILTERING_PROFILE_ORGANIZATION --url-filtering-profile-project=URL_FILTERING_PROFILE_PROJECT]]
        [--clear-wildfire-analysis-profile
          | [--wildfire-analysis-profile=WILDFIRE_ANALYSIS_PROFILE
          : --wildfire-analysis-profile-location=WILDFIRE_ANALYSIS_PROFILE_LOCATION --wildfire-analysis-profile-organization=WILDFIRE_ANALYSIS_PROFILE_ORGANIZATION --wildfire-analysis-profile-project=WILDFIRE_ANALYSIS_PROFILE_PROJECT]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps flag values in backticks (for example `` --instance=`my-instance` ``), which the shell runs as command substitutions; the runnable form passes the values in single quotes.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profile-groups (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
