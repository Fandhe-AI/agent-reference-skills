# Connect and Test Your Plugin

Test each capability before testing the complete installed plugin: connect and evaluate the MCP server in developer mode first, then package the plugin with its skills and test the complete experience. Skills-only plugins can skip the MCP section.

## Signature / Usage

```bash
npx @modelcontextprotocol/inspector@latest
```

## Test an MCP server (optional)

### Prepare the endpoint

Confirm that:

- The MCP server is reachable through a public HTTPS endpoint or Secure MCP Tunnel.
- A public endpoint supports streamable HTTP, typically at `/mcp`, or the tunnel can reach its configured stdio or HTTP MCP server.
- Tool names, descriptions, schemas, and annotations are present.
- Authentication discovery works for tools that require an account.

Secure MCP Tunnel connects a private MCP server in developer mode without exposing it publicly. A development tunnel or another HTTPS forwarding service can also provide a local testing endpoint, but these do not replace the public HTTPS endpoint required for plugin submission.

### Inspect the MCP server

Use MCP Inspector to list and call tools directly. Exercise each tool with representative inputs, edge cases, missing identifiers, and empty results. Verify schema validation, authentication errors, annotations, confirmation behavior, and the model-readable result.

### Enable developer mode

In ChatGPT: **Settings** → **Security and login** → turn on **Developer mode**. Availability can depend on account and workspace policy.

### Add the MCP server

1. Go to ChatGPT Plugins.
2. Select the plus button.
3. Enter a user-facing name and description.
4. Under **Connection**, choose the connection method:
   - Public endpoint: enter the MCP server URL, including the `/mcp` path.
   - Secure MCP Tunnel: select **Tunnel**, then choose an available tunnel or enter its `tunnel_id`.
5. Create the connection.
6. Review the tools and metadata discovered from the server.

If ChatGPT cannot connect, verify the public HTTPS endpoint with MCP Inspector, or check the tunnel's workspace association and `tunnel-client` status. Resolve transport, initialization, schema, or authentication errors before continuing.

### Check tool selection

Start a new conversation, add the MCP connection, and create an evaluation set that includes:

- Direct requests that should call a specific tool.
- Indirect requests that express the same goal.
- Follow-up requests that reuse identifiers from earlier results.
- Write actions that require authorization or confirmation.
- Unsupported requests that shouldn't call a tool.

For each request, record the selected tool, arguments, result, errors, and confirmation behavior. Rerun the set whenever you change tool names, descriptions, schemas, or annotations. If the server returns optional UI, test both the component and the model-readable result.

### Test through the API Playground

For raw request/response logs, open the API Playground: **Tools → Add → MCP Server**, enter the HTTPS endpoint and connect, then run test prompts.

### Refresh metadata

After changing tool names, descriptions, schemas, annotations, authentication, or UI resources:

1. Deploy or restart the MCP server.
2. Open the connection at ChatGPT Plugins.
3. Select **Refresh**.
4. Confirm that the advertised metadata changed.
5. Start a new conversation and rerun the affected tests.

This refresh flow applies only to MCP servers connected in developer mode. Published plugins with MCP use reviewed metadata snapshots (see submission.md); to update published metadata, scan the server, submit a new version, and publish the approved version.

Before packaging the plugin, confirm that:

- The tool list matches the documented capabilities.
- Structured results match each tool's declared output schema.
- Authentication failures return useful errors.
- Positive prompts select the expected tools and negative prompts don't.
- Optional UI renders without console errors and restores state correctly.

## Test the complete plugin

After the MCP server works — or immediately for a skills-only plugin — package and install the complete plugin from a local source:

1. Package the plugin with its skills, manifest, and MCP server connection when applicable.
2. Add the plugin to a local marketplace and install it from the Plugins Directory.
3. Start a new conversation with the plugin enabled.
4. Run representative requests from the plugin's use-case inventory.

Create an evaluation set that includes:

- Direct requests that should use a skill.
- Indirect requests that express the same goal.
- Follow-up requests that depend on an earlier result.
- Negative requests that shouldn't use the plugin.
- Boundary cases that the plugin intentionally doesn't support.

For each request, check that the plugin follows the skill instructions, uses the expected resources, completes every required step, and produces a useful result. Record any missing steps, unnecessary activations, or inconsistent results.

For plugins with an MCP server, also confirm that skills invoke the right tools, tool results return to the workflow, authentication works after installation, and users can complete each combined workflow from start to finish.

## Notes

- Before submission, confirm: each skill activates for intended requests with consistent behavior; unsupported requests don't activate the plugin; bundled files and references resolve after installation; starter prompts represent completable workflows; and, for plugins with an MCP server, bundled skills and tools work together as intended.
- Maintain evaluation prompts and results throughout development to track behavioral changes across releases.

## Related

- [Review Requirements](./review-requirements.md)
- [Submission](./submission.md)
- [Troubleshooting](./troubleshooting.md)
