---
source: https://docs.cloud.google.com/monitoring/uptime-checks
---

# Create an uptime check with the client libraries (Node.js, Python)

Client-library samples that call `CreateUptimeCheckConfig` for a public HTTP check on `uptime_url`, with a 10 second timeout and a 300 second period. They authenticate with Application Default Credentials.

## Signature / Usage

### Node.js

Adapted (not in the official docs): the twin's `require(...)` and client constructor were garbled by link rewriting; restored to `@google-cloud/monitoring` and `monitoring.UptimeCheckServiceClient`, and `check_request_type` changed to the camelCase property `checkRequestType` used by the Node.js client.

```javascript
// Imports the Google Cloud client library
const monitoring = require('@google-cloud/monitoring');

// Creates a client
const client = new monitoring.UptimeCheckServiceClient();

/**
 * TODO(developer): Uncomment and edit the following lines of code.
 */
// const projectId = 'YOUR_PROJECT_ID';
// const hostname = 'mydomain.com';

const request = {
  // i.e. parent: 'projects/my-project-id'
  parent: client.projectPath(projectId),
  uptimeCheckConfig: {
    displayName: 'My Uptime Check',
    monitoredResource: {
      // See the Uptime Check docs for supported MonitoredResource types
      type: 'uptime_url',
      labels: {
        host: hostname,
      },
    },
    httpCheck: {
      path: '/',
      port: 80,
    },
    timeout: {
      seconds: 10,
    },
    period: {
      seconds: 300,
    },
  },
};

// Creates an uptime check config for a GCE instance
const [uptimeCheckConfig] = await client.createUptimeCheckConfig(request);
console.log('Uptime check created:');
console.log(`ID: ${uptimeCheckConfig.name}`);
console.log(`Display Name: ${uptimeCheckConfig.displayName}`);
console.log('Resource: %j', uptimeCheckConfig.monitoredResource);
console.log('Period: %j', uptimeCheckConfig.period);
console.log('Timeout: %j', uptimeCheckConfig.timeout);
console.log(`Check type: ${uptimeCheckConfig.checkRequestType}`);
console.log(
  'Check: %j',
  uptimeCheckConfig.httpCheck || uptimeCheckConfig.tcpCheck
);
console.log(
  `Content matchers: ${uptimeCheckConfig.contentMatchers
    .map(matcher => matcher.content)
    .join(', ')}`
);
console.log(`Regions: ${uptimeCheckConfig.selectedRegions.join(', ')}`);
```

### Python (GET check)

Adapted (not in the official docs): `parent` must be the resource name `projects/PROJECT_ID`, so the sample's `"parent": project_id` is changed to `f"projects/{project_id}"`.

```python
def create_uptime_check_config_get(
    project_id: str, host_name: str = None, display_name: str = None
) -> uptime.UptimeCheckConfig:
    """Creates a new uptime check configuration

    Args:
        project_id: Google Cloud project id where the uptime check is created
        host_name: An example label's value for the "host" label
        display_name: A human friendly name of the configuration

    Returns:
        A structure that describes a new created uptime check
    """
    config = monitoring_v3.UptimeCheckConfig()
    config.display_name = display_name or "New GET uptime check"
    config.monitored_resource = {
        "type": "uptime_url",
        "labels": {"host": host_name or "example.com"},
    }
    config.http_check = {
        "request_method": monitoring_v3.UptimeCheckConfig.HttpCheck.RequestMethod.GET,
        "path": "/",
        "port": 80,
    }
    config.timeout = {"seconds": 10}
    config.period = {"seconds": 300}

    client = monitoring_v3.UptimeCheckServiceClient()
    new_config = client.create_uptime_check_config(
        request={"parent": f"projects/{project_id}", "uptime_check_config": config}
    )
    pprint.pprint(new_config)
    return new_config
```

## Options / Props

| Field | Value in the samples |
|---|---|
| `monitoredResource.type` | `uptime_url` (label `host`) |
| `httpCheck.path` / `httpCheck.port` | `/` / `80` |
| `timeout` | 10 seconds |
| `period` | 300 seconds |
| POST variant (Python) | `request_method` POST, `content_type` URL_ENCODED, `body` bytes |

## Notes

- Samples use plain HTTP port 80 against `example.com`-style hosts; do not put credentials in `body` or headers of an example. Client-library resource types use `uptime_url` (underscore), unlike `gcloud`, which uses `uptime-url`.
- Corrected from the official docs: Node.js `uptimeCheckConfig.check_request_type` was changed to `uptimeCheckConfig.checkRequestType`; Python `"parent": project_id` was changed to `f"projects/{project_id}"`. The source's garbled `require('https://docs.cloud.google.com/nodejs/docs/reference/monitoring/latest/overview.html')` and `new monitoring.https://docs.cloud.google.com/nodejs/docs/reference/monitoring/latest/overview.html()` were restored to `require('@google-cloud/monitoring')` and `new monitoring.UptimeCheckServiceClient()`.
- Checked against the npm package `@google-cloud/monitoring` 6.2.0 (`build/src/index.d.ts`, `build/src/v3/uptime_check_service_client.d.ts`, `build/protos/protos.d.ts`): the package exports `UptimeCheckServiceClient`, which declares `createUptimeCheckConfig(request)` and `projectPath(project)`; `ICreateUptimeCheckConfigRequest` has `parent` and `uptimeCheckConfig`; `UptimeCheckConfig` has `name`, `displayName`, `monitoredResource`, `httpCheck` (`path`, `port`), `tcpCheck`, `period`, `timeout` (`seconds`), `contentMatchers` (`content`), `selectedRegions` and the oneof property `checkRequestType` (`"httpCheck"|"tcpCheck"`). No `check_request_type` property is declared.
- The Python sample assumes imports of `monitoring_v3`, `uptime` and `pprint`, which the source does not show; the source also has a POST variant.
- The source also shows C#, Java, Go, PHP and Ruby samples, Console and Terraform.
- Source: https://docs.cloud.google.com/monitoring/uptime-checks (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [uptime-checks.md](./uptime-checks.md)
- [uptime-check-pings-and-failures.md](./uptime-check-pings-and-failures.md)
