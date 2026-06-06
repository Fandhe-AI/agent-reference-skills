# Parallel Steps

Run multiple workflow steps concurrently using `Promise.all()`. Each step executes as a separate HTTP request managed by QStash.

## Signature / Usage

```typescript
// Run context.run() steps in parallel
const [coffeeBeansAvailable, cupsAvailable, milkAvailable] =
  await Promise.all([
    context.run("check-coffee-beans", () => checkInventory("coffee-beans")),
    context.run("check-cups",         () => checkInventory("cups")),
    context.run("check-milk",         () => checkInventory("milk")),
  ])

// Mix step types
const [userData, apiResponse] = await Promise.all([
  context.run("fetch-user",   () => db.getUser(id)),
  context.call("fetch-quota", { url: "https://api.example.com/quota", method: "GET" }),
])
```

## Notes

- No special API is needed; use native `Promise.all()` with any mix of `context.run()`, `context.call()`, or `context.sleep()` calls
- All promises in a workflow must be awaited; unawaited promises can cause unexpected behavior or errors
- Results are available as usual once awaited
- The Upstash dashboard visualizes parallel execution with a timeline view

## Related

- [context.run](./context-run.md)
- [context.call](./context-call.md)
