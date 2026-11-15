---
source: https://docs.cloud.google.com/shell/docs/using-web-preview
---

# Preview a Web App with Cloud Shell Web Preview

Run an HTTP server on the Cloud Shell VM on a port between 2000 and 65000 and open it through Web Preview.

## Signature / Usage

### Start a web application

Start a simple Python HTTP server from the Cloud Shell command prompt:

```sh
cd `mktemp -d` \
    && echo '<html><body>Hello World</body></html>' >./index.html \
    && python -m http.server 8080
```

Adapted (not in the official docs): the unquoted backtick substitution is replaced by a quoted `$(...)`, so `cd` fails safely if `mktemp` fails or returns a path with spaces.

```sh
cd "$(mktemp -d)" \
    && echo '<html><body>Hello World</body></html>' >./index.html \
    && python -m http.server 8080
```

### Open the preview

Click the **Web Preview** button on the Cloud Shell taskbar and select the port number from the menu. Cloud Shell opens the preview URL in a new browser window.

### Build the preview URL in the terminal

The URL has the form `https://$PORT-$WEB_HOST`, where `WEB_HOST` is an environment variable in Cloud Shell.

Adapted (not in the official docs): the format `https://$PORT-$WEB_HOST` is written as a runnable `echo`; `PORT=8080` matches the server above.

```sh
PORT=8080
echo "https://${PORT}-${WEB_HOST}"
```

## Options / Props

| Name | Description |
| --- | --- |
| Port range | 2000 to 65000 |
| `WEB_HOST` | Environment variable used to build the preview URL |
| Streamlit flags | `--browser.serverAddress=localhost --server.enableCORS=false --server.enableXsrfProtection=false` |

## Notes

- Adapted from the official docs: the server example is also shown with a quoted `"$(mktemp -d)"` instead of the unquoted backtick substitution.
- The ports are reachable only through the secure Cloud Shell proxy, which restricts access over HTTPS to your user account.
- Streamlit apps need the three flags above on their command line to work behind the Cloud Shell HTTP proxy. They disable CORS and XSRF protection: use them only for disposable preview sessions.
- The server above serves a new temporary directory created by `mktemp -d`.
- Source: https://docs.cloud.google.com/shell/docs/using-web-preview (retrieved 2026-11-14)

## Related

- [using-web-preview.md](../references/cloud-shell/using-web-preview.md)
- [how-cloud-shell-works.md](../references/cloud-shell/how-cloud-shell-works.md)
- [quotas-limits.md](../references/cloud-shell/quotas-limits.md)
