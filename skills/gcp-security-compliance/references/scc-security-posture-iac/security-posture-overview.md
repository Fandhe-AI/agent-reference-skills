---
source: https://docs.cloud.google.com/security-command-center/docs/security-posture-overview
---

# Security posture overview

The security posture service in Security Command Center (SCC) lets you define, deploy and monitor the security status of Google Cloud assets (cloud network and cloud services). A posture is made of policy sets of preventative and detective policies; you deploy it to an organization, folder or project and SCC reports drift from it as findings. Available on the SCC Premium tier and the Enterprise (Deprecated) tier, with organization-level activation only. The service is enabled automatically when you activate SCC at the organization level.

## Signature / Usage

### Inspect a predefined posture template

```bash
gcloud scc posture-templates describe \
    organizations/ORGANIZATION_ID/locations/global/postureTemplates/POSTURE_TEMPLATE \
    --revision-id=REVISION_ID
```

If `--revision-id` is omitted, the latest version of the template is shown.

### Service components

| Component | Meaning |
|---|---|
| Posture | One or more policy sets that enforce the preventative and detective controls your organization needs. Can be deployed at organization, folder or project level. |
| Policy set | A set of security requirements and associated controls; typically all policies needed for one security standard or compliance regulation. |
| Policy | A constraint or restriction that controls or monitors resource behavior. Preventative (Organization Policy constraints, including custom constraints) or detective (Security Health Analytics detectors, including custom modules). |
| Posture deployment | Applies a posture to the organization, folders or projects you want to manage. |

### Deployment and drift

- You can deploy only one posture to each organization, folder or project.
- Postures are inherited by child folders and projects. If posture policy definitions differ (for example Allow at organization level, Deny at project level), the lower-level posture is used by resources in that project.
- Best practice from the source: deploy at organization level the policies that apply to the whole business, then apply stricter policies to folders or projects that need them. Example: use a posture to set `constraints/gcp.restrictCmekCryptoKeyProjects` on the `common` folder and the environment folders (`development`, `nonproduction`, `production`) so projects only use keys from the key projects (for example `prj-c-kms`).
- Drift is reported as SCC findings that you can review, filter, resolve and export like any other findings.

### AI and AWS integration

- AI: predefined AI-specific templates, plus a pane on the **Overview** page that shows vulnerabilities found by Security Health Analytics custom modules that apply to AI and drift from the Gemini Enterprise Agent Platform organization policies defined in a posture.
- AWS: if SCC Enterprise is connected to AWS for configuration and resource data collection, Security Health Analytics has built-in AWS detectors. A posture file that includes AWS-specific detectors must be deployed at the organization level.

## Options / Props

### Predefined posture templates

| Template name | Description |
|---|---|
| `secure_by_default_essential` | Secure by default, essentials. Prevents common misconfigurations and issues caused by default settings. Deployable without changes. |
| `secure_by_default_extended` | Secure by default, extended. Same goals; must be customized to your environment before deployment. |
| `secure_ai_essential` | Secure AI recommendations, essentials. Helps secure Gemini and Gemini Enterprise Agent Platform workloads. Deployable without changes. |
| `secure_ai_extended` | Secure AI recommendations, extended. Must be customized before deployment. |
| `big_query_essential` | BigQuery recommendations, essentials. Deployable without changes. |
| `cloud_storage_essential` | Cloud Storage recommendations, essentials. Deployable without changes. |
| `cloud_storage_extended` | Cloud Storage recommendations, extended. Must be customized before deployment. |
| `vpc_networking_essential` | VPC recommendations, essentials. Deployable without changes. |
| `vpc_networking_extended` | VPC recommendations, extended. Must be customized before deployment. |
| `cis_2_0` | CIS Google Cloud Computing Platform Benchmark v2.0.0; detects misalignment. Deployable without changes. |
| `nist_800_53` | NIST SP 800-53; detects misalignment. Deployable without changes. |
| `iso_27001` | ISO 27001; detects misalignment. Deployable without changes. |
| `pci_dss_v_3_2_1` | PCI DSS version 3.2.1 and version 1.0; detects misalignment. Deployable without changes. |

### Service limits

| Limit | Value |
|---|---|
| Postures per organization | 100 |
| Policies per posture | 400 |
| Posture deployments per organization | 1000 |

## Notes

- The SCC Enterprise service tier will shut down on May 21, 2027. Organizations using it automatically move to the Premium service tier on or after May 21, 2027.
- The service is available only with SCC Premium or Enterprise (Deprecated) and organization-level activation (not with project-level activation).
- The source also shows a components diagram that is not reproduced here.
- Source: https://docs.cloud.google.com/security-command-center/docs/security-posture-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-security-posture (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-to-use-security-posture.md](./how-to-use-security-posture.md)
- [security-posture-essentials-secure-default-template.md](./security-posture-essentials-secure-default-template.md)
- [validate-iac.md](./validate-iac.md)
