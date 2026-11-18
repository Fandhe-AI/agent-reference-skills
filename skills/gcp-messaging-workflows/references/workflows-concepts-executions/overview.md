---
source: https://docs.cloud.google.com/workflows/docs/overview
---

# Workflows Overview

Workflows is a fully managed, serverless orchestration platform that executes services in an order that you define (a workflow). A workflow can combine custom services on Cloud Run or Cloud Run functions, Google Cloud services such as Vision AI and BigQuery, and any HTTP-based API. A workflow can hold state, retry, poll, or wait for up to a year.

## Signature / Usage

### Runtime arguments in the `main` block

The `main` block accepts a single argument that is any valid JSON data type; `params` names the variable that stores it.

```yaml
main:
  params: [args]
  steps:
    - init:
        assign:
          - url1: ${args.urls.url1}
          - url2: ${args.urls.url2}
```

## Options / Props

### Key use cases

| Use case | Description |
|----------|-------------|
| Service orchestration | Sequence of operations across multiple systems, waiting for all to complete; can be event-driven (for example send uploaded files to Vision AI then write tags into Firestore) |
| Batch jobs | Operations on a set of items or batch data; often scheduled (daily customer emails, BigQuery or ML jobs, reports) |
| Business processes | Line-of-business workflows with conditions, actions and human-in-the-loop events (order tracking, resource requests with approvals) |
| IT process automation | Scripted sequences of Google Cloud service operations (provision tenant projects, turn down resources on a schedule or event) |

### Core concepts

| Term | Meaning |
|------|---------|
| Definition | A series of steps in Workflows syntax, written in YAML or JSON |
| Deployed | A created workflow is deployed, which makes it ready for execution |
| Execution | A single run of the logic in a workflow definition; executions are independent and can run at high concurrency; a workflow that has not been executed generates no charges |

### Execution control

| Capability | Syntax |
|------------|--------|
| Steps | Ordered list executed one at a time; at least one step is required |
| Conditions | `switch` block |
| Iteration | `for` loop over numbers or a list or map |
| Parallel steps | `parallel` step (branches or loop run concurrently) |
| Subworkflows | Routine / function-like reusable steps |

### Triggering executions

| Method | Notes |
|--------|-------|
| Manual | Google Cloud console or gcloud CLI |
| Programmatic | Cloud Client Libraries or REST API (HTTP `POST` to the invocation URL) |
| Scheduled | Cloud Scheduler |
| Runtime arguments | `params` field of the `main` block |

### Connecting services

| Capability | Notes |
|------------|-------|
| HTTP APIs | HTTP and HTTPS requests; private endpoints through Service Directory's service registry; IAP-secured endpoints; VPC Service Controls service perimeter |
| Connectors | Built-in steps that call other Google Cloud APIs, handling request formatting |
| Standard library | Modules and functions, no import needed |
| Environment variables | Built-in (no declaration) and user-defined key/value string pairs set at deploy time |

## Notes

- Workflows is a regional service; workflows are regional resources subject to the resource locations constraint. A workflow deployed to a region is executed in that region only, but HTTP requests or connector calls it makes might not originate from the same region.
- Use Workflows to call services and handle results and to run simple tasks such as an HTTP call; create a service (Cloud Run or Cloud Run functions) for work too complex for Workflows, such as reusable business logic, complex computations or transformations not supported by expressions and the standard library.
- Callbacks let an execution wait for another service's request to the callback endpoint without polling; `sys.sleep` in a sleep step polls over an interval.
- Every workflow execution requires an authenticated call. Keys and passwords for external APIs are stored with the Secret Manager connector.
- Workflows generates execution logs in Cloud Logging; call logging and custom logs control when logs are sent. Audit logging is available through Cloud Audit Logs. Execution step history can be retrieved as a list of step entries.
- Distinct products: this is Google Cloud Workflows, not Cloudflare Workflows (`cloudflare-stateful`) or Inngest functions (`inngest`).
- Snippet taken from https://docs.cloud.google.com/workflows/docs/best-practice
- Source: https://docs.cloud.google.com/workflows/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-updating-workflow.md](./creating-updating-workflow.md)
- [executing-workflow.md](./executing-workflow.md)
- [best-practice.md](./best-practice.md)
