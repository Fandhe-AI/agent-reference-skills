---
source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/instances
---

# gcloud bms instances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud bms instances describe

```text
NAME
    gcloud bms instances describe - describe a Bare Metal solution instance

SYNOPSIS
    gcloud bms instances describe (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Bare Metal Solution instance.

EXAMPLES
    To get a description of an instance called my-instance in project
    my-project and region us-central1, run:

        $ gcloud bms instances describe my-instance --project=my-project \
            --region=us-central1

POSITIONAL ARGUMENTS
     Instance resource - instance. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms instances describe
```

### gcloud bms instances disable-serial-console

```text
NAME
    gcloud bms instances disable-serial-console - disable interactive serial
        console for a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances disable-serial-console (INSTANCE : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Disables interactive serial console for a Bare Metal Solution instance.

EXAMPLES
    To disable interactive serial console for an instance named test-instance,
    run:

        $ gcloud bms instances disable-serial-console test-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Bare Metal
     Solution instance you want to disable interactive serial console for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal

NOTES
    This variant is also available:

        $ gcloud alpha bms instances disable-serial-console
```

### gcloud bms instances enable-serial-console

```text
NAME
    gcloud bms instances enable-serial-console - enable interactive serial
        console for a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances enable-serial-console (INSTANCE : --region=REGION)
        [--async] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Enables interactive serial console for a Bare Metal Solution instance.

EXAMPLES
    To enable interactive serial console for an instance named test-instance,
    run:

        $ gcloud bms instances enable-serial-console test-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Bare Metal
     Solution instance you want to enable interactive serial console for. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal

NOTES
    This variant is also available:

        $ gcloud alpha bms instances enable-serial-console
```

### gcloud bms instances list

```text
NAME
    gcloud bms instances list - list Bare Metal Solution instances in a project

SYNOPSIS
    gcloud bms instances list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List Bare Metal Solution instances in a project.

EXAMPLES
    To list instances in the region within the project us-central1, run:

        $ gcloud bms instances list --region=us-central1

    Or:

    To list all instances in the project, run:

        $ gcloud bms instances list

FLAGS
     Region resource - region. This represents a Cloud resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the region or fully qualified identifier for the region.

        To set the region attribute:
        * provide the argument --region on the command line.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms instances list
```

### gcloud bms instances rename

```text
NAME
    gcloud bms instances rename - rename a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances rename (INSTANCE : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Rename a Bare Metal Solution instance.

EXAMPLES
    To rename an instance my-instance to my-new-instance-name in region
    us-central1, run:

        $ gcloud bms instances rename my-instance \
            --new-name=my-new-instance-name --region=us-central1 \
            --project=bms-example-project

POSITIONAL ARGUMENTS
     Instance resource - instance. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

REQUIRED FLAGS
     --new-name=NEW_NAME
        New instance name for renaming an already existing instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha bms instances rename
```

### gcloud bms instances reset

```text
NAME
    gcloud bms instances reset - reset a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances reset (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Perform a hard reset on a Bare Metal Solution instance.

    This will not perform a clean shutdown of the OS on the instance.

EXAMPLES
    To reset an instance named test-instance, run:

        $ gcloud bms instances reset test-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Bare Metal
     Solution instance you want to reset. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal

NOTES
    This variant is also available:

        $ gcloud alpha bms instances reset
```

### gcloud bms instances start

```text
NAME
    gcloud bms instances start - start a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances start (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Starts up a Bare Metal Solution instance.

EXAMPLES
    To start an instance named test-instance, run:

        $ gcloud bms instances start test-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Bare Metal
     Solution instance you want to start. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal

NOTES
    This variant is also available:

        $ gcloud alpha bms instances start
```

### gcloud bms instances stop

```text
NAME
    gcloud bms instances stop - stop a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances stop (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stops a Bare Metal Solution instance.

EXAMPLES
    To stop an instance named test-instance, run:

        $ gcloud bms instances stop test-instance

POSITIONAL ARGUMENTS
     Instance resource - Arguments and flags that specify the Bare Metal
     Solution instance you want to stop. The arguments in this group can be
     used to specify the attributes of this resource. (NOTE) Some attributes
     are not given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

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
    This command uses the baremetalsolution/v2 API. The full documentation for
    this API can be found at: https://cloud.google.com/bare-metal

NOTES
    This variant is also available:

        $ gcloud alpha bms instances stop
```

### gcloud bms instances update

```text
NAME
    gcloud bms instances update - update a Bare Metal Solution instance

SYNOPSIS
    gcloud bms instances update (INSTANCE : --region=REGION) [--async]
        [--[no-]enable-hyperthreading] [--os-image=OS_IMAGE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Bare Metal Solution instance.

    This call returns immediately, but the update operation may take several
    minutes to complete. To check if the operation is complete, use the
    describe command for the instance.

EXAMPLES
    To update an instance called my-instance in region us-central1 with a new
    label key1=value1, run:

        $ gcloud bms instances update my-instance --region=us-central1 \
            --update-labels=key1=value1

    To clear all labels, run:

        $ gcloud bms instances update my-instance --region=us-central1 \
            --clear-labels

POSITIONAL ARGUMENTS
     Instance resource - instance. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          Region of the resource.

          To set the region attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --region on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --[no-]enable-hyperthreading
        Enable hyperthreading for the server. Use --enable-hyperthreading to
        enable and --no-enable-hyperthreading to disable.

     --os-image=OS_IMAGE
        OS image to install on the server.

        To list all OS image codes supported by BMS, run:

            $ gcloud bms os-images list

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud bms instances update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud bms instances update --clear-labels \
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
    This variant is also available:

        $ gcloud alpha bms instances update
```

### gcloud alpha bms instances auth-info

```text
NAME
    gcloud alpha bms instances auth-info - get authentication information for a
        Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances auth-info (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances describe

```text
NAME
    gcloud alpha bms instances describe - describe a Bare Metal solution
        instance

SYNOPSIS
    gcloud alpha bms instances describe (INSTANCE : --region=REGION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances disable-hyperthreading

```text
NAME
    gcloud alpha bms instances disable-hyperthreading - disable hyperthreading
        for a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances disable-hyperthreading
        (INSTANCE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances disable-serial-console

```text
NAME
    gcloud alpha bms instances disable-serial-console - disable interactive
        serial console for a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances disable-serial-console
        (INSTANCE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances enable-hyperthreading

```text
NAME
    gcloud alpha bms instances enable-hyperthreading - enable hyperthreading
        for a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances enable-hyperthreading
        (INSTANCE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances enable-serial-console

```text
NAME
    gcloud alpha bms instances enable-serial-console - enable interactive
        serial console for a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances enable-serial-console
        (INSTANCE : --region=REGION) [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances list

```text
NAME
    gcloud alpha bms instances list - list Bare Metal Solution instances in a
        project

SYNOPSIS
    gcloud alpha bms instances list [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances reimage

```text
NAME
    gcloud alpha bms instances reimage - reimage a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances reimage (INSTANCE : --region=REGION)
        --os-image=OS_IMAGE [--async]
        [--kms-crypto-key-version=KMS_CRYPTO_KEY_VERSION]
        [--ssh-keys=[SSH_KEYS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances rename

```text
NAME
    gcloud alpha bms instances rename - rename a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances rename (INSTANCE : --region=REGION)
        --new-name=NEW_NAME [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances reset

```text
NAME
    gcloud alpha bms instances reset - reset a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances reset (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances start

```text
NAME
    gcloud alpha bms instances start - start a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances start (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances stop

```text
NAME
    gcloud alpha bms instances stop - stop a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances stop (INSTANCE : --region=REGION) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha bms instances update

```text
NAME
    gcloud alpha bms instances update - update a Bare Metal Solution instance

SYNOPSIS
    gcloud alpha bms instances update (INSTANCE : --region=REGION) [--async]
        [--[no-]enable-hyperthreading]
        [--kms-crypto-key-version=KMS_CRYPTO_KEY_VERSION] [--os-image=OS_IMAGE]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--clear-ssh-keys | --ssh-keys=[SSH_KEYS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/bms/instances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
