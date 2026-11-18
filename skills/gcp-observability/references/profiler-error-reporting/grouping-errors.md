---
source: https://docs.cloud.google.com/error-reporting/docs/grouping-errors
---

# How Error Reporting groups error events

Error Reporting aggregates application error events into error groups based on their root cause. Events come from the Error Reporting API or are inferred by scanning log entries for stack traces and common error patterns.

## Signature / Usage

### Grouping rules

Rules are applied in this order:

| Error event | Grouped by |
|---|---|
| Error events caused by a general problem in the environment (App Engine: `com.google.apphosting.runtime.HardDeadlineExceededError`, `com.google.appengine.api.datastore.DatastoreTimeoutException`; Java: `java.util.concurrent.CancellationException`) | Exception type |
| Error events with a stack trace (nested exceptions: the innermost exception is considered) | Exception type and the five topmost frames |
| Error events without a stack trace but with a message | Message and (if present) function name; only the first three literal tokens of the message are considered |

Example of an event with a stack trace (grouped by exception type and the five topmost frames):

```text
runtime error: index out of range
package1.func1() file1:20
package2.func2() file2:33
```

## Options / Props

### Conditions for analyzing log entries

| Condition |
|---|
| Assured Workloads are disabled |
| Customer-managed encryption keys (CMEK) are disabled on all log buckets that store the log entry (Error Reporting can't store log entries in CMEK-enabled buckets) |
| The log bucket is stored in the project where the log entries originated, or the entries were routed to a project that stored them in a log bucket it owns |

### Sampling and ignored data

| Item | Behavior |
|---|---|
| Sampling | Samples up to 1,000 errors per hour, estimating counts when the threshold is reached |
| Over capacity | Samples up to 100 errors per hour and continues to extrapolate displayed counts |
| Ignored | App Engine standard environment log entries with severity lower than `ERROR`; stack frames not owned by the user (such as public libraries) |
| Pre-processing | Repeating sequences of stack frames are replaced with a single occurrence; compiler-introduced methods and symbols are removed |

## Notes

- Conditions for analyzing log entries: Error Reporting is a global service built on Cloud Logging and can analyze log entries when all of the conditions in the table above are true.
- Data regionality: if you set up Assured Workloads for data residency or Impact Level 4 (IL4) requirements, Google Cloud automatically disables Error Reporting.
- The **Error Groups** page organizes groups by the region of the log bucket containing the entries (for example `us-central1`; global groups come only from log buckets in the `global` region). The **Region** menu defaults to `global`. Because Error Reporting is a global service, error groups can be accessed from any region; this isn't configurable.
- Cloud Logging is the log backend here; bucket CMEK and routing are configured in Cloud Logging (see the Cloud Logging pages of this skill).
- The source's stack-trace example is an unfenced block inside a table cell; it is shown here as a text block.
- Source: https://docs.cloud.google.com/error-reporting/docs/grouping-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [formatting-error-messages.md](./formatting-error-messages.md)
- [view-and-manage-errors.md](./view-and-manage-errors.md)
