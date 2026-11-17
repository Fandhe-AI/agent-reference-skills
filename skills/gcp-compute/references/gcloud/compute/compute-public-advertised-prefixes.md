---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-advertised-prefixes
---

# gcloud compute public-advertised-prefixes

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute public-advertised-prefixes create

```text
NAME
    gcloud compute public-advertised-prefixes create - creates a Compute Engine
        public advertised prefix

SYNOPSIS
    gcloud compute public-advertised-prefixes create NAME --range=RANGE
        [--description=DESCRIPTION] [--dns-verification-ip=DNS_VERIFICATION_IP]
        [--ipv6-access-type=IPV6_ACCESS_TYPE] [--pdp-scope=PDP_SCOPE]
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To create a public advertised prefix:

        $ gcloud compute public-advertised-prefixes create \
            my-public-advertised-prefix --range=120.120.10.0/24 \
            --dns-verification-ip=120.120.10.15

    To create a v2 public advertised prefix:

        $ gcloud compute public-advertised-prefixes create \
            my-v2-public-advertised-prefix --range=120.120.10.0/24 \
            --dns-verification-ip=120.120.10.15 --pdp-scope=REGIONAL

POSITIONAL ARGUMENTS
     NAME
        Name of the public advertised prefix to operate on.

REQUIRED FLAGS
     --range=RANGE
        IP range allocated to this public advertised prefix, in CIDR format.

OPTIONAL FLAGS
     --description=DESCRIPTION
        Description of this public advertised prefix.

     --dns-verification-ip=DNS_VERIFICATION_IP
        IP address to use for verification. It must be within the IP range
        specified in --range.

     --ipv6-access-type=IPV6_ACCESS_TYPE
        Specifies the IPv6 access type of the public advertised prefix.
        IPV6_ACCESS_TYPE must be one of: internal, external.

     --pdp-scope=PDP_SCOPE
        Specifies how child public delegated prefix will be scoped. PDP_SCOPE
        must be one of: GLOBAL, REGIONAL.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-advertised-prefixes create

        $ gcloud beta compute public-advertised-prefixes create
```

### gcloud compute public-advertised-prefixes delete

```text
NAME
    gcloud compute public-advertised-prefixes delete - deletes a Compute Engine
        public advertised prefix

SYNOPSIS
    gcloud compute public-advertised-prefixes delete NAME
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To delete a public advertised prefix:

        $ gcloud compute public-advertised-prefixes delete \
            my-public-advertised-prefix

POSITIONAL ARGUMENTS
     NAME
        Name of the public advertised prefix to operate on.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-advertised-prefixes delete

        $ gcloud beta compute public-advertised-prefixes delete
```

### gcloud compute public-advertised-prefixes describe

```text
NAME
    gcloud compute public-advertised-prefixes describe - describes a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud compute public-advertised-prefixes describe NAME
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To describe a public advertised prefix:

        $ gcloud compute public-advertised-prefixes describe my-pap

POSITIONAL ARGUMENTS
     NAME
        Name of the public advertised prefix to operate on.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-advertised-prefixes describe

        $ gcloud beta compute public-advertised-prefixes describe
```

### gcloud compute public-advertised-prefixes list

```text
NAME
    gcloud compute public-advertised-prefixes list - list Google Compute Engine
        public advertised prefixes

SYNOPSIS
    gcloud compute public-advertised-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute public-advertised-prefixes list displays all Google Compute
    Engine public advertised prefixes in a project.

EXAMPLES
    To list all public advertised prefixes in a project in table form, run:

        $ gcloud compute public-advertised-prefixes list

    To list the URIs of all public advertised prefixes in a project, run:

        $ gcloud compute public-advertised-prefixes list --uri

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

        $ gcloud alpha compute public-advertised-prefixes list

        $ gcloud beta compute public-advertised-prefixes list
```

### gcloud compute public-advertised-prefixes update

```text
NAME
    gcloud compute public-advertised-prefixes update - updates a Compute Engine
        public advertised prefix

SYNOPSIS
    gcloud compute public-advertised-prefixes update NAME
        (--announce-prefix | --status=STATUS | --withdraw-prefix)
        [GCLOUD_WIDE_FLAG ...]

EXAMPLES
    To update a public advertised prefix:

        $ gcloud compute public-advertised-prefixes update my-pap \
            --status=ptr-configured

    To announce a public advertised prefix:

        $ gcloud compute public-advertised-prefixes update my-pap \
            --announce-prefix

    To withdraw a public advertised prefix:

        $ gcloud compute public-advertised-prefixes update my-pap \
            --withdraw-prefix

POSITIONAL ARGUMENTS
     NAME
        Name of the public advertised prefix to operate on.

REQUIRED FLAGS
     Exactly one of these must be specified:

       --announce-prefix
          Specify if the prefix will be announced. Default is false.

       --status=STATUS
          The status of public advertised prefix. STATUS must be (only one
          value is supported): ptr-configured.

       --withdraw-prefix
          Specify if the prefix will be withdrawn. Default is false.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute public-advertised-prefixes update

        $ gcloud beta compute public-advertised-prefixes update
```

### gcloud beta compute public-advertised-prefixes create

```text
NAME
    gcloud beta compute public-advertised-prefixes create - creates a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud beta compute public-advertised-prefixes create NAME --range=RANGE
        [--description=DESCRIPTION] [--dns-verification-ip=DNS_VERIFICATION_IP]
        [--ipv6-access-type=IPV6_ACCESS_TYPE] [--network-tier=NETWORK_TIER]
        [--pdp-scope=PDP_SCOPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-advertised-prefixes delete

```text
NAME
    gcloud beta compute public-advertised-prefixes delete - deletes a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud beta compute public-advertised-prefixes delete NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-advertised-prefixes describe

```text
NAME
    gcloud beta compute public-advertised-prefixes describe - describes a
        Compute Engine public advertised prefix

SYNOPSIS
    gcloud beta compute public-advertised-prefixes describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-advertised-prefixes list

```text
NAME
    gcloud beta compute public-advertised-prefixes list - list Google Compute
        Engine public advertised prefixes

SYNOPSIS
    gcloud beta compute public-advertised-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta compute public-advertised-prefixes update

```text
NAME
    gcloud beta compute public-advertised-prefixes update - updates a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud beta compute public-advertised-prefixes update NAME
        (--announce-prefix | --status=STATUS | --withdraw-prefix)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-advertised-prefixes create

```text
NAME
    gcloud alpha compute public-advertised-prefixes create - creates a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud alpha compute public-advertised-prefixes create NAME --range=RANGE
        [--description=DESCRIPTION] [--dns-verification-ip=DNS_VERIFICATION_IP]
        [--ipv6-access-type=IPV6_ACCESS_TYPE] [--network-tier=NETWORK_TIER]
        [--pdp-scope=PDP_SCOPE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-advertised-prefixes delete

```text
NAME
    gcloud alpha compute public-advertised-prefixes delete - deletes a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud alpha compute public-advertised-prefixes delete NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-advertised-prefixes describe

```text
NAME
    gcloud alpha compute public-advertised-prefixes describe - describes a
        Compute Engine public advertised prefix

SYNOPSIS
    gcloud alpha compute public-advertised-prefixes describe NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-advertised-prefixes list

```text
NAME
    gcloud alpha compute public-advertised-prefixes list - list Google Compute
        Engine public advertised prefixes

SYNOPSIS
    gcloud alpha compute public-advertised-prefixes list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute public-advertised-prefixes update

```text
NAME
    gcloud alpha compute public-advertised-prefixes update - updates a Compute
        Engine public advertised prefix

SYNOPSIS
    gcloud alpha compute public-advertised-prefixes update NAME
        (--announce-prefix | --status=STATUS | --withdraw-prefix)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/public-advertised-prefixes (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
