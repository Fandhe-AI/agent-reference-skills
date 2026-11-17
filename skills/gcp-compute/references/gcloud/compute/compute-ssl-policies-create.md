---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/create
---

# gcloud compute ssl-policies create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute ssl-policies create

```text
NAME
    gcloud compute ssl-policies create - create a new Compute Engine SSL policy

SYNOPSIS
    gcloud compute ssl-policies create SSL_POLICY
        [--custom-features=[CUSTOM_FEATURES,...]] [--description=DESCRIPTION]
        [--min-tls-version=MIN_TLS_VERSION; default="1.0"]
        [--post-quantum-key-exchange=POST_QUANTUM_KEY_EXCHANGE]
        [--profile=PROFILE; default="COMPATIBLE"] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute ssl-policies create creates a new SSL policy.

    An SSL policy specifies the server-side support for SSL features. An SSL
    policy can be attached to a TargetHttpsProxy or a TargetSslProxy. This
    affects connections between clients and the load balancer. SSL policies do
    not affect the connection between the load balancers and the backends. SSL
    policies are used by Application Load Balancers and proxy Network Load
    Balancers.

POSITIONAL ARGUMENTS
     SSL_POLICY
        Name of the SSL policy to create.

FLAGS
     --custom-features=[CUSTOM_FEATURES,...]
        A comma-separated list of custom features, required when the profile
        being used is CUSTOM.

        Using CUSTOM profile allows customization of the features that are part
        of the SSL policy. This flag allows specifying those custom features.

        The list of all supported custom features can be obtained using:

            gcloud compute ssl-policies list-available-features

     --description=DESCRIPTION
        An optional, textual description for the SSL policy.

     --min-tls-version=MIN_TLS_VERSION; default="1.0"
        Minimum TLS version. MIN_TLS_VERSION must be one of:

         1.0
            TLS 1.0.
         1.1
            TLS 1.1.
         1.2
            TLS 1.2.
         1.3
            TLS 1.3.

     --post-quantum-key-exchange=POST_QUANTUM_KEY_EXCHANGE
        Whether to use post-quantum key exchange. POST_QUANTUM_KEY_EXCHANGE
        must be one of:

         DEFAULT
            Post-quantum key exchange is disabled until it becomes enabled by
            default on load balancers.
         DEFERRED
            Post-quantum key exchange with clients is temporarily disabled.
         ENABLED
            Post-quantum key exchange is enabled.

     --profile=PROFILE; default="COMPATIBLE"
        SSL policy profile. Changing profile from CUSTOM to
        COMPATIBLE|MODERN|RESTRICTED|FIPS_202205 will clear the custom-features
        field. PROFILE must be one of:

         COMPATIBLE
            Compatible profile. Allows the broadest set of clients, even those
            which support only out-of-date SSL features, to negotiate SSL with
            the load balancer.
         CUSTOM
            Custom profile. Allows customization by selecting only the features
            which are required. The list of all available features can be
            obtained using:

                gcloud compute ssl-policies list-available-features

         FIPS_202205
            FIPS_202205 profile. Supports a reduced set of SSL features,
            intended to meet stricter compliance requirements.
         MODERN
            Modern profile. Supports a wide set of SSL features, allowing
            modern clients to negotiate SSL.
         RESTRICTED
            Restricted profile. Supports a reduced set of SSL features,
            intended to meet stricter compliance requirements.

     At most one of these can be specified:

       --global
          If set, the SSL policy is global.

       --region=REGION
          Region of the SSL policy to create. Overrides the default
          compute/region property value for this command invocation.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute ssl-policies create

        $ gcloud beta compute ssl-policies create
```

### gcloud beta compute ssl-policies create

```text
NAME
    gcloud beta compute ssl-policies create - create a new Compute Engine SSL
        policy

SYNOPSIS
    gcloud beta compute ssl-policies create SSL_POLICY
        [--custom-features=[CUSTOM_FEATURES,...]] [--description=DESCRIPTION]
        [--min-tls-version=MIN_TLS_VERSION; default="1.0"]
        [--post-quantum-key-exchange=POST_QUANTUM_KEY_EXCHANGE]
        [--profile=PROFILE; default="COMPATIBLE"] [--global | --region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute ssl-policies create

```text
NAME
    gcloud alpha compute ssl-policies create - create a new Compute Engine SSL
        policy

SYNOPSIS
    gcloud alpha compute ssl-policies create SSL_POLICY
        [--custom-features=[CUSTOM_FEATURES,...]] [--description=DESCRIPTION]
        [--min-tls-version=MIN_TLS_VERSION; default="1.0"]
        [--post-quantum-key-exchange=POST_QUANTUM_KEY_EXCHANGE]
        [--profile=PROFILE; default="COMPATIBLE"] [--tls-mode=TLS_MODE]
        [--tls-settings-subject-alt-names=[SUBJECT_ALT_NAME,...]]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/ssl-policies/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
