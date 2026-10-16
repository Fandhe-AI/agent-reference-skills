# Submit Desktop-Only Plugins

Desktop-only plugins require local execution on the user's computer. This includes most plugins with a local (stdio) MCP server and plugins that call local programs. They display a **Desktop only** badge in the OpenAI Plugin Directory and can only be installed from the ChatGPT desktop app. Users can mention them only in threads that run locally.

## Signature / Usage

Replace the HTTP server entry under `mcpServers` in root `mcp.json` with a stdio entry that defines the local launch command. The server can use any language or runtime that supports MCP over stdio. Example for a Node.js server:

```json
{
  "type": "stdio",
  "command": "node",
  "args": ["${PLUGIN_ROOT}/server/dist/index.js"],
  "cwd": "${PLUGIN_ROOT}"
}
```

Include the server and its dependencies in the package. `${PLUGIN_ROOT}` is a built-in placeholder.

### Submit a plugin with a local MCP server

1. Find the submitting organization's ID in your OpenAI Platform organization settings.
2. Send the ID to your OpenAI representative and ask them to have your organization allowlisted for local MCP submissions. Wait for confirmation before submitting.
3. Open the plugin submission portal, select **Create plugin**, and choose **Skills only**. Use **Upload ZIP** to upload your plugin package, including its local MCP configuration.
4. Complete the submission requirements (see `submission.md`) and submit for review. After approval, publish from the portal.

### Plugins without an MCP server

If your skills-only plugin requires desktop execution, set `requires_local_executor` to `true` in `extensions.com.openai` in your root `plugin.json`:

```json
{
  "extensions": {
    "com.openai": {
      "requires_local_executor": true
    }
  }
}
```

For a legacy package using `.codex-plugin/plugin.json`, add `"requires_local_executor": true` at the top level of that manifest instead.

## Notes

- Approval required: local MCP submissions are limited to approved partners. Contact your OpenAI representative to confirm eligibility and have your submitting organization allowlisted before following these steps.
- Before submitting, package your plugin and test a clean desktop installation and its main workflows. Complete the standard submission prerequisites, including submission access and developer or business identity verification.
- The `requires_local_executor` flag marks the plugin as **Desktop only**; follow the standard submission flow. If the portal reports that the field isn't allowed, send your submitting organization's ID to your OpenAI representative to confirm submission access.
- Source: https://developers.openai.com/plugins/deploy/desktop-only

## Related

- [Submit Plugins](./submission.md)
- [Submission errors](./submission-errors.md)
