---
source: https://modelcontextprotocol.io/docs/2026-07-28/sdk
---

# SDKs

Official SDKs for building MCP servers and clients. SDKs are classified into tiers based on feature completeness, protocol support, and maintenance commitment.

## Signature / Usage

Each SDK provides the same functionality but follows the idioms and best practices of its language. All SDKs support:

- Creating MCP servers that expose tools, resources, and prompts
- Building MCP clients that can connect to any MCP server
- Local and remote transport protocols
- Protocol compliance with type safety

Visit the SDK page for your chosen language to find installation instructions, documentation, and examples.

```text
Build a Server: /docs/2026-07-28/develop/build-server
Build a Client: /docs/2026-07-28/develop/build-client
```

## Options / Props

| SDK | Repository | Tier |
| --- | --- | --- |
| TypeScript (https://ts.sdk.modelcontextprotocol.io) | modelcontextprotocol/typescript-sdk | Tier 1 |
| Python (https://py.sdk.modelcontextprotocol.io) | modelcontextprotocol/python-sdk | Tier 1 |
| C# (https://csharp.sdk.modelcontextprotocol.io) | modelcontextprotocol/csharp-sdk | Tier 1 |
| Go (https://go.sdk.modelcontextprotocol.io) | modelcontextprotocol/go-sdk | Tier 1 |
| Java (https://java.sdk.modelcontextprotocol.io) | modelcontextprotocol/java-sdk | Tier 2 |
| Rust (https://rust.sdk.modelcontextprotocol.io) | modelcontextprotocol/rust-sdk | Tier 2 |
| Swift | modelcontextprotocol/swift-sdk | Tier 3 |
| Ruby (https://ruby.sdk.modelcontextprotocol.io) | modelcontextprotocol/ruby-sdk | Tier 3 |
| PHP (https://php.sdk.modelcontextprotocol.io) | modelcontextprotocol/php-sdk | Tier 3 |
| Kotlin (https://kotlin.sdk.modelcontextprotocol.io) | modelcontextprotocol/kotlin-sdk | Tier 3 |

## Notes

- Repositories are on GitHub under `github.com/<repository>`.
- The page links to "SDK Tiering System" (`/community/sdk-tiers`) for the meaning of each tier; that page is not part of this reference.
- The source does not state which protocol version each SDK implements.
- This skill covers the protocol itself; SDK API usage lives in each SDK's own documentation.

## Related

- [Client Best Practices](./client-best-practices.md)
- [MCP Inspector](./inspector.md)
