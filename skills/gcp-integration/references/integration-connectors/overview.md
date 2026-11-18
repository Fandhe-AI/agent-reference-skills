---
source: https://docs.cloud.google.com/integration-connectors/docs/overview
---

# Integration Connectors overview and glossary

Integration Connectors expose Google Cloud services and other business applications to your integrations through a standard interface, without protocol-specific knowledge or custom code. Both Application Integration and Apigee Integrations support Integration Connectors. A connection is configured once in the Google Cloud console and reused in any future integration.

## Signature / Usage

### Look up the connections of a project

The List Connections call returns the `connections` of a project; the sample output (from the private network connectivity page) shows the fields a connection carries (`connectorVersion`, `configVariables`, `serviceAccount`, `nodeConfig`). `nodeConfig` holds the minimum and maximum number of runtime nodes of the connection (see Rate limiting below).

```bash
curl -X GET \
    -H "authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: application/json" \
    "https://connectors.googleapis.com/v1/projects/CONNECTORS_PROJECT_ID/locations/-/connections"
```

```text
.....
{
  "connections": [
    {
      "name": "projects/connectors-test/locations/asia-northeast1/connections/big-query-iam-invalid-sa",
      "createTime": "2022-10-07T09:02:31.905048520Z",
      "updateTime": "2022-10-07T09:22:39.993778690Z",
      "connectorVersion": "projects/connectors-test/locations/global/providers/gcp/connectors/bigquery/versions/1",
      "status": {
        "state": "ACTIVE"
      },
      "configVariables": [
        {
          "key": "project_id",
          "stringValue": "connectors-test"
        },
        {
          "key": "dataset_id",
          "stringValue": "testDataset"
        }
      ],
      "authConfig": {},
      "serviceAccount": "564332356444-compute@developer.gserviceaccount.com",
      "serviceDirectory": "projects/abcdefghijk-tp/locations/asia-northeast1/namespaces/connectors/services/runtime",
      "nodeConfig": {
        "minNodeCount": 2,
        "maxNodeCount": 50
      }
    },
....
```

## Options / Props

### Key benefits (per connected service or application)

| Capability | Description |
|---|---|
| Authentication | Each connector offers one or more supported authentication methods configurable for the target application. |
| Endpoint configuration | Each connector connects to one instance of an application or technology via URL, tenant ID, or another identifier specific to the connector type. |
| Protocol mediation | Translates the native protocol of the target (for example JDBC) into a standard protocol such as REST. |
| Data format mediation | Translates the native data format to a standardized format and loads the schema of the targeted data into your integration. |
| Data discovery | Inspects the target application and lists the data objects and operations available to an integration. |
| Event subscription | Event listeners can be configured on connectors and the events used to trigger integrations. |

### Glossary

| Term | Definition |
|---|---|
| Action | A first-class function made available to an integration through the connector interface. Defined in the connected application or service; defines a change or series of changes to an entity or entities. |
| Authentication | Each connector type defines available authentication methods. Authentications are stored separately from the connector so users can select from available authentication objects when creating a connection. |
| Connection | A configuration or instance of a connector. Contains user-specified details such as the target URL and may include service-account credentials or authentication parameters. Connections are reusable and can be shared and consumed by multiple users. |
| Connector | A specific type of connection, defined by a set of possible authentication methods, a unique (or templatized) data schema, configuration parameters, available methods / data types / operations / events / objects, an author, and a "type" (for example table, file store, messaging service). |
| Entity | An object, or collection of properties, in the connected application or service that can be exposed to an integration through the connector interface. |
| Version | A resource representing a single version of a connector and its attributes, such as available methods, data schema and authentication options. |

### Rate limiting (`HTTP 429`)

| User type | Situation | Remediation |
|---|---|---|
| Pay-as-you-go | Spike in traffic anticipated or seen | Nodes autoscale until the configured maximum node limit; you can proactively configure the required minimum and maximum nodes on the Edit connection page based on your traffic pattern. |
| Pay-as-you-go | `HTTP 429`, sudden spike the existing nodes can't handle | Increase the minimum number of nodes on the Edit connection page. |
| Pay-as-you-go | `HTTP 429`, maximum permissible node limit not fully utilized | Increase the maximum nodes on the Edit connection page. |
| Pay-as-you-go | `HTTP 429`, maximum node limit fully utilized | Contact Integration Connectors support. |
| Subscription | Spike in traffic anticipated or seen | No action required; Integration Connectors autoscales the connection nodes, which takes care of throttling. |
| Subscription | `HTTP 429` | Contact Integration Connectors support. |
| Both | No spike and no `HTTP 429` | No action required. |

## Notes

- Rate limiting (`HTTP 429`): Integration Connectors throttles (smooths traffic spikes in) requests from a connection and autoscales the number of nodes assigned to it with the traffic. When a connection uses all its available nodes and still requires more, it exceeds its throttling limits and Integration Connectors returns `HTTP 429`. The options depend on the user type.
- Integration Connectors are managed connections used from Application Integration; they are not Workflows connectors or Kafka Connect connectors (see `gcp-messaging-workflows`).
- After an `HTTP 429` you can re-run the integration with any of the retry strategies; see Error handling strategies in Application Integration (https://docs.cloud.google.com/application-integration/docs/error-handling-strategy).
- Custom connector connections default to a minimum of 2 and a maximum of 50 nodes, customizable only for Pay-as-you-go customers (see the Create a custom connector page).
- Snippet taken from https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-private. The output fence is `text` because it contains `.....` elisions.
- Source: https://docs.cloud.google.com/integration-connectors/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/connector-glossary (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/rate-limiting (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/network-connectivity-private (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/integration-connectors/docs/create-custom-connector (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [connectors-access-permissions.md](./connectors-access-permissions.md)
- [network-connectivity-private.md](./network-connectivity-private.md)
- [custom-connectors.md](./custom-connectors.md)
- [eventsubscription.md](./eventsubscription.md)
