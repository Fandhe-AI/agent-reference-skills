---
source: https://developers.cloudflare.com/workers/observability/query-builder/
---

# Query Builder

The Query Builder writes structured queries to investigate and visualize telemetry. It searches the Workers Observability dataset, currently all logs stored by Workers Logs. The same queries can run through the Workers Observability REST API (list dataset keys, run a query, list values for a key): https://developers.cloudflare.com/api/resources/workers/subresources/observability/.

## Signature / Usage

Queries search stored Workers Logs, so enable Workers Logs first:

```jsonc
{
	"observability": {
		"enabled": true,
		"logs": {
			"invocation_logs": true,
			"head_sampling_rate": 1 // optional. default = 1.
		}
	}
}
```

```toml
[observability]
enabled = true

  [observability.logs]
  invocation_logs = true
  head_sampling_rate = 1
```

## Options / Props

Visualization operators (all aggregate functions; multiple can be added to one query):

| Function | Arguments | Description |
| --- | --- | --- |
| **Count** | n/a | The total number of rows matching the query conditions |
| **Count Distinct** | any field | The number of occurrences of the unique values in the dataset |
| **Min** | numeric field | The smallest value for the field in the dataset |
| **Max** | numeric field | The largest value for the field in the dataset |
| **Sum** | numeric field | The total of all of the values for the field in the dataset |
| **Average** | numeric field | The average of the field in the dataset |
| **Standard Deviation** | numeric field | The standard deviation of the field in the dataset |
| **Variance** | numeric field | The variance of the field in the dataset |
| **P001** | numeric field | The value of the field below which 0.1% of the data falls |
| **P01** | numeric field | The value of the field below with 1% of the data falls |
| **P05** | numeric field | The value of the field below with 5% of the data falls |
| **P10** | numeric field | The value of the field below with 10% of the data falls |
| **P25** | numeric field | The value of the field below with 25% of the data falls |
| **Median (P50)** | numeric field | The value of the field below with 50% of the data falls |
| **P75** | numeric field | The value of the field below with 75% of the data falls |
| **P90** | numeric field | The value of the field below with 90% of the data falls |
| **P95** | numeric field | The value of the field below with 95% of the data falls |
| **P99** | numeric field | The value of the field below with 99% of the data falls |
| **P999** | numeric field | The value of the field below with 99.9% of the data falls |

Filter operators:

| Data Type | Valid Conditions (Operators) |
| --- | --- |
| Numeric | Equals, Does not equal, Greater, Greater or equals, Less, Less or equals, Exists, Does not exist |
| String | Equals, Does not equal, Includes, Does not include, Regex, Exists, Does not exist, Starts with |

## Notes

- Dashboard: **Workers & Pages** > your Worker > **Observability** > **Overview** tab > select a **Visualization**; optionally add Filter, Group By, Order By, Limit and a time range; **Run** (queries auto-run on changes).
- Filters have a key (any log field, e.g. `$workers.cpuTimeMs` or `$metadata.message`), an operator, and a value (integer for numeric, any string for string). Multiple filters combine with AND.
- Search is a text filter returning events containing the text. Group By combines rows with the same value (e.g. `$workers.event.request.cf.country`). Order By `asc`/`desc` sorts the summary table. Limit restricts results; with Order By it returns top/first N.
- Logs and traces are retained for seven days.
- Result views: Visualizations (graphs plus a summary table of raw results), Invocations (logs grouped by invocation, ordered by timestamp), Events (all logs ordered by timestamp, customizable fields).
- Saved queries (name, description, custom tags) are account-level, shared with all users via unique URL; delete from the **Queries** tab (deleted for all users). Stars are per user.
- Example: to debug 5xx paths, visualize Count, filter `$workers.event.response.status` greater than 500, group by `$workers.event.request.path` and `$workers.event.response.status`, then inspect the Invocations tab.

## Related

- [workers-logs.md](./workers-logs.md)
- [traces.md](./traces.md)
- [errors.md](./errors.md)
