---
source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/update
---

# gcloud container hub rolloutsequences update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud container hub rolloutsequences update

```text
NAME
    gcloud container hub rolloutsequences update - update a rollout sequence
        resource

SYNOPSIS
    gcloud container hub rolloutsequences update ROLLOUTSEQUENCE [--async]
        [--auto-rollout-scope=[SCOPE,...]] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--stage-config=PATH_TO_FILE]
        [--clear-ignored-clusters-selector
          | --ignored-clusters-selector=IGNORED_CLUSTERS_SELECTOR]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a rollout sequence resource.

EXAMPLES
    To update a rollout sequence, run:

        $ gcloud container hub rolloutsequences update \
            ROLLOUT_SEQUENCE_NAME --stage-config=path/to/config.yaml \
            --display-name=my-display-name"

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

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --auto-rollout-scope=[SCOPE,...]
        Specifies the types of upgrades for which rollouts are automatically
        created. ALL and NONE cannot be combined with other values. SCOPE must
        be one of: CONTROL_PLANE_MINOR, CONTROL_PLANE_PATCH, NODE_MINOR,
        NODE_PATCH, ALL, NONE.

     --display-name=DISPLAY_NAME
        Display name of the rollout sequence.

     --labels=[KEY=VALUE,...]
        Labels for the rollout sequence.

     --stage-config=PATH_TO_FILE
        Path to the YAML file containing the stage configurations. The YAML
        file should contain a list of stages. Fleet projects and soak_duration
        are required. If label_selector is not specified, there is no
        filtering. A fleet project is the project where the fleet is hosted.
        Example:

            - stage:
              fleet-projects:
              # Expected format: projects/{project}
              - projects/my-dev-project
              soak-duration: 7d # Or 168h or 604800s
            - stage:
              fleet-projects:
              - projects/my-prod-project
              soak-duration: 3600s
              label-selector: resource.labels.canary=='true'
            - stage:
              fleet-projects:
              # Expected format: projects/{project}
              - projects/my-prod-project
              soak-duration: 30m

        Use a full or relative path to a local file containing the value of
        stage_config.

     At most one of these can be specified:

       --clear-ignored-clusters-selector
          Clear the ignored clusters selector.

       --ignored-clusters-selector=IGNORED_CLUSTERS_SELECTOR
          Selector for clusters to exclude from the Rollout Sequence. Must be a
          valid Common Expression Language (CEL) expression. Example:
          "resource.labels.ignored=='true'"

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha container hub rolloutsequences update

        $ gcloud beta container hub rolloutsequences update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud container hub rolloutsequences update ROLLOUT_SEQUENCE_NAME \
    --stage-config=path/to/config.yaml \
    --display-name=my-display-name
```

### gcloud beta container hub rolloutsequences update

```text
NAME
    gcloud beta container hub rolloutsequences update - update a rollout
        sequence resource

SYNOPSIS
    gcloud beta container hub rolloutsequences update ROLLOUTSEQUENCE [--async]
        [--auto-rollout-scope=[SCOPE,...]] [--display-name=DISPLAY_NAME]
        [--labels=[KEY=VALUE,...]] [--stage-config=PATH_TO_FILE]
        [--clear-ignored-clusters-selector
          | --ignored-clusters-selector=IGNORED_CLUSTERS_SELECTOR]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub rolloutsequences update

```text
NAME
    gcloud alpha container hub rolloutsequences update - update a rollout
        sequence resource

SYNOPSIS
    gcloud alpha container hub rolloutsequences update ROLLOUTSEQUENCE
        [--async] [--auto-rollout-scope=[SCOPE,...]]
        [--display-name=DISPLAY_NAME] [--labels=[KEY=VALUE,...]]
        [--stage-config=PATH_TO_FILE]
        [--clear-ignored-clusters-selector
          | --ignored-clusters-selector=IGNORED_CLUSTERS_SELECTOR]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray double quote after `--display-name=my-display-name`, which leaves the shell waiting for the closing quote; the runnable form removes it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/hub/rolloutsequences/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
