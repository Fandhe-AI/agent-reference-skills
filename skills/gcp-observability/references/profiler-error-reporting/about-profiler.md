---
source: https://docs.cloud.google.com/profiler/docs/about-profiler
---

# Cloud Profiler overview

Cloud Profiler is a statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information from production applications and attributes it to the source code that generated it. It consists of a language-specific profiling agent and a console interface.

## Signature / Usage

### Enable the Profiler API

The agent needs the Profiler API enabled in the project.

```bash
gcloud services enable cloudprofiler.googleapis.com
```

## Options / Props

### Profile types by language

| Profile type | Go | Java | Node.js | Python |
|---|---|---|---|---|
| CPU time | Y | Y |   | Y |
| Heap | Y | Y | Y |   |
| Allocated heap | Y |   |   |   |
| Contention | Y |   |   |   |
| Threads | Y |   |   |   |
| Wall time |   | Y | Y | Y |

### Supported environments

| Environments | Go | Java | Node.js | Python |
|---|---|---|---|---|
| Compute Engine | Y | Y | Y | Y |
| Google Kubernetes Engine | Y | Y | Y | Y |
| App Engine flexible environment | Y | Y | Y | Y |
| App Engine standard environment | Y | Y | Y | Y |
| Managed Service for Apache Spark |   | Y |   |   |
| Dataflow |   | Y |   | Y |
| Outside of Google Cloud | Y | Y | Y | Y |

### Supported operating systems

| Operating systems | Go | Java | Node.js | Python |
|---|---|---|---|---|
| Linux `glibc` implementation of the standard C library | Y | Y | Y | Y |
| Linux `musl` implementation of the standard C library | Y | Y (Alpha) | Y | Y (Alpha) |

## Notes

- Collection and overhead: a single profile is created by collecting profiling data, usually for 10 seconds, every 1 minute for a single instance of the configured service in a single Compute Engine zone. With 10 replicas of a GKE pod, roughly 10 profiles are created in a 10-minute period and each pod is profiled approximately once. The profiling period is randomized.
- Overhead of CPU and heap allocation profiling at the time of data collection is less than 5 percent; amortized over execution time and across replicas it is commonly less than 0.5 percent.
- Profile data is retained for 30 days. Profiles can be downloaded for long-term storage.
- Cloud Profiler is a VPC Service Controls supported service.
- Quotas and limits: see https://docs.cloud.google.com/profiler/quotas.
- Agent setup guides exist for Go, Java, Node.js, Python and applications outside Google Cloud; this skill's category carries the Go ([profiling-go.md](./profiling-go.md)), Node.js ([profiling-nodejs.md](./profiling-nodejs.md)) and Python ([profiling-python.md](./profiling-python.md)) pages (the Java and external-environment pages are not included).
- Snippet taken from https://docs.cloud.google.com/profiler/docs/profiling-go (Enabling the Profiler API).
- Source: https://docs.cloud.google.com/profiler/docs/about-profiler (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-profiling.md](./concepts-profiling.md)
- [profiling-go.md](./profiling-go.md)
- [profiling-python.md](./profiling-python.md)
