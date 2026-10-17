# registry

| Name | Description | Path |
| --- | --- | --- |
| Package Types | The MCP Registry supports several package types, each with its own ownership verification method. | [package-types.md](./package-types.md) |
| MCP Registry | The MCP Registry is the official centralized metadata repository for publicly accessible MCP servers, backed by contributors such as Anthropic, GitHub, PulseMCP, and Microsoft. It hosts metadata (not artifacts) in a standardized `server.json` format. | [registry-about.md](./registry-about.md) |
| Registry Aggregators | Aggregators are downstream consumers of the MCP Registry (e.g. a server marketplace with ratings and security scanning). The registry offers an unauthenticated read-only REST API for them. | [registry-aggregators.md](./registry-aggregators.md) |
| Registry Authentication | Publishing to the official MCP Registry requires authentication. The method chosen determines the namespace of the server name. | [registry-authentication.md](./registry-authentication.md) |
| Registry Versioning | Rules for the `version` string of servers published to the MCP Registry. | [registry-versioning.md](./registry-versioning.md) |
| Remote Servers | Remote MCP servers are published via the `remotes` property in `server.json`. | [remote-servers.md](./remote-servers.md) |
| server.json | Publishing flow for the MCP Registry using the `mcp-publisher` CLI: add verification info to the package, publish the package, create `server.json`, authenticate, publish. | [server-json.md](./server-json.md) |
