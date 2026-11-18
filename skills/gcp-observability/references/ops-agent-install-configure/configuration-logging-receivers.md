---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
---

# Ops Agent logging receivers

A logging receiver describes how the Ops Agent retrieves logs (tailing files, a TCP port, the Windows Event Log, etc.). Each receiver has an identifier (`RECEIVER_ID`) and a `type`; receivers can be used in multiple pipelines.

## Signature / Usage

### Receiver structure

```text
receivers:
  RECEIVER_ID:
    type: files
    ...
  RECEIVER_ID_2:
    type: syslog
    ...
```

### `files` receiver

```yaml
receivers:
  RECEIVER_ID:
    type: files

    include_paths: [/var/log/*.log]
    exclude_paths: [/var/log/not-this-one.log]
    record_log_file_path: true
```

### `fluent_forward` receiver

```yaml
receivers:
  RECEIVER_ID:
    type: fluent_forward

    listen_host: 127.0.0.1
    listen_port: 24224
```

### `syslog` receiver (Linux only)

```yaml
receivers:
  RECEIVER_ID:
    type: syslog

    transport_protocol: tcp
    listen_host: 0.0.0.0
    listen_port: 5140
```

### `tcp` receiver

```yaml
receivers:
  RECEIVER_ID:
    type: tcp

    format: json
    listen_host: 127.0.0.1
    listen_port: 5170
```

### `windows_event_log` receiver (Windows only)

```yaml
receivers:
  RECEIVER_ID:
    type: windows_event_log

    channels: [System,Application,Security]
```

Override the built-in receiver to use version `2`:

```yaml
receivers:
  windows_event_log:
    type: windows_event_log

    channels: [System,Application,Security]
    receiver_version: 2
```

### `systemd_journald` receiver

```yaml
receivers:
  RECEIVER_ID:
    type: systemd_journald
```

## Options / Props

### Receiver types

| `type` | Description | Availability |
|---|---|---|
| `files` | Collect logs by tailing files on disk | All |
| `fluent_forward` | Collect logs sent via the Fluent Forward protocol over TCP | Ops Agent 2.12.0 and later |
| `tcp` | Collect logs in JSON format by listening to a TCP port | Ops Agent 2.3.0 and later |
| `syslog` | Collect Syslog messages over TCP or UDP | Linux only |
| `systemd_journald` | Collect systemd journal logs from systemd-journald | Linux only; Ops Agent 2.4.0 and later |
| `windows_event_log` | Collect Windows Event Logs using the Windows Event Log API | Windows only |
| third-party application receivers | See https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party | |

### Per-type options

| Receiver | Option | Required | Description |
|---|---|---|---|
| `files` | `include_paths` | Required | List of filesystem paths to read by tailing each file. Wildcards: `*` matches any sequence of non-path-separator characters within one directory or file name (`/var/log/*.log`; `/var/log/app_*/server.log` matches `/var/log/app_1/server.log` but not `/var/log/app_1/v2/server.log`); `**` (globstar) matches zero or more directories (`/var/log/**/*.log`, `/opt/my-app/logs/**/*.log`). On Windows, wildcards must use `\` as separator |
| `files` | `exclude_paths` | Optional | Path patterns to exclude from the set matched by `include_paths` |
| `files` | `record_log_file_path` | Optional | If `true`, the path of the file the record came from is written to the `agent.googleapis.com/log_file_path` label (with a wildcard, only the path of the matched file) |
| `files` | `wildcard_refresh_interval` | Optional | Interval at which wildcard paths in `include_paths` are refreshed, as a duration (`30s`, `2m`); default 60 seconds. Useful when files rotate faster than the default |
| `fluent_forward` | `listen_host` | Optional | IP address to listen on; default `127.0.0.1` |
| `fluent_forward` | `listen_port` | Optional | Port; default `24224` |
| `syslog` | `transport_protocol` | | `tcp` or `udp` |
| `syslog` | `listen_host` | | IP address to listen on |
| `syslog` | `listen_port` | | Port |
| `tcp` | `format` | Required | Log format; supported value `json` |
| `tcp` | `listen_host` | Optional | Default `127.0.0.1` |
| `tcp` | `listen_port` | Optional | Default `5170` |
| `windows_event_log` | `channels` | Required | List of Windows Event Log channels |
| `windows_event_log` | `receiver_version` | Optional | Which Windows Event Log API to use: `1` or `2`; default `1`. Version `1` is for backwards compatibility only; use `2` for new receivers. Channels under "Applications and Services" in Event Viewer require `2` |
| `windows_event_log` | `render_as_xml` | Optional | If `true`, all Event Log fields except `jsonPayload.Message` and `jsonPayload.StringInserts` are rendered as an XML document in `jsonPayload.raw_xml`; default `false`. Cannot be `true` when `receiver_version` is `1` |

### Special fields in structured payloads

| Record field | LogEntry field |
|---|---|
| Option 1 `"timestamp": { "seconds": CURRENT_SECONDS, "nanos": CURRENT_NANOS, }`; Option 2 `{ "timestampSeconds": CURRENT_SECONDS, "timestampNanos": CURRENT_NANOS, }` | `timestamp` |
| receiver_id (not a record field) | `logName` |
| `logging.googleapis.com/httpRequest` (HttpRequest) | `httpRequest` |
| `logging.googleapis.com/severity` (string) | `severity` |
| `logging.googleapis.com/labels` (struct of string:string) | `labels` |
| `logging.googleapis.com/operation` (struct) | `operation` |
| `logging.googleapis.com/sourceLocation` (struct) | `sourceLocation` |
| `logging.googleapis.com/trace` (string) | `trace` |
| `logging.googleapis.com/spanId` (string) | `spanId` |

### Default ingested labels

| Field | Sample value | Description |
|---|---|---|
| `labels."compute.googleapis.com/resource_name"` | `test_vm` | Name of the VM the log originates from. Written for all logs |
| `labels."logging.googleapis.com/instrumentation_source"` | `agent.googleapis.com/apache_access` | The receiver `type` the log originates from, prefixed by `agent.googleapis.com/`. Written only by receivers from third-party integrations |

### Common Linux log files

| Application | Common log files |
|---|---|
| apache, cassandra, memcached, mongodb, mysql, nginx, postgres, rabbitmq, redis, solr, tomcat, zookeeper | See the third-party integration page for each application (`https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party/NAME`) |
| chef | `/var/log/chef-server/bookshelf/current /var/log/chef-server/chef-expander/current /var/log/chef-server/chef-pedant/http-traffic.log /var/log/chef-server/chef-server-webui/current /var/log/chef-server/chef-solr/current /var/log/chef-server/erchef/current /var/log/chef-server/erchef/erchef.log.1 /var/log/chef-server/nginx/access.log /var/log/chef-server/nginx/error.log /var/log/chef-server/nginx/rewrite-port-80.log /var/log/chef-server/postgresql/current` |
| gitlab | `/home/git/gitlab/log/application.log /home/git/gitlab/log/githost.log /home/git/gitlab/log/production.log /home/git/gitlab/log/satellites.log /home/git/gitlab/log/sidekiq.log /home/git/gitlab/log/unicorn.stderr.log /home/git/gitlab/log/unicorn.stdout.log /home/git/gitlab-shell/gitlab-shell.log` |
| jenkins | `/var/log/jenkins/jenkins.log` |
| jetty | `/var/log/jetty/out.log /var/log/jetty/*.request.log /var/log/jetty/*.stderrout.log` |
| joomla | `/var/www/joomla/logs/*.log` |
| magento | `/var/www/magento/var/log/exception.log /var/www/magento/var/log/system.log /var/www/magento/var/report/*` |
| mediawiki | `/var/log/mediawiki/*.log` |
| puppet | `/var/log/puppet/http.log /var/log/puppet/masterhttp.log` |
| puppet-enterprise | `/var/log/pe-activemq/activemq.log /var/log/pe-activemq/wrapper.log /var/log/pe-console-auth/auth.log /var/log/pe-console-auth/cas_client.log /var/log/pe-console-auth/cas.log /var/log/pe-httpd/access.log /var/log/pe-httpd/error.log /var/log/pe-httpd/other_vhosts_access.log /var/log/pe-httpd/puppetdashboard.access.log /var/log/pe-httpd/puppetdashboard.error.log /var/log/pe-httpd/puppetmasteraccess.log /var/log/pe-mcollective/mcollective_audit.log /var/log/pe-mcollective/mcollective.log /var/log/pe-puppet-dashboard/certificate_manager.log /var/log/pe-puppet-dashboard/event-inspector.log /var/log/pe-puppet-dashboard/failed_reports.log /var/log/pe-puppet-dashboard/live-management.log /var/log/pe-puppet-dashboard/mcollective_client.log /var/log/pe-puppet-dashboard/production.log /var/log/pe-puppetdb/pe-puppetdb.log /var/log/pe-puppet/masterhttp.log /var/log/pe-puppet/rails.log` |
| redmine | `/var/log/redmine/*.log` |
| salt | `/var/log/salt/key /var/log/salt/master /var/log/salt/minion /var/log/salt/syndic.loc` |
| sugarcrm | `/var/www/*/sugarcrm.log` |
| syslog | `/var/log/syslog /var/log/messages` |

## Notes

- Special fields in structured payloads: For receivers and processors that ingest structured data (`fluent_forward`, `tcp`, `parse_json`), top-level fields go into `LogEntry.jsonPayload` unless listed here; remaining fields stay in `jsonPayload`.
- With `fluent_forward`, tags from incoming records are preserved in the `LogEntry` `logName` field as a dot-separated suffix (`projects/PROJECT_ID/logs/RECEIVER_ID.TAG`).
- The `syslog` sample above sets `listen_host: 0.0.0.0`, which listens on all network interfaces and accepts syslog from any host that can reach the port; the `fluent_forward` and `tcp` defaults are `127.0.0.1`. Restrict reachability (firewall rules) when using `0.0.0.0`.
- Logs written to Cloud Logging can contain personal data or secrets taken from log files; do not log credentials. Cloud Logging reads structured JSON only when the fields match the special fields above; the `pino` skill covers the pino logger itself.
- The source's `...` in the receiver structure fence marks omitted options; the fence is a fragment, not complete YAML.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [configuration.md](./configuration.md)
- [configuration-logging-processors.md](./configuration-logging-processors.md)
- [configuration-logging-service.md](./configuration-logging-service.md)
