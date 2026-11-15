---
source: https://docs.cloud.google.com/sdk/gcloud/reference/services/peered-dns-domains
---

# gcloud services peered-dns-domains

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud services peered-dns-domains create

```text
NAME
    gcloud services peered-dns-domains create - create a peered DNS domain for
        a private service connection

SYNOPSIS
    gcloud services peered-dns-domains create NAME --dns-suffix=DNS_SUFFIX
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command creates a peered DNS domain for a private service connection
    which sends requests for records in a given namespace originating in the
    service producer VPC network to the consumer VPC network to be resolved.

EXAMPLES
    To create a peered DNS domain called example-com which forwards DNS
    requests for the domain suffix example.com. for a private service
    connection between service peering-service and the consumer network
    my-network in the current project, run:

        $ gcloud services peered-dns-domains create example-com \
            --network=my-network --service=peering-service \
            --dns-suffix=example.com.

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services peered-dns-domains create example-com \
            --network=my-network --service=peering-service \
            --dns-suffix=example.com. --async

POSITIONAL ARGUMENTS
     NAME
        The name of the peered DNS domain to create.

REQUIRED FLAGS
     --dns-suffix=DNS_SUFFIX
        The DNS domain name suffix of the peered DNS domain.

     --network=NETWORK
        The network in the consumer project peered with the service.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The name of the service to create a peered DNS domain for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services peered-dns-domains create

        $ gcloud beta services peered-dns-domains create
```

### gcloud services peered-dns-domains delete

```text
NAME
    gcloud services peered-dns-domains delete - delete a peered DNS domain for
        a private service connection

SYNOPSIS
    gcloud services peered-dns-domains delete NAME --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command deletes a peered DNS domain from a private service connection.

EXAMPLES
    To delete a peered DNS domain called example-com from a private service
    connection between service peering-service and the consumer network
    my-network in the current project, run:

        $ gcloud services peered-dns-domains delete example-com \
            --network=my-network --service=peering-service

    To run the same command asynchronously (non-blocking), run:

        $ gcloud services peered-dns-domains delete example-com \
            --network=my-network --service=peering-service --async

POSITIONAL ARGUMENTS
     NAME
        The name of the peered DNS domain to delete.

REQUIRED FLAGS
     --network=NETWORK
        The network in the consumer project peered with the service.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --service=SERVICE; default="servicenetworking.googleapis.com"
        The name of the service to delete a peered DNS domain for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services peered-dns-domains delete

        $ gcloud beta services peered-dns-domains delete
```

### gcloud services peered-dns-domains list

```text
NAME
    gcloud services peered-dns-domains list - list the peered DNS domains for a
        private service connection

SYNOPSIS
    gcloud services peered-dns-domains list --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    This command lists the peered DNS domains for a private service connection.

EXAMPLES
    To list the peered DNS domains for a private service connection between
    service peering-service and the consumer network my-network in the current
    project, run:

        $ gcloud services peered-dns-domains list --network=my-network \
            --service=peering-service

REQUIRED FLAGS
     --network=NETWORK
        Network in the consumer project peered with the service.

OPTIONAL FLAGS
     --service=SERVICE; default="servicenetworking.googleapis.com"
        Name of the service to list the peered DNS domains for.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha services peered-dns-domains list

        $ gcloud beta services peered-dns-domains list
```

### gcloud beta services peered-dns-domains create

```text
NAME
    gcloud beta services peered-dns-domains create - create a peered DNS domain
        for a private service connection

SYNOPSIS
    gcloud beta services peered-dns-domains create NAME --dns-suffix=DNS_SUFFIX
        --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services peered-dns-domains delete

```text
NAME
    gcloud beta services peered-dns-domains delete - delete a peered DNS domain
        for a private service connection

SYNOPSIS
    gcloud beta services peered-dns-domains delete NAME --network=NETWORK
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services peered-dns-domains list

```text
NAME
    gcloud beta services peered-dns-domains list - list the peered DNS domains
        for a private service connection

SYNOPSIS
    gcloud beta services peered-dns-domains list --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services peered-dns-domains create

```text
NAME
    gcloud alpha services peered-dns-domains create - create a peered DNS
        domain for a private service connection

SYNOPSIS
    gcloud alpha services peered-dns-domains create NAME
        --dns-suffix=DNS_SUFFIX --network=NETWORK [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services peered-dns-domains delete

```text
NAME
    gcloud alpha services peered-dns-domains delete - delete a peered DNS
        domain for a private service connection

SYNOPSIS
    gcloud alpha services peered-dns-domains delete NAME --network=NETWORK
        [--async]
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services peered-dns-domains list

```text
NAME
    gcloud alpha services peered-dns-domains list - list the peered DNS domains
        for a private service connection

SYNOPSIS
    gcloud alpha services peered-dns-domains list --network=NETWORK
        [--service=SERVICE; default="servicenetworking.googleapis.com"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/services/peered-dns-domains (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
