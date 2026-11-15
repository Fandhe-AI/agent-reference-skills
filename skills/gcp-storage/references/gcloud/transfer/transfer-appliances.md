---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/transfer/appliances
---

# gcloud transfer appliances

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha transfer appliances delete

```text
NAME
    gcloud alpha transfer appliances delete - delete a transfer appliance

SYNOPSIS
    gcloud alpha transfer appliances delete APPLIANCE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances describe

```text
NAME
    gcloud alpha transfer appliances describe - get configuration details about
        a Transfer Appliance

SYNOPSIS
    gcloud alpha transfer appliances describe APPLIANCE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances list

```text
NAME
    gcloud alpha transfer appliances list - list Transfer Appliances

SYNOPSIS
    gcloud alpha transfer appliances list [--appliances=[APPLIANCES,...]]
        [--orders=[ORDERS,...]] [--region=REGION] [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances orders create

```text
NAME
    gcloud alpha transfer appliances orders create - create an order for a
        transfer appliance

SYNOPSIS
    gcloud alpha transfer appliances orders create NAME --country=COUNTRY
        [--submit] [--clone=CLONE : --clone-region=CLONE_REGION]
        [[--model=MODEL : --cmek=CMEK --display-name=DISPLAY_NAME
          --internet-enabled
          --offline-export=[manifest=MANIFEST],[source=SOURCE]
          --offline-import=OFFLINE_IMPORT --online-import=ONLINE_IMPORT]]
        [--address=[administrative-area=ADMINISTRATIVE-AREA],
          [lines=LINES],[locality=LOCALITY],[postal-code=POSTAL-CODE]
          --delivery-notes=DELIVERY_NOTES
          --order-contact=[business=BUSINESS],
          [emails=EMAILS],[name=NAME],[phone=PHONE]
          --shipping-contact=[business=BUSINESS],
          [emails=EMAILS],[name=NAME],[phone=PHONE]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances orders delete

```text
NAME
    gcloud alpha transfer appliances orders delete - delete transfer appliance
        orders

SYNOPSIS
    gcloud alpha transfer appliances orders delete ORDER [--keep-appliances]
        [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances orders describe

```text
NAME
    gcloud alpha transfer appliances orders describe - get information about
        Transfer Appliance orders

SYNOPSIS
    gcloud alpha transfer appliances orders describe ORDER [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances orders list

```text
NAME
    gcloud alpha transfer appliances orders list - list Transfer Appliance
        orders

SYNOPSIS
    gcloud alpha transfer appliances orders list
        [--appliances=[APPLIANCES,...]] [--orders=[ORDERS,...]]
        [--region=REGION] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha transfer appliances orders update

```text
NAME
    gcloud alpha transfer appliances orders update - update an order for a
        transfer appliance

SYNOPSIS
    gcloud alpha transfer appliances orders update ORDER [--region=REGION]
        [--submit]
        [--cmek=CMEK --display-name=DISPLAY_NAME --model=MODEL
          --offline-export=[manifest=MANIFEST],[source=SOURCE]
          --offline-import=OFFLINE_IMPORT --online-import=ONLINE_IMPORT]
        [--address=[administrative-area=ADMINISTRATIVE-AREA],
          [lines=LINES],[locality=LOCALITY],[postal-code=POSTAL-CODE]
          --delivery-notes=DELIVERY_NOTES
          --order-contact=[business=BUSINESS],
          [emails=EMAILS],[name=NAME],[phone=PHONE]
          --shipping-contact=[business=BUSINESS],
          [emails=EMAILS],[name=NAME],[phone=PHONE]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/transfer/appliances (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
