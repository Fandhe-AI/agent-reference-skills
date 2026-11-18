---
source: https://docs.cloud.google.com/build/docs/cloud-build-service-account
---

# Cloud Build default service accounts

Depending on organization settings, Cloud Build may run builds as the Compute Engine default service account or as the legacy Cloud Build service account. Both may have unnecessarily broad permissions; the recommended practice (least privilege) is to create and specify your own user-managed service account for builds. This page documents the two default accounts, the permissions the legacy account holds, how trigger access to a service account works, and the limitations of the legacy account.

## Signature / Usage

### Specify your own service account for builds (recommended)

A `serviceAccount` in a build config needs a logging setup (`logsBucket` with `GCS_ONLY`, or `CLOUD_LOGGING_ONLY`).

```yaml
steps:
- name: 'bash'
  args: ['echo', 'Hello world!']
logsBucket: 'LOGS_BUCKET_LOCATION'
serviceAccount: 'projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT'
options:
  logging: GCS_ONLY
```

## Options / Props

### Default service account email addresses

| Account | Email |
|---|---|
| Compute Engine default service account | `PROJECT_NUMBER-compute@developer.gserviceaccount.com` |
| Legacy Cloud Build service account | `PROJECT_NUMBER@cloudbuild.gserviceaccount.com` |

### Permissions in `roles/cloudbuild.builds.builder` (legacy Cloud Build service account)

| Permission | Description | Purpose |
|---|---|---|
| `cloudbuild.builds.create` | Can create builds and triggers | Use build triggers; create, list, get, or cancel builds |
| `cloudbuild.builds.update` | Can update builds and triggers | Use build triggers; create, list, get, or cancel builds |
| `cloudbuild.builds.list` | Can list builds and triggers | Use build triggers; create, list, get, or cancel builds |
| `cloudbuild.builds.get` | Can get a build and a trigger | Use build triggers; create, list, get, or cancel builds |
| `cloudbuild.workerpools.use` | Can use a private pool | Run builds in a private pool |
| `logging.logEntries.create` | Can write logs | Create and list build logs in Cloud Logging |
| `logging.logEntries.list` | Can list logs | Create and list build logs in Cloud Logging |
| `logging.views.access` | Can view logs | Create and list build logs in Cloud Logging |
| `pubsub.topics.create` | Can create Pub/Sub topics | Push build updates to Pub/Sub |
| `pubsub.topics.publish` | Can publish to Pub/Sub | Push build updates to Pub/Sub |
| `remotebuildexecution.blobs.get` | Can get access to approve or reject builds | Approve or reject pending builds |
| `resourcemanager.projects.get` | Can get project information | Approve or reject pending builds |
| `resourcemanager.projects.list` | Can list projects | Approve or reject pending builds |
| `source.repos.get` | Can read source code from repositories in Cloud Source Repositories | Use Bitbucket and Cloud Source Repositories triggers; pull source from Cloud Source Repositories |
| `source.repos.list` | Can list repositories in Cloud Source Repositories | Use Bitbucket and Cloud Source Repositories triggers; pull source from Cloud Source Repositories |
| `storage.buckets.create` | Can create Cloud Storage buckets | Store and get artifacts in Cloud Storage; submit builds with `gcloud builds submit`; store build logs in a user-created logs bucket |
| `storage.buckets.get` | Can get Cloud Storage buckets | Same as `storage.buckets.create` |
| `storage.buckets.list` | Can list Cloud Storage buckets | Same as `storage.buckets.create` |
| `storage.objects.list` | Can list Cloud Storage objects | Same as `storage.buckets.create` |
| `storage.objects.update` | Can update Cloud Storage objects | Same as `storage.buckets.create` |
| `storage.objects.create` | Can write Cloud Storage objects | Same as `storage.buckets.create` |
| `storage.objects.delete` | Can delete Cloud Storage objects | Same as `storage.buckets.create` |
| `storage.objects.get` | Can read Cloud Storage objects | Same as `storage.buckets.create` |
| `artifactregistry.repositories.uploadArtifacts` | Can upload artifacts to repositories in Artifact Registry | Manage artifacts in Artifact Registry |
| `artifactregistry.repositories.downloadArtifacts` | Can download artifacts from a repository in Artifact Registry | Manage artifacts in Artifact Registry |
| `artifactregistry.aptartifacts.create` | Can upload Apt artifacts | Manage artifacts in Artifact Registry |
| `artifactregistry.dockerimages.get` | Can get Docker images | Manage artifacts in Artifact Registry |
| `artifactregistry.dockerimages.list` | Can list Docker images | Manage artifacts in Artifact Registry |
| `artifactregistry.kfpartifacts.create` | Can upload a KFP artifact | Manage artifacts in Artifact Registry |
| `artifactregistry.locations.get` | Can get information about a location | Manage artifacts in Artifact Registry |
| `artifactregistry.locations.list` | Can list supported locations | Manage artifacts in Artifact Registry |
| `artifactregistry.mavenartifacts.get` | Can get Maven packages | Manage artifacts in Artifact Registry |
| `artifactregistry.mavenartifacts.list` | Can list Maven packages | Manage artifacts in Artifact Registry |
| `artifactregistry.npmpackages.get` | Can get npm packages | Manage artifacts in Artifact Registry |
| `artifactregistry.npmpackages.list` | Can list npm packages | Manage artifacts in Artifact Registry |
| `artifactregistry.projectsettings.get` | Can get project settings | Manage artifacts in Artifact Registry |
| `artifactregistry.pythonpackages.get` | Can get Python packages | Manage artifacts in Artifact Registry |
| `artifactregistry.pythonpackages.list` | Can list Python packages | Manage artifacts in Artifact Registry |
| `artifactregistry.yumartifacts.create` | Can upload Yum artifacts | Manage artifacts in Artifact Registry |
| `artifactregistry.repositories.createOnPush` | Can create a gcr.io repository in Artifact Registry the first time an image is pushed to a gcr.io hostname in the project | Manage artifacts in Artifact Registry |
| `artifactregistry.repositories.get` | Can get a repository | Manage artifacts in Artifact Registry |
| `artifactregistry.repositories.list` | Can list repositories | Manage artifacts in Artifact Registry |
| `artifactregistry.repositories.listEffectiveTags` | Can list tags for artifacts | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.repositories.listTagBindings` | Can list tag binding information for artifacts | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.tags.create` | Can create tags | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.tags.get` | Can get tags | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.tags.list` | Can list tags | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.tags.update` | Can update tags | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.versions.list` | Can list versions | Manage tags for artifacts in Artifact Registry |
| `artifactregistry.versions.get` | Can get versions | Manage tags for artifacts in Artifact Registry |
| `containeranalysis.occurrences.create` | Can create an Artifact Analysis occurrence | Not used by the Cloud Build service account; included for backwards compatibility |
| `containeranalysis.occurrences.delete` | Can delete an Artifact Analysis occurrence | Not used; included for backwards compatibility |
| `containeranalysis.occurrences.get` | Can get an Artifact Analysis occurrence | Not used; included for backwards compatibility |
| `containeranalysis.occurrences.list` | Can list Artifact Analysis occurrences | Not used; included for backwards compatibility |
| `containeranalysis.occurrences.update` | Can update Artifact Analysis occurrences | Not used; included for backwards compatibility |

### User access to triggers

| Trigger service account type | Who can create and directly run a trigger | Who can update a trigger |
|---|---|---|
| Legacy Cloud Build service account (if enabled) | Any user with the Cloud Build Editor role | Any user with the Cloud Build Editor role, as long as the trigger uses the legacy service account |
| User-specified service account or the Compute Engine default service account | Any user with the Cloud Build Editor role who has the `iam.serviceAccounts.actAs` permission | Any user with the Cloud Build Editor role who has `iam.serviceAccounts.actAs` on both the previously configured and the new service account |

## Notes

- Source: https://docs.cloud.google.com/build/docs/cloud-build-service-account (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source states the default service account for builds changed and recommends specifying your own service account; see the Cloud Build default service account change page at https://docs.cloud.google.com/build/docs/cloud-build-service-account-updates. Use the legacy and Compute Engine default accounts only where an organization requires them.
- Snippet taken from https://docs.cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts (build config with a user-specified service account).
- If project settings allow the legacy service account, it is granted `roles/cloudbuild.builds.builder` (Cloud Build Service Account) for the project's resources. The account uses these permissions only as required to run a build; revoke permissions for actions your builds do not perform (least privilege).
- Whether Cloud Build uses the Compute Engine default or the legacy account depends on organization policies (which account is "the default Cloud Build service account").
- The legacy Cloud Build service account is owned by Google and is not user managed: you cannot add an IAM policy binding on it, so no other principal (for example another service account) can be granted `roles/iam.serviceAccountTokenCreator` on it to generate access, ID, or JWT tokens.
- Limitations of the legacy account: it cannot generate ID tokens, so service-to-service authentication (for example invoking Cloud Run functions, Cloud Run, or App Engine from a build) requires a user-specified service account; see https://docs.cloud.google.com/build/docs/securing-builds/authorize-service-to-service-access.
- When creating a build trigger you choose the service account used to run its builds; each trigger can use a different one. The exception is a project where the legacy account is enabled: triggers default to it when no other account is selected.
- If the same service account both triggers and runs a build, it still needs `iam.serviceAccounts.actAs`. Corrected from the official docs: the source note writes `iam.serviceAccount.actAs` (without the `s`), while the rest of the page and the IAM permission name use `iam.serviceAccounts.actAs`. Grant the permission through a predefined role such as Service Account User (`roles/iam.serviceAccountUser`) or a custom role.
- Build-time privileges of triggers: the service account configured for a trigger can give elevated build-time permissions to users who invoke builds through it (legacy and user-specified alike). A user with no access to the Google Cloud project but with write access to the connected repository can change the code being built by pushing to it.
- GitHub pull request triggers: any user with read access to the repository can submit a pull request that may trigger a build including the PR's code. Choose the **Comment control** option when creating the trigger so a build starts only when a repository owner or collaborator comments `/gcbrun`. Do not remove comment control from a trigger that builds untrusted pull requests.
- The remotebuildexecution/resourcemanager rows in the source table share one rowspan purpose ("Required to approve or reject pending builds"); the three rows are expanded here.
- The source table repeats "Required to: ..." lists per row; they are abbreviated above with "Same as". The Cloud Source Repositories permissions refer to a service that is End of Sale (unavailable to new customers since June 17, 2024).
- Compute Engine documents its default service account separately: https://docs.cloud.google.com/compute/docs/access/service-accounts#default_service_account. IAM, service accounts and `actAs` are covered by the `gcp-foundation` skill.

## Related

- [configure-user-specified-service-accounts.md](./configure-user-specified-service-accounts.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
