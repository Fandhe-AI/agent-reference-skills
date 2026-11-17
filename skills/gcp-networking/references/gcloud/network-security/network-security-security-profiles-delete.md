---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/delete
---

# gcloud network-security security-profiles delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security security-profiles delete

```text
NAME
    gcloud network-security security-profiles delete - delete a Security
        Profile

SYNOPSIS
    gcloud network-security security-profiles delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete the specified Security Profile.

EXAMPLES
    To delete a Security Profile called my-security-profile run:

        $ gcloud network-security security-profiles delete \
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

        $ gcloud alpha network-security security-profiles delete

        $ gcloud beta network-security security-profiles delete
```

### gcloud beta network-security security-profiles delete

```text
NAME
    gcloud beta network-security security-profiles delete - delete a Security
        Profile

SYNOPSIS
    gcloud beta network-security security-profiles delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security security-profiles delete

```text
NAME
    gcloud alpha network-security security-profiles delete - delete a Security
        Profile

SYNOPSIS
    gcloud alpha network-security security-profiles delete
        (SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)
        [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Incomplete example: the `gcloud network-security security-profiles delete` example gives only the profile name; the SYNOPSIS is `(SECURITY_PROFILE : --location=LOCATION --organization=ORGANIZATION)`, and gcloud 593.0.0 fails with "[security_profile] resource missing required data". Add `--location` and `--organization` (see FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/security-profiles/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
