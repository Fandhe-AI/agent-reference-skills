---
source: https://docs.cloud.google.com/application-integration/docs/tasks
---

# Tasks

A task is a well-defined unit of work in an integration. A task takes an input, completes a unit of work, and produces an output. It is started by a trigger or by another task. Tasks are added from the **Tasks** list in the integration editor, where you can search and browse tasks, connectors and recently created connections.

## Signature / Usage

### Connectors as a task type

Connectors are a task type that connects to an external system or service (for example reading from a database, sending an email, or making a REST call). A connector task that supports custom SQL can use parameters represented by question marks:

```text
SELECT * FROM Employees where LastName=?
```

## Options / Props

| Item | Description |
|------|-------------|
| Connectors | Add a recently created connection or any supported connector; see [configure-connectors-task.md](./configure-connectors-task.md) |
| Search | Search connectors, connections and tasks by name in the **Search** field |
| All tasks and triggers | List of out-of-the-box tasks: https://docs.cloud.google.com/application-integration/docs/all-triggers-tasks |

## Notes

- Snippet taken from https://docs.cloud.google.com/application-integration/docs/configure-connectors-task (the tasks page has no code block).
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/tasks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [triggers.md](./triggers.md)
- [configure-connectors-task.md](./configure-connectors-task.md)
- [configure-call-rest-endpoint-task.md](./configure-call-rest-endpoint-task.md)
- [configure-javascript-task.md](./configure-javascript-task.md)
- [configure-for-each-parallel-task.md](./configure-for-each-parallel-task.md)
