---
source: https://docs.cloud.google.com/profiler/docs/concepts-profiling
---

# Profiling concepts and flame graphs

Cloud Profiler is a continuous, statistical (sampling) profiler. This page covers the profile types, how the backend instructs agents to collect profiles, and how flame graphs represent the data (merged from the Flame graphs page).

## Signature / Usage

### Start the agent early in the application

The agent periodically asks the Profiler backend which profile to capture, captures it, and uploads it. Python form (the agent starts a daemon thread):

```python
googlecloudprofiler.start(service='service_name', verbose=3)
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

### Profile type meanings

| Type | Meaning |
|---|---|
| CPU time | Time the CPU spends executing a block of code; excludes waiting or processing for something else. |
| Wall time | Time elapsed between entering and exiting a function, including all wait time (locks, thread synchronization). Never less than CPU time. |
| Heap | Memory allocated in the program's heap at the instant the profile is collected (single point in time). |
| Allocated heap | Total memory allocated during the collection interval, including memory already freed. |
| Threads | At the frame level, the average number of threads that include that frame; collected at a single point in time. |
| Contention | Time spent waiting to serialize access to a shared resource in a multi-threaded program. |

### Deployment fields identifying a profile

| Field |
|---|
| Google Cloud project |
| Application name |
| Application zone |
| Application version |

### Flame graph terms

| Term | Meaning |
|---|---|
| total CPU time | CPU time used by the function including all functions it calls. |
| self CPU time | CPU time used by a function excluding the functions it calls. |
| frame width | Relative measure of the function's total CPU time. |
| empty space below a frame | Relative measure of the function's self CPU time. |

## Notes

- When the number of samples is low, wall time can appear to be less than CPU time in a sampling profile such as Cloud Profiler. If wall time is much longer than CPU time, the code spends time waiting (possible resource bottleneck); if similar, the code is CPU intensive.
- Collection: each minute, on average, for each deployment and each profile type, the backend selects an agent and instructs it to capture a profile. For all profile types except heap usage and threads, one profile represents data collected for 10 seconds; heap usage and thread profiles are collected instantaneously. Agents are idle most of the time; with 10 instances in one deployment you can expect about 10 profiles over 10 minutes (randomized).
- The backend uses Profiler API quotas and the deployment fields to limit the profiles ingested. See https://docs.cloud.google.com/profiler/quotas.
- Flame graphs: frames are rectangles of equal height; a callee's width never exceeds its caller's width. The source's worked example has `main` (self 2 s, total 9 s), `foo1` (self 1.5 s, total 4 s), `foo2` (self 0.5 s, total 3 s) and `bar` (self 2.5 s, total 2.5 s). Frames can be colored by package, total CPU time, self CPU time or another measure. Follow-up pages (selecting, interacting, filtering, focusing, comparing profiles) are not included in this category.
- Snippet taken from https://docs.cloud.google.com/profiler/docs/profiling-python (Agent logging).
- Source: https://docs.cloud.google.com/profiler/docs/concepts-profiling (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/profiler/docs/concepts-flame (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-profiler.md](./about-profiler.md)
- [profiling-go.md](./profiling-go.md)
- [profiling-python.md](./profiling-python.md)
