---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/query
---

# Query Managed Service for Prometheus data (metrics scopes and Grafana)

All query interfaces for Google Cloud Managed Service for Prometheus read from Monarch through the Cloud Monitoring API, so queries are global rather than per local Prometheus server. What you can query is set by the metrics scope; Grafana needs the data source syncer to authenticate with OAuth2 against the Monitoring API.

## Signature / Usage

### Configure the environment

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud container clusters get-credentials CLUSTER_NAME --location LOCATION --project PROJECT_ID
```

On non-GKE clusters select the target cluster with `kubectl config use-context CONTEXT_NAME` (check it with `kubectl config current-context`); create the test namespace with `kubectl create ns NAMESPACE_NAME` (the docs suggest `gmp-test`).

### Service account for Workload Identity Federation for GKE

Skip if the cluster does not use Workload Identity Federation for GKE. On GKE without it, the Compute Engine default service account is used; if its `monitoring.metricWriter` or `monitoring.viewer` grant was removed, re-add it first.

```bash
gcloud config set project PROJECT_ID \
&&
gcloud iam service-accounts create gmp-test-sa
```

```bash
gcloud config set project PROJECT_ID \
&&
gcloud iam service-accounts add-iam-policy-binding \
  --role roles/iam.workloadIdentityUser \
  --condition=None \
  --member "serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE_NAME/default]" \
  gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
&&
kubectl annotate serviceaccount \
  --namespace NAMESPACE_NAME \
  default \
  iam.gke.io/gcp-service-account=gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com
```

Grant read access to Monitoring (for a multi-project metrics scope, grant on the scoping project as shown in the cross-project block below):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/monitoring.viewer \
  --condition=None \
&& \
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/iam.serviceAccountTokenCreator \
  --condition=None
```

### Deploy a test Grafana (ephemeral)

You cannot reach this Grafana from Cloud Shell because of CORS restrictions.

Adapted (not in the official docs): the source applies the manifest straight from the remote URL; it is downloaded and inspected first.

```bash
curl -fsSL -o grafana.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/grafana.yaml
less grafana.yaml
kubectl -n NAMESPACE_NAME apply -f grafana.yaml
```

```bash
kubectl -n NAMESPACE_NAME port-forward svc/grafana 3000
```

Browse to `http://localhost:3000` (username:password `admin:admin`), add a Prometheus data source, set the URL to `http://localhost:9090`, **Save & Test** (errors can be ignored), and note the service URL:

```text
http://grafana.NAMESPACE_NAME.svc:3000
```

### Data source syncer on Cloud Run and Cloud Scheduler (serverless)

Create the service account and roles (the last two let it read the Grafana token from Secret Manager and invoke Cloud Run).

Adapted (not in the official docs): added the missing `\` after the `secretmanager.secretAccessor` line so the command chain is not broken.

```bash
gcloud config set project PROJECT_ID \
&&
gcloud iam service-accounts create gmp-ds-syncer-sa \
&&
gcloud projects add-iam-policy-binding PROJECT_ID \
--member=serviceAccount:gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com \
--role=roles/monitoring.viewer \
&& \
gcloud projects add-iam-policy-binding PROJECT_ID \
--member=serviceAccount:gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com \
--role=roles/iam.serviceAccountTokenCreator \
&& \
gcloud projects add-iam-policy-binding PROJECT_ID \
--member=serviceAccount:gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com \
--role=roles/secretmanager.secretAccessor \
&& \
gcloud projects add-iam-policy-binding PROJECT_ID \
--member=serviceAccount:gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com \
--role=roles/run.invoker
```

Values to prepare (not a command; `GRAFANA_DATASOURCE_UID` is only the last URL part of the data source, and the Grafana service account needs the "Data Sources > Writer" role, or "Admin" in older Grafana, with token expiration "No expiration"):

```text
REGION # The Google Cloud region where you want to run your Cloud Run job, such as us-central1.
PROJECT_ID # The Project ID from Step 1.
GRAFANA_INSTANCE_URL # The Grafana instance URL from step 2. This is a URL. Include "http://" or "https://".
GRAFANA_DATASOURCE_UID # The Grafana data source UID from step 3. This is not a URL.
GRAFANA_SERVICE_ACCOUNT_TOKEN # The Grafana service account token from step 4.
```

```bash
gcloud secrets create datasource-syncer --replication-policy="automatic" && \
echo -n GRAFANA_SERVICE_ACCOUNT_TOKEN | gcloud secrets versions add datasource-syncer --data-file=-
```

`cloud-run-datasource-syncer.yaml`:

```yaml
apiVersion: run.googleapis.com/v1
kind: Job
metadata:
 name: datasource-syncer-job
spec:
 template:
   spec:
     taskCount: 1
     template:
       spec:
         containers:
         - name: datasource-syncer
           image: gke.gcr.io/prometheus-engine/datasource-syncer:v0.17.2-gke.2
           args:
           - "--datasource-uids=GRAFANA_DATASOURCE_UID"
           - "--grafana-api-endpoint=GRAFANA_INSTANCE_URL"
           - "--project-id=PROJECT_ID"
           env:
           - name: GRAFANA_SERVICE_ACCOUNT_TOKEN
             valueFrom:
               secretKeyRef:
                 key: latest
                 name: datasource-syncer
         serviceAccountName: gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud run jobs replace cloud-run-datasource-syncer.yaml --region REGION
```

```bash
gcloud scheduler jobs create http datasource-syncer \
--location REGION \
--schedule="*/10 * * * *" \
--uri="https://REGION-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/PROJECT_ID/jobs/datasource-syncer-job:run" \
--http-method POST \
--oauth-service-account-email=gmp-ds-syncer-sa@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud scheduler jobs run datasource-syncer --location REGION
```

It can take up to 15 seconds for the data source to be updated. Then confirm the **Prometheus server URL** starts with `https://monitoring.googleapis.com` and select **Save & test** at least once (needed for label autocompletion).

### Data source syncer on Kubernetes (CronJob)

Set environment variables:

```bash
# These values are required.
PROJECT_ID=SCOPING_PROJECT_ID # The value from Step 1.
GRAFANA_API_ENDPOINT=GRAFANA_INSTANCE_URL # The value from step 2. This is a URL.
DATASOURCE_UIDS=GRAFANA_DATASOURCE_UID # The value from step 3. This is not a URL.
GRAFANA_API_TOKEN=GRAFANA_SERVICE_ACCOUNT_TOKEN # The value from step 4.
```

Adapted (not in the official docs): the source pipes a `curl` download into `sed` and `kubectl apply`; this downloads with `curl -fsSL`, lets you inspect the manifest, then substitutes values and applies.

```bash
curl -fsSL -o datasource-syncer.yaml https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/cmd/datasource-syncer/datasource-syncer.yaml
less datasource-syncer.yaml
sed 's|$DATASOURCE_UIDS|'"$DATASOURCE_UIDS"'|; s|$GRAFANA_API_ENDPOINT|'"$GRAFANA_API_ENDPOINT"'|; s|$GRAFANA_API_TOKEN|'"$GRAFANA_API_TOKEN"'|; s|$PROJECT_ID|'"$PROJECT_ID"'|;' datasource-syncer.yaml \
  | kubectl -n NAMESPACE_NAME apply -f -
```

Inspect and tear down:

Adapted (not in the official docs): `-n NAMESPACE_NAME` added, because the CronJob was applied in that namespace.

```bash
kubectl -n NAMESPACE_NAME describe cronjob datasource-syncer
```

Adapted (not in the official docs): `-n NAMESPACE_NAME` added, because the Job runs in that namespace.

```bash
kubectl -n NAMESPACE_NAME logs job.batch/datasource-syncer-init
```

Adapted (not in the official docs): `-n NAMESPACE_NAME` added, and the remote `kubectl delete -f URL` is replaced by the downloaded `datasource-syncer.yaml`.

```bash
kubectl -n NAMESPACE_NAME delete -f datasource-syncer.yaml
```

### Outside GKE or across projects

Non-GKE clusters must provide credentials through `GOOGLE_APPLICATION_CREDENTIALS`:

```bash
gcloud iam service-accounts keys create gmp-test-sa-key.json \
  --iam-account=gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com
```

To query another project (the scoping project), grant read access on it and pass its ID as the `PROJECT_ID` variable:

```bash
gcloud projects add-iam-policy-binding SCOPING_PROJECT_ID \
  --member=serviceAccount:gmp-test-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/monitoring.viewer
```

## Options / Props

### Prometheus HTTP API compatibility

| Endpoint | Support |
|---|---|
| `/api/v1/query`, `/api/v1/query_range`, `/api/v1/metadata`, `/api/v1/labels`, `/api/v1/query_exemplars` | Fully supported |
| `/api/v1/label/<label_name>/values` | Only if `__name__` is the `<label_name>` or is matched exactly by a series selector. Supported: `/api/v1/label/__name__/values`, `/api/v1/label/__name__/values?match[]={__name__=~".*metricname.*"}`, `/api/v1/label/labelname/values?match[]={__name__="metricname"}`. Grafana `label_values($label)` fails; use `label_values($metric, $label)`. |
| `/api/v1/series` | `GET` only, not `POST`; `match[]` does not support regular expressions on `__name__`. |

### Data source syncer configures

| Setting | Value |
|---|---|
| Authentication | OAuth2 access token refreshed periodically (tokens last one hour by default; run the syncer every 10 minutes) |
| Prometheus server URL | The Cloud Monitoring API |
| HTTP method | GET |
| Prometheus type and version | Minimum 2.40.x |
| HTTP and Query timeout | 2 minutes |

## Notes

- Prometheus HTTP API compatibility: Base URL: `https://monitoring.googleapis.com/v1/projects/PROJECT_ID/location/global/prometheus/api/v1/`. The endpoints are not available in the Cloud Monitoring client libraries.
- Google Cloud Managed Service for Prometheus — not a self-hosted Prometheus server; PromQL semantics follow upstream Prometheus.
- A metrics scope is a read-time-only construct; each metrics scope must be configured as a separate Grafana data source. A scoping project hosts the scope; by default a project scopes itself; a monitored project can belong to more than one scope.
- The syncer must be used for Grafana to query globally; without it Grafana only queries the local Prometheus server. Without Workload Identity Federation for GKE, serverless needs a Grafana instance reachable from the internet; otherwise deploy on Kubernetes. Use the Cloud Run option for Grafana Cloud.
- Permissive or sensitive points: the test Grafana uses default credentials `admin:admin` (use for experiments only, do not expose it); the example grants `roles/secretmanager.secretAccessor` and `roles/run.invoker` at project level to `gmp-ds-syncer-sa`, and the source suggests a finer-grained service account per component in production; `keys create` produces a long-lived key file (store and restrict it carefully); the Grafana token is passed on the command line and as `sed` input, so it lands in shell history (use a placeholder and clear history).
- Corrected from the official docs: the source `add-iam-policy-binding` chain had `--role=roles/secretmanager.secretAccessor` followed by a bare `&& \` line; a trailing `\` was added. The source `curl ... | sed ... | kubectl apply -f -` was split into download, inspect and apply.
- The syncer calls the Grafana API at `GRAFANA_INSTANCE_URL` with the Grafana service account token; the source allows `http://`, which sends that token unencrypted, so use `https://` unless Grafana is reachable only on a trusted network.
- Corrected from the official docs: the source applies the syncer with `kubectl -n NAMESPACE_NAME apply -f -` but inspects and deletes it without a namespace (`kubectl describe cronjob datasource-syncer`, `kubectl logs job.batch/datasource-syncer-init`, `kubectl delete -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/cmd/datasource-syncer/datasource-syncer.yaml`), which targets the current context's namespace instead; `-n NAMESPACE_NAME` was added. The source's `kubectl -n NAMESPACE_NAME apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.17.2/examples/grafana.yaml` was changed to download, inspect, apply.
- Deleting the syncer "stops updating the linked Grafana with fresh authentication credentials, and as a consequence querying Managed Service for Prometheus no longer works" (source); try it on a disposable cluster first.
- Source inconsistency: the source says `/api/v1/series` "is supported for `GET` but not `POST` requests", while the Monitoring API v1 Discovery document lists `projects.location.prometheus.api.v1.series` with `httpMethod` `POST` (as it does for `query`, `query_range`, `labels` and `query_exemplars`).
- The source also shows Console steps, screenshots and more Grafana UI steps, which are omitted. Remote manifests are pinned to prometheus-engine tag `v0.17.2`.
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/query (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: for non-GKE clusters the source says `kubectl config set-cluster CLUSTER_NAME`, which only edits a kubeconfig cluster entry and does not switch the current context; this page uses `kubectl config use-context CONTEXT_NAME`.

## Related

- [promql.md](./promql.md)
- [import-grafana-dashboards.md](./import-grafana-dashboards.md)
