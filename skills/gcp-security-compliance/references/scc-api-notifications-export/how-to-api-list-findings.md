---
source: https://docs.cloud.google.com/security-command-center/docs/how-to-api-list-findings
---

# Listing security findings using the Security Command Center API

How to list findings with `gcloud scc findings list` (or the client libraries) and how to filter and sort them: operators, IP-range filtering, and array subfilters with `contains()` / `containsOnly()`. List calls are paginated and suited to operational triage, not bulk export.

## Signature / Usage

### List all findings

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
  --location=LOCATION
```

Each finding in the output resembles the following:

```json
{
  "finding": {
    "name": "organizations/ORGANIZATION_ID/sources/SOURCE_ID/findings/FINDING_ID",
    "parentDisplayName": "SOURCE_DISPLAY_NAME",
    "resourceName": "//cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER",
    "state": "ACTIVE",
    "category": "Malware: Cryptomining Bad Domain",
    "eventTime": "2021-11-10T17:41:41.594Z",
    "createTime": "2021-11-10T17:41:42.014Z",
    "severity": "LOW",
    "canonicalName": "projects/PROJECT_NUMBER/sources/SOURCE_ID/findings/FINDING_ID",
    "mute": "UNDEFINED",
    "findingClass": "THREAT",
    "indicator": {
      "domains": ["DOMAIN"]
    }
  },
  "resource": {
    "name": "//cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER",
    "gcpMetadata": {
      "projectDisplayName": "PROJECT_ID"
    }
  }
}
```

### Filter findings

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
  --location=LOCATION \
  --source=SOURCE_ID \
  --filter="FILTER"
```

For example, this `FILTER` returns findings from the category `MEDIUM_RISK_ONE` only:

```bash
--filter="category=\"MEDIUM_RISK_ONE\""
```

### Filter on IP addresses

A specific IP address:

```text
access.caller_ip="192.0.2.0"
```

A CIDR range (`inIpRange`), and an IP address inside an array field:

```text
inIpRange(IP_FINDING_FIELD, "CIDR_RANGE")
```

```text
contains(ATTRIBUTE_WITH_ARRAY, inIpRange(IP_FINDING_FIELD, "CIDR_RANGE"))
```

An address in `connections.source_ip` inside one range but not another (`connections` is an array field):

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
    --location=LOCATION \
    --source=SOURCE_ID \
    --filter="contains(connections, inIpRange(source_ip, \"2001:db8::/32\")) \
      AND NOT contains(connections, inIpRange(source_ip, \"192.0.2.0/24\"))"
```

### Example JSON object

The examples below assume this object is a finding attribute named `my_property`:

```json
{
  "outer_object": {
    "middle_object": {
      "deeply_nested_object": {
        "x": 123
      },
      "y": "some-string-value"
    },
    "list_middle_object": [
      {
        "v": 321,
        "w": [
          {
            "a": 3,
            "b": 4
          }
        ]
      }
    ],
    "z": "some-other-string-value",
    "u": [
      "list-element-1",
      "list-element-2",
      "list-element-3"
    ]
  }
}
```

### Subfilters for array-type fields

`contains()` returns findings where at least one array element matches the subfilter; `containsOnly()` returns findings only if all elements match.

```text
contains(ARRAY_ATTRIBUTE_NAME, SUBFILTER)
```

```text
containsOnly(ARRAY_ATTRIBUTE_NAME, SUBFILTER)
```

At least one `list_middle_object` element has `v` greater than or equal to 321:

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
    --location=LOCATION \
    --source=SOURCE_ID \
    --filter="contains(my_property.outer_object.list_middle_object, v  >= 321)"
```

At least one element of the primitive array `u` is `list-element-1` (keyword `elem`):

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
    --location=LOCATION \
    --source=SOURCE_ID \
    --filter="contains(my_property.outer_object.u, elem = \"list-element-1\")"
```

Scoped subfilter: within the same `list_middle_object` element, `v` is at least 321 and `w` has no element with `a` equal to 3:

```bash
gcloud scc findings list PARENT_TYPE/PARENT_ID \
    --location=LOCATION \
    --source=SOURCE_ID \
    --filter="contains(my_property.outer_object.list_middle_object, v  >= 321 AND -contains(w, a = 3))"
```

### Filter examples

Findings that most recently occurred after June 5, 2019 10:12:05 PM GMT (Unix epoch milliseconds):

```text
"event_time > 1559772725000"
```

Findings where at least one indicator domain has both `mycompanyprefix` and `.ca`:

```text
"contains(indicator.domains, elem : \"mycompanyprefix\" AND elem : \".ca\")"
```

Findings only when every `iam_bindings` member is one of the listed service accounts:

```text
containsOnly(iam_bindings, (member = SERVICE_ACCOUNT1 OR member = SERVICE_ACCOUNT2 OR member = "SERVICE_ACCOUNT3 "))
```

## Options / Props

### Placeholders

| Name | Description |
|------|-------------|
| `PARENT_TYPE` | Resource-hierarchy level: `organizations`, `folders`, or `projects`. |
| `PARENT_ID` | Numeric ID of the organization, folder, or project, or the alphanumeric project ID. |
| `LOCATION` | Security Command Center location; if data residency is enabled use `eu`, `sa`, or `us`, otherwise `global`. |
| `SOURCE_ID` | ID of the security source that provides the finding type. |

### Pagination

| Setting | Value |
|---------|-------|
| Default page size | 10 |
| Minimum page size | 1 |
| Maximum page size | 1000 |

### Filter operators and functions

| Type | Supported |
|------|-----------|
| Strings | `=` exact match; `:` partial match (`resource.parent_name="prod"` matches `prod` only; `resource.parent_name:"prod"` matches `prod`, `production`, `canaryprod`) |
| Numbers (except int64) | `<`, `>`, `<=`, `>=`, `=`, `!=` |
| Numbers (int64) | `=`, `!=` |
| Booleans | `=` |
| Logical | `AND`, `OR`, `NOT` or `-` |
| Grouping | `(`, `)` |
| Arrays | `contains()` (at least one element matches), `containsOnly()` (all elements match) |
| IP addresses | `inIpRange()` (use with `NOT` for outside the CIDR range) |

## Notes

- Source: https://docs.cloud.google.com/security-command-center/docs/how-to-api-list-findings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Applies to the Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers. The Security Command Center Enterprise service tier will shut down on May 21, 2027; organizations on Enterprise move automatically to Premium on or after May 21, 2027.
- IAM roles for Security Command Center can be granted at organization, folder, or project level, and the level determines what you can view, edit, create, or update. Authenticate to the API first.
- Findings stay listable for a period that depends on the service tier (see the SCC data retention page).
- List calls are for triage and small-to-medium datasets; large queries or complex filters can degrade or time out. For large-scale export or historical reporting use a continuous or bulk BigQuery export instead of API pagination.
- Operator examples given inline in the source: `state="ACTIVE" AND NOT mute="MUTED"`, `resource.parent_name:"prod"`, `severity="CRITICAL" OR severity="HIGH"`, and a `create_time` comparison with an RFC 3339 timestamp.
- IP addresses appear as strings in finding properties including `access.caller_ip`, `connections.destinationIp`, `connections.sourceIp`, and `indicator.ip_addresses`. Use `NOT` with `inIpRange` for addresses outside a CIDR range.
- In the Google Cloud console filter, omit the escape characters (`\"string-value\"` becomes `"string-value"`).
- Event time can be a Unix epoch in milliseconds (integer) or an RFC 3339 string. Further example filters on `indicator.domains` (partial match), `vulnerability.cve.references`, `indicator.ip_addresses`, external system assignees, and `resource.folders.resource_folder` / `resource_folder_display_name`; they are omitted for size (see the source page).
- JSON-object subfields can be filtered with dot paths (for example `my_property.outer_object.middle_object.y`) using `=` or `:` (partial match), and sorted with `--order-by` on strict subfields that are primitive types (strings, numbers, booleans); `DESC` sorts descending, default is ascending. The source's blocks of these filter and sort commands are omitted for size.
- `PARENT` is a positional argument of `gcloud scc findings list` and `--source` defaults to `-` (all sources) in gcloud 593.0.0; `--read-time` and `--compare-duration` are marked DEPRECATED in that help and are not used here. Run `gcloud scc findings list --help` for more examples.
- Source inconsistency: `member = "SERVICE_ACCOUNT3 "` in the `containsOnly` example contains a trailing space inside the quotes and the other two placeholders are unquoted; it is kept as written. Quote every service-account email and remove the space when you substitute real values.
- Go, Java, Node.js, and Python client-library examples (v2 `securitycenter` clients, parent form `organizations/{orgId}/sources/-/locations/global`) that list findings with and without a filter are omitted; the gcloud form covers the same calls.
- Findings output can contain resource names and project identifiers; avoid pasting it into shared logs.

## Related

- [how-to-notifications.md](./how-to-notifications.md)
- [how-to-export-data.md](./how-to-export-data.md)
