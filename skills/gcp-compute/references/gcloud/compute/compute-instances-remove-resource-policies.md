---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/remove-resource-policies
---

# gcloud compute instances remove-resource-policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances remove-resource-policies

```text
NAME
    gcloud compute instances remove-resource-policies - remove resource
        policies from Compute Engine VM instances

SYNOPSIS
    gcloud compute instances remove-resource-policies INSTANCE_NAME
        --resource-policies=[RESOURCE_POLICY,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances remove-resource-policies removes resource policies
    from Compute Engine virtual instances.

EXAMPLES
    To remove resource policy pol1 from instance inst1, run this:

        $ gcloud compute instances remove-resource-policies inst1 \
            --resource-policies=pol1

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to remove resource policies from. For details on
        valid instance names, refer to the criteria documented under the field
        'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

REQUIRED FLAGS
     --resource-policies=[RESOURCE_POLICY,...]
        A list of resource policy names to be removed from the instance. The
        policies must exist in the same region as the instance.

OPTIONAL FLAGS
     --zone=ZONE
        Zone of the instance to remove resource policies from. If not
        specified, you might be prompted to select a zone (interactive mode
        only). gcloud attempts to identify the appropriate zone by searching
        for resources in your currently active project. If the zone cannot be
        determined, gcloud prompts you for a selection with all available
        Google Cloud Platform zones.

        To avoid prompting when this flag is omitted, the user can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances remove-resource-policies

        $ gcloud beta compute instances remove-resource-policies
```

### gcloud beta compute instances remove-resource-policies

```text
NAME
    gcloud beta compute instances remove-resource-policies - remove resource
        policies from Compute Engine VM instances

SYNOPSIS
    gcloud beta compute instances remove-resource-policies INSTANCE_NAME
        --resource-policies=[RESOURCE_POLICY,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances remove-resource-policies

```text
NAME
    gcloud alpha compute instances remove-resource-policies - remove resource
        policies from Compute Engine VM instances

SYNOPSIS
    gcloud alpha compute instances remove-resource-policies INSTANCE_NAME
        --resource-policies=[RESOURCE_POLICY,...] [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/remove-resource-policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
