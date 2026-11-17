---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/add-layer7-ddos-defense-threshold-config
---

# gcloud compute security-policies add-layer7-ddos-defense-threshold-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute security-policies add-layer7-ddos-defense-threshold-config

```text
NAME
    gcloud compute security-policies add-layer7-ddos-defense-threshold-config -
        add a layer7 ddos defense threshold config to a Compute Engine security
        policy

SYNOPSIS
    gcloud compute security-policies add-layer7-ddos-defense-threshold-config
        NAME --threshold-config-name=THRESHOLD_CONFIG_NAME
        [--auto-deploy-confidence-threshold=AUTO_DEPLOY_CONFIDENCE_THRESHOLD]
        [--auto-deploy-expiration-sec=AUTO_DEPLOY_EXPIRATION_SEC]
        [--auto-deploy-impacted-baseline-threshold=AUTO_DEPLOY_IMPACTED_BASELINE_THRESHOLD]
        [--auto-deploy-load-threshold=AUTO_DEPLOY_LOAD_THRESHOLD]
        [--detection-absolute-qps=DETECTION_ABSOLUTE_QPS]
        [--detection-load-threshold=DETECTION_LOAD_THRESHOLD]
        [--detection-relative-to-baseline-qps=DETECTION_RELATIVE_TO_BASELINE_QPS]
        [--traffic-granularity-configs=[type=TYPE[,value=VALUE][,
          enableEachUniqueValue=ENABLE_EACH_UNIQUE_VALUE];...;...]]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute security-policies add-layer7-ddos-defense-threshold-config
    is used to add layer7 ddos defense threshold configs to security policies.

EXAMPLES
    To add a layer7 ddos defense threshold config run the following command:

        $ gcloud compute security-policies \
            add-layer7-ddos-defense-threshold-config NAME \
            --threshold-config-name=my-threshold-config-name \
            --auto-deploy-load-threshold=0.7 \
            --auto-deploy-confidence-threshold=0.8 \
            --auto-deploy-impacted-baseline-threshold=0.1 \
            --auto-deploy-expiration-sec=4800 \
            --detection-load-threshold=0.4 --detection-absolute-qps=1000 \
            --detection-relative-to-baseline-qps=2.0 \
            --traffic-granularity-configs=type=HTTP_HEADER_HOST,\
        value=www.my-test-host.com;type=HTTP_PATH,enableEachUniqueValue=true

POSITIONAL ARGUMENTS
     NAME
        Name of the security policy to update.

REQUIRED FLAGS
     --threshold-config-name=THRESHOLD_CONFIG_NAME
        The name for the threshold config.

OPTIONAL FLAGS
     --auto-deploy-confidence-threshold=AUTO_DEPLOY_CONFIDENCE_THRESHOLD
        The threshold of the confidence of an identified attack, over which
        auto-deploy takes action.

     --auto-deploy-expiration-sec=AUTO_DEPLOY_EXPIRATION_SEC
        The duration of actions, if any, taken by auto-deploy.

     --auto-deploy-impacted-baseline-threshold=AUTO_DEPLOY_IMPACTED_BASELINE_THRESHOLD
        The threshold on the estimated impact to the baseline traffic of a
        suggested mitigation, below which auto-deploy takes action.

     --auto-deploy-load-threshold=AUTO_DEPLOY_LOAD_THRESHOLD
        The threshold on backend's load, over which auto-deploy takes action.

     --detection-absolute-qps=DETECTION_ABSOLUTE_QPS
        The absolute QPS of the incoming traffic, over which adaptive
        protection detects an attack.

     --detection-load-threshold=DETECTION_LOAD_THRESHOLD
        The threshold on backend's load, over which adaptive protection detects
        an attack.

     --detection-relative-to-baseline-qps=DETECTION_RELATIVE_TO_BASELINE_QPS
        The QPS of the incoming traffic relative to the average baseline QPS,
        over which adaptive protection detects an attack.

     --traffic-granularity-configs=[type=TYPE[,value=VALUE][,enableEachUniqueValue=ENABLE_EACH_UNIQUE_VALUE];...;...]
        Specify up to 2 configs matching a specific type/value of traffic.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute security-policies \
            add-layer7-ddos-defense-threshold-config

        $ gcloud beta compute security-policies \
            add-layer7-ddos-defense-threshold-config
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud compute security-policies add-layer7-ddos-defense-threshold-config NAME \
    --threshold-config-name=my-threshold-config-name \
    --auto-deploy-load-threshold=0.7 \
    --auto-deploy-confidence-threshold=0.8 \
    --auto-deploy-impacted-baseline-threshold=0.1 \
    --auto-deploy-expiration-sec=4800 \
    --detection-load-threshold=0.4 \
    --detection-absolute-qps=1000 \
    --detection-relative-to-baseline-qps=2.0 \
    --traffic-granularity-configs='type=HTTP_HEADER_HOST,value=www.my-test-host.com;type=HTTP_PATH,enableEachUniqueValue=true'
```

### gcloud beta compute security-policies add-layer7-ddos-defense-threshold-config

```text
NAME
    gcloud beta compute security-policies
        add-layer7-ddos-defense-threshold-config - add a layer7 ddos defense
        threshold config to a Compute Engine security policy

SYNOPSIS
    gcloud beta compute security-policies
        add-layer7-ddos-defense-threshold-config NAME
        --threshold-config-name=THRESHOLD_CONFIG_NAME
        [--auto-deploy-confidence-threshold=AUTO_DEPLOY_CONFIDENCE_THRESHOLD]
        [--auto-deploy-expiration-sec=AUTO_DEPLOY_EXPIRATION_SEC]
        [--auto-deploy-impacted-baseline-threshold=AUTO_DEPLOY_IMPACTED_BASELINE_THRESHOLD]
        [--auto-deploy-load-threshold=AUTO_DEPLOY_LOAD_THRESHOLD]
        [--detection-absolute-qps=DETECTION_ABSOLUTE_QPS]
        [--detection-load-threshold=DETECTION_LOAD_THRESHOLD]
        [--detection-relative-to-baseline-qps=DETECTION_RELATIVE_TO_BASELINE_QPS]
        [--traffic-granularity-configs=[type=TYPE[,value=VALUE][,
          enableEachUniqueValue=ENABLE_EACH_UNIQUE_VALUE];...;...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute security-policies add-layer7-ddos-defense-threshold-config

```text
NAME
    gcloud alpha compute security-policies
        add-layer7-ddos-defense-threshold-config - add a layer7 ddos defense
        threshold config to a Compute Engine security policy

SYNOPSIS
    gcloud alpha compute security-policies
        add-layer7-ddos-defense-threshold-config NAME
        --threshold-config-name=THRESHOLD_CONFIG_NAME
        [--auto-deploy-confidence-threshold=AUTO_DEPLOY_CONFIDENCE_THRESHOLD]
        [--auto-deploy-expiration-sec=AUTO_DEPLOY_EXPIRATION_SEC]
        [--auto-deploy-impacted-baseline-threshold=AUTO_DEPLOY_IMPACTED_BASELINE_THRESHOLD]
        [--auto-deploy-load-threshold=AUTO_DEPLOY_LOAD_THRESHOLD]
        [--detection-absolute-qps=DETECTION_ABSOLUTE_QPS]
        [--detection-load-threshold=DETECTION_LOAD_THRESHOLD]
        [--detection-relative-to-baseline-qps=DETECTION_RELATIVE_TO_BASELINE_QPS]
        [--traffic-granularity-configs=[type=TYPE[,value=VALUE][,
          enableEachUniqueValue=ENABLE_EACH_UNIQUE_VALUE];...;...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--traffic-granularity-configs` value contains an unquoted `;`, which the shell treats as a command separator (gcloud would receive only the `HTTP_HEADER_HOST` config); the runnable form quotes the whole value.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/add-layer7-ddos-defense-threshold-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
