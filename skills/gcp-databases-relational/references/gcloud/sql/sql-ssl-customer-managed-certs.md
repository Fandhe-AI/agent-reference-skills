---
source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl/customer-managed-certs
---

# gcloud sql ssl customer-managed-certs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud sql ssl customer-managed-certs delete

```text
NAME
    gcloud sql ssl customer-managed-certs delete - delete a customer managed
        certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl customer-managed-certs delete BUNDLE --instance=INSTANCE, -i
        INSTANCE [--async] [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a customer managed certificate bundle for a Cloud SQL instance.

EXAMPLES
    To delete the customer managed certificate bundle bundle1 for the Cloud SQL
    instance my-instance, run:

        $ gcloud sql ssl customer-managed-certs delete bundle1 \
            --instance=my-instance

POSITIONAL ARGUMENTS
     BUNDLE
        Customer managed certificate bundle name. Constrained to [a-zA-Z0-9]+
        with a maximum length of 10 characters.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl customer-managed-certs delete

        $ gcloud beta sql ssl customer-managed-certs delete
```

### gcloud sql ssl customer-managed-certs list

```text
NAME
    gcloud sql ssl customer-managed-certs list - list all customer managed
        certificate bundles for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl customer-managed-certs list --instance=INSTANCE, -i INSTANCE
        [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all customer managed certificate bundles for a Cloud SQL instance.

EXAMPLES
    To list all customer managed certificate bundles for the Cloud SQL instance
    my-instance, run:

        $ gcloud sql ssl customer-managed-certs list --instance=my-instance

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

FLAGS
     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

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

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl customer-managed-certs list

        $ gcloud beta sql ssl customer-managed-certs list
```

### gcloud sql ssl customer-managed-certs update

```text
NAME
    gcloud sql ssl customer-managed-certs update - create or update a customer
        managed certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud sql ssl customer-managed-certs update BUNDLE --instance=INSTANCE, -i
        INSTANCE [--allow-missing] [--async]
        [--client-cert-file=CLIENT_CERT_FILE]
        [--client-key-file=CLIENT_KEY_FILE] [--endpoint-mode=ENDPOINT_MODE]
        [--intent=INTENT; default="PG_LOGICAL"] [--primary-dns=PRIMARY_DNS]
        [--primary-ipv4-address=PRIMARY_IPV4_ADDRESS]
        [--server-ca-file=SERVER_CA_FILE] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create or update a customer managed certificate bundle for a Cloud SQL
    instance.

EXAMPLES
    To create or replace a customer managed certificate bundle bundle1 for the
    Cloud SQL instance my-instance, run:

        $ gcloud sql ssl customer-managed-certs update bundle1 \
            --instance=my-instance --allow-missing --intent=PG_LOGICAL \
            --server-ca-file=/path/to/server_ca.pem \
            --client-cert-file=/path/to/client_cert.pem \
            --client-key-file=/path/to/client_key.pem \
            --primary-dns=primary.example.com \
            --primary-ipv4-address=10.0.0.1

    To partially update the primary IPv4 address and client certificate of an
    existing bundle bundle1 for my-instance, run:

        $ gcloud sql ssl customer-managed-certs update bundle1 \
            --instance=my-instance \
            --update-mask=primary_dns_record.ipv4_address,\
        customer_managed_certificates --primary-ipv4-address=10.0.0.2 \
            --client-cert-file=/path/to/new_client_cert.pem

POSITIONAL ARGUMENTS
     BUNDLE
        Customer managed certificate bundle name. Constrained to [a-zA-Z0-9]+
        with a maximum length of 10 characters.

REQUIRED FLAGS
     --instance=INSTANCE, -i INSTANCE
        Cloud SQL instance ID.

OPTIONAL FLAGS
     --allow-missing
        If set, and the customer managed certificate bundle configuration is
        not found, a new customer managed certificate bundle configuration will
        be created. In this situation, --update-mask is ignored.

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --client-cert-file=CLIENT_CERT_FILE
        Path to a PEM-encoded file containing the peer client certificate.

     --client-key-file=CLIENT_KEY_FILE
        Path to a PEM-encoded file containing the peer client private key.

     --endpoint-mode=ENDPOINT_MODE
        Specifies endpoint mode for a given command. Regional endpoints provide
        enhanced data residency and reliability by ensuring your request is
        handled entirely within the specified Google Cloud region. This differs
        from global endpoints, which may process parts of the request outside
        the target region. Overrides the default regional/endpoint_mode
        property value for this command invocation. ENDPOINT_MODE must be one
        of:

         global
            (Default) Use global rather than regional endpoints.
         regional
            Only use regional endpoints. An error will be raised if a regional
            endpoint is not available for a given command.
         regional-preferred
            Use regional endpoints when available, otherwise use global
            endpoints. Recommended for most users.

     --intent=INTENT; default="PG_LOGICAL"
        Intent for the customer managed certificate bundle configuration.
        INTENT must be (only one value is supported): PG_LOGICAL.

     --primary-dns=PRIMARY_DNS
        DNS name associated with the primary instance in a replication
        topology.

     --primary-ipv4-address=PRIMARY_IPV4_ADDRESS
        IPv4 address for the primary DNS name.

     --server-ca-file=SERVER_CA_FILE
        Path to a PEM-encoded file containing the peer server CA certificate.

     --update-mask=UPDATE_MASK
        Comma-separated list of fields to be updated. Allowed values include:
        *, intent, primary_dns_record, primary_dns_record.dns,
        primary_dns_record.ipv4_address, and customer_managed_certificates.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

REGIONAL ENDPOINTS
    This command supports regional endpoints. To use regional endpoints for
    this command, use the --endpoint-mode=regional-preferred flag. To use
    regional endpoints by default, run $ gcloud config set
    regional/endpoint_mode regional-preferred.

NOTES
    These variants are also available:

        $ gcloud alpha sql ssl customer-managed-certs update

        $ gcloud beta sql ssl customer-managed-certs update
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud sql ssl customer-managed-certs update bundle1 \
    --instance=my-instance \
    --update-mask=primary_dns_record.ipv4_address,customer_managed_certificates \
    --primary-ipv4-address=10.0.0.2 \
    --client-cert-file=/path/to/new_client_cert.pem
```

### gcloud beta sql ssl customer-managed-certs delete

```text
NAME
    gcloud beta sql ssl customer-managed-certs delete - delete a customer
        managed certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl customer-managed-certs delete BUNDLE
        --instance=INSTANCE, -i INSTANCE [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl customer-managed-certs list

```text
NAME
    gcloud beta sql ssl customer-managed-certs list - list all customer managed
        certificate bundles for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl customer-managed-certs list --instance=INSTANCE, -i
        INSTANCE [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta sql ssl customer-managed-certs update

```text
NAME
    gcloud beta sql ssl customer-managed-certs update - create or update a
        customer managed certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud beta sql ssl customer-managed-certs update BUNDLE
        --instance=INSTANCE, -i INSTANCE [--allow-missing] [--async]
        [--client-cert-file=CLIENT_CERT_FILE]
        [--client-key-file=CLIENT_KEY_FILE] [--endpoint-mode=ENDPOINT_MODE]
        [--intent=INTENT; default="PG_LOGICAL"] [--primary-dns=PRIMARY_DNS]
        [--primary-ipv4-address=PRIMARY_IPV4_ADDRESS]
        [--server-ca-file=SERVER_CA_FILE] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl customer-managed-certs delete

```text
NAME
    gcloud alpha sql ssl customer-managed-certs delete - delete a customer
        managed certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl customer-managed-certs delete BUNDLE
        --instance=INSTANCE, -i INSTANCE [--async]
        [--endpoint-mode=ENDPOINT_MODE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl customer-managed-certs list

```text
NAME
    gcloud alpha sql ssl customer-managed-certs list - list all customer
        managed certificate bundles for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl customer-managed-certs list --instance=INSTANCE, -i
        INSTANCE [--endpoint-mode=ENDPOINT_MODE] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha sql ssl customer-managed-certs update

```text
NAME
    gcloud alpha sql ssl customer-managed-certs update - create or update a
        customer managed certificate bundle for a Cloud SQL instance

SYNOPSIS
    gcloud alpha sql ssl customer-managed-certs update BUNDLE
        --instance=INSTANCE, -i INSTANCE [--allow-missing] [--async]
        [--client-cert-file=CLIENT_CERT_FILE]
        [--client-key-file=CLIENT_KEY_FILE] [--endpoint-mode=ENDPOINT_MODE]
        [--intent=INTENT; default="PG_LOGICAL"] [--primary-dns=PRIMARY_DNS]
        [--primary-ipv4-address=PRIMARY_IPV4_ADDRESS]
        [--server-ca-file=SERVER_CA_FILE] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/sql/ssl/customer-managed-certs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
