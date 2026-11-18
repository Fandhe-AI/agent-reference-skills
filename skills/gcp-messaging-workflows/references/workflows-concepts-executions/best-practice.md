---
source: https://docs.cloud.google.com/workflows/docs/best-practice
---

# Workflows Best Practices

Recommended architectural practices for Workflows: communication patterns, avoiding hardcoded URLs, nested steps, expression quoting, memory use, connectors, parallel steps, retries and the saga pattern, callbacks, aligning timeouts and payload sizes, and usage cost optimization.

## Signature / Usage

### Pass URLs as runtime arguments

```yaml
main:
  params: [args]
  steps:
    - init:
        assign:
          - url1: ${args.urls.url1}
          - url2: ${args.urls.url2}
```

Adapted (not in the official docs): added `--location=LOCATION`, required unless the `workflows/location` property is set; the source tagged this command as yaml.

```bash
gcloud workflows run multi-env --location=LOCATION --data='{"urls":{"url1": "URL_ONE", "url2": "URL_TWO"}}'
```

### Use nested steps

A `steps` block groups steps so you can point to the right atomic step.

```yaml
main:
    params: [input]
    steps:
    - callWikipedia:
        steps:
        - checkSearchTermInInput:
            switch:
                - condition: ${"searchTerm" in input}
                  assign:
                    - searchTerm: ${input.searchTerm}
                  next: readWikipedia
        - getCurrentDate:
            call: http.get
            args:
                url: https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam
            result: currentDate
        - setFromCallResult:
            assign:
                - searchTerm: ${currentDate.body.dayOfWeek}
        - readWikipedia:
            call: http.get
            args:
                url: https://en.wikipedia.org/w/api.php
                query:
                    action: opensearch
                    search: ${searchTerm}
            result: wikiResult
    - returnOutput:
            return: ${wikiResult.body[1]}
```

### Wrap expressions

All expressions must begin with `$` and be enclosed in curly brackets. Wrap an expression in single quotes when it contains a colon, for example `'${"Name: " + myVar}'`. Expressions can span several lines, for example a SQL query for the BigQuery connector:

```yaml
- runQuery:
    call: googleapis.bigquery.v2.jobs.query
    args:
        projectId: ${sys.get_env("GOOGLE_CLOUD_PROJECT_ID")}
        body:
            useLegacySql: false
            useQueryCache: false
            timeoutMs: 30000
            # Find top 100 titles with most views on Wikipedia
            query: ${
                "SELECT TITLE, SUM(views)
                FROM `bigquery-samples.wikipedia_pageviews." + table + "`
                WHERE LENGTH(TITLE) > 10
                GROUP BY TITLE
                ORDER BY SUM(VIEWS) DESC
                LIMIT 100"
                }
    result: queryResult
```

### Free memory by clearing variables

Assign `null` (in YAML an empty value or `~` also works) to mark memory as reclaimable.

```yaml
  - step:
      assign:
        - bigVar:
```

### Count operations that are one step

Adapted (not in the official docs): wrapped the returned expression in `${...}` (without it the step returns the text as a literal string) and compared with the string `"integer"`, which is what `get_type()` returns.

```yaml
- type_check:
    return: ${if(get_type((int("6"))) == "integer", 1, 2)}
```

## Options / Props

### Limits to align across services

| Scenario | Workflows limits | Target service limits | Recommended pattern |
|----------|------------------|-----------------------|---------------------|
| Synchronous `http.get` / `http.post` / `http.request` to Cloud Run services or Cloud Run functions | 30-minute (1,800-second) maximum HTTP request timeout, default 300 seconds for `http.*` calls and 1,800 seconds for connector HTTP requests; 2 MB maximum HTTP response size before `ValueError`; 512 KB cumulative variable memory before `MemoryLimitExceededError` | 60-minute (3,600-second) maximum request timeout for Cloud Run services and Cloud Run functions (2nd gen), 9-minute (540-second) for 1st gen functions; 32 MB maximum HTTP/1.1 response size | For workloads over 30 minutes don't use synchronous `http.*` calls to a Cloud Run service: execute Cloud Run jobs with the Cloud Run Admin API connector, or use an asynchronous callback endpoint. Connector long-running operation polling times out after 30 minutes (1,800 seconds) by default; for jobs over 30 minutes set the Cloud Run job task timeout (10 minutes by default, up to 168 hours / 7 days) and `connector_params.timeout` (up to 1 year, `31536000` seconds) |
| BigQuery queries and large API payloads (`googleapis.bigquery.v2.jobs.query`, REST responses) | 512 KB cumulative variable memory (`MemoryLimitExceededError`); 256 KB maximum UTF-8 string length; 2 MB maximum HTTP response size (`ValueError`) | Results can exceed several megabytes or gigabytes | Avoid large result sets in variables: use `maxResults` pagination, write output to a table or Cloud Storage with `EXPORT DATA`, or offload filtering to a Cloud Run service or function and return a compact summary |

### What counts toward the maximum steps limit

| Counts as a step | Doesn't count |
|------------------|---------------|
| Assigning and returning values; jumps (`next`), switches, starting a `for` loop and each iteration; calls to `sys.get_env`, other standard library functions, another workflow or a connector; spawning threads and parallel execution; each `raise`, `try`, `retry` and `except` block counts as a separate step (a step with a `try` block containing a call counts as three; adding a `retry` adds three more, six in total) | Reading and writing lists, maps and variables (a step that contains the lookup, such as `assign`, still counts as one); `len()`, `int()`, `get_type()`; comparison and arithmetic operations; string concatenation; boolean operations |

### Optimize usage

| Guideline |
|-----------|
| Call Google Cloud services on `*.appspot.com`, `*.cloud.goog`, `*.cloudfunctions.net` or `*.run.app` instead of custom domains so you are billed for internal rather than external steps |
| Apply a custom retry policy balancing latency and reliability against cost |
| For long-running-operation connectors, set a custom polling policy (for example poll after one minute, then every 15 minutes for an operation expected to take over an hour) |
| Combine assignments into one step |
| Avoid excessive `sys.log` steps; consider call logging instead |

## Notes

- Limits to align across services: Memory-related errors named in the source: `ResourceLimitError`, `MemoryLimitExceededError`, `ResultSizeLimitExceededError`; timeout and size mismatches can raise `TimeoutError`, `ValueError`, `MemoryLimitExceededError`.
- Adapted from the official docs: the `gcloud workflows run multi-env` command gained `--location=LOCATION` (required unless the `workflows/location` property is set); the source tagged it as yaml.
- Choose among direct service-to-service, event-driven choreography and orchestration; patterns can be combined (an Eventarc-triggered orchestration, or a workflow publishing a Pub/Sub message).
- Runtime-argument URLs do not work when Eventarc triggers the workflow, because the only argument is the event payload. Other options in the source: user-defined environment variables, placeholder substitution at deploy time (Cloud Build or Terraform), or the Secret Manager connector for URLs.
- Prefer declarative calls (HTTP and connectors) for simple work; build services for reusable business logic, complex computation or transformations the standard library lacks.
- Subworkflows are local to one workflow definition; call other workflows through the Workflow Executions API and Workflows API connectors.
- Connectors handle request formatting, retries and long-running operations. Check for a connector before calling a Google Cloud API directly.
- Retries and sagas: use `raise`, `try/except` and `try/retry` with a maximum number of attempts; a saga runs compensating transactions when a transaction fails.
- Callbacks wait for another service's request to the callback endpoint without polling. Batch and Cloud Run jobs can run long workloads under Workflows; a containerized task on a Compute Engine VM can run for the maximum execution duration of one year.
- The source recommends call logging instead of many `sys.log` steps. Call log levels (`log-errors-only`, `log-all-calls`, `log-none`, `none`) are described in creating-updating-workflow.md and executing-workflow.md.
- Corrected from the official docs: the step-count example read `return: if(get_type((int("6"))) == integer, 1, 2)`, without the `${...}` wrapper that the source's "Wrap expressions" section requires and with a bare `integer` (a variable reference inside an expression); `get_type()` returns a string such as `integer` (https://docs.cloud.google.com/workflows/docs/reference/stdlib/expression-helpers).
- The BigQuery fragment uses a variable `table` that the source assigns nowhere; assign it in an earlier step before running the query.
- Environment variables are not recommended for secrets such as database credentials or API keys; store them separately from source code and environment variables, do not send them to logs, and read them with Secret Manager (https://docs.cloud.google.com/workflows/docs/use-secret-manager).
- Source: https://docs.cloud.google.com/workflows/docs/use-environment-variables (Managing secrets; retrieved 2026-11-18; CC BY 4.0)
- Omitted: Terraform and Cloud Build deployment examples (the source's Cloud Build step uses the `gcr.io` builder image) and the Cloud Build examples that run `gcloud` / `kubectl` from a workflow with caller-supplied command arguments. The source also shows the Terraform `google_workflows_workflow` resource.
- Source: https://docs.cloud.google.com/workflows/docs/best-practice (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [creating-updating-workflow.md](./creating-updating-workflow.md)
- [executing-workflow.md](./executing-workflow.md)
