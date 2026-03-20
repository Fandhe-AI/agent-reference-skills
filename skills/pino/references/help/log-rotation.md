# Log Rotation

Pino recommends using a separate tool for log rotation, specifically logrotate.

## Using logrotate

Given that logs are output to a file:

```bash
$ node server.js > /var/log/myapp.log
```

Configure logrotate by adding the following to `/etc/logrotate.d/myapp`:

```
/var/log/myapp.log {
       su root
       daily
       rotate 7
       delaycompress
       compress
       notifempty
       missingok
       copytruncate
}
```

## copytruncate Caveat

The `copytruncate` configuration has a very slight possibility of lost log lines due to a gap between copying and truncating -- the truncate may occur after additional lines have been written.

To perform log rotation without `copytruncate`, see the reopening log files approach.

## Notes

- Use an external tool like `logrotate` rather than handling rotation in-process
- `copytruncate` is the simplest approach but has a small risk of lost lines
- For zero-loss rotation, use `pino.destination` with signal-based reopening instead

## Related

- [reopening-log-files](./reopening-log-files.md)
- [saving-to-multiple-files](./saving-to-multiple-files.md)
- [best-performance-stdout](./best-performance-stdout.md)
