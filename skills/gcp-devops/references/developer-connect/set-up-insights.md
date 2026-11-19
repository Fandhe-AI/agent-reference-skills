---
source: https://docs.cloud.google.com/developer-connect/docs/set-up-insights
---

# Set up Developer Connect insights

Create the service agent, grant roles, and create an insights configuration scoped to an App Hub application or to target projects. Creation runs an auto-discovery of App Hub workloads and services and checks permissions.

## Signature / Usage

### Create the service agent

```bash
gcloud beta services identity create \
--service=developerconnect.googleapis.com \
--project=PROJECT_NUM
```

The role `roles/developerconnect.serviceAgent` is added to this service agent automatically.

### Create the configuration

The source's command passes both `--app-hub-application` and `--target-projects`, but the gcloud 593.0.0 help requires exactly one, so it is split into two commands.

Scoped to an App Hub application.

Adapted (not in the official docs): the source's combined command is reduced to `--app-hub-application` only, because the help requires exactly one of the two flags; the flags are written with `=` as the help shows.

```bash
gcloud developer-connect insights-configs create DCI_CONFIG_NAME \
       --project=PROJECT_ID \
       --app-hub-application=APP_HUB_APPLICATION_NAME \
       --location=LOCATION
```

Scoped to projects (maximum 5 per configuration).

Adapted (not in the official docs): the source's combined command is reduced to `--target-projects` only, because the help requires exactly one of the two flags; the flags are written with `=` as the help shows.

```bash
gcloud developer-connect insights-configs create DCI_CONFIG_NAME \
       --project=PROJECT_ID \
       --target-projects=TARGET_PROJECT_IDS \
       --location=LOCATION
```

### Check status

```bash
gcloud developer-connect operations describe OPERATION_ID
```

The operation is a receipt of the initial request; its `response` is a snapshot at acceptance. For the discovery state run:

```bash
gcloud developer-connect insights-configs describe DCI_CONFIG_NAME \
       --location=REGION
```

## Options / Props

### Required roles by scope

| Scope | Grantee | Roles |
|-------|---------|-------|
| App Hub application, management project (folder boundary) | User configuring | `roles/developerconnect.insightsAdmin`, `roles/apphub.viewer` on the management project |
| | Developer Connect service agent | `roles/developerconnect.serviceAgent` and `roles/developerconnect.insightsAgent` on the management project; `roles/developerconnect.insightsAgent` on the folder containing the management project |
| App Hub application, host project (legacy) | User configuring | `roles/developerconnect.insightsAdmin`, `roles/apphub.viewer` on the host project |
| | Developer Connect service agent | `serviceAgent` and `insightsAgent` on the host project; `insightsAgent` on all service projects; also in projects outside the folder that hold existing resources (for example Cloud Build or Artifact Registry) |
| Target projects | User configuring | `roles/developerconnect.insightsAdmin` on the host project |
| | Developer Connect service agent | `serviceAgent` and `insightsAgent` on the host project; `insightsAgent` on all target projects |
| Viewing from the command line | Users | `roles/developerconnect.insightsViewer` and `roles/containeranalysis.occurrences.viewer` on the host project |

### Limits

| Limit | Value |
|-------|-------|
| Insights configurations per project | 50 |
| Projects tracked by one project-scoped configuration | 5 |
| Runtimes tracked by one insights configuration | 3000 |

### Placeholders

| Name | Meaning |
|------|---------|
| `PROJECT_ID` | Project in which the configuration is created |
| `APP_HUB_APPLICATION_NAME` | Fully qualified App Hub application name |
| `TARGET_PROJECT_IDS` | Comma-separated project IDs |
| `LOCATION` / `REGION` | Region of the configuration |

### Provenance sources

| Source | Condition |
|--------|-----------|
| Cloud Build and Artifact Registry | Build started by a trigger and generating provenance |
| GitHub attestations | `docker/build-push-action` version 4 or later, or `actions/attest-build-provenance` with `push-to-registry`; must come from a publicly available repository |
| `docker buildx` provenance flag | See Docker docs |
| `docker buildx` registry exporter | Set `oci-artifact` to `true`; artifact must be publicly available in the registry |

## Notes

- Adapted from the official docs: the single source command combined `--app-hub-application` and `--target-projects`, which the help marks as mutually exclusive (exactly one required).
- Generally available in all regions except `australia-southeast1`, `europe-west6`, `europe-west8`, `europe-west9`, and `southamerica-east1`.
- Enabling Developer Connect also enables the Secret Manager API. Requires Cloud Build and a supported SCM (GitHub, GitLab or Bitbucket). Insights work without provenance but are less useful.
- When scoped to an App Hub application, the configuration must be in the same project as that application; when scoped by project it need not be. Keeping related resources in the same location is recommended, not required. Creating the application: App Hub setup (a folder configured for application management is recommended) or Application Design Center.
- `OPERATION_ID` is the fully-specified operation ID returned by `gcloud developer-connect insights-configs create` (the source's wording); the `operations describe` help also accepts a short ID together with `--location`.
- Granting `insightsAgent` on whole folders or all projects is broad; scope the configuration to what you need.
- Source: https://docs.cloud.google.com/developer-connect/docs/set-up-insights (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [insights.md](./insights.md)
- [use-insights.md](./use-insights.md)
