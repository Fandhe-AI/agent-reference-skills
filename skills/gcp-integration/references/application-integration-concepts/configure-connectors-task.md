---
source: https://docs.cloud.google.com/application-integration/docs/configure-connectors-task
---

# Connectors task

The Connectors task connects an integration to Google Cloud services and business applications through Integration Connectors. Integration Connectors is a billable component; pricing is not copied (see https://docs.cloud.google.com/integration-connectors/docs/pricing).

## Signature / Usage

### Authentication override header

With **Enable Authentication Override** selected on the connection, pass authentication dynamically as an HTTP header (select **Use HTTPS Header for Auth Config**). `taskN` is the Task ID in `integrationVersion`:

```json
{"task1":{"oauth2_auth_code_flow.access_token": "token_value"},"task2":{"oauth2_auth_code_flow.userename": "username_value"}}
```

### Entity data payload

Example `connectorInputPayload` (row data to add to a table; `employee_first_name` and `employee_emailID` are column names):

```json
{ "employee_first_name": "John", "employee_emailID": "test-05@test.com" }
```

### Filter clause

Format and examples (string values in single or double quotes depending on the database):

```text
FIELD_NAME CONDITION FILTER_VALUE
```

```text
OrderNumber = 00110 AND StatusCode = 'Draft'
```

### Execute custom query action

`?` represents one parameter from the query parameters list, filled sequentially:

```text
SELECT * FROM Employees where LastName=?
```

## Options / Props

### Entity operations

| Operation | Input parameters | Output parameters |
|-----------|------------------|-------------------|
| List | `listEntitiesPageSize`, `listEntitiesPageToken`, `listEntitiesSortByColumns`, `filterClause` | `connectorOutputPayload`, `listEntitiesNextPageToken` |
| Get | `entityId` | `connectorOutputPayload` |
| Create | `connectorInputPayload` | `connectorOutputPayload` |
| Update | `connectorInputPayload`, `entityId`, `filterClause` | `connectorOutputPayload` |
| Delete | `entityId`, `filterClause` | N/A |

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `entityId` | String | Row identifier, normally a primary key value; without a primary key column the task fails with a runtime error. Not mandatory for BigQuery |
| `connectorInputPayload` | JSON | Data to add or update |
| `filterClause` | String | Restricts results; only for List, Delete, Update |
| `listEntitiesPageSize` | Integer | Page size; default 25, maximum number of pages 50000 |
| `listEntitiesPageToken` | String | Page token, taken from `listEntitiesNextPageToken`; without a primary key you must set `listEntitiesSortByColumns` to use it |
| `listEntitiesSortByColumns` | String array | Sort column; only one column |
| `connectorOutputPayload` | JSON | Operation output |
| `listEntitiesNextPageToken` | String | Token of the next page; the While Loop ends when it is `NULL` |

### Custom query action fields

| Field | Default |
|-------|---------|
| Timeout after | `180` seconds |
| Maximum number of rows | `25` |

### Connection name rules (inline creation)

| Rule | Value |
|------|-------|
| Characters | Letters, numbers, hyphens; letters lower-case |
| Start / end | Begin with a letter, end with a letter or number |
| Length | At most 63 characters |

## Notes

- Prerequisites: Connectors Admin (`roles/connectors.admin`) on the project; the service account used must have the required IAM role. Attach a user-managed service account to the integration; if none is configured, the default service account (`service-PROJECT_NUMBER@gcp-sa-integrations.iam.gserviceaccount.com`) is used for authentication.
- Integration variables cannot be used directly in a filter clause; map them with a Data Mapping task. Sample mapping: input `PRIMARY_KEY_ID = ' .CONCAT(INTEGRATION_VARIABLE) .CONCAT(')` to `filterClause(Connectors)`.
- Get fetches a single record from a table with a primary key; otherwise use List with a filter clause.
- Custom query supports DML and DDL statements (data-loss risk: try on a disposable database first); it does not support array variables. Add one query parameter per `?`, in order.
- Schema changes in the backend are not reflected automatically: click **Refresh connection schema** on the connection, then reconfigure the connector task.
- `token_value` and `username_value` in the authentication override header are placeholders; never put real tokens or credentials in examples or logs. The source spells the second key `oauth2_auth_code_flow.userename`; it is kept as written because no other source shows the key name.
- Inline connection creation (Location, Connection Details, Authentication, Review) is a Console wizard; connection details are covered in Integration Connectors pages.
- Not all connection types support entities or actions.
- Integration Connectors are managed connections used from Application Integration, not Workflows connectors or Kafka Connect connectors (`gcp-messaging-workflows`).
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/configure-connectors-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [tasks.md](./tasks.md)
- [variables.md](./variables.md)
- [error-handling.md](./error-handling.md)
- [test-publish-integrations.md](./test-publish-integrations.md)
