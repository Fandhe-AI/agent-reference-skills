---
source: https://docs.cloud.google.com/support/docs/best-practices
---

# Support Case Best Practices and Privacy

How to write effective Customer Care cases, set priority, escalate, report outages, networking, and console issues, and how to protect sensitive data when working with support.

## Signature / Usage

Template for describing an issue (fields Customer Care needs):

```
Start time (ISO 8601 format): 2017-05-12 at 11:03:43

End time (ISO 8601 format): The issue is still happening as of the time of this
report.

Issue summary:

`/cron/payments-service/sync-v2-batch` cron using the App Engine Task Queue API
has stopped running since 2017-05-12 at 11:03:43. We rely on this job to handle
payments correctly.

We saw datastore and queue errors and then the cron stopped running. We
attempted unsuccessfully to fix the issue by re-uploading cron.xml. Here is the
error trace:

`[error trace]`

Please advise if the issue is with the API or our implementation and let us
know next steps.
```

Time format examples: `Starting at 2017-09-08T15:13:06+00:00 and ending 5 minutes later`, `Ongoing since 2017-09-08T15:13:06+00:00`, `From 2017-09-08T15:13:06+00:00 to 2017-09-08T15:18:16+00:00`. Route to a time zone by writing `Please route this case to the Pacific time zone (GMT-8)` in the description or a reply.

## Options / Props

Details to include:

| Field | Guidance |
|-------|----------|
| Time | ISO 8601 timestamps, start and duration; avoid relative or ambiguous dates ("yesterday", "9/8") |
| Product | The specific feature, API, or console URL, and the mechanism (REST API, gcloud, console, Deployment Manager); give exact commands |
| Location | Region and zone; deployments roll out per region or zone |
| Identifiers | Project or application ID (project names are not helpful), every affected ID, instance IDs, BigQuery job IDs or table names, IP addresses with context |
| Artifacts | Screenshots, browser trace, tcpdump output, log snippets, stack traces; use PNG, TXT, or PDF |
| Problem type | Intermittent (random; check thresholds, run scheduled checks), transient (momentary; often ignorable), consistent (reproducible; give repro steps) |

P1 handling: explain why P1; an expert is alerted immediately and a Google Meet call is expected to be joined within 15-30 minutes (provide a bridge link if Meet is not usable); P1 follows the sun by default and can be locked to a region; P2-P4 can be raised to P1 when production is affected. If you are unresponsive for more than 3 hours on a P1, the priority may be reduced to P2. Cases marked P1 with no production impact may be re-evaluated.

Scenario guidance: production outage (create the case quickly with time, product, identifiers, location; designate an incident commander, usually the case opener); networking (give endpoints by IP or RFC 1918 address plus network, packet flow diagram, path analysis such as traceroute/MTR, simultaneous packet captures at both endpoints with tcpdump or Wireshark); console issue (impacted URLs, project IDs, number of impacted users, other machines, browsers, extensions or firewalls, browser trace).

Privacy: remove sensitive data (credit card numbers, passwords, health information, government IDs) from cases; ask the agent to remove accidentally shared content; screen HAR files with the HAR Analyzer; if sharing through the case is not feasible, host a file in a Cloud Storage bucket and grant `roles/storage.objectViewer` at bucket level to a per-case service account (instructions arrive by email).

## Notes

- Create one case per issue; duplicates are closed. Check known issues first. Keep long-running issues organized with the Long-running issue template and avoid reopening a case for a new issue.
- Escalate only for increased business impact or a broken resolution process; otherwise raise the priority and wait. Escalating right after a priority change can slow resolution.
- Customer Effort Score (CES) surveys are sent when a case resolves; scores of 3 or lower are considered difficult.
- Support subprocessors have no default access to Customer Data; it is accessible only if you elect to share it in a case. Subprocessor access is logged and audited. Case deletion can be requested but certain information may be retained for billing or legal reasons; copies of call recordings, chat transcripts, and emails can be requested through a standard support case. Resold customers can use the reseller and may enable case sharing for visibility. Access Transparency logs show Google personnel access; support access appears with justification `CUSTOMER_INITIATED_SUPPORT`.
- Source: https://docs.cloud.google.com/support/docs/best-practices, https://docs.cloud.google.com/support/docs/privacy-best-practices (retrieved 2026-11-14; CC BY 4.0)

## Related

- [support-cases.md](./support-cases.md)
- [access-control-audit.md](./access-control-audit.md)
- [../support-plans/customer-care-plans.md](../support-plans/customer-care-plans.md)
