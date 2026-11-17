---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/clone-rules
---

# gcloud compute network-firewall-policies clone-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute network-firewall-policies clone-rules

```text
NAME
    gcloud compute network-firewall-policies clone-rules - replace the rules of
        a Compute Engine network firewall policy with rules from another policy

SYNOPSIS
    gcloud compute network-firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute network-firewall-policies clone-rules is used to replace the
    rules of network firewall policies. A network firewall policy is a set of
    rules that controls access to various resources.

EXAMPLES
    To clone the rules of a global network firewall policy with NAME my-policy,
    from another network firewall policy with NAME source-policy, run:

        $ gcloud compute network-firewall-policies clone-rules my-policy \
            --source-firewall-policy=source-policy --global

    To clone the rules of a region network firewall policy with NAME
    my-region-policy, in region region-a, from another network firewall policy
    with NAME source-policy, run:

        $ gcloud compute network-firewall-policies clone-rules \
            my-region-policy --source-firewall-policy=source-policy \
            --region=region-a

POSITIONAL ARGUMENTS
     FIREWALL_POLICY
        name of the network firewall policy to clone the rules to.

REQUIRED FLAGS
     --source-firewall-policy=SOURCE_FIREWALL_POLICY
        Name of the source network firewall policy to copy the rules from.

OPTIONAL FLAGS
     At most one of these can be specified:

       --global
          If set, the firewall policy is global.

       --region=REGION
          Region of the firewall policy to clone-rules. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute network-firewall-policies clone-rules

        $ gcloud beta compute network-firewall-policies clone-rules
```

### gcloud beta compute network-firewall-policies clone-rules

```text
NAME
    gcloud beta compute network-firewall-policies clone-rules - replace the
        rules of a Compute Engine network firewall policy with rules from
        another policy

SYNOPSIS
    gcloud beta compute network-firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute network-firewall-policies clone-rules

```text
NAME
    gcloud alpha compute network-firewall-policies clone-rules - replace the
        rules of a Compute Engine network firewall policy with rules from
        another policy

SYNOPSIS
    gcloud alpha compute network-firewall-policies clone-rules FIREWALL_POLICY
        --source-firewall-policy=SOURCE_FIREWALL_POLICY
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/clone-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
