---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/run
---

# gcloud builds triggers run

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds triggers run

```text
NAME
    gcloud builds triggers run - run a build trigger

SYNOPSIS
    gcloud builds triggers run (TRIGGER : --region=REGION)
        [--substitutions=[KEY=VALUE,...]]
        [--branch=BRANCH | --sha=SHA | --tag=TAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Run a build trigger.

EXAMPLES
    To run a build trigger, run:

        $ gcloud builds triggers run MY-TRIGGER --branch=master

POSITIONAL ARGUMENTS
     Trigger resource - Build Trigger. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument TRIGGER on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TRIGGER
          ID of the trigger or fully qualified identifier for the trigger.

          To set the trigger attribute:
          + provide the argument TRIGGER on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud location for the trigger.

          To set the region attribute:
          + provide the argument TRIGGER on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property builds/region.

FLAGS
     --substitutions=[KEY=VALUE,...]
        Parameters to be substituted in the build specification. For example:

            $ gcloud builds triggers run ... \
                --substitutions _FAVORITE_COLOR=blue,_NUM_CANDIES=10

        This will result in a build where every occurrence of
        ${_FAVORITE_COLOR} in certain fields is replaced by "blue", and
        similarly for ${_NUM_CANDIES} and "10".

        Substitutions can be applied to user-defined variables (starting with
        an underscore) and to the following built-in variables: REPO_NAME,
        BRANCH_NAME, TAG_NAME, REVISION_ID, COMMIT_SHA, SHORT_SHA.

        For more details, see:
        https://cloud.google.com/build/docs/configuring-builds/substitute-variable-values

     At most one of these can be specified:

       --branch=BRANCH
          Branch to run.

       --sha=SHA
          SHA to run.

       --tag=TAG
          Tag to run.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds triggers run

        $ gcloud beta builds triggers run
```

### gcloud beta builds triggers run

```text
NAME
    gcloud beta builds triggers run - run a build trigger

SYNOPSIS
    gcloud beta builds triggers run (TRIGGER : --region=REGION)
        [--substitutions=[KEY=VALUE,...]]
        [--branch=BRANCH | --sha=SHA | --tag=TAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds triggers run

```text
NAME
    gcloud alpha builds triggers run - run a build trigger

SYNOPSIS
    gcloud alpha builds triggers run (TRIGGER : --region=REGION)
        [--substitutions=[KEY=VALUE,...]]
        [--branch=BRANCH | --sha=SHA | --tag=TAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/triggers/run (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
