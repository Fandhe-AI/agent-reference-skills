---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/experiment-templates
---

# gcloud fault-testing experiment-templates

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha fault-testing experiment-templates create

```text
NAME
    gcloud alpha fault-testing experiment-templates create - create an
        experiment template

SYNOPSIS
    gcloud alpha fault-testing experiment-templates create
        (EXPERIMENT_TEMPLATE : --location=LOCATION) --duration=DURATION
        (--cloud-sql-failover-instance=CLOUD_SQL_FAILOVER_INSTANCE
          | --gce-fail-compute-instances=[GCE_FAIL_COMPUTE_INSTANCES,...]
          | --gce-fail-compute-location=GCE_FAIL_COMPUTE_LOCATION
          | --gce-fail-compute-secure-tag-value=GCE_FAIL_COMPUTE_SECURE_TAG_VALUE | [--gce-fail-compute-mig-instance-group-manager=GCE_FAIL_COMPUTE_MIG_INSTANCE_GROUP_MANAGER : --gce-fail-compute-mig-location=GCE_FAIL_COMPUTE_MIG_LOCATION] | [--l7-lb-http-fault-forwarding-rule=L7_LB_HTTP_FAULT_FORWARDING_RULE : --l7-lb-http-fault-backend-service=L7_LB_HTTP_FAULT_BACKEND_SERVICE --l7-lb-http-fault-abort-percentage=L7_LB_HTTP_FAULT_ABORT_PERCENTAGE --l7-lb-http-fault-abort-status-code=L7_LB_HTTP_FAULT_ABORT_STATUS_CODE | --l7-lb-http-fault-delay=L7_LB_HTTP_FAULT_DELAY --l7-lb-http-fault-delay-percentage=L7_LB_HTTP_FAULT_DELAY_PERCENTAGE])
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiment-templates delete

```text
NAME
    gcloud alpha fault-testing experiment-templates delete - delete an
        experiment template

SYNOPSIS
    gcloud alpha fault-testing experiment-templates delete
        (EXPERIMENT_TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiment-templates describe

```text
NAME
    gcloud alpha fault-testing experiment-templates describe - describe a
        single experiment template

SYNOPSIS
    gcloud alpha fault-testing experiment-templates describe
        (EXPERIMENT_TEMPLATE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiment-templates list

```text
NAME
    gcloud alpha fault-testing experiment-templates list - list experiment
        templates

SYNOPSIS
    gcloud alpha fault-testing experiment-templates list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha fault-testing experiment-templates update

```text
NAME
    gcloud alpha fault-testing experiment-templates update - update an existing
        experiment template

SYNOPSIS
    gcloud alpha fault-testing experiment-templates update
        (EXPERIMENT_TEMPLATE : --location=LOCATION) [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--duration=DURATION]
        [--clear-action
          --cloud-sql-failover-instance=CLOUD_SQL_FAILOVER_INSTANCE
          | --gce-fail-compute-instances=[GCE_FAIL_COMPUTE_INSTANCES,...]
          | --gce-fail-compute-location=GCE_FAIL_COMPUTE_LOCATION
          | --gce-fail-compute-secure-tag-value=GCE_FAIL_COMPUTE_SECURE_TAG_VALUE | --gce-fail-compute-mig-instance-group-manager=GCE_FAIL_COMPUTE_MIG_INSTANCE_GROUP_MANAGER --gce-fail-compute-mig-location=GCE_FAIL_COMPUTE_MIG_LOCATION | --l7-lb-http-fault-backend-service=L7_LB_HTTP_FAULT_BACKEND_SERVICE --l7-lb-http-fault-forwarding-rule=L7_LB_HTTP_FAULT_FORWARDING_RULE --l7-lb-http-fault-abort-percentage=L7_LB_HTTP_FAULT_ABORT_PERCENTAGE --l7-lb-http-fault-abort-status-code=L7_LB_HTTP_FAULT_ABORT_STATUS_CODE | --l7-lb-http-fault-delay=L7_LB_HTTP_FAULT_DELAY --l7-lb-http-fault-delay-percentage=L7_LB_HTTP_FAULT_DELAY_PERCENTAGE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/fault-testing/experiment-templates (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
