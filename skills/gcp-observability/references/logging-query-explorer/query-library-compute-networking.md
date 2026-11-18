---
source: https://docs.cloud.google.com/logging/docs/view/query-library
---

# Sample Logging queries: Compute Engine, networking and third-party applications

Logging query language samples for Compute Engine (audit, system events, snapshots, instance groups, firewalls), networking (firewall logs, VPC Flow Logs, Cloud VPN, load balancers) and logs of third-party applications collected by the legacy Logging agent. Usage rules are in [query-library.md](./query-library.md).

## Signature / Usage

### Compute Engine VM Instance Restarted

Adapted (not in the official docs): the source regex has spaces inside the group (`( stop|reset|automaticRestart|guestTerminate| instanceManagerHaltForRestart)`); regular expressions are literal, so those spaces would stop `stop` and `instanceManagerHaltForRestart` from matching. The spaces are removed here and in the table.

```text
resource.type="gce_instance" protoPayload.methodName=~"compute\.instances\.(stop|reset|automaticRestart|guestTerminate|instanceManagerHaltForRestart)" (log_id("cloudaudit.googleapis.com/activity") OR log_id("cloudaudit.googleapis.com/system_event")) resource.labels.instance_id="INSTANCE_ID"
```

### Instance group members within a time frame

Adapted (not in the official docs): the source wrote `timestamp >= START_TIME timestamp <= END_TIME` unquoted; timestamps contain `:`, which must be double-quoted per the language rules, so the placeholders are quoted here and in the table (use RFC 3339 UTC values).

```text
resource.type="gce_instance_group_manager" resource.labels.instance_group_manager_name="INSTANCE_GROUP_NAME" jsonPayload.@type= "type.googleapis.com/compute.InstanceGroupManagerEvent" jsonPayload.instanceHealthStateChange.detailedHealthState="HEALTHY" timestamp >= "START_TIME" timestamp <= "END_TIME"
```

### Compute Engine Admin Activity logs

```text
resource.type="gce_instance" AND log_id("cloudaudit.googleapis.com/activity")
```

### VPC Flow Logs

```text
resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows")
```

### Third-party logs from the legacy Logging agent

```text
resource.type="gce_instance" AND log_id("syslog")
```

## Options / Props

### Compute Engine

| Query/filter name | Expression |
|---|---|
| Compute Engine Admin Activity logs | `resource.type="gce_instance" AND log_id("cloudaudit.googleapis.com/activity")` |
| Compute Engine firewall rule deletion | `resource.type="gce_firewall_rule" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"firewalls.delete"` |
| Compute Engine VM syslogs | `resource.type="gce_instance" AND log_id("syslog")` |
| Compute Engine VM authlogs | `resource.type="gce_instance" AND log_id("authlog")` |
| Compute Engine Host Error | `resource.type="gce_instance" protoPayload.serviceName="compute.googleapis.com" (protoPayload.methodName:"compute.instances.hostError" OR operation.producer:"compute.instances.hostError") log_id("cloudaudit.googleapis.com/system_event") resource.labels.instance_id="INSTANCE_ID" severity=INFO` |
| Compute Engine Host Memory Alert | `resource.type="gce_instance" AND protoPayload.serviceName="compute.googleapis.com" AND (jsonPayload.methodName:"compute.instances.host_event_notify" OR operation.producer:"compute.instances.host_event_notify") AND log_id("cloudaudit.googleapis.com/host_event_notify") AND resource.labels.instance_id="INSTANCE_ID" AND severity=CRITICAL` |
| Compute Engine Host Migrated | `resource.type="gce_instance" protoPayload.serviceName="compute.googleapis.com" (protoPayload.methodName: "compute.instances.migrateOnHostMaintenance" OR operation.producer: "compute.instances.migrateOnHostMaintenance") log_id("cloudaudit.googleapis.com/system_event") resource.labels.instance_id="INSTANCE_ID" severity=INFO` |
| Compute Engine VM Terminated/Preempted | `resource.type="gce_instance" protoPayload.methodName=~"compute\.instances\.(guestTerminate\|preempted)" log_id("cloudaudit.googleapis.com/system_event") resource.labels.instance_id="INSTANCE_ID"` |
| Compute Engine VM terminated due to Scratch Disk Creation Failure | `resource.type="gce_instance" protoPayload.serviceName="compute.googleapis.com" (protoPayload.methodName="compute.instances.scratchDiskCreationFailed" OR operation.producer: "compute.instances.scratchDiskCreationFailed") log_id("cloudaudit.googleapis.com/system_event") resource.labels.instance_id="INSTANCE_ID" severity=INFO` |
| Compute Engine VM Instance Created | `resource.type="gce_instance" protoPayload.methodName:"compute.instances.insert" log_id("cloudaudit.googleapis.com/activity") protoPayload.request.name="INSTANCE_NAME"` |
| Compute Engine VM Instance Deleted with Name | `resource.type="gce_instance" protoPayload.methodName:"compute.instances.delete" log_id("cloudaudit.googleapis.com/activity") protoPayload.resourceName:"INSTANCE_NAME"` |
| Compute Engine VM Instance Deleted with ID | `resource.type="gce_instance" protoPayload.methodName:"compute.instances.delete" log_id("cloudaudit.googleapis.com/activity") resource.labels.instance_id="INSTANCE_ID"` |
| Compute Engine VM Instance Restarted | `resource.type="gce_instance" protoPayload.methodName=~"compute\.instances\.(stop\|reset\|automaticRestart\|guestTerminate\|instanceManagerHaltForRestart)" (log_id("cloudaudit.googleapis.com/activity") OR log_id("cloudaudit.googleapis.com/system_event")) resource.labels.instance_id="INSTANCE_ID"` |
| Compute Engine Shielded VM Boot Integrity Failure | `resource.type="gce_instance" log_id("compute.googleapis.com/shielded_vm_integrity") jsonPayload.earlyBootReportEvent.policyEvaluationPassed="false" resource.labels.instance_id="INSTANCE_ID"` |
| Compute Engine VM instance stopped by Guest OS | `resource.type="gce_instance" protoPayload.serviceName="compute.googleapis.com" (protoPayload.methodName:"compute.instances.guestTerminate" OR operation.producer:"compute.instances.guestTerminate") log_id("cloudaudit.googleapis.com/system_event") resource.labels.instance_id="INSTANCE_ID" severity=INFO` |
| Compute Engine Shielded VM boot file was blocked | `resource.type="gce_instance" log_id("serialconsole.googleapis.com/serial_port_1_output") textPayload:"Security Violation" resource.labels.instance_id="INSTANCE_ID"` |
| Persistent Disk Created | `resource.type="gce_disk" AND protoPayload.methodName:"compute.disks.insert" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.resourceName: "PERSISTENT_DISK_NAME"` |
| Nodes added in Sole Tenant Node | `resource.type="gce_node_group" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName=~("compute.nodeGroups.addNodes" OR "compute.nodeGroups.insert") resource.labels.node_group_id="NODE_GROUP_ID" severity=INFO` |
| Autoscale events in Sole Tenant Node | `resource.type="gce_node_group" log_id("cloudaudit.googleapis.com/system_event") protoPayload.methodName=~("compute.nodeGroups.deleteNodes" OR "compute.nodeGroups.addNodes") resource.labels.node_group_id="NODE_GROUP_ID"` |
| Manual Snapshot Taken | `resource.type="gce_snapshot" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName:"compute.snapshots.insert" protoPayload.resourceName:"SNAPSHOT_NAME"` |
| Scheduled Snapshot Taken | `resource.type="gce_disk" log_id("cloudaudit.googleapis.com/system_event") protoPayload.methodName="ScheduledSnapshots" protoPayload.response.operationType="createSnapshot" protoPayload.response.targetLink="PERSISTENT_DISK_NAME"` |
| Snapshot Schedule Created | `resource.type="gce_resource_policy" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName:"compute.resourcePolicies.insert" protoPayload.request.name="SCHEDULE_NAME"` |
| Snapshot Schedule Attached | `resource.type="gce_disk" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName:"compute.disks.addResourcePolicies" protoPayload.request.resourcePolicys:"SCHEDULE_NAME" protoPayload.resourceName:"PERSISTENT_DISK_NAME"` |
| Quota Exceeded | `resource.type="gce_instance" protoPayload.methodName:"compute.instances.insert" protoPayload.status.message:"QUOTA_EXCEEDED" severity=ERROR` |
| Query unhealthy instances in instance group | `resource.type="gce_instance_group" resource.labels.instance_group_name="INSTANCE_GROUP_NAME" jsonPayload.healthCheckProbeResult.healthState="UNHEALTHY"` |
| Query instance group members within a time frame in UTC time format | `resource.type="gce_instance_group_manager" resource.labels.instance_group_manager_name="INSTANCE_GROUP_NAME" jsonPayload.@type= "type.googleapis.com/compute.InstanceGroupManagerEvent" jsonPayload.instanceHealthStateChange.detailedHealthState="HEALTHY" timestamp >= "START_TIME" timestamp <= "END_TIME"` |
| Instances added to Instance Group | `resource.type="gce_instance_group" protoPayload.methodName:"compute.instanceGroups.addInstances" log_id("cloudaudit.googleapis.com/activity") resource.labels.instance_group_name="INSTANCE_GROUP_NAME"` |
| Instances removed from Instance Group | `resource.type="gce_instance_group" protoPayload.methodName:"compute.instanceGroups.removeInstances" log_id("cloudaudit.googleapis.com/activity") resource.labels.instance_group_name="INSTANCE_GROUP_NAME"` |
| Instance template set or updated | `resource.type="gce_instance_group_manager" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName= "v1.compute.instanceGroupManagers.setInstanceTemplate" resource.labels.instance_group_manager_name="INSTANCE_GROUP_MANAGER"` |
| Firewall rule deleted | `resource.type="gce_firewall_rule" log_id("cloudaudit.googleapis.com/activity") protoPayload.methodName:"firewalls.delete"` |
| Firewall logs | `resource.type="gce_subnetwork" log_id("compute.googleapis.com/firewall") jsonPayload.instance.vm_name="INSTANCE_NAME"` |

### Networking

| Query/filter name | Expression |
|---|---|
| Firewall - all logs | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/firewall")` |
| Firewall logs for a given country | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/firewall") AND jsonPayload.remote_location.country=COUNTRY_ISO_ALPHA_3` |
| Firewall logs from a VM | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/firewall") AND jsonPayload.instance.vm_name="INSTANCE_NAME"` |
| Firewall subnet logs | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/firewall") AND resource.labels.subnetwork_name="SUBNET_NAME"` |
| Compute Engine subnetwork traffic logs to a subnet | `resource.type="gce_subnetwork" AND ip_in_net(jsonPayload.connection.dest_ip, "SUBNET_IP")` |
| VPC Flow Logs | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows")` |
| VPC Flow Logs for specific port and protocol | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows") AND jsonPayload.connection.src_port="PORT_ID" AND jsonPayload.connection.protocol="PROTOCOL"` |
| VPC Flow Logs for specific subnet | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows") AND resource.labels.subnetwork_name="SUBNET_NAME"` |
| VPC Flow Logs for specific subnet prefix | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows") AND ip_in_net(jsonPayload.connection.dest_ip, "SUBNET_IP")` |
| VPC Flow Logs for a specific VM | `resource.type="gce_subnetwork" AND log_id("compute.googleapis.com/vpc_flows") AND jsonPayload.src_instance.vm_name="VM_NAME"` |
| VPC Flow Logs for all egress traffic from a VPC network | `log_id("compute.googleapis.com/vpc_flows") AND jsonPayload.reporter="SRC" AND jsonPayload.src_vpc.vpc_name="VPC_NAME" AND (jsonPayload.dest_vpc.vpc_name!="VPC_NAME" OR NOT jsonPayload.dest_vpc:*)` |
| VPC Flow Logs for only egress traffic from a subnet | `log_id("compute.googleapis.com/vpc_flows") AND jsonPayload.reporter="SRC" AND jsonPayload.src_vpc.subnetwork_name="SUBNET_NAME" AND (jsonPayload.dest_vpc.subnetwork_name!="SUBNET_NAME" OR NOT jsonPayload.dest_vpc.subnetwork_name:*)` |
| Cloud VPN gateway logs | `resource.type="vpn_gateway" AND resource.labels.gateway_id="GATEWAY_ID"` |
| Cloud VPN IKE (Phase 1) authentication events | `resource.type="vpn_gateway" AND ("generating IKE_AUTH request" OR "parsed IKE_AUTH response")` |
| Cloud VPN Phase 2 (Child SA) events | `resource.type="vpn_gateway" AND "CHILD_SA"` |
| HTTP Load Balancer 5xx errors | `resource.type="http_load_balancer" AND httpRequest.status>=500` |
| HTTP Load Balancer requests to PHPMyAdmin | `resource.type="http_load_balancer" AND httpRequest.request_url:"phpmyadmin"` |
| Internal HTTP(S) Load Balancer logs | `resource.type="internal_http_lb_rule"` |
| Load balancing health check failure logs | `log_id("compute.googleapis.com/healthchecks") AND jsonPayload.healthCheckProbeResult.previousDetailedHealthState="HEALTHY" AND jsonPayload.healthCheckProbeResult.detailedHealthState="TIMEOUT"` |

### Third-party application logs (legacy Logging agent default log IDs)

| Query/filter name | Expression |
|---|---|
| Apache logs | `resource.type="gce_instance" AND (logName:"/apache-access" OR logName:"/apache-error")` |
| Cassandra logs | `resource.type="gce_instance" AND log_id("cassandra")` |
| Chef logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/chef-"` |
| Gitlab logs | `resource.type="gce_instance" logName:"projects/PROJECT_ID/logs/gitlab-"` |
| Jenkins logs | `resource.type="gce_instance" AND log_id("jenkins")` |
| Jetty logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/jetty-"` |
| Joomla logs | `resource.type="gce_instance" AND log_id("joomla")` |
| Linux syslogs | `resource.type="gce_instance" AND log_id("syslog")` |
| Magneto logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/magneto-"` |
| Mediawiki logs | `resource.type="gce_instance" AND log_id("mediawiki")` |
| memcached logs | `resource.type="gce_instance" AND log_id("memcached")` |
| MongoDB logs | `resource.type="gce_instance" AND log_id("mongodb")` |
| MySQL logs | `resource.type="gce_instance" AND log_id("mysql")` |
| Nginx logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/nginx-"` |
| PostgreSQL logs | `resource.type="gce_instance" AND log_id("postgresql")` |
| Puppet logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/puppet-"` |
| RabbitMQ logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/rabbitmq-"` |
| Redmine logs | `resource.type="gce_instance" AND log_id("redmine")` |
| Salt logs | `resource.type="gce_instance" AND logName:"projects/PROJECT_ID/logs/salt-"` |
| Slow MySQL queries | `resource.type="gce_instance" AND log_id("mysql-slow")` |
| Solr logs | `resource.type="gce_instance" AND log_id("solr")` |
| SugarCRM logs | `resource.type="gce_instance" AND log_id("sugarcrm")` |
| Tomcat logs | `resource.type="gce_instance" AND log_id("tomcat")` |
| Zookeeper logs | `resource.type="gce_instance" AND log_id("zookeeper")` |

## Notes

- Deprecated: the source states "As of September 28, 2026, the legacy Logging agent has reached its end of support. Standard maintenance and bug fixes are no longer provided." The third-party table uses the default log IDs of the legacy Logging agent; with the Ops Agent the log names might be configured differently. Migrate to a supported alternative (see the Ops Agent documentation).
- Adapted from the official docs: in "Compute Engine VM Instance Restarted" the source regex has spaces inside the group (`( stop|reset|automaticRestart|guestTerminate| instanceManagerHaltForRestart)`); regular expressions are literal, so the spaces would stop `stop` and `instanceManagerHaltForRestart` from matching, and the spaces were removed. In "Query instance group members within a time frame" the source wrote `timestamp >= START_TIME timestamp <= END_TIME` unquoted; timestamps contain `:`, which must be quoted per the language rules, so the placeholders are quoted.
- Firewall rule deletion, instance deletion and snapshot queries read audit entries only; they don't change resources. Compute Engine audit entries can contain principal emails and request payloads; restrict who can read them.
- The Cloud VPN queries match free text (`"CHILD_SA"`, `"generating IKE_AUTH request"`); free-text matches scan all fields and can be slow on large buckets.
- The source also shows Console copy steps. Firewall and VPC Flow Logs configuration is in the `gcp-networking` skill; load balancer logging in `gcp-load-balancing`; Compute Engine itself in `gcp-compute`.
- Source: https://docs.cloud.google.com/logging/docs/view/query-library (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-library.md](./query-library.md)
- [query-library-kubernetes.md](./query-library-kubernetes.md)
- [query-library-security-iam.md](./query-library-security-iam.md)
