---
source: https://docs.cloud.google.com/assured-workloads/docs/monitor-folder
---

# Monitor an Assured Workloads folder for violations

Assured Workloads compares a folder's control package with the folder's organization policy settings and the resources beneath it. A violation has one of three states (unresolved, resolved, exception) and can be resolved or given an exception. Monitoring is enabled automatically when you create an Assured Workloads folder.

## Signature / Usage

### List violations

```bash
gcloud assured workloads violations list --location=LOCATION --organization=ORGANIZATION_ID --workload=WORKLOAD_ID
```

`LOCATION` is the location of the Assured Workloads folder, `ORGANIZATION_ID` is the organization ID to query, and `WORKLOAD_ID` is the parent workload ID (found by listing your workloads). The response includes an audit log link, the first time the violation occurred, the type, a description, the violation name (used to retrieve details), the affected organization policy and constraint, and the current state (unresolved, resolved or exception).

### View violation details

```bash
gcloud assured workloads violations describe VIOLATION_PATH
```

Adapted (not in the official docs): the `organizations/` prefix is added to the path format so it matches the fully qualified identifier in the gcloud help (`organizations/123/locations/us-central1/workloads/456/violations/789`).

```text
organizations/ORGANIZATION_ID/locations/LOCATION/workloads/WORKLOAD_ID/violations/VIOLATION_ID
```

`VIOLATION_PATH` is returned in the `name` field of each violation in the list response. The response also includes remediation steps. Follow them to resolve the violation.

### Add a violation exception

```bash
gcloud assured workloads violations acknowledge VIOLATION_PATH --comment="BUSINESS_JUSTIFICATION"
```

After the command succeeds, the violation state is set to Exception. `BUSINESS_JUSTIFICATION` is the reason for the exception.

## Options / Props

### Violation states

| State | Meaning |
|---|---|
| Unresolved | Not addressed, or previously granted an exception before non-compliant changes were made on the folder or resource. |
| Resolved | Addressed by following the remediation steps. |
| Exception | Granted an exception with a business justification provided. |

### IAM roles and permissions

| Task | Permission | Included in roles |
|---|---|---|
| View violations | `assuredworkloads.violations.get`, `assuredworkloads.violations.list` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor`, `roles/assuredworkloads.reader` |
| Enable resource violation monitoring | `assuredworkloads.workload.update` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| Enable resource violation monitoring | `resourcemanager.folders.setIamPolicy` | Administrative roles such as `roles/resourcemanager.organizationAdmin`, `roles/iam.securityAdmin` |
| Add exceptions | `assuredworkloads.violations.update` | `roles/assuredworkloads.admin`, `roles/assuredworkloads.editor` |
| Resolve organization policy violations; view audit logs | (roles) | `roles/orgpolicy.policyAdmin`, `roles/logging.viewer` |

### Limits and notifications

| Item | Value |
|---|---|
| Violations per acknowledge operation (console) | Up to 100 organization policy violations and up to 400 resource violations. |
| Email notifications | Not available for resource violations. By default, members of the Legal category in Essential Contacts are emailed when an organization compliance violation occurs, is resolved, or an exception is made; add your violation-management team to the Legal category to receive them. Notifications can be enabled or disabled per folder (**Enable notifications** checkbox in the **Assured Workloads Monitoring** card). |

### Monitored organization policy violations

| Violation | Type | Constraint | Description | Affected control packages |
|---|---|---|---|---|
| Non-compliant access to Cloud SQL data | Access | `sql.restrictNoncompliantDiagnosticDataAccess` | Non-compliant access to Cloud SQL diagnostic data is allowed. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant access to Compute Engine data | Access | `compute.disableInstanceDataAccessApis` | Non-compliant access to Compute Engine instance data is allowed. | Data Boundary for Criminal Justice Information Systems (CJIS); EU Data Boundary with Access Justifications; Data Boundary for International Traffic in Arms Regulations (ITAR); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant Cloud Storage authentication types | Access | `storage.restrictAuthTypes` | Non-compliant authentication types are allowed for Cloud Storage. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant access to Cloud Storage buckets | Access | `storage.uniformBucketLevelAccess` | Non-uniform bucket-level access to Cloud Storage is allowed. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant access to GKE data | Access | `container.restrictNoncompliantDiagnosticDataAccess` | Non-compliant access to GKE diagnostic data is allowed. | EU Data Boundary with Access Justifications; Data Boundary for Impact Level 4 (IL4); Impact Level 5 (IL5); Data Boundary for International Traffic in Arms Regulations (ITAR); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant Compute Engine diagnostic features | Configuration | `compute.enableComplianceMemoryProtection` | Non-compliant Compute Engine diagnostic features have been enabled. | EU Data Boundary with Access Justifications; Data Boundary for International Traffic in Arms Regulations (ITAR); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant Compute Engine global load balancing setting | Configuration | `compute.disableGlobalLoadBalancing` | Non-compliant value for the global load balancing setting. | Data Boundary for International Traffic in Arms Regulations (ITAR) |
| Non-compliant Compute Engine FIPS setting | Configuration | `compute.disableNonFIPSMachineTypes` | Non-compliant value for the FIPS setting. | Data Boundary for International Traffic in Arms Regulations (ITAR) |
| Non-compliant Compute Engine SSL setting | Configuration | `compute.disableGlobalSelfManagedSslCertificate` | Non-compliant value for global self-managed certificates. | Data Boundary for International Traffic in Arms Regulations (ITAR) |
| Non-compliant Compute Engine SSH in browser setting | Configuration | `compute.disableSshInBrowser` | Non-compliant value for the SSH in browser feature. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant Cloud SQL resource creation | Configuration | `sql.restrictNoncompliantResourceCreation` | Non-compliant Cloud SQL resource creation is allowed. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Missing Cloud KMS key restriction | Encryption | `gcp.restrictCmekCryptoKeyProjects` | No projects are specified to provide encryption keys for CMEK; the constraint helps prevent unapproved folders or projects from providing keys. | EU Data Boundary with Access Justifications; Data Boundary for International Traffic in Arms Regulations (ITAR); Data Boundary for Criminal Justice Information Systems (CJIS); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant non-CMEK-enabled service | Encryption | `gcp.restrictNonCmekServices` | A service that does not support CMEK is enabled for the workload. | EU Data Boundary with Access Justifications; Data Boundary for International Traffic in Arms Regulations (ITAR); Data Boundary for Criminal Justice Information Systems (CJIS); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant Cloud KMS protection levels | Encryption | `cloudkms.allowedProtectionLevels` | Non-compliant protection levels are specified for Cloud KMS. | EU Data Boundary with Access Justifications; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant resource locations | Resource location | `gcp.resourceLocations` | Resources of supported services are created outside the allowed region or moved from an allowed location to a disallowed one. | All packages in the filter list |
| Non-compliant services | Service usage | `gcp.restrictServiceUsage` | A user enables a service that is not supported by the control package in the folder. | All packages in the filter list |

### Monitored resource violations

| Violation | Constraint | Description | Affected control packages |
|---|---|---|---|
| Non-compliant resource location | `gcp.resourceLocations` | A resource's location is in a non-compliant region. | Australia Data Boundary and Support; Data Boundary for Canada Protected B; Canada Data Boundary and Support; Data Boundary for Criminal Justice Information Systems (CJIS); EU Data Boundary and Support; EU Data Boundary with Access Justifications; Data Boundary for FedRAMP Moderate; Data Boundary for FedRAMP High; US Data Boundary for Healthcare and Life Sciences; US Data Boundary for Healthcare and Life Sciences with Support; Data Boundary for Impact Level 4 (IL4); Data Boundary for Impact Level 5 (IL5); Israel Data Boundary and Support; Data Boundary for International Traffic in Arms Regulations (ITAR); Japan Data Boundary; US Data Boundary and Support; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |
| Non-compliant resources in folder | `gcp.restrictServiceUsage` | A resource for an unsupported service is created in the folder. | All packages in the filter list except South Korea Data Boundary |
| Unencrypted (non-CMEK) resources | `gcp.restrictNonCmekServices` | A resource is created without CMEK encryption for a service that requires it. | Data Boundary for Criminal Justice Information Systems (CJIS); EU Data Boundary with Access Justifications; Data Boundary for Impact Level 5 (IL5); Data Boundary for International Traffic in Arms Regulations (ITAR); Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners) |

## Notes

- IAM roles and permissions: All grants are on the parent organization of the Assured Workloads folder.
- Monitored organization policy violations: Violation names with the constraint named in each description, grouped by type. The source filters both tables by this list of control packages ("the filter list"): Data Boundary for Criminal Justice Information Systems (CJIS); Data Boundary for FedRAMP Moderate; Data Boundary for FedRAMP High; US Data Boundary for Healthcare and Life Sciences; US Data Boundary for Healthcare and Life Sciences with Support; Data Boundary for Impact Level 2 (IL2); Data Boundary for Impact Level 4 (IL4); Data Boundary for Impact Level 5 (IL5); Data Boundary for International Traffic in Arms Regulations (ITAR); Australia Data Boundary; Australia Data Boundary and Support; Brazil Data Boundary; Canada Data Boundary; Canada Data Boundary and Support; Data Boundary for Canada Protected B; Chile Data Boundary; EU Data Boundary; EU Data Boundary and Support; EU Data Boundary with Access Justifications; Hong Kong Data Boundary; India Data Boundary; Indonesia Data Boundary; Israel Data Boundary; Israel Data Boundary and Support; Japan Data Boundary; Qatar Data Boundary; Singapore Data Boundary; South Africa Data Boundary; South Korea Data Boundary; Switzerland Data Boundary; Taiwan Data Boundary; UK Data Boundary; US Data Boundary; US Data Boundary and Support; Local Controls by S3NS (Sovereign Controls by Partners); Sovereign Controls by SIA/Minsait (Sovereign Controls by Partners); T-Systems Sovereign Cloud (Sovereign Controls by Partners).
- Monitored resource violations: The resource types monitored are listed in the Cloud Asset Inventory supported resource types documentation.
- Violation states can change: an exception reverts to unresolved when additional non-compliant changes beyond the scope of the exception are made, and a new unresolved violation is raised for them.
- Adding an exception (acknowledging) records a business justification and sets the Exception state; it does not remediate the violation. Use it only where the violation is valid for your situation.
- The Console flow lets you apply an exception to all existing child resource violations of an organization policy violation. The help for `acknowledge` has an `--acknowledge-type` flag (`SINGLE_VIOLATION` or `EXISTING_CHILD_RESOURCE_VIOLATIONS`) for the same choice.
- To resolve a violation, follow the remediation instructions in the violation details (Console or CLI). Organization policy violations can cause child resource violations; resolve parent organization policy violations at the parent level.
- Required roles in the Console: the **Organization Policy Administrator** role is visible only after switching to an organization or choosing **Manage roles**.
- Corrected from the official docs: the source gives the violation path format as `ORGANIZATION_ID/locations/LOCATION/workloads/WORKLOAD_ID/violations/VIOLATION_ID` (for both describe and acknowledge); the fully qualified identifier in the help of `gcloud assured workloads violations describe` and `acknowledge` begins `organizations/123/locations/...`, so `organizations/` was added.
- The source's violation tables are flattened into running text; each package list is placed in the row of the violation whose description precedes it. Package names are as written in each list (for example `Impact Level 5 (IL5)` in the GKE row). The organization policy table's filter writes `Data Boundary for CJIS` and has a stray `Data Boundary for` entry. Check the official page when a package list matters.
- The source also shows Console steps (the Assured Workloads and Monitoring pages) that are omitted here.
- The flags of each command are in the gcloud references https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/violations/list, https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/violations/describe and https://docs.cloud.google.com/sdk/gcloud/reference/assured/workloads/violations/acknowledge (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/assured-workloads/docs/monitor-folder (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [migrate-workload.md](./migrate-workload.md)
- [control-packages.md](./control-packages.md)
