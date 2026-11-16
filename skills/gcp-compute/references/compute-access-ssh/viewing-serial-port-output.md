---
source: https://docs.cloud.google.com/compute/docs/troubleshooting/viewing-serial-port-output
---

# View serial port output

A Compute Engine instance has four virtual serial ports. Their output helps troubleshoot crashes, failed boots, startup and shutdown issues. The console, gcloud CLI and REST return only the most recent 1 MB of output per port from running instances; use Cloud Logging for more or for stopped instances.

## Signature / Usage

### gcloud

```bash
gcloud compute instances get-serial-port-output INSTANCE_NAME \
  --port PORT \
  --start START \
  --zone ZONE
```

### REST

Adapted (not in the official docs): added the `v1` API version segment (`/compute/v1/`) that the Compute Engine API base path requires; the source URL omits it.

```http
GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/serialPort
```

### Cloud Logging query (Logs Explorer)

```text
resource.type="gce_instance"
logName="projects/PROJECT_ID/logs/serialconsole.googleapis.com%2Fserial_port_1_output"
resource.labels.instance_id="INSTANCE_ID"
```

### Enable serial port logging to Cloud Logging

Project-wide:

```bash
gcloud compute project-info add-metadata \
    --metadata serial-port-logging-enable=true
```

One instance:

```bash
gcloud compute instances add-metadata INSTANCE_NAME \
    --metadata serial-port-logging-enable=true
```

Disable for one instance:

```bash
gcloud compute instances add-metadata INSTANCE_NAME \
    --metadata serial-port-logging-enable=false
```

### Exclusion filter (project-wide enabled, exclude specific instances)

Adapted (not in the official docs): the source joins `resource.labels.instance_id != "INSTANCE_1_ID"` and `!= "INSTANCE_2_ID"`, which matches every instance except those two; an exclusion filter drops the entries it matches, so the condition is changed to match only the two instances.

```text
logName = "projects/PROJECT_ID/logs/serialconsole.googleapis.com%2Fserial_port_1_output"
resource.type = "gce_instance"
(resource.labels.instance_id = "INSTANCE_1_ID" OR resource.labels.instance_id = "INSTANCE_2_ID")
```

## Options / Props

| Placeholder / setting | Description |
|---|---|
| `PORT` | `1`, `2`, `3` or `4`; port 1 (serial console) is the default |
| `START` | Zero-based byte index of the first byte to return; use to continue a request that was too long |
| `ZONE` | Zone of the instance |
| `serial-port-logging-enable` | Metadata `true` / `false`; project-wide entry is inherited, an instance entry applies to that instance regardless of project setting |
| `constraints/compute.disableSerialPortLogging` | Boolean org policy constraint disabling logging to Cloud Logging organization-wide |

### Client networking requirements (console / interactive console)

| Requirement | Detail |
|---|---|
| TCP port 9600 | Outbound traffic must be allowed to reach the serial console gateway when using the **Serial port 1 (console)** link |
| VPC Service Controls | Interactive serial console isn't supported inside perimeters |
| Private Google Access | `private.googleapis.com` / `restricted.googleapis.com` VIPs don't support the SSH traffic needed; they only support HTTP-based protocols |

If these are restricted, use Cloud Logging (standard HTTPS, port 443).

## Notes

- Serial port output logging to Cloud Logging is disabled by default. When enabled, the first 50 GiB per month are free and logs are retained 30 days. Disabling these logs might limit Google's ability to troubleshoot.
- Setting `constraints/compute.disableSerialPortLogging` to `true` is not retroactive: instances whose metadata already enables logging keep logging until you reset the metadata. Afterwards you can't enable logging via metadata for any instance in the organization.
- Output is escaped with Abseil `CHexEscape()`, so non-UTF8 characters are hex strings; use `CUnescape()` to recover the exact output.
- Corrected from the official docs: the REST example shows `GET https://compute.googleapis.com/compute/projects/PROJECT_ID/...` without the API version; the Compute Engine API path is `compute/v1/` (checked against the Compute API discovery document).
- Corrected from the official docs: the exclusion filter used `resource.labels.instance_id != ...` for both instances. Cloud Logging drops the entries that match an exclusion filter, and statements on separate lines are joined with an implicit `AND`, so the source filter would drop serial port logs of all other instances and keep the two it means to exclude; the example matches the two instance IDs with `=` joined by `OR` in parentheses.
- Source (routing and exclusion filters): https://docs.cloud.google.com/logging/docs/routing/overview (retrieved 2026-11-17) — a sink routes a log entry "when the log entry matches the sink's inclusion filter but doesn't match any of the sink's exclusion filters".
- Source (implicit AND between statements): https://docs.cloud.google.com/logging/docs/view/logging-query-language (retrieved 2026-11-17)
- For SSH failures, see the SSH troubleshooting guide.
- The source also shows Console steps and the Logs Explorer click path.
- Source: https://docs.cloud.google.com/compute/docs/troubleshooting/viewing-serial-port-output (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [troubleshooting-using-serial-console.md](./troubleshooting-using-serial-console.md)
