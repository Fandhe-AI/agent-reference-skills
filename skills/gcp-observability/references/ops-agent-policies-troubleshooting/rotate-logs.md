---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/rotate-logs
---

# Rotate Ops Agent self logs

The Ops Agent writes a "self log" file `logging-module.log` that can consume all available disk space when the agent runs unattended for long periods or when a problem occurs. Ops Agent 2.31.0 and newer have built-in configurable log rotation; for older versions, or manual rotation, use `logrotate` on Linux.

## Signature / Usage

### Default built-in rotation (Ops Agent 2.31.0 or newer)

The entry and its default values; in the user configuration file it goes inside the `global` section (next example).

```yaml
  default_self_log_file_rotation:
    enabled: true
    max_file_size_megabytes: 400
    backup_count: 1
```

### Override in the user configuration file

Add a `global` section after your pipelines in `/etc/google-cloud-ops-agent/config.yaml` (Linux) or `C:\Program Files\Google\Cloud Operations\Ops Agent\config\config.yaml` (Windows). Fragment (the `...` stands for your existing pipelines):

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    enabled: true
    max_file_size_megabytes: 400
    backup_count: 1
```

Disable rotation:

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    enabled: false
```

Rotate at 20 MB and keep 5 backups (6 files total):

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    max_file_size_megabytes: 20
    backup_count: 5
```

Rotate at 2,000 MB (2 GB) and keep 1 backup (2 files total):

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    max_file_size_megabytes: 2000
```

Rotate at 400 MB and keep 2 backups (3 files total):

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    backup_count: 2
```

### Manual rotation with `logrotate` (Linux)

Install `logrotate`. Debian and Ubuntu:

```bash
sudo apt install logrotate
```

CentOS, RHEL and Fedora:

```bash
sudo yum install logrotate
```

Create `/etc/logrotate.d/google-cloud-ops-agent.conf`:

```bash
sudo tee /etc/logrotate.d/google-cloud-ops-agent.conf > /dev/null << EOF
# logrotate config to rotate Google Cloud Ops Agent self log file.
# See https://manpages.debian.org/jessie/logrotate/logrotate.8.en.html for
# the full options.
/var/log/google-cloud-ops-agent/subagents/logging-module.log
{
    # Log files are rotated every day.
    daily
    # Log files are rotated this many times before being removed. This
    # effectively limits the disk space used by the Ops Agent self log files.
    rotate 30
    # Log files are rotated when they grow bigger than maxsize even before the
    # additionally specified time interval
    maxsize 256M
    # Skip rotation if the log file is missing.
    missingok
    # Do not rotate the log if it is empty.
    notifempty
    # Old versions of log files are compressed with gzip by default.
    compress
    # Postpone compression of the previous log file to the next rotation
    # cycle.
    delaycompress
}
EOF
```

Then trigger `logrotate` periodically with `crontab` or a `systemd timer`. To test, temporarily set `maxsize` to `1k`, restart the agent a few times, and run `logrotate` manually:

```bash
sudo service google-cloud-ops-agent restart
```

```bash
sudo logrotate /etc/logrotate.d/google-cloud-ops-agent.conf
```

Rotated files appear in `/var/log/google-cloud-ops-agent/subagents/`. Restore the original `maxsize` afterwards.

## Options / Props

### `default_self_log_file_rotation`

| Option | Default | Minimum | Description |
|--------|---------|---------|-------------|
| `enabled` | `true` | — | Whether log rotation is enabled |
| `max_file_size_megabytes` | 400 | 1 | Maximum size the log file can reach before it is backed up; measured in megabytes (1024^2 bytes) |
| `backup_count` | 1 | 1 | Number of old log files to retain |

## Notes

- Built-in rotation needs Ops Agent version 2.31.0 or newer.
- After any change to the configuration file, restart the agent to apply it.
- The `logrotate` route limits the logging sub-agent log at `/var/log/google-cloud-ops-agent/subagents/logging-module.log`. Disabling rotation or setting large limits can fill the disk; `rotate 30` with `maxsize 256M` bounds disk use in the manual example.
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/rotate-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [troubleshoot-install-startup.md](./troubleshoot-install-startup.md)
- Ops Agent configuration: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/configuration
