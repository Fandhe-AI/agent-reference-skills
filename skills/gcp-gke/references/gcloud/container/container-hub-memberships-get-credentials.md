---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/get-credentials
---

# gcloud container hub memberships get-credentials

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub memberships get-credentials

```text
NAME
    gcloud container hub memberships get-credentials - fetch credentials for a
        fleet-registered cluster to be used in Connect Gateway

SYNOPSIS
    gcloud container hub memberships get-credentials
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud container hub memberships get-credentials updates the kubeconfig
    file with the appropriate credentials and endpoint information to send
    kubectl commands to a fleet-registered and -connected cluster through the
    Connect Gateway service.

    It takes a project, passed through by set defaults or flags. By default,
    credentials are written to $HOME/.kube/config. You can provide an alternate
    path by setting the KUBECONFIG environment variable. If KUBECONFIG contains
    multiple paths, the first one is used.

    Upon success, this command will switch the current context to the target
    cluster if other contexts are already present in the kubeconfig file.

    To force the use of Application Default Credentials (ADC) for
    authentication, you can set the
    container/use_application_default_credentials property to true:

        $ gcloud config set container/use_application_default_credentials \
            true

EXAMPLES
    Get the Gateway kubeconfig for a globally registered cluster:

        $ gcloud container hub memberships get-credentials my-cluster
        $ gcloud container hub memberships get-credentials my-cluster \
            --location=global

    Get the Gateway kubeconfig for a cluster registered in us-central1:

        $ gcloud container hub memberships get-credentials my-cluster \
            --location=us-central1

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
          specified, attempts to automatically choose the correct region.

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

        $ gcloud alpha container hub memberships get-credentials

        $ gcloud beta container hub memberships get-credentials
```

### gcloud beta container hub memberships get-credentials

```text
NAME
    gcloud beta container hub memberships get-credentials - fetch credentials
        for a fleet-registered cluster to be used in Connect Gateway

SYNOPSIS
    gcloud beta container hub memberships get-credentials
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships get-credentials

```text
NAME
    gcloud alpha container hub memberships get-credentials - fetch credentials
        for a fleet-registered cluster to be used in Connect Gateway

SYNOPSIS
    gcloud alpha container hub memberships get-credentials
        (MEMBERSHIP_NAME : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/get-credentials (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
