---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/instance-groups/ssh
---

# gcloud compute instance-groups ssh

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute instance-groups ssh

```text
NAME
    gcloud alpha compute instance-groups ssh - SSH into instances of a Compute
        Engine instance group

SYNOPSIS
    gcloud alpha compute instance-groups ssh NAME --command=COMMAND
        [--batch-size=BATCH_SIZE; default="all"] [--container=CONTAINER]
        [--dry-run] [--endpoint-mode=ENDPOINT_MODE]
        [--force-key-file-overwrite] [--output-directory=OUTPUT_DIRECTORY]
        [--plain] [--ssh-flag=SSH_FLAG] [--ssh-key-file=SSH_KEY_FILE]
        [--strict-host-key-checking=STRICT_HOST_KEY_CHECKING] [--user=USER]
        [--internal-ip | --tunnel-through-iap] [--region=REGION | --zone=ZONE]
        [--ssh-key-expiration=SSH_KEY_EXPIRATION
          | --ssh-key-expire-after=SSH_KEY_EXPIRE_AFTER] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/instance-groups/ssh (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
