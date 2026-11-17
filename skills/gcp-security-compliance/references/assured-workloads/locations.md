---
source: https://docs.cloud.google.com/assured-workloads/docs/locations
---

# Assured Workloads locations

Regions and multi-regions where Assured Workloads workloads and service-specific resources can be deployed, with the control packages (workload locations) each location supports. For Sovereign Controls by Partners locations see the Sovereign Controls by Partners locations page.

## Signature / Usage

### List workloads in a location

The page has no code block. The `--location` flag of the Assured Workloads commands takes a location from this page; this help example lists the environments of organization `123` in `us-central1`.

```bash
gcloud assured workloads list --organization=123 \
    --location=us-central1
```

## Options / Props

### Location concepts

| Concept | Description |
|---|---|
| Workload location | The location where a `Workload` (an Assured Workloads folder) is deployed; it defines the folder's data boundary and other configuration. |
| Service-specific resource location | The location where resources for a service are deployed in the folder, such as a Cloud Storage blob or a Compute Engine VM. The `gcp.resourceLocations` constraint restricts them to locations allowed by the data boundary; for example the US Data Boundary enforces deployment to the `us` multi-region or one of its included regions. |

### Americas

| Region | Description | Supported workload location |
|---|---|---|
| `us-central1` | Iowa, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-east1` | South Carolina, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-east4` | Northern Virginia, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-east5` | Ohio, US | US Data Boundary, Data Boundary for FedRAMP High, and Data Boundary for FedRAMP Moderate |
| `us-south1` | Texas, US | US Data Boundary, Data Boundary for FedRAMP High, and Data Boundary for FedRAMP Moderate |
| `us-west1` | Oregon, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-west2` | Los Angeles, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-west3` | Salt Lake City, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `us-west4` | Las Vegas, US | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |
| `northamerica-northeast1` | Montréal, Canada | Canada Data Boundary, Canada Data Boundary and Support, Data Boundary for Canada Controlled Goods Program (CGP), and Data Boundary for Canada Protected B |
| `northamerica-northeast2` | Toronto, Canada | Canada Data Boundary, Canada Data Boundary and Support, Data Boundary for Canada Controlled Goods Program (CGP), and Data Boundary for Canada Protected B |
| `southamerica-east1` | São Paulo, Brazil | Brazil Data Boundary |
| `southamerica-west1` | Santiago, Chile | Chile Data Boundary |

### Europe

| Region | Description | Supported workload location |
|---|---|---|
| `europe-central2` | Warsaw, Poland | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west1` | St. Ghislain, Belgium | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west2` | London, UK | UK Data Boundary |
| `europe-west3` | Frankfurt, Germany | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west4` | Eemshaven, Netherlands | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west6` | Zurich, Switzerland | Switzerland Data Boundary |
| `europe-west8` | Milan, Italy | EU Data Boundary |
| `europe-west9` | Paris, France | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west10` | Berlin, Germany | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-west12` | Turin, Italy | EU Data Boundary |
| `europe-southwest1` | Madrid, Spain | EU Data Boundary and EU Data Boundary and Support |
| `europe-north1` | Hamina, Finland | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `europe-north2` | Stockholm, Sweden | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |

### Asia Pacific

| Region | Description | Supported workload location |
|---|---|---|
| `asia-south1` | Mumbai, India | India Data Boundary |
| `asia-south2` | Delhi, India | India Data Boundary |
| `asia-southeast1` | Jurong West, Singapore | Singapore Data Boundary |
| `asia-southeast2` | Jakarta, Indonesia | Indonesia Data Boundary |
| `asia-east1` | Changhua County, Taiwan | Taiwan Data Boundary |
| `asia-east2` | Hong Kong | Hong Kong Data Boundary |
| `asia-northeast1` | Tokyo, Japan | Japan Data Boundary |
| `asia-northeast2` | Osaka, Japan | Japan Data Boundary |
| `asia-northeast3` | Seoul, South Korea | South Korea Data Boundary |
| `australia-southeast1` | Sydney, Australia | Australia Data Boundary and Australia Data Boundary and Support |
| `australia-southeast2` | Melbourne, Australia | Australia Data Boundary and Australia Data Boundary and Support |

### Africa and Middle East

| Region | Description | Supported workload location |
|---|---|---|
| `africa-south1` | Johannesburg, South Africa | South Africa Data Boundary |
| `me-central1` | Doha, Qatar | Qatar Data Boundary |
| `me-central2` | Dammam, Kingdom of Saudi Arabia (KSA) | KSA Data Boundary with Access Justifications |
| `me-west1` | Tel Aviv, Israel | Israel Data Boundary and Israel Data Boundary and Support |

### Multi-regions

| Multi-region | Description | Supported workload location |
|---|---|---|
| `ca` | Data centers within Canada; includes `northamerica-northeast1`, `northamerica-northeast2` | Canada Data Boundary and Support, Data Boundary for Canada Controlled Goods Program (CGP), and Data Boundary for Canada Protected B |
| `europe` | Data centers within member states of the European Union; includes `europe-central2`, `europe-north1`, `europe-north2`, `europe-west1`, `europe-west3`, `europe-west4`, `europe-west9`, `europe-west10` | EU Data Boundary, EU Data Boundary and Support, and EU Data Boundary with Access Justifications |
| `us` | Data centers within the United States; includes `us-central1`, `us-east1`, `us-east4`, `us-west1`, `us-west2`, `us-west3`, `us-west4` | US Data Boundary, US Data Boundary and Support, Data Boundary for CJIS, Data Boundary for FedRAMP High, Data Boundary for FedRAMP Moderate, Data Boundary for IL2, Data Boundary for IL4, Data Boundary for IL5, Data Boundary for IRS 1075, Data Boundary for ITAR, US Data Boundary for Healthcare and Life Sciences, and US Data Boundary for Healthcare and Life Sciences with Support |

## Notes

- The source tables have a fourth column, "Supported resource location", which is empty in every row except `europe-west6`, where it reads "Switzerland Data Boundary with Access Justifications"; the Europe table's header separator in the source has five columns. This page does not state any other value for that column and does not imply that resource locations are unsupported.
- Workload location lists are copied from the source cells without links.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/assured-workloads/docs/locations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [data-residency.md](./data-residency.md)
- [control-packages.md](./control-packages.md)
- [eu-data-boundary.md](./eu-data-boundary.md)
