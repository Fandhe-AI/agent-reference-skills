---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/variable
---

# Variables

Variables store and retrieve data across conversational turns so agents keep context. All variables are defined the same way in the agent builder and referenced in instructions either as static variables (`{{variable_name}}`) or dynamic variables (`{variable_name}`).

## Signature / Usage

### Static variable reference

```text
You are a helpful shopping assistant.
Please follow these business rules: {{business_rules}}.
```

### Dynamic variable reference

```text
If the user asks for their balance, call the {@TOOL: LookupBalance}.
The tool will update the {current_account_balance} variable.
Always share the {current_account_balance} with the user.
```

### Update a variable from Python tool code

The official page says "A global variable called `context` is available to use in your Python tool code"; `value` stands for the new value you assign (the official example does not define it).

```python
context.state["variable_name"] = value
```

## Notes

- Variable data: Name (snake case); Type (Text: string values, Number: numeric values, Yes/No: boolean values, Custom Object: you provide a schema, List: list of variables, values as a comma delimited list); Default value; Description (optional).
- Built-in session context variables: `$context.project_id`, `$context.project_number`, `$context.location`, `$context.app_id`, `$context.session_id`, `$context.turn_index` (app-level and session-level resource IDs); `$context.variables.variable_name` (a specific agent variable value); `$context.variables` (all agent variable values as an object).
- Static variables are compiled into the agent prompt before the model call as a direct 1:1 text substitution; best for infrequently updated values (configuration data, rigid business rules, large contextual payloads). They maximize instruction following quality. To include or exclude instructions conditionally use modular components (`{% if %}` blocks) instead of storing instruction text in a variable.
- Warning from the source: changing rendered instruction text during a conversation (updating a `{{variable_name}}` value or switching `{% if %}` branches) invalidates prompt caching, which can lead to higher model call latency.
- Dynamic variables can be updated by tools, callbacks or API requests at any point; their new values are appended to the conversation history as `state update` events, for example `<state_update>var_name: value</state_update>`. Disadvantages: if a long session exceeds the context window limit the agent may forget values lost when trimming history; instruction adherence can be slightly lower and latency higher because the value sits further from the instruction.
- The agent itself cannot update a variable; tools and callbacks can. Variables use ADK context state, and a global `context` variable is available in Python tool code.
- Warning from the source: instruction templates are rendered after the `before_agent` callback and before the `before_model` callback. Updates in `before_agent` take effect on the current turn; updates in `before_model` are not reflected in the rendered instructions until subsequent turns. Use `before_agent_callback` to update variables that control the current turn's instructions.
- The built-in `$context.*` variables are available to OpenAPI and MCP tools in HTTP headers or request parameters; they cannot be referenced in instructions and cannot be manually overwritten.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/variable (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [instruction.md](./instruction.md)
- [modular-components.md](./modular-components.md)
- [callback.md](./callback.md)
