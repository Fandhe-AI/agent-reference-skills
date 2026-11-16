---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/update
---

# gcloud container hub update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub update

```text
NAME
    gcloud container hub update - update a fleet

SYNOPSIS
    gcloud container hub update [--async] [--display-name=DISPLAY_NAME]
        [--update-labels=[KEY=VALUE,...]]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          --binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
          --security-posture=SECURITY_POSTURE
          --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command can fail for the following reasons:
      o The project specified does not exist.
      o The project specified already has a fleet.
      o The active account does not have permission to access the given
        project.

EXAMPLES
    To update the display name of the fleet in project example-foo-bar-1 to
    updated-name, run:

        $ gcloud container hub update --display-name=updated-name \
            --project=example-foo-bar-1

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --display-name=DISPLAY_NAME
        Display name of the fleet to be created (optional). 4-30 characters,
        alphanumeric and [ '"!-] only.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     Default cluster configurations to apply across the fleet.

     Binary Authorization config.

     --binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
        Configure binary authorization mode for clusters to onboard the fleet,

            $ gcloud container hub update \
                --binauthz-evaluation-mode=policy-bindings

        BINAUTHZ_EVALUATION_MODE must be one of: disabled, policy-bindings.

     --binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
        The relative resource name of the Binary Authorization policy to audit
        and/or enforce. GKE policies have the following format:
        projects/{project_number}/platforms/gke/policies/{policy_id}.

     Security posture config.

     --security-posture=SECURITY_POSTURE
        To apply standard security posture to clusters in the fleet,

            $ gcloud container hub update --security-posture=standard

        SECURITY_POSTURE must be one of: disabled, standard, enterprise.

     --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING
        To apply standard vulnerability scanning to clusters in the fleet,

            $ gcloud container hub update \
                --workload-vulnerability-scanning=standard

        WORKLOAD_VULNERABILITY_SCANNING must be one of: disabled, standard,
        enterprise.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud container hub update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud container hub update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub update

        $ gcloud beta container hub update
```

### gcloud beta container hub update

```text
NAME
    gcloud beta container hub update - update a fleet

SYNOPSIS
    gcloud beta container hub update [--async] [--display-name=DISPLAY_NAME]
        [--update-labels=[KEY=VALUE,...]]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          --binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
          --security-posture=SECURITY_POSTURE
          --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub update

```text
NAME
    gcloud alpha container hub update - update a fleet

SYNOPSIS
    gcloud alpha container hub update [--async] [--display-name=DISPLAY_NAME]
        [--update-labels=[KEY=VALUE,...]]
        [--binauthz-evaluation-mode=BINAUTHZ_EVALUATION_MODE
          --binauthz-policy-bindings=[name=BINAUTHZ_POLICY]
          --security-posture=SECURITY_POSTURE
          --workload-vulnerability-scanning=WORKLOAD_VULNERABILITY_SCANNING]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
