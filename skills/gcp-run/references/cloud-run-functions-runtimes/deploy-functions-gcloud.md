---
source: https://docs.cloud.google.com/run/docs/quickstarts/functions/deploy-functions-gcloud
---

# Quickstart: Deploy a Cloud Run function using the gcloud CLI

Deploy an HTTP function with the gcloud CLI: set the project, grant the Cloud Build service account the Cloud Run Builder role, write a Hello World function, deploy it from source, and clean up.

## Signature / Usage

### Set the project and grant Cloud Run Builder

```bash
gcloud config set project PROJECT_ID
```

Replace `PROJECT_ID` with your project ID. Cloud Build uses the Compute Engine default service account unless overridden; grant it the Cloud Run Builder role (`PROJECT_NUMBER-compute@developer.gserviceaccount.com` for the default account, using your project number). Propagation takes a couple of minutes.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_EMAIL_ADDRESS \
    --role=roles/run.builder
```

### Node.js function

```bash
mkdir helloworld
cd helloworld
```

`package.json`:

Adapted (not in the official docs): added `"type": "module"`, because the `index.js` below uses ES module `import` syntax; without it Node.js loads the file as CommonJS (or relies on module-syntax detection in newer Node.js versions).

```json
{
  "name": "nodejs-docs-samples-functions-hello-world-get",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "license": "Apache-2.0",
  "author": "Google Inc.",
  "repository": {
    "type": "git",
    "url": "https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "scripts": {
    "test": "c8 mocha -p -j 2 test/*.test.js --timeout=6000 --exit"
  },
  "dependencies": {
    "@google-cloud/functions-framework": "^3.1.0"
  },
  "devDependencies": {
    "c8": "^10.0.0",
    "gaxios": "^6.0.0",
    "mocha": "^10.0.0",
    "wait-port": "^1.0.4"
  }
}
```

`index.js`:

```javascript
import { http } from '@google-cloud/functions-framework';
// Register an HTTP function with the Functions Framework that executes
// when you make an HTTP request to the deployed function's endpoint.
http('helloGET', (req, res) => {
  res.send('Hello World!');
});
```

### Python function

`requirements.txt`:

```text
functions-framework==3.9.2
Flask==3.1.3; python_version >= '3.9'
google-cloud-error-reporting==1.11.1
MarkupSafe==2.1.3
```

`main.py`:

```python
import functions_framework

@functions_framework.http
def hello_get(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    Note:
        For more information on how Flask integrates with Cloud
        Functions, see the `Writing HTTP functions` page.
        <https://cloud.google.com/functions/docs/writing/http#http_frameworks>
    """
    return "Hello World!"
```

### Deploy

Run in the directory containing the sample code. Replace `REGION` with a Cloud Run region, for example `europe-west1`.

```bash
gcloud run deploy nodejs-http-function \
      --source . \
      --function helloGET \
      --base-image nodejs24 \
      --region REGION \
      --allow-unauthenticated
```

```bash
gcloud run deploy python-http-function \
      --source . \
      --function hello_get \
      --base-image python314 \
      --region REGION \
      --allow-unauthenticated
```

When deployment completes, the CLI prints the service URL; open it in a browser to see the output.

### Clean up

Delete the Artifact Registry repository (you may still be charged for stored images; see https://docs.cloud.google.com/artifact-registry/docs/manage-repos#delete), then the service:

```bash
gcloud run services delete SERVICE --region REGION
```

Deleting the whole test project:

```bash
gcloud projects delete PROJECT_ID
```

## Options / Props

| Role | On | Purpose |
| --- | --- | --- |
| `roles/run.admin` | Project | Complete the quickstart |
| `roles/run.sourceDeveloper` | Project | Deploy from source |
| `roles/iam.serviceAccountUser` | Service identity | Deploy as the service identity |
| `roles/logging.viewer` | Project | View logs |
| `roles/run.builder` | Cloud Build service account, on project | Build sources |

| `gcloud run deploy` flag | Value in the quickstart |
| --- | --- |
| `--source` | `.` (current directory) |
| `--function` | Entry point: `helloGET` (Node.js), `hello_get` (Python) |
| `--base-image` | Runtime ID, e.g. `nodejs24`, `python314` |
| `--region` | e.g. `europe-west1` |
| `--allow-unauthenticated` | Makes the function public |

## Notes

- `--allow-unauthenticated` makes the service publicly accessible; use only for intentionally public content. Under a domain restriction organization policy that restricts unauthenticated invocations, access the service as in "Testing private services" (https://docs.cloud.google.com/run/docs/triggering/https-request#testing-private).
- Destructive: `gcloud run services delete` removes all revisions of the service and `gcloud projects delete` deletes everything in the project (and loses custom project IDs, e.g. `appspot.com` URLs). Try them on a disposable project first.
- Cloud Run does not charge when a service is not in use; the Artifact Registry image can still incur storage charges.
- Corrected from the official docs: the source's `package.json` has no `"type"` field while its `index.js` uses `import { http } from '@google-cloud/functions-framework'`; `"type": "module"` is added (see nodejs.md: declare `"type": "module"` to use `import`).
- The source also shows Go, Java, Ruby, PHP and .NET samples, Console deploy and delete steps.
- The default compute service account is used for builds unless overridden; a dedicated user-managed service account is preferable (`gcp-foundation`).
- Source: https://docs.cloud.google.com/run/docs/quickstarts/functions/deploy-functions-gcloud (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [runtime-support.md](./runtime-support.md)
- [nodejs.md](./nodejs.md)
- [python.md](./python.md)
- [local-dev-functions.md](./local-dev-functions.md)
