---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/wildfire-analysis
---

# gcloud network-security security-profiles wildfire-analysis (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles wildfire-analysis update-override

```text
NAME
    gcloud network-security security-profiles wildfire-analysis update-override
        - update an override in a WildFire Analysis Profile

SYNOPSIS
    gcloud network-security security-profiles wildfire-analysis update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update an override in a WildFire Analysis Security Profile.

EXAMPLES
    To update an override in a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with threat-id 12345 and action ALLOW,
    run:

        $ gcloud network-security security-profiles wildfire-analysis \
          update-override my-wf-profile --organization=1234 \
          --location=global --threat-ids=12345 --action=ALLOW

    To update an override in a WildFire Analysis Security Profile named
    my-wf-profile in organization 1234 with wildfire protocol HTTP and action
    DENY, run:

        $ gcloud network-security security-profiles wildfire-analysis \
          update-override my-wf-profile --organization=1234 \
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
            wildfire-analysis update-override

        $ gcloud beta network-security security-profiles wildfire-analysis \
            update-override
```

### gcloud beta network-security security-profiles wildfire-analysis add-inline-cloud-analysis-rule

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule - add a WildFire inline cloud analysis
        rule to a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis add-inline-ml-exception

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        add-inline-ml-exception - add a WildFire inline machine learning
        exception to a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        add-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis add-override

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        add-override - add an override to a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis add-submission-rule

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        add-submission-rule - add a WildFire submission rule to a WildFire
        Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        add-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis create

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis create -
        create a new WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis delete

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis delete -
        delete a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis delete-inline-cloud-analysis-rule

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule - delete a WildFire inline cloud
        analysis rule from a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis delete-inline-ml-exception

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        delete-inline-ml-exception - delete a WildFire inline machine learning
        exception from a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        delete-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis delete-override

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        delete-override - delete an override from a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis delete-submission-rule

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        delete-submission-rule - delete a WildFire submission rule from a
        WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        delete-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis describe

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis describe -
        describe a WildFire Analysis Security Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis list

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis list -
        list WildFire Analysis Security Profiles

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis update

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis update -
        update a WildFire Analysis Security Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--[no-]analyze-elf] [--[no-]analyze-macho] [--[no-]analyze-ms-office]
        [--[no-]analyze-ooxml] [--[no-]analyze-powershell-script-1]
        [--[no-]analyze-powershell-script-2] [--[no-]analyze-shell]
        [--[no-]analyze-windows-executables] [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--[no-]wildfire-realtime-lookup]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security security-profiles wildfire-analysis update-override

```text
NAME
    gcloud beta network-security security-profiles wildfire-analysis
        update-override - update an override in a WildFire Analysis Profile

SYNOPSIS
    gcloud beta network-security security-profiles wildfire-analysis
        update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis add-inline-cloud-analysis-rule

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule - add a WildFire inline cloud analysis
        rule to a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        add-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis add-inline-ml-exception

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        add-inline-ml-exception - add a WildFire inline machine learning
        exception to a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        add-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis add-override

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        add-override - add an override to a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        add-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis add-submission-rule

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        add-submission-rule - add a WildFire submission rule to a WildFire
        Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        add-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis create

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis create -
        create a new WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis create
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis delete

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis delete -
        delete a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis delete-inline-cloud-analysis-rule

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule - delete a WildFire inline cloud
        analysis rule from a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-inline-cloud-analysis-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION --direction=DIRECTION --file-types=[FILE_TYPE,...]
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis delete-inline-ml-exception

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-inline-ml-exception - delete a WildFire inline machine learning
        exception from a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-inline-ml-exception
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --partial-hash=PARTIAL_HASH [--async] [--filename=FILENAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis delete-override

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-override - delete an override from a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis delete-submission-rule

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-submission-rule - delete a WildFire submission rule from a
        WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        delete-submission-rule
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --direction=DIRECTION --file-types=[FILE_TYPE,...] [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis describe

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis describe
        - describe a WildFire Analysis Security Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis describe
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis list

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis list -
        list WildFire Analysis Security Profiles

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis list
        (--location=LOCATION : --organization=ORGANIZATION)
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis update

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis update -
        update a WildFire Analysis Security Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis update
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--[no-]analyze-elf] [--[no-]analyze-macho] [--[no-]analyze-ms-office]
        [--[no-]analyze-ooxml] [--[no-]analyze-powershell-script-1]
        [--[no-]analyze-powershell-script-2] [--[no-]analyze-shell]
        [--[no-]analyze-windows-executables] [--async]
        [--description=DESCRIPTION] [--update-labels=[KEY=VALUE,...]]
        [--[no-]wildfire-realtime-lookup]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles wildfire-analysis update-override

```text
NAME
    gcloud alpha network-security security-profiles wildfire-analysis
        update-override - update an override in a WildFire Analysis Profile

SYNOPSIS
    gcloud alpha network-security security-profiles wildfire-analysis
        update-override
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        --action=ACTION
        (--threat-ids=[THREAT_ID,...] | --wildfire=[PROTOCOL,...]
          | --wildfire-inline-ml=[PROTOCOL,...]) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/wildfire-analysis (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
