---
source: https://docs.cloud.google.com/monitoring/mql
---

# Monitoring Query Language (MQL) overview (end of support)

Monitoring Query Language (MQL) is a text-based, pipe-based interface to Cloud Monitoring time-series data. On July 22, 2025, Google Cloud customer support for MQL ended and MQL is no longer available in the Google Cloud console when you create charts, dashboards and alerting policies. Existing MQL charts, dashboards and alerting policies continue to work, and you can still create them by using the Cloud Monitoring API. Use PromQL for new work.

## Signature / Usage

MQL links operations with the pipe mechanism: the output of one operation is the input of the next. The twin has no MQL example. The recommended replacement is a PromQL query such as this one (taken from the PromQL page):

```text
logging_googleapis_com:byte_count{monitored_resource="k8s_container"}
```

Typical reasons given for MQL: ratios of requests by response-code class, ratio of current to past values, arbitrary percentile values, a random sample of time series, arbitrary arithmetic over several metric types, new labels built with string manipulation and regular-expression sub-field capture, and control over the output time range and period.

## Notes

- MQL is deprecated: do not present it as a current query language. See the end-of-support notice for the dates.
- No new MQL charts, dashboards or alerting policies can be created in the Google Cloud console; the Cloud Monitoring API still can. Editing existing ones in the console still works.
- The twin contains no code samples. Snippet taken from https://docs.cloud.google.com/monitoring/promql. The MQL code editor, API usage, examples and the language reference are separate pages not covered here.
- Source: https://docs.cloud.google.com/monitoring/mql (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [mql-end-of-support.md](./mql-end-of-support.md)
- [promql.md](./promql.md)
