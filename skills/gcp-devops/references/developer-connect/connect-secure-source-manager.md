---
source: https://docs.cloud.google.com/developer-connect/docs/connect-secure-source-manager
---

# Connect to Secure Source Manager

Create a Developer Connect connection to a Secure Source Manager instance and link its repositories. This enables Developer Connect dashboard views and the Developer Connect proxy for secure `git` read operations.

## Signature / Usage

### Prerequisite service agent (CLI)

```bash
gcloud beta services identity create \
    --service=developerconnect.googleapis.com \
    --project=PROJECT_ID
```

### Create the connection (gcloud)

```bash
gcloud developer-connect connections create CONNECTION_ID \
  --location=REGION \
  --project=CONNECTION_PROJECT_ID \
  --secure-source-manager-instance-config=projects/INSTANCE_PROJECT_ID/locations/REGION/instances/INSTANCE_ID
```

### Create the connection (curl)

Adapted (not in the official docs): the URL is quoted (the `?` would otherwise be a shell glob) and the body uses the camelCase field name `secureSourceManagerInstanceConfig` that the Discovery document defines; `connection_id` is `connectionId`.

```bash
curl -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://developerconnect.googleapis.com/v1/projects/CONNECTION_PROJECT_ID/locations/REGION/connections?connectionId=CONNECTION_ID" \
  -X POST -H "Content-Type: application/json" \
  -d '{"secureSourceManagerInstanceConfig":{"instance":"projects/INSTANCE_PROJECT_ID/locations/REGION/instances/INSTANCE_ID"}}'
```

Link repositories in the console (**Repositories** > **Link repository**) or with `gcloud developer-connect connections git-repository-links` (see https://docs.cloud.google.com/sdk/gcloud/reference/developer-connect/connections/git-repository-links).

### Use the Developer Connect proxy in Cloud Build

Add an entry to `.cloudbuild/trigger.yaml` in the repository root that points at the `gitRepositoryLink`:

```yaml
triggers:
- name: test-trigger
  project: my-project
  configFilePath: cloudbuild.yaml
  eventType: push
  serviceAccount: projects/my-project/serviceAccounts/my-sa@my-project.iam.gserviceaccount.com
  devConnectGitRepositoryLink: projects/my-project/locations/us-central1/connections/my-ssm-connection/gitRepositoryLinks/my-repo-link
```

## Options / Props

### Requirements

| Requirement | Detail |
|-------------|--------|
| Instance | An operational Secure Source Manager instance deployed to a Google Cloud region |
| Region | The connection and the instance must be in the same region |
| Service agent | Grant the Developer Connect service agent (P4SA) `roles/securesourcemanager.developerConnectLinker` in the Secure Source Manager instance's project |

### Required roles

| Role | Where | For |
|------|-------|-----|
| `roles/developerconnect.admin` | Project where you create Developer Connect resources | Creating a connection and linking a repository |
| `roles/resourcemanager.projectIamAdmin` | Project where Secure Source Manager runs | Granting permissions to the Developer Connect service agent |
| `roles/developerconnect.viewer` (or any role with `developerconnect.gitRepositoryLinks.get`) | Developer Connect project, granted to the Secure Source Manager service agent | Using the proxy in Cloud Build |

## Notes

- Adapted from the official docs: the curl example used the snake_case body field `secure_source_manager_instance_config`, the `connection_id` query parameter and an unquoted URL.
- Only `git` read operations (for example `clone`) are supported through the Developer Connect proxy; HTTP proxy functionality is not supported for Secure Source Manager. `git push` is not supported; the system prevents write operations that use the identity of the DevConnect P4SA.
- You can update other connection settings (for example enable or disable the proxy) but cannot point an existing connection at a different Secure Source Manager instance.
- Service-agent grants are the source's requirement; both are project-level in the source, which shows no resource-level alternative here.
- The trigger file keys come from the source; the Cloud Build trigger file schema is in the Cloud Build category of this skill.
- The source also shows Console steps (omitted).
- Source: https://docs.cloud.google.com/developer-connect/docs/connect-secure-source-manager (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [git-repo-connections.md](./git-repo-connections.md)
- [connect-github-repo.md](./connect-github-repo.md)
