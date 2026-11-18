---
source: https://docs.cloud.google.com/application-integration/docs/edge-and-edge-conditions
---

# Edge and edge conditions

An edge connects two elements (trigger to task, or task to task) and denotes the direction of control flow. An edge condition must be met for control to pass to the connected task; the task runs only if the condition is met. Combined with forks and joins, edges implement branching.

## Signature / Usage

Reference variables with `$` before and after the name. Combine multiple checks with `AND` / `OR`, repeating the variable in each check. Example edge condition:

```text
$productId$ > 5 AND $productId$ < 9
```

## Options / Props

### Edge configuration

| Field | Description |
|-------|-------------|
| Label | Optional custom name for the edge |
| Condition | Edge condition built from the supported operators and functions |

### Supported operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equality | `$var$ = "value"` |
| `!=` | Inequality | `$var$ != "value"` |
| `<` | Less than | `5 < 10` |
| `<=` | Less than or equal | `$var$ <= 5` |
| `>` | Greater than | `1 > 0` |
| `>=` | Greater than or equal | `$var$ >= 0` |
| `:` | String contains a substring, or list contains a primitive value | `$longString$ : "substring"`, `$list of values$ : "value"` |
| `AND` | True if both expressions are true | `$a$ > $b$ AND $b$ < $c$` |
| `OR` | True if any expression is true | `$a$ > $b$ OR $b$ < $c$` |
| `NOT` | Negation | `NOT($var$ = "value")` |

### Supported functions

| Function | Description |
|----------|-------------|
| `exists(VARIABLE)` | Variable exists |
| `does_not_exist(VARIABLE)` | Variable does not exist |
| `is_empty(VARIABLE)` | Variable is a list AND is empty; supports array types except JSON array |
| `is_not_empty(VARIABLE)` | Variable is a list AND is not empty; supports array types except JSON array |

## Notes

- Text without `$` notation is a literal value (the text `customerId` is the literal string).
- Do not write `$productId$ > 5 AND < 9`; write `$productId$ > 5 AND $productId$ < 9` (the example above). To check whether `productId` is greater than 10, the syntax is `$productId$ > 10`.
- Edge conditions are useful when a task has multiple incoming edges, each checking specific conditions.
- The option to select a service account when creating an integration is shown only if integration governance is enabled for the selected region. The **Regions** list shows only provisioned regions.
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/edge-and-edge-conditions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [variables.md](./variables.md)
- [triggers.md](./triggers.md)
- [tasks.md](./tasks.md)
