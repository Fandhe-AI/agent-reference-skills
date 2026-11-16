---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-plans
---

# gcloud container backup-restore restore-plans

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container backup-restore restore-plans create

```text
NAME
    gcloud beta container backup-restore restore-plans create - create a
        restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans create
        (RESTORE_PLAN : --location=LOCATION) --backup-plan=BACKUP_PLAN
        --cluster=CLUSTER
        (--all-namespaces | --excluded-namespaces=[EXCLUDED_NAMESPACES,...]
          | --no-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]) [--async]
        [--cluster-resource-conflict-policy=CLUSTER_RESOURCE_CONFLICT_POLICY]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--namespaced-resource-restore-mode=NAMESPACED_RESOURCE_RESTORE_MODE]
        [--restore-order-file=RESTORE_ORDER_FILE]
        [--volume-data-restore-policy=VOLUME_DATA_RESTORE_POLICY;
          default="no-volume-data-restoration"]
        [--volume-data-restore-policy-bindings=[VOLUME_TYPE=POLICY,...]]
        [--cluster-resource-scope-all-group-kinds
          | --cluster-resource-scope-excluded-group-kinds=[CLUSTER_RESOURCE_SCOPE_EXCLUDED_GROUP_KINDS,
          ...] | --cluster-resource-scope-no-group-kinds
          | --cluster-resource-scope-selected-group-kinds=[CLUSTER_RESOURCE_SCOPE_SELECTED_GROUP_KINDS,
          ...]]
        [--substitution-rules-file=SUBSTITUTION_RULES_FILE
          | --transformation-rules-file=TRANSFORMATION_RULES_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans delete

```text
NAME
    gcloud beta container backup-restore restore-plans delete - delete a
        restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans delete
        (RESTORE_PLAN : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans describe

```text
NAME
    gcloud beta container backup-restore restore-plans describe - describe a
        restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans describe
        (RESTORE_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans get-iam-policy

```text
NAME
    gcloud beta container backup-restore restore-plans get-iam-policy - get the
        IAM policy for a restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans get-iam-policy
        (RESTORE_PLAN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans list

```text
NAME
    gcloud beta container backup-restore restore-plans list - list restore
        plans

SYNOPSIS
    gcloud beta container backup-restore restore-plans list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans set-iam-policy

```text
NAME
    gcloud beta container backup-restore restore-plans set-iam-policy - set the
        IAM policy for a restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans set-iam-policy
        (RESTORE_PLAN : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container backup-restore restore-plans update

```text
NAME
    gcloud beta container backup-restore restore-plans update - update a
        restore plan

SYNOPSIS
    gcloud beta container backup-restore restore-plans update
        (RESTORE_PLAN : --location=LOCATION) [--async]
        [--cluster-resource-conflict-policy=CLUSTER_RESOURCE_CONFLICT_POLICY]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--namespaced-resource-restore-mode=NAMESPACED_RESOURCE_RESTORE_MODE]
        [--restore-order-file=RESTORE_ORDER_FILE]
        [--update-labels=[KEY=VALUE,...]]
        [--volume-data-restore-policy=VOLUME_DATA_RESTORE_POLICY;
          default="no-volume-data-restoration"]
        [--volume-data-restore-policy-bindings=[VOLUME_TYPE=POLICY,...]]
        [--all-namespaces | --excluded-namespaces=[EXCLUDED_NAMESPACES,...]
          | --no-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--cluster-resource-scope-all-group-kinds
          | --cluster-resource-scope-excluded-group-kinds=[CLUSTER_RESOURCE_SCOPE_EXCLUDED_GROUP_KINDS,
          ...] | --cluster-resource-scope-no-group-kinds
          | --cluster-resource-scope-selected-group-kinds=[CLUSTER_RESOURCE_SCOPE_SELECTED_GROUP_KINDS,
          ...]]
        [--substitution-rules-file=SUBSTITUTION_RULES_FILE
          | --transformation-rules-file=TRANSFORMATION_RULES_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans create

```text
NAME
    gcloud alpha container backup-restore restore-plans create - create a
        restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans create
        (RESTORE_PLAN : --location=LOCATION) --backup-plan=BACKUP_PLAN
        --cluster=CLUSTER
        (--all-namespaces | --excluded-namespaces=[EXCLUDED_NAMESPACES,...]
          | --no-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]) [--async]
        [--cluster-resource-conflict-policy=CLUSTER_RESOURCE_CONFLICT_POLICY]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [--namespaced-resource-restore-mode=NAMESPACED_RESOURCE_RESTORE_MODE]
        [--restore-order-file=RESTORE_ORDER_FILE]
        [--volume-data-restore-policy=VOLUME_DATA_RESTORE_POLICY;
          default="no-volume-data-restoration"]
        [--volume-data-restore-policy-bindings=[VOLUME_TYPE=POLICY,...]]
        [--cluster-resource-scope-all-group-kinds
          | --cluster-resource-scope-excluded-group-kinds=[CLUSTER_RESOURCE_SCOPE_EXCLUDED_GROUP_KINDS,
          ...] | --cluster-resource-scope-no-group-kinds
          | --cluster-resource-scope-selected-group-kinds=[CLUSTER_RESOURCE_SCOPE_SELECTED_GROUP_KINDS,
          ...]]
        [--substitution-rules-file=SUBSTITUTION_RULES_FILE
          | --transformation-rules-file=TRANSFORMATION_RULES_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans delete

```text
NAME
    gcloud alpha container backup-restore restore-plans delete - delete a
        restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans delete
        (RESTORE_PLAN : --location=LOCATION) [--async] [--etag=ETAG]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans describe

```text
NAME
    gcloud alpha container backup-restore restore-plans describe - describe a
        restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans describe
        (RESTORE_PLAN : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans get-iam-policy

```text
NAME
    gcloud alpha container backup-restore restore-plans get-iam-policy - get
        the IAM policy for a restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans get-iam-policy
        (RESTORE_PLAN : --location=LOCATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans list

```text
NAME
    gcloud alpha container backup-restore restore-plans list - list restore
        plans

SYNOPSIS
    gcloud alpha container backup-restore restore-plans list
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans set-iam-policy

```text
NAME
    gcloud alpha container backup-restore restore-plans set-iam-policy - set
        the IAM policy for a restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans set-iam-policy
        (RESTORE_PLAN : --location=LOCATION) POLICY_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container backup-restore restore-plans update

```text
NAME
    gcloud alpha container backup-restore restore-plans update - update a
        restore plan

SYNOPSIS
    gcloud alpha container backup-restore restore-plans update
        (RESTORE_PLAN : --location=LOCATION) [--async]
        [--cluster-resource-conflict-policy=CLUSTER_RESOURCE_CONFLICT_POLICY]
        [--description=DESCRIPTION] [--etag=ETAG]
        [--namespaced-resource-restore-mode=NAMESPACED_RESOURCE_RESTORE_MODE]
        [--restore-order-file=RESTORE_ORDER_FILE]
        [--update-labels=[KEY=VALUE,...]]
        [--volume-data-restore-policy=VOLUME_DATA_RESTORE_POLICY;
          default="no-volume-data-restoration"]
        [--volume-data-restore-policy-bindings=[VOLUME_TYPE=POLICY,...]]
        [--all-namespaces | --excluded-namespaces=[EXCLUDED_NAMESPACES,...]
          | --no-namespaces | --selected-applications=SELECTED_APPLICATIONS
          | --selected-namespaces=[SELECTED_NAMESPACES,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--cluster-resource-scope-all-group-kinds
          | --cluster-resource-scope-excluded-group-kinds=[CLUSTER_RESOURCE_SCOPE_EXCLUDED_GROUP_KINDS,
          ...] | --cluster-resource-scope-no-group-kinds
          | --cluster-resource-scope-selected-group-kinds=[CLUSTER_RESOURCE_SCOPE_SELECTED_GROUP_KINDS,
          ...]]
        [--substitution-rules-file=SUBSTITUTION_RULES_FILE
          | --transformation-rules-file=TRANSFORMATION_RULES_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/backup-restore/restore-plans (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
