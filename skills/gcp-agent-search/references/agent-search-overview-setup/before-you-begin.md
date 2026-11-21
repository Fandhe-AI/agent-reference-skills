---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/before-you-begin
---

# Before you begin with Agent Search

Basic start-up tasks to complete before using Agent Search (formerly Vertex AI Search; the API is Discovery Engine): create a Google Cloud project with billing enabled, install and initialize the gcloud CLI if you use the API, turn on the Agent Search service, and grant the Discovery Engine Admin role.

## Signature / Usage

### Initialize the gcloud CLI (API use)

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (the twin for this page has no code block):

```bash
gcloud init
```

### Turn on Agent Search (console)

1. In the Google Cloud console, go to the **AI Applications** page (`https://console.cloud.google.com/gen-app-builder/start`).
2. Optional: click **Allow Google to selectively sample model input and responses**.
3. Optional: review the terms for data use.
4. Click **Continue and activate the API**.

### Grant access (console)

- Select the project that contains the Agent Search engine.
- When selecting a role, enter **Discovery Engine** in the filter, then click **Discovery Engine Admin**.
- Project owners automatically have the Discovery Engine Admin role for that project (see Notes).

## Notes

- Project-level access control: to grant access with the console, grant the Discovery Engine Admin role (`roles/discoveryengine.admin`) to a principal for the project that contains the Agent Search engine. Other users, groups and service accounts: see access-control.md.
- Project owners: the source says "If you are an owner of the project, you automatically have the Discovery Engine Admin role for that project." Read this as the access an owner (`roles/owner`) has; the source does not say that a `roles/discoveryengine.admin` binding is added to the project's IAM policy. When you audit or remove this access, check `roles/owner` bindings as well as `roles/discoveryengine.admin` bindings.
- Grant Discovery Engine Admin only to principals that need full access to all Discovery Engine resources; the narrower Editor, User and Viewer roles are described in access-control.md.
- For API use, see authentication.md ("Set up authentication on Google Cloud") for authentication and access control.
- The source shows only Console steps (and links to the gcloud install / initialize pages).
- Name: the console page is called "AI Applications"; Agent Search was formerly Vertex AI Search.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/before-you-begin (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [access-control.md](./access-control.md)
