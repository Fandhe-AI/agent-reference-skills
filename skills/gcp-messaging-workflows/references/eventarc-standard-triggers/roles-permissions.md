---
source: https://docs.cloud.google.com/eventarc/docs/roles-permissions
---

# Eventarc Roles and Permissions for Cloud Run Destinations

How to grant IAM roles so Eventarc Standard can route events from Google Cloud and other sources to Cloud Run services: the principal creating triggers, the trigger service account, the Cloud Run service, and Google service agents.

## Signature / Usage

### 1. Project-wide permissions for the trigger creator

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=PRINCIPAL \
    --role=roles/eventarc.admin
```

`PRINCIPAL` has the form `PRINCIPAL_TYPE:ID`, for example `user:my-user@example.com`.

Service Account User, on the project (can impersonate multiple service accounts):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=PRINCIPAL \
    --role=roles/iam.serviceAccountUser
```

Or on a single service account (impersonate only that one):

```bash
gcloud iam service-accounts add-iam-policy-binding \
    projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@SERVICE_ACCOUNT_PROJECT_ID.iam.gserviceaccount.com \
    --member=PRINCIPAL \
    --role=roles/iam.serviceAccountUser
```

### 2. Trigger service account (user-managed, recommended)

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
    --description="DESCRIPTION" \
    --display-name="DISPLAY_NAME"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/eventarc.eventReceiver
```

### 3. Cloud Run Invoker on an authenticated service

```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
    --region=REGION \
    --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/run.invoker
```

### 4. Google service agents

Eventarc service agent, if its role was removed (otherwise granted by default on first Eventarc resource creation):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-eventarc.iam.gserviceaccount.com \
    --role=roles/eventarc.serviceAgent
```

Find the project number:

```bash
gcloud projects describe PROJECT_ID --format='value(projectNumber)'
```

Direct events from Cloud Storage, so the Cloud Storage service agent can publish to a topic:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com \
    --role=roles/pubsub.publisher
```

Pub/Sub service agent enabled on or before April 8, 2021 (otherwise granted by default), for authenticated Pub/Sub push requests:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountTokenCreator
```

## Options / Props

| Role | Role ID | Granted to | Purpose |
|---|---|---|---|
| Eventarc Admin | `roles/eventarc.admin` | Principal invoking the Eventarc APIs (trigger creator), on the project | Full control over all Eventarc resources, including specifying a service account for the trigger when you create it. |
| Service Account User | `roles/iam.serviceAccountUser` | Trigger creator, on the project or on a specific service account | Impersonate and use a service account: attach a user-managed service account to a trigger and act as the runtime service account when deploying a Cloud Run service. |
| Eventarc Event Receiver | `roles/eventarc.eventReceiver` | Trigger service account, on the project | Lets the trigger receive events from event providers. Not needed for direct events from Cloud Pub/Sub. |
| Cloud Run Invoker | `roles/run.invoker` | Trigger service account, on the Cloud Run service | Lets the trigger call an authenticated target Cloud Run service. |
| Eventarc Service Agent | `roles/eventarc.serviceAgent` | Eventarc service agent, on the project | Manage underlying transport resources and validate event sources. Granted by default on first Eventarc resource creation; restore if removed. |
| Pub/Sub Publisher | `roles/pubsub.publisher` | Cloud Storage service agent, on the project | Required for direct events from Cloud Storage. |
| Service Account Token Creator | `roles/iam.serviceAccountTokenCreator` | Pub/Sub service agent, on the project | Required only if the Pub/Sub service agent was enabled on or before April 8, 2021; otherwise granted by default. |

## Notes

- Every trigger is associated with an IAM service account at creation. If you don't specify one, the trigger uses the Compute Engine default service account.
- Caution (quoted from the source): "For production environments, we strongly recommend creating a new service account and granting it one or more IAM roles that contain the minimum permissions required. You shouldn't use the default service account since it is automatically granted the highly privileged basic Editor role." The source recommends creating your own user-managed service account for greater control and flexibility.
- Cloud Run services are deployed privately by default and are only callable by Project Owners, Project Editors, Cloud Run Admins and Cloud Run Invokers. For projects with domain restricted sharing organization policies, use an authenticated Cloud Run target service rather than one allowing public (unauthenticated) access.
- If you create a trigger for an authenticated Cloud Run service without granting Cloud Run Invoker, the trigger is created and active but does not work as expected; the logs show: `The request was not authenticated. Either allow unauthenticated invocations or set the proper Authorization header.`
- Service Account User and Eventarc Event Receiver are project-level grants in the source; the source's Service Account User also offers a service-account-level grant, which grants less. Cloud Run Invoker can optionally be granted on all Cloud Run services and jobs in a project (see the Cloud Run "Control access on all services and jobs in a project" page), which grants more.
- To attach a service account from one project to a trigger in another project, first complete the cross-project service account steps (Eventarc "Support a cross-project service account" page).
- The Event Receiver, Eventarc Service Agent, Cloud Storage service agent Pub/Sub Publisher and Pub/Sub service agent Token Creator grants above are project-level bindings in the source; the source gives no resource-level form for them.
- Service agents are Google-managed identities that let services access your resources; if an API requires one, Google creates it after you activate and use the API.
- Source: https://docs.cloud.google.com/eventarc/docs/roles-permissions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-triggers.md](./managing-triggers.md)
- [create-trigger-pub-sub-gcloud.md](./create-trigger-pub-sub-gcloud.md)
- [create-trigger-cloud-audit-logs-gcloud.md](./create-trigger-cloud-audit-logs-gcloud.md)
