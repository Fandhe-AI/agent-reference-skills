---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reset-windows-password
---

# gcloud compute reset-windows-password

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute reset-windows-password

```text
NAME
    gcloud compute reset-windows-password - reset and return a password for a
        Windows machine instance

SYNOPSIS
    gcloud compute reset-windows-password INSTANCE_NAME [--user=USER]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute reset-windows-password allows a user to reset and retrieve a
    password for a Windows virtual machine instance. If the Windows account
    does not exist, this command will cause the account to be created and the
    password for that new account will be returned.

    For Windows instances that are running a domain controller, running this
    command creates a new domain user if the user does not exist, or resets the
    password if the user does exist. It is not possible to use this command to
    create a local user on a domain-controller instance.

    NOTE: When resetting passwords or adding a new user to a Domain Controller
    in this way, the user will be added to the built in Admin Group on the
    Domain Controller. This will give the user wide reaching permissions. If
    this is not the desired outcome then Active Directory Users and Computers
    should be used instead.

    For all other instances, including domain-joined instances, running this
    command creates a local user or resets the password for a local user.

    WARNING: Resetting a password for an existing user can cause the loss of
    data encrypted with the current Windows password, such as encrypted files
    or stored passwords.

    The user running this command must have write permission for the Google
    Compute Engine project containing the Windows instance.

EXAMPLES
    To reset the password for user 'foo' on a Windows instance 'my-instance' in
    zone 'us-central1-f', run:

        $ gcloud compute reset-windows-password my-instance \
            --zone=us-central1-f --user=foo

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --user=USER
        USER specifies the username to get the password for. If omitted, the
        username is derived from your authenticated account email address.

     --zone=ZONE
        Zone of the instance to operate on. If not specified, you might be
        prompted to select a zone (interactive mode only). gcloud attempts to
        identify the appropriate zone by searching for resources in your
        currently active project. If the zone cannot be determined, gcloud
        prompts you for a selection with all available Google Cloud Platform
        zones.

        To avoid prompting when this flag is omitted, the user can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute reset-windows-password

        $ gcloud beta compute reset-windows-password
```

### gcloud beta compute reset-windows-password

```text
NAME
    gcloud beta compute reset-windows-password - reset and return a password
        for a Windows machine instance

SYNOPSIS
    gcloud beta compute reset-windows-password INSTANCE_NAME [--user=USER]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute reset-windows-password

```text
NAME
    gcloud alpha compute reset-windows-password - reset and return a password
        for a Windows machine instance

SYNOPSIS
    gcloud alpha compute reset-windows-password INSTANCE_NAME [--user=USER]
        [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/reset-windows-password (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
