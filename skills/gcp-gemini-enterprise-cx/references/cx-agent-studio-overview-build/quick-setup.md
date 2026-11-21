---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup
---

# CX Agent Studio Setup

Required setup steps to start using CX Agent Studio: a Google Cloud project with billing, the Gemini Enterprise for Customer Experience API and the Customer Experience Insights API enabled, optional audit logs, and (only if you use the API) the gcloud CLI, authentication and a client library.

## Signature / Usage

### Initialize the gcloud CLI

```bash
gcloud init
```

### User account credentials for REST calls

```bash
gcloud auth login
```

### Application default credentials for client libraries

```bash
gcloud auth application-default login
gcloud auth application-default set-quota-project PROJECT_ID
```

### Cleanup

```bash
gcloud auth revoke
```

```bash
gcloud auth application-default revoke
```

## Notes

- Roles: selecting a project needs no specific IAM role; creating a project needs the Project Creator role (`roles/resourcemanager.projectCreator`, containing `resourcemanager.projects.create`); enabling APIs needs the `serviceusage.services.enable` permission, for example through Service Usage Admin (`roles/serviceusage.serviceUsageAdmin`) or the Owner role (`roles/owner`) if you created the project.
- APIs to enable: Gemini Enterprise for Customer Experience API (`ces.googleapis.com`) and the Customer Experience Insights API (`contactcenterinsights.googleapis.com`; the console text calls it "Contact Center AI Insights API").
- Enabling Data Access audit logs for the Gemini Enterprise for Customer Experience API can be skipped for non-production agent applications; together with Versions they track design-time changes.
- Installing the gcloud CLI, authentication and the client library can be skipped if you won't use the API. If you use an external identity provider, sign in to the gcloud CLI with your federated identity first.
- In Cloud Shell you are already logged in to gcloud. `GOOGLE_APPLICATION_CREDENTIALS` must not be set for application default credentials to be used by client libraries.
- If you created the project with your user account you have the Owner basic role, which allows calling any API for the project; the source does not present this as a recommendation, so prefer granting narrower roles to other principals.
- `gcloud auth login` and `gcloud auth application-default login` store credentials in your user directory; the revoke commands remove them.
- The source also shows Console steps and links to the client libraries page.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/quick/setup (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quick-create-agent.md](./quick-create-agent.md)
- [cx-agent-studio.md](./cx-agent-studio.md)
