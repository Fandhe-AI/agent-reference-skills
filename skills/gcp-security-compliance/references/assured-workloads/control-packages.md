---
source: https://docs.cloud.google.com/assured-workloads/docs/control-packages
---

# Control packages

A control package is a set of controls that together support the baseline for a compliance framework, statute or regulation, including mechanisms for data residency, data sovereignty and personnel access. Packages are grouped into families and come in two pricing tiers, Free and Premium.

## Signature / Usage

### Create an environment with a control package

The page has no code block. In the gcloud help, the control package is chosen with `--compliance-regime` of `gcloud assured workloads create`. This help example creates an environment in organization `123` and `us-central1` with display name `Test-Workload`, compliance regime `FEDRAMP_MODERATE`, billing account `billingAccounts/456`, a first key rotation at 10:15am on December 30, 2020, a 48-hour key rotation interval, two labels, provisioned resources parent `folders/789`, custom consumer project ID `my-custom-id` and external identifier `external-id`.

```bash
gcloud assured workloads create --organization=123 \
    --location=us-central1 --display-name=Test-Workload \
    --compliance-regime=FEDRAMP_MODERATE \
    --billing-account=billingAccounts/456 \
    --next-rotation-time=2020-12-30T10:15:00.00Z \
    --rotation-period=172800s \
    --labels=LabelKey1=LabelValue1,LabelKey2=LabelValue2 \
    --provisioned-resources-parent=folders/789 \
    --resource-settings=consumer-project-id=my-custom-id \
    --external-identifier=external-id
```

## Options / Props

### Families

| Family | Description |
|---|---|
| Regional data boundaries | Data residency with optional personnel controls, regional support, and sovereignty features such as Key Access Justifications. |
| Regulatory data boundaries | Certified controls tailored to specific regulatory and compliance statute requirements. |
| Sovereign Controls by Partners | Data residency, personnel controls, regional support and enhanced data sovereignty controls such as Cloud EKM, Cloud HSM and Key Access Justifications. |

### Regional data boundaries

| Control package | Description | Pricing tier |
|---|---|---|
| Australia Data Boundary | Data location controls for Australia-only regions. | Free |
| Australia Data Boundary and Support | Australia-only regions; support access and technical support are set to personnel located in five countries (United States, Canada, Australia, New Zealand, United Kingdom), whether support is provided by Google or a subprocessor. | Premium |
| Brazil Data Boundary | Data location controls for Brazil-only regions. | Free |
| Canada Data Boundary | Data location controls for Canada-only regions. | Free |
| Canada Data Boundary and Support | Canada-only regions; first-level and second-level support set to personnel legally eligible to work in Canada and physically located in Canada, whether support is provided by Google or a subprocessor. | Premium |
| Chile Data Boundary | Data location controls for Chile-only regions. | Free |
| EU Data Boundary | Data location controls for EU-only regions. | Free |
| EU Data Boundary and Support | EU-only regions; support access set to EU support personnel based in the EU, whether support is provided by Google or a subprocessor. | Premium |
| EU Data Boundary with Access Justifications | EU-only regions; support access set to support personnel based in the EU, whether support is provided by Google or a subprocessor; provides data residency and data sovereignty assurances for EU-based customers. | Premium |
| Hong Kong Data Boundary | Data location controls for Hong Kong-only regions. | Free |
| India Data Boundary | Data location controls for India-only regions. | Free |
| Indonesia Data Boundary | Data location controls for Indonesia-only regions. | Free |
| Israel Data Boundary | Data location controls for Israel-only regions. | Free |
| Israel Data Boundary and Support | Israel-only regions; support access set to either security-cleared Israeli personnel located in Israel or US Persons with enhanced background checks located in the US, whether support is provided by Google or a subprocessor. | Premium |
| Japan Data Boundary | Data location controls for Japan-only regions. | Free |
| Kingdom of Saudi Arabia (KSA) Data Boundary with Access Justifications | Restricted to customers with a billing address located outside of KSA (business, residence or domicile); data location controls for the `me-central2` region. | Free |
| Qatar Data Boundary | Data location controls for Qatar-only regions. | Free |
| Singapore Data Boundary | Data location controls for Singapore-only regions. | Free |
| South Africa Data Boundary | Data location controls for South Africa-only regions. | Free |
| South Korea Data Boundary | Data location controls for South Korea-only regions. | Free |
| Switzerland Data Boundary | Data location controls for Switzerland-only regions. | Free |
| Switzerland Data Boundary with Access Justifications | Switzerland-only regions; support access set to support personnel based in the EU, whether support is provided by Google or a subprocessor. | Premium |
| Taiwan Data Boundary | Data location controls for Taiwan-only regions. | Free |
| UK Data Boundary | Data location controls for UK-only regions. | Free |
| US Data Boundary | Data location controls for US-only regions. | Free |
| US Data Boundary and Support | US-only regions; support access set to support personnel who are US Persons located in the US, whether support is provided by Google or a subprocessor. | Premium |

### Regulatory data boundaries

| Control package | Description | Pricing tier |
|---|---|---|
| Data Boundary for Canada Controlled Goods Program (CGP) | Canada-only regions; support access set to Canadian support personnel who completed Canada Controlled Goods Program screenings, whether support is provided by Google or a subprocessor. | Premium |
| Data Boundary for Canada Protected B | Canada-only regions; support access set to Canadian support personnel who completed Reliability Status screenings, whether support is provided by Google or a subprocessor. | Premium |
| Data Boundary for Criminal Justice Information Systems (CJIS) | US-only regions; support access set to personnel who completed CJIS background checks and are located in the US, whether support is provided by Google or a subprocessor. Support cases are restricted to CJIS-adjudicated support staff located in the US; escorted session controls supervise and monitor support actions by non-adjudicated staff. | Premium |
| Data Boundary for FedRAMP High | US-only regions; first-level and second-level support set to personnel who completed enhanced background checks and are located in the US, whether support is provided by Google or a subprocessor. Support cases are restricted to FedRAMP-adjudicated support staff located in the US. | Premium |
| Data Boundary for FedRAMP Moderate | Support access controls for first-level and second-level support personnel who completed enhanced background checks, whether support is provided by Google or a subprocessor; support cases are restricted to FedRAMP-adjudicated first-level and second-level support staff. The FedRAMP Moderate baseline is a subset of the FedRAMP High baseline, so for a FedRAMP Moderate ATO on workloads in Assured Workloads you can use any FedRAMP High authorized Google Cloud service. | Free |
| Data Boundary for Impact Level 2 (IL2) | US-only regions; support personnel with enhanced background checks, who are US Persons and located in the United States, whether support is provided by Google or a subprocessor. | Premium |
| Data Boundary for Impact Level 4 (IL4) | US-only regions; support personnel with enhanced background checks, who are US Persons and located in the United States, whether support is provided by Google or a subprocessor. | Premium |
| Data Boundary for Impact Level 5 (IL5) | US-only regions; support personnel with enhanced background checks, who are US Persons and located in the United States, whether support is provided by Google or a subprocessor. | Premium |
| Data Boundary for International Traffic in Arms Regulations (ITAR) | US-only regions; support access set to US Persons located in the US, whether support is provided by Google or a subprocessor. Support cases are restricted to US Persons located in the US. | Premium |
| Data Boundary for IRS Publication 1075 | US-only regions; support personnel who completed fingerprint-based CJIS background checks, state-level law enforcement checks and citizenship verification, whether support is provided by Google or a subprocessor. Support cases are restricted to background-checked staff located in the US; escorted session controls supervise and monitor support actions by non-background-checked staff. | Premium |
| US Data Boundary for Healthcare and Life Sciences | US-only regions; each in-scope service must: be listed on Google Cloud's HIPAA BAA page; be listed on Google Cloud's HITRUST CSF page; support Cloud KMS CMEK; support VPC Service Controls; support Access Transparency logs and Access Approval requests; support at-rest data residency restricted to US locations. | Free |
| US Data Boundary for Healthcare and Life Sciences with Support | Same service requirements as above, plus support access set to US Persons located in the US, whether support is provided by Google or a subprocessor. | Premium |

## Notes

- Sovereign Controls by Partners packages are operated by partners; see the sovereign-controls-by-partners category of this skill for those pages and the partner-specific locations.
- The source describes only the FedRAMP Moderate row without a US-only-regions statement; this page keeps it as written. IL2, IL4 and IL5 rows share identical descriptions in the source.
- Package names follow the control package renaming of June 2025 (see the overview page for the old-to-new name table). Prices are not copied; see Assured Workloads pricing.
- Each package's own page, where available, lists supported products and configuration details; those pages are not part of this category (see the official docs).
- The help example uses the regime value `FEDRAMP_MODERATE`; the help's `--compliance-regime` value list contains both `fedramp-moderate` and `data-boundary-for-fedramp-moderate`. Pick the value matching your control package.
- The create example creates a billed Assured Workloads environment under `folders/789`; try it in a test organization or a disposable folder first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/assured-workloads/docs/control-packages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [eu-data-boundary.md](./eu-data-boundary.md)
- [locations.md](./locations.md)
- [key-management.md](./key-management.md)
