# help

| Name | Description | Path |
|------|-------------|------|
| Avoid Message Conflict | When a log is written like `log.info({ msg: 'a message' }, 'another…' | [avoid-message-conflict.md](./avoid-message-conflict.md) |
| Best Performance for Logging to stdout | stdout への直接出力で最高パフォーマンスを得るための設定ガイド。 | [best-performance-stdout.md](./best-performance-stdout.md) |
| Duplicate Keys | 子ロガーのバインディングとログ呼び出しのオブジェクトで同名キーが存在する場合の挙動。 | [duplicate-keys.md](./duplicate-keys.md) |
| Mapping Pino Log Levels to Google Cloud Logging | Google Cloud Logging (formerly Stackdriver) uses `severity` levels instead of numeric log levels… | [google-cloud-logging.md](./google-cloud-logging.md) |
| Log Filtering | The Pino philosophy advocates using common, preexisting system utilities for filtering logs. | [log-filtering.md](./log-filtering.md) |
| Log Levels as Labels Instead of Numbers | Pino's default mode is to print the numeric level value instead of the string name, since log… | [log-levels-as-labels.md](./log-levels-as-labels.md) |
| Log Rotation | Pino recommends using a separate tool for log rotation, specifically logrotate. | [log-rotation.md](./log-rotation.md) |
| Long Term Support | Pino provides Long Term Support (LTS) according to a defined schedule, with major releases… | [lts.md](./lts.md) |
| Pino with debug | The popular `debug` module is used in many modules across the ecosystem. | [pino-with-debug.md](./pino-with-debug.md) |
| Reopening Log Files | In cases where a log rotation tool does not offer copy-truncate capabilities, or where using… | [reopening-log-files.md](./reopening-log-files.md) |
| Saving to Multiple Files | Pino supports writing logs to multiple destinations using `pino.multistream`. | [saving-to-multiple-files.md](./saving-to-multiple-files.md) |
| Testing | Pino provides a dedicated utility for testing log output. | [testing.md](./testing.md) |
| Transports and systemd | `systemd` makes it complicated to use pipes in services. | [transports-and-systemd.md](./transports-and-systemd.md) |
| Unicode and Windows Terminal | Pino uses sonic-boom to speed up logging, which internally uses `fs.write` to write log… | [unicode-and-windows.md](./unicode-and-windows.md) |
