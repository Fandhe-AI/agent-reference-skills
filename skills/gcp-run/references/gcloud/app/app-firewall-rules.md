---
source: https://docs.cloud.google.com/sdk/gcloud/reference/app/firewall-rules
---

# gcloud app firewall-rules

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud app firewall-rules create

```text
NAME
    gcloud app firewall-rules create - creates a firewall rule

SYNOPSIS
    gcloud app firewall-rules create PRIORITY --action=ACTION
        --source-range=SOURCE_RANGE [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Creates a firewall rule.

EXAMPLES
    To create a new App Engine firewall rule, run:

        $ gcloud app firewall-rules create 1234 \
          --source-range='2001:db8::/32' --action=deny \
          --description='block traffic from the example range.'

POSITIONAL ARGUMENTS
     PRIORITY
        An integer between 1 and 2^32-1 which indicates the evaluation order of
        rules. Lowest priority rules are evaluated first. The handle default
        may also be used to refer to the final rule at priority 2^32-1 which is
        always present in a set of rules.

REQUIRED FLAGS
     --action=ACTION
        Allow or deny matched traffic. ACTION must be one of: ALLOW, DENY.

     --source-range=SOURCE_RANGE
        An IP address or range in CIDR notation or the * wildcard to match all
        traffic.

OPTIONAL FLAGS
     --description=DESCRIPTION
        A text description of the rule.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app firewall-rules create
```

### gcloud app firewall-rules delete

```text
NAME
    gcloud app firewall-rules delete - deletes a specified firewall rule

SYNOPSIS
    gcloud app firewall-rules delete PRIORITY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes a specified firewall rule.

EXAMPLES
    To delete an App Engine firewall rule, run:

        $ gcloud app firewall-rules delete 1234

POSITIONAL ARGUMENTS
     PRIORITY
        An integer between 1 and 2^32-1 which indicates the evaluation order of
        rules. Lowest priority rules are evaluated first. The handle default
        may also be used to refer to the final rule at priority 2^32-1 which is
        always present in a set of rules.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app firewall-rules delete
```

### gcloud app firewall-rules describe

```text
NAME
    gcloud app firewall-rules describe - prints the fields of a specified
        firewall rule

SYNOPSIS
    gcloud app firewall-rules describe PRIORITY [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Prints the fields of a specified firewall rule.

EXAMPLES
    To describe an App Engine firewall rule, run:

        $ gcloud app firewall-rules describe 1234

POSITIONAL ARGUMENTS
     PRIORITY
        An integer between 1 and 2^32-1 which indicates the evaluation order of
        rules. Lowest priority rules are evaluated first. The handle default
        may also be used to refer to the final rule at priority 2^32-1 which is
        always present in a set of rules.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app firewall-rules describe
```

### gcloud app firewall-rules list

```text
NAME
    gcloud app firewall-rules list - lists the firewall rules

SYNOPSIS
    gcloud app firewall-rules list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Lists the firewall rules.

EXAMPLES
    To list all App Engine firewall rules, run:

        $ gcloud app firewall-rules list

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
    This variant is also available:

        $ gcloud beta app firewall-rules list
```

### gcloud app firewall-rules test-ip

```text
NAME
    gcloud app firewall-rules test-ip - display firewall rules that match a
        given IP

SYNOPSIS
    gcloud app firewall-rules test-ip IP [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display firewall rules that match a given IP.

EXAMPLES
    To test an IP address against the firewall rule set, run:

        $ gcloud app firewall-rules test-ip 127.1.2.3

POSITIONAL ARGUMENTS
     IP
        An IPv4 or IPv6 address to test against the firewall.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app firewall-rules test-ip
```

### gcloud app firewall-rules update

```text
NAME
    gcloud app firewall-rules update - updates a firewall rule

SYNOPSIS
    gcloud app firewall-rules update PRIORITY [--action=ACTION]
        [--description=DESCRIPTION] [--source-range=SOURCE_RANGE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a firewall rule.

EXAMPLES
    To update an App Engine firewall rule, run:

        $ gcloud app firewall-rules update 1234 \
          --source-range='2001:db8::/32' --action=allow \
          --description='This is an example rule.'

POSITIONAL ARGUMENTS
     PRIORITY
        An integer between 1 and 2^32-1 which indicates the evaluation order of
        rules. Lowest priority rules are evaluated first. The handle default
        may also be used to refer to the final rule at priority 2^32-1 which is
        always present in a set of rules.

FLAGS
     --action=ACTION
        Allow or deny matched traffic. ACTION must be one of: ALLOW, DENY.

     --description=DESCRIPTION
        A text description of the rule.

     --source-range=SOURCE_RANGE
        An IP address or range in CIDR notation or the * wildcard to match all
        traffic.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud beta app firewall-rules update
```

### gcloud beta app firewall-rules create

```text
NAME
    gcloud beta app firewall-rules create - creates a firewall rule

SYNOPSIS
    gcloud beta app firewall-rules create PRIORITY --action=ACTION
        --source-range=SOURCE_RANGE [--description=DESCRIPTION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app firewall-rules delete

```text
NAME
    gcloud beta app firewall-rules delete - deletes a specified firewall rule

SYNOPSIS
    gcloud beta app firewall-rules delete PRIORITY [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app firewall-rules describe

```text
NAME
    gcloud beta app firewall-rules describe - prints the fields of a specified
        firewall rule

SYNOPSIS
    gcloud beta app firewall-rules describe PRIORITY [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app firewall-rules list

```text
NAME
    gcloud beta app firewall-rules list - lists the firewall rules

SYNOPSIS
    gcloud beta app firewall-rules list [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app firewall-rules test-ip

```text
NAME
    gcloud beta app firewall-rules test-ip - display firewall rules that match
        a given IP

SYNOPSIS
    gcloud beta app firewall-rules test-ip IP [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app firewall-rules update

```text
NAME
    gcloud beta app firewall-rules update - updates a firewall rule

SYNOPSIS
    gcloud beta app firewall-rules update PRIORITY [--action=ACTION]
        [--description=DESCRIPTION] [--source-range=SOURCE_RANGE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/app/firewall-rules (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
