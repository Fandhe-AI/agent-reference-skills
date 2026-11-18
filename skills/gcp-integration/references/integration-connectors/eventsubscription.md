---
source: https://docs.cloud.google.com/integration-connectors/docs/eventsubscription
---

# Event subscriptions

Besides read and write operations, Integration Connectors let you subscribe to events in your backend applications (for example a new Jira ticket) and use them to trigger Application Integration integrations. A connection can be used for connector operations only, for event subscriptions only, or for both. Event subscription is enabled and configured during connection creation, or later by editing the connection.

## Signature / Usage

### Event payload with data enrichment

Zendesk create-ticket event payload with data enrichment: the response adds a `context-data` field next to the normal response, which is under `data` (an excerpt with `....` elisions, so tagged `text`):

```text
{
    "context-data": {
    "AllowChannelback": false,
    "Assignee": null,
    "AssigneeId": 1.6696812051473E13,
    "Brand": null,
    "BrandId": 1.6696812163985E13,
    "Cc": null,
    "CollaboratorIds": null,
    "Commenter": null,
    "HasAttachment": null,
    "CreatedAt": "2023-07-08 11:37:19.0",
    "CustomFields": null,
    "Description": "Test desc 2",
....
....
    "Status": "open",
    "Subject": "Test Zendesk Ticket Created -2 -DA",
    "Submitter": null,
    "SubmitterId": 1.6696812051473E13,
    "Tags": "tag-changed-after-cache,ticket-created",
....
....
    "ViaChannel": "web",
    "ViaFollowupSourceId": null,
    "ViaSource": "{\r\n  \"from\": null,\r\n  \"to\": null,\r\n  \"rel\": null\r\n}",
    "View_Id": null
  },
   "data":{
  "account_id": 12345,
  "integration_key": "my_integration_key",
  "subdomain": "my_zendesk_subdomain",
  "input": {
    "ticket_event": {
      "meta": {
        "version": "1.0",
....
....
        "position": 1,
          "total": 9
        }
      },
      "type": "Ticket Created",
      "ticket": {
        "id": 35436,
....
....
        "external_id": "TEST1234",
        "tags": [
          "enterprise"
        ],
        "via": {
          "channel": "web"
        }
      }
    }
  }
 }
```

## Options / Props

### Connectors that support event subscriptions

| Connector |
|---|
| Apache Kafka, Azure AD (Entra ID), Hubspot, HL7, IBM MQ, Jira Cloud, Jira Server Data Center, Rabbit MQ, SAP Gateway, SAP ERP, ServiceNow, Solace, TIBCOEMS, Webhook, Zendesk |

### Application Integration triggers that listen to event notifications

| Trigger | Listens for |
|---|---|
| Azure AD trigger | Azure AD events |
| HL7 trigger | HL7 events |
| HubSpot trigger | HubSpot events |
| IBM MQ trigger | IBM MQ events |
| Jira Cloud trigger | Jira Cloud events |
| Rabbit MQ trigger | Rabbit MQ events |
| ServiceNow trigger | ServiceNow events |
| TIBCOEMS trigger | TIBCOEMS events |
| Webhook trigger | Generic webhook events |
| Zendesk trigger | Zendesk events |

### Subscription states (Subscriptions tab of the connection)

| State | Meaning |
|---|---|
| Creating | The subscription is being created by an integration. |
| Active | The subscription is valid and functioning. |
| Suspended | The connection is in a suspended state. |
| Error | Subscription creation was unsuccessful, for example an authentication failure during creation. |

## Notes

- Application Integration triggers that listen to event notifications: To use these triggers, enable event subscription on the connection (existing or new).
- Data enrichment: enabling it on a connection appends entity-specific details to the notification (the `context-data` field). Only the Zendesk connector supports data enrichment for event notifications.
- Private connectivity for event subscription: if you set up a VPC service perimeter for the project, you must enable private connectivity for event subscriptions. The event listener is then not public; selecting **Enable private connectivity** at connection creation makes Integration Connectors create a PSC service attachment that you expose to your backend, for example through a PSC network endpoint group used as the backend of an external load balancer configured to accept requests from your event provider's (backend application) IP address. For connectors whose backend supports auto-registration of event subscriptions (for example Zendesk and Jira), also enter the load balancer address in **Event listener ingress endpoint** (Edit ingress endpoint) and save the connection.
- If a connection has active event subscriptions you cannot delete it or edit the hostname or IP address of its backend.
- Pricing: event payload data is not charged in preview triggers but is charged in generally available triggers; see https://docs.cloud.google.com/integration-connectors/docs/pricing.
- Pub/Sub and Eventarc are in `gcp-messaging-workflows`.
- Omitted: the payload sample without data enrichment (the same content as the `data` part of the sample above) and Console click-paths.
- Source: https://docs.cloud.google.com/integration-connectors/docs/eventsubscription (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpcsc-connectors.md](./vpcsc-connectors.md)
- [network-connectivity-private.md](./network-connectivity-private.md)
- [connectors-access-permissions.md](./connectors-access-permissions.md)
