---
source: https://docs.cloud.google.com/agent-registry/search-agents-and-tools
---

# Search for agents, tools and skills in Agent Registry

Agent Registry lets you search registered agents, A2A skills, standalone skills and MCP servers by keyword, prefix or natural language, from the Google Cloud console, the gcloud CLI or the Agent Registry API. Keyword and prefix searches match names, identifiers and metadata; semantic search finds conceptually related capabilities by intent. You can't use search queries to discover endpoints; list and filter them by metadata instead.

## Signature / Usage

### Search agents and MCP servers by keyword (gcloud)

Keyword queries accept free-text strings and the operators `AND`, `OR` and `NOT`. `REGION` is the registry region or `global`.

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string="flight OR booking"
```

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string='skills.tags:incident OR skills.examples:"rollout"'
```

```bash
gcloud agent-registry mcp-servers search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string="database"
```

### Search by keyword (REST)

Send a `POST` request to `agents:search` or `mcpServers:search` with the `searchString` field.

These REST requests send the access token of the gcloud CLI's active account (`gcloud auth print-access-token` without `ACCOUNT`: "If not specified, the current active account will be used."), not the Application Default Credentials (ADC) that the SDK examples use. Run `gcloud auth login` and check the active account with `gcloud auth list` ("shows which account is active"), or use `gcloud auth application-default print-access-token` ("print an access token for your current Application Default Credentials") in its place to send the ADC token (gcloud 593.0.0 help).

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    -H "Content-Type: application/json" \
    -d '{"searchString": "flight OR booking"}' \
    "https://agentregistry.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/agents:search" )
```

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    -H "Content-Type: application/json" \
    -d '{"searchString": "database"}' \
    "https://agentregistry.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/mcpServers:search" )
```

### Search by prefix

Prefix searches use the `*` suffix wildcard and are optimized for low latency (for example autocomplete).

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string="displayName:Best_A2A_*"
```

```bash
gcloud agent-registry mcp-servers search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string="displayName:Prod_Server_*"
```

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    -H "Content-Type: application/json" \
    -d '{"searchString": "displayName:Best_A2A_*"}' \
    "https://agentregistry.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/agents:search" )
```

### Find components by source prefix

Built-in Google agents and Google and Google Cloud remote MCP servers use `urn:agent:googleapis.com:` or `urn:mcp:googleapis.com:`. Project-scoped components use `urn:agent:projects-` or `urn:mcp:projects-` followed by the project number, for example `urn:agent:projects-PROJECT_NUMBER:`. Use the `agentId` field for agents.

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string='agentId:"urn:agent:googleapis.com:*"'
```

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string='agentId:"urn:agent:projects-*"'
```

```bash
gcloud agent-registry agents search \
    --project=PROJECT_ID \
    --location=REGION \
    --search-string='agentId:"urn:agent:projects-PROJECT_NUMBER:*"'
```

Adapted (not in the official docs): added `--fail-with-body`, so an HTTP error makes `curl` exit non-zero instead of looking like success. The access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments; `-q` comes first so that curl does not read `.curlrc`, and the command runs in a subshell that starts with `set +x` and `set +a`, so shell tracing does not print the token, it is not exported to `curl`, and `TOKEN` does not stay in your shell.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
    -H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
    -H "Content-Type: application/json" \
    -d '{"searchString": "agentId:\"urn:agent:googleapis.com:*\""}' \
    "https://agentregistry.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/agents:search" )
```

### Search across a management boundary (Preview)

From the management project, search all agents and MCP servers in a location across all member projects:

```bash
gcloud agent-registry agents search \
    --project=MANAGEMENT_PROJECT_ID \
    --location=LOCATION \
    --search-string="analytics"
```

Narrow to a member project by its project number in the agent identifier:

```bash
gcloud agent-registry agents search \
    --project=MANAGEMENT_PROJECT_ID \
    --location=LOCATION \
    --search-string='agentId:"urn:agent:projects-MEMBER_PROJECT_NUMBER:*"'
```

### Search for standalone skills

Skill search uses `--query` and `--search-type` in gcloud. Keyword search:

```bash
gcloud agent-registry skills search \
    --project=PROJECT_ID \
    --location=REGION \
    --query="displayName:cloud-* AND description:database" \
    --search-type=keyword
```

Semantic search:

```bash
gcloud agent-registry skills search \
    --project=PROJECT_ID \
    --location=REGION \
    --query="manage and configure relational databases" \
    --search-type=semantic
```

Search for skills from a verified Google-managed publisher:

```bash
gcloud agent-registry skills search \
    --project=PROJECT_ID \
    --location=REGION \
    --query="publisher:cloud.google.com" \
    --search-type=keyword
```

## Options / Props

### Agent and MCP server search fields

| Field filter | Agentic component | Prefix search supported | Description |
|---|---|---|---|
| `displayName` | Agents and MCP servers | Yes | Display name of the agent or MCP server. |
| `name` | Agents and MCP servers | Yes | Resource name of the agent or MCP server. |
| `agentId` | Agents | Yes | Agent identifier URN (also supports exact matches with `=`). |
| `mcpServerId` | MCP servers | No | MCP server identifier URN (also supports exact matches with `=`). |
| `description` | Agents | No | Description of the agent. |
| `skills` | Agents | No | Searches across all inline A2A skill fields extracted from the Agent Card. |
| `skills.id`, `skills.name`, `skills.description`, `skills.tags`, `skills.examples` | Agents | No | Targets a specific inline A2A skill field extracted from the Agent Card. |

### Skill search fields

| Field name | Case behavior | Prefix search | All-fields search | Description |
|---|---|---|---|---|
| `displayName` | Case insensitive | Yes | Yes | The display name of the skill. Use this field to search for common names. |
| `description` | Case insensitive | No | Yes | The detailed description of the skill's purpose and functionality. Use this field to search for keywords. |
| `name` | Case insensitive | Yes | Yes | The resource name of the skill. Use this field to search by resource name. |
| `skillId` | Case insensitive | Yes | Yes | The skill identifier of the skill. Use this field to find a specific publisher's assets. For example, the format for Google-managed skills is `urn:skill:PUBLISHER_ID:NAMESPACE:SKILL_ID`. |
| `publisher` | Case insensitive | Yes | No | The publisher associated with the skill. Use this field to filter by the publishing organization. |
| `frontmatter.name` | Case insensitive | No | No | The name of the skill defined in the front matter of the `SKILL.md` file. |
| `frontmatter.description` | Case insensitive | No | No | The description of the skill defined in the front matter of the `SKILL.md` file. |
| `frontmatter.compatibility` | Case insensitive | No | No | The compatibility of the skill defined in the front matter of the `SKILL.md` file. |
| `frontmatter.license` | Case insensitive | No | No | The license of the skill defined in the front matter of the `SKILL.md` file. |
| `frontmatter.allowed_tools` | Case insensitive | No | No | The allowed tools of the skill defined in the front matter of the `SKILL.md` file. |
| `frontmatter.metadata.KEY` | Case insensitive | No | No | A custom metadata key-value entry defined in `metadata` in the front matter of the `SKILL.md` file. Supports the `:` operator in search queries and exact matches (`=` and `!=`) in filters. |
| `state` | Case insensitive | No | No | The current lifecycle state of the skill, such as `ACTIVE`, `DRAFT`, `DISABLED`, `DEPRECATED`, or `DECOMMISSIONED`. This field is only available in filters and supports exact matches (`=` and `!=`). |
| `targetState` | Case insensitive | No | No | The target lifecycle state of the skill, such as `ACTIVE`, `DRAFT`, `DISABLED`, `DEPRECATED`, or `DECOMMISSIONED`. This field is only available in filters and supports exact matches (`=` and `!=`). |
| `defaultRevisionFindingCount` | Not applicable | No | No | The number of security findings detected in the skill's default revision. This field is only available in filters and supports exact matches (`=` and `!=`) and range operators (`<`, `<=`, `>`, and `>=`), such as `defaultRevisionFindingCount = 0` or `defaultRevisionFindingCount > 0`. |
| `createTime` | Not applicable | No | No | The timestamp when the skill was created. This field is only available in filters. Supports range operators, such as `<`, `>`, and exact matches. |
| `updateTime` | Not applicable | No | No | The timestamp when the skill was last updated. This field is only available in filters. Supports range operators, such as `<`, `>`, and exact matches. |

## Notes

- Agent and MCP server field filters: use the `:` operator to narrow to one field, for example `skills.tags:incident`. Without a field filter, all indexed fields on the discovery resource are checked (including inline A2A skills on agents and tool names and descriptions on MCP servers).
- Keyword skill search (`--search-type=keyword`) scans only basic metadata attributes such as display name, description, resource name and skill identifier; it is optimized for low-latency searches, exact lookups and name autocomplete.
- Semantic skill search (`--search-type=semantic`) automatically indexes the complete contents of the `SKILL.md` payload, including natural language instructions, scripts and metadata assets; it identifies conceptual themes and is optimized for orchestrator agents discovering capability bundles by intent.
- The source also shows the skill searches as `curl -X POST` requests to `.../skills:search` with a JSON body (`searchString`, `searchType` `KEYWORD` / `SEMANTIC`). Those REST blocks are left out: the Agent Registry Discovery documents (`agentregistry` v1 and v1alpha) define `skills.search` as `GET` with `searchString`, `searchType`, `filter`, `pageSize` and `pageToken` as query parameters and no request body. `agents:search` and `mcpServers:search` are `POST` with a `searchString` body, as shown above.
- Console keyword searches need at least three characters (for example `flight`, `database`, or a field filter such as `Name:booking`).
- Search evaluates agent, MCP server and skill capability descriptions, tool schemas and skill instructions. Custom fields inside the Agent Card and transport `protocols` aren't indexed; inspect them with metadata filters when you list or describe agents. `Endpoint` resources don't support search queries: use the Endpoints tab, `gcloud agent-registry endpoints list --filter` or the `endpoints.list` REST method. To filter lists, use `--filter` in `gcloud agent-registry agents list`, `mcp-servers list` or `skills list`, for example `--filter='protocols.type="A2A_AGENT"'`, and `gcloud agent-registry agents describe` for the full Agent Card.
- `REGION` / `LOCATION` can be a region such as `us-central1`, a multi-region such as `us` or `eu`, or `global` (the registry location). With a management boundary, Agent Registry aggregates resources in that same location across the management project and all member projects.
- Management boundary search (Preview) is subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support. In search results from the management project each resource name uses the project in the request URL and keeps the registered ID; the registry identifier retains the member project. Manually registered `Service` and `Binding` resources created in a member project stay scoped to it and don't appear in management project results; create them in the management project to make them visible across the boundary.
- Skill search runs against the default skill revision and filters results by IAM: only skills for which you have `agentregistry.skills.get` (project level or resource-level IAM policy on the skill) are returned. Syntax elements: boolean operators `AND` / `OR` / `NOT`, field filters with `:` (for example `displayName:database`) and the `*` suffix wildcard for prefixes (for example `displayName:cloud-*`).
- Google-managed skills are discoverable from any project; the list is in the `google/skills` repository on GitHub (https://github.com/google/skills/tree/main).
- Required roles on the governance project: Agent Registry API Viewer (`roles/agentregistry.viewer`) to search for and view agents, tools and standalone skills. Agent Registry User (`roles/agentregistry.user`) is for users who also create, update and delete standalone skills, skill revisions and security scan settings.
- Source inconsistency: this page lists `roles/agentregistry.user` for "Search for and view standalone skills", while the Agent Registry setup page defines `roles/agentregistry.viewer` as able to "view and search agents, MCP servers, tools, standalone skills, skill revisions, publishers, endpoints, and bindings" and `roles/agentregistry.user` as adding create, update and delete on skills (setup.md; https://docs.cloud.google.com/agent-registry/setup, retrieved 2026-11-21).
- Agent Registry skills (`SKILL.md` packages and `skillId` URNs) are Google Cloud registry resources, not Claude Code Agent Skills.
- The source also shows the Console search bar steps. REST requests go to https://agentregistry.googleapis.com/v1; searchable-field details are in https://docs.cloud.google.com/agent-registry/reference/rest.
- Source: https://docs.cloud.google.com/agent-registry/search-agents-and-tools (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: the source's `curl` commands have no `--fail-with-body`.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). These examples need curl 7.76.0 or later (`--fail-with-body`; `-H @file` needs 7.55.0); `man curl` 8.7.1 ends the `--fail-with-body` entry with "Added in 7.76.0.". `-q` is the first argument because for `-q, --disable` the manual says "If used as the first parameter on the command line, the curlrc config file is not read or used.", so a `trace` line in `.curlrc` cannot write the headers to a file. The subshell starts with `set +x` (no tracing of the token) and `set +a` (an inherited `set -a` would export `TOKEN` to `curl`), and `unset` at its start also drops an inherited `export TOKEN`; `TOKEN` does not stay in the calling shell.

## Related

- [concepts.md](./concepts.md)
- [setup.md](./setup.md)
- [overview.md](./overview.md)
