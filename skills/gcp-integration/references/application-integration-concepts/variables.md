---
source: https://docs.cloud.google.com/application-integration/docs/variables
---

# Variables

A variable is an integration element that holds and transports data between the tasks, triggers and edges of an integration. Variables can be defined statically at design time or passed in at runtime, can reference other variables, and can be global or local to a task.

## Signature / Usage

### Variable references

Tasks, triggers and edges read and write variables through references of the form `$paramKey$`. References can be used in task parameters, trigger parameters and edge conditions.

```text
$isNameUnique$ = true AND $numAccounts$ >= 1
```

Template with references (email body):

```text
Hello $userName$, thank you for your order! Your order ID is $orderID$.
```

Auto-generated (task) variables must be referenced by their full unique name, including backticks and the Task ID, inside the dollar delimiters, for example ``$`Task_5_responseBody`$``.

### ErrorInfo system variable

```text
{
  "ErrorInfo": {
  "message": String,
  "code": Number
  }
}
```

## Options / Props

### Variable kinds

| Kind | Set by | Behavior | Example |
|------|--------|----------|---------|
| Config variable | Design time | Editable when you publish the integration | Target notification email address |
| System variable | System | Read-only | `ExecutionId` |
| Integration variable | Your integration | Editable during execution | Result of a task |
| Task variable (auto-generated) | Executing a task | Cannot be edited or deleted; named `` `<Task ID>_<Variable Name>` `` | `` `Task_5_responseBody` `` |

### System variables

| Name | Description |
|------|-------------|
| `ErrorInfo` | Error details of a failed execution (`message`, `code`); preferred over a custom `ErrorMessage` variable |
| `ExecutionMode` | Mode of execution: `SYNC` or `ASYNC` |
| `ExecutionId` | Execution ID of the integration |
| `IntegrationName` | Name of the integration |
| `Region` | Region of the integration |
| `ProjectId` | Project ID that contains the integration |

### Variable type (Create Variable pane)

| Type | Description |
|------|-------------|
| None | A local variable in an integration |
| Config variable for Integration | A config variable |
| Input to Integration | Provided as an input to the executed trigger |
| Output from Integration | Final value is output to the caller |
| Input and Output of Integration | Both of the above |

### Data types

| Data type | Example |
|-----------|---------|
| String / String array | `Alex` / `Alex, Kai, Raha` |
| Integer / Integer array | `30` / `30, 25, 22` |
| Double / Double array | `30.5` / `30.5, 25.34, 22.134` |
| Boolean / Boolean array | `true` / `true, false, false` |
| JSON | `{ "employee":{"name":"Alex", "age":30, "city":"Mountain View"} }` |

### JSON schema options (JSON variables only)

| Option | Description |
|--------|-------------|
| Infer from a sample JSON payload | Schema generated from a sample payload; only the schema is saved |
| Enter a JSON schema | Enter the whole schema manually |
| Infer from the default value | Schema generated from the default value |
| None | No JSON schema |

## Notes

- A value passed dynamically with the trigger overwrites a static assignment of the same variable. The variable roles input / output are not mutually exclusive.
- Config variables are not a secret store: values are stored and exported in plain text (also on download or when shared as a template), and masking in logs is not supported for them. Do not store passwords, API keys, tokens or other credentials in config variables; use an authentication profile or the Secret Manager access task (Secret Manager itself is in `gcp-security`).
- Masking a variable in logs applies to execution logs only and requires masking to be enabled for the integration and the region; it does not redact values on download or export.
- At runtime, input data is converted into an in-memory `Event` object; tasks read and write variables through it.
- In the **Variables** pane task variables may be listed by output name (for example `responseBody`) without Task ID or backticks; click the variable to see the full unique name.
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/variables (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [edge-and-edge-conditions.md](./edge-and-edge-conditions.md)
- [error-handling.md](./error-handling.md)
- [configure-javascript-task.md](./configure-javascript-task.md)
