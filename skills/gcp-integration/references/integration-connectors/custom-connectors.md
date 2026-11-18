---
source: https://docs.cloud.google.com/integration-connectors/docs/custom-connectors
---

# Custom connectors

Custom connectors let you use connectors that are not part of the standard Integration Connectors set, for example an in-house HRMS with a proprietary protocol, or when a built-in connector does not meet your requirements. Integration Connectors supports them through an OpenAPI specification (version 3.0.0 and all its minor versions, JSON or YAML) of a backend that is exposed as a public endpoint. Preview: the page carries a Pre-GA Offerings Terms warning (features are available "as is" and might have limited support).

## Signature / Usage

### Example OpenAPI excerpt

Integration Connectors generates a separate action for each element in `paths`; for this specification `uploadImage` and `findByStatus` would be listed as supported actions. The full sample is at https://petstore3.swagger.io/api/v3/openapi.json.

```text
{
  "openapi":"3.0.2",
  "info":{
    "title":"Swagger Petstore - OpenAPI 3.0",
    "description":"This is a sample Pet Store Server based on the OpenAPI 3.0 specification.
  You can find out more about\nSwagger at [
    http://swagger.io](http://swagger.io). In the third iteration of the pet store,
    we've switched to the design first approach! You can now help us improve the API whether
  it's by making changes to the definition itself or to the code.\nThat way,
    with time, we can improve the API in general, and expose some of the new
  features in OAS3.\n\nSome useful links:\n-
  [
       The Pet Store repository
  ]
  .....
  .....
    },
  "paths":{
    "/pet/{petId}/uploadImage":{
      "post":{
        "tags":[
        ]
      }
    },
    .....
    .....
    "/pet/findByStatus":{
      "get":{
        "tags":[
          "pet"
        ],
        .....
        .....
      }
    }
  },
  "components": {
    "securitySchemes": {
      "api_key":{
        "type":"apiKey",
        "name":"api_key",
        "in":"header"
      }
    }
  }
}
```

## Options / Props

### Backend connectivity scenarios

| Scenario | Description |
|---|---|
| Direct backend connectivity | The Integration Connectors runtime connects directly to your OpenAPI-compliant backend. |
| Indirect backend connectivity | The runtime connects through an intermediary (facade) service that is OpenAPI compliant and in turn connects to your backend. |

### Indirect connectivity restrictions

| Restriction | Detail |
|---|---|
| SLA | Integration Connectors does not manage connectivity between the intermediary service and your backend; delays from that leg are outside the Integration Connectors SLA. |
| OAuth 2.0 | OAuth 2.0 authentication between the intermediary service and the backend is not supported. |

### Versions

| Item | Detail |
|---|---|
| Versioning | You can create multiple versions of a custom connector; each can have a different OpenAPI specification, authentication method and backend variables. |
| First version | Created automatically with a new connector; shown in the Versions tab of the custom connector's details page. |

## Notes

- Backend connectivity scenarios: In both scenarios Integration Connectors can only connect to OpenAPI-compliant endpoints.
- The page's Preview banner is headed "Preview --- BigQuery Connector"; its text is the standard Pre-GA Offerings Terms notice.
- The OpenAPI excerpt is a documentation fragment with a multi-line JSON string and `.....` elisions, not valid JSON, so the fence is `text`.
- Source: https://docs.cloud.google.com/integration-connectors/docs/custom-connectors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-custom-connector.md](./create-custom-connector.md)
- [overview.md](./overview.md)
