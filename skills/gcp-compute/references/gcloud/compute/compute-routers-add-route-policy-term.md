---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-route-policy-term
---

# gcloud compute routers add-route-policy-term

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers add-route-policy-term

```text
NAME
    gcloud compute routers add-route-policy-term - adds a new term to an
        existing route policy of a Comute Engine router

SYNOPSIS
    gcloud compute routers add-route-policy-term NAME --actions=[ACTION;...]
        --match=MATCH --policy-name=POLICY_NAME --priority=PRIORITY
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers add-route-policy-term adds a term to a route policy.

EXAMPLES
    To add a term with priority 0 with match destination == '192.168.0.0/16'
    and actions drop() to a route policy my-policy of a router my-router in
    region us-central1, run:

        $ gcloud compute routers add-route-policy-term my-router \
          --region=us-central1 --policy-name=my-policy --priority=0 \
          --match="destination == '192.168.0.0/16'" --actions="drop()"

POSITIONAL ARGUMENTS
     NAME
        Name of the router to update.

REQUIRED FLAGS
     --actions=[ACTION;...]
        Semicolon separated CEL expressions for the actions to take when the
        rule matches.

     --match=MATCH
        CEL expression for matching a route.

     --policy-name=POLICY_NAME
        Name of the route policy to which to add the term.

     --priority=PRIORITY
        Order of the term within the policy.

OPTIONAL FLAGS
     --region=REGION
        Region of the router to update. If not specified, you might be prompted
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

        $ gcloud alpha compute routers add-route-policy-term

        $ gcloud beta compute routers add-route-policy-term
```

### gcloud beta compute routers add-route-policy-term

```text
NAME
    gcloud beta compute routers add-route-policy-term - adds a new term to an
        existing route policy of a Comute Engine router

SYNOPSIS
    gcloud beta compute routers add-route-policy-term NAME
        --actions=[ACTION;...] --match=MATCH --policy-name=POLICY_NAME
        --priority=PRIORITY [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers add-route-policy-term

```text
NAME
    gcloud alpha compute routers add-route-policy-term - adds a new term to an
        existing route policy of a Comute Engine router

SYNOPSIS
    gcloud alpha compute routers add-route-policy-term NAME
        --actions=[ACTION;...] --match=MATCH --policy-name=POLICY_NAME
        --priority=PRIORITY [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-route-policy-term (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
