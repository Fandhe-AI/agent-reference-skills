---
source: https://docs.cloud.google.com/profiler/docs/profiling-go
---

# Profiling Go applications

Modify a Go application to capture profiling data with `cloud.google.com/go/profiler` and send it to a Google Cloud project. Profile types for Go: CPU time, Heap, Allocated heap, Contention (Go mutex), Threads (Go goroutine).

## Signature / Usage

### Enable the Profiler API

```bash
gcloud services enable cloudprofiler.googleapis.com
```

### Grant the Cloud Profiler Agent role

Skip this if you deploy on Google Cloud resources with the default service account and have not modified its role grants. Otherwise grant `roles/cloudprofiler.agent`:

```bash
gcloud projects add-iam-policy-binding GCP_PROJECT_ID \
    --member serviceAccount:MY_SVC_ACCT_ID@GCP_PROJECT_ID.iam.gserviceaccount.com \
    --role roles/cloudprofiler.agent
```

### Start the profiler (Compute Engine and GKE)

Import the package and initialize the profiler as early as possible. Set `Service` and optionally `ServiceVersion`. The GKE sample is identical.

```go
// snippets is an example of starting cloud.google.com/go/profiler.
package main

import (
	"cloud.google.com/go/profiler"
)

func main() {
	cfg := profiler.Config{
		Service:        "myservice",
		ServiceVersion: "1.0.0",
		// ProjectID must be set if not running on GCP.
		// ProjectID: "my-project",

		// For OpenCensus users:
		// To see Profiler agent spans in APM backend,
		// set EnableOCTelemetry to true
		// EnableOCTelemetry: true,
	}

	// Profiler initialization, best done as early as possible.
	if err := profiler.Start(cfg); err != nil {
		// TODO: Handle error.
	}
}
```

If dependencies are fetched manually, add this to the build script or Dockerfile:

```bash
go get cloud.google.com/go/profiler
```

### Start the profiler (App Engine)

`Service` and `ServiceVersion` are derived from the environment in both App Engine environments.

```go
// appengine is an example of starting cloud.google.com/go/profiler on
// App Engine.
package main

import (
	"cloud.google.com/go/profiler"
)

func main() {
	// Profiler initialization, best done as early as possible.
	if err := profiler.Start(profiler.Config{
		// Service and ServiceVersion can be automatically inferred when running
		// on App Engine.
		// ProjectID must be set if not running on GCP.
		// ProjectID: "my-project",
	}); err != nil {
		// TODO: Handle error.
	}
}
```

### Enable agent logging

```text
profiler.Start(profiler.Config{..., DebugLogging: true});
```

### Alpine: install root certificates

```text
FROM alpine
...
RUN apk add --no-cache ca-certificates
```

## Options / Props

### Support matrix

| Item | Value |
|---|---|
| Go versions | All officially maintained Go releases, unless otherwise noted |
| Agent versions | Most recent release supported; releases older than one year generally aren't supported |
| Operating systems | Linux with `glibc` or `musl`; Linux Alpine supported only for GKE configurations |
| Environments | Compute Engine; GKE; App Engine flexible environment; App Engine standard environment (requires Go 1.11 or higher); outside Google Cloud |

### Configuration

| Name | Description |
|---|---|
| `Service` | Service name (required on Compute Engine and GKE; derived on App Engine). Must match `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`; no process-specific values such as a process ID. |
| `ServiceVersion` | Optional free-form version string, for example `1.0.0` or `2.1.2`. |
| `ProjectID` | Must be set when not running on Google Cloud. |
| `MutexProfiling` | Set to `true` to enable mutex-contention profiling ("Contention" in the interface). |
| `DebugLogging` | Set to `true` to enable agent logging; disabled by default. |

### Known issues

| Behavior | Cause | Solution |
|---|---|---|
| CPU time profiles aren't collected for applications built with `-buildmode=c-archive`; heap, contention and thread profiles are collected | By default CPU profiling isn't enabled when `-buildmode` is `c-archive` or `c-shared` | Add a call to `signal.Notify(make( chan os.Signal), syscall.SIGPROF)` before calling `profiler.Start` |
| `connection error: desc = "transport: authentication handshake failed: x509: failed to load system roots and no roots provided"` (visible only with agent logging enabled) | Linux Alpine Docker images (`golang:alpine`, `alpine`) lack root SSL certificates | Add `RUN apk add --no-cache ca-certificates` to the Dockerfile, then rebuild and redeploy |

## Notes

- If the agent's service account lacks `roles/cloudprofiler.agent`, the project has no profile data. The source's skip condition (default service account with unmodified grants) is not a recommendation to use the default service account; the grant above is a project-level IAM binding as the source shows.
- Required to enable the API: `serviceusage.services.enable` permission (Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- For workload identity on GKE, grant the Cloud Profiler Agent role to the Kubernetes service account.
- Service name: the profiler service ensures a collection rate of one profile per minute, on average, for each service name across each combination of service versions and zones (two versions in three zones: an average of 6 profiles per minute). Different service names for replicas cause more profiling than necessary and higher overhead.
- Running locally or outside Google Cloud: set `ProjectID` and `Service` (`ServiceVersion` not needed locally); outside Google Cloud also configure credentials, see https://docs.cloud.google.com/profiler/docs/profiling-external.
- App Engine standard environment requires Google Cloud CLI 226.0.0 or later (`gcloud components update`) and the Go 1.11 migration changes; deployment uses `gcloud app deploy`. Those commands are not reproduced here.
- The source shows `go get` and the Compute Engine and GKE samples as separate identical blocks; one copy is kept. Console steps and the Go public API docs (https://godoc.org/cloud.google.com/go/profiler) are not reproduced.
- Source: https://docs.cloud.google.com/profiler/docs/profiling-go (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-profiler.md](./about-profiler.md)
- [concepts-profiling.md](./concepts-profiling.md)
- [profiling-python.md](./profiling-python.md)
