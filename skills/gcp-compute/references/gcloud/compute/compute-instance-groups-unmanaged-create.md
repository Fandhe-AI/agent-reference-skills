---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/create
---

# gcloud compute instance-groups unmanaged create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instance-groups unmanaged create

```text
NAME
    gcloud compute instance-groups unmanaged create - create a Compute Engine
        unmanaged instance group

SYNOPSIS
    gcloud compute instance-groups unmanaged create NAME
        [--description=DESCRIPTION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instance-groups unmanaged create creates a new Compute
    Engine unmanaged instance group. For example:

        $ gcloud compute instance-groups unmanaged create \
            example-instance-group --zone us-central1-a

    The above example creates one unmanaged instance group called
    'example-instance-group' in the us-central1-a zone.

POSITIONAL ARGUMENTS
     NAME
        Name of the instance group to create.

FLAGS
     --description=DESCRIPTION
        Specifies a textual description for the unmanaged instance group.

     --zone=ZONE
        Zone of the instance group to create. If not specified and the
        compute/zone property isn't set, you might be prompted to select a zone
        (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
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

        $ gcloud alpha compute instance-groups unmanaged create

        $ gcloud beta compute instance-groups unmanaged create
```

### gcloud beta compute instance-groups unmanaged create

```text
NAME
    gcloud beta compute instance-groups unmanaged create - create a Compute
        Engine unmanaged instance group

SYNOPSIS
    gcloud beta compute instance-groups unmanaged create NAME
        [--description=DESCRIPTION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups unmanaged create

```text
NAME
    gcloud alpha compute instance-groups unmanaged create - create a Compute
        Engine unmanaged instance group

SYNOPSIS
    gcloud alpha compute instance-groups unmanaged create NAME
        [--description=DESCRIPTION] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instance-groups/unmanaged/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
