---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/upgrade
---

# gcloud functions upgrade

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions upgrade

```text
NAME
    gcloud functions upgrade - upgrade a 1st gen Cloud Function to the Cloud
        Run function

SYNOPSIS
    gcloud functions upgrade (NAME : --region=REGION)
        [--abort | --redirect-traffic | --rollback-traffic
          | --commit --skip-detach | --max-instances=MAX_INSTANCES
          --runtime=RUNTIME
          --setup-config --trigger-service-account=TRIGGER_SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Upgrade a 1st gen Cloud Function to the Cloud Run function.

EXAMPLES
    To start the upgrade process for a 1st gen function foo and create a Cloud
    Run function copy, run:

        $ gcloud functions upgrade foo --setup-config

    Once you are ready to redirect traffic to the Cloud Run function copy, run:

        $ gcloud functions upgrade foo --redirect-traffic

    If you find you need to do more local testing you can rollback traffic to
    the 1st gen copy:

        $ gcloud functions upgrade foo --rollback-traffic

    Once you're ready to finish upgrading and delete the 1st gen copy, run:

        $ gcloud functions upgrade foo --commit

    You can abort the upgrade process at any time by running:

        $ gcloud functions upgrade foo --abort

POSITIONAL ARGUMENTS
     Function resource - The Cloud Function name to upgrade. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the function or fully qualified identifier for the function.

          To set the function attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the function. Overrides the default
          functions/region property value for this command invocation.

          To set the region attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property functions/region.

FLAGS
     Upgrade a 1st gen Cloud Function to a Cloud Run Function. You must specify
     one of the following flags:
      * --setup-config and optionally --trigger-service-account,
      * --redirect-traffic,
      * --rollback-traffic,
      * --commit and optionally --skip-detach,
      * --abort.

     At most one of these can be specified:

       --abort
          Undoes all steps of the upgrade process done so far. All traffic will
          point to the original 1st gen function copy and the 2nd gen function
          copy will be deleted.

       --redirect-traffic
          Redirects production traffic to the 2nd gen copy of the function.

       --rollback-traffic
          Rolls back production traffic to the original 1st gen copy of the
          function. The 2nd gen copy will still be available for testing.

       Or at least one of these can be specified:

         --commit
            Finishes the upgrade process and permanently deletes the original
            1st gen copy of the function.

         --skip-detach
            The function will not be detached when committing the upgrade to
            allow continued use of the Cloud Functions v2 API. You can detach
            the function to Cloud Run afterward
            https://docs.cloud.google.com/run/docs/functions/comparison#detach_your_function.
            This flag is only valid when used with the --commit flag.

       Or at least one of these can be specified:

         --max-instances=MAX_INSTANCES
            Sets the maximum number of instances for the function. A function
            execution that would exceed max-instances times out.

         --runtime=RUNTIME
            Runtime in which to run the function.

            Required when deploying a new function; optional when updating an
            existing function.

            For a list of available runtimes, run gcloud functions runtimes
            list.

         --setup-config
            Sets up the function upgrade config by creating a 2nd gen copy of
            the function's code and configuration.

         --trigger-service-account=TRIGGER_SERVICE_ACCOUNT
            The email address of the IAM service account associated with the
            Eventarc trigger for the function. This is used for authenticated
            invocation.

            If not provided, the function will use the project's default
            service account for Compute Engine.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions upgrade

        $ gcloud beta functions upgrade
```

### gcloud beta functions upgrade

```text
NAME
    gcloud beta functions upgrade - upgrade a 1st gen Cloud Function to the
        Cloud Run function

SYNOPSIS
    gcloud beta functions upgrade (NAME : --region=REGION)
        [--abort | --redirect-traffic | --rollback-traffic
          | --commit --skip-detach | --max-instances=MAX_INSTANCES
          --runtime=RUNTIME
          --setup-config --trigger-service-account=TRIGGER_SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions upgrade

```text
NAME
    gcloud alpha functions upgrade - upgrade a 1st gen Cloud Function to the
        Cloud Run function

SYNOPSIS
    gcloud alpha functions upgrade (NAME : --region=REGION)
        [--abort | --redirect-traffic | --rollback-traffic
          | --commit --skip-detach | --max-instances=MAX_INSTANCES
          --runtime=RUNTIME
          --setup-config --trigger-service-account=TRIGGER_SERVICE_ACCOUNT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/upgrade (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
