---
source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/wildfire-verdict-change-requests
---

# gcloud network-security firewall-endpoints wildfire-verdict-change-requests

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud network-security firewall-endpoints wildfire-verdict-change-requests create

```text
NAME
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        create - create a WildFire Verdict Change Request

SYNOPSIS
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        create --comment=COMMENT --hash=HASH --verdict=VERDICT
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a WildFire Verdict Change Request.

EXAMPLES
    To create a WildFire Verdict Change Request with hash deadbeef, verdict
    malware and comment bad file, using full resource name for endpoint:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests create \
            --endpoint=organizations/1234/locations/us-central1-a/\
        firewallEndpoints/my-endpoint --hash=deadbeef --verdict=malware \
            --comment="bad file"

    To create the same verdict change request for a project-level endpoint:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests create \
            --endpoint=projects/my-project/locations/us-central1-a/\
        firewallEndpoints/my-endpoint --hash=deadbeef --verdict=malware \
            --comment="bad file"

REQUIRED FLAGS
     --comment=COMMENT
        The comment to be added to the verdict change request. Max length 2048
        characters.

     --hash=HASH
        The hash of the file to submit a verdict change request for.

     --verdict=VERDICT
        The verdict being requested for the file.

     Endpoint resource - The endpoint to which the verdict change request
     belongs. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --endpoint on the command line with a fully
        specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.firewallEndpoints,
        networksecurity.projects.locations.firewallEndpoints].

     This must be specified.

       --endpoint=ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint-name attribute:
          + provide the argument --endpoint on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          Organization ID of the endpoint.

          To set the organization attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.firewallEndpoints].

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

OPTIONAL FLAGS
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

        $ gcloud alpha network-security firewall-endpoints \
            wildfire-verdict-change-requests create

        $ gcloud beta network-security firewall-endpoints \
            wildfire-verdict-change-requests create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security firewall-endpoints wildfire-verdict-change-requests create \
    --endpoint=organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint \
    --hash=deadbeef \
    --verdict=malware \
    --comment="bad file"

gcloud network-security firewall-endpoints wildfire-verdict-change-requests create \
    --endpoint=projects/my-project/locations/us-central1-a/firewallEndpoints/my-endpoint \
    --hash=deadbeef \
    --verdict=malware \
    --comment="bad file"
```

### gcloud network-security firewall-endpoints wildfire-verdict-change-requests get

```text
NAME
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        get - get a WildFire Verdict Change Request

SYNOPSIS
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        get NAME
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get a WildFire Verdict Change Request.

EXAMPLES
    To get a WildFire Verdict Change Request with name req-123 and endpoint
    organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests get req-123 \
            --endpoint=organizations/1234/locations/us-central1-a/\
        firewallEndpoints/my-endpoint

    To get a WildFire Verdict Change Request with name req-123 for a
    project-level endpoint
    projects/my-project/locations/us-central1-a/firewallEndpoints/my-endpoint:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests get req-123 \
            --endpoint=projects/my-project/locations/us-central1-a/\
        firewallEndpoints/my-endpoint

POSITIONAL ARGUMENTS
     NAME
        Name of the verdict change request to get.

REQUIRED FLAGS
     Endpoint resource - The endpoint to which the verdict change request
     belongs. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --endpoint on the command line with a fully
        specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.firewallEndpoints,
        networksecurity.projects.locations.firewallEndpoints].

     This must be specified.

       --endpoint=ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint-name attribute:
          + provide the argument --endpoint on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          Organization ID of the endpoint.

          To set the organization attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.firewallEndpoints].

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

OPTIONAL FLAGS
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

        $ gcloud alpha network-security firewall-endpoints \
            wildfire-verdict-change-requests get

        $ gcloud beta network-security firewall-endpoints \
            wildfire-verdict-change-requests get
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security firewall-endpoints wildfire-verdict-change-requests get req-123 \
    --endpoint=organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint

gcloud network-security firewall-endpoints wildfire-verdict-change-requests get req-123 \
    --endpoint=projects/my-project/locations/us-central1-a/firewallEndpoints/my-endpoint
```

### gcloud network-security firewall-endpoints wildfire-verdict-change-requests list

```text
NAME
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        list - list WildFire Verdict Change Requests

SYNOPSIS
    gcloud network-security firewall-endpoints wildfire-verdict-change-requests
        list (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List WildFire Verdict Change Requests.

EXAMPLES
    To list WildFire Verdict Change Requests for endpoint with full resource
    name
    organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint,
    run:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests list \
            --endpoint=organizations/1234/locations/us-central1-a/\
        firewallEndpoints/my-endpoint

    To list WildFire Verdict Change Requests for a project-level endpoint with
    full resource name
    projects/my-project/locations/us-central1-a/firewallEndpoints/my-endpoint,
    run:

        $ gcloud network-security firewall-endpoints \
            wildfire-verdict-change-requests list \
            --endpoint=projects/my-project/locations/us-central1-a/\
        firewallEndpoints/my-endpoint

REQUIRED FLAGS
     Endpoint resource - The endpoint to which the verdict change request
     belongs. The arguments in this group can be used to specify the attributes
     of this resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --endpoint on the command line with a fully
        specified name;
      * set the property core/project. This resource can be one of the
        following types:
        [networksecurity.organizations.locations.firewallEndpoints,
        networksecurity.projects.locations.firewallEndpoints].

     This must be specified.

       --endpoint=ENDPOINT
          ID of the endpoint or fully qualified identifier for the endpoint.

          To set the endpoint-name attribute:
          + provide the argument --endpoint on the command line.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --organization=ORGANIZATION
          Organization ID of the endpoint.

          To set the organization attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --organization on the command line. Must be
            specified for resource of type
            [networksecurity.organizations.locations.firewallEndpoints].

       --zone=ZONE
          Zone of the endpoint.

          To set the zone attribute:
          + provide the argument --endpoint on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + provide the argument --location on the command line.

FLAGS
     --location=LOCATION
        Location of the endpoint

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha network-security firewall-endpoints \
            wildfire-verdict-change-requests list

        $ gcloud beta network-security firewall-endpoints \
            wildfire-verdict-change-requests list
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud network-security firewall-endpoints wildfire-verdict-change-requests list \
    --endpoint=organizations/1234/locations/us-central1-a/firewallEndpoints/my-endpoint

gcloud network-security firewall-endpoints wildfire-verdict-change-requests list \
    --endpoint=projects/my-project/locations/us-central1-a/firewallEndpoints/my-endpoint
```

### gcloud beta network-security firewall-endpoints wildfire-verdict-change-requests create

```text
NAME
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests create - create a WildFire Verdict
        Change Request

SYNOPSIS
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests create --comment=COMMENT --hash=HASH
        --verdict=VERDICT
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoints wildfire-verdict-change-requests get

```text
NAME
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests get - get a WildFire Verdict Change
        Request

SYNOPSIS
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests get NAME
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta network-security firewall-endpoints wildfire-verdict-change-requests list

```text
NAME
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests list - list WildFire Verdict Change
        Requests

SYNOPSIS
    gcloud beta network-security firewall-endpoints
        wildfire-verdict-change-requests list
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints wildfire-verdict-change-requests create

```text
NAME
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests create - create a WildFire Verdict
        Change Request

SYNOPSIS
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests create --comment=COMMENT --hash=HASH
        --verdict=VERDICT
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints wildfire-verdict-change-requests get

```text
NAME
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests get - get a WildFire Verdict Change
        Request

SYNOPSIS
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests get NAME
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha network-security firewall-endpoints wildfire-verdict-change-requests list

```text
NAME
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests list - list WildFire Verdict Change
        Requests

SYNOPSIS
    gcloud alpha network-security firewall-endpoints
        wildfire-verdict-change-requests list
        (--endpoint=ENDPOINT : --organization=ORGANIZATION --zone=ZONE)
        [--location=LOCATION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/network-security/firewall-endpoints/wildfire-verdict-change-requests (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
