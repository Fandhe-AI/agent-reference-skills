# ESLint Plugin

`@inngest/eslint-plugin` provides rules to enforce best practices when writing Inngest functions.

## Signature / Usage

```sh
npm install -D @inngest/eslint-plugin
```

```json
{
  "plugins": ["@inngest"],
  "extends": ["plugin:@inngest/recommended"]
}
```

Or configure rules manually:

```json
{
  "plugins": ["@inngest"],
  "rules": {
    "@inngest/await-inngest-send": "warn"
  }
}
```

## Options / Props

| Name | Recommended | Description |
|------|-------------|-------------|
| @inngest/await-inngest-send | warn | Use `await` or `return` before `inngest.send()`. |
| @inngest/no-nested-steps | error | `step.*` inside a `step.run()` function is not allowed. |
| @inngest/no-variable-mutation-in-step | error | Do not mutate variables inside `step.run()`; return the result instead. |

## Examples

```ts
// await-inngest-send
// Bad
inngest.send({ name: "some.event" });
// Good
await inngest.send({ name: "some.event" });

// no-variable-mutation-in-step
// Bad: step.run only runs once and is skipped on later executions, userId is undefined
let userId;
await step.run("get-user", async () => { userId = await getRandomUserId(); });
// Good
const userId = await step.run("get-user", () => getRandomUserId());
```

## Notes

- `await-inngest-send`: in serverless environments runtimes are often killed once the handler resolves, cancelling pending promises. Turn it off only if you control the runtime or `await` the send later.
- `no-nested-steps`: nesting `step.run()` is not supported and errors at runtime. If steps depend on each other, extract them into a separate function that runs them in sequence.
- `no-variable-mutation-in-step`: Inngest executes the function multiple times per run and memoizes step state, so code inside `step.run()` is not run on every execution.
- The config uses the `plugin:@inngest/recommended` name (the official page also shows a `recommend` typo in prose).

## Related

- [Create Function](./create-function.md)
- [inngest.send()](./send-event.md)
