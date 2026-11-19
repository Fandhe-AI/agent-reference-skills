---
source: https://docs.cloud.google.com/workload-manager/docs/overview
---

# Workload Manager overview

Workload Manager helps you manage and optimize workloads that run on Google Cloud by automating configuration checks, simplifying deployment, and enhancing system visibility. Its key features are evaluation, guided deployment automation, and observability.

## Signature / Usage

Workload Manager is driven from the Google Cloud console and the REST API (`workloadmanager.googleapis.com`, `workloadmanager.v1`). The page itself has no code; the following request lists the rules available for an evaluation type.

```bash
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "X-Goog-User-Project: CONSUMER_PROJECT_ID" \
    "https://workloadmanager.googleapis.com/v1/projects/CONSUMER_PROJECT_ID/locations/LOCATION_ID/rules?evaluationType=EVALUATION_TYPE"
```

## Options / Props

| Feature | Description |
|---------|-------------|
| Evaluation | Rule-based validation service that scans workloads running on Google Cloud for deviations from standards, rules, and best practices to improve system quality, reliability, and performance. |
| Guided deployment automation | Lets you quickly customize and deploy workloads on Google Cloud without having to configure the infrastructure. The overview page states that it supports deploying SAP S/4HANA and SQL Server workloads. |
| Observability | Improves issue detection, root cause analysis, and troubleshooting of SAP workloads on Google Cloud by combining metrics from SAP applications, databases, and the underlying infrastructure into a unified view. |

## Notes

- The "Guided deployment automation" page (`deployment-overview.md`) also lists Oracle Database as a supported workload; this overview names only SAP S/4HANA and SQL Server.
- gcloud 593.0.0 has a `workload-manager` command group only on the `alpha` track (`gcloud alpha workload-manager evaluations` and `rules`); there is no GA or `beta` group. This category uses the console and the REST API.
- VPC Service Controls itself is covered by `gcp-security`; Cloud Build private pools by this skill's Cloud Build pages.
- The source also shows a video.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/evaluate/create-evaluation
- Source: https://docs.cloud.google.com/workload-manager/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-evaluations.md](./about-evaluations.md)
- [deployment-overview.md](./deployment-overview.md)
- [sap-observability-overview.md](./sap-observability-overview.md)
