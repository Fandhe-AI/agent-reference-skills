---
source: https://docs.cloud.google.com/knowledge-catalog/docs/lineage-views
---

# Data lineage views (graph and list)

Data lineage views in Knowledge Catalog (formerly Dataplex Universal Catalog) are interactive graphs and structured lists in the Google Cloud console for table-level and column-level lineage. They are available only for Knowledge Catalog entries, BigQuery assets and Vertex AI resources (models, datasets, feature store views, feature groups).

## Signature / Usage

Column-level lineage is automatically collected for BigQuery jobs of statement types `CREATE TABLE`, `CREATE TABLE COPY`, `INSERT`, `UPDATE`, `MERGE`, `DELETE` and `SELECT` with a destination table. For example, the following statement, from the information-model example, produces table links between the source tables and the target table.

```sql
  CREATE TABLE `dataplex-docs.data_lineage_demo.total_green_trips_22_21`
  AS
  SELECT
      vendor_id,
      COUNT(*) AS number_of_trips
  FROM
      (
          SELECT vendor_id
          FROM `dataplex-docs.data_lineage_demo.nyc_green_trips_2022`
          UNION ALL
          SELECT vendor_id
          FROM `dataplex-docs.data_lineage_demo.nyc_green_trips_2021`
      )
  GROUP BY
      vendor_id;
```

## Options / Props

### Table-level vs column-level lineage

| | Table-level | Column-level |
|---|---|---|
| Granularity | Relationships between entire tables | Flow between individual columns; link dependency type is `Exact copy` (values copied) or `Other` |
| Typical use | Data discovery, migration planning, auditing and governance | Root cause analysis, impact analysis (before deprecating a column), verifying metric source columns |
| Supported sources | All lineage sources | BigQuery and Managed Service for Apache Spark jobs only (custom sources and custom OpenLineage events are table-level only) |

### Managed Service for Apache Spark column-level lineage minimums

| Item | Minimum |
|---|---|
| OpenLineage dependency | 1.34 |
| Cluster image versions | 3.0.3, 2.3.22, 2.2.75, 2.1.107 |
| Runtime versions | 3.0.3, 2.3.20 |

### Filter and highlight criteria (Lineage explorer)

| Criterion | Meaning |
|---|---|
| Project | Google Cloud project ID |
| System | System where the asset is located (for example BigQuery or Cloud Storage) |
| Entity name | Asset name; `*` wildcard for prefix and suffix only (`*table`, `test*`) |
| Subtype | Asset subtype (for example `dashboard` or `model`) |
| Column name | Shows column-level details |
| Direction | Upstream, downstream or both |
| Time range | Specific start or end time |
| Dependency type | Column-level only; for example `All` or `Exact copy` |

Select Hide temporary BigQuery tables to hide transient assets such as tables in datasets whose names start with `_script`.

### Filter vs highlight modes

| Mode | Behavior |
|---|---|
| Highlight | Matching nodes are emphasized with colors and borders; the full graph stays visible |
| Filter | Non-matching nodes are hidden; non-matching assets on a path between matching nodes are grouped into collapsed nodes |

### List view columns

| View | Columns |
|---|---|
| Simplified table-level (default) | System, Project, Entity, FQN, Direction, Depth |
| Detailed table-level | Source system, Source project, Source, Source FQN, Target system, Target project, Target, Target FQN, Direction, Depth |
| Simplified column-level | System, Project, Entity, Column, FQN, Direction, Depth |
| Detailed column-level | Source system, Source project, Source FQN, Target system, Target project, Target FQN, Direction, Dependency types, Depth |

## Notes

- Default Graph view: high-level overview across systems and regions with manual expansion that loads five nodes at a time. Edge icons show the source system of the process (BigQuery, Vertex AI), a multiple-processes icon, or a gear icon when the source system is unknown; in the filtered (focused) view a gear icon is used for all processes. In column-level view edges have labels (`Exact copy` or `Other`).
- Lineage explorer fetches up to 10 levels of the lineage graph, but only the first three levels are expanded by default; expand the remaining levels with the arrows. Reset removes all filters and returns to the default view.
- Lineage path visualization (Visualize path from a selected node back to the root entry) is available only when filters are applied in the Lineage explorer panel, for table-level and column-level lineage and in the List view.
- Runs: a complete graph is the result of runs of many jobs; click an edge with a process, then the Runs tab in the Query panel. Inspect transformation logic: click an edge with a process, then the Details tab to see the exact SQL that ran.
- Snippet taken from https://docs.cloud.google.com/knowledge-catalog/docs/about-data-lineage
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/lineage-views (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-data-lineage.md](./about-data-lineage.md)
- [use-lineage.md](./use-lineage.md)
- [track-lineage-quickstart.md](./track-lineage-quickstart.md)
