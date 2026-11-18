---
source: https://docs.cloud.google.com/monitoring/uptime-checks/introduction
---

# Uptime checks and synthetic monitors overview

Synthetic monitors and uptime checks in Cloud Monitoring test the availability, consistency and performance of services, applications, web pages and APIs. They periodically send simulated requests or run scripted tests, record the outcome and latency of each execution, and can drive an alerting policy that notifies you when a test fails. There are three approaches: uptime checks (HTTP, HTTPS or TCP, public or private endpoints), custom and Mocha-based synthetic monitors (Node.js tests deployed as a 2nd gen Cloud Run function), and broken-link checkers.

## Signature / Usage

### Create an uptime check or a synthetic monitor from the CLI

Both kinds are created with the same command; the first form probes a URL, the second points a synthetic monitor at an existing Cloud Run function.

```bash
gcloud monitoring uptime create DISPLAY_NAME \
--resource-labels=host=EXAMPLE.com,project_id=PROJECT_ID \
--resource-type=uptime-url
```

```bash
gcloud monitoring uptime create DISPLAY_NAME --synthetic-target=TARGET
```

## Options / Props

### Tools that can create each kind

| | Google Cloud console | Cloud Monitoring API | Terraform | Client libraries |
|---|---|---|---|---|
| Uptime checks | Y | Y | Y | Y |
| Synthetic monitors | Y | Y | Y | |
| Broken-link checkers | Y | Y | Y | |

### Limits

| Category | Value |
|---|---|
| Uptime checks per metrics scope (number of uptime-check configurations; each includes the interval between tests) | 100 |
| Maximum number of ICMP pings per public uptime check | 3 |
| Synthetic monitors per metrics scope | 100 (can be raised; see "Request a quota adjustment") |

### Behavior inside VPC Service Controls perimeters

| Kind | Behavior when the project is in an enabled perimeter |
|---|---|
| Private uptime checks | Can be created, modified, viewed and deleted |
| Public uptime checks and synthetic monitors | Cannot be created or modified; those that existed before the project joined the perimeter keep running and can be viewed and deleted |

## Notes

- Public uptime checks send requests from checkers in several Google Cloud regions to publicly available URLs or Google Cloud resources; private uptime checks send requests over a private network to internal IP addresses (for example a VM or an L4 internal load balancer).
- Each checker query is stateless. A request succeeds if the resource responds and the uptime-check configuration's requirements are met. Results are stored in `uptime_check` metrics (see the `monitoring` metrics table); on failure a log entry is written. With the console you can also configure a log entry on failure; public checks configured with ICMP pings write the ping results to Cloud Logging when the ping fails.
- Synthetic monitors deploy a 2nd gen Cloud Run function (built on Cloud Run). The function must be written in Node.js and rely on the open source Synthetics SDK framework (`GoogleCloudPlatform/synthetics-sdk-nodejs`), which Cloud Monitoring distributes and manages. Custom or Mocha-based monitors deploy a fully configurable single-purpose function; broken-link checkers take options (origin URI, number of links tested, number of retries) and deploy a preconfigured function.
- Per execution a synthetic monitor stores success / failure information (error message, error type, line of code), execution time, logs and metrics.
- Alerting: create an alerting policy from the console or gcloud. Creating it from the details page of a monitor or check preconfigures most fields.
- Troubleshooting aid: request headers and logged data include the ID of the associated synthetic monitor or uptime check.
- Data regionality: do not use synthetic monitors or uptime checks when Assured Workloads is set up because of data-residency or Impact Level 4 (IL4) requirements. Monitoring does not guarantee that uptime-check request data stays in a specific geographic location. For synthetic monitors you choose the Cloud Run function region, but the function can be invoked from any region supported by the uptime-check servers (not configurable).
- Pricing is on the Google Cloud Observability pricing page (not copied here).
- Snippet taken from https://docs.cloud.google.com/monitoring/uptime-checks (first block) and https://docs.cloud.google.com/monitoring/synthetic-monitors/create (second block); this page has no code of its own. `EXAMPLE.com` is the source's placeholder host.
- Google Cloud synthetic monitors run Mocha / Puppeteer scripts as Cloud Run functions; browser end-to-end testing is in the `playwright` skill. Cloud Run functions themselves are in `gcp-run`.
- Source: https://docs.cloud.google.com/monitoring/uptime-checks/introduction (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [uptime-checks.md](./uptime-checks.md)
- [uptime-check-pings-and-failures.md](./uptime-check-pings-and-failures.md)
- [synthetic-monitors-create.md](./synthetic-monitors-create.md)
- [synthetic-monitors-deploy.md](./synthetic-monitors-deploy.md)
- [synthetic-monitors-troubleshooting.md](./synthetic-monitors-troubleshooting.md)
