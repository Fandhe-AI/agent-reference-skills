---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshots
---

# gcloud compute snapshots (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute snapshots remove-iam-policy-binding

```text
NAME
    gcloud alpha compute snapshots remove-iam-policy-binding - remove IAM
        policy binding from a Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots remove-iam-policy-binding SNAPSHOT_NAME
        --member=PRINCIPAL --role=ROLE
        [--all | --condition=[KEY=VALUE,...]
          | --condition-from-file=PATH_TO_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots remove-labels

```text
NAME
    gcloud alpha compute snapshots remove-labels - remove labels from Google
        Compute Engine snapshots

SYNOPSIS
    gcloud alpha compute snapshots remove-labels SNAPSHOT_NAME
        (--all | --labels=KEY,[KEY,...]) [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots set-iam-policy

```text
NAME
    gcloud alpha compute snapshots set-iam-policy - set the IAM policy for a
        Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots set-iam-policy SNAPSHOT_NAME POLICY_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots test-iam-permissions

```text
NAME
    gcloud alpha compute snapshots test-iam-permissions - test IAM permissions
        for a Compute Engine standard or archive snapshot

SYNOPSIS
    gcloud alpha compute snapshots test-iam-permissions SNAPSHOT_NAME
        --permissions=[PERMISSION,...] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots update

```text
NAME
    gcloud alpha compute snapshots update - update a Compute Engine snapshot

SYNOPSIS
    gcloud alpha compute snapshots update SNAPSHOT_NAME
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute snapshots update-kms-key

```text
NAME
    gcloud alpha compute snapshots update-kms-key - update the KMS key of a
        Compute Engine standard or archive snapshot

SYNOPSIS
    gcloud alpha compute snapshots update-kms-key SNAPSHOT_NAME
        [--region=REGION]
        [--kms-key=KMS_KEY : --kms-keyring=KMS_KEYRING
          --kms-location=KMS_LOCATION --kms-project=KMS_PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/snapshots (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
