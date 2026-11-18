---
source: https://docs.cloud.google.com/error-reporting/docs/formatting-error-messages
---

# Format log entries so Error Reporting captures errors

When you write log entries with Cloud Logging, the `LogEntry` must contain a stack trace or a formatted `ReportedErrorEvent` object for Error Reporting to capture and group it. This page covers the `textPayload` / `jsonPayload` fields (`message`, `stack_trace`, `exception`, `@type`) and supported monitored resources.

## Signature / Usage

### Log a text message

With `@type` set to the value below, Error Reporting evaluates the entry as though all required fields are present.

```text
{...
  {
    "jsonPayload": {
      "@type": "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent",
      "message": "A simple text message"
    },
    "logName": "projects/test-project/logs/reported-error",
    "resource": {
      "labels": {
        "project_id": "test-project"
      },
      "type": "global"
    },
    "severity": "ERROR",
    "timestamp": "2019-06-27T13:43:26.375834551Z"
  }
}
```

### Log a `ReportedErrorEvent` structure in `jsonPayload`

```text
{
  "eventTime": string,
  "serviceContext": {
    "service": string,     // Required.
    "version": string
  },
  "message": string,       // Required. This field contains the main error content to report.
  "@type": string,         // Optional. For information about this field, see Log a text message.
  "context": {
    "httpRequest": {
      "method": string,
      "url": string,
      "userAgent": string,
      "referrer": string,
      "responseStatusCode": number,
      "remoteIp": string
    },
    "user": string,
    "reportLocation": {    // Required if no stack trace is provided.
      "filePath": string,
      "lineNumber": number,
      "functionName": string
    }
  }
}
```

Example whose `message` contains a stack trace (grouped automatically):

```text
{...
   "jsonPayload": {
      "serviceContext": {
        "service": "frontend",
        "version": "bf6b5b09b9d3da92c7bf964ab1664fe751104517"
      },
      "message": "com.example.shop.Template$CartDiv retrieveCart: Error\njava.lang.IndexOutOfBoundsException: Index: 4, Size: 4\n\tat java.util.ArrayList.rangeCheck(ArrayList.java:635)\n\tat java.util.ArrayList.get(ArrayList.java:411)\n\tat com.example.shop.Cart.retrieve(Cart.java:76)\n\tat com.example.shop.Cart.generate(Cart.java:55)\n\tat com.example.shop.Template$CartDiv.retrieveCart(Template.java:113)\n\tat com.example.shop.Template.generate(Template.java:22)\n\tat com.example.shop.CartServlet.doGet(CartServlet.java:115)\n\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:717)\n",
      "context": {
        "httpRequest": {
          "method": "GET",
          "url": "http://example.com/shop/cart",
          "responseStatusCode": 500
        },
        "user": "9f32f587135aa6774e78ed30fbaabcce3ec5528f"
      }
   },
   "logName": "projects/test-project/logs/reported-error",
   "resource": {
      "labels": {
        "project_id": "test-project"
      },
      "type": "global"
   },
   "severity": "ERROR",
   "timestamp": "2019-06-27T13:43:26.375834551Z"
}
```

### Log an error event with `textPayload`

Results in a log entry with severity `ERROR` and the stack trace in `textPayload`:

Adapted (not in the official docs): the entry is written for a `gce_instance` resource with `--monitored-resource-type` and `--monitored-resource-labels`, because the default `global` resource does not support `textPayload` (see the table below).

```bash
gcloud logging write test-log --severity=ERROR --payload-type=text --monitored-resource-type=gce_instance --monitored-resource-labels=zone=ZONE,instance_id=INSTANCE_ID 'RuntimeException: Oops! Something bad happened.
at com.example.MyClass.method(MyClass.java:123)
at com.example.OtherClass.doStuff(Unknown Source)
at com.example.Sys.create(Native Method)'
```

The resulting entry (`logName` `projects/PROJECT_ID/logs/test-log`, `severity` `ERROR`, multi-line `textPayload`) is grouped by Error Reporting.

### Log name written by the Error Reporting API

Adapted (not in the official docs): added the missing `/logs/` segment to the log name.

```text
projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors
```

## Options / Props

### How a stack trace is logged

| Form | Behavior |
|---|---|
| Multi-line `textPayload` | Captured as a stack trace |
| `jsonPayload` with `message`, `stack_trace` or `exception` | If several are present, evaluation order is `stack_trace`, then `exception`, then `message`. If `message` is evaluated and not empty, the stack trace is captured only when it is in one of the supported programming-language formats |
| `jsonPayload` without those fields but containing a stack trace | Error Reporting searches all `jsonPayload` fields; if more than one stack trace is found, one is selected consistently |
| `@type` set to `type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent` | Always evaluated as if all required fields are present. If `@type` is a different value or unset, Cloud Logging looks for a `serviceContext` field to decide whether the payload is a `ReportedErrorEvent` |

### Supported monitored resource types (`LogEntry.resource`)

| Resource type | Note |
|---|---|
| `app_script_function` |  |
| `aws_ec2_instance` |  |
| `cloud_function` |  |
| `cloud_run_jobs` |  |
| `cloud_run_revision` |  |
| `consumed_api` |  |
| `container` |  |
| `dataflow_step` |  |
| `gae_app` |  |
| `gce_instance` |  |
| `k8s_container` |  |
| `k8s_pod` |  |
| `ml_job` | `textPayload` not supported |
| `workflows.googleapis.com/Workflow` |  |
| `global` | `textPayload` not supported |

## Notes

- How a stack trace is logged: No `@type` is needed when `message`, `stack_trace` or `exception` contains a stack trace.
- If you need API key authentication you must use the Error Reporting API method `report` (request body is a `ReportedErrorEvent`); the remainder of this page then doesn't apply. The API also writes log entries to the log shown above, which may incur Cloud Logging ingestion costs; control what is ingested with exclusion filters (excluded entries are not stored).
- Do not log credentials, tokens, session identifiers or personal data in `message`, `context.httpRequest.url`, `context.user` or `remoteIp`; log entries are readable by anyone with access to the log bucket. The source's example uses a hashed `user` value and a URL without a query string.
- The source's JSON blocks contain `{...`, `string` type placeholders and `//` comments, so they are fenced as `text`.
- The source's `gcloud logging write` block has no language tag; flags `--severity` and `--payload-type` verified in gcloud 593.0.0 help.
- Corrected from the official docs: the log name was written `projects/PROJECT_ID/clouderrorreporting.googleapis.com%2Freported_errors`, without the `/logs/` segment; the Logging API Discovery document defines `LogEntry.logName` as "projects/[PROJECT_ID]/logs/[LOG_ID]" with `[LOG_ID]` URL-encoded, so the name is `projects/PROJECT_ID/logs/clouderrorreporting.googleapis.com%2Freported_errors`.
- Source: https://docs.cloud.google.com/error-reporting/docs/formatting-error-messages (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source `gcloud logging write test-log --severity=ERROR --payload-type=text ...` sets no resource, so the entry is written for the default `global` resource (gcloud 593.0.0 help: `--monitored-resource-type` default `"global"`), for which the table lists `textPayload` as not supported; the example sets `gce_instance` with its `zone` and `instance_id` labels.

## Related

- [grouping-errors.md](./grouping-errors.md)
- [setup.md](./setup.md)
- [troubleshooting.md](./troubleshooting.md)
