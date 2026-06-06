# Multiple Triggers and Wildcards

A single function can listen on up to 10 triggers (events and/or cron schedules), and event names support wildcard matching after `/` and `.` separators.

## Signature / Usage

```ts
// Multiple event + cron triggers
inngest.createFunction(
  {
    id: "resync-user-data",
    triggers: [
      { event: "user.created" },
      { event: "user.updated" },
      { cron: "0 5 * * *" }, // every morning at 5 AM
    ],
  },
  async ({ event, step }) => {
    // event.name to distinguish which trigger fired
  },
);

// Wildcard triggers
inngest.createFunction(
  { id: "handle-app-events" },
  { event: "app/*" }, // matches app/user.created, app/blog.post.published, etc.
  async ({ event }) => { /* ... */ },
);
```

## Options / Props

| Wildcard Pattern | Matches |
|------------------|---------|
| `app/*` | `app/user.created`, `app/invoice.paid`, ... |
| `app/user.*` | `app/user.created`, `app/user.updated`, ... |
| `app/blog.post.*` | `app/blog.post.published`, `app/blog.post.deleted`, ... |

## Notes

- Maximum 10 triggers per function.
- Wildcards (`*`) are only valid **after** `/` or `.` — not after arbitrary characters and not in the middle of a segment.
- Use `event.name` inside the handler to determine which trigger fired. TypeScript narrows the event type automatically based on the name check.
- Only one execution fires per overlapping cron schedule per second — no duplicate cron runs.
- Wildcard triggers require explicit TypeScript `eventType()` definitions for proper type narrowing.

## Related

- [Event Naming Conventions](./event-naming-conventions.md)
- [Fan-out](./fan-out.md)
- [TypeScript Event Types](./typescript-event-types.md)
