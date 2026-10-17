---
source: https://docs.flutter.dev/platform-integration/web/web-dev-config-file
---

# Set up a web development configuration file

Centralize Flutter web development server settings (host, port, HTTPS, headers, proxy rules) in a `web_dev_config.yaml` file at the project root. By default the dev server serves on `localhost` over HTTP on a randomly assigned port.

## Signature / Usage

```yaml
server:
  host: "0.0.0.0" # Defines the binding address <string>
  port: 8080 # Specifies the port <int> for the development server
  https:
    cert-path: "/path/to/cert.pem" # Path <string> to your TLS certificate
    cert-key-path: "/path/to/key.pem" # Path <string> to TLS certificate key
```

### Custom headers

```yaml
server:
  headers:
    - name: "X-Custom-Header" # Name <string> of the HTTP header
      value: "MyValue" # Value <string> of the HTTP header
    - name: "Cache-Control"
      value: "no-cache, no-store, must-revalidate"
```

### Proxy: string prefix

Requests are matched in order from the file.

```yaml
server:
  proxy:
    - target: "http://localhost:5000/" # Base URL <string> of your backend
      prefix: "/users/" # Path <string>
    - target: "http://localhost:3000/"
      prefix: "/data/"
      replace: "/report/" # Replacement <string> of path in redirected URL (optional)
    - target: "http://localhost:4000/"
      prefix: "/products/"
      replace: ""
```

- `/users/names` is forwarded to `http://localhost:5000/users/names`.
- `/data/2023/` is forwarded to `http://localhost:3000/report/2023` (`replace` replaces the `/data/` prefix).
- `/products/item/123` is forwarded to `http://localhost:4000/item/123` (`replace: ""` removes the prefix).

### Proxy: regex

```yaml
server:
  proxy:
    - target: "http://localhost:5000/"
      regex: '/users/(\d+)/$' # Path <string> matches requests like /users/123/
    - target: "http://localhost:4000/"
      regex: '^/api/(v\d+)/(.*)' # Matches requests like /api/v1/users
      replace: "/$2?apiVersion=$1" # Allows capture groups (optional)
```

- `/users/123/` matches the first rule and is forwarded to `http://localhost:5000/users/123/`.
- `/api/v1/users/profile/` matches the second rule and is forwarded to `http://localhost:4000/users/profile/?apiVersion=v1`.

## Options / Props

| Key | Type | Description |
| --- | --- | --- |
| `server.host` | string | Binding address |
| `server.port` | int | Port of the development server |
| `server.https.cert-path` | string | Path to the TLS certificate |
| `server.https.cert-key-path` | string | Path to the TLS certificate key |
| `server.headers[].name` / `value` | string | Custom HTTP response header |
| `server.proxy[].target` | string | Base URL of the backend |
| `server.proxy[].prefix` | string | Path prefix match |
| `server.proxy[].regex` | string | Regex match (capture groups allowed in `replace`) |
| `server.proxy[].replace` | string | Replacement of the matched path (optional) |

## Notes

- Corrected from the official docs: the original regex examples use double-quoted YAML strings containing `\d`, which is an invalid YAML escape; they are single-quoted here so the backslash is kept literally.
- Added in Flutter 3.38.
- Precedence: 1. command-line arguments (such as `--web-hostname`, `--web-port`), 2. `web_dev_config.yaml` settings, 3. built-in defaults.
- This configures the Flutter web dev server only; it is distinct from Vite / Next.js dev-server proxy configuration (nextjs-app skill) and Vercel config (vercel skill).

## Related

- [Building a web application with Flutter](./building.md)
