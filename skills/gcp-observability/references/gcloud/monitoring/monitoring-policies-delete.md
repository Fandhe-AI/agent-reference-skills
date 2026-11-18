---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/policies/delete
---

# gcloud monitoring policies delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring policies delete

```text
NAME
    gcloud monitoring policies delete - delete a Cloud Monitoring alerting
        policy

SYNOPSIS
    gcloud monitoring policies delete POLICY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Monitoring alerting policy.

POSITIONAL ARGUMENTS
     Policy resource - The alerting policy to delete. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       POLICY
          ID of the policy or fully qualified identifier for the policy.

          To set the policy attribute:
          + provide the argument policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the monitoring/v3 API. The full documentation for this
    API can be found at: https://cloud.google.com/monitoring/api/

NOTES
    These variants are also available:

        $ gcloud alpha monitoring policies delete

        $ gcloud beta monitoring policies delete
```

### gcloud beta monitoring policies delete

```text
NAME
    gcloud beta monitoring policies delete - delete a Cloud Monitoring alerting
        policy

SYNOPSIS
    gcloud beta monitoring policies delete POLICY [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring policies delete

```text
NAME
    gcloud alpha monitoring policies delete - delete a Cloud Monitoring
        alerting policy

SYNOPSIS
    gcloud alpha monitoring policies delete POLICY [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/policies/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
