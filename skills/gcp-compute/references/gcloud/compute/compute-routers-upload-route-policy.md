---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/upload-route-policy
---

# gcloud compute routers upload-route-policy

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers upload-route-policy

```text
NAME
    gcloud compute routers upload-route-policy - upload a route policy into a
        Compute Engine router

SYNOPSIS
    gcloud compute routers upload-route-policy NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--policy-name=POLICY_NAME]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers upload-route-policy uploads a route policy into a
    Compute Engine router.

EXAMPLES
    To upload a route policy my-import-policy from a file my-import-policy.yaml
    into a router my-router in region us-central1, run:

        $ gcloud compute routers upload-route-policy my-router \
        --region=us-central1 --policy-name=my-import-policy \
        --file-name=my-import-policy.yaml"

POSITIONAL ARGUMENTS
     NAME
        Name of the router to upload.

REQUIRED FLAGS
     --file-name=FILE_NAME
        Local path to the file defining the policy

OPTIONAL FLAGS
     --file-format=FILE_FORMAT
        Format of the file passed to --file-name. FILE_FORMAT must be one of:
        json, yaml.

     --policy-name=POLICY_NAME
        Name of the route policy to add/replace.

     --region=REGION
        Region of the router to upload. If not specified, you might be prompted
        to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers upload-route-policy

        $ gcloud beta compute routers upload-route-policy
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute routers upload-route-policy my-router \
    --region=us-central1 \
    --policy-name=my-import-policy \
    --file-name=my-import-policy.yaml
```

### gcloud beta compute routers upload-route-policy

```text
NAME
    gcloud beta compute routers upload-route-policy - upload a route policy
        into a Compute Engine router

SYNOPSIS
    gcloud beta compute routers upload-route-policy NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--policy-name=POLICY_NAME]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers upload-route-policy

```text
NAME
    gcloud alpha compute routers upload-route-policy - upload a route policy
        into a Compute Engine router

SYNOPSIS
    gcloud alpha compute routers upload-route-policy NAME --file-name=FILE_NAME
        [--file-format=FILE_FORMAT] [--policy-name=POLICY_NAME]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example ends with a stray unmatched `"` after `--file-name=my-import-policy.yaml`; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/upload-route-policy (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
