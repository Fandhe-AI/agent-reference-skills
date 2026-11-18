---
source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party
---

# Ops Agent third-party application integrations

Index of guides that explain how to configure the Ops Agent to collect logs and metrics from supported third-party applications. The Cloud Monitoring **Metrics Management** page helps control spend on billable metrics without hurting observability.

## Signature / Usage

The guides all configure the Ops Agent through its user configuration file. The block below is the self-log rotation fragment from the rotate-logs twin, shown only as the shape of the `config.yaml` file the guides edit (`...` stands for your pipelines).

```text
logging:  ...
metrics:  ...
global:
  default_self_log_file_rotation:
    max_file_size_megabytes: 20
    backup_count: 5
```

## Options / Props

### Supported applications

| Application | Slug |
|-------------|------|
| Active Directory Domain Services (AD DS) | `active_directory_ds` |
| Aerospike | `aerospike` |
| Apache ActiveMQ | `activemq` |
| Apache Cassandra | `cassandra` |
| Apache CouchDB | `couchdb` |
| Apache Flink | `flink` |
| Apache Hadoop | `hadoop` |
| Apache HBase | `hbase` |
| Apache Kafka | `kafka` |
| Apache Solr | `solr` |
| Apache Tomcat | `tomcat` |
| Apache Web Server (httpd) | `apache` |
| Apache ZooKeeper | `zookeeper` |
| Couchbase | `couchbase` |
| Elasticsearch 7.9+ | `elasticsearch` |
| Elasticsearch 8 and 9 | `elasticsearch9` |
| Hashicorp Vault | `vault` |
| Internet Information Services | `iis` |
| Jetty | `jetty` |
| JVM | `jvm` |
| MariaDB | `mariadb` |
| Memcached | `memcached` |
| Microsoft SQL Server | `mssql` |
| MongoDB | `mongodb` |
| MySQL | `mysql` |
| nginx | `nginx` |
| NVIDIA Data Center GPU Manager (DCGM) | `https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party-nvidia` (not under `third-party/`) |
| Oracle Database | `oracledb` |
| PostgreSQL | `postgresql` |
| RabbitMQ | `rabbitmq` |
| Redis | `redis` |
| SAP HANA | `saphana` |
| Varnish HTTP Cache | `varnish` |
| WildFly | `wildfly` |

### Metrics Management page reports

| Information |
|-------------|
| Ingestion volumes for byte- and sample-based billing, across metric domains and for individual metrics |
| Labels and cardinality of metrics |
| Number of reads for each metric |
| Use of metrics in alerting policies and custom dashboards |
| Rate of metric-write errors |

## Notes

- Supported applications: Base URL: `https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party/<slug>` unless stated.
- The Metrics Management page can also exclude unneeded metrics, which removes the cost of ingesting them but also stops storing those metrics; see https://docs.cloud.google.com/monitoring/docs/metrics-management.
- Receiver configuration for databases (MySQL, PostgreSQL, Redis and others) often takes passwords in the Ops Agent configuration file; keep them as placeholders in shared files and restrict file permissions (see each guide).
- The source also embeds two videos (an Ops Agent third-party overview and an Ansible walkthrough).
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/rotate-logs (the page only lists applications and has no code; the block is weakly related and shows the file shape).
- Source: https://docs.cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [rotate-logs.md](./rotate-logs.md)
- [troubleshoot-install-startup.md](./troubleshoot-install-startup.md)
