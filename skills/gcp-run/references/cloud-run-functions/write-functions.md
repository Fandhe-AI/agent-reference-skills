---
source: https://docs.cloud.google.com/run/docs/write-functions
---

# Write Cloud Run functions

The Functions Framework (open source) lets you write Cloud Run functions that respond to HTTP requests or process CloudEvents. You specify a function entry point and a signature type; each language runtime has required source layout.

## Signature / Usage

### Source directory structure (Node.js)

```text
.
├── index.js
└── package.json
```

`package.json` for the ES module samples (`import`); for the CommonJS samples (`require`), including the CORS sample, remove the `"type": "module"` entry together with the comma before it:

```json
{
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  },
  "type": "module"
}
```

### Source directory structure (Python)

```text
.
├── main.py
└── requirements.txt
```

`requirements.txt`:

```text
functions-framework==3.*
```

### HTTP function: Node.js (ES module)

```javascript
import { http } from '@google-cloud/functions-framework';
// Register an HTTP function with the Functions Framework that executes
// when you make an HTTP request to the deployed function's endpoint.
http('helloGET', (req, res) => {
  res.send('Hello World!');
});
```

### HTTP function: Node.js (CommonJS)

```javascript
  const functions = require('@google-cloud/functions-framework');

  // Register an HTTP function with the Functions Framework
  functions.http('helloGET', (req, res) => {
    // Your code here

    // Send an HTTP response
    res.send('OK');
  });
```

### HTTP function: Python

```python
import functions_framework

# Register an HTTP function with the Functions Framework
@functions_framework.http
def my_http_function(request):
  # Your code here

  # Return an HTTP response
  return 'OK'
```

### CloudEvent function: Node.js (ES module)

```javascript
  import { cloudEvent } from "@google-cloud/functions-framework";
  cloudEvent('myCloudEventFunction', cloudEvent => {
    // Your code here
    // Access the CloudEvent data payload using cloudEvent.data
  });
```

Add `"type": "module"` to `package.json` for ES modules.

### CloudEvent function: Node.js (CommonJS)

```javascript
const functions = require('@google-cloud/functions-framework');

// Register a CloudEvent function with the Functions Framework
functions.cloudEvent('myCloudEventFunction', cloudEvent => {
  // Your code here
  // Access the CloudEvent data payload using cloudEvent.data
});
```

### CloudEvent function: Python

Adapted (not in the official docs): added a `pass` statement; the source's function body is only comments, which is an `IndentationError`.

```python
import functions_framework

# Register a CloudEvent function with the Functions Framework
@functions_framework.cloud_event
def my_cloudevent_function(cloud_event):
  # Your code here
  # Access the CloudEvent data payload via cloud_event.data
  pass
```

### Handle CORS (Node.js)

```javascript
const functions = require('@google-cloud/functions-framework');

/**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('corsEnabledFunction', (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    res.send('Hello World!');
  }
});
```

### Handle CORS (Python)

```python
import functions_framework

@functions_framework.http
def cors_enabled_function(request):
    # For more information about CORS and CORS preflight requests, see:
    # https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request

    # Set CORS headers for the preflight request
    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }

        return ("", 204, headers)

    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}

    return ("Hello World!", 200, headers)
```

## Options / Props

| Runtime | Main file / layout | Framework dependency | Entry point |
| --- | --- | --- | --- |
| Node.js | `index.js` at root by default; override with `main` in `package.json` | `@google-cloud/functions-framework` | Name registered with the framework (e.g. `helloGET`) |
| Python | `main.py` at root (must be named `main.py`) | `functions-framework==3.*` in `requirements.txt` | Name of the registered handler function |
| Go | Package at project root, any name except `package main` (use a `cmd/` subdirectory for a `main` package) | `github.com/GoogleCloudPlatform/functions-framework-go` in `go.mod` | Name registered via `functions.HTTP` / `functions.CloudEvent` in `init()` |
| Java | `src/main/java/` (add a package directory if declared) | `com.google.cloud.functions:functions-framework-api` in `pom.xml` | Fully-qualified class name including package |
| .NET | Any structure and file names | `Google.Cloud.Functions.Hosting` package | Fully-qualified class name including namespace |
| Ruby | `app.rb` at root (must be named `app.rb`), `Gemfile` | `functions_framework` gem | Name registered with the framework |
| PHP | `index.php` at root (must be named `index.php`), `composer.json` | `google/cloud-functions-framework` | Name registered with the framework |

| Signature type | Use |
| --- | --- |
| HTTP functions | Registers an HTTP handler; use when the function needs a URL endpoint, e.g. webhooks |
| Event-driven functions (CloudEvents functions) | Registers a CloudEvents handler; use when triggered directly by events such as Pub/Sub messages or Cloud Storage changes |

## Notes

- Node.js HTTP handlers are Express middleware functions; the request body is parsed by `body-parser` based on `Content-Type`, so `req.body` and `req.rawBody` are available. Python HTTP handlers receive a Flask request and return a value Flask can convert to a response.
- HTTP functions: terminate or resolve any background tasks (threads, futures, Promises, callbacks, system processes) before sending the HTTP response; unfinished tasks might not complete and can cause undefined behavior. Event-driven functions: the same applies before the function returns.
- Preflighted CORS requests: respond to the `OPTIONS` preflight with `204` and additional headers. Preflight `OPTIONS` requests carry no Authorization header, so they are rejected on HTTP functions that require authentication. Workarounds: allow public access (https://docs.cloud.google.com/run/docs/authenticating/public), configure Identity-Aware Proxy, or host the web app and Cloud Run on the same domain (e.g. Firebase Hosting integration).
- The CORS samples use `Access-Control-Allow-Origin: *` (any origin); restrict the origin for functions that are not intentionally public.
- Event data arrives in CloudEvents format; see function-triggers.md. Automatic retries for event-driven functions: https://docs.cloud.google.com/eventarc/docs/retry-events.
- If you group multiple functions in one project they may share dependencies; the source recommends splitting large multi-function codebases into one top-level directory per function to reduce dependencies and memory.
- Corrected from the official docs: the CloudEvent Python sample `def my_cloudevent_function(cloud_event):` has a body of only comments (IndentationError); added `pass`.
- The source's only `package.json` sets `"type": "module"`, but its CommonJS HTTP, CommonJS CloudEvent and CORS samples use `require(...)`, which fails under `"type": "module"` (`ReferenceError: require is not defined in ES module scope`); use a `package.json` without the `"type": "module"` entry (remove it with the preceding comma), or name the file `index.cjs` and set `main` accordingly, for those samples.
- The source also shows Go, Java, .NET, Ruby and PHP samples (HTTP, CORS, CloudEvent); only Node.js and Python are reproduced.
- Cloud Run / Cloud Run functions are Google Cloud's serverless functions, distinct from Cloudflare Workers (`cloudflare-workers`) and Vercel Functions (`vercel`); `hono` / `fastify` only run inside the container.
- Source: https://docs.cloud.google.com/run/docs/write-functions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-functions.md](./deploy-functions.md)
- [function-triggers.md](./function-triggers.md)
- [functions-with-run.md](./functions-with-run.md)
