---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/delete
---

# gcloud container hub memberships delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub memberships delete

```text
NAME
    gcloud container hub memberships delete - delete a membership

SYNOPSIS
    gcloud container hub memberships delete (MEMBERSHIP : --location=LOCATION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes the Fleet Membership resource corresponding to the
    cluster.

    This command is intended to delete stale Fleet Membership resources as
    doing so on a fully registered cluster will skip uninstalling the Connect
    Agent and and orphan in-cluster resources and agent connections to Google.
    To completely unregister the cluster, consider using the command: gcloud
    container hub memberships unregister.

EXAMPLES
    First retrieve the ID of the membership using the command below. The output
    of this command lists all the fleet's members, with their unique IDs in the
    Names column:

        $ gcloud container hub memberships list

    Delete a membership from the active project's fleet:

        $ gcloud container hub memberships delete MEMBERSHIP_NAME

POSITIONAL ARGUMENTS
     Membership resource - The cluster membership to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument membership on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MEMBERSHIP
          ID of the membership or fully qualified identifier for the
          membership.

          To set the membership attribute:
          + provide the argument membership on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location name.

          To set the location attribute:
          + provide the argument membership on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + global is the only supported location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the gkehub/v1 API. The full documentation for this API
    can be found at:
    https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster

NOTES
    These variants are also available:

        $ gcloud alpha container hub memberships delete

        $ gcloud beta container hub memberships delete
```

### gcloud beta container hub memberships delete

```text
NAME
    gcloud beta container hub memberships delete - delete a membership

SYNOPSIS
    gcloud beta container hub memberships delete
        (MEMBERSHIP : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub memberships delete

```text
NAME
    gcloud alpha container hub memberships delete - delete a membership

SYNOPSIS
    gcloud alpha container hub memberships delete
        (MEMBERSHIP : --location=LOCATION) [--async] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/memberships/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
