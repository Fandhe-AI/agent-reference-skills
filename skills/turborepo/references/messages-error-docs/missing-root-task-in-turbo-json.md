# Missing root task in turbo.json

Error raised when a task depends on a root package script (via `//#<task>`) that is not registered in `turbo.json`.

## Signature / Usage

```json
{
  "tasks": {
    "//#build": {}
  }
}
```

## Notes

- Root tasks are scripts defined in the monorepo's root `package.json`. The root package is an implicit dependency of every workspace package, so its task would otherwise run first.
- If the root task does **not** invoke `turbo`, register it under `tasks` with the `//#` prefix so other tasks can depend on it (e.g. `dependsOn: ["//#build"]`).
- If the root task **does** invoke `turbo`, do not depend on it directly — doing so causes infinite recursion. Instead, depend on the individual tasks the root task would have run.

## Related

- [recursive-turbo-invocations](./recursive-turbo-invocations.md)
- [turbo-json](../configuration/turbo-json.md)
