---
source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/import-grafana-dashboards
---

# Import Grafana dashboards into Cloud Monitoring

Grafana JSON dashboards are converted to Cloud Monitoring custom dashboards by the Google Cloud console (**Dashboards** page > **Import Dashboard**) or by the command-line dashboard importer. Only dashboards that use PromQL expressions and Prometheus data sources are supported; unsupported Grafana features are omitted and listed in the import results.

## Signature / Usage

### Get the dashboard importer

Prerequisites: a Bash environment, Git, Node.js 20.4.1 or newer, and the Google Cloud CLI (run `gcloud components update` for the latest version; run `gcloud auth login` before importing).

```bash
git clone https://github.com/GoogleCloudPlatform/monitoring-dashboard-samples
```

```bash
cd monitoring-dashboard-samples/scripts/dashboard-importer
```

```bash
npm install && npm run build
```

### Convert and upload

```bash
./import.sh PATH_TO_DIRECTORY_OR_FILE PROJECT_ID
```

Import all dashboards in a directory, or a single file (only `.json` files are processed):

```bash
./import.sh GRAFANA_DASHBOARDS_DIR PROJECT_ID
```

```bash
./import.sh GRAFANA_DASHBOARDS_DIR/MY_GRAFANA_DASHBOARD.json PROJECT_ID
```

The importer includes a sample dashboard:

```bash
./import.sh examples/k8s_cluster_example.json PROJECT_ID
```

After conversion, `import.sh` asks for confirmation (`y`) before uploading and prints the new dashboard URL.

### Convert without uploading

Omit `PROJECT_ID` to inspect or edit the converted dashboards first:

```bash
./import.sh PATH_TO_DIRECTORY_OR_FILE
```

### Upload manually

```bash
./upload.sh PATH_TO_DIRECTORY_OR_FILE PROJECT_ID
```

```bash
./upload.sh reports/2023-9-26/22:48:31/k8s_cluster_example.json my-project-test-1
```

Uploading a whole `reports/YYYY-M-D/HH:MM:SS` directory prompts before upload; uploading a single file does not.

## Options / Props

### Importer output

| Item | Description |
|---|---|
| `reports/YYYY-M-D/HH:MM:SS` | New output directory per run. |
| Converted files | Same names as the Grafana files, in Cloud Monitoring JSON format. |
| `report.json` | Per dashboard: source and converted file locations, notices about Grafana features with no Monitoring equivalent, conversion errors. |
| `upload_HH:MM:SS.txt` | Present after upload; contains the dashboard URL. |

### Labels on imported dashboards

| Label | Applied by |
|---|---|
| `cloud-monitoring-dashboard-importer` | Import through the Google Cloud console |
| `cloud-ops-grafana-importer` | The importer tool |

## Notes

- Required role: Monitoring Editor (`roles/monitoring.editor`) on the project, to create and modify custom dashboards.
- For App Hub configurations select the App Hub host project or management project in the console. User-defined labels can be added only to custom dashboards (including imported ones).
- Troubleshooting: run `git pull` to get the latest importer and import again; see the importer's README for dashboards with charts that show no data.
- The source also shows Console steps and importer sample output, which are omitted.
- Grafana here is only the source of JSON dashboards; PromQL semantics follow upstream Prometheus (Cloud Monitoring is not a self-hosted Prometheus server).
- Source: https://docs.cloud.google.com/stackdriver/docs/managed-prometheus/import-grafana-dashboards (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-prometheus-query.md](./managed-prometheus-query.md)
- [promql-migrate.md](./promql-migrate.md)
