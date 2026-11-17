---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/describe
---

# gcloud compute network-firewall-policies describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies describe

```text
NAME
    gcloud compute network-firewall-policies describe - describe a Compute
        Engine network firewall policy

SYNOPSIS
    gcloud compute network-firewall-policies describe FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies describe is used to describe
    network firewall policies. A network firewall policy is a set of rules that
    controls access to various resources.

EXAMPLES
    To describe a global network firewall policy with name my-policy, run:

        $ gcloud compute network-firewall-policies describe my-policy \
            --global

    To describe a regional network firewall policy with name my-policy, in
    region my-region, run:

        $ gcloud compute network-firewall-policies describe my-policy \
            --region=my-region

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        name of the network firewall policy to get.

FLAGS
     At most one of these can be specified:

       --global
          If set, the firewall policy is global.

       --region=REGION
          Region of the firewall policy to get. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies describe

        $ gcloud beta compute network-firewall-policies describe
```

### gcloud beta compute network-firewall-policies describe

```text
NAME
    gcloud beta compute network-firewall-policies describe - describe a Compute
        Engine network firewall policy

SYNOPSIS
    gcloud beta compute network-firewall-policies describe FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies describe

```text
NAME
    gcloud alpha compute network-firewall-policies describe - describe a
        Compute Engine network firewall policy

SYNOPSIS
    gcloud alpha compute network-firewall-policies describe FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
