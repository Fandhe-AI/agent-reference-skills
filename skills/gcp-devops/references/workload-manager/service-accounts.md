---
source: https://docs.cloud.google.com/workload-manager/docs/access-control/service-accounts
---

# Workload Manager service agents

Workload Manager uses service agents (Google-created and Google-managed service accounts) to control access and communication between resources and the associated projects. With the Google Cloud console, Workload Manager creates all required service agents automatically; with the Workload Manager API you must create them manually.

## Signature / Usage

### Create the service agent (API users)

Create the Workload Manager service agent in the consumer project before you create an evaluation. `PROJECT_NUMBER` is the numeric ID of the consumer project.

```bash
gcloud beta services identity create --service=workloadmanager.googleapis.com  \
    --project=PROJECT_NUMBER
```

After creating it, grant the roles in the table below. See the IAM documentation "Grant a role to the service agent" for how.

## Options / Props

### Service agent

| Item | Value |
|------|-------|
| Email (console flow, consumer project) | `service-PROJECT_NUMBER@gcp-sa-workloadmanager.iam.gserviceaccount.com`, called Workload Manager Service Account |

### Roles required to run evaluations

| Role | Where required |
|------|----------------|
| Workload Manager Service Agent (`roles/workloadmanager.serviceAgent`) | Target projects |
| Workload Manager Worker (`roles/workloadmanager.worker`) | Consumer project, only if you set a frequency for the evaluation |

### Required role to create a service agent

| Role | Permission | Where |
|------|------------|-------|
| Project Identity and Access Management (IAM) Admin (`roles/resourcemanager.projectIamAdmin`) | `resourcemanager.projects.setIamPolicy` | Each target project in scope |

## Notes

- Service agents are created at some point after you enable and use a Google Cloud API; Google often grants a predefined IAM role with the minimum required permissions on your project.
- A user who has permission to create service accounts on the target projects can create the first evaluation and the service agents; for later evaluations Workload Manager uses the existing service agent and other users don't need that permission.
- In the console, grant the roles to the service agent if prompted.
- Service agents are Google-managed identities for the service; do not grant them to your own workloads. IAM and service-agent concepts are in `gcp-foundation`.
- `gcloud beta services identity create` exists in gcloud 593.0.0 with `--service` and `--project`.
- Source: https://docs.cloud.google.com/workload-manager/docs/access-control/service-accounts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-evaluation.md](./create-evaluation.md)
- [prerequisites.md](./prerequisites.md)
- [quickstart.md](./quickstart.md)
