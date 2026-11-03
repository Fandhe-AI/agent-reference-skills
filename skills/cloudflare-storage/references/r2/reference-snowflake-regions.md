---
source: https://developers.cloudflare.com/r2/reference/partners/snowflake-regions/
---

# Snowflake regions

Recommended R2 location or jurisdiction for each Snowflake region.

## Signature / Usage

```txt
Snowflake AWS us-east-1 (N. Virginia)  ->  Jurisdiction: us  or hint: enam
Snowflake AWS eu-central-1 (Frankfurt) ->  Jurisdiction: eu  or hint: weur/eeur
Snowflake AWS ap-northeast-1 (Tokyo)   ->  Location hint: apac
```

## Options / Props

North and South America (Commercial):

| Snowflake region name | Cloud | Region ID | Recommended R2 location |
| --- | --- | --- | --- |
| Canada (Central) | AWS | `ca-central-1` | Location hint: `enam` |
| South America (Sao Paulo) | AWS | `sa-east-1` | Location hint: `enam` |
| US West (Oregon) | AWS | `us-west-2` | Jurisdiction: `us` or hint: `wnam` |
| US East (Ohio) | AWS | `us-east-2` | Jurisdiction: `us` or hint: `enam` |
| US East (N. Virginia) | AWS | `us-east-1` | Jurisdiction: `us` or hint: `enam` |
| US Central1 (Iowa) | GCP | `us-central1` | Jurisdiction: `us` or hint: `enam` |
| US East4 (N. Virginia) | GCP | `us-east4` | Jurisdiction: `us` or hint: `enam` |
| Canada Central (Toronto) | Azure | `canadacentral` | Location hint: `enam` |
| Central US (Iowa) | Azure | `centralus` | Jurisdiction: `us` or hint: `enam` |
| East US 2 (Virginia) | Azure | `eastus2` | Jurisdiction: `us` or hint: `enam` |
| Mexico Central (Mexico City) | Azure | `mexicocentral` | Location hint: `wnam` |
| South Central US (Texas) | Azure | `southcentralus` | Jurisdiction: `us` or hint: `enam` |
| West US 2 (Washington) | Azure | `westus2` | Jurisdiction: `us` or hint: `wnam` |

U.S. Government:

| Snowflake region name | Cloud | Region ID | Recommended R2 location |
| --- | --- | --- | --- |
| US Gov East 1 | AWS | `us-gov-east-1` | Jurisdiction: `fedramp` |
| US Gov West 1 | AWS | `us-gov-west-1` | Jurisdiction: `fedramp` |
| US Gov Virginia | Azure | `usgovvirginia` | Jurisdiction: `fedramp` |

Europe and Middle East:

| Snowflake region name | Cloud | Region ID | Recommended R2 location |
| --- | --- | --- | --- |
| EU (Frankfurt) | AWS | `eu-central-1` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| EU (Zurich) | AWS | `eu-central-2` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| EU (Stockholm) | AWS | `eu-north-1` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| EU (Ireland) | AWS | `eu-west-1` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| Europe (London) | AWS | `eu-west-2` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| EU (Paris) | AWS | `eu-west-3` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| Middle East Central2 (Dammam) | GCP | `me-central2` | Location hint: `weur`/`eeur` |
| Europe West2 (London) | GCP | `europe-west-2` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| Europe West3 (Frankfurt) | GCP | `europe-west-3` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| Europe West4 (Netherlands) | GCP | `europe-west-4` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| North Europe (Ireland) | Azure | `northeurope` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| Switzerland North (Zurich) | Azure | `switzerlandnorth` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| West Europe (Netherlands) | Azure | `westeurope` | Jurisdiction: `eu` or hint: `weur`/`eeur` |
| UAE North (Dubai) | Azure | `uaenorth` | Location hint: `weur`/`eeur` |
| UK South (London) | Azure | `uksouth` | Jurisdiction: `eu` or hint: `weur`/`eeur` |

Asia Pacific and China:

| Snowflake region name | Cloud | Region ID | Recommended R2 location |
| --- | --- | --- | --- |
| Asia Pacific (Tokyo) | AWS | `ap-northeast-1` | Location hint: `apac` |
| Asia Pacific (Seoul) | AWS | `ap-northeast-2` | Location hint: `apac` |
| Asia Pacific (Osaka) | AWS | `ap-northeast-3` | Location hint: `apac` |
| Asia Pacific (Mumbai) | AWS | `ap-south-1` | Location hint: `apac` |
| Asia Pacific (Singapore) | AWS | `ap-southeast-1` | Location hint: `apac` |
| Asia Pacific (Sydney) | AWS | `ap-southeast-2` | Location hint: `oc` |
| Asia Pacific (Jakarta) | AWS | `ap-southeast-3` | Location hint: `apac` |
| China (Ningxia) | AWS | `cn-northwest-1` | Location hint: `apac` |
| Australia East (New South Wales) | Azure | `australiaeast` | Location hint: `oc` |
| Central India (Pune) | Azure | `centralindia` | Location hint: `apac` |
| Japan East (Tokyo) | Azure | `japaneast` | Location hint: `apac` |
| Southeast Asia (Singapore) | Azure | `southeastasia` | Location hint: `apac` |

## Notes

- Location hints are best effort; confirm placement after creation under bucket **Settings** > **Bucket details**. Jurisdictions enforce both storage and processing within the jurisdiction.
- FedRAMP access for Enterprise customers is arranged via the account team or Cloudflare Support.

## Related

- [Data location](./reference-data-location.md)
