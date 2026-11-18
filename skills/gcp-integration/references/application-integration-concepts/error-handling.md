---
source: https://docs.cloud.google.com/application-integration/docs/error-handling
---

# Introduction to error handling

Errors can occur while you test and publish an integration or during its execution. Application Integration supports error handling strategies (the action for a task that fails with a temporary error) and error catchers (customized handling of a failed trigger, task or edge condition, invoked by the Error Catcher trigger).

## Signature / Usage

Error details of a failed execution are available in the `ErrorInfo` system variable:

```text
{
  "ErrorInfo": {
  "message": String,
  "code": Number
  }
}
```

## Options / Props

### Error classes

| Class | Cause | Result |
|-------|-------|--------|
| Permanent errors | All client-side errors, such as authentication failures and data validation errors | Permanent task failures |
| Temporary errors | All server-side errors, such as HTTP 503 (service unavailable) and HTTP 400 (bad request) | Temporary task failures |

### Error codes

| Standard exception type | Canonical code | HTTP code | Description |
|-------------------------|----------------|-----------|-------------|
| FailedPreconditionException | `FAILED_PRECONDITION` | 400 | Request cannot be executed in the current system state |
| BadRequestException | `INVALID_ARGUMENT` | 400 | Client specified an invalid argument; check error message and details |
| UnauthenticatedException | `UNAUTHENTICATED` | 401 | Missing, invalid, or expired OAuth token |
| ForbiddenException | `PERMISSION_DENIED` | 403 | Insufficient permission: OAuth token lacks the right scopes, client lacks required permissions, or the API has not been enabled |
| NotFoundException | `NOT_FOUND` | 404 | A specified resource is not found |
| AlreadyExistsException | `ALREADY_EXISTS` | 409 | The resource the client tried to create already exists |
| InternalError | `INTERNAL` | 500 | Internal server error; can happen if tasks or triggers are incorrectly configured |
| UnimplementedException | `UNIMPLEMENTED` | 501 | API method not implemented by the server |
| ServiceUnavailableException | `UNAVAILABLE` | 503 | Service unavailable; typically the server is down |
| AbortedException | `ABORTED` | 409 | Response size is too large |

### Execution modes

| Mode | Started by |
|------|-----------|
| Synchronous | Test or publish; `projects.locations.integrations.execute` API; call from a sub-integration in synchronous mode |
| Asynchronous | Everything not synchronous, for example Schedule, Cloud Scheduler, Cloud Pub/Sub and Salesforce triggers, `projects.locations.integrations.schedule` API; also executions resumed from a suspension or approval task |

## Notes

- Error codes: Application Integration uses the canonical error codes defined in `google.rpc.Code`.
- Errors appear on the Execution logs page (one log entry per execution) and, for publish errors, at the bottom of the integration editor page.
- Best practice: use both an error handling strategy and an error catcher. The strategy runs first; after the configured strategies are exhausted, the error catcher logic is triggered. Capture the error code and message with system variables to send to the catcher flow.
- Example from the source: an order-creation flow writes new orders to Cloud SQL for MySQL through a connector task (**Create an order**); in a database outage the connector task throws errors while inserting new orders. The source configures an error handling strategy on the **Create an order** connector task, and an error handling strategy and an error catcher on the **Call REST Endpoint** task (Cloud SQL itself is in `gcp-databases-relational`).
- Snippet taken from https://docs.cloud.google.com/application-integration/docs/variables (the error handling page has no code block).
- Source: https://docs.cloud.google.com/application-integration/docs/error-handling (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [variables.md](./variables.md)
- [triggers.md](./triggers.md)
- [test-publish-integrations.md](./test-publish-integrations.md)
- [configure-connectors-task.md](./configure-connectors-task.md)
