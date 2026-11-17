---
source: https://docs.cloud.google.com/artifact-analysis/docs/severity-levels
---

# Severity levels in Artifact Analysis

Describes how Artifact Analysis evaluates vulnerabilities and assigns severity levels. Severity is a qualitative label reflecting exploitability, scope, impact and maturity; for example a vulnerability that lets a remote user run arbitrary code without authentication or user interaction is classified `Critical`.

## Signature / Usage

Output of `gcloud artifacts docker images list-vulnerabilities`, showing `cvssv3` and `effectiveSeverity`:

```text
vulnerability:
  cvssScore: 7.1
  cvssv3:
    attackComplexity: ATTACK_COMPLEXITY_LOW
    attackVector: ATTACK_VECTOR_NETWORK
    availabilityImpact: IMPACT_HIGH
    baseScore: 7.2
    confidentialityImpact: IMPACT_HIGH
    exploitabilityScore: 1.2
    impactScore: 5.9
    integrityImpact: IMPACT_HIGH
    privilegesRequired: PRIVILEGES_REQUIRED_HIGH
    scope: SCOPE_UNCHANGED
    userInteraction: USER_INTERACTION_NONE
  effectiveSeverity: MEDIUM
```

## Options / Props

### Severity levels

| Level |
|-------|
| Critical |
| High |
| Medium |
| Low |

### Additional severity types

| Type | Definition |
|------|------------|
| Effective severity (OS packages) | Severity assigned by the Linux distribution maintainer. If unavailable, the severity value from the note provider (NVD); if NVD's CVSS v2 rating is unavailable, the CVSS v3 rating from NVD |
| Effective severity (language packages) | Severity assigned by the GitHub Advisory Database, with *Moderate* reported as *Medium* |
| CVSS 2.0 score | Available using the API, the Google Cloud CLI and the GUI |
| CVSS 3.1 score | Available using the API and the gcloud CLI |

## Notes

- Malicious packages are reported as `CRITICAL` severity (see [container-scanning-overview.md](./container-scanning-overview.md)).
- Gate builds based on severity with On-Demand Scanning in Cloud Build: https://docs.cloud.google.com/artifact-analysis/docs/ods-cloudbuild.
- Snippet taken from https://docs.cloud.google.com/artifact-analysis/docs/scan-os-on-demand
- Source: https://docs.cloud.google.com/artifact-analysis/docs/severity-levels (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [investigate-vulnerabilities.md](./investigate-vulnerabilities.md)
- [container-scanning-overview.md](./container-scanning-overview.md)
- [scan-os-on-demand.md](./scan-os-on-demand.md)
