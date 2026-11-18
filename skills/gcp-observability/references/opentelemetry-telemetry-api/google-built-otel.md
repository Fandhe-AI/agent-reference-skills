---
source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/google-built-otel
---

# Google-Built OpenTelemetry Collector

Google's open-source build of the OpenTelemetry Collector, built from upstream components on Google build-test-release infrastructure (Artifact Registry). It sends correlated OTLP traces, metrics and logs to Google Cloud Observability and other backends and captures Google Cloud resource metadata. It can run on Kubernetes (including GKE), Container-Optimized OS, standalone containers, Compute Engine and Cloud Run; the same instructions can configure the upstream collector.

## Signature / Usage

### Use the demo with the Google-Built Collector

```text
git clone https://github.com/GoogleCloudPlatform/opentelemetry-demo.git
```

Adapted (not in the official docs): the path is `opentelemetry-demo/kubernetes`, because `git clone` does not change the working directory.

```text
cd opentelemetry-demo/kubernetes
```

In `opentelemetry-demo.yaml`, replace the collector image line (version may differ):

```text
image: "otel/opentelemetry-collector-contrib:0.108.0"
```

```text
image: "us-docker.pkg.dev/cloud-ops-agents-artifacts/google-cloud-opentelemetry-collector/otelcol-google:0.164.0"
```

```bash
kubectl apply --namespace otel-demo -f opentelemetry-demo.yaml
```

Adapted (not in the official docs): the twin shows `--n` for the namespace flag, which kubectl does not define; changed to `-n`.

```bash
kubectl port-forward -n otel-demo svc/opentelemetry-demo-frontendproxy 8080:8080
```

## Options / Props

### Recommended collector components

| Component | Recommendation |
|---|---|
| OTLP gRPC exporter | Connect to the Telemetry (OTLP) API at `telemetry.googleapis.com`; accepts logs, metrics and traces in OTLP at maximum fidelity. |
| health-check extension | HTTP URL for probes; compatible with Kubernetes liveness and readiness probes; on Cloud Run one extension can serve startup and liveness probes. |
| batch processor | Fewer outgoing connections (lower quota use), better compression, size-based and time-based batching. |
| `googlesecretmanager` provider | Keeps secrets in Secret Manager instead of config files; secrets fetched at collector initialization. |

### Release notes (selected)

| Version | Note |
|---|---|
| 0.164.0 (current) | Core v0.164.0, Contrib v0.164.1; image `us-docker.pkg.dev/cloud-ops-agents-artifacts/google-cloud-opentelemetry-collector/otelcol-google:0.164.0`. |
| 0.147.0 | Known issue: gRPC `otlp` exporter defaults to `round_robin` client-side load balancing; sending to the Telemetry API can produce `connect: network is unreachable` log noise if IPv6 isn't functioning. |
| 0.135.0 | BoringCrypto linkage for FIPS 140-2 compliance; fixed permission errors for configs mounted at `/etc/otelcol-google`. |
| 0.134.0 | SLSA level 3 builds begin; opencensus receiver removed. |
| 0.130.0 | `healthcheckv2extension` added; Prometheus Receiver known issue fixed. |
| 0.129.0 | Known issue: Prometheus Receiver basic authentication for URLs broken in 0.127.0, 0.128.0, 0.129.0; mitigate with 0.126.0 or lower. |
| 0.126.0 | `metricstarttime` processor and `googlesecretmanager` provider added. |
| 0.122.1 | `googleclientauthextension` added. |
| 0.121.0 | Initial release. |

## Notes

- Adapted from the official docs: the source command is `kubectl port-forward --n otel-demo ...`; `--n` is not a kubectl flag, so `-n` is used.
- Versioned in sync with the upstream collector. The twin lists more releases than shown; consult the source for the full list.
- From 0.134.0, Docker images are built to SLSA level 3 with attestations (including a verification summary attestation on GitHub releases), continuous vulnerability scanning and verified releases.
- No charge for deploying the collector; telemetry is billed by ingestion volume (see the Google Cloud Observability pricing page).
- To collect Prometheus metrics from Cloud Run containers, use the Prometheus sidecar for Cloud Run.
- Demo metrics appear under the `Prometheus Target` resource with the prefix `prometheus.googleapis.com`; the demo requires a Kubernetes cluster with Workload Identity Federation configured.
- The source also shows Console steps for Metrics Explorer, Trace Explorer and Logs Explorer.
- Issues: packaging, deployment, authentication and new components go to `GoogleCloudPlatform/opentelemetry-operations-collector`; Google-specific components (`googlecloudexporter`, `googlemanagedprometheusexporter`, `googleclientauthextension`, `resourcedetectionprocessor`) go to the collector-contrib repository.
- OpenTelemetry tracing in Google Cloud; this is not the tracing of the OpenAI Agents SDK (`openai-agents`) or the Vercel AI SDK telemetry (`vercel-ai-sdk`).
- Source: https://docs.cloud.google.com/stackdriver/docs/instrumentation/google-built-otel (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: after `git clone https://github.com/GoogleCloudPlatform/opentelemetry-demo.git` the source runs `cd kubernetes`, which fails from the directory where the clone was made; the example uses `cd opentelemetry-demo/kubernetes`.

## Related

- [choose-approach.md](./choose-approach.md)
- [migrate-collector-to-otlp-exporters.md](./migrate-collector-to-otlp-exporters.md)
- [otlp-overview.md](./otlp-overview.md)
