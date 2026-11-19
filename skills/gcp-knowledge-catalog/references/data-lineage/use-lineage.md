---
source: https://docs.cloud.google.com/knowledge-catalog/docs/use-lineage
---

# View data lineage for Google Cloud systems

Enable the Data Lineage API to start tracking lineage automatically, then view graphs and lists for Knowledge Catalog entries, BigQuery and Vertex AI in the Google Cloud console, or retrieve lineage with the Data Lineage API. Disable the Data Lineage API (not the Dataplex API) to stop new processing charges.

## Signature / Usage

### Retrieve upstream lineage with the Python client

The source's primary recommendation for programmatic retrieval is the `searchLineageStreaming` API (preview); the following tabbed examples show manual, client-side graph traversal. This sample walks upstream from a target entity with `search_links`, then lists processes (batches of at most 100 links), runs and events.

Adapted (not in the official docs): the event loop queues a link's source only when the link's target is the node being explored.

```python
from google.cloud import datacatalog_lineage_v1
from google.api_core.exceptions import GoogleAPICallError

def view_lineage(project_id: str, location: str, target_fully_qualified_name: str, max_depth: int = 3):
    """Retrieves lineage for a given entity using a depth-limited search."""
    client = datacatalog_lineage_v1.LineageClient()
    parent = f"projects/{project_id}/locations/{location}"

    # Store visited nodes to avoid infinite loops in cyclic graphs
    visited_nodes = set([target_fully_qualified_name])
    queue = [(target_fully_qualified_name, 0)]

    while queue:
        current_node, current_depth = queue.pop(0)
        print(f"\nExploring node (Depth {current_depth}): {current_node}")

        if current_depth >= max_depth:
            continue

        target_entity = datacatalog_lineage_v1.EntityReference(
            fully_qualified_name=current_node
        )
        search_links_request = datacatalog_lineage_v1.SearchLinksRequest(
            parent=parent,
            target=target_entity,
        )

        try:
            links = list(client.search_links(request=search_links_request))
        except GoogleAPICallError as e:
            print(f"  Failed to retrieve links for {current_node}: {e.message}")
            continue

        if not links:
            continue

        # Extract link names to query processes in batches
        link_names = [link.name for link in links]

        # Batch max size is 100
        for i in range(0, len(link_names), 100):
            batch = link_names[i:i + 100]
            batch_request = datacatalog_lineage_v1.BatchSearchLinkProcessesRequest(
                parent=parent,
                links=batch
            )

            try:
                for process_links in client.batch_search_link_processes(request=batch_request):
                    process_name = process_links.process
                    print(f"  Process: {process_name}")

                    runs_request = datacatalog_lineage_v1.ListRunsRequest(parent=process_name)
                    for run in client.list_runs(request=runs_request):
                        print(f"    Run: {run.name}")

                        events_request = datacatalog_lineage_v1.ListLineageEventsRequest(parent=run.name)
                        for event in client.list_lineage_events(request=events_request):
                            for event_link in event.links:
                                if event_link.target.fully_qualified_name != current_node:
                                    continue
                                source_fqn = event_link.source.fully_qualified_name

                                # If exploring upstream, queue the source
                                if source_fqn and source_fqn not in visited_nodes:
                                    visited_nodes.add(source_fqn)
                                    queue.append((source_fqn, current_depth + 1))

            except GoogleAPICallError as e:
                 print(f"  Failed to retrieve processes/runs: {e.message}")
```

### Turn off data lineage

Run in each project where lineage tracking was enabled. This stops new lineage ingestion for every service in the project.

```bash
gcloud services disable datalineage.googleapis.com --project=PROJECT_ID
```

`PROJECT_ID` is the ID of your Google Cloud project.

## Options / Props

### Roles to view lineage

| Role | ID | Needed for | Granted on |
|---|---|---|---|
| Data Lineage Viewer | `roles/datalineage.viewer` | All | The project where lineage is recorded, and the project where lineage is viewed |
| BigQuery Metadata Viewer | `roles/bigquery.metadataViewer` | BigQuery table details | The table's storage project |
| BigQuery Resource Viewer | `roles/bigquery.resourceViewer` | BigQuery job details | The job's compute project |
| Dataplex Catalog Viewer | `roles/dataplex.catalogViewer` | Other cataloged assets | The project where catalog entries are stored |
| Dataform Viewer | `roles/dataform.viewer` | Open Dataform repositories or BigQuery pipelines from the lineage graph | The project where the Dataform repository is stored |

### Required permissions

| Permission | Needed for | On |
|---|---|---|
| `bigquery.tables.get` | BigQuery table details | The table's storage project |
| `bigquery.jobs.get` | BigQuery job details | The job's compute project |
| `dataform.repositories.get` and `dataform.workflowInvocations.get` | Open Dataform repositories or BigQuery pipelines from the lineage graph | The project where the Dataform repository is stored |

### Which APIs to enable

| Where | APIs |
|---|---|
| Each project where lineage is recorded | Data Lineage API (`datalineage.googleapis.com`) |
| The project where you view lineage | Data Lineage API and Dataplex API (`dataplex.googleapis.com`) |

## Notes

- You need no administrator or editor role to capture lineage; roles are only needed to view it. Lineage is captured across projects, so permissions are needed in the project where it is viewed and in the projects where it was recorded.
- Data lineage is enabled per project, not per service. By default, enabling the API activates lineage tracking for most supported services. You can enable or disable tracking per service at project, folder or organization level (see control-lineage-ingestion).
- Console: it takes time for lineage to display; for most jobs it takes three hours, for some jobs up to 24 hours. Open the Lineage tab from Knowledge Catalog Search (search mode Knowledge Catalog), the BigQuery table, or the Vertex AI Datasets / Model Registry page. The default Graph view shows table-level lineage across systems and regions; Expand loads five more nodes at a time; the Lineage explorer panel filters by Direction, Dependency type or Time range and opens a focused view in one region that expands up to three levels; Visualize Path (focused view only) traces back to the root entry; column-level lineage is only for BigQuery and Managed Service for Apache Spark jobs; List view offers simplified and detailed tables you can configure and export. The Highlight / Filter display options can be combined (unfiltered nodes hidden, matching nodes highlighted).
- Disabling the Dataplex API doesn't turn off data lineage or stop its charges. After disabling the Data Lineage API, ingested metadata keeps incurring metadata storage charges for up to 30 days until the retention window expires or you delete it. Disabling the API is not easily reversible for recorded history; try on a disposable project first. To stop lineage for specific services only, use the per-service configuration instead.
- The source also shows Console steps (disable via Enabled APIs and services) and a Java version of the traversal sample; both are omitted.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/use-lineage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the official sample queues the source of every link in every event of each process run, without checking the link's target, so links of the same process that lead to other entities (for example `B → U` next to `A → T` when exploring `T`) were added to the upstream traversal. The adapted sample skips links whose `target.fully_qualified_name` is not the node being explored.

### Record lineage for external systems

For systems that automated lineage tracking does not support (such as external or on-premises databases), you can record lineage manually with the Data Lineage API by logging custom processes, runs, and events. Create the resources in this order:

1. Create a process with `processes.create`.
2. Create a run with `processes.runs.create`.
3. Create a lineage event with `processes.runs.lineageEvents.create`.

The source page has no request bodies or code. For the request and response schemas see `datalineage.projects.locations.processes.create`, `datalineage.projects.locations.processes.runs.create`, and `datalineage.projects.locations.processes.runs.lineageEvents.create` in `references/rest/datalineage/datalineage.md` of this skill.

- Source: https://docs.cloud.google.com/knowledge-catalog/docs/lineage-track-external-system-information (retrieved 2026-11-19)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [lineage-views.md](./lineage-views.md)
- [control-lineage-ingestion.md](./control-lineage-ingestion.md)
- [troubleshooting-lineage.md](./troubleshooting-lineage.md)
