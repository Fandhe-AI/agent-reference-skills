---
source: https://docs.cloud.google.com/service-health/docs/incident-lifecycle
---

# Incident lifecycle

How Google Cloud Support and product engineering teams work together to resolve an incident and keep you updated: detection, initial response, investigation, mitigation and fix, follow up, retrospective, incident report.

## Signature / Usage

### Where the incident report ID is returned

```text
"artifact": "projects/PROJECT_ID/locations/global/artifacts/ARTIFACT_ID",
```

## Options / Props

### Phases

| Phase | What happens |
|---|---|
| Detection | Google Cloud uses internal and synthetic monitoring to detect incidents. |
| Initial response | The Google Cloud Service Health team manages customer communications. Initial notification is often sparse (frequently only the product), because fast notification is prioritized over detail; detail follows in later updates. Different channels are used depending on scope and severity. |
| Investigate | Product engineering teams investigate the root cause. Incident management is often done by Site Reliability Engineers but might be done by software engineers or others. |
| Mitigation and fix | An issue is fixed only when changes make Google confident the impact ends indefinitely (for example rolling back a change). Mitigation reduces impact or scope (for example temporarily adding resources to an overloaded product). If no mitigation exists, workarounds are communicated when possible. |
| Follow up | Regular updates: more information (error messages, zones or regions, features, percentages), progress toward mitigation and workarounds, timelines for communication, and status changes. |
| Retrospective | Every incident gets an internal retrospective; improvements are tracked and implemented. |
| Incident report | For very wide and serious impact, Google provides a report on symptoms, impact, root cause, remediation and future prevention. |

## Notes

- The twin has no code block; the line above is the `artifact` field described in `get-incident-reports.md` (Snippet taken from https://docs.cloud.google.com/service-health/docs/get-incident-reports).
- The source references the SRE book chapters on monitoring distributed systems (6), effective troubleshooting (12) and postmortem culture (15).
- Source: https://docs.cloud.google.com/service-health/docs/incident-lifecycle (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-incident-reports.md](./get-incident-reports.md)
- [concepts.md](./concepts.md)
- [overview.md](./overview.md)
