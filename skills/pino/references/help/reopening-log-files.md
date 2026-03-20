# Reopening Log Files

In cases where a log rotation tool does not offer copy-truncate capabilities, or where using them is deemed inappropriate, `pino.destination` can reopen file paths after a file has been moved away.

## Signal-Based Reopening

Set up a `SIGUSR2` or `SIGHUP` signal handler that reopens the log file destination. Write the process PID to a well-known location so the log rotation tool knows where to send the signal.

```js
// write the process pid to a well known location for later
const fs = require('node:fs')
fs.writeFileSync('/var/run/myapp.pid', process.pid)

const dest = pino.destination('/log/file')
const logger = require('pino')(dest)
process.on('SIGHUP', () => dest.reopen())
```

## logrotate Configuration with postrotate

The log rotation tool can be configured to send the signal to the process after a log rotation event has occurred:

```
/var/log/myapp.log {
       su root
       daily
       rotate 7
       delaycompress
       compress
       notifempty
       missingok
       postrotate
           kill -HUP `cat /var/run/myapp.pid`
       endscript
}
```

## Notes

- This approach avoids the small risk of lost log lines inherent in `copytruncate`
- `pino.destination` supports `reopen()` for this purpose
- Write the PID file so the rotation tool can signal the correct process
- `SIGHUP` is the conventional signal for log reopening

## Related

- [log-rotation](./log-rotation.md)
- [saving-to-multiple-files](./saving-to-multiple-files.md)
- [options](../api/options.md)
