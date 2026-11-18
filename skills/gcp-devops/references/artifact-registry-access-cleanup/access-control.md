---
source: https://docs.cloud.google.com/artifact-registry/docs/access-control
---

# Artifact Registry access control

Artifact Registry uses IAM roles to control who can create, view, edit or delete data in a repository. Roles can be granted on the Google Cloud project (all repositories) or on a single repository. Google Cloud services in the same project get default access; cross-project access, user-provided service accounts and third-party clients need explicit grants.

## Signature / Usage

### Grant a role on a repository (preferred when access differs per repository)

```bash
gcloud artifacts repositories add-iam-policy-binding REPOSITORY \
   --location=LOCATION \
   --member=PRINCIPAL \
   --role=ROLE
```

```bash
gcloud artifacts repositories add-iam-policy-binding my-repo \
--location=us-west1 --member=user:write@gmail.com --role=roles/artifactregistry.writer
```

### Grant a role on the project (same role for all repositories)

```bash
gcloud projects add-iam-policy-binding PROJECT \
   --member=PRINCIPAL \
   --role=ROLE
```

`PRINCIPAL` uses the form `user|group|serviceAccount:email` or `domain:domain`, for example `user:test-user@gmail.com`, `group:admins@example.com`, `serviceAccount:test123@example.domain.com`, `domain:example.domain.com`. For policy-file based changes use `gcloud artifacts repositories get-iam-policy` / `set-iam-policy` (see the IAM "Grant or revoke multiple roles programmatically" page).

### Revoke roles

```bash
gcloud projects remove-iam-policy-binding PROJECT \
   --member=PRINCIPAL \
   --role=ROLE
```

Adapted (not in the official docs): added the missing `\` line continuation after `REPOSITORY`.

```bash
gcloud artifacts repositories remove-iam-policy-binding REPOSITORY \
   --location=LOCATION \
   --member=PRINCIPAL \
   --role=ROLE
```

```bash
gcloud artifacts repositories remove-iam-policy-binding my-repo \
   --location=us-west1 \
   --member=user:write@gmail.com \
   --role=roles/artifactregistry.writer
```

### Public read-only access (opens the repository to the whole internet)

```bash
gcloud artifacts repositories add-iam-policy-binding my-repo \
 --location=us-west1 --member=allUsers --role=roles/artifactregistry.reader
```

Revoke public access by removing `allUsers`:

```bash
gcloud artifacts repositories remove-iam-policy-binding my-repo \
   --location=us-west1 \
   --member=allUsers \
   --role=roles/artifactregistry.reader
```

### Compute Engine access scope (VM needs both IAM role and storage scope)

```bash
gcloud compute instances set-service-account INSTANCE --scopes=SCOPE
```

### GKE access scopes (set only at cluster / node pool creation)

```bash
gcloud container clusters create NAME --scopes=SCOPES
```

```bash
gcloud container node-pools create NAME --scopes=SCOPES
```

### GKE imagePullSecret (only for GKE versions without built-in pull support)

```bash
kubectl create secret docker-registry artifact-registry \
--docker-server=https://LOCATION-docker.pkg.dev \
--docker-email=SERVICE-ACCOUNT-EMAIL \
--docker-username=_json_key \
--docker-password="$(cat KEY-FILE)"
```

```bash
kubectl edit serviceaccount default --namespace default
```

```yaml
imagePullSecrets:
- name: artifact-registry
```

## Options / Props

### Predefined roles (repositories on the `pkg.dev` domain)

| Role | Description |
|---|---|
| Artifact Registry Reader (`roles/artifactregistry.reader`) | View and get artifacts, view repository metadata. |
| Artifact Registry Writer (`roles/artifactregistry.writer`) | Read and write artifacts. |
| Artifact Registry Repository Administrator (`roles/artifactregistry.repoAdmin`) | Read, write, and delete artifacts. |
| Artifact Registry Administrator (`roles/artifactregistry.admin`) | Create and manage repositories and artifacts. |

### Container Registry migration roles

| Role | Description |
|---|---|
| Container Registry -\> Artifact Registry Migration Admin (`roles/artifactregistry.containerRegistryMigrationAdmin`) | Includes all permissions required to run migration tooling |
| Artifact Registry Create-on-push Writer (`roles/artifactregistry.createOnPushWriter`) | Read and write artifacts. Create gcr.io repositories when you push to `gcr.io` URLs. |
| Artifact Registry Create-on-push Repository Administrator (`roles/artifactregistry.createOnPushRepoAdmin`) | Read, write, and delete artifacts. Create gcr.io repositories. |

### Service accounts that typically access Artifact Registry

| Service | Service account | Email address |
|---|---|---|
| App Engine flexible environment | App Engine service account | `PROJECT-ID@appspot.gserviceaccount.com` |
| Compute Engine | Compute Engine default service account | `PROJECT-NUMBER-compute@developer.gserviceaccount.com` |
| Cloud Build | Compute Engine default service account or legacy Cloud Build service account (depends on organizational settings; the default for running builds changed from the legacy Cloud Build service account to the Compute Engine default service account) | `PROJECT-NUMBER-compute@developer.gserviceaccount.com` or `PROJECT-NUMBER@cloudbuild.gserviceaccount.com` |
| Cloud Run | Cloud Run service agent for `run.googleapis.com` | `service-PROJECT-NUMBER@serverless-robot-prod.iam.gserviceaccount.com` |
| GKE | Compute Engine default service account (default for nodes) | `PROJECT-NUMBER-compute@developer.gserviceaccount.com` |

### Access scopes

| Scope | Meaning |
|---|---|
| `storage-ro` | Docker: read permission only for pulling images. |
| `storage-rw` | Docker: read and write permission for pushing or pulling images. |
| `cloud-platform` | View and manage data, including metadata, across Google Cloud services. Required for all non-Docker formats. |

## Notes

- Grant at the project level only when the same roles apply to all repositories; otherwise grant at the repository level. Roles granted on a virtual repository apply to all upstream repositories available through it, regardless of individual repository permissions.
- Default permissions: Cloud Build can upload and download artifacts; Compute Engine and supported GKE versions use the Compute Engine default service account, which has read-only access to storage. Cloud Run pulls images at deployment with the Cloud Run service agent (`service-PROJECT-NUMBER@serverless-robot-prod.iam.gserviceaccount.com`, the table above); the source groups Cloud Run with the Compute Engine default service account here, which describes the default runtime identity, not the account that pulls the image. In the same project with default permissions no configuration is needed. Configure roles yourself for cross-project access (grant the workload identity pool, service account or, for Cloud Run, the Cloud Run Service Agent in the project with Artifact Registry), unsupported GKE versions, read/write for the default service account, or a user-provided service account.
- Prefer predefined roles. Basic roles are highly permissive and should not be granted in production (development or test only).
- Default service accounts may automatically get the Editor role depending on organization policy. The source strongly recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` constraint (enforced by default for organizations created after May 3, 2024) and replacing Editor with less permissive roles, checked with Policy Simulator. Prefer user-provided service accounts with narrowly scoped repository-level roles over the default service accounts.
- Third-party clients need both permissions and authentication. Prefer Workload Identity Federation (create pool and provider, grant the Artifact Registry role to the pool, optionally lengthen the OIDC token expiration, then configure the client); otherwise use a service account. Service account keys are long-lived credentials and a security risk; the source says to choose a more secure alternative whenever possible, and the `imagePullSecret` flow above uses a key file (`_json_key`): never commit the key file or secret manifest. The `kubectl create secret ... --docker-password="$(cat KEY-FILE)"` command puts the key on the command line, where it can appear in the process list and shell history; delete the key file when no longer needed. GitLab on Google Cloud uses Workload Identity Federation (see the GitLab tutorials linked in the source).
- Public access: granting Artifact Registry Reader to `allUsers` makes every artifact in the repository downloadable by anyone on the internet without authentication; `allAuthenticatedUsers` limits it to any Google Cloud account holder. Verify the artifacts are sharable and contain no credentials, personal or confidential data; cap per-user API request quotas to prevent misuse (by default projects have unlimited per-user quotas); you are charged for network data transfer on downloads. To remove public access, remove the `allUsers` principal.
- Compute Engine: the VM needs both an IAM role and a storage access scope. The default scopes include read-only storage, so the instance can only download artifacts from repositories in the same project even with the Editor role. Stop the VM, run `set-service-account` with the scope, then restart it. For formats other than Docker use `cloud-platform`. The `--zone` flag may be needed for `set-service-account` (help: `INSTANCE_NAME [--zone=ZONE]`).
- GKE pulls work without configuration when GKE is in the same project, nodes use the Compute Engine default service account, nodes have storage read access (default scopes or `cloud-platform`) and the GKE version is supported. Access scopes can only be set when creating a cluster or node pool and cannot be changed on existing nodes. With a user-provided service account, `cloud-platform` is granted by default; if you pass `--scopes`, include the appropriate Artifact Registry scopes. `imagePullSecrets` is needed only for unsupported GKE versions. The source's example `ServiceAccount` manifest (with a `...` elision) is omitted.
- Tags: attach Resource Manager tags to repositories (not to individual artifacts) and use them in IAM conditions for conditional access.
- Artifact Analysis container metadata access is documented in the Artifact Analysis docs; download rules are a separate (Preview) feature, see `protect-artifacts.md`.
- Omitted from the source: Console steps, Terraform (`google_artifact_registry_repository_iam`), and links for per-format client authentication.
- Corrected from the official docs: the source writes `gcloud artifacts repositories remove-iam-policy-binding REPOSITORY` followed by a newline and `--location=LOCATION \` with no `\` after `REPOSITORY`; the continuation was added.
- Source: https://docs.cloud.google.com/artifact-registry/docs/access-control (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [protect-artifacts.md](./protect-artifacts.md)
- [cmek.md](./cmek.md)
- [securing-with-vpc-sc.md](./securing-with-vpc-sc.md)
- [cleanup-policy.md](./cleanup-policy.md)
