---
source: https://vite.dev/guide/troubleshooting#dev-server
---

# Troubleshooting: Dev Server

Fixes for stalled requests, ENOSPC watcher limits, self-signed certificates, 431 header errors, dev container port forwarding, and file watching on unsupported file systems.

## Signature / Usage

Raise Linux file descriptor and inotify limits (stalled requests):

```shell
# Check current limit
$ ulimit -Sn
# Change limit (temporary)
$ ulimit -Sn 10000 # You might need to change the hard limit too
# Restart your browser

# Check current limits
$ sysctl fs.inotify
# Change limits (temporary)
$ sudo sysctl fs.inotify.max_queued_events=16384
$ sudo sysctl fs.inotify.max_user_instances=8192
$ sudo sysctl fs.inotify.max_user_watches=524288
```

## Notes

- Requests are stalled forever (Linux): Vite does not bundle most files, so browsers may request many files and exceed file descriptor limits. If the steps above do not work, add `DefaultLimitNOFILE=65536` (un-commented) to `/etc/systemd/system.conf` and `/etc/systemd/user.conf`. On Ubuntu Linux add `* - nofile 65536` to `/etc/security/limits.conf` instead. These settings persist but a restart is required. In a VS Code devcontainer, requests may also appear stalled; see Dev Containers below.
- ENOSPC ("System limit for number of file watchers reached"): too many files in the project directory (Linux default limit is around 8,192-10,000 watchers). Increase `fs.inotify.max_user_watches` (e.g. `echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf` then `sudo sysctl -p`), exclude directories with `server.watch.ignored`, or use `server.watch.usePolling` (uses more CPU).
- Network requests stop loading: with a self-signed SSL certificate Chrome ignores all caching directives and reloads content, which Vite relies on. Use a trusted SSL cert. On macOS install via CLI: `security add-trusted-cert -d -r trustRoot -k ~/Library/Keychains/login.keychain-db your-cert.cer`, or import into Keychain Access and set to "Always Trust".
- 431 Request Header Fields Too Large: Node.js limits request header size to mitigate CVE-2018-12121; the request is dropped and a warning is shown. Reduce header size (e.g. delete a long cookie) or use Node.js `--max-http-header-size`.
- Dev Containers / VS Code Port Forwarding: set `server.host` to `127.0.0.1`, because VS Code port forwarding does not support IPv6 (vitejs/vite#16522).
- Illegal operation error when watching files (e.g. `EISDIR: illegal operation on a directory, watch ...`, such as a VirtualBox shared folder): enable `server.watch.usePolling`; note polling leads to high CPU utilization.

## Related

- [troubleshooting-hmr.md](./troubleshooting-hmr.md)
- [../config-dev/server-watch.md](../config-dev/server-watch.md)
- [../config-dev/server-host-allowed-hosts.md](../config-dev/server-host-allowed-hosts.md)
