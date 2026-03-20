# Transports and systemd

`systemd` makes it complicated to use pipes in services. A subshell can be used to overcome this challenge.

## Configuration

Use a subshell in the `ExecStart` directive to pipe Pino output through a transport:

```
ExecStart=/bin/sh -c '/path/to/node app.js | pino-transport'
```

## Notes

- `systemd` does not natively support piped commands in service definitions
- Wrapping the command in `/bin/sh -c '...'` allows pipes to work correctly
- Replace `pino-transport` with the actual transport command (e.g., `pino-pretty`, `pino-elasticsearch`)

## Related

- [transports](../features/transports.md)
- [ecosystem](../integrations/ecosystem.md)
- [best-performance-stdout](./best-performance-stdout.md)
