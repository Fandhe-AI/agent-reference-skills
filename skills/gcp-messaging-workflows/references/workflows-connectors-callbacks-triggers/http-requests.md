---
source: https://docs.cloud.google.com/workflows/docs/http-requests
---

# Make an HTTP request from a workflow

A workflow step can make an HTTP or HTTPS call and assign the response to a variable. Shortcuts exist for common methods (`http.get`, `http.post`); any method works through `http.request` with the `method` field. This is distinct from Workflows connectors, which format Google Cloud API requests for you.

## Signature / Usage

### Step definition

The source shows this template in YAML and JSON (the `...` lines stand for further key/value pairs).

```text
  - STEP_NAME:
      call: HTTP_REQUEST
      args:
          url: URL_VALUE
          method: REQUEST_METHOD
          private_service_name: "REGISTERED_SERVICE"
          headers:
              HEADER_KEY:HEADER_VALUE
              ...
          body:
              BODY_KEY:BODY_VALUE
              ...
          query:
              QUERY_KEY:QUERY_VALUE
              ...
          auth:
              type: AUTH_TYPE
              scope: AUTH_SCOPE
              scopes: AUTH_SCOPE
              audience: AUDIENCE
          timeout: TIMEOUT_IN_SECONDS
      result: RESULT_VALUE
```

### Read the response

```text
${VARIABLE_NAME.body|code|headers.PATH_TO_FIELD}
```

If an API returns `{"age":50}` stored in `age_response`, then `age_response.body.age` returns `50`.

### POST to an external endpoint

```yaml
- send_message:
    call: http.post
    args:
      url: https://www.example.com/endpoint
      body:
        some_val: "Hello World"
        another_val: 123
    result: the_message
- return_value:
    return: ${the_message.body}
```

### OIDC to Cloud Run functions

```yaml
- call_my_function:
    call: http.post
    args:
      url: https://us-central1-myproject123.cloudfunctions.net/myfunc1
      auth:
        type: OIDC
      body:
        some_val: "Hello World"
        another_val: 123
    result: the_message
- return_value:
    return: ${the_message.body}
```

### Catch and handle errors

Adapted (not in the official docs): the `connection_problem`, `url_not_found` and `auth_problem` steps `raise` their message instead of `return`ing it (and the comment says "raise"), so a handled failure ends the execution as failed rather than as a successful execution whose result is an error string.

```yaml
# Use a custom exception handler to catch exceptions and raise predefined
# error messages; if the exception isn't recognized, the workflow
# execution fails and throws the exception returned by the GET request
- read_item:
    try:
      call: http.get
      args:
        url: https://example.com/someapi
        auth:
          type: OIDC
      result: API_response
    except:
      as: e
      steps:
        - known_errors:
            switch:
              - condition: ${not("HttpError" in e.tags)}
                next: connection_problem
              - condition: ${e.code == 404}
                next: url_not_found
              - condition: ${e.code == 403}
                next: auth_problem
        - unhandled_exception:
            raise: ${e}
- url_found:
    return: ${API_response.body}
- connection_problem:
    raise: "Connection problem; check URL"
- url_not_found:
    raise: "Sorry, URL wasn't found"
- auth_problem:
    raise: "Authentication error"
```

## Options / Props

### `args` fields

| Name | Required | Description |
|------|----------|-------------|
| `HTTP_REQUEST` (`call`) | yes | One of `http.delete`, `http.get`, `http.patch`, `http.post`, `http.put`, `http.request`. |
| `url` | yes | URL where the request is sent. |
| `method` | required with `http.request` | For example `GET`, `POST`, `PATCH`, `DELETE`. |
| `private_service_name` | no | Registered Service Directory service name `projects/PROJECT_ID/locations/LOCATION/namespaces/NAMESPACE_NAME/services/SERVICE_NAME`. |
| `headers` | no | Header fields. Supported `Content-Type` values: `application/json` or `application/type+json` (body must be a map), `application/x-www-form-urlencoded` (body must be an unencoded string), `text/type` (body must be a string). |
| `body` | no | Body fields. Without `Content-Type`: bytes get `application/octet-stream`; anything else is JSON-encoded with `application/json; charset=utf-8`. |
| `query` | no | Query fields. |
| `auth.type` | required if the API needs authentication | `OIDC` or `OAuth2`. |
| `auth.scope` / `auth.scopes` | no | Limits access. `scope` takes a string or list of strings; `scopes` also accepts space- and comma-separated strings. |
| `auth.audience` | no | Audience of the OIDC token. Defaults to the value of `url`; should be the service's root URL (for example `https://region-project.cloudfunctions.net/hello_world`). |
| `timeout` | no | Seconds a request may run before an exception is thrown. Maximum 1800 seconds. |
| `result` | no | Variable that stores the response. |

### `User-Agent` header

| Case | Result |
|------|--------|
| Not set | `GoogleCloudWorkflows; (+https://cloud.google.com/workflows/docs)` |
| Set to a value | The default string is appended after a space to your value. |

## Notes

- If the response `Content-Type` is `application/json`, the JSON is converted to a map automatically. Otherwise convert with `json.decode(text.encode(RESPONSE_FROM_API))`.
- Workflows does not support HTTP requests to the IP-based endpoints of GKE cluster control planes; use the DNS-based endpoints (https://docs.cloud.google.com/workflows/docs/issues#gke-calls).
- Authentication is explicit: requests carry no identity or access token unless `auth` is set. For Google Cloud targets use `auth` rather than a token in `url` or `headers`; credentials for external APIs belong in Secret Manager, read with the Secret Manager connector (see [authenticate-from-workflow.md](./authenticate-from-workflow.md)).
- Omitted: the Wikipedia search sample, the `GET`-with-headers sample, the body example and the JSON forms of all samples (the source's JSON body example has a trailing comma and is not valid JSON).
- Corrected from the official docs: the custom exception handler ended with `return: "Connection problem; check URL"`, `return: "Sorry, URL wasn't found"` and `return: "Authentication error"`, which complete the execution successfully with an error message as its result; they now use `raise`.
- Source: https://docs.cloud.google.com/workflows/docs/http-requests (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [authenticate-from-workflow.md](./authenticate-from-workflow.md)
- [connectors.md](./connectors.md)
- [stdlib-overview.md](./stdlib-overview.md)
