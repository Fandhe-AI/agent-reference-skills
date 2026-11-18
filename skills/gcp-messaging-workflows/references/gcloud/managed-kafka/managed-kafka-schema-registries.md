---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/managed-kafka/schema-registries
---

# gcloud managed-kafka schema-registries

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta managed-kafka schema-registries create

```text
NAME
    gcloud beta managed-kafka schema-registries create - create a Managed
        Service for Apache Kafka schema registry

SYNOPSIS
    gcloud beta managed-kafka schema-registries create
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka schema-registries delete

```text
NAME
    gcloud beta managed-kafka schema-registries delete - delete a Managed
        Service for Apache Kafka schema registry

SYNOPSIS
    gcloud beta managed-kafka schema-registries delete
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka schema-registries describe

```text
NAME
    gcloud beta managed-kafka schema-registries describe - describe a schema
        registry with all of its fields

SYNOPSIS
    gcloud beta managed-kafka schema-registries describe
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta managed-kafka schema-registries list

```text
NAME
    gcloud beta managed-kafka schema-registries list - list all Managed Service
        for Apache Kafka schema registries in a given location

SYNOPSIS
    gcloud beta managed-kafka schema-registries list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries create

```text
NAME
    gcloud alpha managed-kafka schema-registries create - create a Managed
        Service for Apache Kafka schema registry

SYNOPSIS
    gcloud alpha managed-kafka schema-registries create
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries delete

```text
NAME
    gcloud alpha managed-kafka schema-registries delete - delete a Managed
        Service for Apache Kafka schema registry

SYNOPSIS
    gcloud alpha managed-kafka schema-registries delete
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries describe

```text
NAME
    gcloud alpha managed-kafka schema-registries describe - describe a schema
        registry with all of its fields

SYNOPSIS
    gcloud alpha managed-kafka schema-registries describe
        (SCHEMA_REGISTRY : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries list

```text
NAME
    gcloud alpha managed-kafka schema-registries list - list all Managed
        Service for Apache Kafka schema registries in a given location

SYNOPSIS
    gcloud alpha managed-kafka schema-registries list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries subjects describe

```text
NAME
    gcloud alpha managed-kafka schema-registries subjects describe - describe a
        subject in a schema registry with all of its fields

SYNOPSIS
    gcloud alpha managed-kafka schema-registries subjects describe
        (SUBJECT : --location=LOCATION --registry=REGISTRY) [--context=CONTEXT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries subjects update

```text
NAME
    gcloud alpha managed-kafka schema-registries subjects update - update the
        mode and compatibility of a subject

SYNOPSIS
    gcloud alpha managed-kafka schema-registries subjects update
        (SUBJECT : --location=LOCATION --registry=REGISTRY)
        (--compatibility=COMPATIBILITY | --delete-config | --delete-mode
          | --mode=MODE) [--context=CONTEXT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha managed-kafka schema-registries update

```text
NAME
    gcloud alpha managed-kafka schema-registries update - update the mode and
        compatibility of a schema registry

SYNOPSIS
    gcloud alpha managed-kafka schema-registries update
        (SCHEMA_REGISTRY : --location=LOCATION)
        (--compatibility=COMPATIBILITY | --mode=MODE) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/managed-kafka/schema-registries (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
