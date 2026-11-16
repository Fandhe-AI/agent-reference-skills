---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/create
---

# gcloud compute firewall-policies create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute firewall-policies create

```text
NAME
    gcloud compute firewall-policies create - create a Compute Engine
        organization firewall policy

SYNOPSIS
    gcloud compute firewall-policies create --short-name=SHORT_NAME
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute firewall-policies create is used to create organization
    firewall policies. An organization firewall policy is a set of rules that
    controls access to various resources.

EXAMPLES
    To create an organization firewall policy under folder with ID
    ``123456789", run:

        $ gcloud compute firewall-policies create --short-name=my-policy \
            --folder=123456789

REQUIRED FLAGS
     --short-name=SHORT_NAME
        A textual name of the firewall policy. The name must be 1-63 characters
        long, and comply with RFC 1035.

     Exactly one of these must be specified:

       --folder=FOLDER
          Folder in which the organization firewall policy is to be created.

       --organization=ORGANIZATION
          Organization in which the organization firewall policy is to be
          created.

OPTIONAL FLAGS
     --description=DESCRIPTION
        An optional, textual description for the organization security policy.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

IAM PERMISSIONS
    To create rules to a firewall policy, the user must have the following
    permission: compute.firewallPolicies.create.

    To find predefined roles that contain those permissions, see the Compute
    Engine IAM roles (https://cloud.google.com/compute/docs/access/iam).

NOTES
    These variants are also available:

        $ gcloud alpha compute firewall-policies create

        $ gcloud beta compute firewall-policies create
```

### gcloud beta compute firewall-policies create

```text
NAME
    gcloud beta compute firewall-policies create - create a Compute Engine
        organization firewall policy

SYNOPSIS
    gcloud beta compute firewall-policies create --short-name=SHORT_NAME
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-policies create

```text
NAME
    gcloud alpha compute firewall-policies create - create a Compute Engine
        organization firewall policy

SYNOPSIS
    gcloud alpha compute firewall-policies create --short-name=SHORT_NAME
        (--folder=FOLDER | --organization=ORGANIZATION)
        [--description=DESCRIPTION]
        [--security-profile-fallback-action=SECURITY_PROFILE_FALLBACK_ACTION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-policies/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
