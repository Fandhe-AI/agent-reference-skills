---
source: https://docs.cloud.google.com/application-integration/docs/configure-javascript-task
---

# JavaScript task

The JavaScript task lets you write custom JavaScript snippets in the JavaScript Editor for complex data mapping, variable assignments, and adding or modifying integration variables. Newly created JavaScript tasks exclusively use the V8 engine; existing published JavaScript tasks continue to use Rhino until they are migrated to V8 manually.

## Signature / Usage

### Access integration variables

```javascript
function executeScript(event) {
  event.getParameter("var1");
}
```

```javascript
function executeScript(event) {
  event.log(event.getParameter("var1"));
}
```

```javascript
function executeScript(event) {
  event.setParameter("`responseBody`", "NewStringValue");
}
```

Adapted (not in the official docs): the source example calls `event.getGcpProjectId()`, which is not a listed method; changed to the documented `getGoogleCloudProjectId`.

```javascript
function executeScript(event) {
  event.getGoogleCloudProjectId();
}
```

### Set the `TaskParameter` field (unused large parameters)

Download the integration version as JSON (Console: **Action** > **Download Integration** > **Integration Version**; API: `projects.locations.integrations.versions.download` with `fileFormat` set to `JSON`), then in the `taskConfigs` entry with task `JavaScriptTask`, add the parameters the script uses, and upload it (`projects.locations.integrations.versions.upload`).

Adapted (not in the official docs): the source fragment has a stray `"` after the closing brace of `script` and does not close `parameters`; fixed so the braces balance.

```text
"taskConfigs": [{
  "task": "JavaScriptTask",
  "taskId": 1,
  "parameters": {
    "script": {
      "key": "script",
      "value": {
        "stringValue": "function that is called during the JavaScriptTask execution"
      }
    }
  }
}]
```

```text
"ParamName": {
  "key": "ParamName",
  "value": {
    "stringValue": "$ParamName$"
  }
}
```

## Options / Props

### `event` methods

| Method | Description | Return type |
|--------|-------------|-------------|
| `event.getEventExecutionInfoId()` | Execution ID of the run | String |
| `event.getGoogleCloudProjectId()` | Google Cloud project ID | String |
| `event.getIntegrationName` | Current name of the integration (syntax as written in the source, without parentheses) | String |
| `event.getParameter("variable_name")` | Value of an integration variable; wrap auto-generated variables in backticks, for example `` `responseBody` `` | Variable's data type |
| `event.getRegion()` | Integration region | String |
| `event.log(value)` | Writes the value to the execution logs | N/A |
| `event.setParameter("variable_name", "variable_value")` | Sets or updates a variable; wrap auto-generated variables in backticks | N/A |

### Rhino to V8

| Item | Statement in the source |
|------|-------------------------|
| Effective date | "Effective January 24, 2025, Application Integration will no longer support Rhino as the JavaScript execution engine" |
| Existing published tasks | Continue to use Rhino; can be migrated to V8 manually |
| New tasks | Use V8 exclusively |
| V8 | Faster, supports ECMAScript 2024, ongoing security updates |

## Notes

- Deprecated: Rhino is deprecated ("Effective January 24, 2025, Application Integration will no longer support Rhino as the JavaScript execution engine"); use V8. Migrate by unpublishing the published integrations containing JavaScript tasks, clicking **Open script editor** for each task (the script is updated to V8 automatically), reviewing and testing, then publishing. Unpublishing stops the services that rely on the published version (see [test-publish-integrations.md](./test-publish-integrations.md)); try the migration on a disposable project first.
- Do not delete the `executesScript(event)` function the editor creates; it is called when the task runs.
- Source inconsistency: the editor function is named `executesScript(event)` in the prose and warnings but `executeScript(event)` in every method example; both are kept as written.
- Corrected from the official docs: the `getGoogleCloudProjectId` example calls `event.getGcpProjectId();`, while the method's syntax line is `event.getGoogleCloudProjectId()`.
- Corrected from the official docs: the `taskConfigs` fragment closes the `script` entry with `}"` and never closes `parameters`; the stray quote was removed and the missing brace added.
- Corrected from the official docs: the API step sets "the `filFormat`" to `JSON`; the Discovery document names the `versions.download` query parameter `fileFormat` (enum value `JSON`).
- `event` is the in-memory object of Application Integration. Do not log or return credentials or full request headers from a script.
- The script runs inside Application Integration, not on Node.js and not as Cloud Run functions (`gcp-run`).
- The editor offers a minimap, highlighting, folding and click-to-copy; **Script with Gemini** can generate code.
- Setting `TaskParameter` improves performance when the integration has multiple large parameters the script does not use. The Console and API procedures use the same two JSON fragments; each is shown once.
- Quotas and limits: https://docs.cloud.google.com/application-integration/docs/quotas
- Source: https://docs.cloud.google.com/application-integration/docs/configure-javascript-task (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [variables.md](./variables.md)
- [tasks.md](./tasks.md)
- [error-handling.md](./error-handling.md)
- [test-publish-integrations.md](./test-publish-integrations.md)
