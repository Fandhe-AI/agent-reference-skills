---
source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/policies/conditions
---

# gcloud monitoring policies conditions

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud monitoring policies conditions create

```text
NAME
    gcloud monitoring policies conditions create - create a condition in an
        alerting policy

SYNOPSIS
    gcloud monitoring policies conditions create ALERT_POLICY
        [--aggregation=AGGREGATION
          --condition-display-name=CONDITION_DISPLAY_NAME
          --condition-filter=CONDITION_FILTER
          --duration=DURATION --if=IF_VALUE --trigger-count=TRIGGER_COUNT
          | --trigger-percent=TRIGGER_PERCENT]
        [--condition=CONDITION | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a condition in an alerting policy.

POSITIONAL ARGUMENTS
     Alert Policy resource - Name of the Alert Policy to add a condition to.
     This represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument alert_policy on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ALERT_POLICY
          ID of the Alert Policy or fully qualified identifier for the Alert
          Policy.

          To set the policy attribute:
          + provide the argument alert_policy on the command line.

FLAGS
     Condition Settings. This will add a condition to the created policy. If
     any conditions are already specified, this condition will be appended.

     --aggregation=AGGREGATION
        Specifies an Aggregation message as a JSON/YAML value to be applied to
        the condition. For more information about the format:
        https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.alertPolicies

     --condition-display-name=CONDITION_DISPLAY_NAME
        The display name for the condition.

     --condition-filter=CONDITION_FILTER
        Specifies the "filter" in a metric absence or metric threshold
        condition.

     --duration=DURATION
        The duration (e.g. "60s", "2min", etc.) that the condition must hold in
        order to trigger as true.

     --if=IF_VALUE
        One of "absent", "< THRESHOLD", "> THRESHOLD" where "THRESHOLD" is an
        integer or float.

     At most one of these can be specified:

       --trigger-count=TRIGGER_COUNT
          The absolute number of time series that must fail the predicate for
          the condition to be triggered.

       --trigger-percent=TRIGGER_PERCENT
          The percentage of time series that must fail the predicate for the
          condition to be triggered.

     At most one of these can be specified:

       --condition=CONDITION
          The condition as a string. In either JSON or YAML format.

       --condition-from-file=PATH_TO_FILE
          The path to a JSON or YAML file containing the condition. Use a full
          or relative path to a local file containing the value of condition.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring policies conditions create

        $ gcloud beta monitoring policies conditions create
```

### gcloud monitoring policies conditions delete

```text
NAME
    gcloud monitoring policies conditions delete - delete a condition in an
        alerting policy

SYNOPSIS
    gcloud monitoring policies conditions delete (CONDITION : --policy=POLICY)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a condition in an alerting policy. If the specified condition does
    not exist, this command will fail with an error. This will not delete the
    policy if no conditions exist.

POSITIONAL ARGUMENTS
     Condition resource - The name of the Condition to delete. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument condition on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONDITION
          ID of the condition or fully qualified identifier for the condition.

          To set the condition attribute:
          + provide the argument condition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          Name of the alerting policy.

          To set the policy attribute:
          + provide the argument condition on the command line with a fully
            specified name;
          + provide the argument --policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring policies conditions delete

        $ gcloud beta monitoring policies conditions delete
```

### gcloud monitoring policies conditions describe

```text
NAME
    gcloud monitoring policies conditions describe - describe a condition in a
        Cloud Monitoring alerting policy

SYNOPSIS
    gcloud monitoring policies conditions describe
        (CONDITION : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a condition in a Cloud Monitoring alerting policy.

POSITIONAL ARGUMENTS
     Condition resource - The name of the Condition to describe. The arguments
     in this group can be used to specify the attributes of this resource.
     (NOTE) Some attributes are not given arguments in this group but can be
     set in other ways.

     To set the project attribute:
      * provide the argument condition on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONDITION
          ID of the condition or fully qualified identifier for the condition.

          To set the condition attribute:
          + provide the argument condition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          Name of the alerting policy.

          To set the policy attribute:
          + provide the argument condition on the command line with a fully
            specified name;
          + provide the argument --policy on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring policies conditions describe

        $ gcloud beta monitoring policies conditions describe
```

### gcloud monitoring policies conditions update

```text
NAME
    gcloud monitoring policies conditions update - update a condition in an
        alerting policy

SYNOPSIS
    gcloud monitoring policies conditions update (CONDITION : --policy=POLICY)
        [--display-name=DISPLAY_NAME] [--if=IF_VALUE]
        [--trigger-count=TRIGGER_COUNT | --trigger-percent=TRIGGER_PERCENT]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a condition in an alerting policy.

POSITIONAL ARGUMENTS
     Condition resource - The name of the Condition to update. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument condition on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       CONDITION
          ID of the condition or fully qualified identifier for the condition.

          To set the condition attribute:
          + provide the argument condition on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --policy=POLICY
          Name of the alerting policy.

          To set the policy attribute:
          + provide the argument condition on the command line with a fully
            specified name;
          + provide the argument --policy on the command line.

FLAGS
     --display-name=DISPLAY_NAME
        The display name for the Condition.

     --if=IF_VALUE
        One of "absent", "< THRESHOLD", "> THRESHOLD" where "THRESHOLD" is an
        integer or float.

     At most one of these can be specified:

       --trigger-count=TRIGGER_COUNT
          The absolute number of time series that must fail the predicate for
          the condition to be triggered.

       --trigger-percent=TRIGGER_PERCENT
          The percentage of time series that must fail the predicate for the
          condition to be triggered.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha monitoring policies conditions update

        $ gcloud beta monitoring policies conditions update
```

### gcloud beta monitoring policies conditions create

```text
NAME
    gcloud beta monitoring policies conditions create - create a condition in
        an alerting policy

SYNOPSIS
    gcloud beta monitoring policies conditions create ALERT_POLICY
        [--aggregation=AGGREGATION
          --condition-display-name=CONDITION_DISPLAY_NAME
          --condition-filter=CONDITION_FILTER
          --duration=DURATION --if=IF_VALUE --trigger-count=TRIGGER_COUNT
          | --trigger-percent=TRIGGER_PERCENT]
        [--condition=CONDITION | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring policies conditions delete

```text
NAME
    gcloud beta monitoring policies conditions delete - delete a condition in
        an alerting policy

SYNOPSIS
    gcloud beta monitoring policies conditions delete
        (CONDITION : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring policies conditions describe

```text
NAME
    gcloud beta monitoring policies conditions describe - describe a condition
        in a Cloud Monitoring alerting policy

SYNOPSIS
    gcloud beta monitoring policies conditions describe
        (CONDITION : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta monitoring policies conditions update

```text
NAME
    gcloud beta monitoring policies conditions update - update a condition in
        an alerting policy

SYNOPSIS
    gcloud beta monitoring policies conditions update
        (CONDITION : --policy=POLICY) [--display-name=DISPLAY_NAME]
        [--if=IF_VALUE]
        [--trigger-count=TRIGGER_COUNT | --trigger-percent=TRIGGER_PERCENT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring policies conditions create

```text
NAME
    gcloud alpha monitoring policies conditions create - create a condition in
        an alerting policy

SYNOPSIS
    gcloud alpha monitoring policies conditions create ALERT_POLICY
        [--aggregation=AGGREGATION
          --condition-display-name=CONDITION_DISPLAY_NAME
          --condition-filter=CONDITION_FILTER
          --duration=DURATION --if=IF_VALUE --trigger-count=TRIGGER_COUNT
          | --trigger-percent=TRIGGER_PERCENT]
        [--condition=CONDITION | --condition-from-file=PATH_TO_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring policies conditions delete

```text
NAME
    gcloud alpha monitoring policies conditions delete - delete a condition in
        an alerting policy

SYNOPSIS
    gcloud alpha monitoring policies conditions delete
        (CONDITION : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring policies conditions describe

```text
NAME
    gcloud alpha monitoring policies conditions describe - describe a condition
        in a Cloud Monitoring alerting policy

SYNOPSIS
    gcloud alpha monitoring policies conditions describe
        (CONDITION : --policy=POLICY) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha monitoring policies conditions update

```text
NAME
    gcloud alpha monitoring policies conditions update - update a condition in
        an alerting policy

SYNOPSIS
    gcloud alpha monitoring policies conditions update
        (CONDITION : --policy=POLICY) [--display-name=DISPLAY_NAME]
        [--if=IF_VALUE]
        [--trigger-count=TRIGGER_COUNT | --trigger-percent=TRIGGER_PERCENT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/monitoring/policies/conditions (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
