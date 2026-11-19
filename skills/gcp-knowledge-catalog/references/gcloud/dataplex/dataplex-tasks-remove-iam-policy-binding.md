---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/remove-iam-policy-binding
---

# gcloud dataplex tasks remove-iam-policy-binding

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex tasks remove-iam-policy-binding

```text
NAME
    gcloud dataplex tasks remove-iam-policy-binding - remove IAM policy binding
        from a Dataplex task resource

SYNOPSIS
    gcloud dataplex tasks remove-iam-policy-binding
        (TASK : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Remove IAM policy binding from a Dataplex task resource.

EXAMPLES
    To remove an IAM policy binding for the role roles/dataplex.viewer for the
    user testuser@gmail.com from a task test-task within lake test-lake in
    location us-central1, run:

        $ gcloud dataplex tasks remove-iam-policy-binding test-task \
            --location=us-central1 --lake=test-lake \
            --role=roles/dataplex.viewer --member=user:testuser@gmail.com

    See https://cloud.google.com/dataplex/docs/iam-roles for details of policy
    role and member types.

POSITIONAL ARGUMENTS
     Tasks resource - Arguments and flags that define the Dataplex task you
     want to remove IAM policy binding from. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument task on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TASK
          ID of the tasks or fully qualified identifier for the tasks.

          To set the task attribute:
          + provide the argument task on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --lake=LAKE
          The identifier of the Dataplex lake resource.

          To set the lake attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --lake on the command line.

       --location=LOCATION
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument task on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --member=PRINCIPAL
        The principal to remove the binding for. Should be of the form
        user|group|serviceAccount:email or domain:domain.

        Examples: user:test-user@gmail.com, group:admins@example.com,
        serviceAccount:test123@example.domain.com, or
        domain:example.domain.com.

        Deleted principals have an additional deleted: prefix and a ?uid=UID
        suffix, where UID is a unique identifier for the principal. Example:
        deleted:user:test-user@gmail.com?uid=123456789012345678901.

        Some resources also accept the following special values:
        * allUsers - Special identifier that represents anyone who is on the
          internet, with or without a Google account.
        * allAuthenticatedUsers - Special identifier that represents anyone
          who is authenticated with a Google account or a service account.

     --role=ROLE
        The role to remove the principal from.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex tasks remove-iam-policy-binding
```

### gcloud alpha dataplex tasks remove-iam-policy-binding

```text
NAME
    gcloud alpha dataplex tasks remove-iam-policy-binding - remove IAM policy
        binding from a Dataplex task resource

SYNOPSIS
    gcloud alpha dataplex tasks remove-iam-policy-binding
        (TASK : --lake=LAKE --location=LOCATION) --member=PRINCIPAL --role=ROLE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/tasks/remove-iam-policy-binding (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
