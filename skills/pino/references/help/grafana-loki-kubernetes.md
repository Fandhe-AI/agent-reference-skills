# Using Grafana Loki to Evaluate Pino Logs in a Kubernetes Cluster

To get Pino logs into Grafana Loki there are two options: push logs directly, or configure a log-shipping agent to pull, parse, and forward them.

## Usage

1. **Push**: Use [`pino-loki`](https://github.com/Julien-R44/pino-loki) as a transport to send logs directly to Loki.
2. **Pull**: Configure Grafana Promtail to read and properly parse the logs before sending them to Loki. Similar to the Google Cloud Logging integration, this involves remapping the log levels.

## Notes

- The push approach requires the `pino-loki` transport package
- The pull approach requires remapping Pino's numeric/string log levels for Promtail parsing, analogous to the level mapping used for Google Cloud Logging

## Related

- [google-cloud-logging](./google-cloud-logging.md)
- [log-levels-as-labels](./log-levels-as-labels.md)
- [ecosystem](../integrations/ecosystem.md)
