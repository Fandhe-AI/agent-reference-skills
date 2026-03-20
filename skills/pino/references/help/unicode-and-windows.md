# Unicode and Windows Terminal

Pino uses sonic-boom to speed up logging, which internally uses `fs.write` to write log lines directly to a file descriptor. On Windows, Unicode output is not handled properly in the terminal.

## The Problem

Both `cmd.exe` and PowerShell on Windows do not properly handle Unicode output. As a result, log lines that include UTF-8 characters may be visualized incorrectly.

## The Fix

Configure the terminal to display Unicode characters correctly using `chcp`:

```sh
chcp 65001
```

Execute this command in the terminal before running your application.

## Notes

- This is a known limitation of Node.js on Windows, not specific to Pino
- `chcp 65001` sets the terminal code page to UTF-8
- The issue only affects terminal display; the actual log data written to files is correct
- sonic-boom uses `fs.write` for performance, which bypasses some of Node.js's stream encoding handling

## Related

- [best-performance-stdout](./best-performance-stdout.md)
- [options](../api/options.md)
