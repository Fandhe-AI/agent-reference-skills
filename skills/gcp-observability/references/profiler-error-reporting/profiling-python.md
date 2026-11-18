---
source: https://docs.cloud.google.com/profiler/docs/profiling-python
---

# Profiling Python applications

Modify a Python application to capture profiling data with the `google-cloud-profiler` package (`googlecloudprofiler.start`) and send it to a Google Cloud project. Profile types for Python: CPU time, Wall time (main thread).

## Signature / Usage

### Enable the Profiler API

```bash
gcloud services enable cloudprofiler.googleapis.com
```

### Grant the Cloud Profiler Agent role

Skip this if you deploy on Google Cloud resources with the default service account and have not modified its role grants. Otherwise (modified default service account, user-created service account, or workload identity with the role granted to the Kubernetes service account):

```bash
gcloud projects add-iam-policy-binding GCP_PROJECT_ID \
    --member serviceAccount:MY_SVC_ACCT_ID@GCP_PROJECT_ID.iam.gserviceaccount.com \
    --role roles/cloudprofiler.agent
```

### Compute Engine

Install build tools, pip and the package, then call `googlecloudprofiler.start` as early as possible.

```bash
sudo apt-get install -y build-essential
```

```bash
sudo apt-get install -y python3-pip
```

```bash
pip3 install google-cloud-profiler
```

```python
import googlecloudprofiler


def main():
    # Profiler initialization. It starts a daemon thread which continuously
    # collects and uploads profiles. Best done as early as possible.
    try:
        googlecloudprofiler.start(
            service="hello-profiler",
            service_version="1.0.1",
            # verbose is the logging level. 0-error, 1-warning, 2-info,
            # 3-debug. It defaults to 0 (error) if not set.
            verbose=3,
            # project_id must be set if not running on GCP.
            # project_id='my-project-id',
        )
    except (ValueError, NotImplementedError) as exc:
        print(exc)  # Handle errors here
```

### GKE

Install the package in the Dockerfile, then call `start` as in the Compute Engine sample:

Adapted (not in the official docs): the floating `python:3` base image was pinned to `python:3.11.0`, the newest version in the supported range.

```text
FROM python:3.11.0
...
RUN apt-get update && apt-get install -y build-essential python3-pip
RUN pip3 install google-cloud-profiler
```

### App Engine flexible and standard environments

Add `google-cloud-profiler` to `requirements.txt`, then import `googlecloudprofiler` and call `googlecloudprofiler.start` as early as possible. `service` and `service_version` are derived from the environment. The standard environment requires the Python 3 runtime environment.

### Agent logging

```python
googlecloudprofiler.start(service='service_name', verbose=3)
```

### Linux Alpine (Alpha, GKE only)

Compile the agent in a first build stage (needs `build-base`) and install the wheels in the final image:

```text
FROM python:3.7-alpine as builder

# Install build-base to allow for compilation of the profiling agent.
RUN apk add --update --no-cache build-base

# Compile the profiling agent, generating wheels for it.
RUN pip3 wheel --wheel-dir=/tmp/wheels google-cloud-profiler

FROM python:3.7-alpine

# Copy over the directory containing wheels for the profiling agent.
COPY --from=builder /tmp/wheels /tmp/wheels

# Install the profiling agent.
RUN pip3 install --no-index --find-links=/tmp/wheels google-cloud-profiler

# Install any other required modules or dependencies, and copy an app which
# enables the profiler as described in "Enable the profiler in your
# application".
COPY ./bench.py .

# Run the application when the docker image is run, using either CMD (as is done
# here) or ENTRYPOINT.
CMD python3 -u bench.py
```

## Options / Props

### Support matrix

| Item | Value |
|---|---|
| Python versions | Python 3.6 through 3.11.0 |
| Agent versions | Most recent release supported; releases older than one year generally aren't supported |
| Operating systems | Linux with `glibc` or `musl`; Linux Alpine supported only for GKE configurations (Alpha) |
| Environments | Compute Engine; GKE; App Engine flexible environment; App Engine standard environment (requires the Python 3 runtime); outside Google Cloud |

### `googlecloudprofiler.start` parameters

| Parameter | Description |
|---|---|
| `service` | (Required) Name of the service being profiled; Compute Engine and GKE only (derived on App Engine). Must match `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`. |
| `service_version` | (Optional) Version of the service being profiled; Compute Engine and GKE only (derived on App Engine). Free-form string such as `1.0.0`. |
| `verbose` | (Optional) Logging level: `0` Error, `1` Warning, `2` Informational, `3` Debug. Default **0 (Error)**. |
| `project_id` | (Optional) Project ID. Derived on Google Cloud; must be provided outside Google Cloud. |
| `disable_cpu_profiling` | (Optional) `True` disables CPU time profiling. Supported for Python versions 3.2 through 3.11.0; ignored for other versions (CPU time profiling isn't supported there). Default **False**. |
| `disable_wall_profiling` | (Optional) `True` disables Wall profiling. Supported for Python versions 3.6 through 3.11.0; ignored for other versions (Wall profiling isn't supported there). Default **False**. |

### Limitations

| Profile type | Restrictions and limitations |
|---|---|
| Wall time | Main-thread profiling only. `start` must be called from the main thread. The Profiler signal handler executes only on the main thread; if the main thread cannot execute, no profiling data is captured. Don't enable Wall profiling if your application contains a large number of threads: it results in slow performance and no profile data. |

### Exceptions

| Error | Cause | Solution |
|---|---|---|
| `NotImplementedError` thrown during `start` | Application executed in a non-Linux environment | Execute your application in a Linux environment |
| `ValueError` thrown during `start` | Invalid `start` arguments, information that can't be determined from the environment and arguments, or both CPU time and Wall time profiling are disabled | Meet the service name and version requirements; call `start` from the main thread if Wall profiling is enabled; use a supported Python version with CPU time or Wall time profiling enabled; specify `project_id` outside Google Cloud |

### Known issues

| Behavior | Cause | Solution |
|---|---|---|
| uWSGI: no CPU time and Wall profile data for all processes | With multiple workers, initialization runs only in the primary process; forked processes skip it (for example `AppConfig.ready()` in Django) | Set the uWSGI flag `lazy-apps` to `true` |
| uWSGI: CPU time data but no Wall profile data | The Wall profiler depends on the Python `signal` module; when Python is compiled with thread support, custom signal handling is disabled for forked processes by default | Set the uWSGI flag `py-call-osafterfork` to `true` |
| Error log shows `BlockingIOError: [Errno 11] Resource temporarily unavailable Exception ignored when trying to write to the signal wakeup fd` | The application registered `signal.set_wakeup_fd`; the profiler triggers signals with high frequency and can fill the buffer | If the application can run safely when signals are lost, you can use Cloud Profiler; on Python 3.7 or later pass `warn_on_full_buffer=False` to `signal.set_wakeup_fd` to disable the warnings; otherwise stop using Cloud Profiler |
| Authentication error `connection error: desc = "transport: authentication handshake failed: x509: failed to load system roots and no roots provided"` (needs agent logging) | Alpine images lack root SSL certificates | Add `RUN apk add --no-cache ca-certificates` to the Dockerfile, then rebuild and redeploy |

## Notes

- Linux Alpine support is Alpha, subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- If the agent's service account lacks `roles/cloudprofiler.agent`, the project has no profile data. The source's skip condition (default service account with unmodified grants) is not a recommendation to use the default service account; the binding shown is project-level, as in the source.
- Service name: one profile per minute on average for each service name across each combination of versions and zones; differing service names across replicas cause extra profiling overhead. Do not use process-specific values (such as a process ID) in the service name.
- Outside Google Cloud, `project_id` and credentials are required: https://docs.cloud.google.com/profiler/docs/profiling-external.
- Corrected from the official docs: the GKE Dockerfile used `FROM python:3`, a floating tag that resolves to the newest Python 3 release, outside the documented "Python 3.6 through 3.11.0" range; it is pinned to `python:3.11.0`.
- The Alpine sample's `python:3.7-alpine` base image is kept as in the source: the page lists the supported versions as "Python 3.6 through 3.11.0", and Python 3.7 is within that range.
- The source's Python page shows its shell commands in `python` fences; they are shell commands. The Compute Engine and GKE `start` samples are identical; one copy is kept. Console steps are not reproduced.
- Source: https://docs.cloud.google.com/profiler/docs/profiling-python (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-profiler.md](./about-profiler.md)
- [concepts-profiling.md](./concepts-profiling.md)
- [profiling-go.md](./profiling-go.md)
