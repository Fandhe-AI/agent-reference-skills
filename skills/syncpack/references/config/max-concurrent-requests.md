# maxConcurrentRequests

Source: https://syncpack.dev/config/max-concurrent-requests/

The maximum number of HTTP requests to the npm registry to keep in-flight at any given time when running the `update` command.

## Property

| Name | Type | Default |
|------|------|---------|
| `maxConcurrentRequests` | `number` | `12` |

## Configuration

```json
{
  "maxConcurrentRequests": 12
}
```

## Notes

- Only used by the `update` command
- Lower values reduce network/registry load at the cost of slower update checks
- Higher values speed up update checks but increase concurrent connections
