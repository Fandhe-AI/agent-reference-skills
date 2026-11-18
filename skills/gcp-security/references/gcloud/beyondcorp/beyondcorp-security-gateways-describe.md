---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/describe
---

# gcloud beyondcorp security-gateways describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beyondcorp security-gateways describe

```text
NAME
    gcloud beyondcorp security-gateways describe - describe securityGateways

SYNOPSIS
    gcloud beyondcorp security-gateways describe
        (SECURITY_GATEWAY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a securityGateway

EXAMPLES
    To describe the securityGateway, run:

        $ gcloud beyondcorp security-gateways describe

POSITIONAL ARGUMENTS
     SecurityGateway resource - The resource name of the PartnerTenant using
     the form:
     projects/{project_id}/locations/{location_id}/securityGateway/{security_gateway_id}
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument security_gateway on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SECURITY_GATEWAY
          ID of the securityGateway or fully qualified identifier for the
          securityGateway.

          To set the security_gateway attribute:
          + provide the argument security_gateway on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The location id of the securityGateway resource. We support only
          global location.

          To set the location attribute:
          + provide the argument security_gateway on the command line with a
            fully specified name;
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the beyondcorp/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/

NOTES
    This variant is also available:

        $ gcloud beta beyondcorp security-gateways describe
```

### gcloud beta beyondcorp security-gateways describe

```text
NAME
    gcloud beta beyondcorp security-gateways describe - describe
        securityGateways

SYNOPSIS
    gcloud beta beyondcorp security-gateways describe
        (SECURITY_GATEWAY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Corrected from the official docs (the help text above is verbatim): the positional argument says "The resource name of the PartnerTenant using the form: projects/{project_id}/locations/{location_id}/securityGateway/{security_gateway_id}"; the resource is a security gateway, not a PartnerTenant, and the collection is plural: `projects/{project_id}/locations/{location_id}/securityGateways/{security_gateway_id}` (Discovery document `beyondcorp` v1: `projects/{projectsId}/locations/{locationsId}/securityGateways/{securityGatewaysId}`; the `create`, `delete` and `update` pages of this group also use `securityGateways`).
- Incomplete example: the example gives only the command; gcloud 593.0.0 fails with "argument (SECURITY_GATEWAY : --location=LOCATION): Must be specified.". Add the required arguments (see SYNOPSIS and FLAGS on this page).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beyondcorp/security-gateways/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
