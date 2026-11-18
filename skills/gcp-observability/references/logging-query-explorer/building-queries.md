---
source: https://docs.cloud.google.com/logging/docs/view/building-queries
---

# Build queries in the Logs Explorer

How to retrieve and analyze logs in the Logs Explorer: the Search all fields box, filter menus, time range, the query editor (Logging query language), recent, saved, shared and suggested queries, the query library, and the `savedQueries` API.

## Signature / Usage

### Search all fields: operator precedence

With **Search all fields**, `request AND localhost OR client` becomes (OR is evaluated first and parentheses aren't special):

```text
SEARCH("`request`")
SEARCH("`localhost`") OR SEARCH("client")
```

To get `client` OR (`request` AND `localhost`), use the query editor, where parentheses work:

```text
(SEARCH("`request`") AND SEARCH("`localhost`")) OR SEARCH("`client`")
```

When `AND` and `OR` are mixed, `a AND b OR c AND d` turns into:

```text
"a"
"b" OR "c"
"d"
```

`NOT` can be written as `-`; these two queries are the same:

```text
"response" AND "successful" AND NOT "error"
```

Adapted (not in the official docs): the second query keeps the two separate terms of the first one; the source writes it as the phrase `"response successful" -"error"`.

```text
"response" AND "successful" -"error"
```

```text
-"response successful"
```

### Save a query with the Logging API

Adapted (not in the official docs): the source request body is not valid JSON (missing commas, unquoted `filter` value, `parent` and `savedQueryId` placed inside the body). Here the body is a valid `SavedQuery`; `parent` goes in the URL path and `savedQueryId` is a query parameter (field names per the Logging v2 Discovery document).

```json
{
  "displayName": "compute-admin-activity-query",
  "description": "Queries for Compute Engine Admin Activity logs.",
  "loggingQuery": {
    "filter": "resource.type=\"gce_instance\" AND log_id(\"cloudaudit.googleapis.com/activity\")"
  },
  "visibility": "PRIVATE"
}
```

Send it with `POST https://logging.googleapis.com/v2/projects/my-project/locations/global/savedQueries?savedQueryId=compute-query` (the Logging v2 `savedQueries.create` path; `savedQueryId` is optional, at most 100 characters of letters, digits, `_`, `-`, `.`, first character alphanumeric). Use `"visibility": "SHARED"` to share with project members.

### List saved queries

Adapted (not in the official docs): `savedQueries.list` is a `GET`; `parent` is in the path (wildcard `-` for all locations) and only `filter` (plus `pageSize` / `pageToken`) is a query parameter, not a JSON body. The source's request lists all shared Logs Explorer queries, so the filter combines the documented `type("Logging")` function and `visibility = SHARED` token with `AND` (Logging v2 Discovery document); the source's `"filter": "explorer"` is not a documented filter form. `curl -G --data-urlencode` handles the encoding.

```bash
curl -f -G -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  --data-urlencode 'filter=type("Logging") AND visibility = SHARED' \
  "https://logging.googleapis.com/v2/projects/PROJECT_ID/locations/-/savedQueries"
```

## Options / Props

### Roles

| Role | Grants |
|---|---|
| Logs Viewer (`roles/logging.viewer`) | Write and run queries, save private queries, run private and shared queries. Can't save or modify shared queries. |
| Logging Admin (`roles/logging.admin`) | Full access to Cloud Logging, including saving, creating and managing shared queries. |

### Filter menus in the Query pane

| Menu | Maps to | Multiple selections |
|---|---|---|
| Resource | `resource.type` and zero or more `resource.labels` | One resource type; parameters joined by `AND`. |
| Log name | `logName` | Several log names, joined by `OR`. |
| Severity | `severity` | Several levels, joined by `OR`. |
| Correlate by | parent-child grouping | See Correlate log entries. |

### Search-box matching

| Input | Behavior |
|---|---|
| `hello world` (no quotes) | `SEARCH("hello world")`: case-insensitive, token boundaries, any order; doesn't match `worlds`. |
| `` `hello world` `` | ``SEARCH("`hello world`")``: case-insensitive phrase on token boundaries; doesn't match `hello worlds`. |
| `"hello world"` | Case-insensitive substring search; matches `hello worlds`. Slower than token search. |
| Case-sensitive search | Use a regular expression. |

### Query library limits and saved-query fields

| Item | Value |
|---|---|
| Recent queries | The last 10,000 unique queries over a 30-day period. |
| Query length | Can't exceed 20,000 characters. |
| Saved query **Name** | Required; limited to 64 characters. |
| Description | Optional. |
| Summary fields / truncation | Optional; choose characters to truncate and beginning or end. |
| Share with project | Optional; once shared, the query is no longer owned by you. |
| `visibility` (API) | `PRIVATE` or `SHARED`. |
| `loggingQuery.filter` | Required for Logs Explorer queries; max 20,000 characters. |

## Notes

- Time range: if the query editor contains a `timestamp` expression, the time-range selector is disabled and the expression is the restriction; otherwise the selector applies.
- Suggested queries: successive page loads might not show the same queries in the same order; you might see zero suggestions, and a suggested query might return zero logs.
- Assured Workloads: saved queries might be impacted or restricted in an Assured Workloads environment; see `https://docs.cloud.google.com/assured-workloads/docs/eu-sovereign-controls-restrictions-limitations#features_logging`.
- Sharing a query makes it visible to any member of the project with the necessary permissions and it is no longer owned by you.
- Corrected from the official docs: the source request bodies for `savedQueries.create` (`"parent": "projects/my-project/locations/global"` and `"savedQueryId"` inside the body, `"filter": resource.type="gce_instance" AND ...` unquoted) and `savedQueries.list` (`"parent": "name": projects/PROJECT_ID/locations/-`, `"filter": "explorer"`) were rewritten as a valid JSON body and a `curl` request. Source for the field rules: the Logging v2 Discovery document (`logging.v2`), REST reference https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/projects.locations.savedQueries/list. The source also shows Console steps.
- The Discovery description of the `savedQueries.list` `filter` parameter says: "Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the type function or a visibility token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character." Its own example is `type("Logging") AND visibility = PRIVATE`; the `type("Logging") AND visibility = SHARED` form above is composed from the documented type function and visibility token. For `parent`, it says: "To get a list of all saved queries, a wildcard character - can be used for LOCATION_ID".
- Source: https://docs.cloud.google.com/logging/docs/view/building-queries (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source says `"response" AND "successful" AND NOT "error"` and `"response successful" -"error"` are the same. They are not: the first matches the two words anywhere, while the quoted phrase `"response successful"` requires them together. The example replaces only `NOT` with `-`: `"response" AND "successful" -"error"`.

## Related

- [logging-query-language.md](./logging-query-language.md)
- [query-library.md](./query-library.md)
- [troubleshoot.md](./troubleshoot.md)
