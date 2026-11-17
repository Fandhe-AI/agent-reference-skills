---
source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/privileged-access
---

# Privileged access at Google Cloud

Explains why Google personnel may request access to Customer Data (most commonly to resolve a support ticket), what privileged access is, and the principles that limit it. Access Transparency exists to give visibility into these accesses.

## Signature / Usage

Each privileged access carries its business justification; Access Transparency logs record it in the `reason` field (excerpt of the source's sample log entry):

```text
  reason: [
    detail:  "Case number: bar123"
    type:  "CUSTOMER_INITIATED_SUPPORT"
  ]
```

## Options / Props

### Foundational principles

| Principle | Meaning |
|---|---|
| Least privilege | Access to Customer Data is denied by default for all Google personnel; when granted it is temporary and no greater than necessary to provide the contracted service. |
| Limit singular access to data | Singularly accessing Customer Data without another individual involved is extremely difficult for any Google personnel. |
| All access must be justified | Personnel can access data only with an active, valid business justification; not for closed justifications or where the person is not a directly linked collaborator. |
| Monitor and alerting | Monitoring and response processes identify, triage, and remediate violations of these principles. |

## Notes

- Privileged access is Google personnel's access to your data to fulfil an obligation of providing a contracted service, acting as a privileged administrator. Access to your data is usually because you are accessing your own data or a service you use is accessing it on your behalf.
- Google provides various controls for data privacy regardless of whether Access Transparency is enabled on an organization (see the Google infrastructure security design overview).
- Valid business justifications are the justification reason codes in the reading-logs page.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs (the `reason` lines of the sample Access Transparency log entry).
- Google Cloud products regularly undergo independent third-party audits and certifications.
- Source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/privileged-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [administrative-access.md](./administrative-access.md)
- [reading-logs.md](./reading-logs.md)
- [access-transparency-overview.md](./access-transparency-overview.md)
