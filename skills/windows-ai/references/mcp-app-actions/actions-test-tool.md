# The App Actions Testing Playground app

A tool for validating that App Actions register correctly with the system and for testing their functionality without writing a full consumer app.

## Signature / Usage

1. Download and install the App Actions Testing Playground app (`aka.ms/AppActionsTestingPlayground`).
2. Deploy your provider app so its actions are registered.
3. On the **Action catalog** tab, select your action; choose an **Overloads** entry if multiple input combinations exist.
4. Under **Inputs**, select or add a test entity.
5. Click **Run Action** and observe the response in the launched app / modal dialog.

## Notes

- Before testing, set `allowedAppInvokers` to `["*"]` in the action definition JSON so the Testing Playground app itself can discover and invoke the action.
- The **Registrations** tab shows the raw JSON registration for all registered actions.

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Action definition JSON schema](./actions-json.md)
- [Test MCP servers on Windows](./test-mcp-server.md)
