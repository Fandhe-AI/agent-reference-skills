---
source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/data-product-sharing
---

# gcloud biglake data-product-sharing

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud biglake data-product-sharing publish

```text
NAME
    gcloud biglake data-product-sharing publish - publish a Knowledge Catalog
        Data Product or BigLake tables to external partners

SYNOPSIS
    gcloud biglake data-product-sharing publish
        --connection-catalog=CONNECTION_CATALOG
        --sap-federated-identity-provider=SAP_FEDERATED_IDENTITY_PROVIDER
        --share=SHARE
        (--data-product=DATA_PRODUCT | --iceberg-catalog=ICEBERG_CATALOG)
        [--description=DESCRIPTION] [--short-description=SHORT_DESCRIPTION]
        [--title=TITLE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Publish a Knowledge Catalog Data Product or BigLake tables to external
    partners.

REQUIRED FLAGS
     Catalog resource - The delta sharing catalog that contains information
     about where the data product is published. This represents a Cloud
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument --connection-catalog on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --connection-catalog=CONNECTION_CATALOG
          ID of the catalog or fully qualified identifier for the catalog.

          To set the catalog attribute:
          + provide the argument --connection-catalog on the command line.

     --sap-federated-identity-provider=SAP_FEDERATED_IDENTITY_PROVIDER
        The resource name of the Workload Identity Federation (WIF) provider
        resource representing the SAP federated identity. You must manually
        grant this identity the necessary IAM permissions (e.g.,
        roles/biglake.viewer) on the underlying catalog.

     --share=SHARE
        The desired name of the Share as it will be published to

     source

     Exactly one of these must be specified:

       --data-product=DATA_PRODUCT
          The Knowledge Catalog Data Product to publish.

       Or at least one of these can be specified:

         Catalog resource - The BigLake Iceberg REST Catalog whose tables will
         be published. This represents a Cloud resource. (NOTE) Some attributes
         are not given arguments in this group but can be set in other ways.

         To set the project attribute:
          - provide the argument --iceberg-catalog on the command line with a
            fully specified name;
          - provide the argument --project on the command line;
          - set the property core/project.

         --iceberg-catalog=ICEBERG_CATALOG
            ID of the catalog or fully qualified identifier for the catalog.

            To set the catalog attribute:
            - provide the argument --iceberg-catalog on the command line.

OPTIONAL FLAGS
     --description=DESCRIPTION
        The optional detailed description of the published share.

     --short-description=SHORT_DESCRIPTION
        The short, concise description of the published share. Required when
        publishing an Iceberg catalog.

     --title=TITLE
        The title of the published share. Required when publishing an Iceberg
        catalog.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha biglake data-product-sharing publish
```

### gcloud alpha biglake data-product-sharing publish

```text
NAME
    gcloud alpha biglake data-product-sharing publish - publish a Knowledge
        Catalog Data Product or BigLake tables to external partners

SYNOPSIS
    gcloud alpha biglake data-product-sharing publish
        --connection-catalog=CONNECTION_CATALOG
        --sap-federated-identity-provider=SAP_FEDERATED_IDENTITY_PROVIDER
        --share=SHARE
        (--data-product=DATA_PRODUCT | --iceberg-catalog=ICEBERG_CATALOG)
        [--description=DESCRIPTION] [--short-description=SHORT_DESCRIPTION]
        [--title=TITLE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha biglake data-product-sharing unpublish

```text
NAME
    gcloud alpha biglake data-product-sharing unpublish - unpublish a Knowledge
        Catalog Data Product or BigLake tables from external partners

SYNOPSIS
    gcloud alpha biglake data-product-sharing unpublish
        --connection-catalog=CONNECTION_CATALOG --share=SHARE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/biglake/data-product-sharing (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
