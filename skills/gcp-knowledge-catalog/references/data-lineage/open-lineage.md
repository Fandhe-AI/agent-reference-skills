---
source: https://docs.cloud.google.com/knowledge-catalog/docs/open-lineage
---

# Integrate with OpenLineage

Knowledge Catalog (formerly Dataplex Universal Catalog) acts as an OpenLineage consumer through the Data Lineage API. Call the `processOpenLineageRunEvent` REST method to import OpenLineage events from external systems and custom pipelines, and view them alongside built-in lineage from Google Cloud services.

## Signature / Usage

### Import an OpenLineage event (REST)

Replace `PROJECT_ID` with your Google Cloud project ID and `LOCATION_ID` with the location, such as `us-central1`.

```text
POST https://datalineage.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID:processOpenLineageRunEvent
```

Request body (save as `request.json`):

```json
{
  "eventTime": "2023-04-04T13:21:16.098Z",
  "eventType": "COMPLETE",
  "inputs": [
    {
      "name": "somename",
      "namespace": "customnamespace"
    }
  ],
  "job": {
    "name": "somename",
    "namespace": "customnamespace"
  },
  "outputs": [
    {
      "name": "somename",
      "namespace": "customnamespace"
    }
  ],
  "producer": "someproducer",
  "run": {
    "runId": "somerunid"
  },
  "schemaURL": "https://openlineage.io/spec/1-0-5/OpenLineage.json#/$defs/RunEvent"
}
```

Send the request with curl (Linux, macOS or Cloud Shell, after `gcloud init` or `gcloud auth login`):

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://datalineage.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION_ID:processOpenLineageRunEvent"
```

A successful response is similar to the following:

```json
{
  "process": "projects/my-project/locations/us-central1/processes/my-process",
  "run": "projects/my-project/locations/us-central1/processes/my-process/runs/my-run",
  "lineageEvents": [
    "projects/my-project/locations/us-central1/processes/my-process/runs/my-run/lineageEvents/my-lineage-event"
  ]
}
```

## Options / Props

### Limitations

| Item | Value |
|---|---|
| Supported versions | OpenLineage major versions 1 and 2 |
| Unsupported | Any later OpenLineage release with message format changes; `DatasetEvent`; `JobEvent` |
| API role | `processOpenLineageRunEvent` is a consumer of OpenLineage messages only, not a producer |
| Message size | Maximum 5 MB per message |
| Name length | Each Fully Qualified Name in inputs and outputs is limited to 4,000 characters |
| Links | Maximum 100 links per event; maximum aggregate number of table-level links is 1,000 |
| Column-level lineage | Custom events materialize table-level edges only; if a message from a supported automated engine has more than 1,500 column-level links, column-level information is skipped |
| Graph scope | One graph per job run showing inputs and outputs; lower-level processes such as Spark stages aren't supported |

### Stored OpenLineage data

| Stored | Fields |
|---|---|
| Facets | `spark_version` (`openlineage-spark-version`, `spark-version`); all `spark.logicalPlan.*`; custom Google Cloud facet `environment-properties` with `origin.sourcetype`, `origin.name`, `spark.app.id`, `spark.app.name`, `spark.batch.id`, `spark.batch.uuid`, `spark.cluster.name`, `spark.cluster.region`, `spark.job.id`, `spark.job.uuid`, `spark.project.id`, `spark.query.node.name`, `spark.session.id`, `spark.session.uuid` |
| Other information | `eventTime`, `run.runId`, `job.namespace`, `job.name` |

### Tools for sending messages

| Tool | Description |
|---|---|
| Google Cloud client libraries for Data Lineage | Interact with the Data Lineage API programmatically |
| Google Cloud Java Producer Library | Open-source Java library to construct and send OpenLineage events (GitHub `GoogleCloudPlatform/data-lineage-producer-java-library`) |
| OpenLineage GCP Transport (`GcpLineageTransport`) | For Java-based OpenLineage producers; configured as the event sink for producers such as Airflow, Spark and Flink |

## Notes

- Map OpenLineage facets to Data Lineage API attributes; the mapping is on the OpenLineage mapping page of the official docs.
- Managed Service for Apache Spark, Managed Airflow and Dataform include built-in OpenLineage producers that send events to this endpoint.
- The source's request body block is shown as text; it is valid JSON and tagged `json` here. The `$defs` in `schemaURL` is part of the URL string.
- The source also shows auto-generated C#, Go, Java, Python and Ruby client snippets and a PowerShell command. The client snippets are code templates with placeholder values (for example `parent="parent_value"`) that the source says require modification to work, so they are omitted; use the REST form above.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/open-lineage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [use-lineage.md](./use-lineage.md)
- [troubleshooting-lineage.md](./troubleshooting-lineage.md)
