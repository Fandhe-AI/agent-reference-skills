---
source: https://docs.cloud.google.com/batch/docs/get-started
---

# Get started with Batch

Batch (Batch for Google Cloud, `batch.googleapis.com`) is a fully managed service that schedules, queues and executes batch processing workloads (HPC, ML, data processing) on Google Cloud resources. You specify the resources a workload needs; Batch provisions them, queues the job and deletes the resources afterwards. This page covers the components, restrictions and the project and user prerequisites.

## Signature / Usage

### Set up the gcloud CLI for the examples

```bash
gcloud init
```

Recommended: set a default project.

```bash
gcloud config set project PROJECT_ID
```

Replace `PROJECT_ID` with the project ID of your project. If you use an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity. For API or client library examples see [authentication.md](./authentication.md).

### Batch service agent

After you create a Batch job, the service agent is created automatically with this name (replace `PROJECT_NUMBER` with the project number):

```text
service-PROJECT_NUMBER@gcp-sa-cloudbatch.iam.gserviceaccount.com
```

## Options / Props

### Components

| Component | Meaning |
|---|---|
| Job | A scheduled program that runs a set of tasks to completion without user interaction; an array of one or more tasks plus the environment to run them in. |
| Task | One execution of a job's sequence of runnables; use the task index environment variable to vary each execution. |
| Runnable | An executable script or container defined as part of a job. |
| Resources | Infrastructure for the job. Minimum: compute resources per task (CPU cores, memory, optional extra boot disk). Each job runs on a regional managed instance group (MIG) of matching Compute Engine VMs, each in one of the included zones. |

### Restrictions

| Restriction | Detail |
|---|---|
| Quotas | Cannot exceed the Batch quotas and limits for the project (see [quotas.md](./quotas.md)). |
| Machine series (General-purpose) | C4, C4A, C4D, C3, C3D, E2, N4, N4A, N2D, N2, N1, T2D |
| Machine series (Compute-optimized) | C2, C2D, H3 |
| Machine series (Memory-optimized) | M3, M2, M1 |
| Machine series (Accelerator-optimized) | A4, A3 Ultra, A3 Mega, A3 High, A2, G4, G2 |
| Task groups | Only one task group per job; every job has one task group named `group0`. |

### Enable Batch for a project

- Select or create a project (creating needs Project Creator, `roles/resourcemanager.projectCreator`) and verify billing is enabled.
- Enable the Batch, Compute Engine and Cloud Logging APIs (`batch.googleapis.com`, `compute.googleapis.com`, `logging.googleapis.com`). Enabling needs `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
- Make sure the project has service account(s) with permissions to create and access the job resources. Users who create jobs must be allowed to use one of these service accounts, so do not pick service accounts with more permissions than you want to grant those users.
- Roles for the job service account (unless you use only the default configuration):

| Role | Where | Purpose |
|---|---|---|
| Batch Agent Reporter (`roles/batch.agentReporter`) | project | Required for the job's VMs to report to Batch |
| Logs Writer (`roles/logging.logWriter`) | project | Let jobs write logs to Cloud Logging |

- The Batch service agent automatically gets Google Batch Service Agent (`roles/batch.serviceAgent`), required for Batch to work. Some use cases (for example a Shared VPC network) need additional permissions on the service agent.

### Roles for a new user

| Task | Role |
|---|---|
| Create jobs | Batch Job Editor (`roles/batch.jobsEditor`) on the project; Service Account User (`roles/iam.serviceAccountUser`) on the job's service account (default: Compute Engine default service account) |
| List and describe jobs | Batch Job Editor or Batch Job Viewer (`roles/batch.jobsViewer`) on the project |
| View job logs | Logs Viewer (`roles/logging.viewer`) on the project |
| Delete jobs | Batch Job Editor on the project |

## Notes

- Jobs default to the Compute Engine default service account, which is granted the Editor role (`roles/editor`) by default; Editor is not recommended for production environments. Prefer a custom service account with least privilege.
- Warning from the source: do not revoke the roles automatically granted to the Batch service agent, otherwise Batch might not work.
- Caution from the source: the Batch service agent is used for creating all Batch jobs, so any permission granted to it can be used by any principal in the project that can create Batch jobs.
- There is no additional cost for Batch; you pay only for the underlying resources. See the Batch pricing page.
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Job lifetime: see [create-run-job.md](./create-run-job.md). The source also shows Console steps for project setup (omitted).
- Source: https://docs.cloud.google.com/batch/docs/get-started (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Permissions in the roles above (from the IAM roles reference, not from the Batch page): `roles/batch.agentReporter` grants `batch.states.report` (see the `iam/batch.md` page of this skill); `roles/logging.logWriter` grants `logging.logEntries.create` and `logging.logEntries.route`; `roles/iam.serviceAccountUser` grants `iam.serviceAccounts.actAs` (plus `iam.serviceAccounts.get` / `list`).
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/logging and https://docs.cloud.google.com/iam/docs/roles-permissions/iam (retrieved 2026-11-14)

## Related

- [create-run-job.md](./create-run-job.md)
- [create-run-example-job.md](./create-run-example-job.md)
- [authentication.md](./authentication.md)
- [quotas.md](./quotas.md)
