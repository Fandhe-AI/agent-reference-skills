---
source: https://docs.cloud.google.com/stackdriver/docs/deprecations/mql
---

# Monitoring Query Language (MQL) deprecation notice

As of October 22, 2024, Monitoring Query Language (MQL) is no longer a recommended query language for Cloud Monitoring. MQL is not shut down: you can still create and run MQL queries, and charts, dashboards and alerting policies that use MQL continue to work. Google recommends moving to PromQL.

## Signature / Usage

Recommended replacement: PromQL (query shown is taken from https://docs.cloud.google.com/monitoring/promql):

```text
logging_googleapis_com:byte_count{monitored_resource="k8s_container"}
```

## Options / Props

### Key dates

| Date | Change |
|---|---|
| October 22, 2024 | MQL is no longer a recommended query language. Inline autocompletion in the MQL code editor was turned off (metric names, resource names, functions, operators, syntactic elements, label keys and values, project IDs). Conversion of queries between the Metrics Explorer query builder and MQL was turned off. |
| July 22, 2025 | Google Cloud customer support for cases involving writing valid MQL ended. MQL charts, dashboards and alerting policies can no longer be created in the Google Cloud console; they can still be created with the Cloud Monitoring API. |

### MQL actions by interface

| Action | Google Cloud console | Monitoring API |
|---|---|---|
| Execute MQL queries in Metrics Explorer | Yes | Yes |
| Save charts from an MQL query in Metrics Explorer to a dashboard | No | Yes |
| Edit existing MQL charts, dashboards or alerting policies | Yes | Yes |
| Create new MQL charts, dashboards or alerting policies | No | Yes |

## Notes

- No action is required to keep using existing MQL assets. Google recommends PromQL or the interactive query builder for dashboards, alerting policies and other workflows; PromQL offers similar functionality to MQL with a wider user base and more community resources.
- The twin has no code samples. Snippet taken from https://docs.cloud.google.com/monitoring/promql.
- Source: https://docs.cloud.google.com/stackdriver/docs/deprecations/mql (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [mql.md](./mql.md)
- [promql.md](./promql.md)
