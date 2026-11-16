---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/describe
---

# gcloud container hub rolloutsequences describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub rolloutsequences describe

```text
NAME
    gcloud container hub rolloutsequences describe - describe a rollout
        sequence

SYNOPSIS
    gcloud container hub rolloutsequences describe ROLLOUTSEQUENCE
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a rollout sequence.

EXAMPLES
    To describe a rollout sequence named my-rollout-sequence, run:

        $ gcloud container hub rolloutsequences describe my-rollout-sequence

POSITIONAL ARGUMENTS
     RolloutSequence resource - The group of arguments defining a Rollout
     Sequence. This represents a Cloud resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument rolloutSequence on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument rolloutSequence on the command line with a fully
        specified name;
      * global is the only supported location.

     This must be specified.

       ROLLOUTSEQUENCE
          ID of the rolloutSequence or fully qualified identifier for the
          rolloutSequence.

          To set the rollout_sequence attribute:
          + provide the argument rolloutSequence on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub rolloutsequences describe

        $ gcloud beta container hub rolloutsequences describe
```

### gcloud beta container hub rolloutsequences describe

```text
NAME
    gcloud beta container hub rolloutsequences describe - describe a rollout
        sequence

SYNOPSIS
    gcloud beta container hub rolloutsequences describe ROLLOUTSEQUENCE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub rolloutsequences describe

```text
NAME
    gcloud alpha container hub rolloutsequences describe - describe a rollout
        sequence

SYNOPSIS
    gcloud alpha container hub rolloutsequences describe ROLLOUTSEQUENCE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
