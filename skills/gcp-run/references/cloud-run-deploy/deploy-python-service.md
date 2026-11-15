---
source: https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service
---

# Quickstart: Build and deploy a Python (Flask) web app to Cloud Run

Deploy a Hello World Flask app from source with one command. Cloud Run builds a container automatically (Python buildpack; see the Google Cloud buildpacks Python docs for how the default entrypoint is determined).

## Signature / Usage

### Before you begin

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

Replace `PROJECT_ID` with your project ID. Enabling APIs needs `serviceusage.services.enable` (Owner, or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`). The Compute Engine default service account is created once the Cloud Run Admin API is enabled.

Grant Cloud Run Builder (`roles/run.builder`) to the Cloud Build service account (by default the Compute Engine default service account); it takes a couple of minutes to propagate:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS \
    --role=roles/run.builder
```

Default service account email format (use the project number, not the ID):

```text
PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

### Write the sample app

Create a `helloworld` directory, then `main.py`.

Adapted (not in the official docs): `debug=True` changed to `debug=False` so the Flask debugger is never exposed; the container is served by Gunicorn and this branch is only for local runs. `host="0.0.0.0"` is kept as required for Cloud Run.

```python
import os

from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```

`requirements.txt`:

```text
Flask~=3.0
gunicorn~=23.0
Werkzeug~=3.0
```

### Deploy from source

```bash
gcloud run deploy --source .
```

Prompts: Enter for the default service name (for example `helloworld`); `y` to enable extra APIs (for example Artifact Registry); choose a region (for example `europe-west1`); `y` to create the repository; `y` to allow public access (not shown if a domain restriction policy prevents it).

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

- Adapted from the official docs: `app.run(debug=True, host="0.0.0.0", ...)` became `debug=False` (Flask debug mode exposes an interactive debugger).
- HTTP handling in the container is done by Gunicorn; the `__main__` branch only runs when invoked directly for local use.
- The `roles/run.builder` grant goes to the Cloud Build service account (by default the Compute Engine default service account, "unless you override this behavior"). To use a dedicated user-managed service account instead, pass `--build-service-account=BUILD_SERVICE_ACCOUNT` to `gcloud run deploy --source` (the flag applies only to source deploy builds) and grant `roles/run.builder` to that account rather than to the default one; see https://docs.cloud.google.com/run/docs/configuring/services/build-service-account.
- Source inconsistency: this quickstart deploys with `gcloud run deploy --source .` and no `Procfile`, relying on the Python buildpack's default entrypoint (Gunicorn); https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run says Python buildpacks require a `Procfile` or the `GOOGLE_ENTRYPOINT` build environment variable and that with `gcloud run deploy --source` only the `Procfile` method works, while https://docs.cloud.google.com/run/docs/troubleshooting sets `GOOGLE_ENTRYPOINT` with `--set-build-env-vars` on `gcloud run deploy --source`.
- Answering `y` to "allow public access" makes the service publicly accessible; use only for intentionally public content.
- Delete commands are destructive (project delete removes everything in the project); try them on a disposable resource first.
- The source also lists the full region table and Console cleanup steps.
- Source: https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/appengine/migration-center/run/compare-gae-with-run (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/run/docs/troubleshooting (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-nodejs-service.md](./deploy-nodejs-service.md)
- [deploying.md](./deploying.md)
- [containers.md](./containers.md)
