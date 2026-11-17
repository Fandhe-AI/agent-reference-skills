---
source: https://docs.cloud.google.com/audit-manager/docs/overview
---

# Audit Manager overview

Audit Manager is a compliance audit solution on Google Cloud. It runs audits against built-in frameworks and against custom frameworks defined with Compliance Manager or Assured Workloads frameworks (Preview), for any Google Cloud organization, folder, or project. It also offers downloadable Google Cloud compliance documents (third-party audit reports, certifications, BCP / DiRT reports, and similar).

## Signature / Usage

### Workflow

1. Set up access: an Audit Manager Admin (`roles/auditmanager.admin`) enrolls resources for audit.
2. Manage audits: an administrator or auditor schedules audits and runs on-demand audits, gets audit status, and views detailed Audit Manager reports.

### Enroll a resource (first step of the workflow)

```bash
gcloud audit-manager enrollments add \
    --RESOURCE_TYPE=RESOURCE_ID \
    --eligible-gcs-buckets=BUCKET_URI
```

### Download Google Cloud compliance documents

Audit Manager lets you download the most recent Google Cloud compliance documents that third-party auditors create when they audit Google's environment: the business continuity plan (BCP), disaster recovery testing (DiRT) report, audit reports, certifications, statements of applicability, and vendor risk assessments. Examples listed in the source:

- Cloud Computing Compliance Criteria Catalogue (C5:2020)
- Cloud Security Alliance (CSA) Security, Trust, Assurance, and Risk (STAR) Registry
- Federal Risk and Authorization Management Program (FedRAMP) Customer Responsibility Matrix (CRM)
- FedRAMP 20x Class B (Low)
- Information Security Registered Assessors Program (IRAP), Protected level
- ISO/IEC 27001:2022 and 27018:2019
- Portugal Gabinete Nacional de Segurança (GNS)
- Spain Esquema Nacional de Seguridad (ENS)

The required role is Audit Manager Auditor (`roles/auditmanager.auditor`) on the organization. In the Google Cloud console, go to **Audit Manager**, click **Compliance Reports**, select the documents, and click **Downloads**. Audit Manager downloads a ZIP file that typically contains one or more PDFs.

## Options / Props

### Supported frameworks: always available

| Framework | Notes |
|---|---|
| Security Essentials | GA if the audit runs at the organization level (footnote 1) |
| SOC2 2017 | — |

### Supported frameworks: with Security Command Center Premium or Enterprise subscriptions, or Assured Workloads enabled

| Framework | Notes |
|---|---|
| Custom frameworks created with Compliance Manager or Assured Workloads frameworks (Preview) | — |
| Google Recommended AI Essentials - Gemini Enterprise Agent Platform | GA if the audit runs at the organization level (footnote 1) |
| CIS GCP Foundations Benchmark v3.0 | — |
| CIS GKE 1.7 | GA if the audit runs at the organization level (footnote 1) |
| CIS Critical Security Controls v8 | — |
| CSA Cloud Controls Matrix v4.0.11 | — |
| Compute Engine Security Essentials | GA if the audit runs at the organization level (footnote 1) |
| GKE Essentials | GA if the audit runs at the organization level (footnote 1) |
| ISO 27001:2022 | — |
| Qatar National Information Assurance Standard v2.1 | — |
| NIST 800-53 Revision 5 | — |
| NIST Cybersecurity Framework 1.1 | — |
| PCI DSS v4.0.1 | — |
| Built-in Assured Workloads frameworks: EU Data Boundary, Switzerland Data Boundary, UK Data Boundary, US Data Boundary | — |

### Migrating from older frameworks (audits run before June 30, 2026)

| Older framework | Equivalent Audit Manager framework | Equivalent Compliance Manager framework | Equivalent Assured Workloads frameworks (Preview) |
|---|---|---|---|
| NIST 800-53 Revision 4 | — | NIST 800-53 Revision 5 | NIST 800-53 Revision 5 |
| Google-recommended AI controls | — | — (footnote 2) | — (footnote 2) |
| SOC2 2017 | SOC2 2017 | SOC2 2017 | SOC2 2017 |
| CIS Controls v8 | — | CIS Critical Security Controls v8 | CIS Critical Security Controls v8 |
| PCI DSS 4.0 | — | PCI DSS v4.0.1 | PCI DSS v4.0.1 |
| Cloud Controls Matrix 4.0 | — | CSA Cloud Controls Matrix v4.0.11 | CSA Cloud Controls Matrix v4.0.11 |
| NIST CSF v1 | — | NIST Cybersecurity Framework 1.1 | NIST Cybersecurity Framework 1.1 |
| CIS Google Cloud Foundation Benchmark 2.0 | — | CIS GCP Foundations Benchmark v3.0 | CIS GCP Foundations Benchmark v3.0 |
| ISO 27001 2022 | — | ISO 27001:2022 | ISO 27001:2022 |

### Control and cloud control states

| State | Meaning |
|---|---|
| Compliance | Audit Manager evaluates the evidence as meeting the rule |
| Violation | Evidence fails the rule; for controls or cloud controls with multiple rules, if any rule fails the state is *failed* |
| Skipped | Audit Manager hit an error during evaluation (for example, an API call timed out) |
| Optional: Manual Review Needed | No API call can validate the control; Audit Manager creates an observation telling you to complete the review yourself (technical evidence might still be generated) |

## Notes

- Replace `--RESOURCE_TYPE=RESOURCE_ID` with `--organization=ORGANIZATION_ID`, `--folder=FOLDER_ID` or `--project=PROJECT_ID` (the gcloud help for this command lists these flags); the placeholder form is the official docs' notation.
- Terms: *controls* are general objectives (technical and non-technical) for assessing asset protection, risk mitigation, and regulatory objectives; *cloud controls* are software-defined checks for particular configurations (most are technical); *frameworks* are collections of controls and cloud controls for a regulatory standard. Technical controls and cloud controls include one or more rules that Audit Manager checks and collects evidence for. The value returned by an API call is the *evidence*; an *observation* includes the evidence and the evaluation.
- Footnote 1 (verbatim): "If you run an audit at the organization level, these frameworks are available in General Availability. All other frameworks are available in Preview."
- Footnote 2: Both Compliance Manager and Assured Workloads frameworks (Preview) include the Google Recommended AI Essentials - Gemini Enterprise Agent Platform built-in framework. It can replace the older Google-recommended AI controls framework, though it uses different controls to evaluate the environment.
- The older frameworks in the migration table are no longer available for running audits. Reports from audits run with them remain visible on the **View assessments** page and in the Cloud Storage buckets where they were stored.
- Custom frameworks: before June 30, 2026, Audit Manager had a preview feature for creating custom frameworks. You can continue to run audits against, and view reports for, custom frameworks created with it, but you can't view or edit those frameworks. Otherwise create a custom framework in Compliance Manager (then run audits with Audit Manager or Compliance Manager) or in Assured Workloads frameworks (Preview). If a framework includes preventive controls, you can only use Audit Manager to run audits.
- Some controls need manual review (for example, access systems outside Google Cloud); others map to a value that Audit Manager can check with an API call (for example, CMEK on Cloud Storage buckets).
- Confidentiality: anything in the downloaded compliance documents marked *Google Confidential Information* is shared subject to the confidentiality obligations in the customer or partner agreements covering Cloud Services. Contact your sales representative for permission to share confidential resources outside your organization. Cloud Customer Care can supply older reports.
- Source: https://docs.cloud.google.com/audit-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/audit-manager/docs/download_compliance_documents (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0).
- Snippet taken from https://docs.cloud.google.com/audit-manager/docs/enroll-resource
- Console steps are condensed; see the source pages.
- Custom frameworks are created in Compliance Manager or Assured Workloads frameworks; see the Compliance Manager and Assured Workloads pages of this skill.

## Related

- [enable-audit-manager.md](./enable-audit-manager.md)
- [enroll-resource.md](./enroll-resource.md)
- [run-audit.md](./run-audit.md)
- [locations.md](./locations.md)
