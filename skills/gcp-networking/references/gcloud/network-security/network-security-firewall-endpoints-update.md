---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/update
---

# gcloud network-security firewall-endpoints update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security firewall-endpoints update

```text
NAME
    gcloud network-security firewall-endpoints update - update a Firewall Plus
        endpoint

SYNOPSIS
    gcloud network-security firewall-endpoints update
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE) [--async]
        [--block-partial-http] [--content-cloud-region=CONTENT_CLOUD_REGION]
        [--description=DESCRIPTION] [--enable-wildfire]
        [--enable-wildfire-analysis-logging] [--location=LOCATION]
        [--max-wait=MAX_WAIT; default="60m"]
        [--update-billing-project=BILLING_PROJECT]
        [--update-labels=[KEY=VALUE,...]]
        [--wildfire-analysis-action=WILDFIRE_ANALYSIS_ACTION]
        [--wildfire-analysis-timeout=WILDFIRE_ANALYSIS_TIMEOUT]
        [--wildfire-lookup-action=WILDFIRE_LOOKUP_ACTION]
        [--wildfire-lookup-timeout=WILDFIRE_LOOKUP_TIMEOUT]
        [--wildfire-region=WILDFIRE_REGION]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a firewall endpoint. Check the progress of endpoint update by using
    gcloud network-security firewall-endpoints describe.

    For more examples, refer to the EXAMPLES section below.

EXAMPLES
    To update labels k1 and k2, run:

        $ gcloud network-security firewall-endpoints update my-endpoint \
            --zone=us-central1-a --organization=1234 \
            --update-labels=k1=v1,k2=v2

    To remove labels k3 and k4, run:

        $ gcloud network-security firewall-endpoints update my-endpoint \
            --zone=us-central1-a --organization=1234 --remove-labels=k3,k4

    To clear all labels from the firewall endpoint, run:

        $ gcloud network-security firewall-endpoints update my-endpoint \
            --zone=us-central1-a --organization=1234 --clear-labels

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
     --async
        Return immediately, without waiting for the operation in progress to
        complete. The default is True. Enabled by default, use --no-async to
        disable.

     --block-partial-http
        Block HTTP partial responses. Defaults to false. Use
        --block-partial-http to enable. To disable, use
        --no-block-partial-http.

     --content-cloud-region=CONTENT_CLOUD_REGION
        The content cloud region the endpoint will use. Defaults to the nearest
        available region.

     --description=DESCRIPTION
        Description of the endpoint

     --enable-wildfire
        Enable WildFire functionality on the endpoint. Use --enable-wildfire to
        enable. To disable, use --no-enable-wildfire.

     --enable-wildfire-analysis-logging
        Enable WildFire inline cloud analysis submission timeout logging. This
        is enabled by default. Use --no-enable-wildfire-analysis-logging to
        disable.

     --location=LOCATION
        Location of the endpoint

     --max-wait=MAX_WAIT; default="60m"
        Time to synchronously wait for the operation to complete, after which
        the operation continues asynchronously. Ignored if --no-async isn't
        specified. See $ gcloud topic datetimes for information on time
        formats.

     --update-billing-project=BILLING_PROJECT
        The Google Cloud project ID to use for API enablement check, quota, and
        endpoint uptime billing. Overrides the default billing/quota_project
        property value for this command invocation.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --wildfire-analysis-action=WILDFIRE_ANALYSIS_ACTION
        The action to take on WildFire inline cloud analysis timeout.
        WILDFIRE_ANALYSIS_ACTION must be one of: ALLOW, DENY.

     --wildfire-analysis-timeout=WILDFIRE_ANALYSIS_TIMEOUT
        The timeout (in milliseconds) on a file being held while WildFire
        inline cloud analysis is performed.

     --wildfire-lookup-action=WILDFIRE_LOOKUP_ACTION
        The action to take on WildFire real time signature lookup timeout.
        WILDFIRE_LOOKUP_ACTION must be one of: ALLOW, DENY.

     --wildfire-lookup-timeout=WILDFIRE_LOOKUP_TIMEOUT
        The timeout (in milliseconds) to hold a file while the WildFire real
        time signature cloud performs a signature lookup.

     --wildfire-region=WILDFIRE_REGION
        The region WildFire submissions from this endpoint will be sent to for
        analysis by WildFire. Defaults to the nearest available region.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud network-security firewall-endpoints update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud network-security firewall-endpoints update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoints update

        $ gcloud beta network-security firewall-endpoints update
```

### gcloud beta network-security firewall-endpoints update

```text
NAME
    gcloud beta network-security firewall-endpoints update - update a Firewall
        Plus endpoint

SYNOPSIS
    gcloud beta network-security firewall-endpoints update
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE) [--async]
        [--block-partial-http] [--content-cloud-region=CONTENT_CLOUD_REGION]
        [--description=DESCRIPTION] [--enable-wildfire]
        [--enable-wildfire-analysis-logging] [--location=LOCATION]
        [--max-wait=MAX_WAIT; default="60m"]
        [--update-billing-project=BILLING_PROJECT]
        [--update-labels=[KEY=VALUE,...]]
        [--wildfire-analysis-action=WILDFIRE_ANALYSIS_ACTION]
        [--wildfire-analysis-timeout=WILDFIRE_ANALYSIS_TIMEOUT]
        [--wildfire-lookup-action=WILDFIRE_LOOKUP_ACTION]
        [--wildfire-lookup-timeout=WILDFIRE_LOOKUP_TIMEOUT]
        [--wildfire-region=WILDFIRE_REGION]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints update

```text
NAME
    gcloud alpha network-security firewall-endpoints update - update a Firewall
        Plus endpoint

SYNOPSIS
    gcloud alpha network-security firewall-endpoints update
        (FIREWALL_ENDPOINT : --organization=ORGANIZATION --zone=ZONE) [--async]
        [--block-partial-http] [--content-cloud-region=CONTENT_CLOUD_REGION]
        [--description=DESCRIPTION] [--enable-wildfire]
        [--enable-wildfire-analysis-logging] [--location=LOCATION]
        [--max-wait=MAX_WAIT; default="60m"]
        [--update-billing-project=BILLING_PROJECT]
        [--update-labels=[KEY=VALUE,...]]
        [--wildfire-analysis-action=WILDFIRE_ANALYSIS_ACTION]
        [--wildfire-analysis-timeout=WILDFIRE_ANALYSIS_TIMEOUT]
        [--wildfire-lookup-action=WILDFIRE_LOOKUP_ACTION]
        [--wildfire-lookup-timeout=WILDFIRE_LOOKUP_TIMEOUT]
        [--wildfire-region=WILDFIRE_REGION]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
