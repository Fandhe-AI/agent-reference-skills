---
source: https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
---

# Quickstart: Build and deploy a Node.js web app to Cloud Run

Deploy a Hello World Express app from source with one command; Cloud Run builds a container (Dockerfile or buildpacks) and deploys it.

## Signature / Usage

### Before you begin

```bash
gcloud config set project PROJECT_ID
```

Replace `PROJECT_ID` with your Google Cloud project ID. Enable the Cloud Run Admin and Cloud Build APIs (requires `serviceusage.services.enable`, for example via Owner or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`):

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

After the Cloud Run Admin API is enabled, the Compute Engine default service account is created automatically.

### Grant the Cloud Build service account access

Cloud Build uses the Compute Engine default service account unless overridden. Grant Cloud Run Builder (`roles/run.builder`) on the project (takes a couple of minutes to propagate):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS \
    --role=roles/run.builder
```

Replace `PROJECT_ID` with the project ID and `SERVICE_ACCOUNT_EMAIL_ADDRESS` with the Cloud Build service account email. For the Compute Engine default service account the format is:

```text
PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

Replace `PROJECT_NUMBER` with the project number (not the project ID).

### Write the sample app

`package.json`:

```json
{
  "name": "helloworld",
  "description": "Simple hello world sample in Node",
  "version": "1.0.0",
  "private": true,
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "author": "Google LLC",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

`index.js` (listens on the port from the `PORT` environment variable, default 8080):

```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
```

### Deploy from source

In the source directory:

```bash
gcloud run deploy --source .
```

Prompts: press Enter for the default service name (for example `helloworld`); `y` to enable extra APIs such as Artifact Registry; choose a region (for example `europe-west1`); `y` to create the repository; `y` to allow public access (the prompt may not appear if a domain restriction policy prevents it). The command prints the service URL on success.

### Clean up

```bash
gcloud run services delete SERVICE --region REGION
```

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Role | Scope |
|---|---|
| Cloud Run Admin (`roles/run.admin`) | project |
| Cloud Run Source Developer (`roles/run.sourceDeveloper`) | project |
| Service Account User (`roles/iam.serviceAccountUser`) | service identity |
| Logs Viewer (`roles/logging.viewer`) | project |

## Notes

- Answering `y` to "allow public access" makes the service publicly accessible; use only for intentionally public content.
- The service delete and project delete commands are destructive; try them on a disposable resource first. Deleting a project deletes everything in it. Artifact Registry images may still incur storage charges.
- The `roles/run.builder` grant goes to the Cloud Build service account (by default the Compute Engine default service account, "unless you override this behavior"). To use a dedicated user-managed service account instead, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account rather than to the default one; see https://docs.cloud.google.com/run/docs/configuring/services/build-service-account.
- The source also lists the full region table and Console cleanup steps.
- Source: https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-python-service.md](./deploy-python-service.md)
- [deploying.md](./deploying.md)
- [containers.md](./containers.md)
