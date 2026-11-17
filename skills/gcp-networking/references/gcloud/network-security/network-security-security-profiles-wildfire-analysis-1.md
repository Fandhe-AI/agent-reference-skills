---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/wildfire-analysis
---

# gcloud network-security security-profiles wildfire-analysis (part 1/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles wildfire-analysis add-inline-cloud-analysis-rule

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule - add a WildFire inline cloud analysis
        rule to a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add a WildFire inline cloud analysis rule to a WildFire Analysis Security
    Profile.

EXAMPLES
    To add an inline cloud analysis rule to a WildFire Analysis Security
    Profile named my-wf-profile in organization 1234 with file-types ANY_FILE,
    direction BOTH, and action ALLOW, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-inline-cloud-analysis-rule my-wf-profile \
          --organization=1234 --location=global --file-types=ANY_FILE \
          --direction=BOTH --action=ALLOW

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
        Action to take when Inline Cloud Analysis detects a threat. ACTION must
        be one of: ALLOW, DENY, ALERT.

     --direction=DIRECTION
        Direction of traffic that will be checked for files to submit to
        WildFire. DIRECTION must be one of: UPLOAD, DOWNLOAD, BOTH.

     --file-types=[FILE_TYPE,...]
        Types of files that will be submitted to WildFire for analysis.
        FILE_TYPE must be one of: ANY_FILE, PE. If ANY_FILE is specified, no
        other types can be specified.

OPTIONAL FLAGS
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
            wildfire-analysis add-inline-cloud-analysis-rule

        $ gcloud beta network-security security-profiles wildfire-analysis \
            add-inline-cloud-analysis-rule
```

### gcloud network-security security-profiles wildfire-analysis add-inline-ml-exception

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        add-inline-ml-exception - add a WildFire inline machine learning
        exception to a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        add-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add a WildFire inline machine learning exception to a WildFire Analysis
    Security Profile.

EXAMPLES
    To add an inline machine learning exception to a WildFire Analysis Security
    Profile named my-wf-profile in organization 1234 with partial-hash
    12345abcdef, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-inline-ml-exception my-wf-profile --organization=1234 \
          --location=global --partial-hash=12345abcdef

    To add an inline machine learning exception to a WildFire Analysis Security
    Profile named my-wf-profile in organization 1234 with partial-hash
    12345abcdef and filename virus.exe, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-inline-ml-exception my-wf-profile --organization=1234 \
          --location=global --partial-hash=12345abcdef \
          --filename=virus.exe

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
     --partial-hash=PARTIAL_HASH
        Machine learning partial hash of the file.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

     --filename=FILENAME
        Name of the file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles \
            wildfire-analysis add-inline-ml-exception

        $ gcloud beta network-security security-profiles wildfire-analysis \
            add-inline-ml-exception
```

### gcloud network-security security-profiles wildfire-analysis add-override

```text
NAME
    gcloud network-security security-profiles wildfire-analysis add-override -
        add an override to a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add an override to a WildFire Analysis Security Profile.

EXAMPLES
    To add an override to a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with threat-id 12345 and action ALLOW,
    run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-override my-wf-profile --organization=1234 \
          --location=global --threat-ids=12345 --action=ALLOW

    To add an override to a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with wildfire protocol HTTP and action
    DENY, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-override my-wf-profile --organization=1234 \
          --location=global --wildfire=HTTP --action=DENY

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
        The action to take for this override. ACTION must be one of: DEFAULT,
        ALLOW, DENY, ALERT.

     Exactly one of these arguments must be specified.

     Exactly one of these must be specified:

       --threat-ids=[THREAT_ID,...]
          Comma-separated list of WildFire Signature IDs to override the action
          for. If specified, --action must be set to DEFAULT or ALLOW.

       --wildfire=[PROTOCOL,...]
          Comma-separated list of protocols to override the action for WildFire
          threats. PROTOCOL must be one of: SMTP, SMB, POP3, IMAP, HTTP2, HTTP,
          FTP.

       --wildfire-inline-ml=[PROTOCOL,...]
          Comma-separated list of protocols to override the action for WildFire
          Inline ML threats. PROTOCOL must be one of: SMTP, SMB, POP3, IMAP,
          HTTP2, HTTP, FTP.

OPTIONAL FLAGS
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
            wildfire-analysis add-override

        $ gcloud beta network-security security-profiles wildfire-analysis \
            add-override
```

### gcloud network-security security-profiles wildfire-analysis add-submission-rule

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        add-submission-rule - add a WildFire submission rule to a WildFire
        Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        add-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Add a WildFire submission rule to a WildFire Analysis Security Profile.

EXAMPLES
    To add a submission rule to a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with file-types ANY_FILE and direction
    BOTH, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          add-submission-rule my-wf-profile --organization=1234 \
          --location=global --file-types=ANY_FILE --direction=BOTH

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
     --direction=DIRECTION
        Direction of traffic that will be checked for files to submit to
        WildFire. DIRECTION must be one of: UPLOAD, DOWNLOAD, BOTH.

     --file-types=[FILE_TYPE,...]
        Types of files that will be submitted to WildFire for analysis.
        FILE_TYPE must be one of: ANY_FILE, APK, ARCHIVE, EMAIL_LINK, FLASH,
        JAR, LINUX, MS_OFFICE, PDF, PE, SCRIPT. If ANY_FILE is specified, no
        other types can be specified.

OPTIONAL FLAGS
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
            wildfire-analysis add-submission-rule

        $ gcloud beta network-security security-profiles wildfire-analysis \
            add-submission-rule
```

### gcloud network-security security-profiles wildfire-analysis create

```text
NAME
    gcloud network-security security-profiles wildfire-analysis create - create
        a new WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a new WildFire Analysis Security Profile.

EXAMPLES
    To create a WildFire Analysis Security Profile named
    my-wildfire-security-profile with an optional description as New WildFire
    Security Profile, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          create my-wildfire-security-profile \
          --description="New WildFire Security Profile"

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
            wildfire-analysis create

        $ gcloud beta network-security security-profiles wildfire-analysis \
            create
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles wildfire-analysis create my-wildfire-security-profile \
    --organization=1234 \
    --location=global \
    --description="New WildFire Security Profile"
```

### gcloud network-security security-profiles wildfire-analysis delete

```text
NAME
    gcloud network-security security-profiles wildfire-analysis delete - delete
        a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile.

EXAMPLES
    To delete a Security Profile called my-security-profile run:

        $ gcloud network-security security-profiles wildfire-analysis \
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
            wildfire-analysis delete

        $ gcloud beta network-security security-profiles wildfire-analysis \
            delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud network-security security-profiles wildfire-analysis delete my-security-profile \
    --organization=1234 \
    --location=global
```

### gcloud network-security security-profiles wildfire-analysis delete-inline-cloud-analysis-rule

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule - delete a WildFire inline cloud
        analysis rule from a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a WildFire inline cloud analysis rule from a WildFire Analysis
    Security Profile.

EXAMPLES
    To delete an inline cloud analysis rule from a WildFire Analysis Security
    Profile named my-wf-profile in organization 1234 with file-types ANY_FILE,
    direction BOTH, and action ALLOW, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-inline-cloud-analysis-rule my-wf-profile \
          --organization=1234 --location=global --file-types=ANY_FILE \
          --direction=BOTH --action=ALLOW

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
        Action to take when Inline Cloud Analysis detects a threat. ACTION must
        be one of: ALLOW, DENY, ALERT.

     --direction=DIRECTION
        Direction of traffic that will be checked for files to submit to
        WildFire. DIRECTION must be one of: UPLOAD, DOWNLOAD, BOTH.

     --file-types=[FILE_TYPE,...]
        Types of files that will be submitted to WildFire for analysis.
        FILE_TYPE must be one of: ANY_FILE, PE. If ANY_FILE is specified, no
        other types can be specified.

OPTIONAL FLAGS
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
            wildfire-analysis delete-inline-cloud-analysis-rule

        $ gcloud beta network-security security-profiles wildfire-analysis \
            delete-inline-cloud-analysis-rule
```

### gcloud network-security security-profiles wildfire-analysis delete-inline-ml-exception

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        delete-inline-ml-exception - delete a WildFire inline machine learning
        exception from a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        delete-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a WildFire inline machine learning exception from a WildFire
    Analysis Security Profile.

EXAMPLES
    To delete an inline machine learning exception from a WildFire Analysis
    Security Profile named my-wf-profile in organization 1234 with partial-hash
    12345abcdef, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-inline-ml-exception my-wf-profile --organization=1234 \
          --location=global --partial-hash=12345abcdef

    To delete an inline machine learning exception from a WildFire Analysis
    Security Profile named my-wf-profile in organization 1234 with partial-hash
    12345abcdef and filename virus.exe, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-inline-ml-exception my-wf-profile --organization=1234 \
          --location=global --partial-hash=12345abcdef \
          --filename=virus.exe

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
     --partial-hash=PARTIAL_HASH
        Machine learning partial hash of the file.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is False.

     --filename=FILENAME
        Name of the file.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security security-profiles \
            wildfire-analysis delete-inline-ml-exception

        $ gcloud beta network-security security-profiles wildfire-analysis \
            delete-inline-ml-exception
```

### gcloud network-security security-profiles wildfire-analysis delete-override

```text
NAME
    gcloud network-security security-profiles wildfire-analysis delete-override
        - delete an override from a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete an override from a WildFire Analysis Security Profile.

EXAMPLES
    To delete an override from a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with threat-id 12345, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-override my-wf-profile --organization=1234 \
          --location=global --threat-ids=12345

    To delete an override from a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with wildfire protocol HTTP, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-override my-wf-profile --organization=1234 \
          --location=global --wildfire=HTTP

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

       --threat-ids=[THREAT_ID,...]
          Comma-separated list of WildFire Signature IDs to delete the override
          for.

       --wildfire=[PROTOCOL,...]
          Comma-separated list of protocols to delete the override for WildFire
          threats. PROTOCOL must be one of: SMTP, SMB, POP3, IMAP, HTTP2, HTTP,
          FTP.

       --wildfire-inline-ml=[PROTOCOL,...]
          Comma-separated list of protocols to delete the override for WildFire
          Inline ML threats. PROTOCOL must be one of: SMTP, SMB, POP3, IMAP,
          HTTP2, HTTP, FTP.

OPTIONAL FLAGS
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
            wildfire-analysis delete-override

        $ gcloud beta network-security security-profiles wildfire-analysis \
            delete-override
```

### gcloud network-security security-profiles wildfire-analysis delete-submission-rule

```text
NAME
    gcloud network-security security-profiles wildfire-analysis
        delete-submission-rule - delete a WildFire submission rule from a
        WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis
        delete-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a WildFire submission rule from a WildFire Analysis Security
    Profile.

EXAMPLES
    To delete a submission rule from a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with file-types ANY_FILE and direction
    BOTH, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          delete-submission-rule my-wf-profile --organization=1234 \
          --location=global --file-types=ANY_FILE --direction=BOTH

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
     --direction=DIRECTION
        Direction of traffic that will be checked for files to submit to
        WildFire. DIRECTION must be one of: UPLOAD, DOWNLOAD, BOTH.

     --file-types=[FILE_TYPE,...]
        Types of files that will be submitted to WildFire for analysis.
        FILE_TYPE must be one of: ANY_FILE, APK, ARCHIVE, EMAIL_LINK, FLASH,
        JAR, LINUX, MS_OFFICE, PDF, PE, SCRIPT. If ANY_FILE is specified, no
        other types can be specified.

OPTIONAL FLAGS
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
            wildfire-analysis delete-submission-rule

        $ gcloud beta network-security security-profiles wildfire-analysis \
            delete-submission-rule
```

### gcloud network-security security-profiles wildfire-analysis describe

```text
NAME
    gcloud network-security security-profiles wildfire-analysis describe -
        describe a WildFire Analysis Security Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a WildFire Analysis Security Profile.

EXAMPLES
    To describe a WildFire Analysis Security Profile named my-sp in
    organization 12345 and location global, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          describe my-sp --organization=12345 --location=global

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
            wildfire-analysis describe

        $ gcloud beta network-security security-profiles wildfire-analysis \
            describe
```

### gcloud network-security security-profiles wildfire-analysis list

```text
NAME
    gcloud network-security security-profiles wildfire-analysis list - list
        WildFire Analysis Security Profiles

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List WildFire Analysis Security Profiles.

EXAMPLES
    To list WildFire Analysis Security Profiles in organization 12345 and
    location global, run:

        $ gcloud network-security security-profiles wildfire-analysis list \
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
            wildfire-analysis list

        $ gcloud beta network-security security-profiles wildfire-analysis \
            list
```

### gcloud network-security security-profiles wildfire-analysis update

```text
NAME
    gcloud network-security security-profiles wildfire-analysis update - update
        a WildFire Analysis Security Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--[no-]analyze-elf] [--[no-]analyze-macho] [--[no-]analyze-ms-office]
        [--[no-]analyze-ooxml] [--[no-]analyze-powershell-script-1]
        [--[no-]analyze-powershell-script-2] [--[no-]analyze-shell]
        [--[no-]analyze-windows-executables] [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--[no-]wildfire-realtime-lookup]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a security profile of type WildFire Analysis.

EXAMPLES
    To update a WildFire Analysis security-profile my-wildfire-security-profile
    with organization 1234 and location global, run:

        $ gcloud network-security security-profiles wildfire-analysis \
            update my-wildfire-security-profile --organization=1234 \
            --location=global --no-wildfire-realtime-lookup \
            --analyze-windows-executables --no-analyze-shell

    To update labels of a WildFire Analysis security-profile, run:

        $ gcloud network-security security-profiles wildfire-analysis \
            update my-wildfire-security-profile --organization=1234 \
            --location=global --update-labels=key1=value1,key2=value2

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
     --[no-]analyze-elf
        Enable machine learning engine to dynamically detect malicious ELF
        files. Use --analyze-elf to enable and --no-analyze-elf to disable.

     --[no-]analyze-macho
        Enable machine learning engine to dynamically detect malicious Mach-O
        files. Use --analyze-macho to enable and --no-analyze-macho to disable.

     --[no-]analyze-ms-office
        Enable machine learning engine to dynamically detect malicious MSOffice
        (97-03) files. Use --analyze-ms-office to enable and
        --no-analyze-ms-office to disable.

     --[no-]analyze-ooxml
        Enable machine learning engine to dynamically detect malicious OOXML
        files. Use --analyze-ooxml to enable and --no-analyze-ooxml to disable.

     --[no-]analyze-powershell-script-1
        Enable machine learning engine to dynamically identify malicious
        PowerShell scripts with known length. Use --analyze-powershell-script-1
        to enable and --no-analyze-powershell-script-1 to disable.

     --[no-]analyze-powershell-script-2
        Enable machine learning engine to dynamically identify malicious
        PowerShell script without known length. Use
        --analyze-powershell-script-2 to enable and
        --no-analyze-powershell-script-2 to disable.

     --[no-]analyze-shell
        Enable machine learning engine to dynamically detect malicious Shell
        files. Use --analyze-shell to enable and --no-analyze-shell to disable.

     --[no-]analyze-windows-executables
        Enable machine learning engine to dynamically detect malicious PE
        files. Use --analyze-windows-executables to enable and
        --no-analyze-windows-executables to disable.

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

     --[no-]wildfire-realtime-lookup
        Hold the transfer of a file while the WildFire real-time signature
        cloud performs a signature lookup. Use --wildfire-realtime-lookup to
        enable and --no-wildfire-realtime-lookup to disable.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-security security-profiles wildfire-analysis \
                update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security security-profiles wildfire-analysis \
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

        $ gcloud alpha network-security security-profiles \
            wildfire-analysis update

        $ gcloud beta network-security security-profiles wildfire-analysis \
            update
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example gives only the security profile name; the SYNOPSIS is `(SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)`, and gcloud 593.0.0 fails with "[security_profile] resource missing required data" because `--location` is set only by a fully specified name or the flag (and `--organization` only by a fully specified name or the flag); the runnable form adds `--organization=1234 --location=global`, values that other examples on this page use.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/wildfire-analysis (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
