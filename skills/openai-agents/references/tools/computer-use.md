# Computer Use

Hosted `computer` tool: the model inspects screenshots and returns structured UI actions (click, type, scroll) for your harness to execute, enabling models to operate software through UI interaction.

## Signature / Usage

```json
{ "type": "computer" }
```

## Request/Response Loop

1. Send a task to the model with the `computer` tool enabled.
2. Inspect the returned `computer_call`.
3. Run every action in the returned `actions[]` array, in order.
4. Capture the updated screen and send it back as `computer_call_output`.
5. Repeat until the model stops returning `computer_call`.

## Integration Approaches

- **Built-in Computer Use Loop**: model inspects screenshots, returns actions, your harness executes them iteratively.
- **Custom Tool/Harness**: expose existing Playwright/Selenium/VNC automation as a standard tool interface.
- **Code-Execution Harness**: model writes and executes short scripts in an isolated runtime, combining visual and programmatic interaction; suits workflows needing loops, conditionals, or DOM inspection.

## Notes

- Deprecated preview tool type `computer_use_preview` used `display_width` / `display_height` / `environment` fields; the current GA `computer` tool batches actions into an `actions[]` array. New integrations should use `computer` with `gpt-5.5`, not `computer_use_preview` — keep the preview path only to maintain older integrations.
- Run the browser/environment isolated, disable extensions, and use disposable containers with resource limits for code execution.
- Treat screenshots, page text, tool outputs, PDFs, emails, chats, and other third-party content as untrusted input; only user-authored prompt instructions count as valid intent. Require human confirmation immediately before high-risk actions (deleting data, transmitting sensitive information, bypassing security barriers).

## Related

- [Shell](./shell.md)
- [Local Shell](./local-shell.md)
