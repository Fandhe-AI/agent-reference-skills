# Event Naming Conventions

Recommended patterns for naming Inngest events consistently across your application.

## Signature / Usage

Recommended format: `[prefix/]entity.action`

```ts
// Prefixed with application or service name
"app/user.created"
"app/invoice.paid"
"billing/subscription.renewed"

// Third-party / webhook events prefixed by provider
"stripe/charge.failed"
"clerk/user.created"
"github/push"
```

## Notes

- **Object-Action pattern**: Use a noun (entity) + past-tense verb (action), e.g., `user.created`, `order.completed`, `invoice.paid`.
- **Past tense**: Actions should describe something that already happened — `uploaded`, `paid`, `completed`, `sent`.
- **Lowercase**: Use lowercase throughout. Separate words with dots (`.`) or underscores (`_`).
- **Prefix with slash**: Add a prefix followed by `/` to group related events. Useful when multiple services or applications share the same Inngest environment (e.g., `billing/`, `stripe/`, `app/`).
- **Wildcards rely on separators**: Inngest wildcard matching (`*`) works after `/` and `.` characters, so consistent use of these separators enables pattern-based triggers like `app/user.*` or `stripe/*`.
- **Consistency matters most**: Pick a convention and apply it uniformly. Consistent names make functions easier to discover and trigger.

## Related

- [Sending Events](./sending-events.md)
- [Event Payload Schema](./event-payload-schema.md)
- [Multiple Triggers and Wildcards](./multiple-triggers.md)
