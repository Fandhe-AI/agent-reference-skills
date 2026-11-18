---
source: https://docs.cloud.google.com/profiler/docs/profiling-nodejs
---

# Profiling Node.js applications

Modify a Node.js application to capture profiling data with the `@google-cloud/profiler` package and send it to a Google Cloud project. Profile types for Node.js: Heap, Wall time.

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

### Install the package

`@google-cloud/profiler` depends on a native component built with `node-gyp`. If you also use the Trace agent, import the Profiler package after `@google-cloud/trace-agent`.

```text
    npm install @google-cloud/profiler
```

### Compute Engine

Create a `serviceContext` object that assigns the profiled service name to `service`; `version` is optional.

```javascript
require('@google-cloud/profiler').start({
  serviceContext: {
    service: 'your-service',
    version: '1.0.0',
  },
});
```

### GKE

Install the package in the Dockerfile, then call `start` as in the Compute Engine sample:

Adapted (not in the official docs): `FROM node:10` changed to `FROM node:24`, because Node.js 10 is below the page's supported range (Node.js 14 or higher).

```text
FROM node:24
...
RUN npm install @google-cloud/profiler
```

### App Engine flexible and standard environments

`service` and `version` are derived from the environment, so no `serviceContext` is needed.

```javascript
require('@google-cloud/profiler').start();
```

### Agent logging

Set `logLevel` in the same object that provides the service context:

```text
    require('@google-cloud/profiler').start({
        serviceContext: { ... }
        logLevel:       3
    });
```

### Linux Alpine (GKE only)

If `npm install` fails with `ERR! stack Error: not found: make`, add to the Dockerfile's build stage:

```text
RUN apk add python3 g++ make
```

For the authentication error `x509: failed to load system roots and no roots provided` (visible with agent logging enabled), install root certificates:

```text
FROM alpine
...
RUN apk add --no-cache ca-certificates
```

## Options / Props

### Support matrix

| Item | Value |
|---|---|
| Node.js versions | Node.js 14 or higher (see the Node.js release schedule) |
| Agent versions | Most recent release supported; releases older than one year generally aren't supported |
| Operating systems | Linux with `glibc` or `musl`; the Linux Alpine agent is supported only for GKE configurations |
| Environments | Compute Engine; GKE; App Engine flexible environment; App Engine standard environment; outside Google Cloud |

### `logLevel` values

| Value | Meaning |
|---|---|
| `0` | Disables all agent logging |
| `1` | Enables error logging |
| `2` | Enables warning logging (default) |
| `3` | Enables info logging |
| `4` | Enables debug logging |

### Service name and version

| Argument | Rules |
|---|---|
| `service` (service name) | Lets Profiler collect data for all replicas of the service. Collection rate is one profile per minute on average for each service name across each combination of service versions and zones (two versions across three zones: about 6 profiles per minute). Must match `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`. Don't use process-specific values such as a process ID. Not required on App Engine (derived from the environment). |
| `version` (service version) | Optional free-form string, typically like `1.0.0` or `2.1.2`; lets the UI filter and compare versions. |

### Known issues

| Behavior | Detail |
|---|---|
| Delayed program exit | The agent interferes with the normal exit; it can take up to an hour for the program to exit after all tasks complete. A SIGINT (for example `Ctrl-C`) terminates the process gracefully. |

## Notes

- If the agent's service account lacks `roles/cloudprofiler.agent`, the project has no profile data. The skip condition (default service account with unmodified grants) is not a recommendation to use the default service account; the binding shown is project-level, as in the source.
- Using different service names for replicas causes more profiling than necessary and higher overhead.
- Outside Google Cloud, credentials and project linkage are required: https://docs.cloud.google.com/profiler/docs/profiling-external.
- The source's `logLevel` and Alpine sample text fences are kept as in the source, including the missing comma after `serviceContext: { ... }` in the pseudo-code (`text` fence, not valid JavaScript as written).
- Corrected from the official docs: the GKE Dockerfile sample's `FROM node:10` was changed to `FROM node:24`. The same page lists the supported versions as "Node.js 14 or higher", so `node:10` is below the page's own minimum version.
- Console steps and the profiler UI links are not reproduced.
- Source: https://docs.cloud.google.com/profiler/docs/profiling-nodejs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-profiler.md](./about-profiler.md)
- [concepts-profiling.md](./concepts-profiling.md)
- [profiling-go.md](./profiling-go.md)
- [profiling-python.md](./profiling-python.md)
