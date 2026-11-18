---
source: https://docs.cloud.google.com/monitoring/uptime-checks
---

# Create public uptime checks

Public uptime checks test the availability of publicly accessible URLs and Google Cloud resources by sending periodic HTTP, HTTPS or TCP requests from multiple locations around the world. Uptime checks do not load page assets or run JavaScript, and the default configuration does not include authentication. For HTTP and HTTPS, all redirects are followed and the final response is used to evaluate the success criteria; for HTTPS the SSL certificate expiry time is computed from the server certificate in the final response. A check succeeds when the HTTP status matches your criteria and the response either has no required content or contains it. For resources on a private network, use a private uptime check.

## Signature / Usage

### gcloud

The command shape from the source (replace the placeholders; `REQUIRED_FLAGS` selects the probed resource, `OPTIONAL_FLAGS` overrides defaults, and `--protocol` must be set when the protocol is not `http`):

```text
gcloud monitoring uptime create DISPLAY_NAME REQUIRED_FLAGS OPTIONAL_FLAGS --project=PROJECT_ID
```

Example that tests a URL:

```bash
gcloud monitoring uptime create DISPLAY_NAME \
--resource-labels=host=EXAMPLE.com,project_id=PROJECT_ID \
--resource-type=uptime-url
```

### REST

Call `projects.uptimeCheckConfigs.create` with `parent` (required, `projects/PROJECT_ID`) and an `UptimeCheckConfig` body. Leave `name` blank. For HTTP / HTTPS checks populate `HttpCheck`; set `requestMethod` to `GET` or `POST` (omitted or `METHOD_UNSPECIFIED` issues a `GET`). For `POST`, also complete `contentType`, optional `customContentType` and `body`.

```text
projects/PROJECT_ID
```

## Options / Props

### IAM roles to create uptime checks (on the project; for App Hub use the host or management project)

| User | Roles |
|---|---|
| Google Cloud console | Monitoring Editor (`roles/monitoring.editor`) |
| API | Monitoring Uptime Check Configurations Editor (`roles/monitoring.uptimeCheckConfigEditor`), Monitoring AlertPolicy Editor (`roles/monitoring.alertPolicyEditor`), Monitoring NotificationChannel Editor (`roles/monitoring.notificationChannelEditor`) |
| Cloud Run service targets (additional) | `run.routes.invoke` permission on that service |

### Monitored resources of public checks

| Resource |
|---|
| Uptime check URL |
| VM instance |
| App Engine application |
| Kubernetes service |
| Amazon EC2 instance |
| Cloud Run Revision |

### Checker regions (at least three checkers required)

| Region | Checkers |
|---|---|
| `USA` | 3 (`USA_OREGON`, `USA_IOWA`, `USA_VIRGINIA`; each `USA_*` region has one) |
| `EUROPE`, `SOUTH_AMERICA`, `ASIA_PACIFIC` | 1 each |
| Console **Global** / API `REGION_UNSPECIFIED` | All uptime-check regions (default) |

### Console target options

| Field | Description |
|---|---|
| Protocol | HTTP, HTTPS or TCP |
| Resource type | URL (IPv4 address or hostname), Kubernetes LoadBalancer Service, Cloud Run Service, App Engine, Instance (Compute Engine or AWS EC2), Elastic Load Balancer (AWS). Do not select Internal IP |
| Path | HTTP / HTTPS; blank or `/` sends the request to `http://target/` |
| Check frequency | Optional |
| ICMP Pings | Up to three; see ping page |
| Request Method | HTTP checks |
| Body | HTTP POST; URL-encoded, you do the encoding; leave empty otherwise |
| Host header | For virtual hosts; not available for TCP |
| Port | Port number |
| Custom Headers | Optional encryption hides the values in the form |
| Authentication | Sent as an Authorization header; not available for TCP. Basic Authentication (username and password, password always hidden) or Service Agent Authentication (identity token for the monitoring service agent; HTTPS only) |
| SSL Certificate Validation | On by default for HTTPS URL resources; fails on expired, self-signed, domain-mismatched or AIA-extension certificates; a revoked certificate is not invalid |

### Console response requirements

| Setting | Description |
|---|---|
| Response Timeout | Check fails when no response is received from more than one location in this period. Use 30 seconds or more for redirect URLs |
| Content matching | Match type (for example Contains) plus response content, a string of at most 1024 bytes (`ContentMatcher` in the API). Enable it for TCP |
| Log check failures | Clear to stop creating log entries |
| Acceptable response codes | HTTP; by default any `2xx` is success |
| Alert Duration | Default: notify when at least two regions report failures for at least one minute |
| User labels | Key starts with a lowercase letter; keys and values use lowercase letters, numerals, underscores and dashes |

## Notes

- Do not set the Authentication fields and also send an Authorization header: an `Invalid Argument` error occurs.
- Basic-auth passwords, custom headers and identity tokens are stored in the uptime-check configuration; if you pass them on the command line or from a file they land in shell history or the file system, so use placeholders in examples and restrict file permissions. A public endpoint is exposed by design; allow the uptime-check server IP addresses if the resource is behind a firewall.
- In gcloud the `--resource-type` value is `uptime-url`, not `uptime_url`; the CLI does not follow Cloud Monitoring's naming (see the `gcloud monitoring uptime create` reference for valid values). The Terraform and client-library samples use `uptime_url`.
- Create checks against direct URLs when possible. Use the metric `monitoring.googleapis.com/uptime_check/time_until_ssl_cert_expires` for certificate-expiry alerts.
- Results can take up to 5 minutes to appear; until then the dashboard reports "no data available".
- Public uptime checks are not supported inside a VPC Service Controls perimeter; private checks can be.
- Prerequisite: the resource has a public endpoint or sits behind a configurable firewall; otherwise create a private uptime check. Notification channels should be set up first (multiple types recommended).
- The source also shows Console steps, Terraform, and C#, Java, Go, PHP, Ruby samples. Node.js and Python samples are in uptime-check-client-samples.md.
- Source: https://docs.cloud.google.com/monitoring/uptime-checks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [introduction.md](./introduction.md)
- [uptime-check-client-samples.md](./uptime-check-client-samples.md)
- [uptime-check-pings-and-failures.md](./uptime-check-pings-and-failures.md)
