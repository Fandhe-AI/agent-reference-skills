---
source: https://docs.cloud.google.com/developer-connect/docs/use-insights
---

# Use Developer Connect insights

Read the deployment events that insights produce: in Gemini Cloud Assist investigations, as `sdlc_deployment` log entries in Cloud Logging, and as deployment events through gcloud or the console.

## Signature / Usage

### Read the log entries

Adapted (not in the official docs): the source has a stray backtick after `sdlc_deployment`, and the `/` in the log ID must be written `%2F` in a `logName` filter (the source's own sample entry shows `developerconnect.googleapis.com%2Fsdlc_deployment`). The filter is quoted.

```bash
gcloud logging read 'logName="projects/PROJECT_ID/logs/developerconnect.googleapis.com%2Fsdlc_deployment"' \
  --project=PROJECT_ID
```

### List deployment events

```bash
gcloud alpha developer-connect insights-configs deployment-events list \
       --insights-config=INSIGHTS_CONFIG_ID \
       --location=LOCATION \
       --project=PROJECT_ID
```

Sample output:

```json
[
  {
    "artifactDeployments": [
      {
        "artifactAlias": "us-central1-docker.pkg.dev/my-project/my-registry/my-app@sha256:1234567890",
        "artifactReference": "us-central1-docker.pkg.dev/my-project/my-registry/my-app@sha256:1234567890",
        "containerStatusSummary": "Running-N/A : 1",
        "deployTime": "2025-10-20T16:10:48Z",
        "id": "0a9b8c7d6e5f4g3h2i1",
        "sourceCommitUris": [
          "https://github.com/myGitHub/my-GitHub-project/commit/5806255405d"
        ]
      }
    ],
    "deployTime": "2025-10-20T16:10:48Z",
    "name": "projects/111111111/locations/us-central1/insightsConfigs/my-ic/deploymentEvents/daf0987654321",
    "runtimeConfig": {
      "uri": "//container.googleapis.com/projects/111111111/locations/us-central1/clusters/my-cluster/k8s/namespaces/default/apps/deployments/my-deployment"
    },
    "runtimeDeploymentUri": "//container.googleapis.com/projects/111111111/locations/us-central1/clusters/my-cluster/k8s/namespaces/default/apps/replicasets/my-deployment-6c74f4cdbb",
    "state": "STATE_ACTIVE"
  },
  {
    "artifactDeployments": [
      {
        "artifactAlias": "us-central1-docker.pkg.dev/my-project/my-registry/my-app@sha256:24680",
        "artifactReference": "us-central1-docker.pkg.dev/my-project/my-registry/my-app@sha256:24680",
        "containerStatusSummary": "Terminated-Error (Exit Code: 137) : 1",
        "deployTime": "2025-10-20T15:29:32Z",
        "id": "2a4b6c8d0e",
        "sourceCommitUris": [
          "https://github.com/myGitHub/my-GitHub-project/commit/n6f8e1269f2c18"
        ],
        "undeployTime": "2025-10-20T18:46:47Z"
      }
    ],
    "deployTime": "2025-10-20T15:29:32Z",
    "name": "projects/111111111/locations/us-central1/insightsConfigs/my-ic/deploymentEvents/nkj987654321",
    "runtimeConfig": {
      "uri": "//container.googleapis.com/projects/111111111/locations/us-central1/clusters/my-cluster/k8s/namespaces/default/apps/replicasets/my-deployment"
    },
    "runtimeDeploymentUri": "//container.googleapis.com/projects/111111111/locations/us-central1/clusters/my-cluster/k8s/namespaces/default/apps/replicasets/my-deployment-6c74f4cdbb",
    "state": "STATE_INACTIVE",
    "undeployTime": "2025-10-20T18:46:47Z"
  }
]
```

### Describe one event (includes vulnerabilities)

```bash
gcloud alpha developer-connect insights-configs deployment-events describe DEPLOYMENT_EVENT_ID \
       --insights-config=INSIGHTS_CONFIG_ID \
       --location=LOCATION \
       --project=PROJECT_ID
```

`DEPLOYMENT_EVENT_ID` is the last path segment of the event's `name` (for `.../deploymentEvents/nkj987654321` it is `nkj987654321`).

## Options / Props

| Field | Meaning |
|-------|---------|
| `logName` | `projects/P/logs/developerconnect.googleapis.com%2Fsdlc_deployment` |
| `labels.insights_config_id` | Filter log entries for one insights configuration |
| `jsonPayload.previousDeployment` / `currentDeployment` | Runtime `resource`, `deploymentId`, `statusSummary`, `timestamp` and `artifactDetails` (`artifactUri`, `commitReferences` with `commitSha` and `commitUrl`, `packages`) |
| `apphub.application` / `apphub.workload` | App Hub context, including `environmentType` and `criticalityType` |
| Deployment event `state` | `STATE_ACTIVE`, `STATE_INACTIVE` (with `undeployTime`) |

## Notes

- Adapted from the official docs: the `gcloud logging read` command had an unbalanced backtick and an unencoded `/` in the log ID.
- Complete the setup page first; the roles required are listed there. Viewing events in the console is available for App Hub-enabled folders only (Cloud Hub > **Deployments**).
- In Gemini Cloud Assist, correlated deployments appear as a "Deployment of `[DEPLOYMENT_NAME]`" card (**Correlated Events** opens Logs Explorer); a deployment believed to cause an error appears as the hypothesis "Recent Deployment Impacting Application Behavior" with remediation recommendations.
- The alpha track is what the source shows; the GA `gcloud developer-connect insights-configs deployment-events list` also exists in gcloud 593.0.0.
- Omitted from the source: the long sample log entry JSON and the `describe` output sample, whose arrays contain trailing commas (invalid JSON); the fields of the log entry are in the table above.
- Source: https://docs.cloud.google.com/developer-connect/docs/use-insights (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [insights.md](./insights.md)
- [set-up-insights.md](./set-up-insights.md)
