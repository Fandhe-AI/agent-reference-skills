---
source: https://docs.cloud.google.com/integration-connectors/docs/create-custom-connector
---

# Create a custom connector

Preview. Creating connectivity to a backend with a custom connector takes two tasks: (1) create the custom connector by giving Integration Connectors the backend's OpenAPI specification (only OpenAPI 3.0 and its minor versions; a one-time activity), and (2) create a connection of the custom connector type with the backend's hostname and authentication (as many connections as needed). A custom connector is a global resource: once created it can be used in any location supported for Integration Connectors.

## Signature / Usage

### Before you begin

Ask your administrator to grant you the Custom Connectors Admin role (`roles/connectors.customConnectorAdmin`) on your project (or equivalent custom or predefined roles), and enable the Connector API (`connectors.googleapis.com`).

### Create with direct connectivity (API)

Create the connector:

Adapted (not in the official docs): added the missing `\` after the `Content-Type` header, removed the backslashes inside the single-quoted JSON body (they would be sent as literal characters and break the JSON), and used the Discovery query parameter name `customConnectorId` for `custom_connector_id`.

```bash
curl -X POST \
-H "authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"customConnectorType":"OPEN_API",
"displayName":"CUSTOM_CONNECTOR_NAME",
"description": "an open api based custom connector for hrms"}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/customConnectors?customConnectorId=UNIQUE_IDENTIFIER"
```

Configure the custom connector version:

Adapted (not in the official docs): fixed the host typo `connectors.googleapis.comv1`, removed the trailing comma in the body, used the Discovery field `specLocation` and query parameter `customConnectorVersionId`, and replaced the fixed connector ID `openapi-customconnector` with `UNIQUE_IDENTIFIER` from the previous call.

```bash
curl -X POST \
-H "authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"specLocation": "SPECIFICATION_URL"}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/customConnectors/UNIQUE_IDENTIFIER/customConnectorVersions?customConnectorVersionId=VERSION_NUMBER"
```

### Create with indirect connectivity (API, through an intermediary service)

Create the connector with the same call as for direct connectivity, then configure the version and the authentication to the intermediary service (this sample uses `Username and Password` authentication; other authentication types can be used):

Adapted (not in the official docs): removed the backslashes inside the single-quoted JSON body, used the Discovery camelCase names (`specLocation`, `serviceAccount`, `enableBackendDestinationConfig`, `authConfig`, `authType`, `authKey`, `userPassword`, `secretVersion`, `backendVariableTemplates`, `valueType`, `displayName`, `locationType`, `destinationConfigs`) and the query parameter `customConnectorVersionId`, and replaced the fixed connector ID `facade-connector` with `UNIQUE_IDENTIFIER` from the create call.

```bash
curl -X POST \
-H "authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{"specLocation": "SPECIFICATION_URL",
"serviceAccount": "test-sa",
"enableBackendDestinationConfig": true,
"authConfig": {
"authType": "USER_PASSWORD",
"authKey": "basic",
"userPassword": {
"username": "USERNAME",
"password": {"secretVersion": "projects/PROJECT_ID/secrets/fidelity-secret/versions/SECRET_VERSION_NUMBER"}
}},
"backendVariableTemplates": [{
"key": "authkey",
"valueType": "SECRET",
"displayName": "Authorization Key",
"required": true,
"locationType": "HEADER"
}],
"destinationConfigs": [{
"key": "base_url",
"destinations": [{
"host": "DESTINATION_HOST_ADDRESS"
}]}
]}' \
"https://connectors.googleapis.com/v1/projects/PROJECT_ID/locations/global/customConnectors/UNIQUE_IDENTIFIER/customConnectorVersions?customConnectorVersionId=CONNECTOR_VERSION_NUMBER"
```

## Options / Props

### Placeholders

| Placeholder | Description |
|---|---|
| `CUSTOM_CONNECTOR_NAME` | Display name for the custom connector. |
| `PROJECT_ID` | Google Cloud project ID. |
| `UNIQUE_IDENTIFIER` | Unique connector ID, for example `custom-connector-1`. |
| `SPECIFICATION_URL` | OpenAPI specification URL, for example `https://petstore3.swagger.io/api/v3/openapi.json`. |
| `VERSION_NUMBER` / `CONNECTOR_VERSION_NUMBER` | Version number, for example `2` / `1`. |
| `USERNAME` | Username for the intermediary service. |
| `SECRET_VERSION_NUMBER` | Secret Manager secret version, for example `2`. |
| `DESTINATION_HOST_ADDRESS` | Host address of the intermediary service, for example `http://www.test.com:80`. |

### Authentication to the intermediary service

| Type | Fields |
|---|---|
| Service Account Authentication | Scopes: the required OAuth 2.0 scopes. The service account needs the relevant IAM roles. |
| API key authentication | API key (Secret Manager secret), Secret version, API key parameter name (the key name sent to the backend), API key location. |
| OAuth 2.0 - Client credentials grant | Client ID; Client Secret (Secret Manager secret); Request format for access token (`body` or `header`); Token Request Path. |
| Basic Authentication | Username; Password (Secret Manager secret). |
| Digest Authentication | Username; Password (Secret Manager secret). |
| No Authentication | When access to the API's resources is unrestricted. |

### Backend variables (indirect connectivity)

| Field | Description |
|---|---|
| Key, Value type, Display name | Name, data type and display name of the variable. |
| Location | How the connector sends it to the intermediary service: `Header`, `Request payload` or `Query parameter`. |
| Required | Optional mandatory flag; values are prompted when creating a connection. |

### Connection rules

| Item | Value |
|---|---|
| Connection name | Letters, numbers or hyphens; lower-case letters; begins with a letter, ends with a letter or number; at most 63 characters. |
| Connection nodes | Minimum default 2, maximum default 50; customizable only for Pay-as-you-go customers. |
| Destination | Defaults to the spec URL from the OpenAPI spec (the first server URL when several exist). For an intermediary, host with `http://` or `https://` plus port. |
| Authentication | Direct: you configure the backend's authentication. Indirect: configured on the connector; the intermediary authenticates to the backend itself. |

## Notes

- Considerations: only OpenAPI 3.0 and minor versions; the specification is not validated at connector creation, and a connection to a connector with an invalid specification goes to the `Error` state; entities and actions are both listed as `Actions`; custom connectors are not supported in projects with VPC Service Controls enabled; both the specification endpoint and the backend must be publicly accessible, so private connectivity to the backend is not possible; multi-part media types are not supported; the version details of a custom connector cannot be edited.
- Console fields: the connector logo is uploaded to a Cloud Storage bucket that must have public access prevention disabled; the specification can be a public URL or a file in a Cloud Storage bucket; the service account must have the required roles.
- Credentials: the password is a Secret Manager secret version reference (`secretVersion`, format `projects/*/secrets/*/versions/*`); Secret Manager is in `gcp-security`. Do not put the password itself in the request body.
- A plain `http://` host for the intermediary service sends credentials unencrypted; use `https://` for a real backend (the source's example host is `http://www.test.com:80`).
- After creation the connection is available in Application Integration and is used in an integration through the Connectors task.
- Corrected from the official docs: `-H "Content-Type: application/json"` without a trailing `\` and `-d '{"customConnectorType":"OPEN_API", \` (backslashes inside the JSON body); `"https://connectors.googleapis.comv1/projects/PROJECT_ID/locations/global/customConnectors/openapi-customconnector/customConnectorVersions?custom_connector_version_id=VERSION_NUMBER"` with `-d '{"spec_location": "SPECIFICATION_URL",}'` (trailing comma); `.../customConnectors/facade-connector/customConnectorVersions?custom_connector_version_id=...` and the snake_case body keys (`spec_location`, `service_account`, `enable_backend_destination_config`, `auth_config`, `auth_type`, `auth_key`, `user_password`, `secret_version`, `backend_variable_templates`, `value_type`, `display_name`, `location_type`, `destination_configs`); `?custom_connector_id=UNIQUE_IDENTIFIER`. Field and parameter names follow the connectors v1 Discovery document; the enum values `OPEN_API`, `USER_PASSWORD`, `SECRET` and `HEADER` are as in the source and in Discovery.
- The indirect-connectivity create call is identical to the direct one and is shown once.
- Omitted: Console click-paths for creating the connector and connection.
- Source: https://docs.cloud.google.com/integration-connectors/docs/create-custom-connector (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-connectors.md](./custom-connectors.md)
- [connectors-access-permissions.md](./connectors-access-permissions.md)
- [overview.md](./overview.md)
- [vpcsc-connectors.md](./vpcsc-connectors.md)
