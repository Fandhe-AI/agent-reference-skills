---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/set-iam-policy
---

# gcloud network-connectivity hubs set-iam-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-connectivity hubs set-iam-policy

```text
NAME
    gcloud network-connectivity hubs set-iam-policy - set the IAM policy of a
        hub resource

SYNOPSIS
    gcloud network-connectivity hubs set-iam-policy HUB POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Replace the existing IAM policy of a hub resource with a policy encoded in
    a JSON or YAML file.

EXAMPLES
    To replace the IAM policy of a hub resource with the policy defined in a
    file called policy.json, run:

        $ gcloud network-connectivity hubs set-iam-policy my-hub policy.json

POSITIONAL ARGUMENTS
     Hub resource - The hub for which to set the IAM policy. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument hub on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       HUB
          ID of the hub or fully qualified identifier for the hub.

          To set the hub attribute:
          + provide the argument hub on the command line.

     POLICY_FILE
        Path to a local JSON or YAML formatted file containing a valid policy.

        The output of the get-iam-policy command is a valid file, as is any
        JSON or YAML file conforming to the structure of a Policy
        (https://cloud.google.com/iam/reference/rest/v1/Policy).

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the networkconnectivity/v1 API. The full documentation
    for this API can be found at:
    https://cloud.google.com/network-connectivity/docs/reference/networkconnectivity/rest

NOTES
    This variant is also available:

        $ gcloud beta network-connectivity hubs set-iam-policy
```

### gcloud beta network-connectivity hubs set-iam-policy

```text
NAME
    gcloud beta network-connectivity hubs set-iam-policy - set the IAM policy
        of a hub resource

SYNOPSIS
    gcloud beta network-connectivity hubs set-iam-policy HUB POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/hubs/set-iam-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
