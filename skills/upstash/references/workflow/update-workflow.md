# Update a Workflow

How code changes affect in-progress workflow runs. The step order of an existing run cannot be changed.

## Signature / Usage

If a change removes or reorders existing steps, in-progress runs may continue from a point that no longer exists and fail with:

```bash
HTTP status 400. Incompatible step name. Expected <STEP_NAME>, got <STEP_NAME>
```

### Safe changes

- No active workflow runs exist
- Only new steps are added to the end of the workflow

### Guidelines

| Approach | Description |
|----------|-------------|
| Accept potential failures | If in-progress runs may fail, any code change is allowed |
| Use a different route | Serve the updated workflow under a different route |
| Stop traffic before deployment | If the route must stay the same, stop all traffic before deploying |
| Add steps only | If stopping traffic is not possible, only add new steps at the end |

## Notes

- Related DLQ behavior: when resuming a run from the DLQ, only change code after the failed steps
- Source: fetched 2026-10 from https://upstash.com/docs/workflow/howto/changes

## Related

- [how-it-works](./how-it-works.md)
- [dlq](./dlq.md)
- [best-practices](./best-practices.md)
