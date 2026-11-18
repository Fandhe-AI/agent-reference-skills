---
source: https://docs.cloud.google.com/application-integration/docs/configure-call-rest-endpoint-task
---

# Call REST Endpoint task

The Call REST Endpoint task calls a third-party REST API from an integration; the response is available in integration variables for downstream tasks.

## Signature / Usage

The response body is available as a task (auto-generated) variable. For a Call REST Endpoint task with ID `Task_5`, reference the `responseBody` output by its full unique name inside the dollar delimiters:

```text
$`Task_5_responseBody`$
```

## Options / Props

### Configuration properties

| Property | Data type | Description |
|----------|-----------|-------------|
| Label | String | Optional label |
| Authentication | String | Optional authentication profile; may be left empty if the API needs no authentication |
| Endpoint base URL | String | REST endpoint URL without query parameters |
| HTTP method | N/A | `DELETE`, `GET`, `HEAD`, `PATCH`, `POST`, `PUT` |
| URL query string parameters | key: String, value: String | Key-value pairs |
| HTTP headers | key: String, value: String | Key-value pairs |
| Request body | String | Payload for `POST`, `PUT`, `PATCH`; maximum 20 MB |
| Follow redirects | Boolean | True calls the redirected URL; False does not |
| Task should fail on HTTP error | Boolean | True throws an exception; False returns the error code and message in the response. The task fails on `4xx` / `5xx` HTTP codes when True; errors unrelated to the REST call (for example an incorrect URL) always fail the task |
| Response header (`<Task name>`) | String | Uncompressed response header |
| Response body (`<Task name>`) | String | Uncompressed response body |
| Response status (`<Task name>`) | String | HTTP response code and code text |

## Notes

- Only endpoints reachable over the public internet can be called; hosts or IPs only in a private network such as a VPC cannot be reached, even if the VPC is peered with services such as Apigee X (`gcp-networking` for VPC).
- Maximum REST response processed: 34 MB (34,000,000 bytes).
- Authentication: create an OAuth 2.0 authentication profile or attach a user-managed service account. If both are configured, the OAuth 2.0 profile is used; if neither, the execution fails. Grant the service account the IAM role for the called service (for example a Cloud Storage role for a Cloud Storage URL).
- VPC Service Controls must NOT be set up for Application Integration in the project; the source warns that Cloud Function does not function or stops functioning if it is.
- If you change the authentication profile and test without publishing, the integration still uses the old profile; publish before testing.
- Error handling strategies apply to temporary errors; a community blog on retrying by response status is linked from the source.
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/variables (inline code; the Call REST Endpoint task page has no code block).
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/configure-call-rest-endpoint-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [tasks.md](./tasks.md)
- [variables.md](./variables.md)
- [error-handling.md](./error-handling.md)
