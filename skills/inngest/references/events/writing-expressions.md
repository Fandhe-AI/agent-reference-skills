# Writing Expressions

Expressions configure keys and conditional matching for functions (concurrency, rate limiting, debounce, idempotency keys, `waitForEvent`/cancellation matching, trigger `if`, run priority). All expressions use the [Common Expression Language (CEL)](https://github.com/google/cel-go).

## Signature / Usage

```js
// Boolean expression (wait for event, cancellation, trigger `if`)
"event.data.billingPlan == 'enterprise' && event.data.amount > 1000"

// Match a triggering event against an incoming async event
"event.data.userId == async.data.userId"

// Value expression (concurrency/rate-limit/debounce/idempotency key)
"event.data.id"

// Dynamic value expression (e.g. run priority)
`event.data.billingPlan == 'enterprise' ? 0 : 1800`
```

## Options / Props

| Variable | Available in | Description |
|----------|---------------|--------------|
| `event` | All expressions | The event that triggered the function run |
| `async` | `step.waitForEvent`, cancellation | The incoming event being matched asynchronously |

## Notes

- Expressions evaluate to either a boolean (conditional matching: wait for event, cancellation, trigger `if`) or a value (keys for concurrency/rate limit/debounce/idempotency, or dynamic values like run priority).
- Use `+` to concatenate strings and `==` for equality checks.
- In the TypeScript SDK, write expressions within backticks to use quotes or JavaScript string interpolation.
- Use the ternary operator (`?:`) instead of `||` for conditional returns — CEL's `||` always returns a boolean, unlike JavaScript's short-circuit value return.
- Inngest supports only a subset of CEL's helpers and macros to ensure performance and reliability at scale.
- Test expressions with [Undistro's CEL Playground](https://playcel.undistro.io/) before use, especially for conditional returns.

## Related

- [Multiple Triggers and Wildcards](./multiple-triggers.md)
