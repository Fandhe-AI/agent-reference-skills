---
source: https://docs.cloud.google.com/assured-workloads/docs/overview
---

# Overview of Assured Workloads

Assured Workloads lets private and public sector organizations configure a sovereign data and access boundary (residency, access and personnel controls) for sensitive workloads. Predefined control packages are applied to folders; the controls are enforced with organization policy constraints and other features, while the workload keeps the scale, cost and service availability of commercial cloud infrastructure.

## Signature / Usage

### Monitor an Assured Workloads folder for violations

Assured Workloads monitors organization policy constraint violations and resource violations for a deployed control package; email notifications can be enabled for organization policy violations and for added violation exceptions. The command below lists the current violations (see the monitoring page for the required roles).

```bash
gcloud assured workloads violations list --location=LOCATION --organization=ORGANIZATION_ID --workload=WORKLOAD_ID
```

## Options / Props

### Capabilities

| Capability | Description |
|---|---|
| Regional data boundaries and regulatory data boundaries | Compliance enforcement through control packages. |
| Personnel data access controls | Control which Google personnel can access data when fulfilling support tasks. |
| Encryption key management controls | Depends on the control package. |
| Compliance updates | Workload updates let you evaluate and apply newer control package configurations to a deployed folder. |
| Monitoring for violations | Organization policy and resource violations. |

### Control package families

| Family | Description |
|---|---|
| Regional data boundaries | Data residency by restricting the geographic location where resources can be stored; some also give independent control over Google's access to your data (for example approving only specific provider behaviors). Example: with the EU Data Boundary package, resource usage is restricted to EU-only regions. |
| Regulatory data boundaries | Controls for a specific regulatory or compliance requirement: Canada Controlled Goods Program (CGP), Criminal Justice Information Systems (CJIS), FedRAMP Moderate and FedRAMP High, Healthcare and Life Sciences Controls (with or without US Support) for HIPAA and HITRUST, Impact Level 2 / 4 / 5 (IL2, IL4, IL5), ITAR, IRS Publication 1075. |
| Sovereign Controls by Partners | Control packages operated and managed by partners: a local trusted partner manages encryption keys, access justification and audits. |

### Personnel access and key management

| Topic | Description |
|---|---|
| Assured Support | Additional Cloud Customer Care feature available with Enhanced Support or Premium Support. Support personnel must meet geographical and personnel-based requirements, for example access controls that support FedRAMP High require all first-level and second-level Google support personnel and subprocessors to be located in the US and meet enhanced background check requirements. |
| Key management | The Data Boundary for ITAR package requires CMEK and uses a key management project separate from other resources with a unique key ring in a compliance location. Other packages support Google-owned and Google-managed encryption keys (FIPS-140-2 compliant), CMEK, Cloud EKM and key import. |

### Services for access control and visibility

| Service | Description |
|---|---|
| Access Approval | An authorized customer administrator must approve a request before a Google administrator receives access; approved requests are logged in Access Transparency logs linked to the approval request. With Assured Workloads, the Access Approval request conditions are secondary to the applied Assured Workloads personnel access assurances. |
| Access Transparency | Lets you view Google authorized personnel activity logs for actions related to support requests and service availability. |
| Key Access Justifications | Control over viewing and approving key access requests in Cloud KMS or certain external key management partners; approve or deny by justification. Depending on the control package, usable with Cloud EKM keys, Cloud HSM keys, or Cloud KMS software keys. |

### Control package renaming (June 2025)

| Upcoming name | Current name |
|---|---|
| Australia Data Boundary | Australia Regions |
| Australia Data Boundary and Support | Australia Regions with Assured Support |
| Brazil Data Boundary | Brazil Regions |
| Canada Data Boundary | Canada Regions |
| Canada Data Boundary and Support | Canada Regions and Support |
| Chile Data Boundary | Chile Regions |
| Data Boundary for Canada Controlled Goods | Canada Controlled Goods |
| Data Boundary for Canada Protected B | Canada Protected B |
| Data Boundary for CJIS | Criminal Justice Information Systems (CJIS) |
| Data Boundary for FedRAMP High | FedRAMP High |
| Data Boundary for FedRAMP Moderate | FedRAMP Moderate |
| Data Boundary for Impact Level 2 (IL2) | Impact Level 2 (IL2) |
| Data Boundary for Impact Level 4 (IL4) | Impact Level 4 (IL4) |
| Data Boundary for Impact Level 5 (IL5) | Impact Level 5 (IL5) |
| Data Boundary for IRS Publication 1075 | IRS Publication 1075 |
| Data Boundary for ITAR | International Traffic in Arms Regulations (ITAR) |
| EU Data Boundary | EU Regions |
| EU Data Boundary and Support | EU Regions and Support |
| EU Data Boundary with Access Justifications | Sovereign Controls for EU |
| Hong Kong Data Boundary | Hong Kong Regions |
| India Data Boundary | India Regions |
| Indonesia Data Boundary | Indonesia Regions |
| Israel Data Boundary | Israel Regions |
| Israel Data Boundary and Support | Israel Regions and Support |
| Japan Data Boundary | Japan Regions |
| Kingdom of Saudi Arabia Data Boundary with Access Justifications | Sovereign Controls for Kingdom of Saudi Arabia (KSA) |
| Qatar Data Boundary | Qatar Regions |
| Singapore Data Boundary | Singapore Regions |
| South Africa Data Boundary | South Africa Regions |
| South Korea Data Boundary | South Korea Regions |
| Switzerland Data Boundary | Switzerland Regions |
| Taiwan Data Boundary | Taiwan Regions |
| UK Data Boundary | UK Regions |
| US Data Boundary | US Regions |
| US Data Boundary and Support | US Regions and Support |
| US Data Boundary for Healthcare and Life Sciences | Healthcare and Life Sciences Controls |
| US Data Boundary for Healthcare and Life Sciences with Support | Healthcare and Life Sciences Controls with US Support |

## Notes

- Control package renaming (June 2025): Control package names in the console and APIs changed as of June 2025; the new names are reflected in the `ComplianceRegime` enums used to create a workload through the API. Only the names changed, not the functionality. The source lists "some" packages:
- Use Assured Workloads when you must meet specific regulatory, regional or sovereignty requirements: strict regulations on data storage, key management and access (financial services, healthcare, government), data that must stay in certain regions or countries, or control over Google Cloud personnel access.
- Support for Google Cloud products varies by control package; see the supported products page of the official docs.
- Source inconsistency: the page text calls the table "new and previous" names, but the column headers read "Upcoming name" and "Current name". The "Data Boundary" names in the first column are the names used on the control packages page; the second column holds the earlier names.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/docs/monitor-folder
- Pricing is not copied; see the Assured Workloads pricing page. The source also points to a free trial program and to Audit Manager for auditing your environment (see the audit-manager category of this skill).
- Source: https://docs.cloud.google.com/assured-workloads/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-concepts.md](./key-concepts.md)
- [control-packages.md](./control-packages.md)
- [key-management.md](./key-management.md)
- [monitor-folder.md](./monitor-folder.md)
- [data-residency.md](./data-residency.md)
