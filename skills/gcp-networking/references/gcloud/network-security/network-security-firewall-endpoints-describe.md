---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/describe
---

# gcloud network-security firewall-endpoints describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security firewall-endpoints describe

```text
NAME
    gcloud network-security firewall-endpoints describe - describe a Firewall
        Plus endpoint

SYNOPSIS
    gcloud network-security firewall-endpoints describe
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a firewall endpoint.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To get a description of a firewall endpoint called my-endpoint in zone
    us-central1-a and organization ID 1234, run:

        $ gcloud network-security firewall-endpoints describe my-endpoint \
            --zone=us-central1-a --organization=1234

    OR

        $ gcloud network-security firewall-endpoints describe \
            organizations/1234/locations/us-central1-a/firewallEndpoints/\
        my-endpoint

POSITIONAL ARGUMENTS
     Firewall endpoint resource - Firewall Plus. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument FIREWALL_ENDPOINT on the command line with a
        fully specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.firewallEndpoints,
        networksecurity.projects.locations.firewallEndpoints].

     This must be specified.

       FIREWALL_ENDPOINT
          ID of the firewall endpoint or fully qualified identifier for the
          firewall endpoint.

          To set the endpoint-name attribute:
          + provide the argument FIREWALL_ENDPOINT on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --organization=ORGANIZATION
          Organization ID of the firewall endpoint.

          To set the organization attribute:
          + provide the argument FIREWALL_ENDPOINT on the command line with a
            fully specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.firewallEndpoints].

       --zone=ZONE
          Zone of the firewall endpoint.

          To set the zone attribute:
          + provide the argument FIREWALL_ENDPOINT on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

FLAGS
     --location=LOCATION
        Location of the endpoint

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoints describe

        $ gcloud beta network-security firewall-endpoints describe
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security firewall-endpoints describe organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint
```

### gcloud beta network-security firewall-endpoints describe

```text
NAME
    gcloud beta network-security firewall-endpoints describe - describe a
        Firewall Plus endpoint

SYNOPSIS
    gcloud beta network-security firewall-endpoints describe
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints describe

```text
NAME
    gcloud alpha network-security firewall-endpoints describe - describe a
        Firewall Plus endpoint

SYNOPSIS
    gcloud alpha network-security firewall-endpoints describe
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
