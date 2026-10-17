---
source: https://docs.docker.com/engine/cli/proxy/
---

# Use a proxy server with the Docker CLI

Configure containers and builds to use HTTP, HTTPS, or FTP proxies through the Docker client configuration file or command-line flags.

## Signature / Usage

`~/.docker/config.json`:

```json
{
 "proxies": {
   "default": {
     "httpProxy": "http://proxy.example.com:3128",
     "httpsProxy": "https://proxy.example.com:3129",
     "noProxy": "*.test.example.com,.example.org,127.0.0.0/8"
   }
 }
}
```

Per-daemon override (key = daemon address instead of `default`):

```json
{
 "proxies": {
   "default": {
     "httpProxy": "http://proxy.example.com:3128",
     "httpsProxy": "https://proxy.example.com:3129",
     "noProxy": "*.test.example.com,.example.org,127.0.0.0/8"
   },
   "tcp://docker-daemon1.example.com": {
     "noProxy": "*.internal.example.net"
   }
 }
}
```

Command-line:

```console
$ docker build --build-arg HTTP_PROXY="http://proxy.example.com:3128" .
$ docker run --env HTTP_PROXY="http://proxy.example.com:3128" redis
```

## Options / Props

| Property | Description |
| --- | --- |
| `httpProxy` | Sets the `HTTP_PROXY` and `http_proxy` environment variables and build arguments. |
| `httpsProxy` | Sets the `HTTPS_PROXY` and `https_proxy` environment variables and build arguments. |
| `ftpProxy` | Sets the `FTP_PROXY` and `ftp_proxy` environment variables and build arguments. |
| `noProxy` | Sets the `NO_PROXY` and `no_proxy` environment variables and build arguments. |
| `allProxy` | Sets the `ALL_PROXY` and `all_proxy` environment variables and build arguments. |

## Notes

- This page covers proxies for containers only; settings aren't used as proxy settings for the Docker CLI or Docker Engine itself. For the daemon see the daemon proxy configuration; Docker Desktop proxies are configured separately.
- The config takes effect after saving (no restart), but only applies to new containers and builds. Builds get proxy build arguments pre-populated; they are only available in the build container and aren't included in the build output.
- Proxy settings may contain sensitive information (credentials, internal hostnames). Environment variables are stored as plain text in the container configuration and can be inspected through the remote API or committed with `docker commit`.
- Don't use the `ENV` Dockerfile instruction for build proxy settings; use build arguments (`ENV` embeds the config in the image, may be unreachable elsewhere, and is a security risk).
- The `default` key applies to all daemons the client connects to.
- There is no standard for how web clients handle proxy environment variables.

## Related

- [Daemon proxy](../engine-daemon-logging/daemon-proxy.md)
- [ARG](../dockerfile/arg.md)
