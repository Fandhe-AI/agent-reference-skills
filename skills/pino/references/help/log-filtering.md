# Log Filtering

The Pino philosophy advocates using common, preexisting system utilities for filtering logs.

## Using grep

Filter logs by level value using `grep`:

```sh
$ # View all "INFO" level logs
$ node app.js | grep '"level":30'
```

## Using jq

Filter logs using the JSON processor `jq`:

```sh
$ # View all "ERROR" level logs
$ node app.js | jq 'select(.level == 50)'
```

## Notes

- Pino outputs structured JSON, making it easy to filter with standard tools
- `grep` works well for simple level-based filtering using the numeric level values
- `jq` provides more powerful JSON-aware filtering with selectors
- Default Pino log levels: trace=10, debug=20, info=30, warn=40, error=50, fatal=60

## Related

- [log-levels-as-labels](./log-levels-as-labels.md)
- [options](../api/options.md)
