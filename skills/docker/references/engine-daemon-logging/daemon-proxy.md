---
source: https://docs.docker.com/engine/daemon/proxy/
---

# Daemon proxy configuration

Configure the Docker daemon to reach Docker Hub, other registries, and other swarm nodes through an HTTP/HTTPS proxy.

## Signature / Usage

Recommended, in `daemon.json`:

```json
{
  "proxies": {
    "http-proxy": "http://proxy.example.com:3128",
    "https-proxy": "http://proxy.example.com:3128",
    "no-proxy": "*.test.example.com,.example.org,127.0.0.0/8"
  }
}
```

Restart the daemon to apply:

```console
$ sudo systemctl restart docker
```

Alternatively, a systemd drop-in `/etc/systemd/system/docker.service.d/http-proxy.conf`:

```systemd
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:3128"
Environment="HTTPS_PROXY=http://proxy.example.com:3128"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"
```

```console
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
$ sudo systemctl show --property=Environment docker
```

## Options / Props

Environment variables checked by the daemon in its start-up environment:

| Variable |
| --- |
| `HTTP_PROXY` / `http_proxy` |
| `HTTPS_PROXY` / `https_proxy` |
| `NO_PROXY` / `no_proxy` |

`NO_PROXY` values (comma-separated): IP address prefix (`1.2.3.4`); domain name or special DNS label (`*`); `example.com` matches `example.com` and `foo.example.com`, `.example.com` matches only subdomains; a single `*` means no proxying; literal ports accepted (`1.2.3.4:80`, `foo.example.com:80`).

## Notes

- Daemon configuration (`daemon.json` or `--http-proxy` / `--https-proxy`) takes precedence over environment variables. `daemon.json` is recommended.
- Proxy settings in `daemon.json` are ignored by Docker Desktop (use Docker Desktop settings).
- For rootless mode, the drop-in lives at `~/.config/systemd/user/docker.service.d/http-proxy.conf` and uses `systemctl --user daemon-reload` / `systemctl --user restart docker` without `sudo`.
- Special characters in the proxy value such as `#?!()[]{}` must be double escaped using `%%` (e.g. `http://domain%%5Cuser:complex%%23pass@proxy.example.com:3128/`).
- This page is for the daemon; the Docker CLI proxy is configured separately (see "Use a proxy server with the Docker CLI" in the engine docs).

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
