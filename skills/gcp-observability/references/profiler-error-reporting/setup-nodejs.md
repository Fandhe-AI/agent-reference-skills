---
source: https://docs.cloud.google.com/error-reporting/docs/setup/nodejs
---

# Set up Error Reporting for Node.js

The Error Reporting library for Node.js (`@google-cloud/error-reporting`) sends error events directly from Node.js applications and can capture errors even when log buckets use CMEK. On integrated services (Cloud Run functions, App Engine, Compute Engine, GKE) Error Reporting can also infer errors from Cloud Logging without the library.

## Signature / Usage

### Install the library

```text
   npm install @google-cloud/error-reporting
```

### Report errors

Import the library, instantiate a client and report. Configuration options are passed in the `options` object of the constructor (see the library's `src/configuration.ts`).

```javascript
// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
const errors = new ErrorReporting();

// Reports a simple error
errors.report('Something broke!');
```

### Report an error event, an Error object or a string

```javascript
// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
const errors = new ErrorReporting();

// Use the error message builder to customize all fields ...
const errorEvent = errors.event();

// Add error information
errorEvent.setMessage('My error message');
errorEvent.setUser('root@nexus');

// Report the error event
errors.report(errorEvent, () => {
  console.log('Done reporting error event!');
});

// Report an Error object
errors.report(new Error('My error message'), () => {
  console.log('Done reporting Error object!');
});

// Report an error by provided just a string
errors.report('My error message', () => {
  console.log('Done reporting error string!');
});
```

### Express.js

Attach `errors.express` after all other routes and `use()` calls.

```javascript
const express = require('express');

// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
const errors = new ErrorReporting();

const app = express();

app.get('/error', (req, res, next) => {
  res.send('Something broke!');
  next(new Error('Custom error message'));
});

app.get('/exception', () => {
  JSON.parse('{"malformedJson": true');
});

// Note that express error handling middleware should be attached after all
// the other routes and use() calls. See the Express.js docs.
app.use(errors.express);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
```

### Local development or explicit credentials

Run `gcloud auth application-default login` for user credentials (not needed in Cloud Shell). The `report` method also supports API keys (no ADC file needed).

```bash
gcloud auth application-default login
```

If the gcloud CLI warns that your account lacks `serviceusage.services.use`, ask an administrator for the Service Usage Consumer role (`roles/serviceusage.serviceUsageConsumer`), then run:

```bash
gcloud auth application-default set-quota-project PROJECT_ID
```

The source's example passes `projectId` and `keyFilename`:

```javascript
// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
const errors = new ErrorReporting({
  projectId: 'your-project-id',
  keyFilename: '/path/to/key.json',
});

// Reports a simple error
errors.report('Something broke!');
```

### GKE: create a cluster with the `cloud-platform` scope

```bash
gcloud container clusters create CLUSTER_NAME --service-account  SERVICE_ACCT_NAME --scopes=cloud-platform
```

## Options / Props

### Service account requirements by environment

| Environment | Requirement |
|---|---|
| Cloud Run and Cloud Run functions | The default service account has the Error Reporting Writer role (`roles/errorreporting.writer`); the library needs no explicit credentials; configured automatically, unhandled JavaScript exceptions appear in Logging and are processed by Error Reporting |
| App Engine flexible environment | App Engine grants `roles/errorreporting.writer` to the default service account automatically; enabled automatically; `stderr` error logs are processed without the library |
| Google Kubernetes Engine | Grant `roles/errorreporting.writer` to the container's service account (Compute Engine default or custom) and create the cluster with the `cloud-platform` access scope |
| Compute Engine | Grant `roles/errorreporting.writer` to the VM's service account and give the VM the `cloud-platform` access scope ("Allow full access to all Cloud APIs") |
| Local / outside Google Cloud | Application Default Credentials; API keys also supported by `projects.events.report` |

## Notes

- To create error groups with `projects.events.report`, the service account needs the Error Reporting Writer role (`roles/errorreporting.writer`). Some services grant it automatically; for others you must grant it.
- Error Reporting automatically creates an error event when a log entry contains a stack trace and its severity is unset or at least `ERROR`.
- For Error Reporting to infer errors from logs, entries must follow the formatting requirements and be stored in a non-CMEK log bucket owned by the originating or destination project.
- After a GKE cluster is created, its service account can't be changed. Changing a VM's access scope requires stopping the VM first.
- `errors.setUser('root@nexus')` and reported messages are stored with the error event; do not include credentials, tokens or personal data in reported messages, and do not attach request headers or bodies. The Express sample reports only the error and its stack.
- The Cloud Run and API-key samples in the source use `keyFilename` pointing to a service account key file; prefer Application Default Credentials where possible, and keep key files out of source control with restricted file permissions. The two identical samples are kept as one.
- The `gcloud container clusters create` command uses `--service-account` and `--scopes`, both present in the gcloud 593.0.0 GA help. The `error-reporting` gcloud group is beta-only in gcloud 593.0.0 and is not used here.
- The source also shows Compute Engine console steps, which are not reproduced.
- Source: https://docs.cloud.google.com/error-reporting/docs/setup/nodejs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [setup-python.md](./setup-python.md)
- [formatting-error-messages.md](./formatting-error-messages.md)
- [view-and-manage-errors.md](./view-and-manage-errors.md)
