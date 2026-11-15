---
source: https://docs.cloud.google.com/shell/docs/using-web-preview
---

# Preview web apps

Web preview lets you run web applications on the Cloud Shell virtual machine instance and preview them from the Google Cloud console. The Web Preview button can be found on the top right of the Cloud Shell taskbar.

## Signature / Usage

### Start the web application

You can run any web application that listens to HTTP requests on the Cloud Shell virtual machine. The web application must listen for HTTP requests on ports within the permitted range 2000 to 65000. These ports are only available to the secure Cloud Shell proxy service, which restricts access over HTTPS to your user account only.

To start a simple Python HTTP server from the Cloud Shell command prompt:

```sh
cd `mktemp -d` \
    && echo '<html><body>Hello World</body></html>' >./index.html \
    && python -m http.server 8080
```

### Preview the application

Click the **Web Preview** button and then select the port number from the displayed menu. Cloud Shell opens the preview URL on its proxy service in a new browser window.

You can also access the preview URL by combining the port with the environment variable `WEB_HOST` in the Cloud Shell terminal using the format `https://$PORT-$WEB_HOST`, or by using the Cloud Shell API (https://docs.cloud.google.com/shell/docs/reference/rpc/google.cloud.shell.v1#environment).

### Accessing Streamlit applications

Web preview in Cloud Shell works through a series of HTTP proxies. Streamlit applications require additional arguments (https://github.com/streamlit/streamlit/issues/6305) to function when running behind an HTTP proxy. When running these applications, make sure you specify `--browser.serverAddress=localhost --server.enableCORS=false --server.enableXsrfProtection=false` on the command line.

## Notes

- Disabling CORS and XSRF protection for Streamlit is the official guidance for running behind the Cloud Shell proxy; apply it only to disposable preview sessions.
- Port 970 via Web Preview can be used to reach the Cloud Shell Editor when third-party cookies are blocked (see [quotas-limits.md](./quotas-limits.md)).
- Source: https://docs.cloud.google.com/shell/docs/using-web-preview (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-shell-works.md](./how-cloud-shell-works.md)
- [using-cloud-shell.md](./using-cloud-shell.md)
- [quotas-limits.md](./quotas-limits.md)
