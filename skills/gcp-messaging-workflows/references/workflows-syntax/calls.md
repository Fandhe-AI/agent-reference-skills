---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/calls
---

# Workflows calls

A common type of workflow step uses the `call` field to run a function and return a result. Calls are often HTTP requests but can be made to any function: a connector, a standard library function, or a subworkflow.

## Signature / Usage

```text
  - STEP_NAME:
      call: FUNCTION_NAME
      args:
          ARG_1: VALUE_1
          ARG_2: VALUE_2
          ...
      result: OUTPUT_VARIABLE
```

### Assign the response from an API call

Reads the `GOOGLE_CLOUD_LOCATION` environment variable, derives a search term and queries the Wikipedia API.

```yaml
main:
  params: [input]
  steps:
    - checkSearchTermInInput:
        switch:
          - condition: '${"searchTerm" in input}'
            assign:
              - searchTerm: '${input.searchTerm}'
            next: readWikipedia
    - getLocation:
        call: sys.get_env
        args:
          name: GOOGLE_CLOUD_LOCATION
        result: location
    - setFromCallResult:
        assign:
          - searchTerm: '${text.split(location, "-")[0]}'
    - readWikipedia:
        call: http.get
        args:
          url: 'https://en.wikipedia.org/w/api.php'
          query:
            action: opensearch
            search: '${searchTerm}'
        result: wikiResult
    - returnOutput:
        return: '${wikiResult.body[1]}'
```

### Make an external HTTP POST request

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

## Options / Props

| Field | Required | Description |
|-------|----------|-------------|
| `call` | yes | Name of the function to call (`FUNCTION_NAME`) |
| `args` | no | If the function accepts parameters, the arguments and their values |
| `result` | no | If the function returns anything, the variable to store the returned data in |

### Callable targets

| Target | Description |
|--------|-------------|
| Connectors | Connect to other Google Cloud APIs within a workflow (https://docs.cloud.google.com/workflows/docs/reference/googleapis) |
| Standard library functions | Modules and frequently used functions, such as data type and format conversions and HTTP calls like `http.get` and `http.post` (https://docs.cloud.google.com/workflows/docs/reference/stdlib/overview) |
| Subworkflows | User-defined functions called from the main workflow ([subworkflows.md](./subworkflows.md)) |

## Notes

- Workflows connectors here are built-in steps that call Google Cloud APIs; they are not Integration Connectors of Application Integration (planned `gcp-integration`).
- To access HTTP response data saved in a variable, see https://docs.cloud.google.com/workflows/docs/http-requests.
- The samples call public example endpoints; calls to Google APIs or Cloud Run need `auth` (OAuth2 or OIDC) as described in the HTTP requests documentation.
- The source also shows JSON forms of every sample; they are omitted.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/calls (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subworkflows.md](./subworkflows.md)
- [expressions.md](./expressions.md)
- [steps.md](./steps.md)
