---
source: https://docs.cloud.google.com/error-reporting/docs/setup/python
---

# Set up Error Reporting for Python

The Error Reporting library for Python (`google-cloud-error-reporting`) sends error events directly from Python applications and can capture errors even when log buckets use CMEK. On integrated services (Cloud Run functions, App Engine, Compute Engine, GKE) Error Reporting can also infer errors from Cloud Logging without the library.

## Signature / Usage

### Install the library

```bash
pip install google-cloud-error-reporting --upgrade
```

### Report errors

Authenticate with Application Default Credentials.

```python
def report_exception():
    from google.cloud import error_reporting

    client = error_reporting.Client()
    try:
        raise Exception("Something went wrong")
    except Exception:
        client.report_exception()




def report_manual_error():
    from google.cloud import error_reporting

    client = error_reporting.Client()
    client.report("An error has occurred.")




if __name__ == "__main__":
    report_exception()
    report_manual_error()
```

### GKE: create a cluster with the `cloud-platform` scope

```bash
gcloud container clusters create CLUSTER_NAME --service-account  SERVICE_ACCT_NAME --scopes=cloud-platform
```

### Local development: Application Default Credentials

```bash
gcloud auth application-default login
```

If the gcloud CLI warns that your account lacks `serviceusage.services.use`, ask an administrator for the Service Usage Consumer role (`roles/serviceusage.serviceUsageConsumer`), then run:

```bash
gcloud auth application-default set-quota-project PROJECT_ID
```

## Options / Props

### Service account requirements by environment

| Environment | Requirement |
|---|---|
| Cloud Run and Cloud Run functions | The default service account has the Error Reporting Writer role (`roles/errorreporting.writer`); the library needs no explicit credentials; configured automatically |
| App Engine flexible environment | App Engine grants `roles/errorreporting.writer` to the default service account automatically; enabled automatically; `stderr` error logs are processed without the library |
| Google Kubernetes Engine | Grant `roles/errorreporting.writer` to the container's service account (Compute Engine default or custom) and create the cluster with the `cloud-platform` access scope |
| Compute Engine | Grant `roles/errorreporting.writer` to the VM's service account and give the VM the `cloud-platform` access scope ("Allow full access to all Cloud APIs") |
| Local / outside Google Cloud | Application Default Credentials; `projects.events.report` also supports API keys (no ADC file needed) |

## Notes

- To create error groups with `projects.events.report`, the service account needs the Error Reporting Writer role (`roles/errorreporting.writer`). Some services grant it automatically; for others you must grant it.
- Error Reporting automatically creates an error event when a log entry contains a stack trace and its severity is unset or at least `ERROR`.
- For Error Reporting to infer errors from logs, entries must follow the formatting requirements and be stored in a non-CMEK log bucket owned by the originating or destination project.
- After a GKE cluster is created, its service account can't be changed. Changing the VM's access scope requires stopping the VM first.
- Reported exceptions and messages contain stack traces and message text; do not include credentials, tokens or personal data in reported messages.
- The source's Cloud Run section says "Unhandled JavaScript exceptions will appear in Logging and be processed by Error Reporting" on this Python page; the wording is as in the source.
- The sample omits the source's Apache license header. The source repeats the same code in an "Example" section and also shows Compute Engine console steps; these are not reproduced.
- Source: https://docs.cloud.google.com/error-reporting/docs/setup/python (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [formatting-error-messages.md](./formatting-error-messages.md)
- [view-and-manage-errors.md](./view-and-manage-errors.md)
