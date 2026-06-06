# context.run()

Executes custom business logic as a named workflow step. Returns a Promise resolving to any JSON-serializable value.

## Signature / Usage

```typescript
const result = await context.run("step-name", async () => {
  return someWork(input)
})

// Parallel execution
const [r1, r2] = await Promise.all([
  context.run("step-1", async () => fetchA()),
  context.run("step-2", async () => fetchB()),
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stepName` | `string` | Unique identifier for the step within this workflow |
| `stepFunction` | `() => Promise<T>` | Business logic to execute; must return a JSON-serializable value |

## Notes

- Returned values are automatically serialized and restored across workflow executions; once a step succeeds it is never re-run
- Do not return stateful resources (database connections, file handles); return plain data instead
- Class instances deserialize as plain objects — restore methods with `Object.assign(new MyClass(), serialized)`
- All promises in a workflow must be awaited; unawaited promises can cause unexpected behavior

## Related

- [context](./context.md)
- [parallel-steps](./parallel-steps.md)
